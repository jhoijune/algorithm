import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;
const [N, M, fuel] = input[index++]
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
const taxi = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v) - 1) as [number, number];

const infos: [number, number, number, number][] = [];
for (; index < input.length; index++) {
  infos.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v) - 1) as [number, number, number, number]
  );
}

const solution = function (
  board: number[][],
  M: number,
  fuel: number,
  taxi: [number, number],
  infos: [number, number, number, number][]
) {
  const WALL = 1;
  const N = board.length;
  const moved = new Array(M).fill(false);

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const explore = function (): [number, number] {
    const visited = Array.from(Array(N), () =>
      new Array<boolean>(N).fill(false)
    );
    visited[taxi[0]][taxi[1]] = true;
    let queue: [number, number][] = [];
    const result: [number, number, number, number][] = [];
    queue.push(taxi);
    let used = 0;
    while (queue.length !== 0 && result.length === 0) {
      const newQueue: [number, number][] = [];
      for (const [row, col] of queue) {
        for (let index = 0; index < infos.length; index++) {
          if (
            !moved[index] &&
            infos[index][0] === row &&
            infos[index][1] === col
          ) {
            result.push([row, col, index, used]);
          }
        }
        for (let dir = 0; dir < 4; dir++) {
          const nr = row + dr[dir];
          const nc = col + dc[dir];
          if (
            nr < 0 ||
            nr >= N ||
            nc < 0 ||
            nc >= N ||
            board[nr][nc] === WALL ||
            visited[nr][nc]
          ) {
            continue;
          }
          visited[nr][nc] = true;
          newQueue.push([nr, nc]);
        }
      }
      queue = newQueue;
      used += 1;
    }
    if (result.length === 0) {
      return [-1, -1];
    }
    result.sort((a, b) => {
      let comp = a[0] - b[0];
      if (comp === 0) {
        comp = a[1] - b[1];
      }
      return comp;
    });
    taxi[0] = result[0][0];
    taxi[1] = result[0][1];
    moved[result[0][2]] = true;
    return [result[0][2], result[0][3]];
  };

  const move = function (number: number): number {
    const visited = Array.from(Array(N), () =>
      new Array<boolean>(N).fill(false)
    );
    visited[taxi[0]][taxi[1]] = true;
    const destination = [infos[number][2], infos[number][3]];
    let queue: [number, number][] = [];
    queue.push(taxi);
    let used = 0;
    if (taxi[0] === destination[0] && taxi[1] === destination[1]) {
      return used;
    }
    while (queue.length !== 0) {
      const newQueue: [number, number][] = [];
      for (const [row, col] of queue) {
        for (let dir = 0; dir < 4; dir++) {
          const nr = row + dr[dir];
          const nc = col + dc[dir];
          if (
            nr < 0 ||
            nr >= N ||
            nc < 0 ||
            nc >= N ||
            board[nr][nc] === 1 ||
            visited[nr][nc]
          ) {
            continue;
          }
          if (nr === destination[0] && nc === destination[1]) {
            taxi[0] = nr;
            taxi[1] = nc;
            return used + 1;
          } else {
            visited[nr][nc] = true;
            newQueue.push([nr, nc]);
          }
        }
      }
      queue = newQueue;
      used += 1;
    }
    return Number.MAX_VALUE;
  };

  for (let _ = 0; _ < M; _++) {
    let [number, used] = explore();
    if (number === -1 || fuel - used < 0) {
      console.log(-1);
      return;
    }
    fuel -= used;
    used = move(number);
    if (fuel - used < 0) {
      console.log(-1);
      return;
    }
    fuel -= used;
    fuel += used * 2;
  }
  console.log(fuel);
};

solution(board, M, fuel, taxi, infos);
