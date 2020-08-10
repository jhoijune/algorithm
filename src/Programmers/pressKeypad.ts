import {} from 'module';
import { result } from 'lodash';

const solution = (numbers: number[], hand: 'left' | 'right'): string => {
  const mapping: {
    [key: number]: [number, number];
  } = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    0: [3, 1],
  };
  let left = [3, 0];
  let right = [3, 2];
  const answer: ('L' | 'R')[] = [];
  for (const number of numbers) {
    if (number % 3 === 1) {
      left = mapping[number];
      answer.push('L');
    } else if (number % 3 === 0 && number !== 0) {
      right = mapping[number];
      answer.push('R');
    } else {
      const lDiff =
        Math.abs(mapping[number][0] - left[0]) +
        Math.abs(mapping[number][1] - left[1]);
      const rDiff =
        Math.abs(mapping[number][0] - right[0]) +
        Math.abs(mapping[number][1] - right[1]);
      if (lDiff < rDiff || (lDiff === rDiff && hand === 'left')) {
        left = mapping[number];
        answer.push('L');
      } else {
        right = mapping[number];
        answer.push('R');
      }
    }
  }
  return answer.join('');
};

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));
