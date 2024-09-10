<script setup>
/**
 * OEVInterfaceChart Component
 *
 * A dynamic chart component for visualizing OEV (Oracle Extractable Value) data across multiple protocols.
 *
 * @component
 *
 * @example
 * <OEVInterfaceChart />
 *
 * @features
 * - Displays bar charts for various OEV metrics (e.g., total liquidated, incentives, profits)
 * - Allows toggling visibility of different metrics through a legend
 * - Supports horizontal scrolling for mobile views
 * - Dynamically calculates bar heights based on maximum values
 * - Provides tooltips with exact values on hover
 * - Highlights user-added protocols
 * - Responsive design adapting to different screen sizes
 *
 * @computed
 * @property {Array} visibleProtocols - Filtered list of protocols to display
 * @property {Number} maxHeight - Maximum height value across all visible bars
 * @property {Number} gridCount - Number of visible bar types
 * @property {Number} protocolCount - Number of visible protocols
 *
 * @methods
 * @method getMaxValue - Calculates the maximum value for a given metric across all visible protocols
 * @method getColorByValue - Retrieves the color associated with a specific metric
 * @method barHeight - Calculates the height of a bar based on its value and the maximum value
 * @method handleButton - Handles horizontal scrolling of the chart on mobile views
 *
 * @notes
 * - Relies on the OEV store and Interface store for data and styling
 * - Uses custom icons and formatting utilities
 * - Implements auto-animate for smooth transitions
 * - Utilizes GSAP for scroll animations on mobile
 */

import formatNumber from "@/utils/formatNumber";

const ui = useInterfaceStore();
const colors = Object.values(ui.api3Colors);

const scrollPosition = ref(0);

const oev = useOEVStore();
// totalOevLostUSD
const visibleBars = ref(["totalLiquidated", "totalIncentiveUSD"]);

const barsList = ref(null);

const bars = [
  {
    label: "Blockspace Auction Bribes",
    value: "totalSentToBuilderUSD",
    color: colors[2],
  },
  {
    label: "Liquidator Profits",
    value: "totalProfitUSD",
    color: colors[3],
  },

  {
    label: "Potential OEV Lost",
    value: "totalIncentiveUSD",
    color: colors[1],
  },
  {
    label: "Total Liquidated",
    value: "totalLiquidated",
    color: colors[0],
  },


];

const visibleProtocols = computed(() => {
  const mapped = Object.values(oev.userSelectedProtocols).map((protocolSlug) =>
    oev.getProtocolBySlug(protocolSlug)
  );
  return mapped.filter((protocol) => protocol !== undefined);
});

const maxHeight = computed(() => {
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
    {
      isShown: visibleBars.value.includes("totalOevLostUSD"),
      value: getMaxValue("totalOevLostUSD"),
    },
  ];

  return Math.max(
    ...values.filter((value) => value.isShown).map((value) => value.value)
  );
});

const gridCount = computed(() => visibleBars.value.length);
const protocolCount = computed(() => visibleProtocols.value.length);

//

function getMaxValue(key) {
  return Math.max(...visibleProtocols.value.map((protocol) => protocol[key]));
}

function getColorByValue(value) {
  const bar = bars.find((bar) => bar.value === value);
  return bar ? bar.color : "transparent";
}

function barHeight(value) {
  let minHeight = 5; // Minimum height for visibility

  const maxHeightPixels = 350; // Maximum height in pixels
  const scaledHeight = (value / maxHeight.value) * maxHeightPixels;
  return Math.max(scaledHeight, minHeight);
}

