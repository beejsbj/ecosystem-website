<script setup>
import { useStorage } from "@vueuse/core";

const userTvl = ref(0);
const barCount = ref(5);
const showOutput = ref(false);

const data = new Array(barCount.value).fill({}).map((bar) => {
  console.log(bar);
  const tvl = Math.floor(Math.random() * 100);

  return {
    tvl,
    withOEV: getOEV(tvl),
  };
});

const bars = ref(data);

function getOEV(tvl) {
  const oevRate = 0.31;
  return Number(tvl + tvl * oevRate).toFixed(0);
}

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
