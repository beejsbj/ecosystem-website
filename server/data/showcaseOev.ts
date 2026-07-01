const days = [
  "2024-01-01",
  "2024-02-01",
  "2024-03-01",
  "2024-04-01",
  "2024-05-01",
  "2024-06-01",
];

const protocols = [
  {
    slug: "aaveV2",
    name: "Aave V2",
    chainId: 1,
    icon: "/images/icons/dapp-icon.svg",
    totalLiquidated: 86000000,
    totalSentToBuilderUSD: 1220000,
    totalProfitUSD: 2140000,
    totalIncentiveUSD: 3360000,
    totalOevLostUSD: 3360000,
    hide: false,
  },
  {
    slug: "compoundV3Base",
    name: "Compound V3 Base",
    chainId: 8453,
    icon: "/images/icons/dapp-icon.svg",
    totalLiquidated: 42000000,
    totalSentToBuilderUSD: 610000,
    totalProfitUSD: 980000,
    totalIncentiveUSD: 1590000,
    totalOevLostUSD: 1590000,
    hide: false,
  },
  {
    slug: "morphoAaveV2",
    name: "Morpho Aave V2",
    chainId: 1,
    icon: "/images/icons/dapp-icon.svg",
    totalLiquidated: 51000000,
    totalSentToBuilderUSD: 720000,
    totalProfitUSD: 1180000,
    totalIncentiveUSD: 1900000,
    totalOevLostUSD: 1900000,
    hide: false,
  },
  {
    slug: "venusBsc",
    name: "Venus BSC",
    chainId: 56,
    icon: "/images/icons/dapp-icon.svg",
    totalLiquidated: 67000000,
    totalSentToBuilderUSD: 910000,
    totalProfitUSD: 1510000,
    totalIncentiveUSD: 2420000,
    totalOevLostUSD: 2420000,
    hide: false,
  },
];

export const showcaseOevProtocols = [
  ...protocols.map((protocol) => ({
    ...protocol,
    slug: `${protocol.slug}-${protocol.chainId}`,
  })),
  {
    slug: "total",
    name: "Total",
    chainId: 1,
    icon: "/images/icons/dapp-icon.svg",
    totalLiquidated: protocols.reduce((sum, item) => sum + item.totalLiquidated, 0),
    totalSentToBuilderUSD: protocols.reduce(
      (sum, item) => sum + item.totalSentToBuilderUSD,
      0
    ),
    totalProfitUSD: protocols.reduce((sum, item) => sum + item.totalProfitUSD, 0),
    totalIncentiveUSD: protocols.reduce(
      (sum, item) => sum + item.totalIncentiveUSD,
      0
    ),
    totalOevLostUSD: protocols.reduce((sum, item) => sum + item.totalOevLostUSD, 0),
    hide: true,
  },
];

export function getShowcaseOevChart(protocolId = "aaveV2-1", period = "cumulative") {
  const protocol = showcaseOevProtocols.find((item) => item.slug === protocolId);
  const totalLiquidated = protocol?.totalLiquidated || 86000000;
  const totalSentToBuilderUSD = protocol?.totalSentToBuilderUSD || 1220000;
  const totalProfitUSD = protocol?.totalProfitUSD || 2140000;
  const totalIncentiveUSD = protocol?.totalIncentiveUSD || 3360000;
  const divisor = period === "daily" ? 18 : period === "weekly" ? 12 : 6;

  return days.map((date, index) => {
    const progress = (index + 1) / days.length;
    return [
      date,
      Math.round((totalLiquidated * progress) / divisor),
      Math.round((totalSentToBuilderUSD * progress) / divisor),
      Math.round((totalProfitUSD * progress) / divisor),
      Math.round((totalIncentiveUSD * progress) / divisor),
      Math.round(((totalSentToBuilderUSD + totalProfitUSD) * progress) / divisor),
    ];
  });
}
