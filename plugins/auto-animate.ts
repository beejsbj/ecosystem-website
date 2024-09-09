/**
 * Auto-Animate Plugin
 *
 * Integrates the @formkit/auto-animate library into the Nuxt application,
 * enabling automatic animations for adding/removing elements.
 *
 * @plugin
 *
 * @example
 * // Usage in a component:
 * <div v-auto-animate>
 *   <item v-for="item in items" :key="item.id" />
 * </div>
 *
 * @features
 * - Adds the v-auto-animate directive to the Vue application
 * - Enables smooth enter/leave animations for dynamic content
 *
 * @dependencies
 * - @formkit/auto-animate/vue
 *
 * @note
 * This plugin is automatically loaded by Nuxt. No manual import is needed in components.
 */

import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(autoAnimatePlugin);
});
