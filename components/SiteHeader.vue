<script setup>
import { useInterfaceStore } from "~/stores/interface";
import { gsap } from "gsap";

const ui = useInterfaceStore();
const router = useRouter();

const showMenu = ref(false);
const showPlaceholder = ref(true);

onMounted(() => {
  //   change show placeholder to false when client side rendering
  //   showPlaceholder.value = false;
  //   const pageLoad = gsap.timeline();
  //   if (ui.firstLoad) {
  //     pageLoad.from(".site-header", {
  //       delay: "0.5",
  //       duration: 0.5,
  //       y: -50,
  //       opacity: 0,
  //       ease: "power4.out",
  //     });
  //     ui.firstLoad = false;
  //   }
});
nextTick(() => {
  showPlaceholder.value = false;
});
</script>

<template>
  <header class="site-header">
    <SectionColumn class="mast-head">
      <Transition mode="out-in" name="fade">
        <div class="mast-head-placeholder" v-if="showPlaceholder" />

        <mast-head v-else>
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
            <picture>
              <MenuIcon />
            </picture>
          </button>
          <SidePanelSlot
            v-if="ui.isMobile"
            :showPanel="showMenu"
            @toggle="showMenu = !showMenu"
          >
            <SiteNav class="panel-menu" />
          </SidePanelSlot>
        </mast-head>
      </Transition>
    </SectionColumn>
  </header>
</template>

<style>
.site-header inner-column {
  padding: var(--space-m) var(--space-s);
}

@media (min-width: 768px) {
  .site-header inner-column {
    padding: var(--space-xl) var(--space-s);
  }
}
</style>

<style lang="scss" scoped>
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
  max-width: 50px;
  justify-self: end;

  &.menuOpen {
    z-index: 9999;
  }
  &.icon {
    scale: 0.8;
  }
}
</style>
