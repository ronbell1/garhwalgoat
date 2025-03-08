"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

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
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const autoPlayRef = useRef(null);
  const isVisibleRef = useRef(true);
  
  // Previous slide
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Next slide
  const goToNext = useCallback(() => {
    if (isAnimating || !isVisibleRef.current) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Setup IntersectionObserver to pause auto-play when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    const carouselElement = document.getElementById('hero-carousel');
    if (carouselElement) {
      observer.observe(carouselElement);
    }
    
    return () => {
      if (carouselElement) {
        observer.unobserve(carouselElement);
      }
    };
  }, []);

  // Auto-slide setup with requestAnimationFrame for better performance
  useEffect(() => {
    let timeoutId;
    
    const tick = () => {
      goToNext();
      timeoutId = setTimeout(() => {
        autoPlayRef.current = requestAnimationFrame(tick);
      }, 5000);
    };
    
    autoPlayRef.current = requestAnimationFrame(() => {
      timeoutId = setTimeout(tick, 5000);
    });
    
    return () => {
      if (autoPlayRef.current) {
        cancelAnimationFrame(autoPlayRef.current);
      }
      clearTimeout(timeoutId);
    };
  }, [goToNext]);

  // Pause auto-play when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (autoPlayRef.current) {
          cancelAnimationFrame(autoPlayRef.current);
        }
      } else {
        autoPlayRef.current = requestAnimationFrame(() => {
          setTimeout(goToNext, 5000);
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [goToNext]);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0
    })
  };

  // Calculate next and previous indices for dynamic image preloading
  const nextIndex = (currentIndex + 1) % slides.length;
  const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;

  return (
    <>
      {/* Preload Link tags in the head */}
      <Head>
        {slides.map(slide => (
          <link 
            key={slide.id}
            rel="preload"
            href={slide.image}
            as="image"
            type="image/webp"
          />
        ))}
      </Head>
      
      <section id="hero-carousel" className="relative h-screen overflow-hidden">
        {/* Eagerly load all images upfront with proper srcSet for responsive loading */}
        <div className="hidden" aria-hidden="true">
          {slides.map((slide) => (
            <Image
              key={slide.id}
              src={slide.image}
              alt="Preload"
              width={1920}
              height={1080}
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" 
              quality={90}
            />
          ))}
        </div>
        
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full transform-gpu will-change-transform">
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                className="object-cover"
                priority={true}
                fetchPriority="high"
                sizes="100vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                loading="eager"
              />
              <div className="absolute inset-0 bg-forest-green/50" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-winter-white px-4">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {slides[currentIndex].title}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl font-montserrat font-light max-w-3xl mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {slides[currentIndex].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={slides[currentIndex].buttonLink}
                    className="bg-winter-white text-forest-green px-8 py-4 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-gold-accent"
                    prefetch={true}
                  >
                    {slides[currentIndex].buttonText}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Actively preload next and previous images for better UX */}
        <div className="hidden" aria-hidden="true">
          <Image
            src={slides[nextIndex].image}
            alt="Preload next"
            width={1920}
            height={1080}
            priority={true}
            fetchPriority="high"
          />
          <Image
            src={slides[prevIndex].image}
            alt="Preload previous"
            width={1920}
            height={1080}
            priority={true}
            fetchPriority="high"
          />
        </div>

        {/* Navigation buttons - always visible */}
        <motion.button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-forest-green/70 text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none z-10"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

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
                setDirection(index > currentIndex ? 1 : -1);
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
    </>
  );
}