<script setup>
const props = defineProps(["dappForm"]);
props.dappForm.owner = props.dappForm.owner ?? {};
</script>

<template>
  <FormKit type="group" v-auto-animate name="owner">
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
