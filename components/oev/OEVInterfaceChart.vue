<script setup>
import formatNumber from "@/utils/formatNumber";

const oev = useOEVStore();

const visibleBars = ref(["totalLiquidated", "totalProfitUSD"]);

const bars = [
  {
    label: "Total Liquidated",
    value: "totalLiquidated",
    color: "hsla(4, 68%, 15%, 1.00)",
  },
  {
    label: "Potential OEV Lost",
    value: "totalProfitUSD",
    color: "hsla(230, 53%, 32%, 1.00)",
    help: "(Blockspace auction bribes + Liquidated totalProfitUSD)",
  },
  //   {
  //     label: "Total Sent to Builder",
  //     value: "totalSentToBuilderUSD",
  //     color: "hsla(354, 98%, 24%, 1)",
  //     attrs: {
  //       label: "Total Sent to Builder",
  //     },
  //   },
  //   {
  //     label: "Total Incentives",
  //     value: "totalIncentiveUSD",
  //     color: "hsla(226, 100%, 70%, 1)",
  //   },
];

const visibleProtocols = computed(() => {
  const mapped = Object.values(oev.userSelectedProtocols).map((protocolSlug) =>
    oev.getProtocolBySlug(protocolSlug)
  );
  return mapped.filter((protocol) => protocol !== undefined);
});

const maxHeight = computed(() => {
  //   sort the values by highest
  const values = [
    {
      isShown: visibleBars.value.includes("totalSentToBuilderUSD"),
      value: getMaxValue("totalSentToBuilderUSD"),
    },
    {
      isShown: visibleBars.value.includes("totalProfitUSD"),
      value: getMaxValue("totalProfitUSD"),
    },
    {
      isShown: visibleBars.value.includes("totalIncentiveUSD"),
      value: getMaxValue("totalIncentiveUSD"),
    },
    {
      isShown: visibleBars.value.includes("totalLiquidated"),
      value: getMaxValue("totalLiquidated"),
    },
  ];

  //based on what is showm, get the highest value, excluding the hidden protocols
  return Math.max(
    ...values.filter((value) => value.isShown).map((value) => value.value)
  );
});

const gridCount = computed(() => visibleBars.value.length);

//

function getMaxValue(key) {
  return Math.max(...visibleProtocols.value.map((protocol) => protocol[key]));
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
							 --bar-totalLiquidated-height: ${barHeight(protocol.totalLiquidated)};
							 --bar-totalSentToBuilderUSD-height: ${barHeight(
                 protocol.totalSentToBuilderUSD
               )};
							 --bar-totalProfitUSD-height: ${barHeight(protocol.totalProfitUSD)};
							 --bar-totalIncentiveUSD-height: ${barHeight(protocol.totalIncentiveUSD)};


						 `"
          >
            <span
              v-for="bar in visibleBars"
              :key="bar"
              :class="bar"
              v-tooltip.top-end="`$${protocol[bar]}`"
            >
              <span class="number solid-voice">
                ${{ formatNumber(protocol[bar]) }}
              </span>
            </span>
          </div>

          <DoubleIcon
            v-if="protocol.icon"
            :icon1="{
              chainId: protocol.chainId,
            }"
            :icon2="{
              src: protocol.icon,
            }"
          />

          <DynamicIcon v-else icon="dapp" class="protocol-logo user" />
          <p class="solid-voice protocol-name">
            {{ protocol.name }}
          </p>
        </li>
      </template>
    </ul>
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

.protocol-list-wrapper {
  order: 2;

  @media (min-width: 768px) {
    order: unset;
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
    width: 18px;
    background: var(--background);
  }

  .formkit-label {
    white-space: nowrap;
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

.totalProfitUSD {
  --background: linear-gradient(
    to bottom,

    hsla(230, 53%, 32%, 0.5),
    hsla(230, 53%, 32%, 00)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(230, 53%, 70%, 1),
    hsla(230, 53%, 0%, 0)
  );
}

.totalIncentiveUSD {
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

.totalLiquidated {
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
  margin-bottom: 20px;
  gap: var(--space-m);
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

  & > .protocol-name {
    text-align: center;
    white-space: nowrap;
    font-size: var(--step--2);
    scale: 1.8;
    transition: 0.2s ease-in-out;

    @media (max-width: 1170px) {
      scale: 1.3;
    }

    @media (max-width: 850px) {
      scale: unset;

      &:hover {
        scale: 1.3;
        translate: 0 12px;
      }
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

    /*  totalSentToBuilderUSD and totalLiquidated halves of the bar*/
    & > span {
      transition: 0.2s ease-in-out;
      border-radius: calc(var(--corners) / 2);
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
          rotate: 25deg;
        }
      }
      &.totalLiquidated {
        grid-column: span 1;
        height: calc(var(--bar-totalLiquidated-height) * 1.5px);
      }

      &.totalSentToBuilderUSD {
        grid-column: span 1;
        height: calc(var(--bar-totalSentToBuilderUSD-height) * 1.5px);
      }

      &.totalProfitUSD {
        grid-column: span 1;
        height: calc(var(--bar-totalProfitUSD-height) * 1.5px);
      }

      &.totalIncentiveUSD {
        grid-column: span 1;
        height: calc(var(--bar-totalIncentiveUSD-height) * 1.5px);
      }
    }
  }
}
</style>
