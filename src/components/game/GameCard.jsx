import { Lock, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  const isLocked = !game.enabled;

  return (
    <motion.article
      whileHover={{ y: -8, rotate: isLocked ? 0 : -0.4 }}
      className="glass-panel relative min-h-[320px] overflow-hidden rounded-[28px] p-5"
    >
      <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${game.color} opacity-80`} />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-[26px] bg-white/80 text-4xl shadow-xl">
            {game.icon === "chef" ? "🍳" : game.icon === "rocket" ? "🚀" : "🎵"}
          </div>
          <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-extrabold text-ink">
            {isLocked ? "Locked" : game.difficulty}
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">{game.title}</h2>
          <p className="min-h-[72px] text-sm font-medium leading-6 text-[var(--muted)]">{game.description}</p>
        </div>

        {isLocked ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/10 px-5 py-4 text-sm font-extrabold text-[var(--muted)]"
          >
            <Lock size={18} />
            Coming soon
          </button>
        ) : (
          <Link
            to={`/${game.path}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-extrabold text-white shadow-xl transition hover:-translate-y-1 dark:bg-white dark:text-ink"
          >
            <Play size={18} fill="currentColor" />
            Play
            <Sparkles size={18} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
