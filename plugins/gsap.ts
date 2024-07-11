import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default defineNuxtPlugin((nuxtApp) => {
  const plugins = [
    ScrollTrigger,
    ScrollToPlugin,
    // Flip,
    MotionPathPlugin,
  ];

  if (process.client) {
    gsap.registerPlugin(...plugins);
  }
  return {
    provide: {
      gsap: [gsap, ...plugins],
    },
  };
});
