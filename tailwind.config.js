/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero_bg': "url('./assets/hero_bg.jpg')",
        'travel_sm': "url('./assets/travel_mobile.jpg')",
        'task_sm': "url('./assets/tasklist_mobile.jpg')",
        'sale_sm': "url('./assets/sale_mobile.jpg')",
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'number': '#343434',
        'operation': '#FF9F0A',
        'utility': '#A5A5A5',
      }),
      textColor: {
        'number': '#343434',
        'operation': '#FF9F0A',
        'utility': '#A5A5A5',
      },
      colors: {
        'number': '#343434',
        'operation': '#FF9F0A',
        'utility': '#A5A5A5',
        'border': '#666666',
      },
      height: {
        '18': '4.5rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      width: {
        '18': '4.5rem',
      },
      screens: {
        'ssm': '26rem'
      }
    },
  },
  plugins: [],
};
