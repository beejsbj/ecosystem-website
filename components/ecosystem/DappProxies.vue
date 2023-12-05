<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["proxies", "isForm", "dappForm"]);
</script>

<template>
  <section class="proxy-table">
    <h2 class="attention-voice">Proxies</h2>
    <ul v-auto-animate>
      <!-- Table heading, first row -->
      <li class="table-row table-head">
        <div class="whisper-voice chain">Network</div>
        <div class="whisper-voice feedname">Feed Name</div>
        <div class="whisper-voice type">Type</div>
        <div class="whisper-voice proxy-address">Proxy Address</div>
        <div class="whisper-voice address">dAPI ID</div>
        <div class="whisper-voice is-oev">is OEV?</div>
        <div class="" v-if="isForm"></div>
      </li>

      <!-- Dynamically rendered table based on data -->
      <li class="table-row" v-for="(proxy, index) in proxies">
        <!-- chain -->
        <div class="chain">
          <ChainIcon
            :chain="ecosystem.chainNames(proxy.chainId)"
            fill="var(--green)"
            stroke="var(--paper)"
            strokeWidth="15%"
          />
          {{ ecosystem.chainNames(proxy.chainId) }}
        </div>

        <!-- feed name -->
        <div class="feedname">
          {{ proxy?.feedName }}
        </div>

        <!-- type -->
        <div class="type">
          {{ proxy?.proxyType?.includes("datafeedId") ? "Data Feed" : "dAPI" }}
        </div>

        <!-- proxy address -->
        <div class="proxy-address">
          <WalletAddress :walletAddress="proxy?.proxyAddress" />
        </div>

        <!-- id / dapi based address -->
        <div class="address">
          <WalletAddress
            :walletAddress="
              proxy?.proxyType === 'datafeedId'
                ? proxy?.datafeedId
                : proxy?.dapiNameHash
            "
          />
        </div>

        <!-- is oev -->
        <div class="is-oev">
          <picture v-if="isForm ? proxy.isOEV : proxy?.oev?.enabled">
            <NuxtImg
              loading="lazy"
              src="/images/icons/oev.svg"
              alt="OEV icon"
            />
          </picture>
        </div>

        <!-- button column rendered when this component is loaded in the form-->
        <div class="cross" v-if="isForm">
          <button
            class="icon"
            @click.prevent="dappForm?.proxies?.splice(index, 1)"
          >
            <picture class="cross">
              <img
                loading="lazy"
                src="@/assets/images/interface/cross.svg"
                alt="cross icon"
              />
            </picture>
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
section.proxy-table {
  display: grid;
  ul {
    margin-top: var(--space-2xs);
    max-height: 400px;

    overflow-y: scroll;
    position: relative;
    scroll-behavior: smooth;

    .table-head {
      position: sticky;
      top: 0;
      background-color: var(--paper);
      z-index: 1;
      border-bottom: none;

      // box-shadow: var(--shadow);
    }
  }
  .table-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 0.5fr;
    gap: var(--space-s);
    padding: var(--space-s);
    border-bottom: var(--border-dark);
    align-items: center;
    min-width: fit-content;

    div {
      min-width: 130px;
    }

    .chain {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
    }

    .chain picture.chain-icon {
      max-width: 20px;
    }

    & + .table-row {
      // border-top: var(--border-light);
    }

    .is-oev {
      display: flex;
      align-items: center;

      picture {
        max-width: 20px;
      }
    }

    picture.cross {
      width: 10px;
    }
  }
}
</style>
