from flask import Flask, request, jsonify
import psycopg2
import face_recognition
import base64
import numpy as np
from flask_cors import CORS
import io
import logging
import os
import psutil
import time
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://faceidservice.vercel.app", "http://faceidservice.vercel.app"]}})


# PostgreSQL database connection string
DB_URL="postgresql://postgres:kFbwbDBEhqqvDMFhEBYCDTXaliYzWBDH@junction.proxy.rlwy.net:34633/railway"

def get_db_connection():
    conn = psycopg2.connect(DB_URL)
    return conn

# Initialize the database
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create registered_faces table
    cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS registered_faces (
            user_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            face_encoding TEXT NOT NULL
        )
    ''')

    # Create visitors table
    cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS visitors (
            visitor_id SERIAL PRIMARY KEY,
            name TEXT,
            visit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            face_encoding TEXT NOT NULL
        )
    ''')

    conn.commit()
    cursor.close()
    conn.close()

# Add a new face encoding to the database
def add_face_to_db(user_id, name, face_encoding):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO registered_faces (user_id, name, face_encoding) VALUES (%s, %s, %s) ON CONFLICT (user_id) DO UPDATE SET name = %s, face_encoding = %s',
        (user_id, name, face_encoding, name, face_encoding)
    )
    conn.commit()
    cursor.close()
    conn.close()

def get_name_from_db(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT name FROM registered_faces WHERE user_id = %s', (user_id,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def add_visitor_face_to_db(name, face_encoding):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO visitors (name, face_encoding) VALUES (%s, %s)',
        (name, face_encoding)
    )
    conn.commit()
    cursor.close()
    conn.close()

# Get face encoding by user_id
def get_face_encoding(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT face_encoding FROM registered_faces WHERE user_id = %s', (user_id,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def get_most_recent_visitor():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT visitor_id, name, face_encoding FROM visitors ORDER BY visit_date DESC LIMIT 1')
    visitor = cursor.fetchone()
    conn.close()

    return visitor

# Decode face encoding from string to numpy array
def decode_face_encoding(encoded_face):
    try:
        return np.frombuffer(base64.b64decode(encoded_face), dtype=np.float64)
    except Exception as e:
        raise ValueError(f"Error decoding face encoding: {str(e)}")

# Encode face image as base64 string
def encode_face(face_encoding):
    return base64.b64encode(face_encoding.tobytes()).decode('utf-8')

def compare_face_with_encoding(frame, stored_face_encoding):
    try:
        image_bytes = base64.b64decode(frame)
        if len(image_bytes) == 0:
            raise ValueError("Decoded image is empty.")

        # Convert bytes to numpy array
        image_np = np.frombuffer(image_bytes, dtype=np.uint8)
        image = face_recognition.load_image_file(io.BytesIO(image_np))

        # Get face encodings from the incoming image
        face_encodings = face_recognition.face_encodings(image)

        if face_encodings:
            # Compare the first detected face with the stored encoding
            match_results = face_recognition.compare_faces([stored_face_encoding], face_encodings[0])
            return match_results[0]

        return False
    except Exception as e:
        logger.error(f"Error processing frame: {str(e)}")
        raise

# Initialize the database at startup
init_db()

