"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Update the testimonials array to remove images and set all ratings to 5
const testimonials = [
  {
    id: 1,
    name: "Rajiv Sharma",
    role: "Goat Farm Owner, Dehradun",
    quote:
      "The Jumnapari goats I purchased from Garhwal Goats have significantly improved my farm's productivity. Their milk yield is exceptional, and the breeding stock has excellent genetics. The team's expertise and after-sale support have been invaluable for my business growth.",
    rating: 5,
    breedMentioned: "Jumnapari",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Restaurant Owner",
    quote:
      "We source all our goat meat exclusively from Garhwal Goats' Himalayan breed. The flavor profile is unmatched - our customers can immediately taste the difference. The consistent quality and ethical raising practices align perfectly with our restaurant's values.",
    rating: 5,
    breedMentioned: "Himalayan",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "Local Meat Buyer",
    quote:
      "As someone who values quality and ethical farming, I've been purchasing Barbari goat meat from Garhwal Goats for years. The taste is exceptional, and I appreciate knowing exactly how the animals are raised. Their commitment to sustainable practices gives me confidence in my purchase.",
    rating: 5,
    breedMentioned: "Barbari",
  },
];

export default function EnhancedTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

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

  const handleShare = (platform) => {
    const testimonial = testimonials[currentIndex];
    const text = `"${testimonial.quote}" - ${testimonial.name}, about ${testimonial.breedMentioned} goats from Garhwal Goats`;
    const url = window.location.href;

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(text)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=Garhwal Goats Testimonial&summary=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-winter-white p-8 md:p-12 rounded-lg relative shadow-lg"
        >
          <Quote
            className="absolute top-6 left-6 text-gold-accent opacity-20"
            size={48}
          />

          <div className="flex justify-end mb-4 relative">
            <div className="flex">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="text-gold-accent"
                  size={20}
                  fill="#D4AF37"
                />
              ))}
              {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i + testimonials[currentIndex].rating}
                  className="text-stone-gray/30"
                  size={20}
                />
              ))}
            </div>

            <div className="relative ml-4">
              <motion.button
                onClick={() => setShowShareOptions(!showShareOptions)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-forest-green hover:text-gold-accent transition-colors"
                aria-label="Share testimonial"
              >
                <Share2 size={20} />
              </motion.button>

              {showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-8 bg-winter-white shadow-lg rounded-lg p-2 z-10 flex space-x-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("facebook")}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("twitter")}
                    className="text-blue-400 hover:text-blue-600"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("linkedin")}
                    className="text-blue-700 hover:text-blue-900"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl font-cormorant italic text-forest-green/90 mb-8 relative z-10">
            "{testimonials[currentIndex].quote}"
          </blockquote>

          {/* Update the testimonial display to remove the image section */}
          {/* Replace this section: */}
          {/*
          <div className="flex items-center">
            <motion.div
              className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gold-accent"
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
              <p className="font-playfair text-lg text-forest-green">{testimonials[currentIndex].name}</p>
              <p className="text-forest-green/70 font-montserrat text-sm">{testimonials[currentIndex].role}</p>
              <p className="text-gold-accent text-xs mt-1">
                <span className="font-medium">Breed mentioned:</span> {testimonials[currentIndex].breedMentioned}
              </p>
            </div>
          </div>
          */}

          {/* With this: */}
          <div className="flex items-center">
            <div className="w-2 h-16 bg-gold-accent mr-4"></div>
            <div>
              <p className="font-playfair text-lg text-forest-green">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-forest-green/70 font-montserrat text-sm">
                {testimonials[currentIndex].role}
              </p>
              <p className="text-gold-accent text-xs mt-1">
                <span className="font-medium">Breed mentioned:</span>{" "}
                {testimonials[currentIndex].breedMentioned}
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
