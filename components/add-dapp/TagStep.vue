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
 * - Uses local controls for FormKit Pro-only inputs
 *
 */

import { useEcosystemStore } from "~/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);

props.dappForm.date = new Date().toISOString().slice(0, 10);
props.dappForm.categories = props.dappForm.categories || [];
props.dappForm.chains = props.dappForm.chains || [];
props.dappForm.productType = props.dappForm.productType || "datafeed";
props.dappForm.year = props.dappForm.year || new Date().getFullYear();

const yearOptions = ref([]);
const chainSearch = ref("");

const selectedCategories = computed(() => props.dappForm.categories || []);
const selectedChains = computed(() => props.dappForm.chains || []);

const selectedCategoryOptions = computed(() =>
  ecosystem.categoryOptions.filter((option) =>
    hasSelectedValue(selectedCategories.value, option.value)
  )
);

const selectedChainOptions = computed(() =>
  ecosystem.chainOptions.filter((option) =>
    hasSelectedValue(selectedChains.value, option.value)
  )
);

const filteredChainOptions = computed(() => {
  const query = chainSearch.value.trim().toLowerCase();
  const selected = new Set(selectedChains.value.map((item) => String(item)));

  return ecosystem.chainOptions
    .filter((option) => option.label.toLowerCase().includes(query))
    .sort((a, b) => {
      const aSelected = selected.has(String(a.value));
      const bSelected = selected.has(String(b.value));
      if (aSelected !== bSelected) return aSelected ? -1 : 1;
      return a.label.localeCompare(b.label);
    });
});

function hasSelectedValue(list, value) {
  return list.some((item) => String(item) === String(value));
}

function toggleValue(field, value) {
  const current = props.dappForm[field] || [];

  if (hasSelectedValue(current, value)) {
    props.dappForm[field] = current.filter(
      (item) => String(item) !== String(value)
    );
    return;
  }

  props.dappForm[field] = [...current, value];
}

function removeValue(field, value) {
  props.dappForm[field] = (props.dappForm[field] || []).filter(
    (item) => String(item) !== String(value)
  );
}

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
      <div class="showcase-picker">
        <label class="picker-label">
          <span class="required">*</span>
          Select up to x categories that your dApp serves.
        </label>
        <div class="chip-grid" role="group" aria-label="dApp categories">
          <button
            v-for="option in ecosystem.categoryOptions"
            :key="option.value"
            type="button"
            class="choice-chip"
            :class="{ selected: hasSelectedValue(selectedCategories, option.value) }"
            @click="toggleValue('categories', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
        <div class="selected-row" v-if="selectedCategoryOptions.length">
          <button
            v-for="option in selectedCategoryOptions"
            :key="option.value"
            type="button"
            class="selected-pill"
            @click="removeValue('categories', option.value)"
          >
            {{ option.label }}
            <span aria-hidden="true">x</span>
          </button>
        </div>
      </div>
    </form-field>

    <form-field>
      <div class="showcase-picker">
        <label class="picker-label">
          <span class="required">*</span>
          Select the networks your dApp supports.
        </label>
        <div class="selected-row" v-if="selectedChainOptions.length">
          <button
            v-for="option in selectedChainOptions"
            :key="option.value"
            type="button"
            class="selected-pill chain-pill"
            @click="removeValue('chains', option.value)"
          >
            <ChainIcon :id="option.value" />
            {{ option.label }}
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <input
          v-model="chainSearch"
          class="picker-search"
          type="search"
          placeholder="Search networks"
          aria-label="Search networks"
        />
        <div class="chain-list" role="group" aria-label="Supported networks">
          <button
            v-for="option in filteredChainOptions"
            :key="option.value"
            type="button"
            class="chain-choice"
            :class="{ selected: hasSelectedValue(selectedChains, option.value) }"
            @click="toggleValue('chains', option.value)"
          >
            <ChainIcon :id="option.value" />
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </form-field>

    <form-field>
      <div class="showcase-picker">
        <label class="picker-label">
          <span class="required">*</span>
          Select the service your dApp uses.
        </label>
        <div class="segmented-control" role="radiogroup" aria-label="API3 service">
          <button
            v-for="option in ecosystem.productTypeOptions"
            :key="option.value"
            type="button"
            class="segment-button"
            :class="{ selected: dappForm.productType === option.value }"
            :aria-checked="dappForm.productType === option.value"
            role="radio"
            @click="dappForm.productType = option.value"
          >
            <DynamicIcon :icon="option.label" />
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </form-field>

    <form-field>
      <div class="showcase-picker">
        <label class="picker-label" for="release-year">
          <span class="required">*</span>
          When was your dApp released?
        </label>
        <select id="release-year" v-model.number="dappForm.year" class="native-select">
          <option v-for="year in yearOptions" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </form-field>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}

.showcase-picker {
  display: grid;
  gap: var(--space-s);
}

.picker-label {
  color: var(--gray);
  display: flex;
  gap: var(--space-2xs);
  align-items: baseline;
  font-size: var(--step-0);
}

.required {
  color: var(--orange);
}

.chip-grid,
.selected-row,
.segmented-control {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.choice-chip,
.selected-pill,
.chain-choice,
.segment-button,
.native-select,
.picker-search {
  border: 1px solid var(--gray-dark);
  background: var(--gray-darkest);
  color: var(--white);
  border-radius: 6px;
  font: inherit;
}

.choice-chip,
.selected-pill,
.chain-choice,
.segment-button {
  cursor: pointer;
  min-height: 44px;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.choice-chip,
.selected-pill {
  padding: 0.55em 0.85em;
}

.selected-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  color: var(--green);
  border-color: color-mix(in srgb, var(--green), transparent 25%);
  background: color-mix(in srgb, var(--green), transparent 88%);
}

.choice-chip.selected,
.chain-choice.selected,
.segment-button.selected {
  border-color: var(--green);
  background: color-mix(in srgb, var(--green), transparent 82%);
  color: var(--white);
}

.picker-search,
.native-select {
  width: 100%;
  min-height: 56px;
  padding: 0.75em 1em;
}

.chain-list {
  border: 1px solid var(--gray-dark);
  border-radius: 6px;
  display: grid;
  gap: var(--space-3xs);
  max-height: 300px;
  overflow: auto;
  padding: var(--space-xs);
}

.chain-choice {
  align-items: center;
  display: grid;
  gap: var(--space-xs);
  grid-template-columns: 24px 1fr;
  justify-items: start;
  padding: 0.6em 0.75em;
  text-align: left;
}

.chain-pill {
  :deep(.icon) {
    width: 18px;
  }
}

.segment-button {
  align-items: center;
  display: inline-flex;
  gap: var(--space-xs);
  padding: 0.75em 1em;
}

.choice-chip:hover,
.selected-pill:hover,
.chain-choice:hover,
.segment-button:hover {
  border-color: var(--gray);
}
</style>
