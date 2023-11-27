/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#121212",
        lightBackground: "#f0f3f3",
        darkAbsent: "#3a3a3c",
        lightAbsent: "#787c7e",
        lightSecondary: "#d3d6da",
        lightCorrect: "#6aaa64",
        darkCorrect: "#538d4e",
        lightPresent: "#c9b458",
        darkPresent: "#b59f3b",
      },
      animation: {
        "pulse-short": "pulseShort 0.5s ease-in-out 1",
      },
      keyframes: {
        pulseShort: {
          "0%": {
            transform: "scale(1)",
          },
          "40%": {
            transform: "scale(1.02)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
