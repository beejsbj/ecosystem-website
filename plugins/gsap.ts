import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(Flip);
  }
  return { provide: { gsap: { gsap, ScrollTrigger, ScrollToPlugin, Flip } } };
});
