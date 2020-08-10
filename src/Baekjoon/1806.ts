import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, target] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const arr = input[1]
  .trim()
  .split(' ')
  .map((v) => Number(v));

const solution = (arr: number[], target: number) => {
  const size = arr.length;
  let left = 0;
  let right = 0;
  let answer = 0;
  let sum = arr[0];
  while (left < size && right < size) {
    while (sum < target && left < size && right < size) {
      right += 1;
      sum += arr[right];
    }
    if (sum >= target) {
      if (answer === 0 || answer > right - left + 1) {
        answer = right - left + 1;
      }
      sum -= arr[left];
      left += 1;
      if (left > right) {
        right += 1;
      }
    }
    while (sum >= target && left < size && right < size) {
      answer = Math.min(answer, right - left + 1);
      if (left === right) {
        left += 1;
        right += 1;
        sum = arr[left];
      } else {
        sum -= arr[right];
        right -= 1;
      }
    }
  }
  console.log(answer);
};

solution(arr, target);
