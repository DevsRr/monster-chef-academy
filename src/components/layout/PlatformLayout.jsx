import { Outlet } from "react-router-dom";
import PlatformNav from "./PlatformNav";

export default function PlatformLayout() {
  return (
    <div className="app-shell min-h-screen overflow-hidden">
      <div className="chef-bg" aria-hidden="true" />
      <PlatformNav />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
