const fibonacci = (num: number): number => {
  if (num <= 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

(() => {
  console.log(fibonacci(10));
})();
