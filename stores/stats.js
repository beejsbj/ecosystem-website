import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";

export const useStatsStore = defineStore("stats", () => {
  const { data: chartsData } = useFetch("/api/charts");

  const gradientColors = [
    // give me 7 colors from "hsla(160, 65%, 69%, 1.00)" to "hsla(256, 34%, 54%, 1)", by gradually increasing the hue, saturation, and lightness only, but keeping the alpha at 1
    "hsla(160, 65%, 69%, 1.00)",
    "hsla(180, 59%, 66%, 1.00)",
    "hsla(200, 53%, 63%, 1.00)",
    "hsla(220, 47%, 60%, 1.00)",
    "hsla(240, 41%, 57%, 1.00)",
    "hsla(260, 35%, 54%, 1.00)",
  ];

  const allColors = [
    "hsla(160, 65%, 69%, 1.00)",
    "hsla(190, 65%, 69%, 1.00)",
    "hsla(220, 65%, 69%, 1.00)",
    "hsla(250, 65%, 69%, 1.00)",
    "hsla(280, 65%, 69%, 1.00)",
    "hsla(310, 65%, 69%, 1.00)",
    "hsla(340, 65%, 69%, 1.00)",
    "hsla(10, 65%, 69%, 1.00)",
    "hsla(40, 65%, 69%, 1.00)",
    "hsla(70, 65%, 69%, 1.00)",
    "hsla(100, 65%, 69%, 1.00)",
    "hsla(130, 65%, 69%, 1.00)",
    "hsla(160, 35%, 54%, 1.00)",
    "hsla(190, 35%, 54%, 1.00)",
    "hsla(220, 35%, 54%, 1.00)",
    "hsla(250, 35%, 54%, 1.00)",
    "hsla(280, 35%, 54%, 1.00)",
    "hsla(310, 35%, 54%, 1.00)",
    "hsla(340, 35%, 54%, 1.00)",
    "hsla(10, 35%, 54%, 1.00)",
    "hsla(40, 35%, 54%, 1.00)",
    "hsla(70, 35%, 54%, 1.00)",
    "hsla(100, 35%, 54%, 1.00)",
    "hsla(130, 35%, 54%, 1.00)",
  ];

  //QRNG ////////////////////////////////////////////////
  const qrng = {
    // QRNG Totals per chain
    totals: {
      chartType: "pie",

      metadata: {
        title: "Total QRNG Fulfilments",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = chartsData?.value?.qrngTotals?.data.rows.map((row) => {
          return {
            key: row[1],
            value: row[0],
          };
        });
        const sorted = parsed.sort((a, b) => b.value - a.value);
        return sorted;
      }),
    },

    // QRNG fulfilments last 7 days
    last7Days: {
      chartType: "pie",

      metadata: {
        title: "QRNG Fulfilments | Last 7 days",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = chartsData?.value?.qrngFullfillments7Days?.data.rows.map(
          (row) => {
            return {
              key: row[1],
              value: row[0],
            };
          }
        );
        const sorted = parsed.sort((a, b) => b.value - a.value);
        return sorted;
      }),
    },

    //QRNG fulfilments last 30 days
    last30Days: {
      chartType: "pie",
      metadata: {
        title: "QRNG Fulfilments | Last 30 days",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed =
          chartsData?.value?.qrngFullfillments30Days?.data.rows.map((row) => {
            return {
              key: row[1],
              value: row[0],
            };
          });
        const sorted = parsed.sort((a, b) => b.value - a.value);
        return sorted;
      }),
    },

    //Total QRNG Fulfilments per Day | Last 45 days
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
          chartsData?.value?.qrngFullfillments45Days?.data.rows.map((row) => {
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

    //Total QRNG Fulfilments per Week | Last 52 weeks
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

      options: {
        color: "hsla(256, 34%, 54%, 1)",
      },

      data: computed(() => {
        const parsed =
          chartsData?.value?.qrngFullfillments52Weeks?.data.rows.map((row) => {
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

    //Total QRNG Fulfilments per Month | Last 12 months
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
          chartsData?.value?.qrngFullfillments12Months?.data.rows.map((row) => {
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

    //  QRNG Last 2000 requests Chart
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
        //qrngLast2000Requests?.data.rows
        // x: new Date(row[0]),
        // y: row[2],
        // label: row[1],

        // parse the data into an array of objects with the following structure
        // {label: row[1], data: [{x: new Date(row[0]), y: row[2]}]}
        //   the same label

        const parsed = [];

        chartsData?.value?.qrngLast2000Requests?.data.rows.forEach((row) => {
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
            borderColor: allColors[index],
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
    // Open Orders
    openOrders: {
      chartType: "box",

      metadata: {
        title: "Open Orders",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = [
          {
            key: null,
            value: chartsData?.value?.dapiOpenOrders?.data.rows[0][0],
          },
        ];
        return parsed;
      }),
    },

    // Fulfilled Orders
    fulfilledOrders: {
      chartType: "box",

      metadata: {
        title: "Fulfilled Orders",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = [
          {
            key: null,
            value: chartsData?.value?.dapiFulfilledOrders?.data.rows[0][0],
          },
        ];
        return parsed;
      }),
    },

    // Fulfilled Orders per Chain
    fulfilledOrdersPerChain: {
      chartType: "box",

      metadata: {
        title: "Fulfilled Orders per Chain",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed =
          chartsData?.value?.dapiFulfilledOrdersPerChain?.data.rows.map(
            (row) => {
              return {
                key: row[0],
                value: row[1],
              };
            }
          );
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return sorted;
      }),
    },

    //  Active Managed dAPIs
    activeManaged: {
      chartType: "box",

      metadata: {
        title: "Active Managed dAPIs",
        chartColor: "blue",
      },

      options: {},
      data: computed(() => {
        const parsed = [
          {
            key: null,
            value: chartsData?.value?.dapiActiveManaged?.data.rows[0][0],
          },
        ];
        return parsed;
      }),
    },

    //  Managed dAPIs per Chain
    managedPerChain: {
      chartType: "box",

      metadata: {
        title: "Managed dAPIs per Chain",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = chartsData?.value?.dapiManagedPerChain?.data.rows.map(
          (row) => {
            return {
              key: row[0],
              value: row[1],
            };
          }
        );
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return sorted;
      }),
    },

    //  Active Self-funded dAPIs
    activeSelfFunded: {
      chartType: "box",

      metadata: {
        title: "Active Self-funded dAPIs",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = [
          {
            key: null,
            value: chartsData?.value?.dapiActiveSelfFunded?.data.rows[0][0],
          },
        ];
        return parsed;
      }),
    },

    //  Self-funded dAPIs per Chain
    selfFundedPerChain: {
      chartType: "box",

      metadata: {
        title: "Self-funded dAPIs per Chain",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed = chartsData?.value?.dapiSelfFundedPerChain?.data.rows.map(
          (row) => {
            return {
              key: row[0],
              value: row[1],
            };
          }
        );
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return sorted;
      }),
    },

    // transactions per chain
    transactionsPerChain: {
      chartType: "pie",

      metadata: {
        title: "dAPI Transactions per Chain",
        chartColor: "blue",
      },

      options: {},

      data: computed(() => {
        const parsed =
          chartsData?.value?.dapiTransactionsPerChain?.data.rows.map((row) => {
            return {
              key: row[1],
              value: row[0],
            };
          });
        const sorted = parsed.sort((a, b) => b.value - a.value);

        return sorted;
      }),
    },

    //  dAPI Updates per day per Chain || transformed to weekly
    updatesPerDayPerChain: {
      chartType: "line",

      metadata: {
        title: "dAPI Updates per Week per Chain",
        label: "Updates",
        x: {
          title: "Weeks",
        },
        y: {
          title: "Updates",
        },
      },

      options: {},
      data: computed(() => {
        const parsed = [];
        chartsData?.value?.dapiUpdatesPerDayPerChain?.data.rows.forEach(
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

        //parsed = [{
        //  label: "Ethereum",
        //  data: [{x:  Date(), y: 1}, {x:  Date(), y: 2}]
        // }]

        function getWeekNumber(d) {
          const date = new Date(d);
          const start = new Date(date.getFullYear(), 0, 0);
          const diff =
            date -
            start +
            (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
          const oneDay = 1000 * 60 * 60 * 24;
          const day = Math.floor(diff / oneDay);
          return Math.ceil(day / 7);
        }

        const newParsed = parsed.map((chain) => {
          const weeklyData = chain.data.reduce((acc, curr) => {
            const weekNo = getWeekNumber(curr.x);
            const lastWeek = acc.length ? acc[acc.length - 1] : null;

            if (lastWeek && lastWeek.weekNo === weekNo) {
              // Continue the current week
              lastWeek.y += curr.y;
              lastWeek.count += 1;
            } else {
              // Start of a new week
              acc.push({ x: new Date(curr.x), y: curr.y, count: 1, weekNo });
            }

            return acc;
          }, []);

          return {
            ...chain,
            data: weeklyData,
          };
        });

        const datasets = newParsed.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
            borderColor: allColors[index],
          };
        });

        const largestDataset = datasets.reduce((a, b) => {
          return a.data.length > b.data.length ? a : b;
        });

        const labels = largestDataset.data.map((item) => {
          return item.x.toDateString();
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
