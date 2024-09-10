<script setup>
const components = ref([
  {
    name: "dApp Card",
    component: "DappCard",
  },
  {
    name: "Article Card",
    component: "ArticleCard",
    class: "card",
  },
  {
    name: "Article Card",
    component: "ArticleCard",
    class: "big-card",
  },
  {
    name: "Article Card",
    component: "ArticleCard",
    class: "slide",
  },
  {
    name: "Article Card",
    component: "ArticleCard",
    class: "text",
  },
]);
</script>

<template>
  <div class="component-guide">
    <h2 class="attention-voice">Components</h2>

    <ul>
      <li v-for="component in components" :key="component.name">
        <div>
          <DappCard v-if="component.component == 'DappCard'" />
          <ArticleCard
            v-if="component.component == 'ArticleCard'"
            :class="component.class"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  align-items: end;
}
</style>
