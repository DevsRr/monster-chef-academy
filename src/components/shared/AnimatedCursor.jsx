import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[70] hidden h-6 w-6 rounded-full border border-accent/60 bg-accent/10 backdrop-blur md:block"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.18 }}
    />
  );
}
