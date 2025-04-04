import React from 'react'
import { FaUsers, FaFingerprint, FaRegAddressCard } from 'react-icons/fa' // Icons for better UI

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 sm:text-5xl">
          About FaceID
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Experience the future of security with our advanced face recognition technology.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">Our Mission</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-300">
            At FaceID, we are dedicated to revolutionizing security by utilizing cutting-edge face recognition technology. Our mission is to provide fast, secure, and seamless access for users with the highest standards of privacy and accuracy.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 bg-gray-800 rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">How FaceID Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-lg">
            <FaFingerprint className="text-blue-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Register Your Face</h3>
            <p className="text-gray-300">
              Securely register your face with our advanced system to create a unique biometric profile.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-lg">
            <FaUsers className="text-blue-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Verify Your Identity</h3>
            <p className="text-gray-300">
              Use your face to quickly verify your identity and gain access to your accounts and services.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-lg">
            <FaRegAddressCard className="text-blue-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Seamless Access</h3>
            <p className="text-gray-300">
              Enjoy a seamless and secure login experience with no passwords, just a glance!
            </p>
          </div>
        </div>
      </section>

      

      <section className="bg-gray-900 text-white py-12 mt-12">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">Contact Us</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-6">
            Have questions? Reach out to us anytime!
          </p>
          <a
            href="yashparmar11y@gmail.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
