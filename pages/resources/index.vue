<script setup>
const router = useRouter();
const children = ref(
  router.options.routes.filter((route) => {
    return route.name.includes("resources-");
  })
);
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="Resources" />

    <SectionColumn>
      <ul>
        <li v-for="child in children">
          <a :href="child.path" class="text"> {{ child.name }}</a>
        </li>
      </ul>
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped lang="scss"></style>
