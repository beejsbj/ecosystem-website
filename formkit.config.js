import { createTooltip, destroyTooltip } from "floating-vue";

// formkit.config.js
import { defaultConfig, defineFormKitConfig } from "@formkit/vue";
import {
  createMultiStepPlugin,
  createAutoHeightTextareaPlugin,
  createAutoAnimatePlugin,
} from "@formkit/addons";

//icons
import {
  applicationIcons,
  cryptoIcons,
  inputIcons,
  fileIcons,
  brandIcons,
} from "@formkit/icons";

//pro
import { createProPlugin, inputs } from "@formkit/pro";

//
import { generateClasses } from "@formkit/themes";

//////////////////////////////

//icons
const icons = {
  ...applicationIcons,
  ...cryptoIcons,
  ...inputIcons,
  ...fileIcons,
  ...brandIcons,
  ...registerCustomIcons(),
};

//classes

const classes = generateClasses({
  text: {
    // applies to all input types
    outer: "",
    label: "calm-voice",
  },
});

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
  createAutoHeightTextareaPlugin,
  createAutoAnimatePlugin(autoAnimate.config, autoAnimate.targets),
  addAsteriskPlugin,
  addPrefixIconPlugin,
  hideSuffixIfNoHelpPlugin,
  //  proPlugin,
];

//config
export default defineFormKitConfig(() => {
  const config = useRuntimeConfig();

  //hide help by default #todo
  // pro

  const proPlugin = createProPlugin(config.public.formkitProKey, inputs);
  plugins.push(proPlugin);

  return {
    plugins,
    icons,

    classes,

    props: {
      selectIcon: "down",
      suffixIcon: "info",

      onSuffixIconClick: handleSuffixClick,
    },
  };
});

// functions

function handleSuffixClick(node, event) {
  if (!node.props.help) return;
  const el = event.target;

  const tooltip = createTooltip(el, {
    triggers: [],
    content: node.props.help,
  });

  tooltip.show();

  setTimeout(() => {
    tooltip.hide();
    // Transition
    setTimeout(() => {
      destroyTooltip(el);
    }, 400);
  }, 3000);
}

// plugins ////////////////
//
function hideSuffixIfNoHelpPlugin(node) {
  if (!node.props.help) {
    node.props.suffixIcon = null;
  }
}

function addPrefixIconPlugin(node) {
  node.on("created", () => {
    //  console.log(icons);

    const typesToApply = ["email", "password", "text", "url", "search"];

    if (node.props.prefixIcon) return; // return if already set

    if (!typesToApply.includes(node.props.type)) return; // return if type is not in the list

    if (!node.props.definition) return;

    const originalSchema = node.props.definition.schema;
    //   const originalSchema = clone(node.props.definition.schema);

    node.props.definition.schema = (extensions) => {
      const localExtensions = {
        ...extensions,
        prefix: {
          $el: "label",
          attrs: {
            class: "formkit-prefix-icon formkit-icon",
            innerHTML: icons[node.props.type],
          },
        },
      };
      return originalSchema(localExtensions);
    };
  });
}

//
function addAsteriskPlugin(node) {
  const legends = ["checkbox_multi", "radio_multi", "repeater", "transferlist"];
  if (
    [
      "button",
      "submit",
      "hidden",
      "group",
      "list",
      "meta",
      "form",
      "multi-step",
      "step",
    ].includes(node.props.type)
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
              class: "text-action-error-500",
            },
            children: ["*"],
          },
        ],
      };

      return schemaFn(sectionsSchema);
    };
  });
}

function registerCustomIcons() {
  // Import all SVG files from the directory using import.meta.glob
  const icons = import.meta.glob("@/assets/images/icons/**/*.svg", {
    eager: true,
    query: "?raw",
  });

  // Transform the imported modules into a more usable format
  const formattedIcons = {};
  Object.keys(icons).forEach((key) => {
    const iconName = key.split("/").pop().replace(".svg", "");
    formattedIcons[iconName] = icons[key].default;
  });

  //   console.log("icons", formattedIcons);

  // Example of how you might use the icons (e.g., registering them with a library)
  // IconLibrary.register(formattedIcons);
  return formattedIcons;
}
