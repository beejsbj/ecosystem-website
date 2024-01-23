<script setup>
import { useStorage } from "@vueuse/core";
import { reset } from "@formkit/core";
const content = await queryContent("resources/partner-program").findOne();

definePageMeta({
  layout: "footer-less",
  alias: "/affiliate-program",
});

const formEnabled = ref(false);

useSeoMeta({
  title: content.meta.title,
  ogTitle: content.meta.title,
  twitterTitle: content.meta.title,

  description: content.meta.description,
  ogDescription: content.meta.description,
  twitterDescription: content.meta.description,

  //   image: content.meta.image,
  //   ogImage: content.meta.image,
  //   twitterImage: content.meta.image,

  ogUrl: content.meta.url,
  twitterUrl: content.meta.url,

  ogType: content.meta.type,
  twitterType: content.meta.type,
});

const form = useStorage("referral-email-form", {
  name: "",
  email: "",
  telegram: "",
  level: "",
  message: "",
});

const serverMessages = ref([]);

async function submitForm() {
  serverMessages.value = [];

  //   send email using api from server/api/email/index.js
  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.value),
  });

  const data = await response.json();

  console.log("data", data);

  if (data.success) {
    // reset form by id
    reset("contact-form");

    // show success message
    const message = {
      success: data.success,
      message:
        data.message +
        ". Thank you for your interest in the API3 Affiliate Program. We will be in touch soon.",
    };
    console.log(message);
    serverMessages.value.push(message);
  } else {
    serverMessages.value.push({
      message: data.message,
    });
  }
}
</script>

<template>
  <article>
    <SectionColumn class="hero">
      <h1 class="loud-voice gradient-text-color">
        {{ content.hero.title }}
      </h1>
      <picture class="hero-image">
        <img :src="content.hero.image" alt="" />
      </picture>
      <p>
        {{ content.hero.description }}
      </p>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="about">
      <h2 class="attention-voice">
        {{ content.about.title }}
      </h2>

      <p class="notice-voice">
        {{ content.about.description }}
      </p>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="rewards">
      <h2 class="attention-voice">
        {{ content.rewards.title }}
      </h2>
      <p class="notice-voice" v-if="content.rewards.description">
        {{ content.rewards.description }}
      </p>

      <ul>
        <li v-for="card in content.rewards.cards" class="border-gradient-green">
          <h3 class="solid-voice">
            {{ card.title }}
          </h3>
          <p class="loud-voice">
            {{ card.description }}
          </p>
        </li>
      </ul>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="qualifications">
      <h2 class="attention-voice">
        {{ content.qualifications.title }}
      </h2>

      <ul>
        <li
          v-for="card in content.qualifications.cards"
          class="border-gradient-violet"
        >
          <p class="notice-voice">
            {{ card.description }}
          </p>
        </li>
      </ul>

      <p class="whisper-voice" v-if="content.qualifications.description">
        {{ content.qualifications.description }}
      </p>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="get-started">
      <h2 class="attention-voice">
        {{ content.getStarted.title }}
      </h2>
      <p class="whisper-voice">
        {{ content.getStarted.description }}
      </p>

      <ul>
        <li
          v-for="card in content.getStarted.cards"
          class="border-gradient-blue"
        >
          <picture v-if="false">
            <img :src="card.image" alt="" />
          </picture>
          <h3 class="teaser-voice">
            {{ card.title }}
          </h3>
          <p class="notice-voice">
            {{ card.description }}
          </p>
        </li>
      </ul>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="contact pattern-seven">
      <text-content>
        <h2 class="loud-voice">
          {{ content.contact.title }}
        </h2>
        <p class="notice-voice">
          {{ content.contact.description }}
        </p>
        <p v-if="!formEnabled">
          Please email
          <a href="mailto:ecosystem@api3.org"> ecosystem@api3.org </a> to get
          started.
        </p>
        <p>
          Check out the
          <a
            href="https://api3-ecosystem.gitbook.io/eco/referrers/referral-program"
            >Gitbook.</a
          >
        </p>
      </text-content>

      <FormKit
        type="form"
        id="contact-form"
        :actions="false"
        v-auto-animate
        @submit="submitForm"
        v-if="formEnabled"
      >
        <form-field>
          <FormKit
            type="text"
            id="name"
            name="name"
            label="Name"
            label-class="$reset calm-voice"
            placeholder="Name"
            validation="required"
            v-model="form.name"
          />
        </form-field>

        <form-field>
          <FormKit
            type="email"
            id="email"
            name="email"
            label="Email"
            label-class="$reset calm-voice"
            placeholder="Email"
            validation="required|email"
            v-model="form.email"
          />
        </form-field>

        <form-field>
          <FormKit
            type="url"
            id="telegram"
            name="Telegram"
            label="Telegram"
            label-class="$reset calm-voice"
            placeholder="t.me/your-username"
            validation="url"
            v-model="form.telegram"
          />
        </form-field>

        <form-field>
          <FormKit
            type="select"
            id="level"
            name="level"
            label="Level"
            label-class="$reset calm-voice"
            placeholder="Level"
            validation="required"
            v-model="form.level"
          >
            <option value="novice">Novice</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
            <option value="master">Master</option>
          </FormKit>
        </form-field>

        <form-field>
          <FormKit
            type="textarea"
            id="message"
            name="message"
            label="Message"
            label-class="$reset calm-voice"
            placeholder="Message"
            validation="required"
            v-model="form.message"
          />
        </form-field>
        <form-field>
          <FormKit
            type="submit"
            id="submit"
            label="Submit"
            input-class="$reset button"
          />
        </form-field>
        <ul class="validation-errors" v-auto-animate v-if="serverMessages">
          <li
            v-for="message in serverMessages"
            class="solid-voice"
            :class="{
              success: message.success,
              error: !message.success,
            }"
          >
            {{ message.message }}
          </li>
        </ul>
      </FormKit>
    </SectionColumn>
  </article>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  padding: var(--space-2xl) var(--space-s);
}
.hero :deep(inner-column) {
  display: grid;
  align-items: center;

  h1 {
    text-wrap: balance;
    align-self: end;
  }
  p {
    align-self: start;
  }

  picture {
    max-width: 100px;

    @media (min-width: 768px) {
      grid-row: span 2;
      max-width: unset;
    }
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.5fr;
    column-gap: var(--space-xl);
  }
}

.rewards {
  ul {
    display: grid;
    gap: var(--space-m);
    padding: var(--space-l) 0;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  li {
    padding: var(--space-m);
    display: grid;
    gap: var(--space-2xs);

    p {
      margin-top: 0;
    }
  }
}

.qualifications {
  ul {
    display: grid;
    gap: var(--space-m);
    padding: var(--space-l) 0;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  li {
    padding: var(--space-m);
    grid-column: span 2;

    &:nth-last-child(1) {
      grid-column: 2 / span 2;
    }
  }
}

.get-started ul {
  padding: var(--space-s);

  display: grid;
  gap: var(--space-m);

  li {
    padding: var(--space-m);

    display: grid;
    gap: var(--space-3xs);

    picture {
      max-width: 80px;
    }

    p {
      margin-top: 0;
    }
  }
}

.contact :deep(inner-column) {
  display: grid;
  gap: var(--space-xl);

  @media (min-width: 768px) {
    //  grid-template-columns: 0.7fr 1fr;
  }

  .validation-errors li {
    &.success {
      color: var(--green-lighter);
    }
    &.error {
      color: var(--error);
    }
  }
}
</style>
