<script setup>
const bars = ref([
  {
    positive: 50,
    negative: 50,
  },
  {
    positive: 60,
    negative: 40,
  },
  {
    positive: 70,
    negative: 30,
  },

  {
    positive: 0,
    negative: 100,
  },
  {
    positive: 10,
    negative: 90,
  },
  {
    positive: 20,
    negative: 80,
  },
  {
    positive: 30,
    negative: 70,
  },
  {
    positive: 40,
    negative: 60,
  },
  {
    positive: 50,
    negative: 50,
  },
  {
    positive: 100,
    negative: 0,
  },
]);

const randomize = () => {
  bars.value = bars.value.map((bar) => {
    const positive = Math.floor(Math.random() * 100);
    const negative = Math.floor(Math.random() * 100);
    return { positive, negative };
  });
};
</script>

<template>
  <main>
    <PageTitle heading="Watch Tower" />

    <SectionColumn>
      <button class="button" @click="randomize">Randomize</button>
      <ul class="bars">
        <li class="bar" v-for="bar in bars">
          <div
            class="bar"
            :style="`
					--bar-positive-height: ${bar.positive};
					--bar-negative-height: ${bar.negative};
				`"
          >
            <span class="positive">
              <span class="number whisper-voice"> {{ bar.positive }}</span>
            </span>
            <span class="negative">
              <span class="number whisper-voice"> {{ bar.negative }}</span>
            </span>
          </div>
          <picture>
            <img src="@/assets/images/background/square.jpg" alt="" />
          </picture>
        </li>
      </ul>
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss">
.bars {
  display: grid;
  gap: var(--space-m);
  grid-template-columns: repeat(10, 1fr);
}

li {
  display: grid;
  grid-template-rows: 0.8fr 0.2fr;
  gap: var(--space-s);

  justify-content: center;

  .bar {
    height: 500px;
    position: relative;
    display: grid;
    overflow: hidden;

    transition: 0.2s ease-in-out;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--gray);
    }

    & > span {
      transition: 0.2s ease-in-out;
      border-radius: var(--corners);
      position: absolute;
      width: 100%;
    }

    .positive {
      background: linear-gradient(
        to bottom,
        hsla(160, 65%, 69%, 0.5),
        hsla(160, 65%, 69%, 0)
      );
      bottom: 50%;
      height: calc(var(--bar-positive-height) * 2px);

      .number {
        text-align: center;
        position: absolute;
        top: -1rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .negative {
      background: linear-gradient(
        to top,
        hsla(255, 34%, 54%, 0.5),
        hsla(255, 34%, 54%, 00)
      );
      top: 50%;
      height: calc(var(--bar-negative-height) * 2px);

      .number {
        text-align: center;
        position: absolute;
        bottom: -1rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  picture {
    border-radius: 50%;
    max-width: 50px;
    aspect-ratio: 1;
  }
}
</style>
