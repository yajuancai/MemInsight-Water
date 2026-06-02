/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        navy: {
          800: '#1e3a5f',
          900: '#0f2744',
        },
        surface: {
          light: '#f8fafc',
          dark: '#0a0f1a',
        },
      },
      backgroundImage: {
        'mesh-light':
          'radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(147,197,253,0.12) 0%, transparent 45%), linear-gradient(180deg, #ffffff 0%, #eef6fc 100%)',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(37, 99, 235, 0.08)',
        card: '0 2px 16px rgba(15, 39, 68, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
