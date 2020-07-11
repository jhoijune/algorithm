import {} from 'module';

const solution = (n: number): number => {
  const answer: number[][] = [];

  const util = (result: number[]) => {
    const size = result.length;
    if (size === n) {
      answer.push([...result]);
    }
    for (let num = 1; num <= n; num++) {
      let index = 0;
      while (index < size) {
        if (
          num === result[index] ||
          Math.abs(num - result[index]) === size - index
        ) {
          break;
        }
        index += 1;
      }
      if (index === size) {
        result.push(num);
        util(result);
        result.pop();
      }
    }
  };

  util([]);
  console.log(answer);
  return answer.length;
};

console.log(solution(8));
