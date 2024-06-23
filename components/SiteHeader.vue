<script setup>
//
const ui = useInterfaceStore();
const router = useRouter();

const showMenu = ref(false);

useGsap((gsap) => {
  const pageLoad = gsap.timeline();
  if (ui.firstLoad) {
    pageLoad.from(".site-header", {
      delay: "0.5",
      duration: 0.5,
      y: -50,
      opacity: 0,
      ease: "power4.out",
    });
    ui.firstLoad = false;
  }
});
</script>

<template>
  <header class="site-header">
    <SectionColumn class="mast-head">
      <mast-head>
        <NuxtLink to="/" class="site-logo">
          <picture class="site-logo" :class="{ menuOpen: showMenu }">
            <NuxtImg
              loading="lazy"
              src="/images/logo-full.svg"
              alt="Full API3 Logo"
            />
          </picture>
        </NuxtLink>
        <SiteNav v-if="!ui.isMobile" />

        <!-- menu icon -->
        <button
          :class="` menu icon ${showMenu ? 'menuOpen' : ''}`"
          v-if="ui.isMobile"
          @click="showMenu = !showMenu"
        >
          <DynamicIcon icon="hamburger" width="32px" />
        </button>
        <SidePanelSlot
          v-if="ui.isMobile"
          :showPanel="showMenu"
          @toggle="showMenu = !showMenu"
        >
          <SiteNav class="panel-menu" />
        </SidePanelSlot>
      </mast-head>
    </SectionColumn>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  :deep(inner-column) {
    padding: var(--space-s) var(--space-l);

    @media (min-width: 768px) {
      padding: var(--space-xl) var(--space-s);
    }
  }
}

.mast-head-placeholder {
  height: 50px;
}

mast-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;

  .site-logo {
    width: 200px;
    cursor: pointer;

    @media (min-width: 768px) {
      width: 275px;
    }
  }
}

button.menu {
  max-width: 40px;
  justify-self: end;
  padding: 0;

  &.menuOpen {
    z-index: 9999;
  }
  &.icon {
    scale: 0.8;
  }
}
</style>
