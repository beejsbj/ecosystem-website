<script setup>
useServerSeoMeta({
  title: "Login",
});

const route = useRoute();
</script>

<template>
  <ContentsWrapper>
    <SectionColumn>
      <h1 class="loud-voice gradient-text-color-light">
        Please Connect your wallet
      </h1>
      <div class="actions">
        <ConnectButton />
      </div>
    </SectionColumn>
  </ContentsWrapper>
</template>

<style lang="scss" scoped>
:deep(inner-column) {
  display: grid;
  gap: var(--space-s);
  height: 100vh;
  align-content: center;

  @media (min-width: 768px) {
    place-items: center;
  }
}
</style>
