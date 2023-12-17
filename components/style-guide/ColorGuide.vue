<script setup>
const colors = ref([
  [
    {
      name: "Paper",
      variable: "--paper",
    },
    {
      name: "Ink",
      variable: "--ink",
    },
  ],
  [
    {
      name: "Gray",
      variable: "--gray",
    },
    {
      name: "Gray Light",
      variable: "--gray-light",
    },
    {
      name: "Gray Lighter",
      variable: "--gray-lighter",
    },
    {
      name: "Gray Dark",
      variable: "--gray-dark",
    },
    {
      name: "Gray Darker",
      variable: "--gray-darker",
    },
  ],

  [
    {
      name: "Primary",
      variable: "--green",
    },
  ],
  [
    {
      name: "Primary Light",
      variable: "--green-light",
    },
    {
      name: "Primary Lighter",
      variable: "--green-lighter",
    },
    {
      name: "Primary Lightest",
      variable: "--green-lightest",
    },
  ],
  [
    {
      name: "Primary Dark",
      variable: "--green-dark",
    },
    {
      name: "Primary Darker",
      variable: "--green-darker",
    },
    {
      name: "Primary Darkest",
      variable: "--green-darkest",
    },
  ],
  [
    {
      name: "Secondary",
      variable: "--violet",
    },
  ],
  [
    {
      name: "Secondary Light",
      variable: "--violet-light",
    },
    {
      name: "Secondary Lighter",
      variable: "--violet-lighter",
    },
    {
      name: "Secondary Lightest",
      variable: "--violet-lightest",
    },
  ],
  [
    {
      name: "Secondary Dark",
      variable: "--violet-dark",
    },
    {
      name: "Secondary Darker",
      variable: "--violet-darker",
    },
    {
      name: "Secondary Darkest",
      variable: "--violet-darkest",
    },
  ],
  [
    {
      name: "Tertiary",
      variable: "--blue",
    },
  ],
  [
    {
      name: "Tertiary Light",
      variable: "--blue-light",
    },
    {
      name: "Tertiary Lighter",
      variable: "--blue-lighter",
    },
    {
      name: "Tertiary Lightest",
      variable: "--blue-lightest",
    },
  ],
  [
    {
      name: "Tertiary Dark",
      variable: "--blue-dark",
    },
    {
      name: "Tertiary Darker",
      variable: "--blue-darker",
    },
    {
      name: "Tertiary Darkest",
      variable: "--blue-darkest",
    },
  ],

  [
    {
      name: "Success",
      variable: "--success",
    },
    {
      name: "Warning",
      variable: "--warning",
    },
    {
      name: "Error",
      variable: "--error",
    },
  ],
  [
    {
      name: "Gradient Dark",
      variable: "--gradient-dark",
    },
    {
      name: "Gradient Light",
      variable: "--gradient-light",
    },
    {
      name: "Gradient Color",
      variable: "--gradient-color",
    },
    {
      name: "Gradient Stroke",
      variable: "--gradient-green",
    },
    {
      name: "Gradient Stroke",
      variable: "--gradient-violet",
    },
    {
      name: "Gradient Stroke",
      variable: "--gradient-blue",
    },

    {
      name: "Gradient Radial",
      variable: "--gradient-radial-green",
    },
    {
      name: "Gradient Radial",
      variable: "--gradient-radial-blue",
    },
    {
      name: "Gradient Radial",
      variable: "--gradient-radial-violet",
    },
  ],
  [
    {
      name: "checkers",
      class: "checkers",
    },
    {
      name: "Diagonal",
      class: "diagnol",
    },
    {
      name: "Points",
      class: "points",
    },
    {
      name: "Pattern One",
      class: "pattern-one",
    },
    {
      name: "Pattern Two",
      class: "pattern-two",
    },
    {
      name: "Pattern Three",
      class: "pattern-three",
    },
    {
      name: "Pattern Four",
      class: "pattern-four",
    },
    {
      name: "Pattern Five",
      class: "pattern-five",
    },
    {
      name: "Pattern Six",
      class: "pattern-six",
    },
  ],
]);

const hue = ref(160);

watch(hue, (newVal, oldVal) => {
  document.documentElement.style.setProperty("--hue", `${newVal}`);
  document.documentElement.style.setProperty(
    "--hue-rotate",
    `${newVal - 160}deg`
  );
});
</script>

<template>
  <div class="color-guide">
    <h2 class="attention-voice">Colors</h2>
    <p>
      These are the colors used in the app. They are defined in
      <code>settings.css</code> and are available as CSS variables which are
      used throughout the app.
    </p>

    <ul class="colors" v-for="colorGroup in colors">
      <li v-for="color in colorGroup" :key="color.name">
        <template v-if="!color.class">
          <div class="pallete" :style="`background: var(${color.variable})`" />
          <div class="color-name">
            <code>{{ color.variable }}</code>
          </div>
        </template>
        <template v-else>
          <div class="pallete" :class="color.class" />
          <div class="color-name">
            <code>.{{ color.class }}</code>
          </div>
        </template>
      </li>
    </ul>
  </div>
  <div class="color slider">
    <form-field>
      <FormKit
        type="range"
        v-model="hue"
        min="0"
        max="360"
        step="1"
        :label="`Hue: ${hue}`"
        label-class="$reset notice-voice"
        help="You can change the hue of the colors by using the slider below."
      />
    </form-field>
  </div>
</template>

<style scoped lang="scss">
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
div.pallete {
  width: 100%;
  height: 100px;
  border-radius: var(--corners);
  margin-bottom: var(--space-2xs);
  //   text-align: center;
}
form-field {
  max-width: 50%;
}
</style>
