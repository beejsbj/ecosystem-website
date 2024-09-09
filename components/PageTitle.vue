<script setup>
/**
 * PageTitle Component
 *
 * A reusable component for displaying page titles with optional additional content.
 *
 * @component
 *
 * @example
 * <PageTitle heading="Welcome" voice="attention-voice" innerClass="custom-class">
 *   <p>Additional content here</p>
 * </PageTitle>
 *
 * @props
 * @prop {string} heading - The main title text
 * @prop {string} [voice='loud-voice'] - CSS class for styling the heading
 * @prop {string} [innerClass] - Additional CSS class for the inner container
 *
 * @slots
 * default - For additional content below the heading
 *
 * @features
 * - Displays a main heading with customizable text and styling
 * - Allows for additional content via default slot
 * - Responsive design with adjustments for different screen sizes
 * - Customizable inner container class
 */

const props = defineProps(["heading", "voice", "innerClass"]);
</script>

<template>
  <SectionColumn :innerClass="'page-title ' + innerClass">
    <h1 :class="voice ? voice : 'loud-voice'">
      {{ heading }}
    </h1>
    <slot />
  </SectionColumn>
</template>

<style scoped lang="scss">
.page-title {
  display: grid;
  justify-content: start;
  padding: var(--space-2xl) 15px;

  //   opacity: 0;

  @media (min-width: 768px) {
    margin-top: var(--space-l);
  }
  h1 {
    text-wrap: balance;
  }
}

main.ecosystem-detail .page-title {
  padding: var(--space-xl) 0px;
}
</style>
