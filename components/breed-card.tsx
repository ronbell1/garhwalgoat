"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface BreedProps {
  breed: {
    name: string
    description: string
    image: string
  }
}

export default function BreedCard({ breed }: BreedProps) {
  const [isTouched, setIsTouched] = useState(false);
  
  return (
    <motion.div
      className="bg-winter-white rounded-lg overflow-hidden shadow-lg"
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      animate={isTouched ? {
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      } : {}}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsTouched(false), 1000);
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          animate={isTouched ? { scale: 1.05 } : {}}
          transition={{ duration: 0.5 }} 
          className="h-full w-full"
        >
          <Image src={breed.image || "/placeholder.svg"} alt={breed.name} fill className="object-cover" />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-playfair mb-2">{breed.name}</h3>
        <p className="text-forest-green/80">{breed.description}</p>
      </div>
    </motion.div>
  )
}