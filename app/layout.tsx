import '../styles/globals.css'
import type { ReactNode } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SmoothScroll from '../components/SmoothScroll'

export const metadata = {
  title: 'Atul Singh - Full-Stack Developer',
  description: 'I craft fast, elegant, human-centered web experiences.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body>
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
