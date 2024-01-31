<script setup>
import formatNumber from "@/utils/formatNumber";

definePageMeta({
  layout: "footer-less",
  title: "OEV",
  description:
    "The OEV Watchtower helps you understand the impact of the OEV Network on your protocol.",

  alias: ["/watchtower", "/oev-watchtower"],
});

// Fetch data from the content/oev-data which contains the json files
const oevRaw = await queryContent("oev-data").find();

// Import the OEV store and initialize it
const oev = useOEVStore();

// Compute the user's total liquidated value (tvl) and total savings using OEV
const userSaving = computed(() =>
  oev.getProtocolById("userAdded") === undefined
    ? 0
    : oev.getProtocolById("userAdded").totalSentToBuilderUSD
);

// Set the fetched OEV data to the OEV store
oev.setProtocols(oevRaw);
</script>

<template>
  <!-- Page Title component with heading and notice voice -->
  <PageTitle heading="OEV Watchtower">
    <p class="notice-voice">
      OEV Watchtower helps you understand how much you can capture with the OEV
      Network.
    </p>

    <!-- OEV Summary Cards component -->
    <OEVSummaryCards class="summary-cards" />

    <p class="whisper-voice disclamer">
      <!-- data starts frpm 2021 -->
      *All data is based on records from 2021 onwards.
    </p>
  </PageTitle>

  <!--  -->
  <SectionColumn>
    <LazyOEVInputForm />
  </SectionColumn>

  <SectionColumn inner-class="wide">
    <OEVInterfaceChart />
  </SectionColumn>

  <!-- displaying user's TVL and savings -->
  <SectionColumn class="user-tvl-text">
    <text-content>
      <p class="loud-voice">
        <span
          >With your TVL of
          <span class="gradient-text-color"
            >${{ formatNumber(oev.userTvl) }}</span
          >
          you would capture
          <span class="gradient-text-color"
            >${{ formatNumber(userSaving) }}</span
          >
          per year through the OEV Network**
        </span>
      </p>
      <p class="whisper-voice">
        **This is an estimate based on the current Liquidation rate of 5% of
        TVL.
      </p>
    </text-content>
  </SectionColumn>

  <SectionColumn inner-class="wide">
    <OEVProtocolChart />
  </SectionColumn>

  <!--  displaying a message about data verification -->
  <SectionColumn>
    <text-content>
      <p class="firm-voice">
        You can verify this data yourself by
        <NuxtLink
          class="text green"
          to="https://github.com/AamirAlam/aave-extract-mev-funds"
        >
          heading to our GitHub.
        </NuxtLink>
      </p>
    </text-content>
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column:not(.page-title)) {
  @media (min-width: 768px) {
    padding: var(--space-3xl) var(--space-s);
  }
}

:deep(h1) {
  text-align: center;
}

.page-title p {
  text-align: center;
}

text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  //   padding: var(--space-s);

  @media (min-width: 768px) {
    padding: var(--space-3xl);
  }

  .loud-voice {
    @media (max-width: 400px) {
      --font-size: var(--step-2);
    }
  }
}

.user-tvl-text {
  @supports (animation-timeline: view()) {
    text-content p span {
      background-repeat: no-repeat;
      background-size: 0 100%;
      animation: scroll-reveal linear forwards;
      animation-timeline: view() !important;

      animation-range-start: contain 10px !important;
      animation-range-end: contain 230px !important;

      &.gradient-text-color:nth-child(1) {
        animation-range-start: contain 170px !important;
        animation-range-end: contain 180px !important;
      }
      &.gradient-text-color:nth-child(2) {
        animation-range-start: contain 230px !important;
        animation-range-end: contain 240px !important;
      }

      &:not(.gradient-text-color) {
        color: hsla(0, 0%, 100%, 0.1) !important;
        background-image: var(--gradient-light);
        background-clip: text;
      }
    }
  }
}

@keyframes scroll-reveal {
  to {
    background-size: 100% 100%;
    scale: 1.1;
  }
}

.disclamer {
  margin-top: var(--space-2xs);
}
</style>