@app.route('/health', methods=['GET'])
def health():
    try:
        # Basic server uptime
        uptime = time.time() - psutil.boot_time()
        uptime_str = str(timedelta(seconds=uptime))  # Use timedelta directly

        # Database check (check if a simple query to the PostgreSQL database works)
        try:
            conn = get_db_connection()
            cursor = conn.cursor()  # Create cursor
            cursor.execute('SELECT 1')  # Use cursor.execute, not conn.execute
            db_status = "ok"
            cursor.close()  # Close cursor after usage
            conn.close()  # Close connection after usage
        except psycopg2.Error as e:
            db_status = f"error: {str(e)}"

        # Face recognition library check
        try:
            test_image = np.zeros((100, 100, 3), dtype=np.uint8)  # Empty image for testing
            face_encodings = face_recognition.face_encodings(test_image)
            face_recognition_status = "ok" if face_encodings else "error"
        except Exception as e:
            face_recognition_status = f"error: {str(e)}"

        # Disk space check (optional, if important to your service)
        disk = psutil.disk_usage('/')
        disk_status = "ok" if disk.percent < 85 else "warning"

        # Return health check results
        return jsonify({
            "status": "ok",
            "uptime": uptime_str,
            "database": db_status,
            "face_recognition": face_recognition_status,
            "disk_space": disk_status
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/face/register', methods=['POST'])
def register_face():
    """
    Endpoint to register a new face for a user.
    Expects: { "user_id": "12345", "name": "John Doe", "frames": ["base64_encoded_image1", "base64_encoded_image2", ...] }
    """
    data = request.get_json()
    user_id = data.get("user_id")
    name = data.get("name")
    frames = data.get("frames")

    # Validate input
    if not user_id or not frames or not isinstance(frames, list) or not name:
        return jsonify({"error": "Missing user_id, name, or frames"}), 400

    faces_detected = 0
    total_frames = len(frames)

    # Process all frames
    for index, frame in enumerate(frames):
        try:
            image_bytes = base64.b64decode(frame)
            image_file = io.BytesIO(image_bytes)

            image = face_recognition.load_image_file(image_file)
            face_encodings = face_recognition.face_encodings(image)

            if face_encodings:
                face_encoding = face_encodings[0]
                encoded_face = encode_face(face_encoding)
                add_face_to_db(user_id, name, encoded_face)
                faces_detected += 1
        except Exception as e:
            logger.error(f"Error processing frame {index}: {e}")

    if faces_detected > 0:
        return jsonify({"message": f"{faces_detected} face(s) registered successfully", "user_id": user_id}), 201
    else:
        return jsonify({"error": "No face detected in the provided frames"}), 400

@app.route('/api/face/recognition', methods=['POST'])
def recognize_face():
    """
    Endpoint to recognize a face.
    Expects: { "user_id": "12345", "frames": ["base64_encoded_image1", "base64_encoded_image2", ...] }
    """
    data = request.get_json()
    user_id = data.get("user_id")
    frames = data.get("frames")

    if not user_id or not frames:
        return jsonify({"error": "Missing user_id or frames"}), 400

    # Validate user_id
    stored_encoding = get_face_encoding(user_id)
    if not stored_encoding:
        return jsonify({"error": "No face registered for this user"}), 401

    try:
        stored_face_encoding = decode_face_encoding(stored_encoding)
    except Exception as e:
        return jsonify({"error": f"Error decoding stored face encoding: {str(e)}"}), 500

    for frame in frames:
        try:
            image_bytes = base64.b64decode(frame)
            if len(image_bytes) == 0:
                raise ValueError("Decoded image is empty.")

            image_np = np.frombuffer(image_bytes, dtype=np.uint8)
            image = face_recognition.load_image_file(io.BytesIO(image_np))

            face_encodings = face_recognition.face_encodings(image)

            if face_encodings:
                match_results = face_recognition.compare_faces([stored_face_encoding], face_encodings[0])

                if match_results[0]:
                    name = get_name_from_db(user_id)
                    return jsonify({"message": "Face recognized", "user_id": name}), 201
            else:
                logger.warning("No faces detected in this frame")
        except Exception as e:
            logger.error(f"Error processing frame: {str(e)}")
            return jsonify({"error": f"Error processing frame: {str(e)}"}), 500

    return jsonify({"error": "Face not recognized in any of the frames"}), 403

@app.route('/api/visitors/face/register', methods=['POST'])
def register_face_visitors():
    """
    Endpoint to register a new face for a visitor.
    Expects: { "name": "Visitor Name", "frames": ["base64_encoded_image1", "base64_encoded_image2", ...] }
    """
    data = request.get_json()
    name = data.get("name")
    frames = data.get("frames")

    if not name or not frames or not isinstance(frames, list):
        return jsonify({"error": "Missing name or frames"}), 400

    faces_detected = 0

    for index, frame in enumerate(frames):
        try:
            image_bytes = base64.b64decode(frame)
            image_file = io.BytesIO(image_bytes)

            image = face_recognition.load_image_file(image_file)
            face_encodings = face_recognition.face_encodings(image)

            if face_encodings:
                face_encoding = face_encodings[0]
                encoded_face = encode_face(face_encoding)
                add_visitor_face_to_db(name, encoded_face)
                faces_detected += 1
        except Exception as e:
            logger.error(f"Error processing frame {index}: {e}")

    if faces_detected > 0:
        return jsonify({"message": f"{faces_detected} face(s) registered successfully", "visitor_name": name}), 201
    else:
        return jsonify({"error": "No face detected in the provided frames"}), 400

@app.route('/api/visitors/face/recognition', methods=['POST'])
def recognize_face_visitors():
    """
    Endpoint to recognize a face from all visitors.
    Expects: { "frames": ["base64_encoded_image1", "base64_encoded_image2", ...] }
    """
    data = request.get_json()
    frames = data.get("frames")

    if not frames:
        return jsonify({"error": "Missing frames"}), 400

    # Get all visitors from the visitors table
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT visitor_id, name, face_encoding FROM visitors')
    visitors = cursor.fetchall()
    conn.close()

    if not visitors:
        return jsonify({"error": "No visitor data found"}), 404

    recognized_visitor = None

    # Loop through all frames
    for frame in frames:
        try:
            # Decode the base64 image from the frame
            image_bytes = base64.b64decode(frame)
            if len(image_bytes) == 0:
                raise ValueError("Decoded image is empty.")

            image_np = np.frombuffer(image_bytes, dtype=np.uint8)
            image = face_recognition.load_image_file(io.BytesIO(image_np))

            face_encodings = face_recognition.face_encodings(image)

            if face_encodings:
                # Compare each detected face encoding with all visitor face encodings
                for visitor in visitors:
                    visitor_id, visitor_name, stored_encoding = visitor

                    try:
                        stored_face_encoding = decode_face_encoding(stored_encoding)
                    except Exception as e:
                        logger.error(f"Error decoding face encoding for visitor {visitor_name}: {str(e)}")
                        continue

                    match_results = face_recognition.compare_faces([stored_face_encoding], face_encodings[0])

                    if match_results[0]:
                        recognized_visitor = {
                            "visitor_id": visitor_id,
                            "visitor_name": visitor_name
                        }
                        break  # Exit loop once a match is found

            if recognized_visitor:
                break  # Exit outer loop if a match is found

        except Exception as e:
            logger.error(f"Error processing frame: {str(e)}")
            return jsonify({"error": f"Error processing frame: {str(e)}"}), 500

    # If a match was found, return the visitor's details
    if recognized_visitor:
        return jsonify({
            "message": "Face recognized",
            "visitor_id": recognized_visitor["visitor_id"],
            "visitor_name": recognized_visitor["visitor_name"]
        }), 201

    # If no match was found after checking all visitors
    return jsonify({"error": "Face not recognized in any of the frames"}), 403


if __name__ == '__main__':
    app.run(debug=True, port=5000)
