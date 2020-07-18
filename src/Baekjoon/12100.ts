import { readFileSync } from 'fs';
const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: number[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = (board: number[][]) => {
  const N = board.length;
  let answer = 0;

  const createKey = (board: number[][]): string => {
    const flattened = board.flat();
    return flattened.join('|');
  };

  const swap = (
    board: number[][],
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ) => {
    const temp = board[row1][col1];
    board[row1][col1] = board[row2][col2];
    board[row2][col2] = temp;
  };

  const merge = (
    board: number[][],
    used: boolean[][],
    tr: number,
    tc: number,
    or: number,
    oc: number
  ) => {
    board[tr][tc] = board[tr][tc] * 2;
    board[or][oc] = 0;
    used[tr][tc] = true;
  };

  const move = (board: number[][], direction: number): number[][] => {
    const copied: number[][] = [];
    for (const row of board) {
      copied.push([...row]);
    }
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];
    const merged = Array.from(Array(N), () =>
      new Array<boolean>(N).fill(false)
    );

    const [start, end, step] =
      direction % 3 === 0 ? [0, N, 1] : [N - 1, -1, -1];

    for (let row = start; row !== end; row += step) {
      for (let col = start; col !== end; col += step) {
        if (copied[row][col] === 0) {
          continue;
        }
        let currRow = row;
        let currCol = col;
        while (true) {
          const nr = currRow + dr[direction];
          const nc = currCol + dc[direction];
          if (nr < 0 || nr >= N || nc < 0 || nc >= N) {
            break;
          }
          if (copied[nr][nc] === 0) {
            swap(copied, currRow, currCol, nr, nc);
          } else if (
            copied[nr][nc] === copied[currRow][currCol] &&
            !merged[nr][nc]
          ) {
            merge(copied, merged, nr, nc, currRow, currCol);
            break;
          } else {
            break;
          }
          currRow = nr;
          currCol = nc;
        }
      }
    }

    return copied;
  };

  const inspect = (board: number[][]) => {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] > answer) {
          answer = board[row][col];
        }
      }
    }
  };

  let queue: number[][][] = [];
  queue.push(board);
  const set = new Set<string>();
  set.add(createKey(board));
  let count = 0;

  while (queue.length !== 0 && count < 5) {
    const newQueue: number[][][] = [];
    for (const tempBoard of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const moved = move(tempBoard, dir);
        const key = createKey(moved);
        if (!set.has(key)) {
          set.add(key);
          inspect(moved);
          newQueue.push(moved);
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
  console.log(answer);
};

solution(board);
