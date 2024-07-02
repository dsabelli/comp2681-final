/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    mytheme: {
      primary: "#e8c988",

      secondary: "#e8e6e3",

      accent: "#5e92ed",

      neutral: "#312735",

      "base-100": "#1e2533",

      info: "#7EBCDD",

      success: "#53EAD6",

      warning: "#F48B0B",

      error: "#F35356",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
