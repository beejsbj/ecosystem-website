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
        This information will be displayed for other to learn about your dApp.
      </p>
    </text-content>
    <form-field>
      <label class="calm-voice" for="categories">
        Select up to x categories that your dApp serves.*
      </label>
      <Multiselect
        id="categories"
        v-model="dappForm.categories"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.categoryOptions"
        class="tags"
        :classes="{
          tag: 'calm-voice multiselect-tag',
          dropdown: 'calm-voice multiselect-dropdown',
          tagsSearch: 'calm-voice multiselect-tags-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="calm-voice" for="chains">
        Select the networks your dApp supports.*
      </label>
      <Multiselect
        id="chains"
        v-model="dappForm.chains"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.chainOptions"
        class="tags"
        :classes="{
          tag: 'calm-voice multiselect-tag',
          dropdown: 'calm-voice multiselect-dropdown',
          tagsSearch: 'calm-voice multiselect-tags-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="calm-voice" for="productType">
        Select the service your dApp uses.*
      </label>
      <Multiselect
        id="productType"
        v-model="dappForm.productType"
        mode="single"
        :close-on-select="true"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.productTypeOptions"
        :classes="{
          singleLabelText: 'calm-voice multiselect-single-label-text',
          dropdown: 'calm-voice multiselect-dropdown',
          search: 'calm-voice multiselect-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="calm-voice" for="year">
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
      />
    </form-field>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}
</style>
