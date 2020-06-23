import {} from 'module';

const computeGcd = (n: number, m: number): number => {
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

const solution = (w: number, h: number): number => {
  /**
   * 멀쩡한 사각형
   * time complexity: O(1);
   * TODO: 다시보기
   */
  let count = w * h;
  const gcd = computeGcd(w, h);
  count = count - (w + h - gcd);
  return count;
};

console.log(solution(6, 10));
