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
        cyber: {
          bg: '#0a0b0e',
          surface: '#12141a',
          card: 'rgba(20, 24, 33, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
          neonGreen: '#39ff14',
          neonLime: '#def54f',
          neonCyan: '#00f0ff',
          neonBlue: '#4facfe',
          neonOrange: '#ff5e3a',
          neonPurple: '#d946ef',
          neonPink: '#ff007f',
          gold: '#ffd700',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'headlight-sweep': 'headlightSweep 4s infinite linear',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'neon-lime': '0 0 25px rgba(222, 245, 79, 0.45)',
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'neon-orange': '0 0 25px rgba(255, 94, 58, 0.45)',
        'neon-purple': '0 0 25px rgba(217, 70, 239, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
