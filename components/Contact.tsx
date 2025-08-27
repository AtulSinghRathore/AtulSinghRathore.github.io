'use client'

import { useState, FormEvent } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      })
      if (res.ok) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4">
      <h2 className="text-4xl font-bold mb-8">Get in touch</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="w-full p-3 bg-transparent border border-gray-700 focus:outline-none focus:border-white"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full p-3 bg-transparent border border-gray-700 focus:outline-none focus:border-white"
        />
        <textarea
          name="message"
          required
          placeholder="Message"
          className="w-full p-3 h-32 bg-transparent border border-gray-700 focus:outline-none focus:border-white"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full p-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send'}
        </button>
        {status === 'success' && (
          <p className="text-green-400 text-sm">Message sent!</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  )
}

