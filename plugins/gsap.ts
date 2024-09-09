/**
 * GSAP Plugin
 *
 * Integrates GSAP (GreenSock Animation Platform) and its plugins into the Nuxt application,
 * providing advanced animation capabilities.
 *
 * @plugin
 *
 * @features
 * - Registers GSAP core and plugins (ScrollTrigger, ScrollToPlugin, MotionPathPlugin)
 * - Makes GSAP available through Nuxt's plugin system
 * - Ensures plugins are only registered on the client-side
 *
 * @dependencies
 * - gsap
 * - gsap/ScrollTrigger
 * - gsap/ScrollToPlugin
 * - gsap/MotionPathPlugin
 *
 * @note
 * This plugin is automatically loaded by Nuxt. Access GSAP and its plugins
 * using useGsap composable.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default defineNuxtPlugin((nuxtApp) => {
  const plugins = [ScrollTrigger, ScrollToPlugin, MotionPathPlugin];

  if (process.client) {
    gsap.registerPlugin(...plugins);
  }
  return {
    provide: {
      gsap: [gsap, ...plugins],
    },
  };
});
