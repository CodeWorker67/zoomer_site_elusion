/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        happ: {
          blue: '#0A6CFF',
          'blue-hover': '#0052CC',
          ink: '#0F0F0F',
          muted: '#5A5A6A',
          faint: '#8A8A99',
          gray: '#F4F5F9',
          dark: '#0F1116',
          footer: '#0B0D12',
        },
        /* Алиасы для существующих классов zoomer-* */
        zoomer: {
          neon: '#0A6CFF',
          'neon-bright': '#4A8CFF',
          'neon-dim': '#0052CC',
          green: '#0A6CFF',
          cyan: '#0A6CFF',
          dark: '#FFFFFF',
          card: '#F4F5F9',
          border: 'rgba(0, 0, 0, 0.07)',
        },
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        pill: '980px',
        card: '22px',
        btn: '16px',
      },
    },
  },
  plugins: [],
};
