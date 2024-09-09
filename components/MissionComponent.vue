<script setup>
/**
 * MissionComponent
 *
 * Displays API3's mission and key features in a series of graphical text sections.
 *
 * @component
 *
 * @example
 * <MissionComponent />
 *
 * @features
 * - Presents three key aspects of API3: First-Party Oracle Services, DAO Governance, and Developer Experience
 * - Uses GraphicText component to display each feature with title, description, and image
 * - Alternates layout direction for visual variety
 * - Includes custom SVG components for each section
 */

const content = ref([
  {
    title: "First-Party Oracle Services",
    description:
      "API3 provides secure and reliable first-party data feeds that establish seamless connections between API providers and oracle smart contracts, thereby eliminating the need for third-party intermediaries and bolstering the overall integrity of the data.",

    image: "/images/icons/datafeed-first-party.svg",
  },
  {
    title: "DAO Governed",
    description:
      "API3 strongly values decentralization, a foundational principle in the Web3 ecosystem. Its governance relies on a decentralized autonomous organization (DAO), which gives token holders the authority to make decisions and actively shape the platform's future.",
    image: "/images/dao-goverend.svg",
  },
  {
    title: "Developer Experience",
    description:
      "API3 is committed to an open-source, democratized web that empowers individuals from all walks of life. We foster this through a comprehensive ecosystem, designed to equip developers with the tools, resources, and support they need to build exceptional dApps.",
    image: "/images/dev-experience.svg",
  },
]);
</script>

<template>
  <SectionColumn v-for="(card, index) in content" class="mission-section">
    <GraphicText
      :heading="card.title"
      :paragraph="card.description"
      :class="index % 2 !== 0 ? 'reverse' : ''"
      :image="card.image"
    >
      <DatafeedFirstParty v-if="index == 0" />
      <DaoGoverned v-if="index == 1" />
      <DevExperience v-if="index == 2" />
    </GraphicText>
  </SectionColumn>
</template>

<style scoped>
:deep(inner-column) {
  padding: var(--space-s) var(--space-s);
}

.mission-section {
  opacity: 1;
}
</style>
