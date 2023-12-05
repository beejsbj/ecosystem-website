<script setup>
import Multiselect from "@vueform/multiselect";
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm", "feedNameOptions"]);
props.dappForm.proxies = props.dappForm.proxies ?? [];

const loading = ref(false);
const message = ref("");

async function handleUpdateProxy() {
  message.value = "";
  loading.value = false;

  if (!props.dappForm?.proxyAddress) {
    message.value = "Please add valid proxy address!";
    return;
  }

  if (!props.dappForm?.proxyChain) {
    message.value = "Please select proxy chain!";
    return;
  }

  if (!props.dappForm?.feedName) {
    message.value = "Please select feed name!";
    return;
  }

  loading.value = true;
  try {
    const info = await fetchProxyInformation(
      props.dappForm?.proxyAddress,
      parseInt(props.dappForm?.proxyChain),
      props.dappForm?.feedName
    );

    const finalProxyEntry = {
      proxyAddress: props.dappForm?.proxyAddress,
      isOEV: info?.isOev,
      chainId: props.dappForm?.proxyChain,
      proxyType: info?.type,
      datafeedId: info?.dataFeedId,
      feedName: props.dappForm?.feedName,
      dapiNameHash: info?.dapiNameHash,
      api3ServerV1: info?.api3ServerV1,
      oevBeneficiary: info?.oevBeneficiary,
    };

    const index = props.dappForm?.proxies?.findIndex(
      (el) => el?.proxyAddress === finalProxyEntry.proxyAddress
    );

    if (index >= 0) {
      message.value = "Proxy already added!";
      return;
    }

    props.dappForm?.proxies?.push(finalProxyEntry);
    props.dappForm.proxyChain = null;
    props.dappForm.proxyAddress = "";
  } catch (error) {
    console.log("error ", error);
    message.value = "Unable fetch proxy info! Incorrect input";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="proxy-step">
    <text-content>
      <h2 class="attention-voice">Enter Proxy information</h2>
      <p>
        This information will be displayed for other to learn about your dApp.
      </p>
    </text-content>
    <div class="proxy-form grid-item" v-auto-animate>
      <form-field>
        <FormKit
          type="text"
          label="Proxy address"
          label-class="$reset calm-voice"
          name="proxyAddress"
          validation-label="Proxy address"
          id="proxyAddress"
          help="You can get proxy address from market.api3.org"
          v-model="dappForm.proxyAddress"
        />
      </form-field>

      <form-field>
        <label class="calm-voice" for="proxy-chain"> Proxy chain </label>
        <Multiselect
          id="proxy-chain"
          v-model="dappForm.proxyChain"
          mode="single"
          :close-on-select="true"
          :searchable="true"
          :create-option="false"
          :options="ecosystem.chainOptions"
          :classes="{
            singleLabelText: 'calm-voice multiselect-single-label-text',
            dropdown: 'calm-voice multiselect-dropdown',
            search: 'calm-voice multiselect-search',
          }"
        />
      </form-field>

      <form-field class="feed-option">
        <label class="calm-voice" for="feed-name"> Proxy feed name </label>
        <Multiselect
          id="feed-name"
          v-model="dappForm.feedName"
          mode="single"
          :close-on-select="true"
          :searchable="true"
          :create-option="false"
          :options="props?.feedNameOptions"
          :classes="{
            singleLabelText: 'calm-voice multiselect-single-label-text',
            search: 'calm-voice multiselect-search',
            dropdown: 'calm-voice multiselect-dropdown',
          }"
        />
      </form-field>

      <div class="actions">
        <div class="add-button">
          <LoadingSpinner v-if="loading" />
          <button v-else class="text green" @click.prevent="handleUpdateProxy">
            <picture>
              <img
                loading="lazy"
                src="@/assets/images/interface/plus.svg"
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

    .table-head .whisper-voice {
      font-weight: var(--weight-heavy);
    }

    .table-row {
      grid-template-columns: 1fr 0.7fr 0.7fr 0.7fr 0.7fr 0.5fr 0.2fr;

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
