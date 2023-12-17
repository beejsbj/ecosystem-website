<script setup>
const props = defineProps(["dappForm"]);
props.dappForm.date = new Date().toISOString().slice(0, 10);

const yearOptions = ref([]);

const fileSize = function (node) {
  if (!node.value) return true;

  const maxSize = 3 * 1024 * 1024;

  const fileSizes = node.value.map((file) => file.file.size);

  return fileSizes.every((fileSize) => {
    return fileSize <= maxSize;
  });
};

onMounted(() => {
  const years = ref(getYearRange(2000, new Date().getFullYear()));

  function getYearRange(start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  yearOptions.value = years.value.reverse();
});
</script>
<template>
  <section>
    <text-content>
      <h2 class="attention-voice">Tell us about your dApp</h2>
      <p>
        This information will be displayed for other to learn about your dApp.
      </p>
    </text-content>
    <form-field>
      <FormKit
        type="text"
        label="What is the name of your dApp?*"
        label-class="$reset calm-voice"
        name="dappName"
        placeholder="dApp Name"
        validation="required|length:0,30"
        validation-label="Name"
        id="dappName"
        v-model="dappForm.name"
      />
    </form-field>

    <form-field class="file-upload">
      <FormKit
        v-auto-animate
        id="logoForm"
        type="file"
        label="Upload your dApp’s logo.*"
        label-class="$reset calm-voice"
        name="logo"
        no-files-icon="fileImage"
        fileName="logo"
        accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP"
        validation="required|fileSize"
        validation-label="Logo"
        :validation-rules="{ fileSize }"
        :validation-messages="{
          fileSize: 'File size must be below 3MB',
        }"
      />
      <p class="whisper-voice">Accepted file types: jpeg, png, webp</p>
      <p class="whisper-voice">Minimum width: 512px</p>
      <p class="whisper-voice">Accepted file size: 3MB</p>
    </form-field>

    <!-- short description -->
    <form-field>
      <FormKit
        type="text"
        label="Enter your  dApp’s slogan.*"
        label-class="$reset calm-voice"
        name="shortDescription"
        placeholder="dApp slogan"
        help="Insert a quater-tweet sized description of your dApp"
        validation="required|length:0,70"
        validation-label="Slogan"
        id="shortDescription"
        v-model="dappForm.tagline"
      />
    </form-field>

    <!-- long description -->
    <form-field>
      <FormKit
        type="textarea"
        rows="5"
        label="Tell us about your dApp.*"
        label-class="$reset calm-voice"
        name="longDescription"
        placeholder="dApp description"
        help="This is going to be your 'About', it can be a paragraph or two."
        validation="required"
        validation-label="Description"
        id="longDescription"
        v-model="dappForm.description"
      />
    </form-field>
  </section>
</template>

<style scoped>
section {
  display: contents;
}
</style>
