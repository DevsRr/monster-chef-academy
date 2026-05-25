import { X } from "lucide-react";
import { motion } from "framer-motion";
import IconButton from "../../../components/ui/IconButton";

export default function MiniGameShell({ game, onExit, onComplete }) {
  const MiniGame = game.component;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="glass-panel min-h-[620px] rounded-[32px] p-4 sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase text-[var(--muted)]">{game.skill}</p>
          <h2 className="font-display text-3xl font-extrabold">{game.title}</h2>
        </div>
        <IconButton label="Close game" onClick={onExit}>
          <X size={18} />
        </IconButton>
      </div>
      <MiniGame difficulty={1} onComplete={onComplete} />
    </motion.section>
  );
}
