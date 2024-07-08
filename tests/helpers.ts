export function isValidHash(hash: string) {
  // Regular expression to match a 64-character hexadecimal string with '0x' prefix
  const hashRegex = /^0x[0-9a-fA-F]{64}$/;

  // Test the input string against the regular expression
  return hashRegex.test(hash);
}
