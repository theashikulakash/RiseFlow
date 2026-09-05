/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#122622",
        teal: {
          DEFAULT: "#0F5257",
          dark: "#0A3A3E",
          light: "#E4F0EF",
        },
        amber: {
          DEFAULT: "#F2A541",
          dark: "#C9822B",
        },
        cream: "#FAF7F2",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
