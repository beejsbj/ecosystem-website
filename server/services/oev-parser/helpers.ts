import fs from "fs";

export const ROOT_FOLDER = "server/services/oev-parser/oev-data";

// Calculate the OEV rate for a protocol
export function getOEVRate(protocol: any) {
  return (
    Number(protocol.totalSentToBuilderUSD) / Number(protocol.totalLiquidated)
  );
}

// Calculate the OEV for a protocol
export function getOEV(protocol: any) {
  return (
    Number(protocol.totalLiquidated) - Number(protocol.totalSentToBuilderUSD)
  );
}

// Calculate the total liquidated value for a protocol
export function getTotalLiquidated(protocol: any) {
  return protocol.reduce(
    (total: any, dataPoint: { totalLiquidated: any }) =>
      Number(total) + Number(dataPoint.totalLiquidated),
    0
  );
}

// Calculate the total sent to builder value for a protocol
export function getTotalSentToBuilder(protocol: any[]) {
  return protocol.reduce(
    (total, dataPoint) =>
      Number(total) + Number(dataPoint.totalSentToBuilderUSD),
    0
  );
}

// Calculate the total profit made by the searcher for a protocol
export function getTotalProfit(protocol: any[]) {
  return protocol.reduce(
    (total, dataPoint) =>
      Number(total) +
      Number(!dataPoint.totalProfitUSD ? 0 : dataPoint.totalProfitUSD),
    0
  );
}

// Convert the data array to a monthly data array
export function dataToMonthly(array: any[]) {
  const monthly: any = {};

  array.forEach((dataPoint, i) => {
    const date = new Date(dataPoint.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const key = `${month}-${year}`;

    if (monthly[key]) {
      monthly[key].totalLiquidated += Number(dataPoint.totalLiquidated);
      monthly[key].totalSentToBuilderUSD += Number(
        dataPoint.totalSentToBuilderUSD
      );
    } else {
      monthly[key] = {
        totalLiquidated: Number(dataPoint.totalLiquidated),
        totalSentToBuilderUSD: Number(dataPoint.totalSentToBuilderUSD),
        month: month,
        year: year,
        id: key,
        date: dataPoint.date,
      };
    }
  });

  const sorted = Object.values(monthly).sort((a: any, b: any) => {
    return (
      new Date(a.year, a.month).getTime() - new Date(b.year, b.month).getTime()
    );
  });

  return sorted;
}

// Convert the data array to a weekly data array
export function dataToWeekly(array: any[]) {
  const weekly: any = {};

  array.forEach((dataPoint, i) => {
    const date = new Date(dataPoint.date);
    const week = Math.ceil(
      (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
        604800000
    );

    const year = date.getFullYear();

    const key = `${week}-${year}`;

    if (weekly[key]) {
      weekly[key].totalLiquidated += Number(dataPoint.totalLiquidated);
      weekly[key].totalSentToBuilderUSD += Number(
        dataPoint.totalSentToBuilderUSD
      );
    } else {
      weekly[key] = {
        totalLiquidated: Number(dataPoint.totalLiquidated),
        totalSentToBuilderUSD: Number(dataPoint.totalSentToBuilderUSD),
        week: week,
        year: year,
        id: key,
        date: dataPoint.date,
      };
    }
  });

  const sorted = Object.values(weekly).sort((a: any, b: any) => {
    return (
      new Date(a.year, a.week).getTime() - new Date(b.year, b.week).getTime()
    );
  });

  return sorted;
}

export function dataToCumulative(array: any[]) {
  const cumulative: any[] = [];
  let totalLiquidated = 0;
  let totalSentToBuilderUSD = 0;

  array.forEach((dataPoint, i) => {
    totalLiquidated += Number(dataPoint.totalLiquidated);
    totalSentToBuilderUSD += Number(dataPoint.totalSentToBuilderUSD);

    cumulative.push({
      totalLiquidated: totalLiquidated,
      totalSentToBuilderUSD: totalSentToBuilderUSD,
      date: dataPoint.date,
    });
  });

  return cumulative;
}

export function getAllChains() {
  // Read the list of chain Ids from folders
  const folders: string[] = fs.readdirSync(ROOT_FOLDER);

  return folders;
}

export function combineLists(lists: any) {
  // Create an object to store values by date
  let combined: any = {};

  // Function to add values to combined object
  function addToCombined(list: any) {
    for (let item of list) {
      let [date, value1, value2] = item;
      if (!combined[date]) {
        combined[date] = [0, 0];
      }
      combined[date][0] += value1;
      combined[date][1] += value2;
    }
  }

  // Add values from both lists to combined object
  for (let list of lists) {
    addToCombined(list);
  }
  //   addToCombined(list2);

  // Convert combined object back to array
  let result = [];
  for (let date in combined) {
    result.push([date, ...combined[date]]);
  }

  result.sort((a, b) => {
    return new Date(a[0]).getTime() - new Date(b[0]).getTime();
  });

  return result;
}
