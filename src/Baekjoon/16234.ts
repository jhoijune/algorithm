import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, L, R] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const map: number[][] = [];
for (let index = 1; index < input.length; index++) {
  map.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = (map: number[][], L: number, R: number) => {
  const N = map.length;
  let count = 0;

  const dr = [1, 0, -1, 0];
  const dc = [0, 1, 0, -1];

  const explore = (
    row: number,
    col: number,
    group: [number, number][],
    isGrouped: boolean[][]
  ) => {
    for (let dir = 0; dir < 4; dir++) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (nr < 0 || nr >= N || nc < 0 || nc >= N) {
        continue;
      }
      const diff = Math.abs(map[row][col] - map[nr][nc]);
      if (diff >= L && diff <= R && !isGrouped[nr][nc]) {
        isGrouped[nr][nc] = true;
        group.push([nr, nc]);
        explore(nr, nc, group, isGrouped);
      }
    }
  };

  const grouping = (groups: [number, number][][]) => {
    for (const currGroup of groups) {
      let sum = 0;
      for (const [row, col] of currGroup) {
        sum += map[row][col];
      }
      const insert = Math.floor(sum / currGroup.length);
      for (const [row, col] of currGroup) {
        map[row][col] = insert;
      }
    }
  };

  while (true) {
    const isGrouped = Array.from(Array(N), () =>
      new Array<boolean>(N).fill(false)
    );
    const groups: [number, number][][] = [];
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (!isGrouped[row][col]) {
          isGrouped[row][col] = true;
          const currGroup: [number, number][] = [];
          currGroup.push([row, col]);
          explore(row, col, currGroup, isGrouped);
          groups.push(currGroup);
        }
      }
    }

    if (groups.length === N * N) {
      break;
    }
    grouping(groups);
    count += 1;
  }
  console.log(count);
};

solution(map, L, R);
