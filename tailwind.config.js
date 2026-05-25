/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        mist: "#e2ecff",
        accent: "#14b8a6",
        coral: "#fb7185",
        gold: "#fbbf24",
        surface: "rgba(255, 255, 255, 0.7)",
        "surface-dark": "rgba(10, 18, 32, 0.62)",
      },
      fontFamily: {
        sans: ["'Sora'", "system-ui", "sans-serif"],
        display: ["'Outfit'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 80px rgba(15, 23, 42, 0.12)",
        neo: "18px 18px 40px rgba(15, 23, 42, 0.12), -18px -18px 40px rgba(255, 255, 255, 0.8)",
        "neo-dark": "18px 18px 40px rgba(0, 0, 0, 0.45), -10px -10px 32px rgba(24, 38, 59, 0.55)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(20,184,166,0.22), transparent 28%), radial-gradient(circle at top right, rgba(251,113,133,0.18), transparent 24%), radial-gradient(circle at bottom, rgba(251,191,36,0.18), transparent 28%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(20, 184, 166, 0.25)" },
          "50%": { boxShadow: "0 0 0 14px rgba(20, 184, 166, 0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
