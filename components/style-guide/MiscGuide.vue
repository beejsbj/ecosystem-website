<script setup>
const settings = ref([
  [
    {
      name: "border",
      variable: ".border",
    },
    {
      name: "border-light",
      variable: ".border-light",
    },
    {
      name: "border-color",
      variable: ".border-color",
    },
    {
      name: "border-highlight",
      variable: ".border-highlight",
    },
    {
      name: "border-gradient",
      variable: ".border-gradient",
    },
    {
      name: "border-gradient-green",
      variable: ".border-gradient-green",
    },
    {
      name: "border-gradient-violet",
      variable: ".border-gradient-violet",
    },
    {
      name: "border-gradient-blue",
      variable: ".border-gradient-blue",
    },
  ],
  [
    {
      name: "shadow",
      variable: ".shadow",
    },
    {
      name: "shadow-lines",
      variable: ".shadow-lines",
    },
    {
      name: "shadow-lines-light",
      variable: ".shadow-lines-light",
    },
  ],
  [
    {
      name: "gradient-text",
      variable: ".gradient-text",
    },
    {
      name: "gradient-text-color",
      variable: ".gradient-text-color",
    },
    {
      name: "gradient-text-color-light",
      variable: ".gradient-text-color-light",
    },
    {
      name: "hover-underline",
      variable: ".hover-underline",
    },
  ],
]);

const corners = ref(16);
const lineWidth = ref(1);
const shadowLineGap = ref(5);

watch(corners, (newVal, oldVal) => {
  document.documentElement.style.setProperty("--corners", `${newVal}px`);
});
watch(lineWidth, (newVal, oldVal) => {
  document.documentElement.style.setProperty("--line-width", `${newVal}px`);
});
watch(shadowLineGap, (newVal, oldVal) => {
  document.documentElement.style.setProperty(
    "--shadow-line-gap",
    `${newVal}px`
  );
});
</script>

<template>
  <div class="misc-guide">
    <h2 class="attention-voice">Borders, Shadows and Miscellaneus</h2>
    <p>
      These are the styles used in the app. They are defined in
      <code>settings.css</code> and are available as CSS variables and classes
      which are used throughout the app.
    </p>
    <ul class="settings" v-for="settingGroup in settings">
      <li v-for="setting in settingGroup" :key="setting.name">
        <div :class="setting.name">
          <code>{{ setting.variable }}</code>
        </div>
      </li>
    </ul>
  </div>
  <div class="slider corners">
    <form-field>
      <FormKit
        type="range"
        v-model="corners"
        min="0"
        max="50"
        step="1"
        :label="`Corners: ${corners}px`"
        label-class="$reset notice-voice"
        help="You can change the radius of the lines by using the slider below."
      />
    </form-field>
  </div>
  <div class="slider line-width">
    <form-field>
      <FormKit
        type="range"
        v-model="lineWidth"
        min="0"
        max="10"
        step="1"
        :label="`Line Width: ${lineWidth}px`"
        label-class="$reset notice-voice"
        help="You can change the line-width of the lines by using the slider below."
      />
    </form-field>
  </div>
  <div class="slider shadow-line-gap">
    <form-field>
      <FormKit
        type="range"
        v-model="shadowLineGap"
        min="0"
        max="20"
        step="1"
        :label="`Shadow Line Gap: ${shadowLineGap}px`"
        label-class="$reset notice-voice"
        help="You can change the gap between the shadow-lines by using the slider below."
      />
    </form-field>
  </div>
</template>

<style scoped lang="scss">
.misc-guide {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  div {
    width: 100%;
    height: 100px;
    border-radius: var(--corners);
    display: grid;
    place-items: center;
    text-align: center;

    animation: borderRadius 0.5s ease-in-out infinite alternate;
  }
}

@keyframes borderRadius {
  0% {
    border-radius: 0;
  }
  100% {
    border-radius: var(--corners);
  }
}

form-field {
  @media (min-width: 768px) {
    max-width: 50%;
  }
}
</style>
