/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'azul-claro': 'bg-blue-400',
        'azul-escuro': 'bg-blue-950',
        'slate-fundo': 'bg-slate-800'
      },
      backgroundImage: {
        'smCourses_background': "url('./src/assets/images/sm-courses_background.svg')",
      }
    },
  },
  plugins: [],
}