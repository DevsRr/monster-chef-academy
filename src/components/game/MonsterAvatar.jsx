import { motion } from "framer-motion";

const skins = {
  mint: {
    body: "from-teal-200 via-accent to-emerald-500",
    belly: "bg-mint-100",
    horn: "bg-gold",
  },
  coral: {
    body: "from-rose-200 via-coral to-orange-400",
    belly: "bg-rose-50",
    horn: "bg-accent",
  },
};

export default function MonsterAvatar({ monster, size = "large", interactive = false }) {
  const skin = skins[monster.skin] || skins.mint;
  const dimensions = size === "small" ? "h-24 w-24" : "h-44 w-44 sm:h-56 sm:w-56";

  return (
    <motion.div
      className={`relative mx-auto ${dimensions}`}
      animate={{ y: [0, -8, 0], rotate: interactive ? [0, -2, 2, 0] : 0 }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      aria-label={`${monster.name} monster`}
      role="img"
    >
      <div className={`absolute inset-x-7 top-7 h-6 rounded-t-full ${skin.horn}`} />
      <div className={`absolute inset-2 rounded-[42%_42%_48%_48%] bg-gradient-to-br ${skin.body} shadow-2xl`} />
      <div className="absolute left-1/2 top-[43%] h-16 w-24 -translate-x-1/2 rounded-full bg-white/55" />
      <div className="absolute left-[30%] top-[35%] h-5 w-5 rounded-full bg-ink shadow-[28px_0_0_#07111f]" />
      <div className="absolute left-1/2 top-[52%] h-5 w-11 -translate-x-1/2 rounded-b-full border-b-4 border-ink/70" />
      <div className="absolute bottom-2 left-8 h-7 w-12 rounded-full bg-ink/10" />
      <div className="absolute bottom-2 right-8 h-7 w-12 rounded-full bg-ink/10" />
    </motion.div>
  );
}
