<script setup>
import jsonp from "jsonp";
const props = defineProps(["gistUrl", "gistId", "file"]);

const gistData = ref("loading...");
const gistErr = ref(false);

const url = computed(() => {
  if (props.gistUrl) {
    return props.gistUrl + ".json";
  }
  if (props.gistId) {
    return `https://gist.github.com/${props.gistId}.json`;
  }
});

const params = computed(() => {
  if (props.file) {
    return `file=${props.file}`;
  }
  return "";
});

const fullUrl = computed(() => {
  return `${url.value}?${params.value}`;
});

function getGistData() {
  jsonp(fullUrl.value, { timeout: 20000 }, (err, response) => {
    if (err) {
      gistErr.value = true;
      return;
    }
    gistData.value = response.div;
  });
}

onMounted(() => {
  watch(
    fullUrl,
    () => {
      gistErr.value = false;
      gistData.value = "loading...";
      getGistData();
    },
    { immediate: true, deep: true }
  );
});
</script>

<template>
  <template v-if="gistErr">
    <picture>
      <NuxtImg
        loading="lazy"
        id="notFound"
        height="100%"
        width="100%"
        src="https://user-images.githubusercontent.com/883233/102043641-d4817580-3d89-11eb-885d-2786373932d4.png"
        alt="404"
      />
    </picture>
  </template>
  <template v-else>
    <div>
      <p v-html="gistData" />
    </div>
  </template>
</template>

<style scoped>
@import url("https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* dark color */
@import url("https://cdn.rawgit.com/lonekorean/gist-syntax-themes/d49b91b3/stylesheets/one-dark.css");
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
</style>
