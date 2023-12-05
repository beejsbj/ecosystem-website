import { defineStore } from "pinia";
import { gsap } from "gsap";

export const useInterfaceStore = defineStore("interface", function () {
  const firstLoad = ref(true);

  //
  //viewport size /////////////////////////////
  const isMobile = computed(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  const isTablet = computed(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024 && window.innerWidth >= 768;
  });

  const isDesktop = computed(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 1024;
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

    transitionState,
    toggleTransitionComplete,
    //  pageTransitionConfig,
  };
});
