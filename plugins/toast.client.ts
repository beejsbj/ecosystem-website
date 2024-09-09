/**
 * Toast Notification Plugin
 * 
 * Integrates Vue3Toastify into the Nuxt application, providing a simple
 * and customizable toast notification system.
 *
 * @plugin

 * @features
 * - Adds toast notifications to the application
 * - Configures default position (bottom right) and auto-close duration (2 seconds)
 * - Provides a global $toast object for easy access
 *
 * @dependencies
 * - vue3-toastify
 *
 * @configuration
 * - Position: BOTTOM_RIGHT
 * - Auto-close: 2000ms
 *
 * @note
 * This is a client-side only plugin. Toast notifications will not be
 * rendered during server-side rendering.
 */

import Vue3Toastify, { toast } from "vue3-toastify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
  });

  return {
    provide: {
      toast,
    },
  };
});
