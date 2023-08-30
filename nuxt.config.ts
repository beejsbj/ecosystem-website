export default defineNuxtConfig({
  spaLoadingTemplate: "./app-loading.html",

  routeRules: {
    // Homepage pre-rendered at build time
    "/": { prerender: true },
    "add-dapp": {
      ssr: false,
    },
  },

  vite: {
    optimizeDeps: {
      include: ["plotly.js-dist-min"],
    },
  },

  //global default head metadata
  app: {
    //  pageTransition: {
    //    name: "page",
    //    mode: "out-in",
    //  },

    head: {
      title: "API3 Ecosystem",

      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],

      link: [
        // favicon icon in assets/images
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      ],
    },
  },

  css: [
    "@/assets/styles/site.css",
    "@formkit/themes/genesis",
    "floating-vue/dist/style.css",
  ],

  build: {
    transpile: ["gsap"],
  },

  vue: {
    compilerOptions: {
      //every tag with '-' is a custom element
      isCustomElement: (tag) => tag.includes("-"),
    },
  },

  modules: [
    "@formkit/nuxt",
    //  "@nuxt/devtools",
    "@nuxt/content",

    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    //  [
    //    "@nuxt/content",
    //    {
    //      content: null,
    //      // https://content.nuxtjs.org/api/configuration
    //    },
    //  ],
  ],
  plugins: ["~/plugins/gsap.ts", "~/plugins/floating-vue.ts"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ["stores"],
  },

  content: {
    highlight: {
      // Theme used in all color schemes.
      theme: "github-dark",
      preload: ["c", "shell", "solidity"],
    },
  },

  nitro: {
    plugins: ["~/server/index.ts"],
    serverAssets: [
      {
        baseName: "",
        dir: "assets",
      },
    ],
  },
  runtimeConfig: {
    mongodbUri: process.env.NUXT_MONGODB_URI,
    mongodbUriDev: process.env.NUXT_MONGODB_URI_DEV,
    awsAccessKeyId: process.env.NUXT_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
    rootBucket: process.env.NUXT_ROOT_BUCKET,
    imageUploadSizeLimit: process.env.NUXT_IMAGE_UPLOAD_SIZE_LIMIT,
    gitAccessToken: process.env.NUXT_GIT_ACCESS_TOKEN,
    jwtSecret: process.env.NUXT_JWT_SECRET,
    githubWebhookSecret: process.env.NUXT_GITHUB_WEBHOOK_SECRET,
    nodeEnv: process.env.NUXT_NODE_ENV,
    dappRegistryProd: process.env.NUXT_DAPP_REGISTRY_PROD,
    dappRegistryDev: process.env.NUXT_DAPP_REGISTRY_DEV,
    public: {
      walletConnectProjectId: "8ea05c2c45ce1000d51a7364ce317dc5",
    },
  },
});
