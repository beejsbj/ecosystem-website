<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
  }>(),
  { code: "", language: null, filename: null, highlights: [] }
);

const { copy, copied, text } = useClipboard();
</script>

<template>
  <div>
    <span class="calm-voice" @click="copy(code)" v-tooltip="'Copy code'">
      <template v-if="!copied">{{ language }}</template>

      <template v-else> Copied! </template>
    </span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  border-radius: var(--corners);
  margin: var(--space-l) 0;
  padding: var(--space-l) var(--space-s);
  background: var(--gradient-dark);
  overflow: scroll;
  span {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: var(--step--1);
    cursor: pointer;
  }

  :deep(code) {
    color: unset;
  }

  &:hover {
    overflow: visible;
  }

  :deep(pre) {
    white-space: pre;
  }
}
</style>
