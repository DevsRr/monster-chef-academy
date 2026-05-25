import { useState } from "react";

const correctSteps = ["Wash", "Chop", "Mix", "Cook", "Serve"];

export default function CookingSequence({ onComplete }) {
  const [steps, setSteps] = useState(["Cook", "Wash", "Serve", "Chop", "Mix"]);
  const [selected, setSelected] = useState(null);

  const swap = (index) => {
    if (selected === null) {
      setSelected(index);
      return;
    }
    const next = [...steps];
    [next[selected], next[index]] = [next[index], next[selected]];
    setSteps(next);
    setSelected(null);
    if (next.every((step, stepIndex) => step === correctSteps[stepIndex])) {
      window.setTimeout(() => onComplete({ score: 180 }), 350);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] bg-white/35 p-5 text-center dark:bg-white/10">
        <p className="font-display text-2xl font-extrabold">Tap two cards to swap the recipe steps.</p>
      </div>
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <button
            key={`${step}-${index}`}
            type="button"
            onClick={() => swap(index)}
            className={`flex items-center gap-4 rounded-[24px] px-5 py-5 text-left transition ${
              selected === index ? "bg-gold text-ink shadow-xl" : "bg-white/40"
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-white">
              {index + 1}
            </span>
            <span className="font-display text-2xl font-extrabold">{step}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
