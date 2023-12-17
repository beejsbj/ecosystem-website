<script setup>
const ui = useInterfaceStore();

watch(
  () => ui.showModal,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="ui.showModal" class="modal-mask" @click.self="ui.toggleModal">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  transition: all 0.3s ease;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
  overflow-y: auto;

  display: grid;
  place-items: center;
}
.modal-mask > * {
  position: sticky;
  top: 1rem;

  width: clamp(300px, 90vw, 500px);
  margin: auto;

  background-color: var(--paper);
}

.modal-content {
  border-radius: var(--corners);
}
</style>
