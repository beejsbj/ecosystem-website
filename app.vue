<script setup>
/**
 * App Component
 *
 * The root component of the API3 Ecosystem application.
 *
 * @component
 *
 * @features
 * - Sets up default metadata for SEO
 * - Manages client-side app versioning
 * - Configures global head and SEO meta tags
 * - Handles automatic app reload on version change
 *
 * @uses
 * - useWeb3Store - For web3 related functionality
 * - useRoute - For accessing current route information
 * - useHead - For setting global head tags
 * - useSeoMeta - For setting SEO meta tags
 *
 * @data
 * @property {Object} meta - Default metadata for the application
 *
 * @methods
 * @method getClientAppVersion - Retrieves the client-side app version from localStorage
 * @method setClientAppVersion - Sets the client-side app version in localStorage
 *
 * @lifecycle
 * @hook onMounted - Checks for app version updates and reloads if necessary
 *
 * @seo
 * - Dynamically sets title, description, og:image, and other meta tags based on route metadata
 * - Falls back to default metadata if route-specific metadata is not provided
 *
 * @layout
 * - Uses NuxtLayout for consistent page layout
 * - Renders current page content using NuxtPage
 *
 * @versioning
 * - Compares client-side version with server-side version
 * - Triggers a page reload if a new version is detected
 *
 * @notes
 * - Assumes the existence of a '/version.json' file for server-side version checking
 * - Uses localStorage for persisting client-side version information
 * - Configures global HTML and body attributes
 */


 
const {} = useWeb3Store();
const route = useRoute();
const config = useRuntimeConfig();

//default metadata
const meta = {
  title: "API3 Ecosystem",
  url: "https://ecosystem.api3.org",
  type: "website",
  description:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",
  image: {
    url: "/images/api3-ecosystem-meta.jpg",
    width: 1200,
    height: 630,
    alt: "API3 Ecosystem Logo",
  },
  twitterCard: "summary_large_image",
  themeColor: "#7de2cb",
};

//client app versioning
function getClientAppVersion() {
  return localStorage.getItem("APP_VERSION") ?? 0;
}

function setClientAppVersion(version) {
  return localStorage.setItem("APP_VERSION", version);
}

useHead({
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: () => route.name,
  },
});

useSeoMeta({
  ogUrl: () => route.meta.url ?? meta.url,
  ogType: () => route.meta.type ?? meta.type,

  title: () => route.meta.title ?? meta.title,
  ogTitle: () => route.meta.title ?? meta.title,
  twitterTitle: () => route.meta.title ?? meta.title,

  description: () => route.meta.description ?? meta.description,
  ogDescription: () => route.meta.description ?? meta.description,
  twitterDescription: () => route.meta.description ?? meta.description,

  ogImage: () => {
    return {
      ...meta.image,
      url: route.meta.image ?? meta.image.url,
    };
  },

  twitterImage: () => {
    return {
      ...meta.image,
      url: route.meta.image ?? meta.image.url,
    };
  },

  twitterCard: "summary_large_image",
  themeColor: "#7de2cb",
});

onMounted(() => {
  if (!config.public.showcaseMode) {
    const {} = useWeb3();
  }

  fetch("/version.json").then((serverPromise) =>
    serverPromise.json().then((response) => {
      const latestVersion = response.version;
      const clientStoredVersion = getClientAppVersion();

      if (clientStoredVersion != latestVersion) {
        window.location.reload(true);
        setClientAppVersion(latestVersion);
      } else return;
    })
  );
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
