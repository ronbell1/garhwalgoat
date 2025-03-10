"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Domesticated Goats",
    description:
      "High-quality, ethically raised goats for farming and breeding. Our goats are carefully selected from premium breeds adapted to the Himalayan environment, ensuring robust health and excellent productivity.",
    image: "/domest.jpg?height=400&width=600",
    category: "featured",
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
      "Fresh, creamy milk from our pasture-raised goats. Rich in essential nutrients and naturally homogenized, our goat milk is easier to digest than cow milk and has a smooth, clean taste.",
    image: "/goatmilk.png?height=400&width=600",
    category: "featured",
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
      "Nutrient-rich, organic fertilizer for your garden and crops. Our goat manure is naturally processed and aged to create a balanced, slow-release fertilizer that improves soil structure.",
    image: "/manure.jpg?height=400&width=600",
    category: "featured",
    benefits: [
      "Rich in nitrogen, phosphorus, and potassium",
      "Improves soil structure and water retention",
      "Slow-release nutrients for long-term feeding",
      "Lower odor than other animal manures",
      "Safe for all plants, including vegetables",
    ],
  },
  {
    id: 4,
    name: "Goat Feed",
    description:
      "High-quality, nutrient-rich feed designed for optimal goat health. Our goat feed is formulated with natural ingredients to support growth, digestion, and overall well-being, ensuring strong and healthy livestock.",
    image: "/goatfeed1.webp?height=400&width=600",
    category: "featured",
    benefits: [
      "Balanced nutrition for optimal growth",
      "Rich in essential vitamins and minerals",
      "Supports digestion and gut health",
      "No artificial additives or preservatives",
      "Formulated for all goat breeds and life stages",
    ],
  },
];

export default function ProductsPage() {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const trainingRef = useRef(null);
  const trainingInView = useInView(trainingRef, { once: true, amount: 0.3 });

  const toggleExpand = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {/* Products Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-6">
              Our Products
            </h1>
            <div className="gold-divider"></div>
            <p className="text-base md:text-lg text-forest-green/80 leading-loose mt-6">
              Discover our premium selection of goat products, crafted with care
              in the Himalayan mountains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-winter-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-playfair mb-4">
                    {product.name}
                  </h3>
                  <p className="text-base md:text-lg text-forest-green/80 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="flex items-center text-forest-green font-montserrat text-sm uppercase tracking-wider font-medium hover:text-gold-accent transition-colors"
                  >
                    {expandedProduct === product.id ? (
                      <>
                        Hide Benefits <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View Benefits <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>

                  {expandedProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6"
                    >
                      <h4 className="font-montserrat text-sm uppercase tracking-wider font-medium mb-4 text-gold-accent">
                        Key Benefits
                      </h4>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="text-gold-accent mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span className="text-forest-green/80">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={`/contact?product=${encodeURIComponent(
                      product.name
                    )}`}
                    className="w-full block text-center bg-forest-green text-winter-white px-6 py-3 font-montserrat text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:bg-gold-accent rounded-lg"
                  >
                    Inquire Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goat Farm Training Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div ref={trainingRef} className="max-w-6xl mx-auto">
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100"
              variants={fadeIn}
              initial="hidden"
              animate={trainingInView ? "visible" : "hidden"}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 relative h-96 lg:h-auto overflow-hidden">
                  <Image
                    src="/trainingprogram.jpg?height=800&width=600"
                    alt="Goat Farm Training"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                <div className="p-8 md:p-12 lg:w-3/5">
                  <div className="flex items-center mb-8">
                    <div className="bg-gold-accent/20 p-3 rounded-full mr-5">
                      <GraduationCap className="text-gold-accent" size={36} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-playfair text-forest-green font-bold">
                     Training Programs
                    </h3>
                  </div>
                  
                  <p className="text-forest-green/80 mb-8 text-lg md:text-xl leading-relaxed">
                    Our immersive training courses combine ancient wisdom with modern techniques to equip you with everything needed for successful and ethical goat farming.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-gold-accent/10 p-1 rounded-full mr-3">
                          <Check className="text-gold-accent h-5 w-5" />
                        </div>
                        <span className="text-forest-green/80 text-base md:text-lg">
                          Hands-on experience with rare Himalayan breeds
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-gold-accent/10 p-1 rounded-full mr-3">
                          <Check className="text-gold-accent h-5 w-5" />
                        </div>
                        <span className="text-forest-green/80 text-base md:text-lg">
                          Sustainable and ethical farming practices
                        </span>
                      </li>
                    </ul>
                    
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-gold-accent/10 p-1 rounded-full mr-3">
                          <Check className="text-gold-accent h-5 w-5" />
                        </div>
                        <span className="text-forest-green/80 text-base md:text-lg">
                          Premium product development techniques
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-gold-accent/10 p-1 rounded-full mr-3">
                          <Check className="text-gold-accent h-5 w-5" />
                        </div>
                        <span className="text-forest-green/80 text-base md:text-lg">
                          Business strategy for farm profitability
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-block bg-forest-green text-winter-white px-8 py-3 md:px-10 md:py-4 rounded-lg font-montserrat text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:bg-walnut-brown hover:shadow-lg text-center"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Product Reservations Section */}
       <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-playfair text-forest-green mb-6">
            Product Reservations
          </h2>
          <p className="text-lg text-forest-green/80 leading-relaxed mb-4">
            Due to the artisanal nature of our products and limited production
            capacity, we offer a reservation system for our most sought-after
            items. Reserve your favorites to ensure availability.
          </p>
          <p className="text-lg text-forest-green/80 leading-relaxed mb-8">
            Our reservation system allows you to secure your preferred products
            in advance, with flexible pickup dates or delivery options. Special
            discounts are available for regular subscribers.
          </p>
          <a
            href="/contact"
            className="inline-block bg-forest-green text-winter-white px-6 py-3 text-lg font-montserrat uppercase tracking-wide rounded-lg transition-all duration-300 hover:bg-gold-accent"
          >
            Reserve Products
          </a>
        </div>
      </section>
    </>
  );
}