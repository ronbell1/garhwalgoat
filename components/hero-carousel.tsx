"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/herofinal.webp",
    title: "Garhwal Goats",
    description:
      "Premium goat breeds raised in the pristine mountains of Uttrakhand",
    buttonText: "Discover Our Heritage",
    buttonLink: "/about",
  },
  {
    id: 2,
    image: "/hero1.webp",
    title: "Premium Quality Products",
    description:
      "Experience the finest products from our mountain-raised goats",
    buttonText: "Explore Our Products",
    buttonLink: "/products",
  },
  {
    id: 3,
    image: "/hero3.webp",
    title: "Sustainable & Ethical Farming",
    description: "Working in harmony with nature and tradition",
    buttonText: "Learn Our Practices",
    buttonLink: "/about#philosophy",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  
  // Calculate next index to preload
  const nextIndex = (currentIndex + 1) % slides.length;

  // Mark image as loaded
  const handleImageLoaded = useCallback((id) => {
    setLoadedImages(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  }, []);

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

  // Auto-slide every 5 seconds (slightly longer to improve performance)
  useEffect(() => {
    // Only start auto-sliding once the first image is loaded
    if (loadedImages.includes(slides[currentIndex].id)) {
      const interval = setInterval(goToNext, 5000);
      return () => clearInterval(interval);
    }
  }, [goToNext, currentIndex, loadedImages]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="100vw"
              quality={80}
              onLoad={() => handleImageLoaded(slides[currentIndex].id)}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-forest-green/50" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-winter-white px-4">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {slides[currentIndex].title}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-montserrat font-light max-w-3xl mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {slides[currentIndex].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
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
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hidden preload for next image */}
      <div className="hidden" aria-hidden="true">
        {nextIndex !== currentIndex && (
          <Image
            src={slides[nextIndex].image}
            alt="Preload next"
            width={1}
            height={1}
            onLoad={() => handleImageLoaded(slides[nextIndex].id)}
          />
        )}
      </div>

      {/* Navigation buttons - only show when current image is loaded */}
      {loadedImages.includes(slides[currentIndex].id) && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
            {slides.map((_, index) => (
              <button
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}