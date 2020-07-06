import {} from 'module';

const solution = (n: number, s: number): number[] => {
  const num = Math.floor(s / n);
  if (num === 0) {
    return [-1];
  }
  const remain = s % n;
  const answer: number[] = [];
  for (let count = 0; count < n; count++) {
    if (n - count <= remain) {
      answer.push(num + 1);
    } else {
      answer.push(num);
    }
  }
  return answer;
};
