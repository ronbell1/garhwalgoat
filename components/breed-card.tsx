"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Milk, Drumstick, Scissors } from "lucide-react"

// Breeds array and PurposeIcon component remain unchanged

export default function BreedsSection() {
  const [activeBreed, setActiveBreed] = useState(null)
  
  // Handler for touch events
  const handleTouch = (breedId) => {
    if (activeBreed === breedId) {
      setActiveBreed(null)
    } else {
      setActiveBreed(breedId)
    }
  }

  return (
    <section className="py-20 md:py-32 wood-texture">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header section remains unchanged */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-playfair mb-6">Premium Goat Breeds We Rear</h2>
          <div className="gold-divider mx-auto"></div>
          <p className="text-lg text-forest-green/80 leading-relaxed mt-4 max-w-3xl mx-auto">
            Discover our carefully selected goat breeds, each chosen for their exceptional qualities and adaptability to
            the Himalayan environment.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {breeds.map((breed, index) => (
            <motion.div
              key={breed.id}
              className="relative bg-winter-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              onHoverStart={() => setActiveBreed(breed.id)}
              onHoverEnd={() => setActiveBreed(null)}
              onTouchStart={() => handleTouch(breed.id)}
              role="button"
              tabIndex={0}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={breed.image || "/placeholder.svg"}
                  alt={breed.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-0 left-0 bg-forest-green/80 text-winter-white px-3 py-1 text-xs font-montserrat uppercase tracking-wider">
                  {breed.origin}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair mb-2">{breed.name}</h3>
                <p className="text-forest-green/80 mb-4 text-sm">{breed.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {breed.purposes.map((purpose, i) => (
                      <PurposeIcon key={i} purpose={purpose} />
                    ))}
                  </div>
                  <span className="text-xs text-forest-green/60 italic">{breed.characteristics}</span>
                </div>
                {/* Additional information on hover/touch */}
                <motion.div
                  className="absolute inset-0 bg-forest-green/90 text-winter-white p-6 flex flex-col justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeBreed === breed.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ pointerEvents: activeBreed === breed.id ? "auto" : "none" }}
                >
                  <h3 className="text-xl font-playfair mb-4 text-gold-accent">{breed.name} Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-bold">Weight:</span> {breed.additionalInfo.weight}
                    </li>
                    <li>
                      <span className="font-bold">Height:</span> {breed.additionalInfo.height}
                    </li>
                    <li>
                      <span className="font-bold">Care:</span> {breed.additionalInfo.care}
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}