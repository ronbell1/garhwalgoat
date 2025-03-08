"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Domesticated Goats",
    description:
      "High-quality, ethically raised goats for farming and breeding. Our goats are carefully selected from premium breeds adapted to the Himalayan environment, ensuring robust health and excellent productivity.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Carefully selected premium breeds",
      "Excellent genetic lineage",
      "Disease-resistant and hardy",
      "Adapted to various climatic conditions",
      "Comprehensive breeding documentation",
    ],
  },
  {
    id: 2,
    name: "Goat Milk",
    description:
      "Fresh, creamy milk from our pasture-raised goats. Rich in essential nutrients and naturally homogenized, our goat milk is easier to digest than cow milk and has a smooth, clean taste without the characteristic 'goaty' flavor.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Higher in calcium than cow milk",
      "Naturally homogenized",
      "Easier to digest for sensitive stomachs",
      "Rich in essential vitamins and minerals",
      "Clean, sweet taste profile",
    ],
  },
  {
    id: 3,
    name: "Goat Manure",
    description:
      "Nutrient-rich, organic fertilizer for your garden and crops. Our goat manure is naturally processed and aged to create a balanced, slow-release fertilizer that improves soil structure while providing essential nutrients for plant growth.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Rich in nitrogen, phosphorus and potassium",
      "Improves soil structure and water retention",
      "Slow-release nutrients for long-term feeding",
      "Lower odor than other animal manures",
      "Safe for all plants including vegetables",
    ],
  },
  {
    id: 4,
    name: "Goat Meat",
    description:
      "Premium, tender meat from our ethically raised goats. Our goat meat is lean, flavorful, and produced from animals raised in humane conditions with natural diets, resulting in superior taste and nutritional quality.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Leaner than beef with less cholesterol",
      "Higher protein content than other red meats",
      "Rich in iron, potassium and B vitamins",
      "No artificial hormones or antibiotics",
      "Ethically raised with humane practices",
    ],
  },
]

export default function ProductSection() {
  const [expandedProduct, setExpandedProduct] = useState(null)

  const toggleExpand = (id) => {
    if (expandedProduct === id) {
      setExpandedProduct(null)
    } else {
      setExpandedProduct(id)
    }
  }

 
}

