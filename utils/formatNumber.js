export default function formatNumber(value) {
  const thresholds = [
    { limit: 1e9, suffix: "B" },
    { limit: 1e6, suffix: "M" },
    { limit: 1e3, suffix: "K" },
  ];

  for (let i = 0; i < thresholds.length; i++) {
    const { limit, suffix } = thresholds[i];
    if (value >= limit) {
      return (value / limit).toFixed(1) + suffix;
    }
  }

  return value.toFixed(1).toString();
}
