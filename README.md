# 🎭 FaceID

<div align="center">

![Python](https://img.shields.io/badge/python-v3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-v3.1.0-green.svg)
![Next.js](https://img.shields.io/badge/next.js-v15.1.4-black.svg)
![React](https://img.shields.io/badge/react-v18-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-v5-blue.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-v14-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![Deploy Backend](https://img.shields.io/badge/deploy%20backend-railway-blue)](https://railway.app)
[![Deploy Frontend](https://img.shields.io/badge/deploy%20frontend-vercel-black)](https://vercel.com)

</div>

## 🚀 Overview

FaceID is a cutting-edge web application for face recognition and visitor management, built with modern technologies. This system provides a seamless experience for face-based authentication and visitor tracking.

### ✨ Key Features

- 🔐 **Secure Authentication**: Face-based authentication system
- 👥 **Visitor Management**: Track and manage visitors efficiently
- 📝 **Certificate Generation**: Automated certificate creation
- 📊 **Real-time Monitoring**: System health and performance tracking

## 🛠️ Tech Stack

### 🔧 Backend
- **Python Flask 3.1.0**: Lightweight and powerful web framework
- **PostgreSQL**: Robust database management
- **Face Recognition 1.3.0**: Advanced facial recognition capabilities
- **Docker**: Containerization for easy deployment
- **Gunicorn**: Production-ready WSGI server

### 🎨 Frontend
- **Next.js 15.1.4**: Modern React framework
- **React 18**: UI component library
- **TypeScript**: Type-safe development
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **React Webcam 7.2.0**: Real-time camera integration
- **Axios**: HTTP client for API requests

## 📁 Project Structure

```
.
├── backend/
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Docker configuration
│   └── render.yaml        # Deployment configuration
│
└── frontend/
    ├── app/               # Next.js app directory
    ├── components/        # React components
    ├── lib/              # Utility functions
    ├── public/           # Static assets
    ├── .env              # Environment variables
    ├── package.json      # Node.js dependencies
    ├── tailwind.config.ts # Tailwind configuration
    └── tsconfig.json     # TypeScript configuration
```

## 🎯 Features in Detail

### 1. Face Registration
- 📸 Real-time face capture
- 🔑 User ID and name association
- 💾 Secure storage of face encodings

### 2. Face Recognition
- 🔍 Real-time face detection
- ✅ Authentication verification
- 📊 Visitor tracking analytics

### 3. Certificate Management
- 📄 Dynamic PDF generation
- ✏️ Customizable templates
- 📱 Mobile-friendly viewing

### 4. Health Monitoring
- 💓 System health checks
- 🔌 Database connectivity monitoring
- 📈 Performance metrics

## 🔌 API Documentation

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/face/register` | POST | Register new face |
| `/api/face/recognition` | POST | Recognize registered face |
| `/api/visitors/face/register` | POST | Register visitor face |
| `/api/visitors/face/recognition` | POST | Recognize visitor face |
| `/health` | GET | System health check |

## 🚀 Getting Started

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Yashparmar1125/FaceID.git

# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configurations

# Run the application
python app.py
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configurations

# Start development server
npm run dev
```

## 🌐 Deployment

### Backend Deployment (Railway)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy using Railway dashboard

### Frontend Deployment (Vercel)
1. Import your repository
2. Configure build settings
3. Deploy with Vercel

## 🔒 Security Features

- 🛡️ CORS protection
- 🔐 Secure face encoding storage
- ✅ Input validation
- 📝 Comprehensive error logging
- 🔒 Environment variable protection

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Face Recognition Library
- Next.js Team
- Flask Community
- All contributors

---

<div align="center">
Made with ❤️ by Yash Parmar
</div> 
