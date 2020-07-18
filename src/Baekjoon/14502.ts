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

function* combinationUtil<T>(
  arr: T[],
  k: number,
  loc: number,
  result: T[]
): IterableIterator<T[]> {
  if (k === 0) {
    yield result;
  } else {
    const size = arr.length;
    for (let index = loc; index < size; index++) {
      for (const value of combinationUtil(arr, k - 1, index + 1, [
        ...result,
        arr[index],
      ])) {
        yield value;
      }
    }
  }
}

function* combination<T>(arr: T[], k: number): IterableIterator<T[]> {
  for (const value of combinationUtil(arr, k, 0, [])) {
    yield value;
  }
}

const solution = (board: number[][]) => {
  const N = board.length;
  const M = board[0].length;
  const EMPTY = 0;
  const WALL = 1;
  const VIRUS = 2;
  const empty: [number, number][] = [];
  const virus: [number, number][] = [];
  let answer = 0;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col] === EMPTY) {
        empty.push([row, col] as [number, number]);
      } else if (board[row][col] === VIRUS) {
        virus.push([row, col] as [number, number]);
      }
    }
  }

  const erectWall = (board: number[][], locs: [number, number][]) => {
    for (const [row, col] of locs) {
      board[row][col] = WALL;
    }
  };

  const spreadVirusUtil = (board: number[][], loc: [number, number]) => {
    for (let dir = 0; dir < 4; dir++) {
      const nr = loc[0] + dr[dir];
      const nc = loc[1] + dc[dir];
      if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
        continue;
      }
      if (board[nr][nc] === EMPTY) {
        board[nr][nc] = VIRUS;
        spreadVirusUtil(board, [nr, nc]);
      }
    }
  };

  const spreadVirus = (board: number[][]) => {
    for (const loc of virus) {
      spreadVirusUtil(board, loc);
    }
  };

  const inspect = (board: number[][]) => {
    let result = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (board[row][col] === EMPTY) {
          result += 1;
        }
      }
    }
    answer = Math.max(answer, result);
  };

  for (const locs of combination(empty, 3)) {
    const tempBoard: number[][] = [];
    for (const row of board) {
      tempBoard.push([...row]);
    }
    erectWall(tempBoard, locs);
    spreadVirus(tempBoard);
    inspect(tempBoard);
  }
  console.log(answer);
};

solution(board);
