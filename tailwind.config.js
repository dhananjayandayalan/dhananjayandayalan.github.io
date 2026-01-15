/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neubrutalism vibrant color palette
        'brutal-pink': '#FF1493',
        'brutal-cyan': '#00E5FF',
        'brutal-yellow': '#FFEB3B',
        'brutal-lime': '#76FF03',
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',
        'brutal-offwhite': '#F5F5F5',
        'brutal-neardark': '#1A1A1A',
        'brutal-gray-dark': '#333333',
        'brutal-gray-light': '#CCCCCC',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      boxShadow: {
        'brutal-sm': '4px 4px 0 0 #000',
        'brutal-sm-light': '4px 4px 0 0 #FFF',
        'brutal-md': '6px 6px 0 0 #000',
        'brutal-md-light': '6px 6px 0 0 #FFF',
        'brutal-lg': '8px 8px 0 0 #000',
        'brutal-lg-light': '8px 8px 0 0 #FFF',
        // Hover states (reduced shadow)
        'brutal-sm-hover': '2px 2px 0 0 #000',
        'brutal-sm-hover-light': '2px 2px 0 0 #FFF',
        'brutal-md-hover': '3px 3px 0 0 #000',
        'brutal-md-hover-light': '3px 3px 0 0 #FFF',
      },
      borderRadius: {
        'brutal': '2px',
      },
      transitionDuration: {
        'brutal': '100ms',
      },
      transitionTimingFunction: {
        'brutal': 'linear',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
