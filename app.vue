<script setup>
const {} = useWeb3Store();
const route = useRoute();

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
  const {} = useWeb3();
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

<style>
/* nuxt dev tools */
body > div[data-v-app] {
  display: none;
}
</style>
