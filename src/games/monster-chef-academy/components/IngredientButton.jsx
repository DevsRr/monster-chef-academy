import { motion } from "framer-motion";

export const ingredients = [
  { id: "tomato", label: "Tomato", emoji: "🍅", color: "from-coral to-red-400" },
  { id: "berry", label: "Berry", emoji: "🍇", color: "from-sky-300 to-indigo-400" },
  { id: "noodle", label: "Noodle", emoji: "🍜", color: "from-gold to-orange-300" },
  { id: "leaf", label: "Leaf", emoji: "🥬", color: "from-accent to-emerald-300" },
];

export default function IngredientButton({ ingredient, active = false, onClick, draggable = false, onDragStart }) {
  return (
    <motion.button
      type="button"
      draggable={draggable}
      onDragStart={onDragStart}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`grid min-h-[92px] place-items-center rounded-[24px] bg-gradient-to-br ${ingredient.color} p-3 text-center shadow-xl transition ${
        active ? "ring-4 ring-white" : ""
      }`}
      aria-label={ingredient.label}
    >
      <span className="text-4xl">{ingredient.emoji}</span>
      <span className="text-xs font-extrabold text-ink">{ingredient.label}</span>
    </motion.button>
  );
}
