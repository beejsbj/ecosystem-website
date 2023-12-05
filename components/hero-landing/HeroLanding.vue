<script setup>
// const content = await queryContent("/home").findOne().heroLanding; #todo
</script>

<template>
  <SectionColumn class="hero-landing-section">
    <hero-landing>
      <text-content>
        <h1 class="page-title loud-voice">
          Connecting the <span>First-Party</span> Oracle Ecosystem
        </h1>

        <p class="calm-voice">
          Welcome to the API3 ecosystem a space for blockchain enthusiasts,
          developers, and visionaries from across the globe using API3 data
          feeds.
        </p>

        <button class="button" @click="navigateTo('/ecosystem')">
          Join The Ecosystem
        </button>
      </text-content>
      <HeroCards />
    </hero-landing>
    <picture class="curves-decoration-2">
      <CurvesDecoration2 />
    </picture>
  </SectionColumn>
</template>

<style scoped lang="scss">
.hero-landing-section {
  position: relative;
  overflow-x: hidden;

  picture.curves-decoration-2 {
    position: absolute;
    top: 270px;
    left: 50%;
    transform: translate(-50%, -50%) scaleY(2);

    width: 1000px;
    z-index: -10;

    @media (min-width: 768px) {
      top: 200px;
      width: 1600px;
      transform: translate(-50%, -50%) scaleY(0.9);
    }

    @media (min-width: 1600px) {
      top: 250px;

      width: 90vw;
      transform: translate(-50%, -50%) scaleX(2);
    }

    @media (min-width: 2000px) {
      top: 400px;

      width: 90vw;
      transform: translate(-50%, -50%) scaleX(2);
    }

    //  display: none;
  }
}

hero-landing {
  //   opacity: 0;
  //   height: 80vh;
  display: grid;
  align-content: center;
  padding: var(--space-m) 0;

  gap: var(--space-2xl);

  text-content {
    display: grid;
    gap: var(--space-s);
    padding: var(--space-s);
    text-align: center;
    justify-items: center;

    .page-title {
      text-wrap: balance;

      @media (max-width: 768px) {
        --font-size: var(--step-2);
      }

      span {
        white-space: nowrap;
      }
    }

    .button {
      margin-top: var(--space-m);
    }
  }
}
</style>
