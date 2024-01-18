// formkit.config.js
import { defaultConfig, defineFormKitConfig } from "@formkit/vue";
import {
  createMultiStepPlugin,
  createFloatingLabelsPlugin,
  createAutoHeightTextareaPlugin,
  createAutoAnimatePlugin,
} from "@formkit/addons";

//icons
import { applicationIcons, cryptoIcons } from "@formkit/icons";

//pro
import { createProPlugin, inputs } from "@formkit/pro";

//css
import "@formkit/addons/css/multistep";
import "@formkit/themes/genesis";

//////////////////////////////

//icons
const icons = {
  ...applicationIcons,
  ...cryptoIcons,
};

//auto animate
const autoAnimate = {
  config: {
    /* optional AutoAnimate config */
    // default:
    duration: 250,
    easing: "ease-in-out",
    delay: 0,
  },
  targets: {
    /* optional animation targets object */
    // default:
    global: ["outer", "inner"],
    form: ["form"],
    repeater: ["items"],
  },
};

//plugins
const plugins = [
  createMultiStepPlugin(),
  createFloatingLabelsPlugin(),
  createAutoHeightTextareaPlugin(),
  createAutoAnimatePlugin(autoAnimate.config, autoAnimate.targets),
  //  proPlugin,
];

//config
export default defineFormKitConfig(() => {
  const config = useRuntimeConfig();
  // pro
  // const proPlugin = createProPlugin("config.FORMKIT_PRO_KEY", inputs);

  return {
    plugins,
    icons,
  };
});

// plugins
