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
 * - Includes a visible Style Guide link
 * - Supports both desktop and mobile (panel) layouts
 * - Highlights new sections with a 'new' class
 *
 * @data
 * - links: Array of navigation link objects (name, to, class)
 *
 */

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
      <NuxtLink to="/style-guide" class="text style-guide-link">
        <span>Style Guide</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
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

  .actions {
    display: flex;
    align-items: center;
  }

  .style-guide-link {
    position: relative;
    font-weight: 700;
    padding-inline: var(--space-3xs);

    &::after {
      content: "";
      position: absolute;
      left: var(--space-3xs);
      right: var(--space-3xs);
      bottom: -0.28em;
      height: 3px;
      background: var(--gradient-color);
    }
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

  .actions {
    justify-self: start;
  }

  .style-guide-link {
    justify-self: start;
    font-weight: 700;
    color: var(--ink);

    span {
      border-bottom: 3px solid var(--green);
      padding-bottom: 0.15em;
    }
  }
}
</style>
