"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/herofinal.webp?height=1080&width=1920",
    title: "Garhwal Goats",
    description:
      "Premium goat breeds raised in the pristine mountains of Uttrakhand",
    buttonText: "Discover Our Heritage",
    buttonLink: "/about",
  },
  {
    id: 2,
    image: "/hero1.webp?height=1080&width=1920",
    title: "Premium Quality Products",
    description:
      "Experience the finest products from our mountain-raised goats",
    buttonText: "Explore Our Products",
    buttonLink: "/products",
  },
  {
    id: 3,
    image: "/hero3.webp?height=1080&width=1920",
    title: "Sustainable & Ethical Farming",
    description: "Working in harmony with nature and tradition",
    buttonText: "Learn Our Practices",
    buttonLink: "/about#philosophy",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Previous slide
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Next slide
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Auto-slide every 4 seconds (was 8s)
  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.5, ease: "easeInOut" }} // Faster transition
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={slides[currentIndex].image || "/placeholder.svg"}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-forest-green/50" />

            {/* Content */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center text-winter-white px-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {slides[currentIndex].title}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-montserrat font-light max-w-3xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {slides[currentIndex].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={slides[currentIndex].buttonLink}
                  className="bg-winter-white text-forest-green px-8 py-4 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-gold-accent"
                >
                  {slides[currentIndex].buttonText}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Previous Button */}
      <motion.button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Next Button */}
      <motion.button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentIndex(index);
              setTimeout(() => setIsAnimating(false), 500);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gold-accent w-8"
                : "bg-winter-white/60"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
