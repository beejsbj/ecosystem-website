/**
 * formatNumber
 *
 * Formats a number into a more readable string representation with appropriate suffixes.
 *
 * @function
 *
 * @param {number|string} valueInc - The number to format
 * @returns {string} The formatted number as a string
 *
 * @example
 * formatNumber(1500);     // Returns "1.5K"
 * formatNumber("2000000"); // Returns "2.0M"
 * formatNumber(3500000000); // Returns "3.5B"
 * formatNumber(123.456);  // Returns "123.46"
 *
 * @description
 * This function takes a number and formats it for easier readability:
 * - Values >= 1 billion are suffixed with "B"
 * - Values >= 1 million are suffixed with "M"
 * - Values >= 1 thousand are suffixed with "K"
 * - Values < 1 thousand are rounded to 2 decimal places
 *
 * @note
 * The function accepts both number and string inputs, converting strings to numbers internally.
 */

export default function formatNumber(valueInc) {
  const value = Number(valueInc);
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

  return value.toFixed(2);
}
