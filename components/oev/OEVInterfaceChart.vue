<script setup>
import formatNumber from "@/utils/formatNumber";

const oev = useOEVStore();

const showLiquidatedBar = ref(false);
const showIncentives = ref(false);
const showProfits = ref(true);
const showSentToBuilderBar = ref(true);

const visibleBars = ref(["totalSentToBuilderUSD", "profits"]);

const bars = [
  {
    label: "blockspace auction bribes",
    value: "totalSentToBuilderUSD",
    color: "hsla(160, 69%, 69%, 1)",
    attrs: {
      label: "Blockspace auction bribes",
      onchange: () => {
        toggleSentToBuilder();
      },
    },
  },
  {
    label: "liquidator profits",
    value: "profits",
    color: "hsla(255, 34%, 70%, 1)",

    attrs: {
      onchange: () => {
        toggleProfits();
      },
    },
  },
  //   {
  //     label: "Total Incentives",
  //     value: "incentives",
  //     color: "hsla(226, 100%, 70%, 1)",
  //     attrs: {
  //       onchange: () => {
  //         toggleIncentives();
  //       },
  //     },
  //   },
  //   {
  //     label: "Total Liquidated",
  //     value: "liquidated",
  //     color: "hsla(0, 85%, 65%, 1)",
  //     attrs: {
  //       onchange: () => {
  //         toggleLiquidated();
  //       },
  //     },
  //   },
];

const visibleProtocols = computed(() => {
  return Object.values(oev.userSelectedProtocols).map((protocolSlug) => {
    return oev.getProtocolBySlug(protocolSlug);
  });
});

const maxHeight = computed(() => {
  //check if protocols have hide, use the protocol with the highest value
  const protocols = visibleProtocols.value;

  let liquidatedMax = Math.max(
    ...protocols.map((protocol) => protocol.totalLiquidated)
  );
  let sentToBuilderMax = Math.max(
    ...protocols.map((protocol) => protocol.totalSentToBuilderUSD)
  );
  let profitsMax = Math.max(
    ...protocols.map((protocol) => protocol.totalProfitUSD)
  );
  let incentivesMax = Math.max(
    ...protocols.map((protocol) => protocol.totalIncentiveUSD)
  );

  //   sort the values by highest
  const values = [
    {
      isShown: showSentToBuilderBar.value,
      value: sentToBuilderMax,
    },

    {
      isShown: showProfits.value,
      value: profitsMax,
    },
    {
      isShown: showIncentives.value,
      value: incentivesMax,
    },
    {
      isShown: showLiquidatedBar.value,
      value: liquidatedMax,
    },
  ];

  //based on what is showm, get the highest value, excluding the hidden protocols

  return Math.max(
    ...values.filter((value) => value.isShown).map((value) => value.value)
  );
});

const gridCount = computed(() => {
  let count = 0;
  showLiquidatedBar.value ? count++ : count;
  showSentToBuilderBar.value ? count++ : count;
  showProfits.value ? count++ : count;
  showIncentives.value ? count++ : count;

  return count;
});

const gridStarts = computed(() => {
  //   based on the grid count, and if the bars are shown, calculate the grid start

  let starts = [];
  let count = 1;
  showLiquidatedBar.value ? starts.push(count) : count;
  showSentToBuilderBar.value ? starts.push(count + 1) : count;
  showProfits.value ? starts.push(count + 2) : count;
  showIncentives.value ? starts.push(count + 3) : count;

  return starts;
});

//

function toggleLiquidated() {
  showLiquidatedBar.value = !showLiquidatedBar.value;
}
function toggleSentToBuilder() {
  showSentToBuilderBar.value = !showSentToBuilderBar.value;
}
function toggleProfits() {
  showProfits.value = !showProfits.value;
}
function toggleIncentives() {
  showIncentives.value = !showIncentives.value;
}

function barHeight(value) {
  return (value / maxHeight.value) * 150;
}
</script>

