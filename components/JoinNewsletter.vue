<script setup>
import { setErrors, FormKitMessages } from "@formkit/vue";
import { getValidationMessages } from "@formkit/validation";

function submitHandler(event) {
  console.log("submitHandler", event);
}
</script>

<template>
  <div class="join-newsletter">
    <text-content>
      <h3 class="attention-voice gradient-text-color">Join our Newsletter</h3>
      <p>Get the latest news and updates from the API3 ecosystem.</p>
      <FormKit type="form" id="join-newsletter" :actions="false" v-auto-animate>
        <FormKit
          type="email"
          placeholder="johndoe@email.com"
          id="email-newsletter"
          name="email"
          validation="required|email"
          v-auto-animate
        />
        <FormKit
          type="submit"
          label="Join"
          input-class="$reset button whisper-voice"
        />
      </FormKit>
    </text-content>
    <graphic-content class="pattern-five">
      <LoadingSpinner duration="5" />
    </graphic-content>
  </div>
</template>

<style scoped lang="scss">
.join-newsletter {
  border-radius: var(--corners);
  position: relative;
  overflow: hidden;
  //   box-shadow: var(--shadow);

  text-content {
    padding: var(--space-l);
  }
}
p {
  margin-top: var(--space-2xs);
}
form {
  margin-top: var(--space-l);
  justify-items: start;
}

graphic-content {
  position: absolute;
  inset: 0;
  top: -50%;
  left: 25%;
  z-index: -1;
  background: unset;

  :deep(.loading-spinner) {
    width: 100%;

    //  display: none;

    path {
      opacity: 0;
      stroke-width: 8px;
    }
  }
}
</style>
