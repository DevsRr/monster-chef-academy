import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../shared/ThemeToggle";
import Button from "../shared/Button";
import { cn } from "../../lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="section pt-4">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <NavLink to="/" className="font-display text-lg font-semibold tracking-tight">
            RR.dev
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive ? "bg-white/15 text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button to="/admin/login" variant="secondary" className="hidden md:inline-flex">
              Admin
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass-panel mt-3 rounded-[28px] p-4 md:hidden"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-white/10"
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button to="/admin/login" variant="secondary" onClick={() => setMenuOpen(false)}>
                  Admin
                </Button>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
