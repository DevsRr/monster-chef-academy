import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../shared/Button";
import TypewriterText from "../shared/TypewriterText";
import StatCard from "../shared/StatCard";

export default function HeroSection({ hero, visitorCount }) {
  return (
    <section className="section grid gap-10 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-16">
      <div>
        <span className="eyebrow">{hero.greeting}</span>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>
        <div className="mt-6 text-xl font-medium text-[var(--muted)] sm:text-2xl">
          <TypewriterText words={hero.roles} />
        </div>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          {hero.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={hero.primaryCta?.href || "/projects"} className="gap-2">
            {hero.primaryCta?.label || "Browse Projects"} <ArrowRight size={16} />
          </Button>
          <Button to={hero.secondaryCta?.href || "/contact"} variant="secondary">
            {hero.secondaryCta?.label || "Contact Me"}
          </Button>
          <Button to="/admin/login" variant="ghost" className="gap-2">
            Admin Access <ShieldCheck size={16} />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="neo-panel relative overflow-hidden p-6 sm:p-8"
      >
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="relative grid gap-4">
          <div className="glass-panel rounded-[28px] p-5">
            <p className="text-sm text-[var(--muted)]">Live visitors</p>
            <p className="mt-2 font-display text-5xl font-semibold">{visitorCount}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">Tracked in Firebase Realtime Database per session.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {hero.stats?.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
