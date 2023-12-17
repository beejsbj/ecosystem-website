<script setup>
//convert to object
const voices = ref([
  {
    name: "micro-voice",
  },
  {
    name: "whisper-voice",
  },
  {
    name: "calm-voice",
  },
  {
    name: "notice-voice",
  },
  {
    name: "firm-voice",
  },
  {
    name: "attention-voice",
  },
  {
    name: "teaser-voice",
  },
  {
    name: "loud-voice",
  },
  {
    name: "booming-voice",
  },
]);

function getFontSize() {
  voices.value.forEach((voice) => {
    const $voice = document.querySelector(`voice-card .${voice.name}`);
    voice.fontSize = window.getComputedStyle($voice).fontSize;
  });
}

onMounted(() => {
  getFontSize();
  window.addEventListener("resize", () => {
    getFontSize();
  });
});
</script>

<template>
  <div class="text-voices">
    <h2 class="attention-voice">Text Voices</h2>
    <ul>
      <li v-for="voice in voices">
        <voice-card :class="voice.name">
          <code>
            {{ voice.name }}
          </code>
          <p :class="voice.name">The font family is Inter.</p>
          <p :class="voice.name">
            The font size is <code>{{ voice.fontSize }}</code>
          </p>

          <p :class="voice.name">
            this is a <em>regular emphasis</em> sentence.
          </p>
          <p :class="voice.name">
            This is a <strong>strong emphasis</strong> sentence.
          </p>
          <p :class="voice.name">
            This is a
            <strong><em>strong and regular emphasis</em></strong> sentence.
          </p>
          <p :class="voice.name">
            This is a sentence with a <mark class="highlight">highlight </mark>.
          </p>
          <p :class="voice.name">
            these <a href="?page=style-guide#"> are links </a> in the paragraph.
          </p>
          <p :class="voice.name" class="wrap">
            This is a paragraph that should wrap to the next line. lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Donec a diam lectus.
            Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra
            nec consectetur ante hendrerit.
          </p>
          <p :class="voice.name" class="wrap">
            Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec
            ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Aenean ut gravida
            lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.
            Pellentesque auctor nisi id magna consequat sagittis. Curabitur
            dapibus enim sit amet elit pharetra tincidunt feugiat nisl
            imperdiet.
          </p>
        </voice-card>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  margin-top: var(--space-s);

  li + li {
    padding-top: var(--space-s);
    border-top: var(--border-highlight);
  }

  P + p {
    margin-top: var(--space-2xs);
  }

  p.wrap {
    text-wrap: balance;
  }

  voice-card.booming-voice {
    display: none;

    @media (min-width: 450px) {
      display: block;
    }
  }
}
</style>
