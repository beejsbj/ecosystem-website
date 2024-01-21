<script setup>
const props = defineProps([]);

const form = useStorage("contact-form", {
  name: "",
  email: "",
  telegram: "",
  level: "",
  message: "",
});

const serverMessages = ref([]);

function submitForm() {}
</script>

<template>
  <FormKit
    type="form"
    id="contact-form"
    :actions="false"
    v-auto-animate
    @submit="submitForm"
  >
    <form-field>
      <FormKit
        type="text"
        id="name"
        name="name"
        label="Name"
        label-class="$reset calm-voice"
        placeholder="Name"
        validation="required"
        v-model="form.name"
      />
    </form-field>

    <form-field>
      <FormKit
        type="email"
        id="email"
        name="email"
        label="Email"
        label-class="$reset calm-voice"
        placeholder="Email"
        validation="required|email"
        v-model="form.email"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        id="telegram"
        name="Telegram"
        label="Telegram"
        label-class="$reset calm-voice"
        placeholder="t.me/your-username"
        validation="url"
        v-model="form.telegram"
      />
    </form-field>

    <form-field>
      <FormKit
        type="select"
        id="level"
        name="level"
        label="Level"
        label-class="$reset calm-voice"
        placeholder="Level"
        validation="required"
        v-model="form.level"
      >
        <option value="novice">Novice</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
        <option value="master">Master</option>
      </FormKit>
    </form-field>

    <!-- <slot /> -->

    <form-field>
      <FormKit
        type="textarea"
        id="message"
        name="message"
        label="Message"
        label-class="$reset calm-voice"
        placeholder="Message"
        validation="required"
        v-model="form.message"
      />
    </form-field>
    <form-field>
      <FormKit
        type="submit"
        id="submit"
        label="Submit"
        input-class="$reset button"
      />
    </form-field>
    <ul class="validation-errors" v-auto-animate v-if="serverMessages">
      <li
        v-for="message in serverMessages"
        class="solid-voice"
        :class="{
          success: message.success,
          error: !message.success,
        }"
      >
        {{ message.message }}
      </li>
    </ul>
  </FormKit>
</template>

<style scoped lang="scss">
.validation-errors li {
  &.success {
    color: var(--green-lighter);
  }
  &.error {
    color: var(--error);
  }
}
</style>
