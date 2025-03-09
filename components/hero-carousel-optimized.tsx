"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import NextImage from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import { useIsMobile } from "@/hooks/use-is-mobile"

const slides = [
  {
    id: 1,
    image: "/herofinal1.webp",
    title: "Garhwal Goats",
    description: "Premium goat breeds raised in the pristine mountains of Uttrakhand",
    buttonText: "Discover Our Heritage",
    buttonLink: "/about",
  },
  {
    id: 2,
    image: "/hero1.webp",
    title: "Premium Quality Products",
    description: "Experience the finest products from our mountain-raised goats",
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
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const timeoutRef = useRef(null)
  const isVisibleRef = useRef(true)
  const isMobile = useIsMobile()

  // Previous slide
  const goToPrevious = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    // Combine state updates for better performance
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

    // Simpler timeout without requestAnimationFrame for better mobile performance
    timeoutRef.current = setTimeout(
      () => {
        setIsAnimating(false)
      },
      isMobile ? 300 : 400,
    ) // Even faster on mobile
  }, [isAnimating, isMobile])

  // Next slide
  const goToNext = useCallback(() => {
    if (isAnimating || !isVisibleRef.current) return
    setIsAnimating(true)

    // Combine state updates for better performance
    setDirection(1)
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

    // Simpler timeout without requestAnimationFrame for better mobile performance
    timeoutRef.current = setTimeout(
      () => {
        setIsAnimating(false)
      },
      isMobile ? 300 : 400,
    ) // Even faster on mobile
  }, [isAnimating, isMobile])

  // Setup IntersectionObserver to pause auto-play when not visible
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.2 }, // Increased threshold for better performance
    )

    const carouselElement = document.getElementById("hero-carousel")
    if (carouselElement) {
      observer.observe(carouselElement)
    }

    return () => {
      if (carouselElement) {
        observer.unobserve(carouselElement)
      }
    }
  }, [])

  // Auto-slide setup with optimized timers for mobile
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    const startAutoplay = () => {
      clearTimeout(timeoutRef.current)

      // Use simple setTimeout for better mobile performance
      timeoutRef.current = setTimeout(() => {
        if (isVisibleRef.current) {
          goToNext()
        }
        startAutoplay()
      }, 5000)
    }

    // Start autoplay
    startAutoplay()

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [goToNext])

  // Pause auto-play when tab is not visible
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeoutRef.current)
      } else {
        timeoutRef.current = setTimeout(goToNext, 5000)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [goToNext])

  // Enhanced cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Animation variants - optimized for mobile
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? (isMobile ? 200 : 300) : isMobile ? -200 : -300, // Smaller distance on mobile
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? (isMobile ? -200 : -300) : isMobile ? 200 : 300, // Smaller distance on mobile
      opacity: 0,
    }),
  }

  // Simplified animation transitions for mobile
  const getTransition = () => {
    if (isMobile) {
      return {
        x: { type: "tween", duration: 0.3 }, // Use simpler tween on mobile
        opacity: { duration: 0.2 },
      }
    }

    return {
      x: { type: "spring", stiffness: 300, damping: 30 }, // Reduced stiffness
      opacity: { duration: 0.25 },
    }
  }

  return (
    <>
      <Head>
        {/* Preload only the current, previous and next slides */}
        {[
          slides[currentIndex],
          slides[currentIndex === 0 ? slides.length - 1 : currentIndex - 1],
          slides[(currentIndex + 1) % slides.length],
        ].map((slide) => (
          <link key={slide.id} rel="preload" href={slide.image} as="image" type="image/webp" importance="high" />
        ))}
      </Head>

      <section id="hero-carousel" className="relative h-screen overflow-hidden">
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={getTransition()}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <NextImage
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                className="object-cover"
                priority={true}
                sizes="100vw"
                quality={isMobile ? 80 : 90} // Lower quality on mobile for better performance
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-forest-green/50" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-winter-white px-4">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.1 : 0.15 }}
                >
                  {slides[currentIndex].title}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl font-montserrat font-light max-w-3xl mb-12"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.15 : 0.25 }}
                >
                  {slides[currentIndex].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.2 : 0.35 }}
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
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

        {/* Navigation buttons */}
        <motion.button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
          aria-label="Previous slide"
          whileHover={isMobile ? {} : { scale: 1.1 }}
          whileTap={isMobile ? { scale: 0.95 } : { scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
          aria-label="Next slide"
          whileHover={isMobile ? {} : { scale: 1.1 }}
          whileTap={isMobile ? { scale: 0.95 } : { scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Indicators - optimized for mobile */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
                timeoutRef.current = setTimeout(
                  () => {
                    setIsAnimating(false)
                  },
                  isMobile ? 300 : 400,
                )
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-gold-accent" : "bg-winter-white/60"
              }`}
              style={{
                width: index === currentIndex ? "2rem" : "0.75rem",
                transform: index === currentIndex && !isMobile ? "scale(1.1)" : "scale(1)",
              }}
              whileHover={isMobile ? {} : { scale: 1.2 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