let handleButton;
useGsap((gsap) => {
  handleButton = (direction) => {
    const carousel = barsList.value;
    scrollPosition.value = carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    const newScroll =
      direction > 0
        ? currentScroll + scrollPosition.value
        : currentScroll - scrollPosition.value;

    gsap.to(carousel, {
      scrollTo: {
        x: newScroll,
      },
    });
  };
});
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
            <div class="icon-option" :style="`--color: ${option.color}`">
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
    <ul class="bars" v-auto-animate ref="barsList">
      <template v-for="(protocol, i) in visibleProtocols" :key="protocol.slug">
        <li :class="{ userAdded: protocol.slug === 'userAdded' }">
          <div
            class="bar"
            :style="`
							 --bar-totalLiquidated-height: ${barHeight(protocol.totalLiquidated)}px;
							 --bar-totalSentToBuilderUSD-height: ${barHeight(
                 protocol.totalSentToBuilderUSD
               )}px;
							 --bar-totalProfitUSD-height: ${barHeight(protocol.totalProfitUSD)}px;
							 --bar-totalIncentiveUSD-height: ${barHeight(protocol.totalIncentiveUSD)}px;
							 --bar-totalOevLostUSD-height: ${barHeight(protocol.totalOevLostUSD)}px;



						 `"
          >
            <span
              v-for="bar in visibleBars"
              :key="bar"
              :class="bar"
              :style="`--color: ${getColorByValue(bar)}`"
              v-tooltip.top-end="`$${Number(protocol[bar]).toFixed(2)}`"
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
          <p class="calm-voice protocol-name">
            {{ protocol.name }}
          </p>
        </li>
      </template>
    </ul>
    <div class="actions">
      <button
        class="icon prev"
        @click="handleButton(-1)"
        :disabled="scrollPosition === 0"
      >
        <picture>
          <DynamicIcon icon="left" />
        </picture>
      </button>
      <button
        class="icon next"
        @click="handleButton(1)"
        :disabled="scrollPosition === 2"
      >
        <picture>
          <DynamicIcon icon="right" />
        </picture>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-grid {
  display: grid;
  margin-top: var(--space-l);

  gap: var(--space-s);
  position: relative;

  user-select: none;
}

.chart-actions {
  display: grid;
  gap: var(--space-s);
  align-content: start;

  :deep(.formkit-options) {
    @media (min-width: 768px) {
      display: flex;
      gap: var(--space-3xs);
      flex-wrap: wrap;

      & > * {
        flex: 1;
      }
    }
    @media (min-width: 1000px) {
      flex-wrap: unset;
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

  .formkit-label {
    white-space: nowrap;
  }

  .icon-option {
    padding-block: 0;
  }
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

.totalOevLostUSD {
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
    hsla(44, 85%, 65%, 0.3),
    hsla(44, 85%, 65%, 0)
  );

  --after-background: linear-gradient(
    to bottom,
    hsla(44, 85%, 65%, 1),
    hsla(44, 85%, 0%, 1)
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

ul.bars {
  display: grid;
  margin-bottom: 20px;
  gap: var(--space-m);
  grid-template-columns: repeat(v-bind("protocolCount"), 200px);
  overflow-x: scroll;
  min-height: 350px;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-column: 1 / -1;
    min-height: 500px;
    overflow-x: unset;
  }
}

li {
  display: grid;
  gap: var(--space-m);
  align-content: end;

  &.userAdded {
    filter: brightness(1.2);

    span.number,
    .protocol-name {
      color: var(--green) !important;
    }

    .bar::after {
      background: var(--green);
    }
  }

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
    transition: 0.2s ease-in-out;

 

    @media (max-width: 850px) {

      &:hover {
        translate: 0 12px;
      }
    }
  }

  .bar {
    --grid-count: v-bind(gridCount);

    height: 100%;
    position: relative;
    display: grid;
    gap: var(--space-xs);
    align-items: end;
    grid-template-columns: repeat(var(--grid-count), 1fr);
    isolation: isolate;

    transition: 0.2s ease-in-out;

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
      position: relative;

      background: linear-gradient(to bottom, var(--color), transparent);

      border: 1px solid;
      border-image: linear-gradient(
          180deg,
          color-mix(in hsl, var(--color), white 35%),
          color-mix(in hsl, var(--color), black 85%)
        )
        1;

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
      &.totalLiquidated {
        grid-column: span 1;
        height: var(--bar-totalLiquidated-height);
      }

      &.totalSentToBuilderUSD {
        grid-column: span 1;
        height: var(--bar-totalSentToBuilderUSD-height);
      }

      &.totalProfitUSD {
        grid-column: span 1;
        height: var(--bar-totalProfitUSD-height);
      }

      &.totalIncentiveUSD {
        grid-column: span 1;
        height: var(--bar-totalIncentiveUSD-height);
      }

      &.totalOevLostUSD {
        grid-column: span 1;
        height: var(--bar-totalOevLostUSD-height);
      }
    }
  }
}

.actions {
  justify-content: center;
  gap: var(--space-xl);

  picture {
    max-width: 10px;
    :deep(svg) {
      color: var(--green);
    }
  }

  @media (min-width: 1000px) {
    display: none;
  }
}
</style>
