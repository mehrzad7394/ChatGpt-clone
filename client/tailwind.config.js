/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgbot: "url('/bg.png')",
      },
      keyframes: {
        rotateOrbital: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(60deg)",
          },
        },
        botAnimation: {
          "0%": {
            transform: "scale(1) rotate(0deg)",
          },
          "100%": {
            transform: "scale(1.1) rotate(-5deg)",
          },
        },
        bgAnimation: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        rotateOrbital: "rotateOrbital 100s linear infinite",
        botAnimation: "botAnimation 3s ease-in-out infinite alternate",
        bgAnimation: "bgAnimation 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [scrollbar],
};
