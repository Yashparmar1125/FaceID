'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'

interface CameraProps {
  onCapture: (frames: string[]) => void
  frameCount: number
  isCapturing: boolean
}

const Camera: React.FC<CameraProps> = ({ onCapture, frameCount, isCapturing }) => {
  const webcamRef = useRef<Webcam>(null)
  const [isCapturingState, setIsCapturingState] = useState(false)
  const [captureProgress, setCaptureProgress] = useState(0)
  const [isWebcamReady, setIsWebcamReady] = useState(false)

  // Wait for webcam initialization before starting capture
  const captureFrames = useCallback(() => {
    setIsCapturingState(true)
    const frames: string[] = []
    let capturedFrames = 0

    const captureFrame = () => {
      if (webcamRef.current) {
        // Capture the frame
        const imageSrc = webcamRef.current.getScreenshot()

        if (imageSrc && isValidBase64(imageSrc)) {
          const cleanedImageSrc = cleanBase64(imageSrc)
          console.log('Captured Frame:', cleanedImageSrc)
          frames.push(cleanedImageSrc)
          capturedFrames++
          setCaptureProgress((capturedFrames / frameCount) * 100)
        } else {
          console.log('Failed to capture frame, imageSrc is invalid or empty.')
        }
      }

      if (capturedFrames < frameCount) {
        // Wait a short interval (50ms) to capture the next frame
        setTimeout(captureFrame, 50)
      } else {
        setIsCapturingState(false)
        setCaptureProgress(0)
        onCapture(frames)  // Send captured frames to parent
      }
    }

    captureFrame()  // Start capturing frames
  }, [frameCount, onCapture])  // Add frameCount and onCapture as dependencies

  useEffect(() => {
    if (isCapturing && isWebcamReady && !isCapturingState) {
      captureFrames()
    }
  }, [isCapturing, isWebcamReady, isCapturingState, captureFrames])  // Add all dependencies to the array

  // Callback to indicate when the webcam is ready
  const handleWebcamReady = () => {
    setIsWebcamReady(true)
  }

  // Helper function to clean Base64 string (removes any data URI prefix)
  const cleanBase64 = (str: string) => {
    return str.replace(/^data:image\/(jpeg|png);base64,/, '')
  }

  // Helper function to validate base64 string
  const isValidBase64 = (str: string) => {
    const regex = /^data:image\/(jpeg|png);base64,/;
    return regex.test(str)
  }

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/50">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"  // Use PNG format for screenshots
          videoConstraints={{ width: 1920, height: 1080 }}
          onUserMedia={handleWebcamReady} // Set callback when webcam is ready
          className="w-full h-full object-cover"
        />
      </div>

      {isCapturingState && (
        <div 
          className="absolute inset-0 border-4 border-blue-500 rounded-full"
          style={{
            borderTopColor: 'transparent',
            transform: `rotate(${captureProgress * 3.6}deg)`,
            transition: 'transform 0.1s linear'
          }}
        />
      )}
      {isCapturingState && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-500 bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full animate-ping"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Camera
