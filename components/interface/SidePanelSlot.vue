<script setup>
const props = defineProps(["showPanel"]);

watch(
  () => props.showPanel,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);

let onBeforeEnter;
let onLeave;

useGsap((gsap) => {
  onBeforeEnter = (el, done) => {
    gsap.fromTo(
      el,
      {
        x: "100%",
      },
      {
        x: "0%",
        ease: "power4.out",
        duration: 0.3,
        onComplete: done,
      }
    );
  };

  onLeave = (el, done) => {
    gsap.fromTo(
      el,
      {
        x: "0%",
      },
      {
        x: "100%",
        duration: 0.3,
        ease: "power4.out",
        onComplete: done,
      }
    );
  };
});
</script>

<template>
  <Teleport to="body">
    <Transition
      name="panel"
      @before-enter="onBeforeEnter"
      @leave="onLeave"
      :css="false"
    >
      <div v-if="showPanel" class="panel-mask">
        <div class="panel-content" @click="$emit('toggle')">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}

.panel-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  background: var(--gradient-dark);
  transition: all 0.3s ease;

  display: grid;
  grid-template-rows: auto;
}

.panel-content {
  display: grid;
  align-items: end;
  padding: calc(var(--space-s) * 8) var(--space-l);
}
</style>
