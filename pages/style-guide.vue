<script setup>
//
useSeoMeta({
  title: "Style Guide",
  description:
    "This is the API3 style guide. It contains all the components and styles used in the API3 website.",
  ogDescription:
    "This is the API3 style guide. It contains all the components and styles used in the API3 website.",
});
</script>

<template>
  <main>
    <PageTitle heading="Style Guide" voice="booming-voice" />
    <SectionColumn>
      <p>
        This is the API3 Ecosystem style guide. Its a dynamic page showcasing
        all the components and styles used in the website.
      </p>
      <p>
        <em> Generally, </em>
      </p>
      <p>
        <code>.style-name</code> is a classname and can be applied by adding it
        to any element.
      </p>
      <p>
        <code>--variable-name</code> is a CSS variable and can be used in any
        relevant CSS property. For example,
        <code>background: var(--green)</code>.
      </p>
      <nav class="style-guide">
        <a href="#color-guide" class="text"> Colors </a>
        <a href="#misc-guide" class="text"> Borders, Shadows and Miscs </a>
        <a href="#button-guide" class="text"> Buttons </a>
        <a href="#form-guide" class="text"> Forms </a>
        <a href="#text-guide" class="text"> Text </a>
        <a href="#decoration-guide" class="text"> Decorations </a>
      </nav>
    </SectionColumn>
    <SectionColumn id="color-guide">
      <ColorGuide />
    </SectionColumn>

    <SectionColumn id="space-guide">
      <SpacingGuide />
    </SectionColumn>

    <SectionColumn id="misc-guide">
      <!-- <MiscGuide /> -->
    </SectionColumn>

    <SectionColumn id="button-guide">
      <ButtonGuide />
    </SectionColumn>

    <SectionColumn id="form-guide">
      <FormGuide />
    </SectionColumn>

    <SectionColumn id="component-guide">
      <!-- <ComponentGuide /> -->
    </SectionColumn>

    <SectionColumn id="decoration-guide">
      <!-- <DecorationGuide /> -->
    </SectionColumn>

    <SectionColumn id="text-guide">
      <TextVoices />
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss">
:deep(inner-column > div) {
  display: grid;
  gap: var(--space-xl);

  --gap: var(--space-s);

  & > ul {
    gap: var(--gap);
    @media (min-width: 768px) {
      --gap: var(--space-xl);
    }
  }
}

// :deep(code) {
//   font-size: var(--step--1);
//   @media (min-width: 768px) {
//     font-size: var(--step-0);
//   }
// }

:deep(.slider) {
  margin-top: var(--space-l);
}
</style>
<style>
.style-guide main {
  display: grid;
  /* gap: 8rem; */
}
</style>
