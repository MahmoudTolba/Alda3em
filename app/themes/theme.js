import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const MyPreset = definePreset(Aura, {
  semantic: {
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
  },
});

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: ".p-dark",
  },
};
