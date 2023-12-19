<script setup>
import { useStorage } from "@vueuse/core";

// get data from jsons for each protocols
const aaveV2Eth = (await queryContent("/aave-v2-eth").findOne()).body;
const aaveV3Eth = (await queryContent("/aave-v3-eth").findOne()).body;
const maker = (await queryContent("/maker").findOne()).body;
const compoundV3Mainnet = (await queryContent("/compound-v3-mainnet").findOne())
  .body;
const inverseFinanceEth = (await queryContent("/inverse-finance-eth").findOne())
  .body;

const protocols = ref({
  // Aave V2 Ethereum
  aaveV2Eth: {
    id: "aaveV2Eth",
    name: "Aave V2 Etherum",
    dataMonthly: dataToMonthly(aaveV2Eth),
    data: aaveV2Eth,
  },

  //   Aave V3 Ethereum
  aaveV3Eth: {
    id: "aaveV3Eth",
    name: "Aave V3 Etherum",
    dataMonthly: dataToMonthly(aaveV3Eth),
    data: aaveV3Eth,
  },

  // Maker
  maker: {
    id: "maker",
    name: "Maker",
    dataMonthly: dataToMonthly(maker),
    data: maker,
  },

  // Compound V3 Mainnet
  compoundV3Mainnet: {
    id: "compoundV3Mainnet",
    name: "Compound V3 Mainnet",
    dataMonthly: dataToMonthly(compoundV3Mainnet),
    data: compoundV3Mainnet,
  },

  // Inverse Finance Ethereum
  inverseFinanceEth: {
    id: "inverseFinanceEth",
    name: "Inverse Finance Etherum",
    dataMonthly: dataToMonthly(inverseFinanceEth),
    data: inverseFinanceEth,
  },

  //   totals
  total: {
    id: "total",
    name: "Total",
    dataMonthly: dataToMonthly([
      ...aaveV2Eth,
      ...aaveV3Eth,
      ...maker,
      ...compoundV3Mainnet,
      ...inverseFinanceEth,
    ]),
    data: [
      ...aaveV2Eth,
      ...aaveV3Eth,
      ...maker,
      ...compoundV3Mainnet,
      ...inverseFinanceEth,
    ],
  },
});

// set totals for each protocol, protocols is an object
protocols.value.aaveV2Eth.totalLiquidated = getTotalLiquidated(
  protocols.value.aaveV2Eth
);
protocols.value.aaveV2Eth.totalSentToBuilder = getTotalSentToBuilder(
  protocols.value.aaveV2Eth
);

protocols.value.aaveV3Eth.totalLiquidated = getTotalLiquidated(
  protocols.value.aaveV3Eth
);
protocols.value.aaveV3Eth.totalSentToBuilder = getTotalSentToBuilder(
  protocols.value.aaveV3Eth
);

protocols.value.maker.totalLiquidated = getTotalLiquidated(
  protocols.value.maker
);
protocols.value.maker.totalSentToBuilder = getTotalSentToBuilder(
  protocols.value.maker
);

protocols.value.compoundV3Mainnet.totalLiquidated = getTotalLiquidated(
  protocols.value.compoundV3Mainnet
);
protocols.value.compoundV3Mainnet.totalSentToBuilder = getTotalSentToBuilder(
  protocols.value.compoundV3Mainnet
);

protocols.value.inverseFinanceEth.totalLiquidated = getTotalLiquidated(
  protocols.value.inverseFinanceEth
);
protocols.value.inverseFinanceEth.totalSentToBuilder = getTotalSentToBuilder(
  protocols.value.inverseFinanceEth
);

protocols.value.total.totalLiquidated = getTotalLiquidated(
  protocols.value.total
);
protocols.value.total.totalSentToBuilder = getTotalSentToBuilder(
  protocols.value.total
);

// set oev rates for each protocol, protocols is an object
protocols.value.aaveV2Eth.oevRate = getOEVRate(protocols.value.aaveV2Eth);
protocols.value.aaveV3Eth.oevRate = getOEVRate(protocols.value.aaveV3Eth);
protocols.value.maker.oevRate = getOEVRate(protocols.value.maker);
protocols.value.compoundV3Mainnet.oevRate = getOEVRate(
  protocols.value.compoundV3Mainnet
);
protocols.value.inverseFinanceEth.oevRate = getOEVRate(
  protocols.value.inverseFinanceEth
);
protocols.value.total.oevRate = getOEVRate(protocols.value.total);

