import {} from 'module';

const solution = (dartResult: string) => {
  /**
   * 다트 게임
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const scores: number[] = [];
  const results = dartResult.match(/\d{1,}[SDT][*#]?/g)!;
  for (let index = 0; index < results.length; index++) {
    const curr = results[index];
    const [num] = curr.match(/\d{1,}/)!;
    const [bonus] = curr.match(/[SDT]/)!;
    const option = curr.match(/[*#]/);
    let score = Math.pow(
      Number.parseInt(num),
      bonus === 'S' ? 1 : bonus === 'D' ? 2 : 3
    );
    if (option !== null) {
      if (option[0] === '#') {
        score = score * -1;
      } else {
        score = score * 2;
        if (index !== 0) {
          scores[index - 1] = scores[index - 1] * 2;
        }
      }
    }
    scores.push(score);
  }
  return scores.reduce((prev, curr) => prev + curr, 0);
};

console.log(solution('1D2S3T*'));
