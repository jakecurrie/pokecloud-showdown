import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ['Pokemon Solid', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
