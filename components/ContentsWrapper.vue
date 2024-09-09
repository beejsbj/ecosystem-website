<script setup>
/**
 * ContentsWrapper Component
 *
 * A utility component that wraps its children in a single container
 * without affecting the layout.
 *
 * @component
 *
 * @example
 * <ContentsWrapper>
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </ContentsWrapper>
 *
 * @features
 * - Wraps multiple child components in a single container
 * - Uses 'display: contents' to avoid affecting layout
 * - Applies wrapper class after a short delay on mount
 * - Removes wrapper class before component unmount
 *
 * @slots
 * default - Accepts any number of child components or elements
 *
 * @note
 * This component is useful for template structures that require
 * a single root element while maintaining the original layout.
 */

const wrapper = ref(null);

onMounted(() => {
  setTimeout(() => {
    wrapper.value.classList.add("true");
  }, 100);
});

onBeforeUnmount(() => {
  wrapper.value.classList.remove("true");
});
</script>

<template>
  <div class="contents-wrapper true" ref="wrapper">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.contents-wrapper.true {
  display: contents;
}
</style>
