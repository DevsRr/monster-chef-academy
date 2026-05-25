import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PlatformLayout from "./components/layout/PlatformLayout";
import AppLoader from "./components/shared/AppLoader";
import { gameRegistry } from "./game/gameRegistry";

const GameHubPage = lazy(() => import("./pages/GameHubPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<AppLoader fullScreen label="Warming up the kitchen..." />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<PlatformLayout />}>
            <Route index element={<GameHubPage />} />
            {gameRegistry
              .filter((game) => game.enabled)
              .map((game) => {
                const GameRoute = game.routeComponent;
                return <Route key={game.id} path={game.path} element={<GameRoute />} />;
              })}
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
