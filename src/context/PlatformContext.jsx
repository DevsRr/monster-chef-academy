import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { audioManager } from "../game/systems/AudioManager";
import { saveManager } from "../game/systems/SaveManager";

const PlatformContext = createContext(null);

const initialState = {
  player: {
    id: "local-kid-chef",
    name: "Chef Star",
    avatar: "spark",
    coins: 140,
    stars: 24,
    dailyRewardReady: true,
  },
  achievements: [
    { id: "first-recipe", title: "First Recipe", progress: 100 },
    { id: "memory-master", title: "Memory Master", progress: 45 },
    { id: "kind-chef", title: "Kind Chef", progress: 70 },
  ],
  inventory: {
    tomato: 4,
    berry: 3,
    noodle: 2,
    starSugar: 1,
  },
  monsters: [
    {
      id: "momo",
      name: "Momo",
      personality: "Curious taste tester",
      skin: "mint",
      hunger: 68,
      happiness: 82,
      energy: 74,
      skill: 3,
      favorite: "Rainbow Soup",
    },
    {
      id: "zuzu",
      name: "Zuzu",
      personality: "Sleepy noodle expert",
      skin: "coral",
      hunger: 52,
      happiness: 76,
      energy: 58,
      skill: 2,
      favorite: "Moon Muffins",
    },
  ],
  settings: {
    muted: false,
    fullscreen: false,
  },
  sync: {
    online: typeof navigator === "undefined" ? true : navigator.onLine,
    status: "Saved offline",
    pending: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.payload };
    case "toggleMute":
      audioManager.setMuted(!state.settings.muted);
      return { ...state, settings: { ...state.settings, muted: !state.settings.muted } };
    case "setOnline":
      return {
        ...state,
        sync: { ...state.sync, online: action.online, status: action.online ? "Ready to sync" : "Offline mode" },
      };
    case "setSyncStatus":
      return { ...state, sync: { ...state.sync, ...action.payload } };
    case "addRewards":
      return {
        ...state,
        player: {
          ...state.player,
          coins: state.player.coins + (action.payload.coins || 0),
          stars: state.player.stars + (action.payload.stars || 0),
        },
        inventory: Object.entries(action.payload.ingredients || {}).reduce(
          (next, [key, value]) => ({ ...next, [key]: (next[key] || 0) + value }),
          state.inventory,
        ),
      };
    case "feedMonster":
      return {
        ...state,
        monsters: state.monsters.map((monster) =>
          monster.id === action.monsterId
            ? {
                ...monster,
                hunger: Math.min(100, monster.hunger + 18),
                happiness: Math.min(100, monster.happiness + 10),
                skill: monster.skill + 1,
              }
            : monster,
        ),
      };
    default:
      return state;
  }
}

export function PlatformProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    saveManager.load().then((saved) => {
      if (active && saved) {
        dispatch({ type: "hydrate", payload: saved });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    saveManager.save(state);
  }, [state]);

  useEffect(() => {
    const handleOnline = () => dispatch({ type: "setOnline", online: true });
    const handleOffline = () => dispatch({ type: "setOnline", online: false });
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used inside PlatformProvider");
  }
  return context;
}
