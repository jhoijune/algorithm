const coinExchange = (coins: number[], target: number): number => {
  const count = new Array<number>(target + 1).fill(Infinity);
  count[0] = 0;
  for (let exchange = 1; exchange < target + 1; exchange++) {
    for (const coin of coins) {
      if (coin >= exchange) {
        count[exchange] = Math.min(count[exchange], count[exchange - coin] + 1);
      } else {
        break;
      }
    }
  }
  return count[target];
};

(() => {
  const coins = [5, 10, 20, 25, 50, 100];
  console.log(coinExchange(coins, 35));
})();
