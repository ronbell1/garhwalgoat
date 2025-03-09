"use client";

import type React from "react";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 mb-16">
          {/* New WhatsApp contact section - smaller, centered, with animations */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-[#25D366]/20 transform transition-all duration-300 hover:shadow-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-[#25D366] w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md transform transition-transform duration-300 hover:scale-110">
                <MessageCircle className="text-white" size={22} />
              </div>
              <h2 className="text-xl font-playfair mb-2">
                Chat with us on WhatsApp
              </h2>
              <p className="text-forest-green/80 font-montserrat text-sm mb-4">
                For fastest response, connect with us directly via WhatsApp
              </p>
              <a
                href="https://wa.me/918476969005"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-2 rounded-lg font-montserrat text-sm tracking-wide transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                suppressHydrationWarning={true}
              >
                <MessageCircle className="mr-2" size={16} />
                <span className="font-medium">Start Chat</span>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-6">
              Contact Us
            </h1>
            <div className="gold-divider"></div>
            <p className="text-lg text-forest-green/80 leading-relaxed">
              We'd love to hear from you. Reach out with any questions or to
              arrange a visit to our farm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-winter-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-64">
                  <div className="relative w-full h-64">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.0324783638184!2d78.10048619999999!3d30.2646558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929dd5458e825%3A0x5ed1ead9120f004c!2sGarhwal%20Goat%20Farm!5e0!3m2!1sen!2sin!4v1741260173993!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-playfair mb-6">Get in Touch</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin
                        className="text-gold-accent mr-4 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-montserrat font-medium mb-1">
                          Address
                        </h3>
                        <p className="text-forest-green/80">
                          Garhwal Goat Farm Uttarakhand 248001
                          <br />
                          Samshergarh, Balawala, Dehradun,
                          <br />
                          Uttarakhand, India 248001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone
                        className="text-gold-accent mr-4 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-montserrat font-medium mb-1">
                          Phone
                        </h3>
                        <p className="text-forest-green/80">+91 84769 69005</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail
                        className="text-gold-accent mr-4 mt-1 flex-shrink-0"
                        size={20}
                      />
                    <div>
  <h3 className="font-montserrat font-medium mb-1">Email</h3>
  <p className="text-forest-green/80">
    <a
      href="mailto:garhwalgoats@gmail.com"
      onClick={(e) => {
        if (!/Mobi|Android/i.test(navigator.userAgent)) {
          e.preventDefault();
          window.open(
            "https://mail.google.com/mail/?view=cm&fs=1&to=garhwalgoats@gmail.com",
            "_blank"
          );
        }
      }}
      className="hover:underline"
    >
      garhwalgoats@gmail.com
    </a>
  </p>
</div>

                    </div>

                    <div className="flex items-start">
                      <Clock
                        className="text-gold-accent mr-4 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-montserrat font-medium mb-1">
                          Hours
                        </h3>
                        <p className="text-forest-green/80">
                          Monday - Friday: 9:00 AM - 5:00 PM
                        </p>
                        <p className="text-forest-green/80">
                          Saturday - Sunday: 10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-winter-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-playfair mb-6">
                    Visit Our Farm
                  </h2>
                  <p className="text-forest-green/80 mb-4">
                    We welcome visitors to experience our farm firsthand. Tours
                    are available by appointment and include:
                  </p>
                  <ul className="list-disc list-inside text-forest-green/80 space-y-2 mb-6">
                    <li>Guided tour of our facilities</li>
                    <li>Meet our goats and learn about our breeding program</li>
                    <li>Observe our production processes</li>
                    <li>Product tasting session</li>
                    <li>Opportunity to purchase products directly</li>
                  </ul>
                  <p className="text-forest-green/80">
                    Please contact us at least 48 hours in advance to schedule
                    your visit.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-winter-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-playfair mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <div className="bg-forest-green/10 border border-forest-green p-6 rounded-lg text-center">
                    <h3 className="text-xl font-playfair mb-2">Thank You!</h3>
                    <p className="text-forest-green/80">
                      Your message has been received. We will get back to you
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form action="https://formspree.io/f/mvgkpdqk" method="POST" className="space-y-6">

                    <div>
                      <label
                        htmlFor="name"
                        className="block font-montserrat text-sm mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-montserrat text-sm mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-montserrat text-sm mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-montserrat text-sm mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input-field"
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Farm Visit">Farm Visit</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Custom Order">Custom Order</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-montserrat text-sm mb-2"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="input-field resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-forest-green text-winter-white px-6 py-3 font-montserrat text-sm uppercase tracking-wider font-light transition-all duration-300 hover:bg-walnut-brown"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-forest-green text-winter-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair mb-6">Find Us</h2>
            <div className="gold-divider"></div>
            <p className="text-lg text-winter-white/80 leading-relaxed">
              Situated in the serene countryside of Dehradun, our farm is easily
              accessible by road from major cities across Uttarakhand.
            </p>
          </div>

          <div className="bg-winter-white/10 p-4 rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[500px] w-full">
              <div className="relative w-full h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.0324783638184!2d78.10048619999999!3d30.2646558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929dd5458e825%3A0x5ed1ead9120f004c!2sGarhwal%20Goat%20Farm!5e0!3m2!1sen!2sin!4v1741260173993!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "0.5rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
