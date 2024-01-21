<script setup>
const socials = ref([
  {
    name: "Twitter",
    link: "https://twitter.com/api3dao",
    icon: "Twitter",
  },
  {
    name: "Discord",
    link: "https://discord.com/invite/qnRrcfnm5W",
    icon: "Discord",
  },
  {
    name: "Reddit",
    link: "https://www.reddit.com/r/API3/",
    icon: "Reddit",
  },
  {
    name: "Telegram",
    link: "https://t.me/API3DAO",
    icon: "Telegram",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/api3",
    icon: "Linkedin",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/@API3DAO",
    icon: "YouTube",
  },
  {
    name: "Github",
    link: "https://github.com/api3dao",
    icon: "Github",
  },
]);

const footerLinks = [
  {
    title: "For Developers",
    links: [
      {
        label: "Documentation",
        path: "https://api3.org/goto/docs?source=ao-menu",
        external: true,
      },
      {
        label: "Github",
        path: "https://github.com/API3DAO",
        external: true,
      },
      {
        label: "API3 Market",
        path: "https://market.api3.org/dapis",
        external: true,
      },
      // Add more links here
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Airnode", external: true, path: "https://api3.org/airnode" },
      { label: "Data feeds", external: true, path: "https://api3.org/dapis" },
      { label: "OEV", external: true, path: "https://api3.org/oev" },
      { label: "QRNG", external: true, path: "https://api3.org/QRNG" },
      // Add more links here
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Affiliate Program",
        path: "/affiliate-program",
      },
      {
        label: "Guides",
        path: "https://docs.api3.org/guides/",
        external: true,
      },
      {
        label: "Articles",
        path: "https://api3.org/goto/medium?source=ao-menu",
        external: true,
      },
      {
        label: "QRNG Cheatsheet",
        path: "/resources/hacker-cheatsheet",
      },
      // Add more links here
    ],
  },
  {
    title: "Participate",
    links: [
      { label: "DAO", path: "https://api3.org/dao", external: true },
      {
        label: "Open Positions",
        path: "https://api3.org/positions/Core-Tech-Team-Positions",
        external: true,
      },
      // Add more links here
    ],
  },
  {
    title: "Whitepaper",
    links: [
      {
        label: "English",
        path: "https://drive.google.com/file/d/1b8QsGPCJJC1pQOcg83-knD1IAOIgCtZZ/view?usp=sharing",
        external: true,
      },
      {
        label: "Chinese",
        path: "https://drive.google.com/file/d/1f2Kad5CUgbr7plyGBtWnK-Shfm3XowWy/view?usp=sharing",
        external: true,
      },
      {
        label: "Korean",
        path: "https://drive.google.com/file/d/1JMHwdNibJf5g_bBaG8Sx9cCg5_14ZIvE/view?usp=sharing",
        external: true,
      },
      {
        label: "Spanish",
        path: "https://drive.google.com/file/d/1C_HEQ41TBE-W2IKqMZTaVR9pND6hes8S/view?usp=sharing",
        external: true,
      },
      {
        label: "Vietnamese",
        path: "https://drive.google.com/file/d/1ELcBjb8nO_4S4jhhZnFMeSo2BHrznONj/view?usp=sharing",
        external: true,
      },
      // Add more links here
    ],
  },
];

const miscLinks = [
  {
    label: "Privacy Policy",
    path: "https://api3.org/privacy-policy",
    external: true,
  },
  {
    label: "Privacy & Cookies",
    path: "https://api3.org/cookies",
    external: true,
  },
  {
    label: "Terms & Conditions",
    path: "https://api3.org/terms-and-conditions",
    external: true,
  },
];
</script>

<template>
  <footer class="pattern-seven">
    <section class="footer-navigation">
      <inner-column>
        <picture class="site-logo">
          <NuxtImg loading="lazy" src="/images/logo-full.svg" alt="API3 logo" />
        </picture>

        <section
          v-for="(footerMenu, index) in footerLinks"
          :key="index"
          class="footer-menu"
        >
          <h5 class="notice-voice">{{ footerMenu.title }}</h5>

          <nav>
            <NuxtLink
              v-for="(link, linkIndex) in footerMenu.links"
              :key="linkIndex"
              :to="link.path"
              class="calm-voice text footer-link hover-underline"
            >
              <span>{{ link.label }}</span>
              <ExternalLink v-if="link.external" />
            </NuxtLink>
          </nav>
        </section>
      </inner-column>
    </section>

    <section class="other">
      <inner-column>
        <nav class="misc-links">
          <NuxtLink
            v-for="(link, index) in miscLinks"
            :key="index"
            :to="link.path"
            class="calm-voice text footer-link"
          >
            <span>
              {{ link.label }}
            </span>

            <ExternalLink v-if="link.external" />
          </NuxtLink>
        </nav>
        <nav class="social-icons">
          <NuxtLink
            v-for="social in socials"
            :key="social.name"
            :to="social.link"
            class="calm-voice"
          >
            <DynamicIcon :icon="social?.icon" />
          </NuxtLink>
        </nav>
        <p class="calm-voice">© 2023 API3 Ecosystem Foundation</p>
      </inner-column>
    </section>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: var(--space-2xl) 0;
  position: relative;

  inner-column {
    padding-left: var(--space-l);
    padding-right: var(--space-l);
  }
}
.calm-voice {
  font-size: var(--step-0);
  padding: var(--space-2xs) 0;
  color: var(--ink);
}

nav {
  display: grid;
}

.footer-link {
  justify-self: start;
  position: relative;
}

.footer-navigation inner-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  justify-content: space-between;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
    align-items: start;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
  }

  .site-logo {
    width: 200px;

    grid-column: 1/ -1;

    @media (min-width: 768px) {
      grid-column: unset;
      grid-row: 1/ -1;
    }
  }

  h5 {
    font-size: var(--step-0);
    margin-bottom: var(--space-s);
    text-transform: uppercase;
    @media (min-width: 1024px) {
      font-size: var(--step--1);
    }
  }
}

section.other inner-column {
  text-align: center;
  gap: var(--space-l);
  border-top: var(--border);

  display: grid;

  @media (min-width: 1264px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .misc-links {
    column-gap: var(--space-l);
    row-gap: var(--space-2xs);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-s);
    fill: var(--gray);
    @media (min-width: 1264px) {
      order: 3;
      gap: var(--space-l);
      flex-grow: 1;
    }
    @media (min-width: 1380px) {
      gap: var(--space-xl);
    }

    :deep(picture) {
      max-width: 25px;
    }
  }

  p {
    color: var(--gray);
    @media (min-width: 1024px) {
      grid-column: 1/-1;
    }
  }
}
</style>
