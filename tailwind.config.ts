import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '7.5': '30px',
      },
      colors: {
        background: 'var(--bg-primary)',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        third: 'var(--color-third)',
        tertiary: 'var(--color-tertiary)',
        four: 'var(--color-four)',
        five: 'var(--color-five)',
        six: 'var(--color-six)',
        'background-secondary': 'var(--bg-secondary)',
        'background-third': 'var(--bg-third)',
        'background-four': 'var(--bg-four)',
        'background-five': 'var(--bg-five)',
        'background-six': 'var(--bg-six)',
        'background-seven': 'var(--bg-seven)',
        'background-eight': 'var(--bg-eight)',
        'background-destructive': 'var(--bg-destructive)',
        'border-primary': 'var(--color-border-primary)',
        kanban: {
          todo: 'var(--color-kanban-todo)',
          doing: 'var(--color-kanban-doing)',
          done: 'var(--color-kanban-done)',
          overdue: 'var(--color-kanban-overdue)',
        },
        header: 'var(--header)',
        checkbox: 'var(--bg-checkbox)',
        'icon-primary': 'var(--icon-primary)',
        'icon-border': 'var(--icon-border)',
        delay: 'var(--color-delay)',
        today: 'var(--color-today)',
        next: 'var(--color-next)',
        done: 'var(--color-done)',
        done2: 'var(--color-done2)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
