<script setup>
import formatNumber from "@/utils/formatNumber";

const oev = useOEVStore();

const showLiquidatedBar = ref(false);
const showSentToBuilderBar = ref(true);

function toggleLiquidated() {
  showLiquidatedBar.value = !showLiquidatedBar.value;
}
function toggleSentToBuilder() {
  showSentToBuilderBar.value = !showSentToBuilderBar.value;
}

const maxHeight = computed(() => {
  //check if protocols have hide, use the protocol with the highest value
  const protocols = oev.protocols.filter((protocol) => !protocol.hide);

  if (showLiquidatedBar.value) {
    const max = Math.max(
      ...protocols.map((protocol) => protocol.totalLiquidated)
    );
    return max;
  } else {
    const max = Math.max(
      ...protocols.map((protocol) => protocol.totalSentToBuilderUSD)
    );
    return max;
  }
});
</script>

<template>
  <SectionColumn inner-class="wide">
    <div class="chart-grid">
      <h2 class="attention-voice">Protocol Performance Comparison</h2>
      <!-- OEV Protocol List component -->
      <LazyOEVProtocolList />
      <!-- OEV Interface Chart component -->
      <div class="chart-container bars">
        <div class="legend">
          <button
            @click="toggleLiquidated"
            :class="{
              dimmed: !showLiquidatedBar,
            }"
          >
            <div class="liquidated"></div>
            <p class="whisper-voice">Total Liquidated</p>
          </button>
          <button
            @click="toggleSentToBuilder"
            :class="{
              dimmed: !showSentToBuilderBar,
            }"
          >
            <div class="totalSentToBuilderUSD"></div>
            <p class="whisper-voice">OEV Recaptured</p>
          </button>
        </div>
        <ul class="bars" v-auto-animate>
          <template v-for="(protocol, i) in oev.protocols">
            <li v-if="!protocol.hide" :key="protocol.id">
              <div
                class="bar"
                :class="{ userAdded: protocol.id === 'userAdded' }"
                :style="`
							 --bar-liquidated-height: ${(protocol.totalLiquidated / maxHeight) * 150};
							 --bar-totalSentToBuilderUSD-height: ${
                 (protocol.totalSentToBuilderUSD / maxHeight) * 150
               };
						 `"
              >
                <span
                  class="liquidated"
                  :class="{ hide: !showLiquidatedBar }"
                  v-tooltip.top-end="`$${protocol.totalLiquidated}`"
                >
                  <span class="number firm-voice">
                    {{ formatNumber(protocol.totalLiquidated) }}
                  </span>
                </span>
                <span
                  class="totalSentToBuilderUSD"
                  :class="{ hide: !showSentToBuilderBar }"
                  v-tooltip.top-end="`$${protocol.totalSentToBuilderUSD}`"
                >
                  <span class="number firm-voice">
                    {{ formatNumber(protocol.totalSentToBuilderUSD) }}
                  </span>
                </span>
              </div>
              <picture class="protocol-logo" v-if="protocol.icon">
                <NuxtImg
                  :src="protocol.icon"
                  :alt="protocol.name"
                  loading="lazy"
                />
              </picture>

              <DynamicIcon v-else icon="dapp" class="protocol-logo user" />
              <ChainIcon :id="protocol.chainId" />
              <p class="solid-voice protocol-name">
                {{ protocol.name }}
              </p>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
.chart-grid {
  display: grid;
  gap: var(--space-xl);
  position: relative;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    .chart-container {
      grid-column: 2 / -1;
    }
    .protocol-list {
      grid-column: 1 / 2;
    }
  }
}

h2 {
  text-align: center;
  grid-column: 1 / -1;
}
.chart-container {
  display: grid;
  gap: var(--space-m);
  grid-template-rows: 120px 1fr;

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

text-content {
  grid-column: 1 / span 3;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--space-3xl);
}

.protocol-logo {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  justify-self: center;

  &.user {
    border-radius: unset;
  }
}

.legend {
  display: grid;
  gap: var(--space-2xs);
  padding: var(--space-m);
  grid-column: 2/-1;
  justify-content: end;

  & > button {
    display: flex;
    gap: var(--space-xs);
    align-items: center;

    &.dimmed {
      filter: brightness(0.5) saturate(0.5);
    }

    & > div {
      aspect-ratio: 1/1;
      width: 25px;
      background: var(--background);
    }
  }
}

.totalSentToBuilderUSD {
  --background: linear-gradient(
    to bottom,
    hsla(160, 69%, 69%, 0.3),
    hsla(160, 69%, 69%, 0)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(160, 69%, 40%, 1),
    hsla(160, 69%, 0%, 1)
  );
}

.liquidated {
  --background: linear-gradient(
    to bottom,
    hsla(255, 34%, 54%, 0.5),
    hsla(255, 34%, 54%, 00)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(255, 34%, 60%, 1),
    hsla(255, 34%, 0%, 0)
  );
}
ul.bars {
  display: grid;
  gap: var(--space-s);
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

  @media (min-width: 1000px) {
    grid-column: 1 / -1;
  }
}

li {
  display: grid;
  gap: var(--space-2xs);
  //   align-items: center;

  & > :is(p, picture) {
    justify-self: center;
  }

  & > picture {
    @media (max-width: 768px) {
      max-width: 30px;
    }
  }

  & > p {
    text-align: center;
    white-space: nowrap;
    @media (max-width: 768px) {
      font-size: var(--step--2);
    }
  }

  .bar {
    height: 400px;
    position: relative;
    display: grid;
    gap: var(--space-3xs);
    grid-template-columns: 1fr 1fr;

    transition: 0.2s ease-in-out;

    &:has(> .hide) {
      grid-template-columns: unset;
    }

    &.userAdded {
      filter: brightness(2) saturate(3);
    }

    /*   seperator line */
    &:after {
      content: "";
      position: absolute;
      bottom: 0%;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--gray);
    }

    /*  totalSentToBuilderUSD and liquidated halves of the bar*/
    & > span {
      transition: 0.2s ease-in-out;
      border-radius: var(--corners);
      position: absolute;
      left: 1px;
      right: 1px;
      background: var(--background);
      bottom: 0%;

      /*styling to make the gradient border*/
      &::before {
        content: "";
        border-radius: inherit;
        position: absolute;
        inset: 0px;
        background: black; //!important
        z-index: -1;
      }

      /*creates the gradient border*/
      &::after {
        content: "";
        border-radius: inherit;
        position: absolute;
        inset: -1px;

        background: var(--after-background);
        z-index: -2;
      }

      /*hovering number value*/
      .number {
        text-align: center;
        position: absolute;

        left: 50%;
        top: calc(var(--space-l) * -1);
        transform: translateX(-50%);

        @media (max-width: 768px) {
          font-size: var(--step--1);
        }
      }
      &.liquidated {
        grid-column: 1 / span 1;

        height: calc(var(--bar-liquidated-height) * 2px);
      }

      &.totalSentToBuilderUSD {
        grid-column: 2 / span 1;

        height: calc(var(--bar-totalSentToBuilderUSD-height) * 2px);
      }
    }
  }
}
</style>
