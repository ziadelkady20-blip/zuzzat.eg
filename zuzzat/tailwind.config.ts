import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1E3ABA",
          "blue-light": "#2847D4",
          "blue-dark": "#152A8A",
          "blue-50": "#EEF1FF",
          "blue-100": "#C7CFFE",
          orange: "#F5A623",
          green: "#A4B55A",
          red: "#FF6B6B",
        },
        gray: {
          50: "#F8F9FF",
          100: "#F0F2FA",
          200: "#E2E6F5",
          400: "#9BA5CC",
          600: "#5C6694",
          800: "#2A3060",
        },
      },
      borderRadius: {
        xl: "20px",
        "2xl": "28px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
