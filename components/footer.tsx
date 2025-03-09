import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import NewsletterForm from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="bg-forest-green text-winter-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Image
              src="/logo2.svg"
              alt="Garhwal Goats"
              width={150}
              height={50}
              className="mb-6"
            />
            <p className="text-winter-white/80 mb-6 font-light">
              Premium goat products from the heart of the Himalayan mountains,
              raised with care and tradition.
            </p>
         
          </div>

          <div>
            <h4 className="text-gold-accent text-lg mb-6 font-montserrat font-light">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-winter-white/80 hover:text-gold-accent transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-winter-white/80 hover:text-gold-accent transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-winter-white/80 hover:text-gold-accent transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-winter-white/80 hover:text-gold-accent transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-accent text-lg mb-6 font-montserrat font-light">
              Contact
            </h4>
            <address className="not-italic text-winter-white/80 space-y-3 font-light">
              <p>Garhwal Goat Farm
               </p>
              <p>Samshergarh, Balawala,</p>
              <p>Dehradun, Uttarakhand 248001</p>
              <p>Phone: +91 84769 69005</p>
              <p>Email: garhwalgoats@gmail.com</p>
            </address>
          </div>

          <div>
            <h4 className="text-gold-accent text-lg mb-6 font-montserrat font-light">
              Join Our Community
            </h4>
            <p className="text-winter-white/80 mb-4 font-light">
              Subscribe to receive exclusive offers and updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-winter-white/20 pt-8 text-center text-winter-white/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Garhwal Goats. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
