'use client'

import React, { useState } from 'react'
import Camera from '../../components/Camera'
import LoadingAnimation from '../../components/LoadingAnimation'
import axios from 'axios'

export default function Register() {
  const [status, setStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_HOST_URL;

  // Function to handle the capture of frames and registration
  const handleCapture = async (frames: string[]) => {
    if (!name) {
      setMessage('Please provide a name.')
      return
    }

    setStatus('processing')
    setMessage('Processing your face data...')
    try {
      // Send all frames in a single POST request
      const response = await axios.post(`${serverUrl}/api/visitors/face/register`, {
        name: name,  // Send the name along with the frames
        frames: frames,
      })
      if (response.status === 201) {
        setStatus('success')
        setMessage('Face registered successfully! 😊')
      } else {
        setStatus('error')
        setMessage('Oops! Something went wrong. 😕 Please try again.')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus('error')
      setMessage('Oops! Something went wrong. 😕 Please try again.')
    }
  }

  // Function to reset the state for retrying
  const handleRetry = () => {
    setStatus('idle')
    setMessage('')
    setName('')  // Reset name input as well
  }

  // Function to handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // Function to handle Register button click
  const handleRegister = () => {
    if (!name) {
      setMessage('Name is required to proceed with the registration.')
      return
    }
    setStatus('capturing')
    setMessage('Capturing face data...')
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 sm:text-5xl">
          Face Registration
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Let&apos;s set up your face for quick and secure access!
        </p>
      </div>
      <div className="mt-12 flex flex-col items-center">
        <>
          <Camera onCapture={handleCapture} frameCount={5} isCapturing={status === 'capturing'} />

          {/* Name input field */}
          <div className="mt-6 w-full max-w-xs">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="w-full p-4 text-xl rounded-md border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Register button */}
          <div className="mt-4">
            {status === 'idle' && (
              <button
                onClick={handleRegister}
                className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </button>
            )}
          </div>

          <div className="mt-8 text-center">
            {status === 'processing' && (
              <div className="mb-4">
                <LoadingAnimation />
              </div>
            )}
            <p className="text-2xl font-semibold">
              {status === 'idle' && '😊 Ready to capture your beautiful face!'}
              {status === 'capturing' && '📸 Smile for the camera!'}
              {status === 'processing' && '🔍 ' + message}
              {status === 'success' && '🎉 ' + message}
              {status === 'error' && '😓 ' + message}
            </p>

            {/* Show Retry button if there is an error */}
            {status === 'error' && (
              <div className="mt-4">
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Retry Registration
                </button>
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  )
}
