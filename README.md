# Monster Chef Academy

A production-ready React/Vite browser game platform for young children. The first game, **Monster Chef Academy**, uses cooking-themed mini-games to train working memory, sequencing, matching, counting, attention, and logic through playful monster care.

## What Is Included

- React 18, Vite, React Router, Context API, Tailwind CSS, Framer Motion
- Central game hub with profile, currency, achievements, daily reward, install prompt, offline/sync indicators, and locked future game cards
- Registry-driven game loading through `src/game/games.config.js` and `src/game/gameRegistry.jsx`
- Modular mini-game registry and five playable Monster Chef mini-games
- Reusable UI/game components for cards, meters, monsters, particles, buttons, and mini-game shells
- Local-first save manager using IndexedDB with localStorage fallback
- Firebase Auth, Firestore, and Storage integration points with security rules
- PWA manifest, service worker, offline page, app icons, and install support
- Express API server with `/api/player`, `/api/monsters`, `/api/inventory`, `/api/games`, `/api/save`, and `/api/achievements`

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run api
npm run lint
```

## Architecture

```text
src/
  components/
    game/          Reusable game visuals and platform cards
    layout/        Platform shell and navigation
    ui/            Shared child-friendly UI primitives
  context/         App-wide player, settings, sync, and save state
  game/            Registries and reusable engine systems
  games/
    monster-chef-academy/
      components/  Game-specific reusable pieces
      minigames/   Memory, matching, counting, sequencing, speed play
      scenes/      Reserved for future scene-based expansion
      systems/     Reserved for game-specific systems
  pwa/             Install prompt and service-worker registration
  services/
    firebase/      Firebase client and player progress sync
server/            Express API
public/            PWA manifest, service worker, offline page, icons
```

## Firebase

Copy `.env.example` to `.env` and provide Firebase web config values:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Firestore and Storage rules are provided in `firestore.rules` and `storage.rules`. The app signs in anonymously for privacy-friendly child profiles and stores progress under the authenticated user ID.

## Adding A Future Game

1. Add game metadata to `src/game/games.config.js`.
2. Add a lazy route component in `src/game/gameRegistry.jsx`.
3. Place game code under `src/games/<game-id>/`.
4. Reuse systems from `src/game/systems/` and UI from `src/components/`.

## Production Notes

The frontend is local-first and remains playable offline. Cloud sync is skipped automatically when Firebase is not configured. The Express server currently uses an in-memory store for local development; replace the maps in `server/index.js` with Firebase Admin or another managed datastore for deployed backend persistence.