//

// variables
const userTvl = ref(0);
const barCount = ref(5);
const showOutput = ref(false);
const selectedDataset = ref("aaveV2Eth");
const oevRatio = ref(0);

// average of sent to builder

// data manipulate
const parsed = computed(() => {
  const protocol = protocols.value[selectedDataset.value];

  const dataLiquidated = protocol.data.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.totalLiquidated,
    };
  });

  const dataSentToBuilder = protocol.data.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.totalSentToBuilder,
    };
  });

  const dataOEV = protocol.data.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: withOEV(dataPoint),
    };
  });

  return {
    labels: dataLiquidated.map((item) => item.x.toDateString().slice(4, 10)),
    datasets: [
      {
        data: dataLiquidated,
        label: "Total Liquidated",
      },
      {
        data: dataSentToBuilder,
        label: "Total Sent to Builder",
      },
      {
        data: dataOEV,
        label: "With OEV",
      },
    ],
  };
});

//
const fakeData = {
  metadata: {
    title: "Total QRNG Fulfilments",
    chartColor: "blue",
    x: {
      title: "Date",
    },
    y: {
      title: "totalLiquidated",
    },
  },

  options: {},
};

const data = new Array(barCount.value).fill({}).map((bar) => {
  const tvl = Math.floor(Math.random() * 100);

  return {
    tvl,
    withOEV: getOEV(tvl),
  };
});

const bars = ref(data);

const inputOptions = [
  {
    label: "Aave V2 Ethereum",
    value: "aaveV2Eth",
  },
  {
    label: "Aave V3 Ethereum",
    value: "aaveV3Eth",
  },
  {
    label: "Maker",
    value: "maker",
  },
  {
    label: "Compound V3 Mainnet",
    value: "compoundV3Mainnet",
  },
  {
    label: "Inverse Finance Ethereum",
    value: "inverseFinanceEth",
  },
];

// helpers
function getOEV(tvl) {
  return Number(tvl + tvl * oevRatio.value).toFixed(0);
}

function getOEVRate(protocol) {
  return Number(protocol.totalSentToBuilder) / Number(protocol.totalLiquidated);
}
function withOEV(protocol) {
  return Number(protocol.totalLiquidated) - Number(protocol.totalSentToBuilder);
}

function getTotalLiquidated(protocol) {
  return protocol.data.reduce(
    (total, dataPoint) => Number(total) + Number(dataPoint.totalLiquidated),
    0
  );
}
function getTotalSentToBuilder(protocol) {
  return protocol.data.reduce(
    (total, dataPoint) => Number(total) + Number(dataPoint.totalSentToBuilder),
    0
  );
}
function dataToMonthly(array) {
  const monthly = {};

  array.forEach((dataPoint, i) => {
    const date = new Date(dataPoint.date);
    const month = date.getMonth();
    const year = date.getFullYear();

    const key = `${month}-${year}`;

    if (monthly[key]) {
      monthly[key].totalLiquidated += Number(dataPoint.totalLiquidated);
      monthly[key].totalSentToBuilder += Number(dataPoint.totalSentToBuilder);
    } else {
      monthly[key] = {
        totalLiquidated: Number(dataPoint.totalLiquidated),
        totalSentToBuilder: Number(dataPoint.totalSentToBuilder),
        month: month,
        year: year,
        id: key,
      };
    }
  });

  return Object.values(monthly);
}

//
function addToChart(tvl) {
  const addedProtocol = {
    tvl: tvl.value,
    withOEV: getOEV(tvl.value),
  };
  bars.value.push(addedProtocol);
}

function buttonHandle(event) {
  addToChart(userTvl);
  userTvl.value = 0;
  showOutput.value = true;
}
</script>

