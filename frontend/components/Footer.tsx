import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="max-w-7xl mx-auto text-center flex justify-between items-center px-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} FaceID. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
