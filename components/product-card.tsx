"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ProductProps {
  product: {
    name: string
    description: string
    image: string
  }
  delay?: number
}

export default function ProductCard({ product, delay = 0 }: ProductProps) {
  return (
    <motion.div
      className="bg-winter-white rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-playfair mb-2">{product.name}</h3>
        <p className="text-forest-green/80 mb-4">{product.description}</p>
        <motion.button
          className="bg-forest-green text-winter-white px-4 py-2 rounded-md font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-gold-accent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  )
}

