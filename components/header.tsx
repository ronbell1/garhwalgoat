"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-winter-white/95 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <motion.div 
            className="w-32 md:w-44"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="relative z-10 flex items-center">
              <div className="relative" style={{ minWidth: "120px" }}>
                <Image
                  src="/logo2.svg"
                  alt="Garhwal Goats"
                  width={isScrolled ? 120 : 150}
                  height={isScrolled ? 40 : 50}
                  className="transition-all duration-300 max-h-[40px] md:max-h-[50px] object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center h-full space-x-10">
              <NavLink href="/" label="Home" />
              <NavLink href="/about" label="About Us" />
              <NavLink href="/products" label="Products" />
              <NavLink href="/contact" label="Contact" />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 text-forest-green"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-winter-white flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col items-center space-y-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <MobileNavLink href="/" label="Home" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavLink href="/about" label="About Us" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavLink href="/products" label="Products" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavLink href="/contact" label="Contact" setIsMenuOpen={setIsMenuOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className="nav-link text-lg font-medium tracking-wide py-2 inline-block transition-all duration-300 hover:text-forest-green hover:underline hover:underline-offset-8 hover:font-semibold"
      >
        {label}
      </Link>
    </motion.div>
  );
}

function MobileNavLink({ href, label, setIsMenuOpen }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href={href}
        className="nav-link text-2xl font-medium transition-all duration-300 hover:text-forest-green hover:font-semibold"
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </Link>
    </motion.div>
  );
}