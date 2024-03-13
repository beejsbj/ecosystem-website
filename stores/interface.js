import { defineStore } from "pinia";
import { gsap } from "gsap";
import { onMounted, onUnmounted } from "vue";

export const useInterfaceStore = defineStore("interface", function () {
  const firstLoad = ref(true);

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

  onMounted(() => {
    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateViewportSize);
  });

  //
  //main menu /////////////////////////////
  const mainMenuOpen = ref(false);
  function toggleMenu() {
    mainMenuOpen.value = !mainMenuOpen.value;
  }

  //
  //modal
  const showModal = ref(false);
  function toggleModal() {
    showModal.value = !showModal.value;
  }

  //
  //hero image
  const heroImage = ref(null);

  //
  //page transition
  const transitionState = reactive({
    transitionComplete: false,
  });
  const toggleTransitionComplete = (value) => {
    transitionState.transitionComplete = value;
  };

  const api3Colors = {
    green: "hsla(166, 64%, 69%, 1)",
    violet: "hsla(256, 34%, 54%, 1)",
    blue: "hsla(226, 100%, 50%, 1)",
    red: "hsla(0, 85%, 65%, 1)",
    yellow: "hsla(44, 85%, 65%, 1)",
  };

  const pageTransitionConfig = {
    name: "page-transiton",
    mode: "out-in",
    onEnter: (el, done) => {
      console.log("onEnter");
      gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
      gsap
        .timeline({
          paused: true,
          onComplete() {
            toggleTransitionComplete(true);
            done();
          },
        })
        .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
        .to(el, { scale: 1, duration: 0.25 })
        .play();
    },
    onLeave: (el, done) => {
      toggleTransitionComplete(false);
      gsap
        .timeline({ paused: true, onComplete: done })
        .to(el, { scale: 0.8, duration: 0.2 })
        .to(el, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
        .play();
    },
  };

  function notify(message) {
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }

  return {
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

    transitionState,
    toggleTransitionComplete,
    //  pageTransitionConfig,
  };
});
