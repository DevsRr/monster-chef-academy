import { useState } from "react";
import IngredientButton, { ingredients } from "../components/IngredientButton";

const targets = [
  { id: "red", label: "Red bowl", accepts: "tomato" },
  { id: "blue", label: "Blue bowl", accepts: "berry" },
  { id: "warm", label: "Warm pot", accepts: "noodle" },
  { id: "green", label: "Green plate", accepts: "leaf" },
];

export default function IngredientMatch({ onComplete }) {
  const [matched, setMatched] = useState([]);
  const [dragged, setDragged] = useState(null);

  const match = (target) => {
    if (!dragged || target.accepts !== dragged || matched.includes(target.id)) return;
    const next = [...matched, target.id];
    setMatched(next);
    setDragged(null);
    if (next.length === targets.length) {
      onComplete({ score: 160 });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-4">
        {ingredients.map((ingredient) => (
          <IngredientButton
            key={ingredient.id}
            ingredient={ingredient}
            draggable
            onDragStart={() => setDragged(ingredient.id)}
            onClick={() => setDragged(ingredient.id)}
            active={dragged === ingredient.id}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {targets.map((target) => (
          <button
            type="button"
            key={target.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => match(target)}
            onClick={() => match(target)}
            className={`min-h-[132px] rounded-[28px] border-4 border-dashed p-4 text-center font-display text-xl font-extrabold transition ${
              matched.includes(target.id) ? "border-accent bg-accent/20" : "border-white/60 bg-white/30"
            }`}
          >
            {matched.includes(target.id) ? "Yum!" : target.label}
          </button>
        ))}
      </div>
    </div>
  );
}
