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

.github-link-section {
  background: url("@/assets/images/github-graphic.svg"),
    radial-gradient(circle at bottom, transparent 20%, var(--paper) 100%);
  background-repeat: no-repeat;
  background-size: 150%;
  padding-bottom: 300px;
  background-position: center;

  @media (min-width: 768px) {
    background-position: center 80%;
    background-size: 100%;
  }

  @media (min-width: 1000px) {
    background-position: center 10%;
    background-size: 100%;
  }

  @media (min-width: 1700px) {
    background-size: 70%;
  }
}
</style>
