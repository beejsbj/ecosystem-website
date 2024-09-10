/**
 * FormKit Configuration
 *
 * Configures FormKit with custom plugins, icons, classes, and props for the application.
 *
 * @file
 *
 * @features
 * - Integrates multiple FormKit plugins (multi-step, auto-height textarea, auto-animate)
 * - Configures custom icons from various sources
 * - Sets up custom CSS classes for form elements
 * - Adds custom plugins for asterisks, prefix icons, and help tooltips
 * - Integrates FormKit Pro features (when available)
 *
 * @plugins
 * - createMultiStepPlugin
 * - createAutoHeightTextareaPlugin
 * - createAutoAnimatePlugin
 * - addAsteriskPlugin (custom)
 * - addPrefixIconPlugin (custom)
 * - addSuffixHelpTooltipPlugin (custom)
 * - createProPlugin (FormKit Pro)
 *
 * @customPlugins
 * - addSuffixHelpTooltipPlugin: Adds tooltips to form fields with help text
 * - addPrefixIconPlugin: Adds prefix icons to specific input types
 * - addAsteriskPlugin: Adds asterisks to required fields
 * - registerCustomIcons: Imports and registers custom SVG icons
 *
 * @dependencies
 * - @formkit/vue
 * - @formkit/addons
 * - @formkit/icons
 * - @formkit/pro (optional)
 * - floating-vue
 *
 * @note
 * This configuration file is used globally for all FormKit instances in the application.
 * Ensure all dependencies are properly installed and the FormKit Pro key is set in the runtime config if using Pro features.
 */

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
  addSuffixHelpTooltipPlugin,
  //  proPlugin,
];

//config
export default defineFormKitConfig(() => {
  const config = useRuntimeConfig();

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
    },
  };
});

// plugins ////////////////
//
function addSuffixHelpTooltipPlugin(node) {
  if (!node.props.help) {
    node.props.suffixIcon = null;
    return;
  }

  let tooltip;

  const mouseEnter = node.props.onMouseEnter;
  node.context.handlers.mouseEnter = (e) => {
    const el = e.target;

    //
    tooltip = createTooltip(el, {
      triggers: [],
      content: node.props.help,
    });

    //
    tooltip.show();

    mouseEnter?.(e);
  };

  const mouseLeave = node.props.onMouseLeave;
  node.context.handlers.mouseLeave = (e) => {
    const el = e.target;

    //
    tooltip.hide();

    setTimeout(() => {
      destroyTooltip(el);
    }, 400);

    mouseLeave?.(e);
  };

  const schemaFn = node.props.definition.schema;
  node.props.definition.schema = (sectionsSchema = {}) => {
    sectionsSchema.suffixIcon = {
      attrs: {
        onmouseenter: "$handlers.mouseEnter",
        onmouseleave: "$handlers.mouseLeave",
      },
    };

    return schemaFn(sectionsSchema);
  };
}

function addPrefixIconPlugin(node) {
  node.on("created", () => {
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
          {
            $el: "span",
            if: "$state.required",
            attrs: {
              class: "text-action-error-500 required-star",
            },
            children: ["*"],
          },
          "$label",
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

  return formattedIcons;
}
