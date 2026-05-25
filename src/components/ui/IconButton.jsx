import { motion } from "framer-motion";

export default function IconButton({ label, children, onClick, className = "" }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`glass-panel grid h-11 w-11 place-items-center rounded-full text-[var(--text)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      aria-label={label}
      title={label}
    >
      {children}
    </motion.button>
  );
}
