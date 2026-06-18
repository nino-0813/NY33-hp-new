import type { Config } from "tailwindcss";

export default {
  // 既存サイト（手書きCSS）を壊さないため、Tailwind のグローバルリセットを無効化。
  // LP に必要なリセットは app/lp/lp.css 内で .lp-root 配下に限定して適用している。
  corePlugins: {
    preflight: false,
  },
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E60023",
          reddark: "#C20019",
          orange: "#F08200",
          orangelight: "#FF9B1A",
        },
        ink: {
          DEFAULT: "#222222",
          soft: "#444444",
          dark: "#171717",
        },
        paper: "#FFFFFF",
        pink: {
          DEFAULT: "#FCE9E6",
          soft: "#FDF1EF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
    },
  },
  plugins: [],
} satisfies Config;
