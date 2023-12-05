<script setup>
import { useClipboard } from "@vueuse/core";

const props = defineProps(["dappLinks"]);

const route = useRoute();
const { copy, copied, text } = useClipboard();

const shareText = computed(() => {
  return `Check out ${window.location.origin}${route.fullPath} on API3 Ecosystem!`;
});

const socialsToShare = ref([
  {
    label: "Twitter",
    url: `https://twitter.com/intent/tweet?text=${shareText.value}`,
  },
  {
    label: "Facebook",
    url: `https://www.facebook.com/sharer/sharer.php?u=${shareText.value}`,
  },
  {
    label: "LinkedIn",
    url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareText.value}`,
  },
  {
    label: "Reddit",
    url: `https://reddit.com/submit?url=${shareText.value}`,
  },
  {
    label: "Telegram",
    url: `https://t.me/share/url?url=${shareText.value}`,
  },
]);
</script>

<template>
  <share-box>
    <header>
      <h4 class="solid-voice">Share</h4>
    </header>
    <ul class="social-list">
      <li v-for="social in socialsToShare" :key="social.label">
        <a :href="social.url" :target="social.label">
          <picture>
            <DynamicIcon :icon="social.label" />
          </picture>
        </a>
      </li>
    </ul>
    <div>
      <a class="coay-text" target="website" :href="dappLinks.website">{{
        dappLinks.website
      }}</a>
      <button @click="copy(dappLinks.website)" class="button">
        {{ copied ? "Copied!" : "Copy" }}
      </button>
    </div>
  </share-box>
</template>

<style lang="scss" scoped>
share-box {
  padding: var(--space-);
  border-radius: var(--corners);
  background: var(--paper);

  box-shadow: var(--shadow);
  display: grid;

  button.close {
    picture {
      max-width: 10px;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-s) 0;
  }

  .social-list {
    display: flex;
    gap: var(--space-);
    justify-content: center;
    align-items: center;

    padding: var(--space-s) 0;
    margin: var(--space-s) 0;

    border-top: var(--border);
    border-bottom: var(--border);

    :deep(picture) {
      max-width: 2rem;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-s);
    background: var(--gradient-color);
    background: var(--gradient-dark);

    border-radius: var(--corners);
  }
}
</style>
