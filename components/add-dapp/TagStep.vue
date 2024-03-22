<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);

props.dappForm.date = new Date().toISOString().slice(0, 10);

const yearOptions = ref([]);

onMounted(() => {
  const years = ref(getYearRange(2000, new Date().getFullYear()));

  function getYearRange(start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  yearOptions.value = years.value.reverse();
});
</script>

<template>
  <section>
    <text-content>
      <h2 class="attention-voice">Tell us about your dApp</h2>
      <p>
        This information will be displayed for others to learn about your dApp.
      </p>
    </text-content>
    <form-field>
      <FormKit
        type="taglist"
        v-model="dappForm.categories"
        :options="ecosystem.categoryOptions"
        :label="`Select up to x categories that your dApp serves.*`"
        :required="true"
        popover
      />
    </form-field>

    <form-field>
      <FormKit
        type="taglist"
        v-model="dappForm.chains"
        :options="ecosystem.chainOptions"
        :label="`Select the networks your dApp supports.*`"
        :required="true"
        popover
      >
        <template #option="{ option }">
          <div class="formkit-icon-option">
            <ChainIcon :chain="option.label" />
            <span>
              {{ option.label }}
            </span>
          </div>
        </template>
        <template #tag="{ handlers, option, classes }">
          <div :class="classes.tag">
            <!-- <img :src="option.logo" class="w-5 mr-2 bg-white" /> -->
            <ChainIcon :chain="option.label" />
            <span :class="classes.tagLabel">
              {{ option.label }}
            </span>
            <button
              @click.prevent="handlers.removeSelection(option)()"
              tabindex="-1"
              type="button"
              aria-controls="input_1"
              class="formkit-remove-selection"
            >
              <span class="formkit-close-icon formkit-icon"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16">
                  <path
                    d="M10,12.5c-.13,0-.26-.05-.35-.15L1.65,4.35c-.2-.2-.2-.51,0-.71,.2-.2,.51-.2,.71,0L10.35,11.65c.2,.2,.2,.51,0,.71-.1,.1-.23,.15-.35,.15Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M2,12.5c-.13,0-.26-.05-.35-.15-.2-.2-.2-.51,0-.71L9.65,3.65c.2-.2,.51-.2,.71,0,.2,.2,.2,.51,0,.71L2.35,12.35c-.1,.1-.23,.15-.35,.15Z"
                    fill="currentColor"
                  ></path></svg
              ></span>
            </button>
          </div>
        </template>
      </FormKit>
    </form-field>

    <form-field>
      <FormKit
        type="dropdown"
        v-model="dappForm.productType"
        :options="ecosystem.productTypeOptions"
        :label="`Select the service your dApp uses.*`"
        :required="true"
        popover
      >
        <template #option="{ option }">
          <div class="formkit-icon-option">
            <DynamicIcon :icon="option.label" />
            <span>
              {{ option.label }}
            </span>
          </div>
        </template>
      </FormKit>
    </form-field>

    <form-field>
      <FormKit
        type="dropdown"
        v-model="dappForm.year"
        :options="yearOptions"
        :label="`When was your dApp released?*`"
        :required="true"
        popover
      />
    </form-field>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}
</style>
