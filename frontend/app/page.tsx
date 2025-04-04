import Link from 'next/link'


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Welcome to FaceID
      </h1>
      <p className="text-xl mb-12 max-w-2xl">
        Experience the future of security with our advanced face recognition technology. Fast, accurate, and seamless.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-4">Face Registration</h2>
          <p className="mb-6">Securely register your face for quick access.</p>
          <Link href="/registerVisitor" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Register Now
          </Link>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-4">Face Recognition</h2>
          <p className="mb-6">Instantly verify your identity with a glance.</p>
          <Link href="/recognizeVisitor" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300">
            Recognize Now
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Register</h3>
            <p className="text-center">Securely register your face with our advanced system.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Verify</h3>
            <p className="text-center">Use your face to quickly verify your identity.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Access</h3>
            <p className="text-center">Gain secure access to your accounts and services.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