<template>
  <main>
    <pre>
		<!-- {{ protocols }} -->

	 </pre>
    <PageTitle heading="Watch Tower" />

    <SectionColumn class="chart-section" inner-class="wide">
      <div class="legend">
        <div>
          <div class="negative"></div>
          <p class="whisper-voice">Protocol TVL</p>
        </div>
        <div>
          <div class="positive"></div>
          <p class="whisper-voice">With OEV</p>
        </div>
      </div>
      <ul class="bars" v-auto-animate>
        <template v-for="(bar, i) in bars">
          <li>
            <div
              class="bar"
              :style="`
					--bar-negative-height: ${bar.tvl};
					--bar-positive-height: ${bar.withOEV};
				`"
            >
              <span class="negative">
                <span class="number whisper-voice"> {{ bar.tvl }}</span>
              </span>
              <span class="positive">
                <span class="number whisper-voice"> {{ bar.withOEV }}</span>
              </span>
            </div>
            <picture class="protocol-logo">
              <img src="@/assets/images/background/square.jpg" alt="" />
            </picture>
          </li>
        </template>
      </ul>
      <form v-auto-animate>
        <output v-auto-animate v-if="userTvl">
          <p class="loud-voice" v-if="true">${{ getOEV(userTvl) }}</p>
          <p class="whisper-voice" v-if="true">
            Money Earned if OEV Network is integrated
          </p>
        </output>
        <form-field>
          <FormKit
            type="number"
            label="How much TVL is in Protocol?"
            label-class="$reset calm-voice"
            name="tvl"
            placeholder="tvl"
            id="tvl"
            v-model.number="userTvl"
          />
        </form-field>
        <div class="actions">
          <button class="button whisper-voice" @click.prevent="buttonHandle">
            Add
          </button>
        </div>
      </form>
    </SectionColumn>
    <SectionColumn class="single-chart">
      <FormKit
        type="select"
        v-model="selectedDataset"
        :options="inputOptions"
      />
      <LineChart
        :data="parsed"
        :options="fakeData.options"
        :metadata="fakeData.metadata"
      />
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss">
.chart-section :deep(inner-column) {
  display: grid;
  gap: var(--space-m);

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

form {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  align-content: center;
  align-items: end;
  align-self: end;

  output {
    grid-column: span 2;
  }

  :deep(.formkit-wrapper) {
    max-width: unset !important;
  }
}

.protocol-logo {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
}

.legend {
  display: grid;
  gap: var(--space-2xs);
  padding: var(--space-m);
  background: var(--paper);

  & > div {
    display: grid;
    grid-template-columns: 50px 100px;
    align-items: center;

    & > div {
      aspect-ratio: 1/1;
      width: 20px;
      background: var(--background);
    }
  }
}

.positive {
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

.negative {
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
.bars {
  display: grid;
  gap: var(--space-s);
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));

  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
  }
}

li {
  display: grid;
  //   grid-template-rows: 0.8fr 0.2fr;
  gap: var(--space-s);

  justify-content: center;

  .bar {
    height: 350px;
    position: relative;
    display: grid;
    gap: var(--space-3xs);
    grid-template-columns: 1fr 1fr;
    //  overflow: hidden;

    transition: 0.2s ease-in-out;

    //  center seperator line
    &:after {
      content: "";
      position: absolute;
      bottom: 0%;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--gray);
    }

    //  positive and negative halves of the bar
    & > span {
      transition: 0.2s ease-in-out;
      border-radius: var(--corners);
      position: absolute;
      left: 1px;
      right: 1px;
      background: var(--background);
      bottom: 0%;

      //styling to make the gradient border
      &::before {
        content: "";
        border-radius: inherit;
        position: absolute;
        inset: 0px;
        background: black; //!important
        z-index: -1;
      }

      //creates the gradient border
      &::after {
        content: "";
        border-radius: inherit;
        position: absolute;
        inset: -1px;

        background: var(--after-background);
        z-index: -2;
      }

      //hovering number value
      .number {
        text-align: center;
        position: absolute;
        --gap: -1.1rem;
        left: 50%;
        top: var(--gap);
        transform: translateX(-50%);
      }
    }

    .positive {
      grid-column: 2 / span 1;

      height: calc(var(--bar-positive-height) * 2px);
    }

    .negative {
      grid-column: 1 / span 1;

      height: calc(var(--bar-negative-height) * 2px);
    }
  }
}
</style>
