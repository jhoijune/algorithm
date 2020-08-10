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
  const M = board[0].length;
  const loc: [number, number][] = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col] >= 1 && board[row][col] <= 5) {
        loc.push([row, col]);
      }
    }
  }
  const locLen = loc.length;
  let answer = N * M;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const watch = (
    board: number[][],
    row: number,
    col: number,
    directions: number[]
  ) => {
    const newBoard = [];
    for (let row = 0; row < N; row++) {
      newBoard.push([...board[row]]);
    }
    for (const direction of directions) {
      let nr = row;
      let nc = col;
      while (true) {
        nr += dr[direction];
        nc += dc[direction];
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
          break;
        }
        if (newBoard[nr][nc] !== 6 && newBoard[nr][nc] === 0) {
          newBoard[nr][nc] = 7;
        } else if (newBoard[nr][nc] === 6) {
          break;
        }
      }
    }
    return newBoard;
  };

  const inspect = (board: number[][]): number => {
    let result = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (board[row][col] === 0) {
          result += 1;
        }
      }
    }
    return result;
  };

  const DFS = (board: number[][], index: number) => {
    if (index === locLen) {
      const blindNum = inspect(board);
      answer = Math.min(blindNum, answer);
      return;
    }
    const [row, col] = loc[index];
    const type = board[row][col];
    if (type === 1) {
      for (let direction = 0; direction < 4; direction++) {
        const newBoard = watch(board, row, col, [direction]);
        DFS(newBoard, index + 1);
      }
    } else if (type === 2) {
      for (let direction = 0; direction < 2; direction++) {
        const newBoard = watch(board, row, col, [direction, direction + 2]);
        DFS(newBoard, index + 1);
      }
    } else if (type === 3) {
      for (let direction = 0; direction < 4; direction++) {
        const newBoard = watch(board, row, col, [
          direction,
          (direction + 1) % 4,
        ]);
        DFS(newBoard, index + 1);
      }
    } else if (type === 4) {
      for (let direction = 0; direction < 4; direction++) {
        const newBoard = watch(board, row, col, [
          direction,
          (direction + 1) % 4,
          (direction + 2) % 4,
        ]);
        DFS(newBoard, index + 1);
      }
    } else if (type === 5) {
      const newBoard = watch(board, row, col, [0, 1, 2, 3]);
      DFS(newBoard, index + 1);
    }
  };

  DFS(board, 0);
  console.log(answer);
};

solution(board);
