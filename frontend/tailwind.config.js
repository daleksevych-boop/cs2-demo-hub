/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cs2: {
          bg: '#0F1117',
          card: '#1A1D27',
          accent: '#F6A623',
          'accent-hover': '#e09318',
          border: '#2A2D3A',
          text: '#E2E8F0',
          muted: '#94A3B8',
        },
      },
    },
  },
  plugins: [],
};
