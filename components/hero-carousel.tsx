"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import NextImage from "next/image"; // Renamed from Image to NextImage
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
  const timeoutRef = useRef(null);
  const isVisibleRef = useRef(true);
  const initialLoadRef = useRef(true);
  
  // Enhanced preloading for smoother transitions
  useEffect(() => {
    // Create and preload all images on initial load
    const preloadAllImages = () => {
      slides.forEach(slide => {
        // Using window.Image explicitly to avoid conflicts
        const img = new window.Image();
        img.src = slide.image;
        img.onload = () => {
          // Mark image as loaded in browser cache
        };
      });
    };
    
    // Only run in the browser environment
    if (typeof window !== 'undefined') {
      preloadAllImages();
    }
    
    // Mark initial load as complete
    initialLoadRef.current = false;
  }, []);
  
  // Previous slide
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    // Use RAF for smoother transition timing
    requestAnimationFrame(() => {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 400); // Reduced from 500ms to 400ms for faster transitions
    });
  }, [isAnimating]);

  // Next slide
  const goToNext = useCallback(() => {
    if (isAnimating || !isVisibleRef.current) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    // Use RAF for smoother transition timing  
    requestAnimationFrame(() => {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 400); // Reduced from 500ms to 400ms for faster transitions
    });
  }, [isAnimating]);

  // Setup IntersectionObserver to pause auto-play when not visible
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
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
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const startAutoplay = () => {
      clearTimeout(timeoutRef.current);
      autoPlayRef.current = requestAnimationFrame(() => {
        timeoutRef.current = setTimeout(() => {
          goToNext();
          startAutoplay();
        }, 5000);
      });
    };
    
    // Start autoplay
    startAutoplay();
    
    return () => {
      cancelAnimationFrame(autoPlayRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [goToNext]);

  // Pause auto-play when tab is not visible
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(autoPlayRef.current);
        clearTimeout(timeoutRef.current);
      } else {
        autoPlayRef.current = requestAnimationFrame(() => {
          timeoutRef.current = setTimeout(goToNext, 5000);
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [goToNext]);

  // Enhanced cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(autoPlayRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Animation variants - optimized for smoother loops
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300, // Reduced from 500 to 300 for faster transitions
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300, // Reduced from 500 to 300 for faster transitions
      opacity: 0
    })
  };

  // Get the indices of all slides to ensure proper preloading
  const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % slides.length;
  
  // Special preloading for the first slide when on the last slide
  const needsSpecialPreload = currentIndex === slides.length - 1;

  return (
    <>
      <Head>
        {/* Preload link tags in the head with higher importance */}
        {slides.map(slide => (
          <link 
            key={slide.id}
            rel="preload"
            href={slide.image}
            as="image"
            type="image/webp"
            importance="high"
          />
        ))}
      </Head>
      
      <section id="hero-carousel" className="relative h-screen overflow-hidden">
        {/* Eagerly load all images upfront */}
        <div className="hidden" aria-hidden="true">
          {slides.map((slide) => (
            <NextImage
              key={slide.id}
              src={slide.image}
              alt="Preload"
              width={1920}
              height={1080}
              priority={true}
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              quality={90}
            />
          ))}
        </div>
        
        {/* Special preloading for the first slide when on the last slide */}
        {needsSpecialPreload && (
          <div className="hidden" aria-hidden="true">
            <NextImage
              src={slides[0].image}
              alt="Preload first slide"
              width={1920}
              height={1080}
              priority={true}
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              quality={90}
            />
          </div>
        )}
        
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
              x: { type: "spring", stiffness: 350, damping: 30 }, // Increased stiffness for faster motion
              opacity: { duration: 0.25 } // Reduced for faster fade
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full transform-gpu will-change-transform">
              <NextImage
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
                unoptimized={true} // Skip optimization to ensure immediate rendering from cache
              />
              <div className="absolute inset-0 bg-forest-green/50" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-winter-white px-4">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }} // Faster animations
                >
                  {slides[currentIndex].title}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl font-montserrat font-light max-w-3xl mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }} // Faster animations
                >
                  {slides[currentIndex].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }} // Faster animations
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

        {/* Navigation buttons */}
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
                requestAnimationFrame(() => {
                  timeoutRef.current = setTimeout(() => {
                    setIsAnimating(false);
                  }, 400);
                });
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