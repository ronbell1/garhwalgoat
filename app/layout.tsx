import type React from "react";
import type { Metadata } from "next/types";
import {
  Playfair_Display,
  Montserrat,
  Lato,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CursorEffect from "@/components/cursor-effect";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Garhwal Goats",
  description:
    "Experience the finest quality goat products from the Himalayan mountains. Garhwal Goats offers premium, ethically raised goats with mountain heritage and refined elegance.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${montserrat.variable} ${lato.variable} ${cormorant.variable} font-lato bg-winter-white text-forest-green`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CursorEffect />
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
