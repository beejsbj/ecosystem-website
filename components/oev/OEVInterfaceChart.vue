<script setup>
const oev = useOEVStore();

// Calculate the relative heights
const maxLiquidated = oev.getTotals().totalLiquidated;

const maxHeight = computed(() => {
  //check if protocols have hide, use the protocol with the highest value
  const protocols = oev.protocols.filter((protocol) => !protocol.hide);
  const max = Math.max(
    ...protocols.map((protocol) => protocol.totalLiquidated)
  );
  return max;
});
</script>

<template>
  <div class="chart-container bars">
    <div class="legend">
      <div>
        <div class="liquidated"></div>
        <p class="whisper-voice">Protocol TVL</p>
      </div>
      <div>
        <div class="withOEV"></div>
        <p class="whisper-voice">Saving with OEV</p>
      </div>
    </div>
    <ul class="bars" v-auto-animate>
      <template v-for="(protocol, i) in oev.protocols">
        <li v-if="!protocol.hide" :key="protocol.id">
          <div
            class="bar"
            :class="{ userAdded: protocol.id === 'userAdded' }"
            :style="`
					  --bar-liquidated-height: ${(protocol.totalLiquidated / maxHeight) * 150};
					  --bar-withOEV-height: ${(protocol.withOEV / maxHeight) * 150};
				  `"
          >
            <span class="liquidated">
              <span class="number whisper-voice">
                {{ protocol.totalLiquidated.toFixed(2) }}
              </span>
            </span>
            <span class="withOEV">
              <span class="number whisper-voice">
                {{ protocol.withOEV.toFixed(2) }}
              </span>
            </span>
          </div>
          <picture class="protocol-logo" v-if="protocol.icon">
            <NuxtImg :src="protocol.icon" :alt="protocol.name" loading="lazy" />
          </picture>

          <DynamicIcon v-else icon="dapp" class="protocol-logo user" />
          <p class="whisper-voice">{{ protocol.name }}</p>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
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
  background: var(--paper);

  & > div {
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;

    & > div {
      aspect-ratio: 1/1;
      width: 20px;
      background: var(--background);
    }
  }
}

.withOEV {
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  @media (min-width: 1000px) {
    grid-column: 1 / -1;
  }
}

li {
  display: grid;
  gap: var(--space-3xs);
  //   align-items: center;

  & > :is(p, picture) {
    justify-self: center;
  }

  .bar {
    height: 400px;
    position: relative;
    display: grid;
    gap: var(--space-3xs);
    grid-template-columns: 1fr 1fr;

    transition: 0.2s ease-in-out;

    &.userAdded {
      filter: brightness(3) saturate(3);
      // width: 100px;
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

    /*  withOEV and liquidated halves of the bar*/
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
        --gap: -1.1rem;
        //   left: 100%;
        top: var(--gap);
        //   transform: translateX(-50%);
      }
      &.liquidated {
        grid-column: 1 / span 1;

        height: calc(var(--bar-liquidated-height) * 2px);
        .number {
          left: -0%;
        }
      }

      &.withOEV {
        grid-column: 2 / span 1;

        height: calc(var(--bar-withOEV-height) * 2px);
      }
    }
  }
}
</style>
