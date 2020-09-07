import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;
const [N, , range] = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const board: number[][] = [];
for (; index <= N; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (board: number[][], range: number) {
  const ENEMY = 1;
  const N = board.length;
  const M = board[0].length;
  const initEnemies: [number, number][] = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col] === ENEMY) {
        initEnemies.push([row, col]);
      }
    }
  }

  const killEnemy = function (
    archerCols: number[],
    enemies: [number, number][]
  ) {
    const size = enemies.length;
    const indexs = new Array(3).fill(-1);
    for (let locIndex = 0; locIndex < 3; locIndex++) {
      const archerCol = archerCols[locIndex];
      for (let enemIndex = 0; enemIndex < size; enemIndex++) {
        const [newRow, newCol] = enemies[enemIndex];
        const newDist = Math.abs(N - newRow) + Math.abs(archerCol - newCol);
        if (indexs[locIndex] === -1) {
          if (newDist <= range) {
            indexs[locIndex] = enemIndex;
          }
        } else {
          const [exRow, exCol] = enemies[indexs[locIndex]];
          const exDist = Math.abs(N - exRow) + Math.abs(archerCol - exCol);
          if (newDist < exDist || (newDist === exDist && newCol < exCol)) {
            indexs[locIndex] = enemIndex;
          }
        }
      }
    }
    const newEnemies: [number, number][] = [];
    for (let index = 0; index < size; index++) {
      if (!indexs.includes(index)) {
        newEnemies.push(enemies[index]);
      }
    }
    return {
      newEnemies,
      currKill: enemies.length - newEnemies.length,
    };
  };

  const moveEnemy = function (enemies: [number, number][]): [number, number][] {
    const newEnemies: [number, number][] = [];
    for (const [row, col] of enemies) {
      if (row + 1 !== N) {
        newEnemies.push([row + 1, col]);
      }
    }
    return newEnemies;
  };

  let answer = 0;
  for (let i = (1 << 3) - 1; i < 1 << M; i++) {
    const archerCols: number[] = [];
    for (let j = 0; j < M; j++) {
      if (i & (1 << j)) {
        archerCols.push(j);
      }
    }
    if (archerCols.length !== 3) {
      continue;
    }
    let enemies: [number, number][] = [];
    for (const [row, col] of initEnemies) {
      enemies.push([row, col]);
    }
    let killed = 0;
    while (enemies.length !== 0) {
      const { currKill, newEnemies } = killEnemy(archerCols, enemies);
      killed += currKill;
      enemies = moveEnemy(newEnemies);
    }
    answer = Math.max(killed, answer);
  }
  console.log(answer);
};

solution(board, range);
