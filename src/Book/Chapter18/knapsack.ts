const knapsack = (weight: number[], profit: number[], limit: number) => {
  const size = weight.length;
  if (size !== profit.length) {
    throw Error('Invalid input');
  }
  const P = Array.from(Array(size), () => new Array<number>(limit + 1).fill(0));
  const cases = Array.from(Array(size), () => new Array<number>());
  cases[size - 1].push(limit);
  for (let curr = size - 2; curr > 0; curr--) {
    const availWeight = cases[curr + 1];
    for (const value of availWeight) {
      const diff = value - weight[curr];
      cases[curr].push(value);
      if (diff > 0) {
        cases[curr].push(diff);
      }
    }
  }
  for (let curr = 1; curr < size; curr++) {
    const availWeight = cases[curr];
    const currWeight = weight[curr];
    for (const value of availWeight) {
      if (currWeight > value) {
        P[curr][value] = P[curr - 1][value];
      } else {
        P[curr][value] = Math.max(
          P[curr - 1][value - currWeight] + profit[curr],
          P[curr - 1][value]
        );
      }
    }
  }
  return P[size - 1][limit];
};

(() => {
  const weight = [5, 10, 20];
  const profit = [50, 60, 140];
  console.log(knapsack(weight, profit, 30));
})();
