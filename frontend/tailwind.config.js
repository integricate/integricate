/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5500',
          'orange-hover': '#FF7733',
          dark: '#050505',
          'dark-card': '#111111',
          border: '#27272A',
          muted: '#A1A1AA',
          glow: 'rgba(255, 85, 0, 0.3)',
        },
      },
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
        bytebounce: ['ByteBounce', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
