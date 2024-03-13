<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

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
        type="select"
        v-model="dappForm.categories"
        :options="ecosystem.categoryOptions"
        :label="`Select up to x categories that your dApp serves.*`"
        help="Hold down the CTRL/CMD  to select multiple categories."
        :required="true"
        multiple="true"
      />
    </form-field>

    <form-field>
      <FormKit
        type="select"
        v-model="dappForm.chains"
        :options="ecosystem.chainOptions"
        :label="`Select the networks your dApp supports.*`"
        help="Hold down the CTRL/CMD  to select multiple networks."
        :required="true"
        multiple="true"
      />
    </form-field>

    <form-field>
      <FormKit
        type="select"
        v-model="dappForm.productType"
        :options="ecosystem.productTypeOptions"
        :label="`Select the service your dApp uses.*`"
        :required="true"
      />
    </form-field>

    <form-field>
      <!-- <label class="calm-voice" for="year">
        When was your dApp released?*
      </label>
      <Multiselect
        id="year"
        v-model="dappForm.year"
        mode="single"
        :required="true"
        :close-on-select="true"
        :searchable="true"
        :create-option="false"
        :options="yearOptions"
        :classes="{
          singleLabelText: 'calm-voice multiselect-single-label-text',
          dropdown: 'calm-voice multiselect-dropdown',
          search: 'calm-voice multiselect-search',
        }"
      /> -->

      <FormKit
        type="select"
        v-model="dappForm.year"
        :options="yearOptions"
        :label="`When was your dApp released?*`"
        :required="true"
      />
    </form-field>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}
</style>
