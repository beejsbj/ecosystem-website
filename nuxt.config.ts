import type { Nuxt, NuxtApp, NuxtPlugin } from "nuxt/schema";

export default defineNuxtConfig({
  spaLoadingTemplate: "./app-loading.html",

  routeRules: {
    "/": { prerender: false },
    "/add-dapp": {
      ssr: false,
      prerender: false,
    },
    "/ecosystem": {
      ssr: false,
      prerender: false,
    },
    "/articles": {
      ssr: false,
      prerender: false,
    },
    "/style-guide": {
      ssr: false,
    },
  },

  //global default head metadata
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },

    head: {
      title: "API3 Ecosystem",

      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "canonical", href: "https://ecosystem.api3.org" },
      ],
    },
  },

  css: ["@/assets/styles/site.css", "vue-skeletor/dist/vue-skeletor.css"],

  postcss: {
    plugins: {
      "postcss-import": {},
      "postcss-url": {},
      cssnano: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["gsap", "@api3/logos"],
  },

  vite: {
    optimizeDeps: {
      // This fixes a 500 error when running in dev mode after adding the build.transpile option above.
      // e.g: The requested module '/_nuxt/node_modules/mypackage/dist/index.js?v=85eb31b5' does not provide an export named 'default'
      include: ["@api3/logos > @api3/logos"],
    },
  },

  vue: {
    compilerOptions: {
      //every tag with '-' is a custom element
      isCustomElement: (tag) => tag.includes("-"),
    },
  },

  modules: [
    // tooltip
    ["floating-vue/nuxt", {}],
    //formkit
    [
      "@formkit/nuxt",
      {
        //   autoImport: false,
      },
    ],
    //lodash
    [
      "nuxt-lodash",
      {
        prefix: "_",
      },
    ],
    [
      "@nuxt/content",
      {
        highlight: {
          // Theme used in all color schemes.
          theme: "github-dark",
          preload: ["c", "shell", "solidity"],
        },
      },
    ],

    //devtools
    [
      "@nuxt/devtools",
      {
        enabled: false, // Enable only in development
      },
    ],

    //image
    [
      "@nuxt/image",
      {
        format: ["webp"],
        quality: 80,
      },
    ],

    //robots
    [
      "@nuxtjs/robots",
      {
        UserAgent: "*",
        Disallow: "/testing-ground",
      },
    ],

    //pinia
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "nuxt-multi-cache",
    "@nuxt/test-utils/module",
  ],

  multiCache: {
    route: {
      enabled: true,
    },
    api: {
      enabled: true,
      cacheTagInvalidationDelay: 5000,
      authorization: false,
    },
  },

  //   plugins: ["~/plugins/gsap.ts", "~/plugins/floating-vue.ts"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ["stores"],
  },

  nitro: {
    serverAssets: [
      {
        baseName: "",
        dir: "assets",
      },
    ],
  },

  hooks: {
    "app:resolve": (app: NuxtApp) => {
      if (!process.env.VITEST) {
        return;
      }

      app.plugins = app.plugins.filter(
        (p: NuxtPlugin) => !p.src.includes("/plugins/logos")
      );
    },
  },

  runtimeConfig: {
    public: {
      formkitProKey: process.env.NUXT_FORMKIT_PRO_KEY,
      nodeEnv: process.env.NUXT_NODE_ENV,
      showcaseMode: true,
    },
  },

  compatibilityDate: "2025-02-27",
});
