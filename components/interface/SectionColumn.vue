<script setup>
/**
 * SectionColumn Component
 *
 * A layout wrapper that creates a section with an inner column.
 *
 * @prop {string} innerClass - Custom class for the inner-column
 *
 * @example
 * <SectionColumn innerClass="custom-class">
 *   <YourContent />
 * </SectionColumn>
 */

const props = defineProps(["innerClass"]);
</script>

<template>
  <section>
    <inner-column :class="innerClass">
      <slot />
    </inner-column>
  </section>
</template>
