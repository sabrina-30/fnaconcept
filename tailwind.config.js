/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'fna-charcoal': '#1A2B3C',
        'fna-slate': '#64748b',
        'fna-warm': '#B85D38',
        'fna-blanc-casse':'#F8F9FA',
        'fna-gris-perle':'#E2E8F0',
      },
      fontFamily: {
        'fna-title': ['"Montserrat"', 'Playfair'],
        'fna-body': ['"Open Sans"', 'Roboto']
      },
    },
  },
  plugins: [],
}
