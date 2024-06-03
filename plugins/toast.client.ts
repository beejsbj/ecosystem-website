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
