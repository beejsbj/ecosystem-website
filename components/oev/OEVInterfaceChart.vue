<script setup>
const props = defineProps(["protocols"]);

// variables
const userTvl = ref(0);
const barCount = ref(2);
const showOutput = ref(false);
const userAdded = ref(0);

// Calculate the relative heights
let maxLiquidated = props.protocols.total.totalLiquidated;
let maxWithOEV = props.protocols.total.withOEV;
let maxOverall = Math.max(maxLiquidated, maxWithOEV);
//

function addToChart(totalLiquidated) {
  props.protocols[`userAdded-${userAdded.value}`] = {
    totalLiquidated,
    withOEV: totalLiquidated * props.protocols.total.oevRate,
    name: `User Added ${userAdded.value}`,
    //  hide: true,
  };

  userAdded.value++;
}

function buttonHandle(event) {
  const tvl = userTvl.value;
  addToChart(tvl);
  userTvl.value = 0;
  showOutput.value = true;
}

//
</script>

<template>
  <SectionColumn class="chart-section" inner-class="wide">
    <div class="legend">
      <div>
        <div class="liquidated"></div>
        <p class="whisper-voice">Protocol TVL</p>
      </div>
      <div>
        <div class="withOEV"></div>
        <p class="whisper-voice">With OEV</p>
      </div>
    </div>
    <ul class="bars" v-auto-animate>
      <template v-for="(protocol, i) in protocols">
        <li v-if="!protocol.hide">
          <div
            class="bar"
            :style="`
					--bar-liquidated-height: ${(protocol.totalLiquidated / maxOverall) * 200};
					--bar-withOEV-height: ${(protocol.withOEV / maxOverall) * 200};
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
          <picture class="protocol-logo">
            <img src="@/assets/images/background/square.jpg" alt="" />
          </picture>
          <p class="whisper-voice">{{ protocol.name }}</p>
        </li>
      </template>
    </ul>
    <form v-auto-animate>
      <output v-auto-animate v-if="userTvl">
        <p class="loud-voice" v-if="true">
          ${{ (userTvl * protocols.total.oevRate).toFixed(2) }}
        </p>
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
          :max="maxLiquidated"
          :validation="`max: ${maxLiquidated}`"
          validation-label="TVL"
          :show-validation="showOutput"
        />
      </form-field>
      <div class="actions">
        <button class="button whisper-voice" @click.prevent="buttonHandle">
          Add
        </button>
      </div>
    </form>
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  display: grid;
  gap: var(--space-m);
  padding: var(--space-3xl) var(--space-s);

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

    //  withOEV and liquidated halves of the bar
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

    .withOEV {
      grid-column: 2 / span 1;

      height: calc(var(--bar-withOEV-height) * 2px);
    }

    .liquidated {
      grid-column: 1 / span 1;

      height: calc(var(--bar-liquidated-height) * 2px);
    }
  }
}
</style>
