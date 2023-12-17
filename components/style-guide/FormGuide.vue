<script setup>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const inputs = ref([
  {
    label: "Text",
    type: "text",
  },
  {
    label: "Textarea",
    type: "textarea",
  },

  {
    label: "Single Select",
    type: "single",
    isMultiselect: true,
  },
  {
    label: "Multi Select",
    type: "tags",
    isMultiselect: true,
  },
  {
    label: "Checkbox",
    type: "checkbox",
    options: ["option1", "option2", "option3"],
  },
  {
    label: "Radio",
    type: "radio",
    options: ["option1", "option2", "option3"],
  },
  {
    label: "File",
    type: "file",
    formFieldClass: "file-upload",
  },
]);
</script>

<template>
  <div class="form-guide">
    <h2 class="attention-voice">Form</h2>
    <p>
      These are the forms inputs that are used. Using the Formkit and
      vueform/multiselect packages and having their styles be overwritten to
      match the design of the site.
    </p>
    <ul>
      <li v-for="input in inputs">
        <form-field
          :type="input.type"
          :label="input.label"
          :class="input.formFieldClass"
        >
          <FormKit
            v-if="!input.isMultiselect"
            :type="input.type"
            :label="input.label"
            label-class="$reset notice-voice"
            :name="input.label"
            :id="input.label"
            :options="input.options"
            help="This is a help message"
          />

          <template v-else>
            <label class="notice-voice" :for="input.label">
              {{ input.label }}
            </label>
            <Multiselect
              :mode="input.type"
              :label="input.label"
              :name="input.label"
              :id="input.label"
              :searchable="true"
              :create-option="false"
              :options="['option1', 'option2', 'option3']"
              :classes="{
                singleLabelText: 'calm-voice multiselect-single-label-text',
                dropdown: 'calm-voice multiselect-dropdown',
                search: 'calm-voice multiselect-search',
                tag: 'calm-voice multiselect-tag',
                tagsSearch: 'calm-voice multiselect-tags-search',
              }"
            />
          </template>
        </form-field>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  --gap: var(--space-xl);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}
</style>
