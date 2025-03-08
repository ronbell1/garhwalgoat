"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-winter-white/95 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <div className="w-32 md:w-44">
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
          </div>

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
          <button
            className="md:hidden relative z-10 text-forest-green"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-winter-white flex flex-col items-center justify-center space-y-8 z-0">
          <MobileNavLink href="/" label="Home" setIsMenuOpen={setIsMenuOpen} />
          <MobileNavLink href="/about" label="About Us" setIsMenuOpen={setIsMenuOpen} />
          <MobileNavLink href="/products" label="Products" setIsMenuOpen={setIsMenuOpen} />
          <MobileNavLink href="/contact" label="Contact" setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="nav-link text-lg font-medium tracking-wide py-2 inline-block transition-all duration-300 hover:text-forest-green hover:underline hover:underline-offset-8 hover:font-semibold"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, setIsMenuOpen }) {
  return (
    <Link
      href={href}
      className="nav-link text-2xl font-medium transition-all duration-300 hover:text-forest-green hover:scale-105 hover:font-semibold"
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  );
}
