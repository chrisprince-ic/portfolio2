/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
            lightHover:'fcf4ff',
            darkHover:'#2a004a',
            darkTheme:'#0f172a',
        },
        fontFamily: {
          outfit: ['Outfit', 'sans-serif'],
        },

        boxShadow:{
            'black':'4px 4px 0 #000000',
            'white':'4px 4px 0 #ffffff',
        }
      },
    },
  };