import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { randomUUID } from "node:crypto";

const app = express();
const port = process.env.PORT || 8080;

const memoryStore = {
  players: new Map(),
  monsters: new Map(),
  inventory: new Map(),
  achievements: new Map(),
  saves: new Map(),
};

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "512kb" }));

function getPlayerId(request) {
  return request.header("x-player-id") || "local-kid-chef";
}

function upsert(map, id, fallback) {
  if (!map.has(id)) map.set(id, fallback);
  return map.get(id);
}

app.get("/api/player", (request, response) => {
  const playerId = getPlayerId(request);
  const player = upsert(memoryStore.players, playerId, {
    id: playerId,
    name: "Chef Star",
    avatar: "spark",
    coins: 140,
    stars: 24,
  });
  response.json({ player });
});

app.get("/api/monsters", (request, response) => {
  const playerId = getPlayerId(request);
  const monsters = upsert(memoryStore.monsters, playerId, [
    { id: "momo", name: "Momo", hunger: 68, happiness: 82, energy: 74, skill: 3 },
  ]);
  response.json({ monsters });
});

app.get("/api/inventory", (request, response) => {
  const playerId = getPlayerId(request);
  const inventory = upsert(memoryStore.inventory, playerId, { tomato: 4, berry: 3, noodle: 2 });
  response.json({ inventory });
});

app.get("/api/games", (_request, response) => {
  response.json({
    games: [
      { id: "monster-chef-academy", enabled: true, version: "1.0.0" },
      { id: "space-shape-lab", enabled: false, version: "planned" },
    ],
  });
});

app.post("/api/save", (request, response) => {
  const playerId = getPlayerId(request);
  const save = {
    id: randomUUID(),
    playerId,
    payload: request.body,
    savedAt: new Date().toISOString(),
  };
  memoryStore.saves.set(playerId, save);
  response.status(201).json({ ok: true, save });
});

app.get("/api/achievements", (request, response) => {
  const playerId = getPlayerId(request);
  const achievements = upsert(memoryStore.achievements, playerId, [
    { id: "first-recipe", title: "First Recipe", progress: 100 },
    { id: "memory-master", title: "Memory Master", progress: 45 },
  ]);
  response.json({ achievements });
});

app.use((error, _request, response, _next) => {
  response.status(500).json({ error: "Internal server error", requestId: randomUUID() });
});

app.listen(port, () => {
  console.log(`Monster Chef Academy API listening on ${port}`);
});
