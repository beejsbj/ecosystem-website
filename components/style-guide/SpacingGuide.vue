<script setup>
//   /* Space 3xs: 4px → 5px */
//   --space-3xs: clamp(0.25rem, calc(0.23rem + 0.08vw), 0.31rem);

//   /* Space 2xs: 8px → 9px */
//   --space-2xs: clamp(0.5rem, calc(0.48rem + 0.08vw), 0.56rem);

//   /* Space xs: 12px → 14px */
//   --space-xs: clamp(0.75rem, calc(0.72rem + 0.16vw), 0.88rem);

//   /* Space s: 16px → 18px */
//   --space-s: clamp(1rem, calc(0.97rem + 0.16vw), 1.13rem);

//   /* Space m: 24px → 27px */
//   --space-m: clamp(1.5rem, calc(1.45rem + 0.23vw), 1.69rem);

//   /* Space l: 32px → 36px */
//   --space-l: clamp(2rem, calc(1.94rem + 0.31vw), 2.25rem);

//   /* Space xl: 48px → 54px */
//   --space-xl: clamp(3rem, calc(2.91rem + 0.47vw), 3.38rem);

//   /* Space 2xl: 64px → 72px */
//   --space-2xl: clamp(4rem, calc(3.88rem + 0.63vw), 4.5rem);

//   /* Space 3xl: 96px → 108px */
//   --space-3xl: clamp(6rem, calc(5.81rem + 0.94vw), 6.75rem);

const spaces = ref([
  {
    name: "XXXS",
    variable: "--space-3xs",
  },
  {
    name: "XXS",
    variable: "--space-2xs",
  },
  {
    name: "XS",
    variable: "--space-xs",
  },
  {
    name: "S",
    variable: "--space-s",
  },
  {
    name: "M",
    variable: "--space-m",
  },
  {
    name: "L",
    variable: "--space-l",
  },
  {
    name: "XL",
    variable: "--space-xl",
  },
  {
    name: "XXL",
    variable: "--space-2xl",
  },
  {
    name: "XXXL",
    variable: "--space-3xl",
  },
]);

function getPixel(name) {
  const div = document.querySelector(`div.${name}`);
  const style = window.getComputedStyle(div);
  const width = style.getPropertyValue("width");
  return width;
}
</script>

<template>
  <div class="space-guide">
    <h2 class="attention-voice">Spacing</h2>
    <p>
      These are the spacing values used in the app. They are defined in
      <code>settings.css</code> and are available as CSS variables which are
      used throughout the app for
      <span class="highlight">Margins, Paddings and Gaps</span>
    </p>
    <ul class="spaces">
      <li v-for="space in spaces" :key="space.name">
        <p>
          <code>
            {{ space.name }}
          </code>
          <code>
            <!-- {{ getPixel(space.name) }}
				 -->
          </code>
        </p>
        <div
          class="space-pallete"
          :class="space.name"
          :style="`width: var(${space.variable})`"
        ></div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

div.space-pallete {
  aspect-ratio: 1/1;
  background: var(--green);
}
</style>
