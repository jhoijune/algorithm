import {} from 'module';

const solution = (baseball: [number, number, number][]): number => {
  /**
   * 숫자 야구
   * TODO: 다시 보기 (완전 탐색)
   */
  let answer = 0;
  for (let number = 123; number < 988; number++) {
    const numbers = String(number);
    if (
      numbers[0] === numbers[1] ||
      numbers[0] === numbers[2] ||
      numbers[1] == numbers[2]
    ) {
      continue;
    } else if (numbers.indexOf('0') >= 0) {
      continue;
    }
    let able = true;
    for (const [expect, realStrike, realBall] of baseball) {
      const str = String(expect);
      let strike = 0;
      let ball = 0;
      for (let index = 0; index < 3; index++) {
        if (str[index] === numbers[index]) {
          strike += 1;
        } else {
          for (let count = 1; count < 3; count++) {
            if (str[index] === numbers[(index + count) % 3]) {
              ball += 1;
            }
          }
        }
      }
      if (strike !== realStrike || ball !== realBall) {
        able = false;
        break;
      }
    }
    if (able) {
      answer += 1;
    }
  }
  return answer;
};
