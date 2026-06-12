import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
          900: 'var(--primary-900)',
        },
        accent: {
          50: 'var(--accent-50)',
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
        },
        warm: {
          50: 'var(--warm-50)',
          100: 'var(--warm-100)',
          200: 'var(--warm-200)',
          300: 'var(--warm-300)',
          400: 'var(--warm-400)',
          500: 'var(--warm-500)',
          600: 'var(--warm-600)',
          700: 'var(--warm-700)',
          800: 'var(--warm-800)',
          900: 'var(--warm-900)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          warm: 'var(--surface-warm)',
          dark: 'var(--surface-dark)',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: 'var(--border-light)',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
