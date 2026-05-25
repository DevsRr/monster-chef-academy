import { motion } from "framer-motion";
import { Gift, Medal, Sparkles, UserRound } from "lucide-react";
import GameCard from "../components/game/GameCard";
import MonsterAvatar from "../components/game/MonsterAvatar";
import ParticleCanvas from "../components/game/ParticleCanvas";
import Meter from "../components/ui/Meter";
import StatusPill from "../components/ui/StatusPill";
import { usePlatform } from "../context/PlatformContext";
import { gameRegistry } from "../game/gameRegistry";
import { pageMotion } from "../game/systems/AnimationManager";

export default function GameHubPage() {
  const { state } = usePlatform();
  const leadMonster = state.monsters[0];

  return (
    <motion.div {...pageMotion} className="section relative py-6 sm:py-10">
      <section className="relative overflow-hidden rounded-[32px] px-5 py-8 sm:px-8 lg:px-10">
        <ParticleCanvas />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <div className="eyebrow bg-white/30">
              <Sparkles size={16} />
              Daily brain training kitchen
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Pick a game, cook a win, train a monster.
              </h1>
              <p className="max-w-2xl text-base font-medium leading-7 text-[var(--muted)] sm:text-lg">
                A colorful, safe game hub for memory, logic, sequencing, counting, and attention practice.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="gold" label={`${state.player.stars} Stars`} />
              <StatusPill tone="accent" label={`${state.player.coins} Coins`} />
              <StatusPill tone={state.sync.online ? "accent" : "coral"} label={state.sync.online ? "Online sync" : "Offline play"} />
            </div>
          </div>

          <div className="glass-panel rounded-[30px] p-5">
            <div className="flex items-center gap-4">
              <MonsterAvatar monster={leadMonster} size="small" interactive />
              <div>
                <p className="text-sm font-bold text-[var(--muted)]">Player Profile</p>
                <h2 className="font-display text-2xl font-extrabold">{state.player.name}</h2>
                <p className="text-sm font-semibold text-[var(--muted)]">{leadMonster.name} is ready to cook.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <Meter label="Hunger" value={leadMonster.hunger} tone="from-coral to-gold" />
              <Meter label="Happiness" value={leadMonster.happiness} tone="from-accent to-emerald-300" />
              <Meter label="Energy" value={leadMonster.energy} tone="from-sky-300 to-accent" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gameRegistry.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <aside className="space-y-5">
          <div className="glass-panel rounded-[28px] p-5">
            <div className="mb-4 flex items-center gap-3">
              <Gift className="text-coral" />
              <h2 className="font-display text-xl font-extrabold">Daily Rewards</h2>
            </div>
            <div className="rounded-[24px] bg-white/45 p-4 dark:bg-white/10">
              <p className="text-sm font-bold text-[var(--muted)]">Today</p>
              <p className="mt-1 font-display text-2xl font-extrabold">3 bonus berries</p>
            </div>
          </div>

          <div className="glass-panel rounded-[28px] p-5">
            <div className="mb-4 flex items-center gap-3">
              <Medal className="text-gold" />
              <h2 className="font-display text-xl font-extrabold">Achievements</h2>
            </div>
            <div className="space-y-3">
              {state.achievements.map((achievement) => (
                <div key={achievement.id}>
                  <div className="mb-1 flex items-center justify-between text-xs font-bold text-[var(--muted)]">
                    <span>{achievement.title}</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/40">
                    <div className="h-2 rounded-full bg-gradient-to-r from-gold to-coral" style={{ width: `${achievement.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[28px] p-5">
            <div className="flex items-center gap-3">
              <UserRound className="text-accent" />
              <div>
                <h2 className="font-display text-xl font-extrabold">Child-safe</h2>
                <p className="text-sm font-semibold text-[var(--muted)]">No ads, local-first saves, private play.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </motion.div>
  );
}
