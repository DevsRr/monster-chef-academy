import { useMemo, useState } from "react";

export default function CountTheRecipe({ difficulty = 1, onComplete }) {
  const target = 4 + difficulty;
  const items = useMemo(() => Array.from({ length: target }, (_, index) => index), [target]);
  const [answer, setAnswer] = useState(null);

  const choose = (value) => {
    setAnswer(value);
    if (value === target) {
      window.setTimeout(() => onComplete({ score: 120 + target * 10 }), 350);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="rounded-[28px] bg-white/35 p-5 dark:bg-white/10">
        <p className="font-display text-2xl font-extrabold">How many berries go in the recipe?</p>
      </div>
      <div className="mx-auto grid max-w-xl grid-cols-5 gap-3">
        {items.map((item) => (
          <div key={item} className="grid aspect-square place-items-center rounded-[22px] bg-gradient-to-br from-sky-300 to-indigo-400 text-4xl shadow-lg">
            🍇
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {[target - 2, target - 1, target, target + 1, target + 2].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            className={`rounded-[22px] px-5 py-5 font-display text-3xl font-extrabold shadow-lg ${
              answer === value ? "bg-accent text-white" : "bg-white/45"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
