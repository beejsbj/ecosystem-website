<script setup>
import { useStorage } from "@vueuse/core";
import { setErrors, FormKitMessages } from "@formkit/vue";
import { getValidationMessages } from "@formkit/validation";

const { verifyWallet } = useSiwe();
const { submitProject, fetchFeedNames } = useHttpCalls();
const web3Store = useWeb3Store();

const dappForm = useStorage("dapp-form", {});

const loading = ref(false);
const messages = ref([]);
const successData = ref({ message: "", pr_url: "" });
const submitSuccess = ref(false);
const feedNameOptions = ref([]);

function showErrors(node) {
  messages.value = [];
  const validations = getValidationMessages(node);
  validations.forEach((inputMessages) => {
    messages.value = messages.value.concat(
      inputMessages.map((message) => message.value)
    );
  });
}

const submitHandler = async (event) => {
  if (!web3Store.state?.isConnected) {
    await web3Store.func.openModal();
    return;
  }

  setErrors("add-form", []);
  submitSuccess.value = false;
  successData.value.message = "";
  successData.value.pr_url = "";

  // prepare images selected
  const eventKey = Object.keys(event);
  const logo = event?.[eventKey]?.content?.logo?.[0]?.file;
  const cover = event?.[eventKey]?.images?.cover?.[0]?.file;
  const screenshots = event?.[eventKey]?.images?.screenshots?.map(
    (el) => el?.file
  );
  const images = { logo, cover, screenshots };

  // check correct proxy info for datafeed service
  if (
    dappForm?.value.productType === "datafeed" &&
    !dappForm?.value?.proxies?.length
  ) {
    setErrors("add-form", [
      "Please add atleast 1 proxy for data feed service!",
    ]);

    return;
  }

  const { success: verificationSuccess, data: verificationPayload } =
    await verifyWallet();

  if (!verificationSuccess) {
    setErrors("add-form", ["Signature verification failed!"]);

    return;
  }

  loading.value = true;

  successData.value.message =
    "Please wait for this to process — it will take about 1-2 mins!";
  const submitResult = await submitProject(
    dappForm,
    images,
    verificationPayload
  );
  if (submitResult.success) {
    successData.value.message = submitResult.message;
    successData.value.pr_url = submitResult.data;
    submitSuccess.value = true;

    delete dappForm.value;
  } else {
    successData.value.message = "";
    setErrors("add-form", [submitResult?.message]);
  }
  loading.value = false;
};

onMounted(async () => {
  window.scroll({
    top: 0,
    left: 0,
  });
  const names = await fetchFeedNames();

  feedNameOptions.value = names;
});
</script>

<template>
  <FormKit
    type="form"
    id="add-form"
    @submit="submitHandler"
    @submit-invalid="showErrors"
    :actions="false"
    #default="{ state: { valid: isValid } }"
  >
    <FormKit
      type="multi-step"
      tab-style="progress"
      :hide-progress-labels="true"
    >
      <FormKit type="step" v-auto-animate name="content">
        <ContentStep :dappForm="dappForm" />
        <template #stepNext="{ handlers }" #stepPrevious>
          <FormStepButtons
            :next="handlers.next"
            :previous="handlers.previous"
          />
        </template>
      </FormKit>

      <FormKit type="step" v-auto-animate name="images">
        <ImageStep :dappForm="dappForm" />
        <template #stepNext="{ handlers }" #stepPrevious>
          <FormStepButtons
            :next="handlers.next"
            :previous="handlers.previous"
          />
        </template>
      </FormKit>

      <FormKit type="step" v-auto-animate name="tags">
        <TagStep :dappForm="dappForm" />
        <template #stepNext="{ handlers }" #stepPrevious>
          <FormStepButtons
            :next="handlers.next"
            :previous="handlers.previous"
          />
        </template>
      </FormKit>

      <FormKit
        type="step"
        v-auto-animate
        name="proxy"
        v-if="dappForm.productType === 'datafeed'"
      >
        <ProxyStep :dappForm="dappForm" :feedNameOptions="feedNameOptions" />
        <template #stepNext="{ handlers }" #stepPrevious>
          <FormStepButtons
            :next="handlers.next"
            :previous="handlers.previous"
          />
        </template>
      </FormKit>

      <FormKit type="step" v-auto-animate name="links">
        <LinksStep :dappForm="dappForm" />
        <template #stepNext="{ handlers }">
          <FormStepButtons :isLastStep="true" :previous="handlers.previous" />
          <div class="messages">
            <ul class="validation-errors" v-auto-animate>
              <FormKitMessages v-auto-animate />
              <template v-if="!isValid">
                <li v-for="message in messages" class="whisper-voice">
                  {{ message }}
                </li>
              </template>
            </ul>

            <!-- <div v-if="complete"> -->
            <!-- <AddLoading :isLoading="true" :isWaiting="true" /> -->
            <!-- </div> -->

            <text-content v-if="submitSuccess">
              <p class="success-indicator">
                {{ successData.message }}
              </p>

              <!-- <a :href="successData.pr_url" target="_blank">
                  View Pull request
                </a> -->
            </text-content>
          </div>
        </template>
      </FormKit>
    </FormKit>
  </FormKit>
</template>

<style scoped lang="scss">
form {
  & > :is(.step) {
    min-height: calc(80vh);
    display: grid;
    gap: var(--space-xl);
    align-content: center;
  }
}

div.actions {
  justify-content: center;
  gap: var(--space-m);
}

div.messages {
  .validation-errors * {
    color: var(--error);
  }

  .success-indicator {
    color: var(--success);
  }
}
form {
  :deep(.formkit-step-previous, .formkit-step-next) {
    display: none;
  }
}
</style>
