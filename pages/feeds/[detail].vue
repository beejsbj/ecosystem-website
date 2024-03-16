<script setup></script>

<template>
  <article>
    <SectionColumn class="header">
      <FeedIcon feed="metis/bsc" />

      <h1 class="loud-voice">Feeds</h1>

      <NuxtLink
        :to="`https://market.api3.org/dapis/${chain}/${feedSlug}`"
        class="button outline whisper-voice"
      >
        <span class="external-link"> View on Market </span>
      </NuxtLink>
    </SectionColumn>
  </article>
</template>

<style scoped lang="scss">
.header :deep(inner-column) {
  display: grid;
  grid-template-columns: 100px 1fr 1fr;

  .feed-icon picture {
    --width: 100px;
  }

  .button {
    justify-self: end;
    display: grid;
    text-transform: uppercase;
    place-items: center;
  }
}
</style>
