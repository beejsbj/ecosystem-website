<script setup>
/**
 * ProxyStep Component
 *
 * A form step component for capturing and displaying proxy information related to a dApp.
 *
 * @component
 *
 * @example
 * <ProxyStep :dappForm="dappFormObject" :feedNameOptions="feedOptions" />
 *
 * @props
 * @prop {Object} dappForm - Reactive object to store form data
 * @prop {Array} feedNameOptions - Array of available feed name options
 *
 * @features
 * - Captures proxy address, chain, and feed name
 * - Fetches and validates proxy information from an API
 * - Displays added proxies in a table format
 * - Uses FormKit components for form inputs
 * - Uses standard selects for chain and feed name selection in showcase mode
 *
 */

import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm", "feedNameOptions"]);
props.dappForm.proxies = props.dappForm.proxies ?? [];

const loading = ref(false);
const message = ref("");

async function handleUpdateProxy(event) {
  event.preventDefault();
  message.value = "";
  loading.value = false;

  if (!props.dappForm?.proxyAddress) {
    message.value = "Please add a demo proxy address.";
    return;
  }

  if (!props.dappForm?.proxyChain) {
    message.value = "Please select a proxy chain.";
    return;
  }

  if (!props.dappForm?.feedName) {
    message.value = "Please select a feed name.";
    return;
  }

  const finalProxyEntry = {
    proxyAddress: props.dappForm.proxyAddress,
    isOEV: true,
    chainId: props.dappForm.proxyChain,
    proxyType: "dapi",
    feedName: props.dappForm.feedName,
    dapiNameHash:
      "0x9e6138f8f57d7b493a8364edb0a0ac92399dfd890eecb9121050836a1749ba42",
    api3ServerV1: "0x0000000000000000000000000000000000000001",
    oevBeneficiary: "0x0000000000000000000000000000000000000002",
    oev: {
      enabled: true,
      beneficiary: "0x0000000000000000000000000000000000000002",
    },
  };

  const index = props.dappForm?.proxies?.findIndex(
    (el) => el?.proxyAddress === finalProxyEntry.proxyAddress
  );

  if (index >= 0) {
    message.value = "Demo proxy already added.";
    return;
  }

  props.dappForm?.proxies?.push(finalProxyEntry);
  props.dappForm.proxyChain = null;
  props.dappForm.proxyAddress = "";
  message.value = "Demo proxy added.";
}
</script>

<template>
  <div class="proxy-step">
    <text-content>
      <h2 class="attention-voice">Enter Proxy information</h2>
      <p>
        This information will be displayed for others to learn about your dApp.
      </p>
    </text-content>
    <div class="proxy-form grid-item" v-auto-animate>
      <form-field>
        <FormKit
          type="text"
          label="Proxy address"
          name="proxyAddress"
          validation-label="Proxy address"
          id="proxyAddress"
          help="You can get proxy address from market.api3.org"
          v-model="dappForm.proxyAddress"
          placeholder="0x..."
        />
      </form-field>

      <form-field>
        <FormKit
          type="select"
          :label="`Proxy chain`"
          :id="`proxy-chain`"
          :options="ecosystem.chainOptions"
          v-model="dappForm.proxyChain"
        />
      </form-field>

      <form-field class="feed-option">
        <FormKit
          type="select"
          :label="`Proxy feed name`"
          :id="`feed-name`"
          :options="props?.feedNameOptions"
          v-model="dappForm.feedName"
        />
      </form-field>

      <div class="actions">
        <div class="add-button">
          <LoadingSpinner v-if="loading" />
          <button v-else class="text green" @click="handleUpdateProxy">
            <picture>
              <img
                loading="lazy"
                src="@/assets/images/icons/interface/plus.svg"
                alt="plus icon"
              />
            </picture>
            <span class="whisper-voice"> Fetch Proxy </span>
          </button>
        </div>

        <div class="error-message whisper-voice">
          {{ message }}
        </div>
      </div>
    </div>

    <pre></pre>

    <div class="grid-item" v-show="dappForm?.proxies.length > 0">
      <DappProxies
        :proxies="dappForm?.proxies"
        :dappForm="dappForm"
        :isForm="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.multiselect-search) {
}
.proxy-step {
  display: grid;
  gap: var(--space-2xl);

  text-content {
    grid-column: 1 / -1;
  }

  :deep(.proxy-table) {
    h2.attention-voice {
      display: none;
    }

    ul {
      grid-template-columns: 1fr 0.7fr 0.7fr 0.5fr 0.5fr 0.5fr;
    }

    .table-head .whisper-voice {
      font-weight: var(--weight-heavy);
    }

    .table-row {
      grid-template-columns: subgrid;

      * {
        font-size: var(--step--1);
      }
      div {
        min-width: 70px;
        @media (min-width: 768px) {
          min-width: unset;
        }
      }
    }
  }
}

.button-group {
  display: flex;
  align-items: center;
  justify-self: center;
  width: 100%;
  justify-content: start;
}

.proxy-form {
  display: grid;
  gap: var(--space-s);
  align-items: center;

  button {
    justify-self: start;
  }

  .feed-option {
    margin-bottom: var(--space-xl);
  }

  .actions {
    align-items: center;

    .add-button {
      width: 150px;

      button.text {
        padding: var(--space-s);
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        white-space: nowrap;

        picture {
          max-width: 30px;
        }
      }
    }
  }
  .error-message {
    color: var(--error, red);
  }
}
</style>
