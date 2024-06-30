<script setup>
import { useInterfaceStore } from "~/stores/interface";

const props = defineProps(["heading", "paragraph", "cta", "link", "image"]);

const ui = useInterfaceStore();
</script>

<template>
  <graphic-text>
    <text-content>
      <picture v-if="!ui.isDesktop">
        <slot>
          <NuxtImg loading="lazy" :src="image" :alt="heading" />
        </slot>
      </picture>
      <h3 class="attention-voice">
        {{ heading }}
      </h3>
      <p class="calm-voice">
        {{ paragraph }}
      </p>

      <NuxtLink class="text" :to="link" v-if="link && cta">
        {{ cta }}
      </NuxtLink>
    </text-content>

    <picture v-if="ui.isDesktop">
      <slot>
        <NuxtImg loading="lazy" :src="image" :alt="heading" />
      </slot>
    </picture>
  </graphic-text>
</template>

<style scoped lang="scss">
graphic-text {
  display: grid;
  align-items: center;
  gap: var(--space-l);

  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));

  picture {
    max-width: 80%;
    aspect-ratio: 1/1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

text-content {
  display: grid;

  h3 {
    @media (min-width: 1024px) {
      --font-size: var(--step-3);
    }
  }

  p {
    grid-column: 1/-1;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 0.2fr 1fr;
    align-items: center;
  }
}

graphic-text.reverse {
  text-content {
    @media (min-width: 1024px) {
      order: 2;
    }
  }
}

picture:has(svg) {
  display: grid;
  align-items: center;
}
</style>
