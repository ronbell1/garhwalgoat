"use client"

import type React from "react"

import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your API
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="bg-gold-accent/20 border border-gold-accent p-4 text-center">
          <p className="text-winter-white">Thank you for joining our exclusive community.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full bg-winter-white/10 border-b border-winter-white/30 px-4 py-2 text-winter-white placeholder-winter-white/50 focus:outline-none focus:border-gold-accent transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold-accent text-forest-green px-4 py-2 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-winter-white"
          >
            Join Now
          </button>
        </form>
      )}
    </div>
  )
}

