/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        sm: "32px",
        lg: "48px",
        xl: "96px",
        "2xl": "96px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#ebeaf1",
          100: "#d8d6e3",
          200: "#b0acc6",
          300: "#8983aa",
          400: "#61598d",
          500: "#3a3071",
          600: "#2e265a",
          700: "#231d44",
          800: "#17132d",
          900: "#0c0a17",
        },
        secondary: {
          50: "#eaf8f8",
          100: "#d5f0f0",
          200: "#abe1e1",
          300: "#81d2d3",
          400: "#57c3c4",
          500: "#2db4b5",
          600: "#249091",
          700: "#1b6c6d",
          800: "#124848",
          900: "#092424",
        },
        danger: "#FF3C3F",
        gray: {
          400: "#FBFBFB",
        },
        dark: "#1C1C1C",
        success: "#0C9D61",
        warning: "#FE9B0E",
        // Gradient colors
        gradientStart: "#15C472",
        gradientEnd: "#0A717E",
      },
    },
    fontFamily: {
      sans: ["Tajawal", "ui-sans-serif", "system-ui", "sans-serif"],
      tajawal: ["Tajawal", "sans-serif"],
    },
  },
};
