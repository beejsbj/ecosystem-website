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
    outer: "SHAZAM",
    label: "calm-voice",
  },
});

console.log(classes);

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
  };
});

// plugins
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

function addPrefixIconPlugin(node) {
  node.on("created", () => {
    console.log(node.type);

    if (node.type !== "input") {
      //  node.props.prefixIcon = 'email'
      return;
    }

    if (node.props.type === "email") {
      node.props.prefixIcon = "email";
    }
  });

  //   email
  //   if (node.props.type === "email") {
  //     node.props.prefixIcon = "email";
  //   }

  //   //   password
  //   if (node.props.type === "password") {
  //     node.props.prefixIcon = "lock";
  //   }

  //   text

  //   number
  //   if (node.props.type === "number") {
  //     node.props.prefixIcon = "number";
  //   }

  //   //   url
  //   if (node.props.type === "url") {
  //     node.props.prefixIcon = "url";
  //   }
}
