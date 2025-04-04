import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          FaceID
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-blue-400 transition-colors duration-300">Home</Link>
          <Link href="/registerVisitor" className="text-white hover:text-blue-400 transition-colors duration-300">Register</Link>
          <Link href="/recognizeVisitor" className="text-white hover:text-blue-400 transition-colors duration-300">Recognize</Link>
          <Link href="/about" className="text-white hover:text-blue-400 transition-colors duration-300">About</Link>
          

        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white">
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
