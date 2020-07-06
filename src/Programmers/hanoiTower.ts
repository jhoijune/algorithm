import {} from 'module';

const solution = (n: number): [number, number][] => {
  const answer: [number, number][] = [];
  const util = (n: number, src: number, dst: number, temp: number) => {
    if (n === 0) {
      return;
    }
    util(n - 1, src, temp, dst);
    answer.push([src, dst]);
    util(n - 1, temp, dst, src);
  };
  util(n, 1, 3, 2);
  return answer;
};
