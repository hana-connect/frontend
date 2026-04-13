import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--color-white)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        information: "var(--color-information)",
        attention: "var(--color-attention)",
        background: "var(--color-background)",
        "background-dim": "var(--color-background-dim)",

        brand: {
          solid: "var(--color-brand-solid)",
          light: "var(--color-brand-light)",
          secondary: "var(--color-brand-secondary)",
          black: "var(--color-brand-black)",
        },

        grey: {
          1: "var(--color-grey-1)",
          2: "var(--color-grey-2)",
          3: "var(--color-grey-3)",
          4: "var(--color-grey-4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient-1": "var(--gradient-brand-1)",
        "brand-gradient-2": "var(--gradient-brand-2)",
      },
    },
  },
  plugins: [],
};

export default config;
