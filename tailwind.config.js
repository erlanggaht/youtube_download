/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        base : '#fdf9f9',
        dark : "#181818",
        semiDark : "#868686",
        yellowBase : "#33cccc",
        textDark : '#282828' 
      }
    },
  },
  plugins:  [require("daisyui")],
}

