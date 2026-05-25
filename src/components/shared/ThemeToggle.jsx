import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full transition duration-300 hover:-translate-y-0.5"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}
