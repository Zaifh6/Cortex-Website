/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'services-pill-marquee': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
      },
      animation: {
        'services-pill-marquee': 'services-pill-marquee 52s linear infinite',
      },
      colors: {
        black: '#000000',
      },
      backgroundImage: {
        'grid-white': 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22%3E%3Cpath d=%22M0 0h50M0 50v-50M50 0v50%22 stroke=%22white%22 stroke-width=%220.5%22 fill=%22none%22/%3E%3C/svg%3E")',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
