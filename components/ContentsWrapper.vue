<script setup>
const wrapper = ref(null);

onMounted(() => {
  setTimeout(() => {
    wrapper.value.classList.add("true");
  }, 500);
});

onBeforeUnmount(() => {
  wrapper.value.classList.remove("true");
});
</script>

<template>
  <div class="contents-wrapper" ref="wrapper">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.contents-wrapper.true {
  display: contents;
}
</style>
