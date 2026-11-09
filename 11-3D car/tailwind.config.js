/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#030304',
          900: '#070709',
          850: '#0b0c0e',
          800: '#111216',
          700: '#1a1b22',
          600: '#252732',
        },
        metallic: {
          silver: '#e2e5eb',
          titanium: '#8e95a5',
          steel: '#4b5162',
          gold: '#cbb279',
          red: '#c91f1f',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-cinzel)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}

