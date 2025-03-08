"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Milk, Drumstick, Scissors } from "lucide-react"

const breeds = [
  {
    id: 1,
    name: "Jumnapari",
    image: "/breed1.webp?height=400&width=400",
    description: "A large, dual-purpose breed known for its distinctive Roman nose and pendulous ears.",
    origin: "Uttar Pradesh, India",
    characteristics: "Exported to Indonesia (known as Etawah)",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 65-90 kg, Females: 45-65 kg",
      height: "75-90 cm at withers",
      care: "Requires good nutrition and shelter from extreme weather",
    },
  },
  {
    id: 2,
    name: "Barbari",
    image: "/breed2.jpeg?height=400&width=400",
    description: "A medium-sized breed with a compact body, ideal for intensive farming systems.",
    origin: "India (adapted to local conditions)",
    characteristics: "Seasonal breeder used for intensive farming",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 35-45 kg, Females: 25-35 kg",
      height: "50-65 cm at withers",
      care: "Well-suited for stall feeding, requires regular health monitoring",
    },
  },
  {
    id: 3,
    name: "Himalayan",
    image: "/breed3.jpg?height=400&width=400",
    description: "A hardy mountain breed adapted to high altitudes and harsh conditions.",
    origin: "Himalayan belt",
    characteristics: "Found only in hilly regions",
    purposes: ["meat", "wool", "milk"],
    additionalInfo: {
      weight: "Adult males: 40-55 kg, Females: 30-45 kg",
      height: "60-75 cm at withers",
      care: "Naturally resilient but benefits from protection during extreme weather",
    },
  },
  {
    id: 4,
    name: "Surati/Surti",
    image: "/breed4.jpg?height=400&width=400",
    description: "Known for high milk yield and adaptability to various climatic conditions.",
    origin: "Maharashtra and nearby regions",
    characteristics: "High yield capacity",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 40-50 kg, Females: 30-40 kg",
      height: "65-75 cm at withers",
      care: "Requires balanced nutrition to maintain milk production",
    },
  },
  {
    id: 5,
    name: "Sojat",
    image: "/breed5.jpg?height=400&width=400",
    description: "A cross of Jamunapari with similar attributes but more adaptable to different environments.",
    origin: "Cross of Jamunapari",
    characteristics: "Variation in coat color, generally white with occasional tan/black patches",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 60-80 kg, Females: 40-60 kg",
      height: "70-85 cm at withers",
      care: "Similar care requirements to Jamunapari",
    },
  },
  {
    id: 6,
    name: "Beetal",
    image: "/breed6.webp?height=400&width=400",
    description: "A large breed with high milk production, similar to Jamnapari and Malabari goats.",
    origin: "Punjab region (India and Pakistan)",
    characteristics: "Similar to Jamnapari and Malabari goats",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 65-85 kg, Females: 45-60 kg",
      height: "75-90 cm at withers",
      care: "Requires good nutrition and regular health checks",
    },
  },
  {
    id: 7,
    name: "Totapuri",
    image: "/breed7.webp?height=400&width=400",
    description: "A friendly, adaptable breed known for its quiet temperament and cleanliness.",
    origin: "Southern India",
    characteristics: "Quiet, clean, friendly, adaptable to various environments",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 45-60 kg, Females: 35-45 kg",
      height: "65-80 cm at withers",
      care: "Good with children and other animals, requires moderate care",
    },
  },
  {
    id: 8,
    name: "Barbari (African)",
    image: "/breed8.jpg?height=400&width=400",
    description: "A highly prolific, non-seasonal breeding goat well-suited for stall feeding.",
    origin: "Traced to Berbera, Somalia in East Africa",
    characteristics: "Highly prolific and non-seasonal",
    purposes: ["milk", "meat"],
    additionalInfo: {
      weight: "Adult males: 30-40 kg, Females: 25-35 kg",
      height: "55-65 cm at withers",
      care: "Well-suited for restrained and stall-feeding conditions",
    },
  },
]

const PurposeIcon = ({ purpose }) => {
  switch (purpose) {
    case "milk":
      return <Milk size={20} className="text-gold-accent" title="Milk production" />
    case "meat":
      return <Drumstick size={20} className="text-gold-accent" title="Meat production" />
    case "wool":
      return <Scissors size={20} className="text-gold-accent" title="Wool production" />
    default:
      return null
  }
}

export default function BreedsSection() {
  const [activeBreed, setActiveBreed] = useState(null)

  return (
    <section className="py-20 md:py-32 wood-texture">
      <div className="container mx-auto px-4 md:px-8">
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

                {/* Additional information on hover */}
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

