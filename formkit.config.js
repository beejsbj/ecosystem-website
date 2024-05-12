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
    },
  };
});

// functions

// function handleSuffixClick(node, event) {
//   if (!node.props.help) return;
//   const el = event.target;

//   const tooltip = createTooltip(el, {
//     triggers: [],
//     content: node.props.help,
//   });

//   tooltip.show();

//   setTimeout(() => {
//     tooltip.hide();
//     // Transition
//     setTimeout(() => {
//       destroyTooltip(el);
//     }, 400);
//   }, 3000);
// }

// function showTooltip(content, el) {
// 	  const tooltip = createTooltip(el, {
// 	 triggers: [],
// 	 content,
//   });

//   tooltip.show();
// }

// function hideTooltip(el) {
// 	tooltip.hide();

//   setTimeout(() => {
// 	 destroyTooltip(el);
//   }, 400);
// }

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
