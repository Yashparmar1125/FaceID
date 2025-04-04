'use client'

import React, { useState, useEffect } from 'react'
import Camera from '../../components/Camera'
import LoadingAnimation from '../../components/LoadingAnimation'
import axios, { AxiosError } from 'axios'

export default function Recognize() {
  const [status, setStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_HOST_URL;

  // Get userId from the search parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setUserId(id);
  }, []);

  const handleCapture = async (frames: string[]) => {
    if (!userId) {
      setStatus('error');
      setMessage('No user ID found.');
      return;
    }

    setStatus('processing')
    setMessage('Analyzing your face...')
    try {
      const response = await axios.post(`${serverUrl}/api/face/recognition`, { user_id: userId, frames: frames })
      if (response.status === 201) {
        setStatus('success')
        setMessage(`Welcome back, ${response.data.name}! 😃`)
      } else {
        setStatus('error')
        if (response.status === 403) {
          setMessage('Hmm, I don\'t recognize that face. 🤔 Please try again.')
        } else if (response.status === 401) {
          setMessage('Oops! It seems your face isn’t registered yet. 😅')
        } else {
          setMessage('Oh no! Something went wrong. 😓 Please try again.')
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setStatus('error')
        if (error.response && error.response.status === 403) {
          setMessage('Hmm, I don\'t recognize that face. 🤔 Please try again.')
        } else if (error.response && error.response.status === 401) {
          setMessage('Oops! It seems your face isn’t registered yet. 😅')
        } else {
          setMessage('Oh no! Something went wrong. 😓 Please try again.')
        }
      } else {
        setStatus('error')
        setMessage('Something unexpected went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 sm:text-5xl">
          Face Recognition
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Let&apos;s see if we remember that lovely face of yours!
        </p>
      </div>
      <div className="mt-12 flex flex-col items-center">
        <Camera onCapture={handleCapture} frameCount={5} isCapturing={status === 'idle' || status === 'capturing'} />
        <div className="mt-8 text-center">
          {status === 'processing' && (
            <div className="mb-4">
              <LoadingAnimation />
            </div>
          )}
          <p className="text-2xl font-semibold">
            {status === 'idle' && '😊 Ready when you are!'}
            {status === 'capturing' && '🔍 Looking for your face...'}
            {status === 'processing' && '🔍 ' + message}
            {status === 'success' && '🎉 ' + message}
            {status === 'error' && message}
          </p>
          {status === 'success' && (
            <p className="mt-4 text-xl text-blue-400">
              Face recognized successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
//vv