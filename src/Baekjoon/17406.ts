import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

let index = 0;

const [N, , K] = input[index++]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const board: number[][] = [];
const infos: [number, number, number][] = [];

for (; index <= N; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

for (; index <= N + K; index++) {
  infos.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v)) as [number, number, number]
  );
}

const solution = function (
  board: number[][],
  infos: [number, number, number][]
) {
  const N = board.length;
  const M = board[0].length;
  const K = infos.length;

  const rotate = function (board: number[][], info: [number, number, number]) {
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];
    for (let radius = info[2]; radius > 0; radius--) {
      let row = info[0] - radius - 1;
      let col = info[1] - radius - 1;
      let direction = 0;
      let ex = board[row][col];
      while (direction !== 4) {
        const nr = row + dr[direction];
        const nc = col + dc[direction];
        if (
          nr < info[0] - radius - 1 ||
          nr > info[0] + radius - 1 ||
          nc < info[1] - radius - 1 ||
          nc > info[1] + radius - 1
        ) {
          direction += 1;
          continue;
        }
        const temp = board[nr][nc];
        board[nr][nc] = ex;
        ex = temp;
        row = nr;
        col = nc;
      }
    }
  };

  const _permuationUtil = function* (
    curr: number[],
    visited: boolean[]
  ): IterableIterator<number[]> {
    if (curr.length === K) {
      yield curr;
    } else {
      for (let index = 0; index < K; index++) {
        if (!visited[index]) {
          visited[index] = true;
          curr.push(index);
          for (const indexs of _permuationUtil(curr, visited)) {
            yield indexs;
          }
          visited[index] = false;
          curr.pop();
        }
      }
    }
  };

  const permutation = function* (): IterableIterator<number[]> {
    const visited = new Array<boolean>(K).fill(false);
    for (const indexs of _permuationUtil([], visited)) {
      yield indexs;
    }
  };

  let answer = Infinity;
  for (const indexs of permutation()) {
    const tempBoard: number[][] = [];
    for (let index = 0; index < N; index++) {
      tempBoard.push([...board[index]]);
    }
    for (const index of indexs) {
      rotate(tempBoard, infos[index]);
    }
    let min = Infinity;
    tempBoard.forEach((numbers) => {
      const sum = numbers.reduce((prev, curr) => prev + curr);
      min = Math.min(min, sum);
    });
    answer = Math.min(answer, min);
  }
  console.log(answer);
};

solution(board, infos);
