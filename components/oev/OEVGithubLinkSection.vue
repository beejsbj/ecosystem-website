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
          class="text green external-link"
          to="https://github.com/AamirAlam/aave-extract-mev-funds"
        >
          heading to our GitHub.
        </NuxtLink>
      </p>
    </text-content>

    <picture class="github-graphic">
      <img src="@/assets/images/github-graphic.svg" alt="GitHub graphic" />
    </picture>
  </SectionColumn>
</template>

<style scoped lang="scss">
text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  @media (min-width: 768px) {
    padding: var(--space-3xl);
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
</style>


