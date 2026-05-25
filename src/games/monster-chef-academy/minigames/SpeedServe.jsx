import { useEffect, useMemo, useState } from "react";

const orders = ["🍅", "🍇", "🍜", "🥬"];

export default function SpeedServe({ onComplete }) {
  const [target, setTarget] = useState("🍅");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(12);
  const options = useMemo(() => [...orders].sort(() => Math.random() - 0.5), [target]);

  useEffect(() => {
    if (time <= 0) {
      onComplete({ score: 90 + score * 15 });
      return undefined;
    }
    const timer = window.setTimeout(() => setTime((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [time, score, onComplete]);

  const choose = (value) => {
    if (value === target) {
      setScore((current) => current + 1);
      setTarget(orders[Math.floor(Math.random() * orders.length)]);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="rounded-[28px] bg-white/35 p-5 dark:bg-white/10">
        <p className="text-sm font-extrabold text-[var(--muted)]">Time {time}s · Score {score}</p>
        <p className="mt-2 font-display text-4xl font-extrabold">Serve {target}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => choose(option)}
            className="grid min-h-[132px] place-items-center rounded-[28px] bg-white/45 text-6xl shadow-xl transition hover:-translate-y-1"
            aria-label={`Serve ${option}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
