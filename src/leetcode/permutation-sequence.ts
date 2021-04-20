const getPermutation = function (n: number, k: number) {
  const used = new Array(n).fill(false);
  const answer: number[] = [];
  let fact = 1;
  for (let num = 1; num < n; num++) {
    fact *= num;
  }
  while (n > 0) {
    const target = Math.floor((k - 1) / fact) + 1;
    k = ((k - 1) % fact) + 1;
    let index = 0;
    let count = 0;
    while (index < used.length) {
      if (!used[index]) {
        count += 1;
      }
      if (count === target) {
        used[index] = true;
        answer.push(index + 1);
        break;
      }
      index += 1;
    }
    n -= 1;
    const split = Math.max(1, n);
    fact /= split;
  }
  return answer.join('');
};

console.log(getPermutation(4, 9));
