<script setup>
const router = useRouter();
const children = ref(
  router.options.routes.filter((route) => {
    return route.name.includes("resources-");
  })
);
</script>

<template>
  <main>
    <PageTitle heading="Resources" />

    <SectionColumn>
      <ul>
        <li v-for="child in children">
          <a :href="child.path" class="text"> {{ child.name }}</a>
        </li>
      </ul>
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss"></style>
