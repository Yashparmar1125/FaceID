import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FaceID - Advanced Face Recognition',
  description: 'Secure and seamless face recognition service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen`}>
        <Navbar></Navbar>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}

