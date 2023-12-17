<script setup>
const buttons = ref([
  {
    name: "Primary",
    class: "button",
  },
  {
    name: "Text",
    class: "text",
  },
  {
    name: "Text Green",
    class: "text green",
  },
  {
    name: "Text Blue",
    class: "text blue",
  },
  {
    name: "Text Violet",
    class: "text violet",
  },
  {
    name: "Icon",
    class: "icon button",
  },
  {
    name: "outline",
    class: "button outline",
  },

  {
    name: "Loud",
    class: "button",
  },
  {
    name: "Loading",
    class: "button",
    isLoading: true,
  },

  {
    name: "Loading",
    class: "button outline",
    isLoading: true,
  },

  {
    name: "Disabled",
    class: "button",
    disabled: true,
  },
  {
    name: "Disabled",
    class: "text",
    disabled: true,
  },
  {
    name: "Disabled",
    class: "icon button",
    disabled: true,
  },
  {
    name: "Disabled",
    class: "button outline",
    disabled: true,
  },

  {
    name: "Disabled",
    class: "button",
    disabled: true,
  },
]);
</script>

<template>
  <div class="buttons">
    <h2 class="attention-voice">Buttons and Anchors</h2>
    <p>These classes help style the buttons and anchors across the site.</p>
    <ul>
      <li v-for="button in buttons">
        <button
          :class="button.class"
          :disabled="button.disabled"
          v-tooltip="button.class"
          v-if="!button.isLoading"
        >
          Button
        </button>
        <div data-loading v-else>
          <div data-type="submit">
            <button
              :class="button.class"
              :disabled="button.disabled"
              v-tooltip="button.class"
            >
              Button
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  align-items: center;
  justify-items: center;

  --gap: var(--space-xl);

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
