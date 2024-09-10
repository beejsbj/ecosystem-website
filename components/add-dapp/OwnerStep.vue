<script setup>
/**
 * OwnerStep Component
 *
 * A form step component for capturing owner information related to a dApp.
 *
 * @component
 *
 * @example
 * <OwnerStep :dappForm="dappFormObject" />
 *
 * @props
 * @prop {Object} dappForm - Reactive object to store form data
 *
 * @features
 * - Captures contact name and company name
 * - Uses FormKit components for form inputs
 * - Groups owner-related fields together
 *
 * @notes
 * - Initializes dappForm.owner if it doesn't exist
 * - Both fields are required for submission
 * - Uses 'notice-voice' class for label styling, ensure this class is defined in your CSS
 */

const props = defineProps(["dappForm"]);
props.dappForm.owner = props.dappForm.owner ?? {};
</script>

<template>
  <FormKit type="group" name="owner">
    <form-field>
      <FormKit
        type="text"
        label="Contact name"
        label-class="$reset notice-voice"
        name="name"
        placeholder="John Doe"
        validation="required"
        id="name"
        v-model="dappForm.owner.name"
      />
    </form-field>

    <form-field>
      <FormKit
        type="text"
        label="Company"
        label-class="$reset notice-voice"
        name="company"
        placeholder="Company inc."
        validation="required"
        id="company"
        v-model="dappForm.owner.company"
      />
    </form-field>
  </FormKit>
</template>
