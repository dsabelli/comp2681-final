/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fed719",
          secondary: "#e8e6e3",
          accent: "#23629f",
          neutral: "#626262",
          "base-100": "#f7f7f7",
          "base-200": "#eaeaea",
          "base-300": "#ddd",
          info: "#7EBCDD",
          success: "#53EAD6",
          warning: "#F48B0B",
          error: "#F35356",
        },
      },
      {
        myDarkTheme: {
          primary: "#fed719",
          secondary: "#e8e6e3",
          accent: "#23629f",
          neutral: "#626262",
          "base-100": "#000",
          "base-200": "#eaeaea",
          "base-300": "#ddd",
          info: "#7EBCDD",
          success: "#53EAD6",
          warning: "#F48B0B",
          error: "#F35356",
        },
      },
    ],
  },
  darkMode: ["class", "[dark-theme='myDarkTheme'"],
  plugins: [require("daisyui")],
};
