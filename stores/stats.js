import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";

export const useStatsStore = defineStore("stats", () => {
  const { data: chartsData } = useFetch("/api/charts");

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
        const parsed = chartsData?.value?.qrngTotals?.data?.rows?.map((row) => {
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
        const parsed =
          chartsData?.value?.qrngFullfillments7Days?.data?.rows?.map((row) => {
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
        const parsed =
          chartsData?.value?.qrngFullfillments30Days?.data?.rows?.map((row) => {
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
        const parsed =
          chartsData?.value?.qrngFullfillments45Days.data?.rows?.map((row) => {
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
        const parsed =
          chartsData?.value?.qrngFullfillments52Weeks?.data?.rows?.map(
            (row) => {
              return {
                x: new Date(row[0]),
                y: row[1],
                // row[1]: row[0]
              };
            }
          );
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
        const parsed =
          chartsData?.value?.qrngFullfillments12Months?.data?.rows?.map(
            (row) => {
              return {
                x: new Date(row[0]),
                y: row[1],
                // row[1]: row[0]
              };
            }
          );
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

        chartsData?.value?.qrngLast2000Requests?.data?.rows?.forEach((row) => {
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
        const parsed = chartsData?.value?.dapiOpenOrders?.data?.rows?.[0]?.[0];
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
        const parsed =
          chartsData?.value?.dapiFulfilledOrders?.data?.rows?.[0]?.[0];
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
        const parsed =
          chartsData?.value?.dapiFulfilledOrdersPerChain?.data?.rows?.map(
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
        const parsed = chartsData?.value?.dapiManagedPerChain?.data?.rows?.map(
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

    activeManaged: {
      chartType: "number",

      metadata: {
        title: "Active Managed dAPIs",
        subtitle: "Total",
        chartColor: "blue",
      },

      options: {},
      data: computed(() => {
        const parsed =
          chartsData?.value?.dapiActiveManaged?.data?.rows?.[0]?.[0];
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
        const parsed =
          chartsData?.value?.dapiActiveSelfFunded?.data?.rows?.[0]?.[0];
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
        const parsed =
          chartsData?.value?.dapiTransactionsPerChain?.data?.rows?.map(
            (row) => {
              return {
                key: row[1],
                value: row[0],
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

    selfFundedPerChain: {
      chartType: "pie",

      metadata: {
        title: "Self-funded dAPIs per Chain",
        subtitle: "Top 5 Chains",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed =
          chartsData?.value?.dapiSelfFundedPerChain?.data?.rows?.map((row) => {
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
        chartsData?.value?.dapiUpdatesPerDayPerChain?.data?.rows?.forEach(
          (row) => {
            const label = row[1];
            const x = new Date(row[0]);
            const y = row[2];

            const found = parsed.find((item) => item.label === label);

            if (found) {
              found.data.push({ x, y });
            } else {
              parsed.push({ label, data: [{ x, y }] });
            }
          }
        );

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
