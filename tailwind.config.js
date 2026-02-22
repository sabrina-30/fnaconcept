/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'fna-charcoal': '#2d3748',
        'fna-slate': '#64748b',
        'fna-warm': '#d97706',
      }
    },
  },
  plugins: [],
}