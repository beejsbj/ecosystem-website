<script setup>
import { watchNetwork } from "@wagmi/core";
import { gsap } from "gsap";

const web3Store = useWeb3Store();
const ui = useInterfaceStore();

const selected = ref("");
const selectedProductId = ref(null);
const mintInfo = ref({ hash: null });

const loading = ref(false);
const isMintChecking = ref(false);
const chainId = ref(null);
const isMinted = ref(false);

const content = reactive({
  buttons: ["Developers", "DAO", "Testers"],
  unselectedHeading: "Select The NFT to Mint",
  paragraph: ``,
});

function buttonHandle(event, text, index) {
  selected.value = text;

  selectedProductId.value = index;

  const buttons = document.querySelectorAll("aside button");

  buttons.forEach((button, i) => {
    if (i !== index) {
      button.style.setProperty("--underline-width", 0);
    }
  });

  event.target.style.setProperty("--underline-width", "100%");

  animateHeading();
}

function animateHeading() {
  if (!selected.value) {
    gsap.fromTo(
      "div.panel",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  } else {
    gsap.fromTo(
      "div.panel h2",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  }
}

watch(selectedProductId, async (productId, prevProductId) => {
  if (productId === undefined) {
    return;
  }

  isMintChecking.value = true;
  const check = await web3Store.func?.isAlreadyMinted(
    productId,
    web3Store.state.account
  );
  isMintChecking.value = false;
  isMinted.value = check;
});

const isPolygonChain = computed(() => chainId.value === 137);

const handleAction = async () => {
  if (!web3Store?.state?.isConnected) {
    web3Store.func.openModal();
    return;
  }

  loading.value = true;

  if (chainId.value !== 137) {
    await web3Store.func.switchChain(137);
    loading.value = false;
    return;
  }

  const mintData = await web3Store.func?.mintNft(
    selectedProductId.value,
    chainId
  );

  isMintChecking.value = true;

  const check = await web3Store.func?.isAlreadyMinted(
    selectedProductId.value,
    web3Store.state.account
  );
  isMintChecking.value = false;
  isMinted.value = check;

  mintInfo.value.hash = mintData?.data?.blockHash;

  loading.value = false;
};

const buttonText = computed(() => {
  if (loading.value && !isPolygonChain.value) {
    return "Switching...";
  }

  if (loading.value) {
    return "Minting...";
  }

  if (!web3Store?.state?.isConnected) {
    return "Connect Wallet";
  }

  if (!isPolygonChain.value) {
    return "Switch to Polygon";
  }

  return "Mint it Now";
});

onMounted(() => {
  const {} = useMint();

  watchNetwork((network) => {
    chainId.value = network?.chain?.id;
  });
});
</script>

<template>
  <main>
    <section>
      <inner-column v-auto-animate>
        <aside>
          <h1 class="loud-voice">
            {{ content.unselectedHeading }}
          </h1>
          <div class="actions">
            <button
              class="text green hover-underline"
              v-for="(buttonText, index) in content.buttons"
              @click="buttonHandle($event, buttonText, index)"
            >
              {{ buttonText }}
            </button>
          </div>
        </aside>
        <div class="panel" v-if="selected">
          <h2 class="loud-voice" v-show="selected">
            Join the
            <span class="gradient-text-color">{{ selected }}</span> by minting
            this NFT
          </h2>

          <p v-if="content.paragraph">
            {{ content.paragraph }}
          </p>

          <Transition name="fade" mode="out-in" v-if="selected && !isMinted">
            <button class="button" :disabled="loading" @click="handleAction">
              {{ buttonText }}
            </button>
          </Transition>

          <Transition name="fade" mode="out-in" v-if="selected && isMinted">
            <button class="button" :disabled="loading">
              <a
                href="https://opensea.io/collection/api3-guild"
                target="_blank"
                class="group"
              >
                <span>
                  {{ isMintChecking ? "Fetching NFT..." : "Visit OpenSea" }}
                </span>
                <ExternalLink v-if="!isMintChecking" />
              </a>
            </button>
          </Transition>
        </div>
      </inner-column>
    </section>
  </main>
</template>

<style scoped lang="scss">
section:not(.heading) {
  inner-column {
    gap: var(--space-xl);

    @media (min-width: 1024px) {
      min-height: 80vh;
    }
  }

  inner-column:has(.panel) {
    display: grid;
    @media (min-width: 1024px) {
      grid-template-columns: 0.6fr 1fr;
    }

    h1 {
      font-size: var(--step-1);
      transition: 0.2s;
    }

    div.actions {
      @media (min-width: 1024px) {
        display: grid;
      }
    }
  }

  aside {
    display: grid;
    gap: var(--space-m);
    order: 2;
    align-content: center;

    justify-items: center;

    @media (min-width: 1024px) {
      justify-items: unset;
      order: unset;
    }

    h1 {
      // text-wrap: balance;
    }

    button.text {
      text-align: left;
    }
  }

  .panel {
    display: grid;
    gap: var(--space-xl);

    place-content: center;
    text-align: center;

    h2 {
      // opacity: 0;
      text-wrap: balance;

      span {
        white-space: nowrap;
      }

      @media (max-width: 420px) {
        --font-size: var(--step-2);
      }
    }

    button {
      justify-self: center;
    }
  }
}

.external-link {
  max-width: 10px;
  margin-left: var(--space-2xs);
}
.group {
  display: flex;
  align-items: center;
}
</style>
