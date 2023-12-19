<script setup>
import { parseMarkdown } from "@/utils/parseMarkdown";

const { verifyWallet } = useSiwe();
const { submitArticle } = useHttpCalls();

const status = ref({ loading: false, success: false, message: "" });

async function submitHandler(event) {
  status.value = { loading: false, success: false, message: "" };

  const file = event.article[0].file;

  const imageFile = event?.image?.[0]?.file;

  const reader = new FileReader();

  reader.onload = async function (e) {
    const content = e.target.result;
    const parsed = await parseMarkdown({ content });
    parsed.content = content;

    const { success: verificationSuccess, data: verificationPayload } =
      await verifyWallet();

    if (!verificationSuccess) {
      status.value.message = "verificationStatus signature verification failed";
      return;
    }

    const formData = new FormData();
    formData.append("article", JSON.stringify(parsed));
    formData.append("cover", parsed.image);

    if (imageFile) {
      formData.append("cover", imageFile);
    }

    status.value.loading = true;
    const submitResult = await submitArticle(formData, verificationPayload);

    if (submitResult.success) {
      status.value.success = true;
      status.value.message = "Article submitted successfully.";
      status.value.loading = false;
    } else {
      status.value.success = false;
      status.value.message = submitResult.message;
      status.value.loading = false;
    }
  };

  reader.readAsText(file);
}
</script>

<template>
  <PageTitle heading="Add Article" />
  <SectionColumn>
    <FormKit type="form" :actions="false" @submit="submitHandler">
      <FormKit
        v-auto-animate
        id="article-form"
        type="file"
        label="Upload article as markdown"
        label-class="$reset calm-voice"
        name="article"
        fileName="article"
        no-files-icon="fileDocument"
        accept=".md"
        validation="required"
      />

      <FormKit
        v-auto-animate
        id="article-form"
        type="file"
        label="Upload cover image"
        label-class="$reset calm-voice"
        no-files-icon="fileImage"
        fileName="cover"
        name="image"
        validation="optional"
        accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP, .gif, .GIF"
      />

      <FormKit type="submit" label="Add Article" input-class="$reset button" />

      <p v-if="status.loading">Uploading...</p>
      <p
        :class="{
          'color-success': status.success,
          'color-warning': !status.success,
        }"
      >
        {{ status.message }}
      </p>
    </FormKit>
  </SectionColumn>
</template>

<style scoped lang="scss">
form {
  max-width: 70ch;
  margin: 0 auto;
}
</style>
