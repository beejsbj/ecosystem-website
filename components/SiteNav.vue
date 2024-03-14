<script setup>
// use runtime, get env

const config = useRuntimeConfig();

const isDev = config.public.nodeEnv === "development";
</script>

<template>
  <nav>
    <template v-if="isDev">
      <NuxtLink
        class="text hover-underline dev indigo whisper-voice"
        to="/style-guide"
        >Style Gudie</NuxtLink
      >
      <NuxtLink
        class="text hover-underline dev indigo whisper-voice"
        to="/testing"
        >Testing Ground</NuxtLink
      >
    </template>
    <NuxtLink class="text hover-underline" to="/ecosystem">Ecosystem</NuxtLink>
    <NuxtLink class="text hover-underline new" to="/oev"> OEV </NuxtLink>
    <NuxtLink class="text hover-underline" to="/articles">Articles</NuxtLink>
    <NuxtLink class="text" to="/guild">Guild</NuxtLink>

    <div class="actions">
      <NuxtLink to="https://discord.com/invite/qnRrcfnm5W" class="icon">
        <DynamicIcon icon="Discord-stroke" />
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.icon :deep(picture) {
  max-width: 24px;
  border: unset;
}

:deep(.button) {
  padding: var(--space-2xs) var(--space-l);

  margin-left: var(--space-l);
}
nav:not(.panel-menu) {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: var(--space-s);

  a {
    color: var(--ink);
    white-space: nowrap;
  }

  .button {
    margin-left: var(--space-l);
  }
}

nav.panel-menu {
  display: grid;

  gap: var(--space-m);
  padding: var(--space-l);

  a.text {
    color: var(--ink);
    font-size: var(--step-1);
    padding: unset;

    &.button {
      justify-self: center;
      min-width: 200px;
    }
  }

  a.icon {
    padding: unset;
  }
}
</style>
