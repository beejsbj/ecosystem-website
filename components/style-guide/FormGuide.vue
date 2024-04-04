<script setup>
const options = ref([
  {
    label: "option1",
    value: "option1",
  },
  {
    label: "option2",
    value: "option2",
  },
  {
    label: "option3",
    value: "option3",
  },
]);

const inputs = ref([
  {
    label: "Text",
    type: "text",
  },
  {
    label: "Search",
    type: "search",
  },
  {
    label: "Email",
    type: "email",
  },
  {
    label: "Password",
    type: "password",
  },
  {
    label: "Number",
    type: "number",
  },
  {
    label: "URL",
    type: "url",
  },

  {
    label: "Textarea",
    type: "textarea",
  },
  {
    label: "File",
    type: "file",
    formFieldClass: "file-upload",
  },
  {
    label: "Range",
    type: "range",
  },

  {
    label: "Toggle",
    type: "toggle",
  },

  {
    label: "Checkbox",
    type: "checkbox",
    options: options.value,
  },
  {
    label: "Radio",
    type: "radio",
    options: options.value,
  },

  {
    label: "Select",
    type: "select",
    options: options.value,
  },

  //   pro
  {
    label: "Autocomplete",
    type: "autocomplete",
    options: options.value,
  },
  {
    label: "Dropdown",
    type: "dropdown",
    options: options.value,
  },
  {
    label: "Taglist",
    type: "taglist",
    options: options.value,
    selectIcon: "down",
  },
  {
    label: "Submit",
    type: "submit",
  },

  {
    label: "Repeater",
    type: "repeater",
    options: options.value,
    isRepeater: true,
  },
]);
</script>

<template>
  <FormKit class="form-guide" type="form">
    <h2 class="attention-voice">Form</h2>
    <p>
      These are the forms inputs that are used. Using the Formkit and
      vueform/multiselect packages and having their styles be overwritten to
      match the design of the site.
    </p>
    <ul>
      <template v-for="(input, i) in inputs">
        <li class="grid" v-if="!input.isMultiselect && !input.isRepeater">
          <!-- normal -->
          <FormKit
            :type="input.type"
            :label="input.label"
            :name="input.label"
            :id="i + input.label + 'normal'"
            :options="input.options"
            help="This is a help message. Default input"
            :placeholder="`Add ${input.label.toLowerCase()}...`"
            :multiple="input.isMultiple"
            value="This is the input"
          />

          <!-- focused -->
          <FormKit
            :type="input.type"
            :label="input.label + ' Focused'"
            :name="input.label"
            :id="i + input.label + 'focused'"
            :options="input.options"
            help="This is a help message"
            :placeholder="`Add ${input.label.toLowerCase()}...`"
            :multiple="input.isMultiple"
            :focused="true"
            value="This is the input"
            :classes="{
              outer: 'focused',
            }"
          />

          <!-- invalid -->
          <FormKit
            :type="input.type"
            :label="input.label + ' Invalid'"
            :name="input.label"
            :id="i + input.label + 'invalid'"
            :options="input.options"
            help="This is a help message."
            :placeholder="`Add ${input.label.toLowerCase()}...`"
            :multiple="input.isMultiple"
            validation="length:30"
            validation-visibility="live"
            value="This is the input"
          />

          <!-- disabled -->

          <FormKit
            :type="input.type"
            :label="input.label + ' Disabled'"
            :name="input.label"
            :id="i + input.label + 'disabled'"
            :options="input.options"
            help="This is a help message."
            :placeholder="`Add ${input.label.toLowerCase()}...`"
            :multiple="input.isMultiple"
            value="This is the input"
            disabled
          />
        </li>
        <li v-if="input.isRepeater">
          <!--  -->
          <FormKit
            id="repeater"
            name="users"
            type="repeater"
            label="Users"
            #default="{ index }"
            :insert-control="true"
            :add-button="false"
          >
            <FormKit
              type="email"
              :label="`${index + 1}. Email`"
              name="email"
              validation="email"
              placeholder="Add email address..."
            />
            <FormKit type="toggle" name="toggle" label="Airplane mode" />
            <FormKit type="submit" name="submit" label="Submit" />
          </FormKit>
        </li>
      </template>
    </ul>
  </FormKit>
</template>

<style scoped>
ul {
  display: grid;
  --gap: var(--space-xl);
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  container-type: inline-size;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }

  li.grid {
    display: grid;
    gap: 1rem;

    @media (min-width: 500px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-template-columns: 1fr 1fr;
    }
  }

  li
    .focused:not([data-type="checkbox"], [data-type="radio"])
    :deep(.formkit-inner) {
    box-shadow: var(--fk-border-box-shadow-focus);
  }

  li .focused:is([data-type="checkbox"], [data-type="radio"]) :deep(fieldset) {
    border-color: var(--fk-color-border-focus);
  }
}
</style>
