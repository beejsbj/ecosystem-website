/**
 * notify
 * 
 * A utility for displaying toast notifications in a Nuxt application.
 *
 * @function
 * 
 * @param {string} message - The message to display in the notification
 * @param {Object} [options] - Optional configuration for the toast notification
 *
 * @example
 * // Basic usage
 * notify("Hello, world!");
 * 
 * 
 * // Using specific notification types
 * notify.success("Operation successful");
 * notify.info("Did you know?");
 * notify.warn("Be careful!");
 * notify.error("An error occurred");
 *
 * @description
 * This utility provides a wrapper around Nuxt's toast functionality, offering
 * both a general notification method and specific methods for success, info,
 * warning, and error notifications.
 * 
 * @methods
 * - notify.success(message): Displays a success notification
 * - notify.info(message): Displays an info notification
 * - notify.warn(message): Displays a warning notification
 * - notify.error(message): Displays an error notification

 */

function notify(message, options) {
  const { $toast } = useNuxtApp();

  $toast(message, options);
}

notify.success = function (message) {
  const { $toast } = useNuxtApp();
  $toast.success(message);
};

notify.info = function (message) {
  const { $toast } = useNuxtApp();
  $toast.info(message);
};

notify.warn = function (message) {
  const { $toast } = useNuxtApp();
  $toast.warn(message);
};

notify.error = function (message) {
  const { $toast } = useNuxtApp();
  $toast.error(message);
};

export default notify;
