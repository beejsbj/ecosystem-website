import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";

export const useStatsStore = defineStore("stats", () => {
  //QRNG ////////////////////////////////////////////////
  // QRNG Totals per chain | Pie chart
  const { data: qrngTotals } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/115/card/120?parameters=%5B%5D"
  );

  //QRNG fulfilments last 7 days | Pie chart
  const { data: qrngFullfillments7Days } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/114/card/121?parameters=%5B%5D"
  );

  // QRNG fulfilments last 30 days | Pie chart
  const { data: qrngFullfillments30Days } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/117/card/123?parameters=%5B%5D"
  );

  // Total QRNG Fulfilments per Day | Last 45 days | Bar chart
  const { data: qrngFullfillments45Days } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/122/card/124?parameters=%5B%5D"
  );

  // Total QRNG Fulfilments per Week | Last 52 Weeks | Bar chart
  const { data: qrngFullfillments52Weeks } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/123/card/125?parameters=%5B%5D"
  );

  // Total QRNG Fulfilments per Month | Last 12 Months | Bar chart
  const { data: qrngFullfillments12Months } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/124/card/126?parameters=%5B%5D"
  );

  // QRNG Last 2000 requests Chart | Line chart

  const { data: qrngLast2000Requests } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/116/card/122?parameters=%5B%5D"
  );

  const backgroundColor = [
    "hsla(160, 65%, 69%, 1.00)",
    "hsla(200, 65%, 69%, 10)",
    "hsla(240, 65%, 69%, 10)",
    "hsla(280, 65%, 69%, 10)",
    "hsla(320, 65%, 69%, 10)",
    "hsla(0, 65%, 69%, 1.00)",
    "hsla(40, 65%, 69%, 10)",
    "hsla(80, 65%, 69%, 10)",
    "hsla(120, 65%, 69%, 10)",
  ];

  const backgroundColor2 = [
    "hsla(0, 30%, 50%, 1.00)",
    "hsla(40, 30%, 50%, 10)",
    "hsla(80, 30%, 50%, 10)",
    "hsla(120, 30%, 50%, 10)",
    "hsla(160, 30%, 50%, 1.00)",
    "hsla(200, 30%, 50%, 10)",
    "hsla(240, 30%, 50%, 10)",
    "hsla(280, 30%, 50%, 10)",
    "hsla(320, 30%, 50%, 10)",
  ];

  ////////////////////////////////////////////////
  const qrng = {
    totals: {
      chartType: "pie",

      metadata: {
        title: "Total QRNG Fulfilments",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = qrngTotals.value.data.rows.map((row) => {
          return {
            key: row[1],
            value: row[0],
          };
        });
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return {
          labels: sorted.map((item) => item.key),
          datasets: [
            {
              data: sorted.filter((item, index) => item.value >= 4000),
            },
            {
              data: sorted.filter(
                (item, index) => item.value < 4000 && item.value > 100
              ),
              backgroundColor,
            },
            {
              data: sorted.filter((item, index) => item.value <= 100),
            },
          ],
        };
      }),
    },

    last7Days: {
      chartType: "pie",

      metadata: {
        title: "QRNG Fulfilments | Last 7 days",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = qrngFullfillments7Days.value.data.rows.map((row) => {
          return {
            key: row[1],
            value: row[0],
          };
        });
        const sorted = parsed.sort((a, b) => b.value - a.value);
        return {
          labels: sorted.map((item) => item.key),
          datasets: [
            {
              data: sorted.filter((item, index) => item.value),
            },
          ],
        };
      }),
    },

    last30Days: {
      chartType: "pie",
      metadata: {
        title: "QRNG Fulfilments | Last 30 days",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = qrngFullfillments30Days.value.data.rows.map((row) => {
          return {
            key: row[1],
            value: row[0],
          };
        });
        const sorted = parsed.sort((a, b) => b.value - a.value);
        return {
          labels: sorted.map((item) => item.key),
          datasets: [
            {
              data: sorted.filter((item, index) => item.value >= 9000),
              label: ">=9000",
            },
            {
              data: sorted.filter((item, index) => item.value < 9000),
              label: "<9000",
              backgroundColor,
            },
          ],
        };
      }),
    },

    last45Days: {
      chartType: "bar",

      metadata: {
        title: "Total QRNG Fulfilments per Day",
        subtitle: "Last 45 days",
        label: "QRNG Fullfilments",
        x: {
          title: "Days",
        },
        y: {
          title: "Fulfilments",
        },
      },

      options: {},

      data: computed(() => {
        const parsed = qrngFullfillments45Days.value.data.rows.map((row) => {
          return {
            x: new Date(row[0]),
            y: row[1],
          };
        });

        return {
          labels: parsed.map((item) => item.x.toDateString().slice(4, 10)),
          datasets: [
            {
              data: parsed,
            },
          ],
        };
      }),
    },

    last52Weeks: {
      chartType: "bar",

      metadata: {
        title: "Total QRNG Fulfilments per Week",
        subtitle: "Last 52 Weeks",
        label: "QRNG Fullfilments",
        x: {
          title: "Weeks",
        },
        y: {
          title: "Fulfilments",
        },
      },

      options: {},

      data: computed(() => {
        const parsed = qrngFullfillments52Weeks.value.data.rows.map((row) => {
          return {
            x: new Date(row[0]),
            y: row[1],
            // row[1]: row[0]
          };
        });
        return {
          labels: parsed.map((item) => item.x.toDateString().slice(4, 10)),
          datasets: [
            {
              data: parsed,
            },
          ],
        };
      }),
    },

    last12Months: {
      chartType: "bar",

      metadata: {
        title: "Total QRNG Fulfilments per Month",
        subtitle: "Last 12 Months",
        label: "QRNG Fullfilments",
        x: {
          title: "Years",
        },
        y: {
          title: "Fulfilments",
        },
      },

      options: {},

      data: computed(() => {
        const parsed = qrngFullfillments12Months.value.data.rows.map((row) => {
          return {
            x: new Date(row[0]),
            y: row[1],
            // row[1]: row[0]
          };
        });
        return {
          labels: parsed.map((item) => item.x.toDateString().slice(4, 10)),
          datasets: [
            {
              data: parsed,
            },
          ],
        };
      }),
    },

    last2000Requests: {
      chartType: "line",

      metadata: {
        title: "QRNG Last 2000 Requests",
        subtitle: "Last 2000 Requests",
        label: "QRNG Fullfilments",
        x: {
          title: "Time",
        },
        y: {
          title: "Count",
        },
      },

      options: {},

      data: computed(() => {
        //qrngLast2000Requests.value.data.rows
        // x: new Date(row[0]),
        // y: row[2],
        // label: row[1],

        // parse the data into an array of objects with the following structure
        // {label: row[1], data: [{x: new Date(row[0]), y: row[2]}]}
        //   the same label

        const parsed = [];

        qrngLast2000Requests.value.data.rows.forEach((row) => {
          const label = row[1];
          const x = new Date(row[0]);
          const y = row[2];

          const found = parsed.find((item) => item.label === label);

          if (found) {
            found.data.push({ x, y });
          } else {
            parsed.push({ label, data: [{ x, y }] });
          }
        });

        return parsed;
      }),
    },
  };

  // returns
  return {
    qrng,
  };
});
