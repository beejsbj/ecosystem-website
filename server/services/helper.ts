export const isNumber = (n: string): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(Number(n));
};

export const validateEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};
