<script setup>
const props = defineProps(["dapp", "proxy"]);

const mockData = [
  {
    value: 3032.4767,
    timestamp: "2024-04-17 14:05:01",
    transactionId:
      "0x87277c903b0b0a30b62fc5eefabc3f0733f8273bfd43c142d3b673c8c45bbffc",
  },
  {
    value: 3002.3068,
    timestamp: "2024-04-17 13:56:34",
    transactionId:
      "0x39f8d88ceacc0d3743680c6c6ae57099bf32a9095ae3821c07abca1c21e04b3f",
  },
  {
    value: 2972.1199,
    timestamp: "2024-04-17 12:12:04",
    transactionId:
      "0x13613410544c271d75d3c0f20a8c1ad2f2056d03f8f74f157b9a6aa5445c32f2",
  },
  {
    value: 2939.51,
    timestamp: "2024-04-17 11:32:32",
    transactionId:
      "0x833b5626f7eda42d8ec1c03308d8e1c4ef2648b0244271cd715bbacc513c7226",
  },
  {
    value: 2970.93,
    timestamp: "2024-04-17 11:03:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabbd",
  },
];

function getTime(timestamp) {
  const date = new Date(timestamp);
  // 14:05:01, 24hr

  return date.toLocaleTimeString("en-GB");
}

function getDate(timestamp) {
  const date = new Date(timestamp);
  //Jun 1, 2021
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getScannerLink(transactionId) {
  if (props.proxy.chainId === 1) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  if (props.proxy.chainId === 56) {
    return `https://bscscan.com/tx/${transactionId}`;
  }

  return "google.com";
}
</script>

<template>
  <div class="transactions-card">
    <h2 class="teaser-voice">Recent OEV transactions</h2>

    <ul class="transaction-list">
      <li class="head row">
        <div class="cell">
          <p>Value</p>
        </div>
        <div class="cell">
          <p>Timestamp</p>
        </div>
        <div class="cell">
          <p>Transaction ID</p>
        </div>
        <div class="cell"></div>
      </li>
      <li
        class="row"
        v-for="transaction in mockData"
        :key="transaction.transactionId"
      >
        <div class="cell">
          <p class="time whisper-voice">{{ getTime(transaction.timestamp) }}</p>
          <p class="date solid-voice">{{ getDate(transaction.timestamp) }}</p>
        </div>

        <div class="cell">
          <p class="solid-voice">${{ transaction.value }}</p>
        </div>

        <div class="cell">
          <p>
            <WalletAddress :walletAddress="transaction.transactionId" />
          </p>
        </div>

        <div class="cell">
          <NuxtLink :to="getScannerLink(transaction.transactionId)">
            <button class="icon external-link"></button>
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.transactions-card {
  display: grid;
  gap: var(--space-s);
  padding: var(--space-m);
  background: var(--paper);

  border: var(--border-dark);
  border-radius: var(--corners);
}

.transaction-list {
  margin-top: 1rem;
  display: grid;
  gap: var(--space-s);

  li {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.2fr;
    align-items: end;
    gap: var(--space-xs);
    padding: var(--space-xs);
    padding-top: 0;

    border-bottom: var(--border-dark);

    p + p {
      margin-top: 0;
    }

    .date {
      color: var(--gray-lighter);
    }

    .icon.external-link {
      justify-self: stretch;
      align-self: stretch;
    }
  }
}
</style>
