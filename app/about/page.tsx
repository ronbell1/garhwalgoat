"use client"

import Image from "next/image"
import Link from "next/link"
import { Award, Users, Mountain, Leaf, Mail, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-6">Our Story</h1>
            <div className="gold-divider"></div>
            <p className="text-lg text-forest-green/80 leading-relaxed">
              Discover the heritage and passion behind Garhwal Goats
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair mb-6">The Story of Garhwal Goats</h2>
              <p className="text-forest-green/80 mb-6 leading-relaxed">
                Garhwal Goats was founded with a vision to provide premium-quality goat breeds while upholding
                sustainable and ethical farming practices. Nestled in the tranquil hills of Uttarakhand, our farm is
                more than just a place for raising livestock—it's a commitment to preserving traditional farming wisdom
                while embracing modern advancements.
              </p>
              <p className="text-forest-green/80 mb-6 leading-relaxed">
                Our journey began with a passion for responsible animal care and a deep respect for the land. By
                focusing on high-quality breeds known for their exceptional milk, meat, and adaptability, we ensure that
                every goat raised on our farm thrives in a natural and healthy environment.
              </p>
              <p className="text-forest-green/80 leading-relaxed">
                Today, Garhwal Goats stands as a testament to ethical farming, where our goats graze freely on
                nutrient-rich pastures, nurtured without artificial additives. With a dedication to excellence,
                sustainability, and community education, we continue to shape the future of goat farming while honoring
                the rich heritage of Uttarakhand's mountain agriculture.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/about5.jpg?height=800&width=600" alt="Garhwal Goats History" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 wood-texture">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair mb-6">Our Philosophy</h2>
            <div className="gold-divider"></div>
            <p className="text-lg text-forest-green/80 leading-relaxed">
              At the core of our farm lies a deep respect for nature, tradition, and sustainable practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-winter-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Mountain className="text-gold-accent mr-4" size={32} />
                <h3 className="text-2xl font-playfair">Mountain Heritage</h3>
              </div>
              <p className="text-forest-green/80 leading-relaxed">
                We honor the rich traditions of Himalayan farming, preserving ancient knowledge while adapting to modern
                challenges. Our methods are rooted in generations of mountain wisdom, ensuring that each product carries
                the authentic essence of our alpine heritage.
              </p>
            </div>

            <div className="bg-winter-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Leaf className="text-gold-accent mr-4" size={32} />
                <h3 className="text-2xl font-playfair">Sustainable Practices</h3>
              </div>
              <p className="text-forest-green/80 leading-relaxed">
                We believe in working in harmony with nature, implementing regenerative farming practices that enhance
                the health of our land and animals. From rotational grazing to natural fertilization, every aspect of
                our operation is designed to minimize environmental impact while maximizing quality.
              </p>
            </div>

            <div className="bg-winter-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Award className="text-gold-accent mr-4" size={32} />
                <h3 className="text-2xl font-playfair">Uncompromising Quality</h3>
              </div>
              <p className="text-forest-green/80 leading-relaxed">
                Excellence is not an option—it's our standard. Every product that bears the Garhwal Goats name undergoes
                rigorous quality control to ensure it meets our exacting standards. We believe that quality is the
                result of attention to detail at every stage of production.
              </p>
            </div>

            <div className="bg-winter-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="text-gold-accent mr-4" size={32} />
                <h3 className="text-2xl font-playfair">Community Connection</h3>
              </div>
              <p className="text-forest-green/80 leading-relaxed">
                We are deeply connected to the local communities of Garhwal. By providing employment opportunities and
                supporting local initiatives, we strive to contribute to the prosperity and preservation of mountain
                culture and livelihoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg">
                <Image src="/about1.jpg?height=400&width=300" alt="Our Farm" fill className="object-cover" />
              </div>
              <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg mt-8">
                <Image src="/about2.jpg?height=400&width=300" alt="Our Goats" fill className="object-cover" />
              </div>
              <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg">
                <Image src="/about3.jpg?height=400&width=300" alt="Our Products" fill className="object-cover" />
              </div>
              <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg mt-8">
                <Image src="/about4.jpg?height=400&width=300" alt="Our Team" fill className="object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-playfair mb-6">Our Commitment to Excellence</h2>
              <p className="text-forest-green/80 mb-6 leading-relaxed">
                At Garhwal Goats, excellence is not just a goal—it's our foundation. Every aspect of our operation is
                guided by an unwavering commitment to producing the finest quality goat products while honoring our
                mountain heritage and preserving the environment.
              </p>
              <p className="text-forest-green/80 mb-6 leading-relaxed">
                Our goats are raised with exceptional care, allowed to roam freely across our mountain pastures where
                they graze on diverse alpine vegetation. This natural diet, combined with the pure mountain air and
                water, contributes to the distinctive flavor and quality of our products.
              </p>
              <p className="text-forest-green/80 mb-8 leading-relaxed">
                We maintain rigorous quality standards throughout our production process, combining traditional methods
                with modern technology to ensure safety, consistency, and excellence. Our team of skilled artisans
                brings generations of knowledge to the creation of our cheeses, milk products, and meats.
              </p>
              <div className="flex flex-wrap gap-4">
                <Image
                  src="/about6.jpg?height=100&width=100"
                  alt="Organic Certification"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <Image
                  src="/about7.jpg?height=100&width=100"
                  alt="Quality Certification"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <Image
                  src="/about8.jpg?height=100&width=100"
                  alt="Sustainable Farming Certification"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <Image
                  src="/about9.jpg?height=100&width=100"
                  alt="Animal Welfare Certification"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#1B4332] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-playfair mb-6">Meet Our Founder</h2>
            <div className="w-24 h-1 mx-auto my-4 bg-[#D4AF37]"></div>
          
          </div>

          <div className="flex justify-center">
            <div className="bg-[#1B4332]/50 rounded-lg w-full max-w-4xl mx-auto overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row">
                {/* Left side with image and name */}
                <div className="p-8 md:w-80 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/10">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37]">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Gautam Bhandari"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-2xl font-playfair mt-6 mb-2">Gautam Bhandari</h3>
                  <p className="text-[#D4AF37] font-montserrat text-sm uppercase tracking-wider">Founder & CEO</p>
                </div>

                {/* Right side with bio */}
                <div className="p-8 md:flex-1">
                  <h3 className="text-2xl font-playfair mb-6">About Gautam</h3>

                  <div className="text-white/90 space-y-6">
                    <p>
                      Gautam Bhandari brings a fresh perspective and a strong commitment to ethical farming practices to
                      Garhwal Goats.
                    </p>
                    <p>
                      His vision is to preserve traditional mountain farming wisdom while implementing modern,
                      eco-friendly techniques that ensure the highest quality products.
                    </p>
                    <p>
                      Under his leadership, Garhwal Goats is building a model for sustainable livestock farming in the
                      Himalayan region, supporting local communities and promoting environmental stewardship.
                    </p>
                  </div>

                  <div className="flex mt-8 pt-6 border-t border-white/10">
                    <a
                      href="https://wa.me/1234567890"
                      className="text-[#D4AF37] hover:text-white transition-colors duration-300 flex items-center gap-2 mr-6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="mailto:gautam@garhwalgoats.com"
                      className="text-[#D4AF37] hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-playfair mb-6">Experience the Difference</h2>
          <div className="gold-divider"></div>
          <p className="text-lg text-forest-green/80 leading-relaxed max-w-3xl mx-auto mb-12">
            We invite you to discover the exceptional quality and distinctive character of our premium goat products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="bg-forest-green text-winter-white px-8 py-4 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-walnut-brown"
            >
              Explore Our Products
            </Link>
            <Link
              href="/contact"
              className="border-2 border-forest-green text-forest-green px-8 py-4 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-forest-green hover:text-winter-white"
            >
              Visit Our Farm
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

