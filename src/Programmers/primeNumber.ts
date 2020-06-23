import {} from 'module';

const solution = (n: number) => {
  /**
   * 소수 찾기 (에라토스테네스의 체)
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const candidates = new Array<boolean>(n + 1).fill(true);
  const primes = [];
  let num = 2;
  while (num <= n) {
    if (candidates[num]) {
      primes.push(num);
      let curr = num;
      while (curr <= n) {
        candidates[curr] = false;
        curr += num;
      }
    }
    num += 1;
  }
  return primes.length;
};
