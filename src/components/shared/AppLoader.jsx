import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function AppLoader({ fullScreen = false, label = "Loading..." }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? "min-h-screen" : "min-h-[240px]",
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel flex flex-col items-center gap-4 rounded-[28px] px-8 py-10"
      >
        <div className="relative h-14 w-14">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.9, 0.2, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-accent to-coral"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
      </motion.div>
    </div>
  );
}
