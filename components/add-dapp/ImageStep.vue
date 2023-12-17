<script setup>
const props = defineProps(["dappForm"]);
props.dappForm.links = props.dappForm.links ?? {};

const fileSize = function (node) {
  if (!node.value) return true;

  const mb = 1024 * 1024;
  const maxSize = 6 * mb;

  const fileSizes = node.value.map((file) => file.file.size);

  return fileSizes.every((fileSize) => {
    return fileSize <= maxSize;
  });
};

const imageRatio = async function (node) {
  // If the node value is falsy, return true.
  if (!node.value) return true;

  // Map over the array of image files and calculate their aspect ratios.
  const imageRatios = await Promise.all(
    node.value.map(async (file) => {
      // Create a new FileReader object.
      const reader = new FileReader();

      // Read the file and return a data URL.
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e.target.error);
        reader.readAsDataURL(file.file);
      });

      // Create a new Image object.
      const image = new Image();

      // Set the source of the image to the data URL.
      image.src = dataUrl;

      // Wait for the image to load.
      await new Promise((resolve) => (image.onload = resolve));

      // Calculate the aspect ratio of the image.
      const ratio = (image.naturalWidth / image.naturalHeight).toFixed(2);

      // Return the aspect ratio.
      return ratio;
    })
  );

  // Check if all aspect ratios are equal to 2.66.
  return imageRatios.every((ratio) => ratio === "2.66");
};
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
        type="url"
        validation="required|url"
        validation-label="dApp URL"
        id="dapp"
        v-model="dappForm.links.dapp"
        label="Where can someone find your dApp?*"
        label-class="$reset calm-voice"
        placeholder="https://yourdapp.com"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        validation="url"
        validation-label="Documentation URL"
        id="docs"
        v-model="dappForm.links.docs"
        label="Where can someone find your dApp’s documentation?"
        label-class="$reset calm-voice"
        placeholder="https://docs.api3.org/"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        validation="url"
        validation-label="Explorer URL"
        id="explorer"
        v-model="dappForm.links.explorer"
        label="Explorer"
        label-class="$reset calm-voice"
        placeholder="https://etherscan.io/"
      />
    </form-field>
    <form-field class="file-upload">
      <FormKit
        id="coverForm"
        type="file"
        label="Upload a branded cover*"
        label-class="$reset calm-voice"
        name="cover"
        accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP"
        v-auto-animate
        validation="required|fileSize|imageRatio"
        validation-label="Cover image"
        :validation-rules="{ fileSize, imageRatio }"
        :validation-messages="{
          fileSize: 'File size must be below 3MB',
          imageRatio: 'Image ratio must be 16:6',
        }"
      />
      <p class="whisper-voice">Accepted file types: jpeg, png, webp</p>

      <p class="whisper-voice">Minimum width: 1024px. Ratio: 16:6</p>
      <p class="whisper-voice">Accepted file size: 6MB</p>

    </form-field>
    <form-field class="file-upload">
      <FormKit
        v-auto-animate
        id="screenShotForm"
        type="file"
        multiple="true"
        label="Upload your screenshots"
        label-class="$reset calm-voice"
        name="screenshots"
        accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP"
        validation="fileSize"
        validation-label="Screenshots"
        :validation-rules="{ fileSize }"
        :validation-messages="{
          fileSize: 'Each file must be below 3MB',
        }"
      />
      <p class="whisper-voice">Accepted file types: jpeg, png, webp</p>
      <p class="whisper-voice">Accepted file size: 6MB</p>
      <p class="whisper-voice">Select at least two images</p>
    </form-field>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}
</style>
