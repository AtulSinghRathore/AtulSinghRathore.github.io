'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center">
      <motion.h1
        className="text-6xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Atul Singh
      </motion.h1>
      <p className="mt-4 text-xl text-gray-300">
        I craft fast, elegant, human-centered web experiences.
      </p>
    </section>
  )
}
