<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";

const props = defineProps(["dapp"]);
const ecosystem = useEcosystemStore();

const upvotes = ref(0);
const showShareBox = ref(false);
const loading = ref(false);

const { verifyWallet } = useSiwe();
const { submitUpvote } = useHttpCalls();
const web3Store = useWeb3Store();

const handleShare = async () => {
  showShareBox.value = !showShareBox.value;
};

const handleUpvote = async () => {
  if (!web3Store.state?.isConnected) {
    web3Store.func?.openModal();
    return;
  }

  loading.value = true;
  const { success: verificationSuccess, data: verificationPayload } =
    await verifyWallet();

  if (!verificationSuccess) {
    loading.value = false;

    return;
  }

  loading.value = true;

  const payload = {};
  const submitResult = await submitUpvote(
    props.dapp?._id,
    payload,
    verificationPayload
  );
  if (submitResult.success) {
    upvotes.value += 1;
  }

  loading.value = false;
};

onMounted(() => {
  upvotes.value = !props?.dapp?.upvotes ? 0 : props?.dapp?.upvotes;
});
</script>

<template>
  <aside class="panel">
    <article class="rows">
      <div class="row chain">
        <p>Chains</p>
        <ul>
          <li v-for="chain in dapp?.chains" :key="chain.id">
            <!-- {{ chain }} -->
            <ChainIcon
              :chain="ecosystem.chainNames(chain)"
              fill="var(--green)"
              stroke="var(--paper)"
              strokeWidth="var(--line-width)"
            />
          </li>
        </ul>
      </div>
      <div class="row product-list">
        <p>Product</p>
        <ul>
          <li>
            <DynamicIcon :icon="dapp?.productType" />
            {{ ecosystem?.productTypeToLabel?.[dapp?.productType] }}
          </li>
        </ul>
      </div>
      <div class="row category-list">
        <p>Category</p>
        <ul>
          <li
            v-for="category in dapp?.categories"
            :key="category"
            class="whisper-voice"
          >
            <!-- <DynamicIcon :icon="category" /> -->
            {{ ecosystem.categoryToLabel?.[category] }}
          </li>
        </ul>
      </div>

      <div class="year row">
        <p>Year</p>
        <p>{{ dapp.year }}</p>
      </div>
    </article>
  </aside>
</template>
<style lang="scss" scoped>
aside {
  display: grid;
  gap: var(--space-2xl);
  @media (min-width: 768px) {
    grid-row: 2 / span 1;
    grid-column: 2;
  }
  .panel-header {
    display: grid;
    justify-items: center;
    gap: var(--space-s);

    h2 {
      text-align: center;
    }
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-l);
    padding: var(--space-s) 0;
  }
  div.row {
    border-bottom: var(--border-dark);
    li {
      display: flex;
      gap: var(--space-3xs);

      :deep(picture) {
        max-width: 2rem;
      }
    }
  }

  .row.product-list {
    li {
      align-items: center;
    }
  }

  .row.category-list {
    ul {
      display: flex;
      gap: var(--space-2xs);
      justify-content: start;

      li {
        display: flex;
        align-items: center;
        gap: var(--space-3xs);
        white-space: nowrap;
        padding: calc(var(--space-2xs) / 5) var(--space-xs);

        border-radius: calc(var(--corners) * 3);
        background: var(--gray-darker);

        :deep(picture) {
          max-width: var(--step-0);
        }
      }
    }
  }
}

.chain {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: var(--space-s);

    picture.chain-icon {
      aspect-ratio: 1/1;
      width: 16px;
    }
  }
}

.logo {
  border-radius: 50%;
  max-width: 100px;
}
</style>
