/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        card: {
          DEFAULT: 'var(--bg-card)',
          hover: 'var(--bg-card-hover)',
          light: 'var(--bg-card-light)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          emerald: 'var(--border-emerald)',
          hover: 'var(--border-hover)',
          active: 'var(--border-active)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
          emerald: 'var(--text-emerald)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
          subtle: 'var(--accent-subtle)',
          glow: 'var(--accent-glow)',
        },
        status: {
          available: 'var(--status-available)',
          glow: 'var(--status-available-glow)',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#064e3b',
          850: '#0a3d30',
          900: '#062d23',
          950: '#021812',
        },
        graphite: {
          950: '#080c0a',
          900: '#0e1411',
          850: '#141c18',
          800: '#1a241f',
          750: '#222f28',
          700: '#2c3b33',
          600: '#415248',
          500: '#5c7064',
          400: '#7e9487',
          300: '#a4b8ad',
          200: '#cbdad1',
          100: '#e5eee8',
          50: '#f3f7f5',
        },
        obsidian: {
          950: '#080c0a',
          900: '#0e1411',
          850: '#141c18',
          800: '#1a241f',
          750: '#222f28',
        },
        ice: {
          white: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
        }
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.75, transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
