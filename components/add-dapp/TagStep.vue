<script setup>
/**
 * TagStep Component
 *
 * A form step component for capturing categorization and metadata about a dApp.
 *
 * @component
 *
 * @example
 * <TagStep :dappForm="dappFormObject" />
 *
 * @props
 * @prop {Object} dappForm - Reactive object to store form data
 *
 * @features
 * - Captures dApp categories
 * - Selects supported blockchain networks
 * - Chooses the type of service the dApp uses
 * - Selects the release year of the dApp
 * - Uses FormKit components for form inputs
 *
 */

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
        type="checkbox"
        v-model="dappForm.categories"
        :options="ecosystem.categoryOptions"
        :label="`Select up to x categories that your dApp serves.`"
        validation="required"
      />
    </form-field>

    <form-field>
      <FormKit
        type="checkbox"
        v-model="dappForm.chains"
        :options="ecosystem.chainOptions"
        :label="`Select the networks your dApp supports.`"
        validation="required"
      />
    </form-field>

    <form-field>
      <FormKit
        type="select"
        v-model="dappForm.productType"
        :options="ecosystem.productTypeOptions"
        :label="`Select the service your dApp uses.`"
        validation="required"
      />
    </form-field>

    <form-field>
      <FormKit
        type="select"
        v-model="dappForm.year"
        :options="yearOptions"
        :label="`When was your dApp released?`"
        validation="required"
      />
    </form-field>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}
</style>
