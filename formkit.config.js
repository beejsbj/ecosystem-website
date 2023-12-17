// formkit.config.js
import { defaultConfig } from "@formkit/vue";
import {
  createMultiStepPlugin,
  createFloatingLabelsPlugin,
  createAutoHeightTextareaPlugin,
} from "@formkit/addons";

//icons
import { applicationIcons, cryptoIcons } from "@formkit/icons";

//pro
import { createProPlugin, inputs } from "@formkit/pro";

//css
import "@formkit/addons/css/multistep";

const proPlugin = createProPlugin("fk-2fbe2621a", inputs);

const icons = {
  ...applicationIcons,
  ...cryptoIcons,
};

const config = defaultConfig({
  plugins: [
    createMultiStepPlugin(),
    createAutoHeightTextareaPlugin(),
    createFloatingLabelsPlugin(),
    //  addAsteriskPlugin,
    proPlugin,
  ],
  icons,
});

export default config;

// plugins
const isCheckboxAndRadioMultiple = (node) =>
  (node.props.type === "checkbox" || node.props.type === "radio") &&
  node.props.options;

function addAsteriskPlugin(node) {
  node.on("created", () => {
    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema = {}) => {
      const isRequired = node.props.parsedRules.some((rule) => {
        return rule.name === "required";
      });
      // console.log(node.props.id, node.props, isRequired);

      if (isRequired) {
        if (isCheckboxAndRadioMultiple(node)) {
          sectionsSchema.legend = {
            children: ["$label", "*"],
          };
        } else {
          sectionsSchema.label = {
            children: ["$label", "*"],
          };
        }
      }
      return schemaFn(sectionsSchema);
    };
  });
}