<template>
  <div class="chart-grid">
    <!-- OEV Protocol List component -->
    <div class="chart-actions">
      <div class="legend">
        <!--  -->
        <FormKit
          type="checkbox"
          label="Legend"
          :options="bars"
          v-model="visibleBars"
        >
          <template #label="{ option }">
            <div class="icon-option">
              <div class="legend-icon" :class="option.value"></div>
              <span class="formkit-label">
                {{ option.label }}
              </span>
            </div>
          </template>
        </FormKit>
      </div>
    </div>
    <!-- OEV Interface Chart component -->
    <ul class="bars" v-auto-animate>
      <template v-for="(protocol, i) in visibleProtocols" :key="protocol.slug">
        <li>
          <div
            class="bar"
            :class="{ userAdded: protocol.slug === 'userAdded' }"
            :style="`
							 --bar-liquidated-height: ${barHeight(protocol.totalLiquidated)};
							 --bar-totalSentToBuilderUSD-height: ${barHeight(
                 protocol.totalSentToBuilderUSD
               )};
							 --bar-profits-height: ${barHeight(protocol.totalProfitUSD)};
							 --bar-incentives-height: ${barHeight(protocol.totalIncentiveUSD)};


						 `"
          >
            <span
              class="totalSentToBuilderUSD"
              :class="{ hide: !showSentToBuilderBar }"
              v-tooltip.top-end="`$${protocol.totalSentToBuilderUSD}`"
            >
              <span class="number solid-voice">
                ${{ formatNumber(protocol.totalSentToBuilderUSD) }}
              </span>
            </span>
            <span
              class="profits"
              :class="{ hide: !showProfits }"
              v-tooltip.top-end="`$${protocol.totalProfitUSD}`"
            >
              <span class="number solid-voice">
                ${{ formatNumber(protocol.totalProfitUSD) }}
              </span>
            </span>
            <span
              class="incentives"
              :class="{ hide: !showIncentives }"
              v-tooltip.top-end="`$${protocol.totalIncentiveUSD}`"
            >
              <span class="number solid-voice">
                ${{ formatNumber(protocol.totalIncentiveUSD) }}
              </span>
            </span>
            <span
              class="liquidated"
              :class="{ hide: !showLiquidatedBar }"
              v-tooltip.top-end="`$${protocol.totalLiquidated}`"
            >
              <span class="number solid-voice">
                ${{ formatNumber(protocol.totalLiquidated) }}
              </span>
            </span>
          </div>

          <IconWithChain
            v-if="protocol.icon"
            class="protocol-logo"
            :image="protocol.icon ? protocol.icon : '/images/icons/dapp.svg'"
            :id="protocol.chainId"
          />

          <DynamicIcon v-else icon="dapp" class="protocol-logo user" />
          <p class="solid-voice protocol-name">
            {{ protocol.name }}
          </p>
        </li>
      </template>
    </ul>
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.chart-grid {
  display: grid;
  margin-top: var(--space-3xl);

  gap: var(--space-s);
  position: relative;
}

.chart-actions {
  display: grid;
  gap: var(--space-s);
  align-content: start;

  order: 2;

  @media (min-width: 768px) {
    order: unset;

    :deep(.formkit-options) {
      display: flex;
      gap: var(--space-l);
    }
  }
}

h2 {
  text-align: center;
  grid-column: 1 / -1;
}

text-content {
  grid-column: 1 / span 3;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--space-3xl);
}

.protocol-logo {
  width: 30px;
  max-width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  justify-self: center;

  &.user {
    border-radius: unset;
  }
}

.legend {
  & > button {
    display: flex;
    gap: var(--space-xs);
    align-items: center;

    &.dimmed {
      filter: brightness(0.5) saturate(0.5);
    }
  }

  .legend-icon {
    aspect-ratio: 1/1;
    width: 24px;
    background: var(--background);
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
    hsla(160, 69%, 69%, 1),
    hsla(160, 69%, 0%, 1)
  );
}

.profits {
  --background: linear-gradient(
    to bottom,
    hsla(255, 34%, 54%, 0.5),
    hsla(255, 34%, 54%, 00)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(255, 34%, 70%, 1),
    hsla(255, 34%, 0%, 0)
  );
}

.incentives {
  --background: linear-gradient(
    to bottom,
    hsla(226, 100%, 50%, 0.3),
    hsla(226, 100%, 50%, 0)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(226, 100%, 70%, 1),
    hsla(226, 100%, 0%, 1)
  );
}

.liquidated {
  --background: linear-gradient(
    to bottom,
    hsla(0, 85%, 65%, 0.3),
    hsla(0, 85%, 65%, 0)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(0, 85%, 65%, 1),
    hsla(0, 85%, 0%, 1)
  );
}

ul.bars {
  display: grid;
  gap: var(--space-s);
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  //   border-left: var(--border-dark);

  @media (min-width: 1000px) {
    grid-column: 1 / -1;
    min-height: 500px;
  }
}

li {
  display: grid;
  gap: var(--space-m);
  align-content: end;

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
    font-size: var(--step--2);
    scale: 1.8;

    @media (max-width: 1170px) {
      scale: 1.3;
    }

    @media (max-width: 850px) {
      scale: unset;
    }
  }

  .bar {
    --grid-count: v-bind(gridCount);

    height: 100%;
    position: relative;
    display: grid;
    gap: var(--space-3xs);
    align-items: end;
    grid-template-columns: repeat(var(--grid-count), 1fr);
    isolation: isolate;

    transition: 0.2s ease-in-out;

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
      position: relative;
      background: var(--background);

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
        font-size: var(--step--1);
        color: var(--light-gray);

        left: 50%;
        top: calc(var(--space-l) * -1);
        transform: translateX(-50%);

        @media (max-width: 768px) {
          font-size: var(--step--1);
        }
      }
      &.liquidated {
        grid-column: span 1;
        height: calc(var(--bar-liquidated-height) * 1.5px);
      }

      &.totalSentToBuilderUSD {
        grid-column: span 1;
        height: calc(var(--bar-totalSentToBuilderUSD-height) * 1.5px);
      }

      &.profits {
        grid-column: span 1;
        height: calc(var(--bar-profits-height) * 1.5px);
      }

      &.incentives {
        grid-column: span 1;
        height: calc(var(--bar-incentives-height) * 1.5px);
      }
    }
  }
}
</style>
