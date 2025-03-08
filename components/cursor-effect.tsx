"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the element or its parent has interactive classes
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        (target.parentElement && target.parentElement.classList.contains("interactive"))

      setIsHovering(isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 100, damping: 10 }}
      />
    </>
  )
}

