import CountTheRecipe from "../games/monster-chef-academy/minigames/CountTheRecipe";
import CookingSequence from "../games/monster-chef-academy/minigames/CookingSequence";
import IngredientMatch from "../games/monster-chef-academy/minigames/IngredientMatch";
import MemoryRecipe from "../games/monster-chef-academy/minigames/MemoryRecipe";
import SpeedServe from "../games/monster-chef-academy/minigames/SpeedServe";

export const miniGameRegistry = [
  {
    id: "memory-recipe",
    title: "Memory Recipe",
    skill: "Working memory",
    reward: { coins: 18, stars: 2, ingredients: { berry: 1, tomato: 1 } },
    component: MemoryRecipe,
  },
  {
    id: "ingredient-match",
    title: "Ingredient Match",
    skill: "Pattern logic",
    reward: { coins: 16, stars: 2, ingredients: { tomato: 2 } },
    component: IngredientMatch,
  },
  {
    id: "count-the-recipe",
    title: "Count The Recipe",
    skill: "Counting",
    reward: { coins: 15, stars: 1, ingredients: { starSugar: 1 } },
    component: CountTheRecipe,
  },
  {
    id: "cooking-sequence",
    title: "Cooking Sequence",
    skill: "Sequencing",
    reward: { coins: 20, stars: 2, ingredients: { noodle: 1 } },
    component: CookingSequence,
  },
  {
    id: "speed-serve",
    title: "Speed Serve",
    skill: "Attention",
    reward: { coins: 22, stars: 3, ingredients: { berry: 1, noodle: 1 } },
    component: SpeedServe,
  },
];
