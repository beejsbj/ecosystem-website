
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
