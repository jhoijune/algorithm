import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const infos: [number, number, number, number][] = [];
for (let index = 1; index < input.length; index++) {
  infos.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number, number, number]
  );
}

const solution = (infos: [number, number, number, number][]) => {
  const board = Array.from(Array(101), () =>
    new Array<boolean>(101).fill(false)
  );

  const markAxis = (x: number, y: number) => {
    if (x < 0 || x > 100 || y < 0 || y > 100) {
      return;
    }
    board[x][y] = true;
  };

  const dx = [1, 0, -1, 0];
  const dy = [0, -1, 0, 1];

  for (let [x, y, startDir, generation] of infos) {
    markAxis(x, y);
    const directions = [startDir];
    x += dx[startDir];
    y += dy[startDir];
    markAxis(x, y);
    let currGeneration = 0;
    while (currGeneration < generation) {
      const size = directions.length;
      for (let index = size - 1; index >= 0; index--) {
        const currDir = (directions[index] + 1) % 4;
        directions.push(currDir);
        x += dx[currDir];
        y += dy[currDir];
        markAxis(x, y);
      }
      currGeneration += 1;
    }
  }
  let answer = 0;
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      if (
        board[x][y] &&
        board[x + 1][y] &&
        board[x][y + 1] &&
        board[x + 1][y + 1]
      ) {
        answer += 1;
      }
    }
  }
  console.log(answer);
};

solution(infos);
