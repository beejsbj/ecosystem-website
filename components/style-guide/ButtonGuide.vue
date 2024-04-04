<script setup>
const buttons = ref([
  {
    name: "Primary Button",
    class: "button",
  },
  {
    name: "P Loading",
    class: "button",
    isLoading: true,
  },
  {
    name: "P Disabled",
    class: "button",
    disabled: true,
  },

  {
    name: "Secondary Button",
    class: "button outline",
  },

  {
    name: "S Loading",
    class: "button outline",
    isLoading: true,
  },

  {
    name: "S Disabled",
    class: "button outline",
    disabled: true,
  },

  {
    name: "Icon Button",
    class: "icon button",
  },
  {
    name: "Icon Secondary",
    class: "icon button outline",
  },

  {
    name: "I Disabled",
    class: "icon button",
    disabled: true,
  },
  {
    name: "I Disabled",
    class: "icon button outline",
    disabled: true,
  },

  {
    name: "Text Button",
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
    name: "Text Disabled",
    class: "text",
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
          v-if="!button.isLoading"
        >
          <template v-if="button.class.includes('icon')">
            <DynamicIcon icon="qrng" />
          </template>
          <template v-else>
            {{ button.name }}
          </template>
        </button>
        <div data-loading v-else>
          <button :class="button.class" :disabled="button.disabled">
            {{ button.name }}
          </button>

          <FormKit type="submit" label="heelo">
            {{ button.name }}
          </FormKit>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;

  --gap: var(--space-l);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

li:has(.button) {
  grid-row: 1;
}

li:has(.outline) {
  grid-row: 2;
}

li:has(.icon) {
  grid-row: 3;
}

li:has(.text) {
  grid-row: 4;
}
</style>
