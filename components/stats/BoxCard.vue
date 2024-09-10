<script setup>

/**
 * BoxCard Component
 *
 * A versatile card component that can display an image, teaser text, and/or solid text in either a grid or flex layout.
 *
 * @component
 *
 * @example
 * <BoxCard teaser="Teaser Text" solid="Solid Text" layout="grid">
 *   <img src="custom-image.jpg" alt="Custom Image" />
 * </BoxCard>
 *
 * @props
 * @prop {String} teaser - Teaser text to display in the card
 * @prop {String} solid - Solid text to display in the card
 * @prop {Boolean} hideImage - If true, hides the default image
 * @prop {String} layout - Defines the layout of the card ('grid' or 'flex')
 *
 * @features
 * - Flexible layout options (grid or flex)
 * - Optional image display
 * - Customizable teaser and solid text
 * - Responsive design with CSS variables for sizing
 * - Cursor pointer indicating interactivity
 *
 * @notes
 * - Default image is sourced from '@/assets/images/background/square.jpg'
 * - The component is designed to be interactive (cursor: pointer)
 * - 'border-gradient-blue' class applies a filter to child elements
 */



const props = defineProps(["teaser", "solid", "hideImage", "layout"]);
</script>

<template>
  <div class="box-card" :class="props.layout ?? 'grid'">
    <slot>
      <picture v-if="!props.hideImage">
        <img src="@/assets/images/background/square.jpg" alt="" />
      </picture>
    </slot>

    <h4 class="teaser-voice" v-if="props.teaser">
      {{ props.teaser }}
    </h4>

    <h5 class="solid-voice" v-if="props.solid">
      {{ props.solid }}
    </h5>
  </div>
</template>

<style scoped lang="scss">
.box-card {
  gap: 0.5rem;
  border-radius: var(--corners);
  padding: 2rem 1rem;
  padding-top: 1.25rem;
  text-align: center;
  position: relative;

  cursor: pointer;

  &.border-gradient-blue > *:not(picture) {
    filter: hue-rotate(70deg);
  }
}

.box-card.grid {
  display: grid;
}

.box-card.flex {
  display: flex;
  align-items: center;
  justify-content: start;
  picture {
    width: 50px;
    border-radius: 50%;
    flex-shrink: 0;
  }
}

.box-card .teaser-voice {
  font-size: var(--step--1);
  text-align: start;
}

.box-card .solid-voice {
  font-size: var(--step--1);
}
</style>
