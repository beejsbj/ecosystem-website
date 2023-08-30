<script setup>
const { data: pie1 } = useFetch(
  "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/115/card/120?parameters=%5B%5D"
);

const pie1Rows = computed(() => {
  const parsed = pie1.value.data.rows.map((row) => {
    return {
      key: row[1],
      value: row[0],
      // row[1]: row[0]
    };
  });
  const sorted = parsed.sort((a, b) => b.value - a.value);
  return sorted;
});

//

const { data: pie2 } = useFetch(
  "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/114/card/121?parameters=%5B%5D"
);

const pie2Rows = computed(() => {
  const parsed = pie2.value.data.rows.map((row) => {
    return {
      key: row[1],
      value: row[0],
      // row[1]: row[0]
    };
  });
  const sorted = parsed.sort((a, b) => b.value - a.value);
  return sorted;
});

//
// const { data: pie3 } = useFetch(
//   "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/115/card/120?parameters=%5B%5D"
// );

///
const { data: bar1 } = useFetch(
  "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/122/card/124?parameters=%5B%5D"
);

const bar1Rows = computed(() => {
  const parsed = bar1.value.data.rows.map((row) => {
    return {
      x: new Date(row[0]),
      y: row[1],
      // row[1]: row[0]
    };
  });
  return parsed;
});

const bar1Metadata = {
  title: "Total QRNG Fulfilments per Day",
  subtitle: "Last 45 days",
  label: "QRNG Fullfilments",
  x: {
    title: "Days",
  },
  y: {
    title: "Fulfilments",
  },
};

//

const { data: bar2 } = useFetch(
  "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/123/card/125?parameters=%5B%5D"
);

const bar2Rows = computed(() => {
  const parsed = bar2.value.data.rows.map((row) => {
    return {
      x: new Date(row[0]),
      y: row[1],
      // row[1]: row[0]
    };
  });
  return parsed;
});

const bar2Metadata = {
  title: "Total QRNG Fulfilments per Week",
  subtitle: "Last 52 Weeks",
  label: "QRNG Fullfilments",
  x: {
    title: "Days",
  },
  y: {
    title: "Fulfilments",
  },
};

//
//
const { data: bar3 } = useFetch(
  "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/124/card/126?parameters=%5B%5D"
);

const bar3Rows = computed(() => {
  const parsed = bar3.value.data.rows.map((row) => {
    return {
      x: new Date(row[0]),
      y: row[1],
      // row[1]: row[0]
    };
  });
  return parsed;
});

const bar3Metadata = {
  title: "Total QRNG Fulfilments per Month",
  subtitle: "Last 12 Months",
  label: "QRNG Fullfilments",
  x: {
    title: "Days",
  },
  y: {
    title: "Fulfilments",
  },
};
</script>

<template>
  <PageTitle heading="Stats" />

  <SectionColumn>
    <h2 class="attention-voice">QRNG</h2>

    <ul class="charts-list">
      <li>
        <PieChart :data="pie1Rows" />
      </li>
      <li>
        <PieChart :data="pie2Rows" />
      </li>

      <li>
        <BarChart :data="bar1Rows" :metadata="bar1Metadata" />
      </li>
      <li>
        <BarChart
          :data="bar2Rows"
          :metadata="bar2Metadata"
          :options="{
            color: 'hsla(256, 34%, 54%, 1)',
          }"
        />
      </li>
      <li>
        <BarChart
          :data="bar3Rows"
          :metadata="bar3Metadata"
          :options="{
            color: 'hsla(256, 34%, 54%, 1)',
          }"
        />
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped>
ul {
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); */
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}
</style>
