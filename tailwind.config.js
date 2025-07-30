/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors:{
            lightHover:'fcf4ff',
            darkHover:'#2a004a',
            darkTheme:'#0f172a',
        },
        fontFamily: {
          outfit: ['Outfit', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
          sans: ['Inter', 'sans-serif'],
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.8s ease-out',
          'float': 'float 6s ease-in-out infinite',
          'gradient': 'gradient 15s ease infinite',
          'bounce-slow': 'bounce 3s infinite',
        },
        keyframes: {
          fadeInUp: {
            '0%': {
              opacity: '0',
              transform: 'translateY(30px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            }
          },
          float: {
            '0%, 100%': {
              transform: 'translateY(0px)'
            },
            '50%': {
              transform: 'translateY(-20px)'
            }
          },
          gradient: {
            '0%, 100%': {
              'background-position': '0% 50%'
            },
            '50%': {
              'background-position': '100% 50%'
            }
          }
        },
        boxShadow:{
            'black':'4px 4px 0 #000000',
            'white':'4px 4px 0 #ffffff',
        }
      },
    },
  };