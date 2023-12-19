import { StorageSerializers, useSessionStorage } from "@vueuse/core";

export default async (url) => {
  const cached = useSessionStorage(url, null, {
    serializer: StorageSerializers.object,
  });

  console.log("fetching data from  cache", cached);
  if (!cached.value) {
    const { data } = await useFetch(url);
    console.log("fetching data ", data);
    cached.value = data.value;
  } else {
    console.log(`Getting value from cache for ${url}`);
  }

  return cached.value;
};
