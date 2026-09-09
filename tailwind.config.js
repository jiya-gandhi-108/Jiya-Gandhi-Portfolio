/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontWeight: { 400: '400', 500: '500', 600: '600', 700: '700', 900: '900' },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        royal: 'rgb(var(--royal) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        graphite: 'rgb(var(--graphite) / <alpha-value>)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeRev: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-2deg)' }, '50%': { transform: 'rotate(2deg)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-rev': 'marqueeRev 30s linear infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
