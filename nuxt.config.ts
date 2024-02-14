import mongoose from "mongoose";
import type { Nuxt } from "nuxt/schema";

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
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "canonical", href: "https://ecosystem.api3.org" },
      ],
    },
  },

  css: ["@/assets/styles/site.css"],

  postcss: {
    plugins: {
      "postcss-import": {},
      "postcss-url": {},
      cssnano: {},
      autoprefixer: {},
    },
  },

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
    // tooltip
    "floating-vue/nuxt",

    //formkit
    [
      "@formkit/nuxt",
      {
        autoImport: false, //#fixme
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
  ],

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
    plugins: ["~/server/index.ts"],
    serverAssets: [
      {
        baseName: "",
        dir: "assets",
      },
    ],
    preset: "aws-amplify",
    awsAmplify: {
      imageSettings: {
        dangerouslyAllowSVG: true,
      },
    },
  },
  hooks: {
    close: async (go: Nuxt) => {
      await mongoose.disconnect();
    },
  },
  runtimeConfig: {
    mongodbUri: process.env.NUXT_MONGODB_URI,
    mongodbUriDev: process.env.NUXT_MONGODB_URI_DEV,
    awsAccessKeyId: process.env.NUXT_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
    rootBucket: process.env.NUXT_ROOT_BUCKET,
    imageUploadSizeLimit: process.env.NUXT_IMAGE_UPLOAD_SIZE_LIMIT,
    githubWebhookSecret: process.env.NUXT_GITHUB_WEBHOOK_SECRET,
    nodeEnv: process.env.NUXT_NODE_ENV,
    dappRegistryProd: process.env.NUXT_DAPP_REGISTRY_PROD,
    dappRegistryDev: process.env.NUXT_DAPP_REGISTRY_DEV,
    gitAppPrivateKey: process.env.NUXT_GIT_APP_PRIVATE_KEY,
    gitAppId: process.env.NUXT_GIT_APP_ID,
    gitAppInstallationId: process.env.NUXT_GIT_APP_INSTALLATION_ID,
    gitAppClientId: process.env.NUXT_GIT_APP_CLIENT_ID,
    gitAppClientSecret: process.env.NUXT_GIT_APP_CLIENT_SECRET,
    brevoMailApi: process.env.NUXT_BREVO_MAIL_API,
    emailReceiver: process.env.NUXT_EMAIL_RECIEVER,
    emailSender: process.env.NUXT_EMAIL_SENDER,
    //  FORMKIT_PRO_KEY: process.env.NUXT_FORMKIT_PRO_KEY,
    public: {
      FORMKIT_PRO_KEY: process.env.NUXT_FORMKIT_PRO_KEY,
      walletConnectProjectId: process.env.NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, //this might not work #fixme
      nodeEnv: process.env.NUXT_NODE_ENV,
    },
  },
});
