import { defineStore } from "pinia";

import { onMounted, onUnmounted } from "vue";

export const useInterfaceStore = defineStore("interface", function () {
  const config = useRuntimeConfig();

  const isDev = config.public.nodeEnv === "development";

  const firstLoad = ref(true);

  // api3 colors /////////////////////////////
  const api3Colors = {
    red: "hsla(4, 68%, 15%, 1.00)",
    blue: "hsla(230, 53%, 32%, 1.00)",
    green: "hsla(162, 30%, 22%, 1.00)",
    yellow: "hsla(44, 85%, 65%, 1)",
    violet: "hsla(251, 58%, 21%, 1.00)",
  };

  //
  //viewport size /////////////////////////////
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  function updateViewportSize() {
    if (typeof window === "undefined") return;

    isMobile.value = window.innerWidth < 768;
    isTablet.value = window.innerWidth < 1024 && window.innerWidth >= 768;
    isDesktop.value = window.innerWidth >= 1024;
  }

  //
  //main menu /////////////////////////////
  const mainMenuOpen = ref(false);
  function toggleMenu() {
    mainMenuOpen.value = !mainMenuOpen.value;
  }

  //
  //modal /////////////////////////////
  const showModal = ref(false);
  function toggleModal() {
    showModal.value = !showModal.value;
  }

  //
  //hero image /////////////////////////////
  const heroImage = ref(null);

  // loadingDone	/////////////////////////////
  const loadingDone = ref(false);

  setTimeout(() => {
    loadingDone.value = true;
  }, 2500);

  //
  //page transition	/////////////////////////////
  const transitionState = reactive({
    transitionComplete: false,
  });

  //   const pageTransitionConfig = {
  //     name: "page-transiton",
  //     mode: "out-in",
  //     onEnter: (el, done) => {
  //       console.log("onEnter");
  //       gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
  //       gsap
  //         .timeline({
  //           paused: true,
  //           onComplete() {
  //             toggleTransitionComplete(true);
  //             done();
  //           },
  //         })
  //         .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
  //         .to(el, { scale: 1, duration: 0.25 })
  //         .play();
  //     },
  //     onLeave: (el, done) => {
  //       toggleTransitionComplete(false);
  //       gsap
  //         .timeline({ paused: true, onComplete: done })
  //         .to(el, { scale: 0.8, duration: 0.2 })
  //         .to(el, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
  //         .play();
  //     },
  //   };

  function toggleTransitionComplete(value) {
    transitionState.transitionComplete = value;
  }

  //notify /////////////////////////////
  function notify(message) {
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }

  //disable dev tools /////////////////////////////
  function disableDevTools() {
    if (typeof window === "undefined") return;

    if (!isDev) {
      const devTools = document.querySelector("body > div[data-v-app]");
      if (devTools) {
        devTools.style.display = "none";
      }
    }
  }

  //init /////////////////////////////
  onMounted(() => {
    updateViewportSize();
    //  disableDevTools();
    window.addEventListener("resize", updateViewportSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateViewportSize);
  });

  //return /////////////////////////////
  return {
    isDev,
    mainMenuOpen,
    toggleMenu,
    notify,
    isMobile,
    isTablet,
    isDesktop,

    firstLoad,
    heroImage,
    showModal,
    toggleModal,
    api3Colors,
    loadingDone,

    transitionState,
    toggleTransitionComplete,
    //  pageTransitionConfig,
  };
});
