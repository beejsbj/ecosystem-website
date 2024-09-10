<script setup>
/**
 * OEVGithubLinkSection Component
 *
 * A section component that displays a message about data verification and provides a link to the GitHub repository.
 *
 * @component
 *
 * @example
 * <OEVGithubLinkSection />
 *
 * @features
 * - Displays a message encouraging users to verify data on GitHub
 * - Includes a styled external link to the GitHub repository
 * - Uses responsive text sizing based on device type (mobile/desktop)
 * - Incorporates a GitHub decoration element for visual enhancement
 * - Implements responsive layout and styling
 */

const oev = useOEVStore();
const ui = useInterfaceStore();
</script>

<template>
  <!--  displaying a message about data verification -->
  <SectionColumn class="github-link-section">
    <text-content>
      <p
        :class="{
          'notice-voice': ui.isMobile,
          'attention-voice': !ui.isMobile,
        }"
      >
        You can verify this data by
        <NuxtLink
          class="text external-link"
          target="_blank"
          to="https://github.com/api3-ecosystem/protocol-liquidation-data-extraction"
        >
          <span class="gradient-text-color-light">
            heading to our GitHub.
          </span>
        </NuxtLink>
      </p>
    </text-content>

    <GithubDecoration />
  </SectionColumn>
</template>

<style scoped lang="scss">
text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  @media (min-width: 768px) {
    padding: var(--space-l);
  }

  .loud-voice {
    @media (max-width: 400px) {
      --font-size: var(--step-2);
    }
  }

  a {
    display: block;
  }
}

picture.github-graphic {
  max-width: 218px;
  margin-inline: auto;

  @media (min-width: 768px) {
    max-width: 70%;
  }
}
</style>
