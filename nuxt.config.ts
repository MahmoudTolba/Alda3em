// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV === "production" ? false : true },
  // runtimeConfig: {
  //   public: {
  //     apiBase: "https://dashboard.sakanapp.com.sa/api/",
  //   },
  // },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
    head: {
      title: "Alda3em-الداعم",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "Alda3em-الداعم",
        },
        {
          charset: "utf-8",
        },
      ],
    },
  },
  // css: ["~/assets/css/main.scss"],
  modules: [
    "@nuxtjs/i18n",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
  ],
  icon: {
    serverBundle: {
      collections: ["mdi", "ph"],
    },
  },
  build: {
    transpile: ["@fawmi/vue-google-maps"],
  },
  primevue: {
    importTheme: { from: "@/themes/theme.js" },
    options: {
      ripple: true,
      inputVariant: "filled",
    },
  },
  i18n: {
    baseUrl: "http://localhost:3000", // Development base URL
    // baseUrl:
    //   process.env.NODE_ENV === "production"
    //     ? "https://sakanapp.com.sa" // Production base URL
    //     : "http://localhost:3000", // Development base URL
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
      alwaysRedirect: false,
    },
    defaultLocale: "ar",
    defaultDirection: "rtl",
    langDir: "locales",
    strategy: "prefix_except_default", // URL strategy
    locales: [
      {
        code: "ar",
        name: "Arabic",
        dir: "rtl",
        file: { path: "ar.json", cache: true },
        language: "ar",
      },
      {
        code: "cs",
        name: "Czech",
        dir: "ltr",
        file: { path: "cs.json", cache: true },
        language: "cs",
      },
      {
        code: "en",
        name: "English",
        dir: "ltr",
        file: { path: "en.json", cache: true },
        language: "en",
      },
      {
        code: "fr",
        name: "French",
        dir: "ltr",
        file: { path: "fr.json", cache: true },
        language: "fr",
      },
      {
        code: "de",
        name: "German",
        dir: "ltr",
        file: { path: "de.json", cache: true },
        language: "de",
      },
      {
        code: "fa",
        name: "Iranian",
        dir: "rtl",
        file: { path: "fa.json", cache: true },
        language: "fa",
      },
      {
        code: "hi",
        name: "Indian",
        dir: "ltr",
        file: { path: "hi.json", cache: true },
        language: "hi",
      },
      {
        code: "ru",
        name: "Russian",
        dir: "ltr",
        file: { path: "ru.json", cache: true },
        language: "ru",
      },
      {
        code: "es",
        name: "Spanish",
        dir: "ltr",
        file: { path: "es.json", cache: true },
        language: "es",
      },
      {
        code: "tr",
        name: "Turkish",
        dir: "ltr",
        file: { path: "tr.json", cache: true },
        language: "tr",
      },
    ],
  },
  googleFonts: {
    families: {
      Tajawal: [400, 500, 700],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },
});
