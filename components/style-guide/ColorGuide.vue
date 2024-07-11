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
      name: "Gray Lightest",
      variable: "--gray-lightest",
    },
    {
      name: "Gray Lighter",
      variable: "--gray-lighter",
    },
    {
      name: "Gray Light",
      variable: "--gray-light",
    },

    {
      name: "Gray",
      variable: "--gray",
      isBase: true,
    },
    {
      name: "Gray Dark",
      variable: "--gray-dark",
    },
    {
      name: "Gray Darker",
      variable: "--gray-darker",
    },
    {
      name: "Gray Darkest",
      variable: "--gray-darkest",
    },
  ],

  [
    {
      name: "Primary Lightest",
      variable: "--green-lightest",
    },
    {
      name: "Primary Lighter",
      variable: "--green-lighter",
    },

    {
      name: "Primary Light",
      variable: "--green-light",
    },
    {
      name: "Primary",
      variable: "--green",
      isBase: true,
    },
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
      name: "Secondary Lightest",
      variable: "--purple-lightest",
    },
    {
      name: "Secondary Lighter",
      variable: "--purple-lighter",
    },
    {
      name: "Secondary Light",
      variable: "--purple-light",
    },
    {
      name: "Secondary",
      variable: "--purple",
      isBase: true,
    },

    {
      name: "Secondary Dark",
      variable: "--purple-dark",
    },
    {
      name: "Secondary Darker",
      variable: "--purple-darker",
    },
    {
      name: "Secondary Darkest",
      variable: "--purple-darkest",
    },
  ],
  [
    {
      name: "Tertiary Lightest",
      variable: "--indigo-lightest",
    },
    {
      name: "Tertiary Lighter",
      variable: "--indigo-lighter",
    },
    {
      name: "Tertiary Light",
      variable: "--indigo-light",
    },
    {
      name: "Tertiary",
      variable: "--indigo",
      isBase: true,
    },

    {
      name: "Tertiary Dark",
      variable: "--indigo-dark",
    },
    {
      name: "Tertiary Darker",
      variable: "--indigo-darker",
    },
    {
      name: "Tertiary Darkest",
      variable: "--indigo-darkest",
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
    {
      name: "Pattern Seven",
      class: "pattern-seven",
    },
  ],
]);
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
          <div
            class="pallete"
            :style="`background: var(${color.variable})`"
            :class="{ 'base-color': color.isBase }"
          />
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
</template>

<style scoped lang="scss">
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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

.color-name code {
  font-size: var(--step--1);
}

.base-color {
  border: 5px solid var(--ink);
}
</style>
