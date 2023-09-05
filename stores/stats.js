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

  //dAPI ////////////////////////////////////////////////

  // Open Orders |  number | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/154/card/155?parameters=%5B%5D

  const { data: dapiOpenOrders } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/154/card/155?parameters=%5B%5D"
  );

  ///Fulfilled Orders | number | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/155/card/156?parameters=%5B%5D

  const { data: dapiFulfilledOrders } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/155/card/156?parameters=%5B%5D"
  );

  //Fulfilled Orders per Chain | Pie chart | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/156/card/157?parameters=%5B%5D

  const { data: dapiFulfilledOrdersPerChain } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/156/card/157?parameters=%5B%5D"
  );

  //Managed dAPIs per Chain | Pie chart | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/162/card/159?parameters=%5B%5D

  const { data: dapiManagedPerChain } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/162/card/159?parameters=%5B%5D"
  );

  // Active Managed dAPIs |  number | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/157/card/158?parameters=%5B%5D

  const { data: dapiActiveManaged } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/157/card/158?parameters=%5B%5D"
  );

  // Active Self-funded dAPIs |  number | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/160/card/161?parameters=%5B%5D

  const { data: dapiActiveSelfFunded } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/160/card/161?parameters=%5B%5D"
  );

  //dAPI Transactions per Chain | Pie chart | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/159/card/160?parameters=%5B%5D

  const { data: dapiTransactionsPerChain } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/159/card/160?parameters=%5B%5D"
  );

  //Self-funded dAPIs per Chain | Pie chart | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/161/card/162?parameters=%5B%5D

  const { data: dapiSelfFundedPerChain } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/161/card/162?parameters=%5B%5D"
  );

  // dAPI Updates per Day per Chain | Bar chart | https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/165/card/133?parameters=%5B%5D

  const { data: dapiUpdatesPerDayPerChain } = useFetch(
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/165/card/133?parameters=%5B%5D"
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

  ////////////////////////////////////////////////
  const qrng = {
    totals: {
      chartType: "pie",

      metadata: {
        title: "Total QRNG Fulfilments",
        subtitle: "Top 5 Chains",
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
          labels: sorted
            .filter((item, index) => index <= 5)
            .map((item) => item.key),
          datasets: [
            {
              data: sorted.filter((item, index) => index <= 5),
              backgroundColor,
            },
          ],
        };
      }),
    },

    last7Days: {
      chartType: "pie",

      metadata: {
        title: "QRNG Fulfilments | Last 7 days",
        subtitle: "Top 5 Chains",
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
          labels: sorted
            .filter((item, index) => index <= 5)
            .map((item) => item.key),
          datasets: [
            {
              data: sorted.filter((item, index) => index <= 5),
              backgroundColor,
            },
          ],
        };
      }),
    },

    last30Days: {
      chartType: "pie",
      metadata: {
        title: "QRNG Fulfilments | Last 30 days",
        subtitle: "Top 5 Chains",
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
          labels: sorted
            .filter((item, index) => index <= 5)
            .map((item) => item.key),
          datasets: [
            {
              data: sorted.filter((item, index) => index <= 5),
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

        const datasets = parsed.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
          };
        });

        const largestDataset = datasets.reduce((a, b) => {
          return a.data.length > b.data.length ? a : b;
        });

        const labels = largestDataset.data.map((item) => {
          // sort by date
          //  return item.x.toDateString().slice(4, 10);
          //  date and time Aug 5 00:00
          return (
            item.x.toDateString().slice(4, 10) +
            " " +
            item.x.toTimeString().slice(0, 5)
          );
        });

        //   sort labels by date
        const sortedLabels = labels.sort((a, b) => {
          return new Date(a) - new Date(b);
        });

        return {
          labels: labels,
          datasets,
        };
      }),
    },
  };

  //dAPI ////////////////////////////////////////////////

  const dapi = {
    openOrders: {
      chartType: "number",

      metadata: {
        title: "Open Orders",
        subtitle: "Total",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiOpenOrders.value.data.rows[0][0];
        return parsed;
      }),
    },

    fulfilledOrders: {
      chartType: "number",

      metadata: {
        title: "Fulfilled Orders",
        subtitle: "Total",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiFulfilledOrders.value.data.rows[0][0];
        return parsed;
      }),
    },

    fulfilledOrdersPerChain: {
      chartType: "pie",

      metadata: {
        title: "Fulfilled Orders per Chain",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiFulfilledOrdersPerChain.value.data.rows.map(
          (row) => {
            return {
              key: row[0],
              value: row[1],
            };
          }
        );
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return {
          labels: sorted.map((item) => item.key),

          datasets: [
            {
              data: sorted,
              backgroundColor,
            },
          ],
        };
      }),
    },

    managedPerChain: {
      chartType: "pie",

      metadata: {
        title: "Managed dAPIs per Chain",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiManagedPerChain.value.data.rows.map((row) => {
          return {
            key: row[0],
            value: row[1],
          };
        });
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return {
          labels: sorted.map((item) => item.key),

          datasets: [
            {
              data: sorted,
              backgroundColor,
            },
          ],
        };
      }),
    },

    activeManaged: {
      chartType: "number",

      metadata: {
        title: "Active Managed dAPIs",
        subtitle: "Total",
        chartColor: "blue",
      },

      options: {},
      data: computed(() => {
        const parsed = dapiActiveManaged.value.data.rows[0][0];
        return parsed;
      }),
    },

    activeSelfFunded: {
      chartType: "number",

      metadata: {
        title: "Active Self-funded dAPIs",
        subtitle: "Total",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiActiveSelfFunded.value.data.rows[0][0];
        return parsed;
      }),
    },

    transactionsPerChain: {
      chartType: "pie",

      metadata: {
        title: "dAPI Transactions per Chain",
        subtitle: "Top 5 Chains",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiTransactionsPerChain.value.data.rows.map((row) => {
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
              data: sorted,
              backgroundColor,
            },
          ],
        };
      }),
    },

    selfFundedPerChain: {
      chartType: "pie",

      metadata: {
        title: "Self-funded dAPIs per Chain",
        subtitle: "Top 5 Chains",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = dapiSelfFundedPerChain.value.data.rows.map((row) => {
          return {
            key: row[0],
            value: row[1],
          };
        });
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return {
          labels: sorted.map((item) => item.key),

          datasets: [
            {
              data: sorted,
              backgroundColor,
            },
          ],
        };
      }),
    },

    updatesPerDayPerChain: {
      chartType: "line",

      metadata: {
        title: "dAPI Updates per Day per Chain",
        label: "Updates",
        x: {
          title: "Days",
        },
        y: {
          title: "Updates",
        },
      },

      options: {},
      data: computed(() => {
        const parsed = [];
        dapiUpdatesPerDayPerChain.value.data.rows.forEach((row) => {
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

        const datasets = parsed.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
          };
        });

        const largestDataset = datasets.reduce((a, b) => {
          return a.data.length > b.data.length ? a : b;
        });

        const labels = largestDataset.data.map((item) => {
          return item.x.toDateString().slice(10);
        });

        const sortedLabels = labels.sort((a, b) => {
          return new Date(a) - new Date(b);
        });

        return {
          labels: labels,
          datasets,
        };
      }),
    },
  };

  // returns
  return {
    qrng,
    dapi,
  };
});
