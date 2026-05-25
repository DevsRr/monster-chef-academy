import { Outlet } from "react-router-dom";
import BackToTopButton from "../shared/BackToTopButton";
import ScrollProgress from "../shared/ScrollProgress";
import AnimatedCursor from "../shared/AnimatedCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FirebaseNotice from "./FirebaseNotice";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <ScrollProgress />
      <AnimatedCursor />
      <Navbar />
      <FirebaseNotice />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
