<script setup>
useServerSeoMeta({
  title: "Login",
});

const route = useRoute();
</script>

<template>
  <main>
    <SectionColumn>
      <h1 class="loud-voice gradient-text-color-light">
        Please Connect your wallet
      </h1>
      <div class="actions">
        <ConnectButton />
      </div>
    </SectionColumn>
  </main>
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
