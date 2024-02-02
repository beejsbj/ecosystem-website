// formkit.config.js
import { defaultConfig, defineFormKitConfig } from "@formkit/vue";
import {
  createMultiStepPlugin,
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
  createAutoHeightTextareaPlugin(),
  createAutoAnimatePlugin(autoAnimate.config, autoAnimate.targets),
  //   addAsteriskPlugin(),
];

//config
export default defineFormKitConfig(() => {
  const config = useRuntimeConfig();

  // pro
  if (config.public.nodeEnv === "development") {
    const proPlugin = createProPlugin(config.public.FORMKIT_PRO_KEY, inputs);
    plugins.push(proPlugin);
  }

  return {
    plugins,
    icons,
  };
});

// plugins
function addAsteriskPlugin(node) {
  if (
    ["button", "submit", "hidden", "group", "list", "meta"].includes(
      node.props.type
    )
  )
    return;

  node.on("created", () => {
    const legendOrLabel = legends.includes(
      `${node.props.type}${node.props.options ? "_multi" : ""}`
    )
      ? "legend"
      : "label";

    if (node.props.definition.schemaMemoKey) {
      node.props.definition.schemaMemoKey += `${
        node.props.options ? "_multi" : ""
      }_add_asterisk`;
    }

    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema = {}) => {
      sectionsSchema[legendOrLabel] = {
        children: [
          "$label",
          {
            $el: "span",
            if: "$state.required",
            attrs: {
              class: "$classes.asterisk",
            },
            children: ["*"],
          },
        ],
      };

      return schemaFn(sectionsSchema);
    };
  });
}
