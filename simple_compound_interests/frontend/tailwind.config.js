/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aesthetic-blue': '#E0F2FE',
        'aesthetic-pink': '#FCE7F3',
        'soft-blue': '#60A5FA',
        'soft-pink': '#F472B6',
      }
    },
  },
  plugins: [],
}
