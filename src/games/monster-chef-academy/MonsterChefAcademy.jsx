import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChefHat, CookingPot, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MonsterAvatar from "../../components/game/MonsterAvatar";
import Meter from "../../components/ui/Meter";
import { usePlatform } from "../../context/PlatformContext";
import { miniGameRegistry } from "../../game/miniGameRegistry";
import { pageMotion } from "../../game/systems/AnimationManager";
import { grantMiniGameReward } from "../../game/systems/RewardSystem";
import MiniGameShell from "./components/MiniGameShell";

export default function MonsterChefAcademy() {
  const { state, dispatch } = usePlatform();
  const [selectedMonsterId, setSelectedMonsterId] = useState(state.monsters[0]?.id);
  const [activeMiniGameId, setActiveMiniGameId] = useState(null);
  const [rewardToast, setRewardToast] = useState(null);
  const monster = state.monsters.find((item) => item.id === selectedMonsterId) || state.monsters[0];
  const activeMiniGame = useMemo(
    () => miniGameRegistry.find((game) => game.id === activeMiniGameId),
    [activeMiniGameId],
  );

  const completeMiniGame = (result) => {
    const reward = grantMiniGameReward(dispatch, activeMiniGame.reward);
    setRewardToast({ ...reward, score: result.score });
    setActiveMiniGameId(null);
    window.setTimeout(() => setRewardToast(null), 2800);
  };

  return (
    <motion.div {...pageMotion} className="section py-6 sm:py-9">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-white/30 px-4 py-3 text-sm font-extrabold">
          <ArrowLeft size={18} />
          Game Hub
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-3 text-sm font-extrabold text-amber-700 dark:text-amber-100">
          <Sparkles size={18} />
          Kitchen level {monster.skill}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="glass-panel rounded-[32px] p-5">
          <div className="flex items-center gap-3">
            <ChefHat className="text-coral" />
            <div>
              <p className="text-xs font-extrabold uppercase text-[var(--muted)]">Monster Chef</p>
              <h1 className="font-display text-3xl font-extrabold">Academy</h1>
            </div>
          </div>

          <MonsterAvatar monster={monster} interactive />
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold">{monster.name}</h2>
            <p className="text-sm font-semibold text-[var(--muted)]">{monster.personality}</p>
          </div>

          <div className="mt-5 grid gap-3">
            <Meter label="Hunger" value={monster.hunger} tone="from-coral to-gold" />
            <Meter label="Happiness" value={monster.happiness} tone="from-accent to-emerald-300" />
            <Meter label="Energy" value={monster.energy} tone="from-sky-300 to-accent" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {state.monsters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedMonsterId(item.id)}
                className={`rounded-[22px] px-4 py-3 text-left text-sm font-extrabold transition ${
                  item.id === selectedMonsterId ? "bg-ink text-white dark:bg-white dark:text-ink" : "bg-white/35"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: "feedMonster", monsterId: monster.id })}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral to-gold px-5 py-4 text-sm font-extrabold text-ink shadow-xl"
          >
            <CookingPot size={18} />
            Cook and Feed
          </button>
        </aside>

        <main className="space-y-6">
          <AnimatePresence mode="wait">
            {activeMiniGame ? (
              <MiniGameShell key={activeMiniGame.id} game={activeMiniGame} onExit={() => setActiveMiniGameId(null)} onComplete={completeMiniGame} />
            ) : (
              <motion.div
                key="academy"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid gap-5 md:grid-cols-2"
              >
                {miniGameRegistry.map((game, index) => (
                  <motion.button
                    key={game.id}
                    type="button"
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveMiniGameId(game.id)}
                    className="glass-panel min-h-[190px] rounded-[28px] p-5 text-left"
                  >
                    <div className="mb-5 flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-white/65 text-3xl">
                        {["🧁", "🥕", "🍓", "🍜", "🔔"][index]}
                      </span>
                      <span className="rounded-full bg-accent/15 px-3 py-2 text-xs font-extrabold text-teal-700 dark:text-teal-100">
                        {game.skill}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-extrabold">{game.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--muted)]">
                      Earn ingredients, stars, and monster skill points.
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {rewardToast ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-[28px] bg-ink px-5 py-4 text-center text-white shadow-2xl"
          >
            <p className="font-display text-2xl font-extrabold">Recipe Complete!</p>
            <p className="text-sm font-bold text-white/75">{rewardToast.message} · Score {rewardToast.score}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
