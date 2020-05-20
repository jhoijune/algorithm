const GCD = (num1: number, num2: number): number => {
  if (num1 < num2) {
    return GCD(num2, num1);
  }
  if (num1 % num2 === 0) {
    return num2;
  }
  return GCD(num2, num1 % num2);
};

(() => {
  console.log(GCD(15, 7));
})();
