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
      />
    </form-field>

    <form-field>
      <FormKit
        type="dropdown"
        v-model="dappForm.productType"
        :options="ecosystem.productTypeOptions"
        :label="`Select the service your dApp uses.*`"
        :required="true"
        popover
      />
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
