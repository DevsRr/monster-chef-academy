import { motion } from "framer-motion";

export default function StatCard({ label, value }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-panel rounded-[28px] p-5"
    >
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
    </motion.div>
  );
}
