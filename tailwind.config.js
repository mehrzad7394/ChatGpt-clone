/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotateOrbital: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(60deg)",
          },
        },
      },
      animation:{
        rotateOrbital: "rotateOrbital 100s linear infinite",
      }
    },
  },
  plugins: [],
};
