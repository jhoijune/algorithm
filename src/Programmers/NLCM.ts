import {} from 'module';

const gcd = (n: number, m: number) => {
  if (m > n) {
    const temp = n;
    n = m;
    m = temp;
  }
  while (n % m !== 0) {
    const remain = n % m;
    n = m;
    m = remain;
  }
  return m;
};

const solution = (arr: number[]): number => {
  return arr.reduce((prev, curr) => (prev * curr) / gcd(prev, curr), 1);
};

console.log(solution([2, 6, 8, 14]));
