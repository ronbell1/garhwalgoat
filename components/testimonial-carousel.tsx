"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Rajiv Sharma",
    role: "Goat Farm Owner, Dehradun",
    quote:
      "The quality of goats from Garhwal Goats is exceptional. Their Mountain breed has significantly improved my farm's productivity and meat quality.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Restaurant Owner",
    quote:
      "We source all our goat meat exclusively from Garhwal Goats. The quality is consistently excellent, and our customers can taste the difference.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "First-time Farmer",
    quote:
      "As a beginner in goat farming, the guidance and support I received from Garhwal Goats was invaluable. Their Jamuna Pari goats are thriving on my farm.",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-winter-white/10 p-8 md:p-12 rounded-lg relative shadow-lg"
        >
          <Quote
            className="absolute top-6 left-6 text-gold-accent opacity-20"
            size={48}
          />
          <blockquote className="text-xl md:text-2xl font-cormorant italic text-forest-green/90 mb-8 relative z-10">
            "{testimonials[currentIndex].quote}"
          </blockquote>
          <div className="flex items-center">
            <motion.div
              className="relative w-16 h-16 rounded-full overflow-hidden mr-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover"
              />
            </motion.div>
            <div>
              <p className="font-playfair text-lg text-forest-green">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-forest-green/70 font-montserrat text-sm">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-forest-green text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none"
        aria-label="Previous testimonial"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-forest-green text-winter-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gold-accent hover:text-forest-green focus:outline-none"
        aria-label="Next testimonial"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={24} />
      </motion.button>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
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
                ? "bg-gold-accent w-6"
                : "bg-forest-green/50"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
