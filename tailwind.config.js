/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: "320px",
      tablet: "768px",
      desktop: "1440px",
    },
  },
  plugins: [],
};
