import { useEffect, useMemo, useState } from "react";
import IngredientButton, { ingredients } from "../components/IngredientButton";

export default function MemoryRecipe({ difficulty = 1, onComplete }) {
  const sequence = useMemo(() => ingredients.slice(0, 3 + difficulty).map((item) => item.id), [difficulty]);
  const [step, setStep] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState([]);
  const [showing, setShowing] = useState(true);

  useEffect(() => {
    let timers = [];
    setShowing(true);
    sequence.forEach((id, index) => {
      timers.push(window.setTimeout(() => setActiveId(id), 550 * index));
      timers.push(window.setTimeout(() => setActiveId(null), 550 * index + 320));
    });
    timers.push(window.setTimeout(() => setShowing(false), sequence.length * 550 + 150));
    return () => timers.forEach(window.clearTimeout);
  }, [sequence, step]);

  const choose = (id) => {
    if (showing) return;
    const nextInput = [...input, id];
    setInput(nextInput);
    if (sequence[nextInput.length - 1] !== id) {
      setInput([]);
      setStep((current) => current + 1);
      return;
    }
    if (nextInput.length === sequence.length) {
      onComplete({ score: 100 + step * 20 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-white/35 p-5 text-center dark:bg-white/10">
        <p className="font-display text-2xl font-extrabold">{showing ? "Watch the recipe" : "Tap it back"}</p>
        <p className="text-sm font-bold text-[var(--muted)]">{input.length} of {sequence.length} ingredients</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ingredients.map((ingredient) => (
          <IngredientButton
            key={ingredient.id}
            ingredient={ingredient}
            active={activeId === ingredient.id}
            onClick={() => choose(ingredient.id)}
          />
        ))}
      </div>
    </div>
  );
}
