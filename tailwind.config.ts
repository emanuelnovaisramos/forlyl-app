import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--bg-secondary)",
        third: "var(--bg-third)",
        four: "var(--bg-four)",
        header: "var(--header)",
        'icon-primary': "var(--icon-primary)",
        'icon-border': "var(--icon-border)",
        delay: "var(--color-delay)",
        today: "var(--color-today)",
        next: "var(--color-next)",
        done: "var(--color-done)",
        done2: "var(--color-done2)"
      },
    },
  },
  plugins: [],
} satisfies Config;
