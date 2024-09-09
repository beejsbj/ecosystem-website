<script setup>
/**
 * SiteNav Component
 *
 * Navigation component for the API3 website, displaying main menu items
 * and action buttons.
 *
 * @component
 *
 * @example
 * <SiteNav />
 *
 * @features
 * - Displays main navigation links (Ecosystem, OEV, Articles)
 * - Includes a Discord icon link
 * - Supports both desktop and mobile (panel) layouts
 * - Highlights new sections with a 'new' class
 *
 * @data
 * - links: Array of navigation link objects (name, to, class)
 *
 */

const config = useRuntimeConfig();

const isDev = config.public.nodeEnv === "development";

const links = [
  { name: "Ecosystem", to: "/ecosystem" },
  { name: "OEV", to: "/oev", class: "new" },
  { name: "Articles", to: "/articles" },
];
</script>

<template>
  <nav>
    <template v-for="link in links" :key="link.name">
      <NuxtLink :to="link.to" class="text" :class="link.class">
        {{ link.name }}
      </NuxtLink>
    </template>

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
