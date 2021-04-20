import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: number[][] = [];

for (let index = 1; index < input.length; index++) {
  board.push(
    input[index]
      .trim()
      .split('')
      .map((v) => Number(v))
  );
}

const solution = function (board: number[][]) {
  const N = board.length;
  const M = board[0].length;

  let answer = 0;
  const visited = Array.from(Array(N), () => new Array<boolean>(M).fill(false));

  const DFS = function (sum: number) {
    let row = -1;
    let col = -1;
    for (let r = 0; r < N && row === -1; r++) {
      for (let c = 0; c < M && col === -1; c++) {
        if (!visited[r][c]) {
          row = r;
          col = c;
        }
      }
    }

    if (row == -1 && col === -1) {
      answer = Math.max(answer, sum);
      return;
    }

    let num = board[row][col];
    visited[row][col] = true;
    DFS(sum + num);

    let curr = row + 1;

    while (curr < N && !visited[curr][col]) {
      num = num * 10 + board[curr][col];
      visited[curr][col] = true;
      DFS(sum + num);
      curr += 1;
    }
    curr -= 1;
    while (curr > row) {
      visited[curr][col] = false;
      curr -= 1;
    }

    num = board[row][col];
    curr = col + 1;

    while (curr < M && !visited[row][curr]) {
      num = num * 10 + board[row][curr];
      visited[row][curr] = true;
      DFS(sum + num);
      curr += 1;
    }
    curr -= 1;
    while (curr > col) {
      visited[row][curr] = false;
      curr -= 1;
    }
    visited[row][col] = false;
  };

  DFS(0);

  console.log(answer);
};

solution(board);
