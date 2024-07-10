OEVGithubLinkSection.vue
<script setup>
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
          to="https://github.com/AamirAlam/aave-extract-mev-funds"
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
