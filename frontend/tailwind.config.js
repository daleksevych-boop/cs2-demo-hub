/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F1117',
        card: '#1A1D27',
        accent: '#F6A623',
        'accent-hover': '#E09520',
        muted: '#6B7280',
        border: '#2D3148',
      },
    },
  },
  plugins: [],
};
