<script setup>
/**
 * LinksStep Component
 *
 * A form step component for capturing various links and social media profiles related to a dApp.
 *
 * @component
 *
 * @example
 * <LinksStep :dappForm="dappFormObject" />
 *
 * @props
 * @prop {Object} dappForm - Reactive object to store form data
 *
 * @features
 * - Captures company website URL
 * - Collects social media profile URLs for various platforms:
 *   Twitter, Discord, GitHub, Reddit, Telegram, Facebook, YouTube, and Blog
 * - Uses FormKit components for form inputs
 * - Displays social media icons alongside each input field
 *
 */

const props = defineProps(["dappForm"]);

props.dappForm.links = props.dappForm.links ?? {};
props.dappForm.links.socials = props.dappForm.links.socials ?? {};
</script>

<template>
  <section class="form-links">
    <text-content>
      <h2 class="attention-voice">How can your users contact you?</h2>
      <p>
        This information will be displayed for others to learn about your dApp.
      </p>
    </text-content>

    <form-field>
      <FormKit
        type="url"
        id="website"
        v-model="dappForm.links.website"
        label="What’s your company’s website?"
        validation="url"
        validation-label="Website"
        placeholder="https://yourwebsite.com"
      />
    </form-field>

    <div class="form-socials">
      <h2 class="calm-voice">Enter the socials you'd like to share.</h2>
      <form-field>
        <DynamicIcon icon="twitter" />

        <FormKit
          type="url"
          id="twitter"
          v-model="dappForm.links.socials.twitter"
          label="Twitter"
          placeholder="https://twitter.com/yourdapp"
          validation="url"
        />
      </form-field>

      <form-field>
        <DynamicIcon icon="discord" />

        <FormKit
          type="url"
          id="discord"
          v-model="dappForm.links.socials.discord"
          label="Discord"
          placeholder="https://discord.gg/yourdapp"
          validation="url"
        />
      </form-field>

      <form-field>
        <DynamicIcon icon="github" />

        <FormKit
          type="url"
          id="github"
          v-model="dappForm.links.socials.github"
          label="Github"
          placeholder="github.com/yourdapp"
          validation="url"
        />
      </form-field>

      <form-field>
        <DynamicIcon icon="reddit" />
        <FormKit
          type="url"
          id="reddit"
          v-model="dappForm.links.socials.reddit"
          label="Reddit"
          placeholder="https://reddit.com/r/yourdapp"
          validation="url"
        />
      </form-field>

      <form-field>
        <DynamicIcon icon="telegram" />
        <FormKit
          type="url"
          validation="url"
          id="telegram"
          v-model="dappForm.links.socials.telegram"
          label="Telegram"
          placeholder="https://t.me/yourdapp"
        />
      </form-field>
      <form-field>
        <DynamicIcon icon="facebook" />
        <FormKit
          type="url"
          validation="url"
          id="facebook"
          v-model="dappForm.links.socials.facebook"
          label="Facebook"
          placeholder="https://facebook.com/yourdapp"
        />
      </form-field>

      <form-field>
        <DynamicIcon icon="youtube" />
        <FormKit
          type="url"
          validation="url"
          id="youtube"
          v-model="dappForm.links.socials.youtube"
          label="Youtube"
          placeholder="https://youtube.com/yourdapp"
        />
      </form-field>

      <form-field>
        <DynamicIcon icon="medium" />
        <FormKit
          type="url"
          validation="url"
          id="blog"
          v-model="dappForm.links.socials.blog"
          label="Blog"
          placeholder="https://yourdapp.com/blog"
        />
      </form-field>
    </div>
  </section>
</template>

<style scoped lang="scss">
.form-links {
  display: grid;

  gap: var(--space-m);
}
.form-socials {
  display: grid;

  gap: var(--space-l);

  form-field {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    justify-content: start;

    :deep(.formkit-outer) {
      flex-grow: 1;
    }
  }

  :deep(.formkit-label) {
    padding: unset;
  }

  :deep(.formkit-wrapper) {
    @media (min-width: 768px) {
      grid-template-columns: 0.2fr 1fr;
    }
  }

  :deep(picture) {
    max-width: 20px;
  }

  h2 {
    grid-column: 1 / -1;
  }
}
</style>
