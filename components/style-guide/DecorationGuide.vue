<script setup>
const decorations = ref([
  {
    name: "Line Decoration",
    component: "LineDecoration",
  },
  {
    name: "Curves Decoration",
    component: "CurvesDecoration",
  },
  {
    name: "Circle Decoration",
    component: "CircleDecoration",
  },
]);

const icons = ref([]);

const socialIcons = ref([
  "twitter",
  "discord",
  "telegram",
  "github",
  "reddit",
  "blog",
  "facebook",
  "youtube",
  "linkedin",
]);
const chainIcons = ref([
  "ethereum",
  "polygon",
  "bsc",
  "avalanche",
  "solana",
  "gnosis-chain",
  "moonriver",
  "moonbeam",
  "boba",
]);
const index = ref(0);

index.value = Math.floor(
  Math.random() * Math.min(socialIcons.value.length, chainIcons.value.length)
);

function loadIcon(component) {
  return defineAsyncComponent(() => {
    return import(`@/components/icons/${component}.vue`);
    // change the import to search everything within /components and its subfolders to finding matching name
  });
}

function loadDecoration(component) {
  return defineAsyncComponent(() =>
    import(`@/components/decoration/${component}.vue`)
  );
}

function indexTimer() {
  setInterval(() => {
    if (index.value < socialIcons.value.length - 1) {
      index.value++;
    } else {
      index.value = 0;
    }
  }, 1000);
}
</script>

<template>
  <div class="decoration-guide" @click.once="animateBackground()">
    <h2 class="attention-voice">Decorations and Icons</h2>

    <ul>
      <li v-for="decoration in decorations" :key="decoration.name">
        <div>
          <component
            :is="loadDecoration(decoration.component)"
            v-tooltip="decoration.name"
          />
        </div>
      </li>
    </ul>

    <ul>
      <li v-for="icon in icons" :key="icon.name">
        <component
          :is="loadIcon(icon.component)"
          :social="socialIcons[index]"
          :chain="chainIcons[index]"
          :key="icon.name"
          stroke="var(--green)"
          fill="none"
          v-tooltip="icon.name"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  align-items: end;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
