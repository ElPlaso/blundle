/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#121212",
        darkAbsent: "#3a3a3c",
        lightAbsent: "#787c7e",
        lightSecondary: "#d3d6da",
        lightCorrect: "#6aaa64",
        darkCorrect: "#538d4e",
        lightPresent: "#c9b458",
        darkPresent: "#b59f3b",
      },
    },
  },
  plugins: [],
};
