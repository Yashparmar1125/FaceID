'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import LoadingAnimation from '../../components/LoadingAnimation'

// Dynamically import the Camera component (this ensures that it is only rendered client-side)
const Camera = dynamic(() => import('../../components/Camera'), { ssr: false })

export default function Register() {
  const [userId, setUserId] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  const [status, setStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_HOST_URL;

  // Fetch userId and name from search params in a useEffect hook to avoid SSR errors
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    
    // Update state with query parameters
    setUserId(id);
    setName(name);

    // Handle missing parameters by setting error state
    if (!id || !name) {
      setStatus('error');
      setMessage('User ID and Name are required in the URL to proceed with registration.');
    }
  }, []); // This effect only runs on the client side after the component mounts

  // Function to handle the capture of frames and registration
  const handleCapture = async (frames: string[]) => {
    if (!userId || !name) {
      setMessage('User ID or Name is missing.');
      return;
    }

    setStatus('processing');
    setMessage('Processing your face data...');
    try {
      // Send all frames in a single POST request
      const response = await axios.post(`${serverUrl}/api/face/register`, {
        user_id: userId,
        frames: frames,
        name: name,
      });
      if (response.status === 201) {
        setStatus('success');
        setMessage('Face registered successfully! 😊');
      } else {
        setStatus('error');
        setMessage('Oops! Something went wrong. 😕 Please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus('error');
      setMessage('Oops! Something went wrong. 😕 Please try again.');
    }
  }

  // Function to reset the state for retrying
  const handleRetry = () => {
    setStatus('idle');
    setMessage('');
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
        {/* Display loading animation or message while waiting for userId and name */}
        {userId && name ? (
          <>
            <Camera onCapture={handleCapture} frameCount={5} isCapturing={status === 'idle' || status === 'capturing'} />
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
                    className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                  >
                    Retry Registration
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-xl font-bold text-red-500">{message || 'User ID and Name are required in the URL.'}</p>
        )}
      </div>
    </div>
  )
}
