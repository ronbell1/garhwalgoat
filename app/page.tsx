"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroCarousel from "@/components/hero-carousel";
import BreedsSection from "@/components/breeds-section";
import EnhancedTestimonialCarousel from "@/components/enhanced-testimonial-carousel";
import ProductSection from "@/components/product-section";

const AnimatedSection = ({ children, className, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Who Are We Section */}
      <section id="who-we-are" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-playfair mb-6">
                Who Are We?
              </h2>
              <div className="gold-divider"></div>
              <p className="text-lg text-forest-green/80 leading-relaxed mt-4">
                Welcome to Garhwal Goats, where we take pride in raising a
                variety of premium goat breeds for both farming and consumption.
                Nestled in the serene hills of Uttarakhand, our farm is home to
                a colorful array of goats, each with unique qualities.
              </p>
              <p className="text-lg text-forest-green/80 leading-relaxed mt-4">
                We specialize in high-quality breeds known for their milk
                production, meat quality, and adaptability. From hardy mountain
                goats to gentle dairy breeds, we cater to every need.
              </p>
            </AnimatedSection>
            <AnimatedSection className="md:w-1/2" delay={0.3}>
              <Image
                src="/landscape1.jpg?height=600&width=800"
                alt="Garhwal Goats"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How Do We Raise Our Goats Section */}
      <section className="py-20 md:py-32 bg-forest-green text-winter-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <AnimatedSection className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-playfair mb-6">
                How Do We Raise Our Goats?
              </h2>
              <div className="gold-divider"></div>
              <p className="text-lg text-winter-white/80 leading-relaxed mt-4">
                We provide our goats with a perfect blend of organic feed and
                natural supplements. Unlike mass farming, we do not use
                artificial supplements or synthetic chemicals to increase
                weight. This ensures our goats produce high-quality, odorless,
                and hygienic meat and milk, making them ideal for domestic use
                and farm expansion.
              </p>
            </AnimatedSection>
            <AnimatedSection className="md:w-1/2" delay={0.3}>
              <Image
                src="/landscape3.jpg?height=600&width=800"
                alt="Goat Raising Practices"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-playfair mb-6">
                What Makes Us Different?
              </h2>
              <div className="gold-divider"></div>
              <p className="text-lg text-forest-green/80 leading-relaxed mt-4">
                At Garhwal Goats, our goats receive expert care from experienced
                farmers who have a deep connection with the land and animals. We
                are committed to:
              </p>
              <ul className="list-disc list-inside text-forest-green/80 space-y-2 mt-4">
                <li>Sustainable & Ethical Farming</li>
                <li>Educational Experiences for Visitors</li>
                <li>Premium Quality Products</li>
              </ul>
            </AnimatedSection>
            <AnimatedSection className="md:w-1/2" delay={0.3}>
              <Image
                src="/landscape4.jpg?height=600&width=800"
                alt="Our Unique Approach"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Where Are We Located Section */}
      <section className="py-20 md:py-32 bg-forest-green text-winter-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <AnimatedSection className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-playfair mb-6">
                Where Are We Located?
              </h2>
              <div className="gold-divider"></div>
              <p className="text-lg text-winter-white/80 leading-relaxed mt-4 flex items-center">
                <MapPin size={24} className="text-gold-accent mr-2" />
                Garhwal Goats is nestled in the scenic hills of Uttarakhand!
              </p>
              <p className="text-lg text-winter-white/80 leading-relaxed mt-4">
                Surrounded by breathtaking views of majestic mountains and lush
                greenery, our farm is a peaceful haven for happy and healthy
                goats.
              </p>
            </AnimatedSection>
            <AnimatedSection className="md:w-1/2" delay={0.3}>
              <Image
                src="/landscape1final.jpg?height=600&width=800"
                alt="Farm Location"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <BreedsSection />

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair mb-6">
              What Our Customers Say
            </h2>
            <div className="gold-divider mx-auto"></div>
            <p className="text-lg text-forest-green/80 leading-relaxed mt-4 max-w-2xl mx-auto">
              Hear from farmers, restaurants, and families who have experienced
              the Garhwal Goats difference.
            </p>
          </AnimatedSection>

          <EnhancedTestimonialCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-forest-green text-winter-white">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-5xl font-playfair mb-6">
              Experience the Difference
            </h2>
            <div className="gold-divider mx-auto"></div>
            <p className="text-lg text-winter-white/80 leading-relaxed mt-4 max-w-2xl mx-auto mb-8">
              Discover the exceptional quality of our premium goat breeds and
              products. Visit Garhwal Goats today!
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="inline-block bg-winter-white text-forest-green px-8 py-4 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-gold-accent"
                >
                  Explore Products
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block border-2 border-winter-white text-winter-white px-8 py-4 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-winter-white hover:text-forest-green"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
