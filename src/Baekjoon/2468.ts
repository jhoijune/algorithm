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

const solution = function (board: number[][]) {
  const N = board.length;
  let answer = 0;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const visit = function (
    visited: boolean[][],
    row: number,
    col: number,
    height: number
  ) {
    visited[row][col] = true;
    for (let dir = 0; dir < 4; dir++) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (
        nr >= 0 &&
        nr < N &&
        nc >= 0 &&
        nc < N &&
        board[nr][nc] > height &&
        !visited[nr][nc]
      ) {
        visit(visited, nr, nc, height);
      }
    }
  };

  for (let height = 0; height <= 100; height++) {
    const visited = Array.from(Array(N), () =>
      new Array<boolean>(N).fill(false)
    );
    let safety = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] > height && !visited[row][col]) {
          visit(visited, row, col, height);
          safety += 1;
        }
      }
    }
    answer = Math.max(answer, safety);
  }
  console.log(answer);
};

solution(board);
