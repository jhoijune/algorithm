import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [N, , H] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const info: [number, number][] = [];

for (let index = 1; index < input.length; index++) {
  info.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number]
  );
}

const solution = (N: number, H: number, info: [number, number][]) => {
  const horizontalInfo = Array.from(Array(H + 1), () =>
    new Array<boolean>(N).fill(false)
  );

  for (const [row, col] of info) {
    horizontalInfo[row][col] = true;
  }

  const goDown = (start: number) => {
    let loc = start;
    let height = 1;
    while (height <= H) {
      let inc = 0;
      if (loc <= N - 1 && horizontalInfo[height][loc]) {
        inc += 1;
      }
      if (loc > 1 && horizontalInfo[height][loc - 1]) {
        inc -= 1;
      }
      loc += inc;
      height += 1;
    }
    return loc;
  };

  let answer = -1;

  const installHorizontal = (count: number) => {
    let num = 1;
    while (num <= N && num === goDown(num)) {
      num += 1;
    }
    if (num === N + 1) {
      if (answer === -1 || answer > count) {
        answer = count;
      }
      return;
    }
    if (count === 3) {
      return;
    }
    for (let num = 1; num <= N; num++) {
      for (let height = 1; height <= H; height++) {
        if (
          (num === 1 || !horizontalInfo[height][num - 1]) &&
          !horizontalInfo[height][num] &&
          (num === N || !horizontalInfo[height][num + 1])
        ) {
          horizontalInfo[height][num] = true;
          installHorizontal(count + 1);
          horizontalInfo[height][num] = false;
        }
      }
    }
  };

  installHorizontal(0);
  console.log(answer);
};

solution(N, H, info);
