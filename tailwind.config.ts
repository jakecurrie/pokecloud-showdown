import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ["Pokemon Solid", "sans-serif"],
      },
      colors: {
        onyx: "#3A4041ff",
        charcoal: "#3B4F67ff",
        biceblue: "#316E95ff",
        honeydew: "#E3EBDBff",
        sage: "#AFAE60ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
