import { lazy } from "react";
import { gamesConfig } from "./games.config";

const routeComponents = {
  "monster-chef-academy": lazy(() => import("../games/monster-chef-academy/MonsterChefAcademy")),
};

export const gameRegistry = gamesConfig.map((game) => ({
  ...game,
  routeComponent: routeComponents[game.id],
}));

export function getGameById(gameId) {
  return gameRegistry.find((game) => game.id === gameId);
}
