import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');
const coords: number[][] = [];
for (let index = 1; index < input.length; index++) {
  coords.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}
const solution = (coords: number[][]) => {
  const MAX = 2001;
  const size = coords.length;
  const board = Array.from(Array(MAX), () => new Array<number>(MAX).fill(-1));
  const visited = Array.from(Array(MAX), () =>
    new Array<boolean>(MAX).fill(false)
  );
  board[1000][1000] = 0;
  for (let index = 0; index < size; index++) {
    const [x1, y1, x2, y2] = coords[index];
    board[(x1 + 500) * 2][(y1 + 500) * 2] = index + 1;
    board[(x1 + 500) * 2][(y2 + 500) * 2] = index + 1;
    board[(x2 + 500) * 2][(y1 + 500) * 2] = index + 1;
    board[(x2 + 500) * 2][(y2 + 500) * 2] = index + 1;
    for (let x = x1 + 1; x < x2; x++) {
      const convertedX = (x + 500) * 2;
      board[convertedX - 1][(y1 + 500) * 2] = index + 1;
      board[convertedX - 1][(y2 + 500) * 2] = index + 1;
      board[convertedX][(y1 + 500) * 2] = index + 1;
      board[convertedX][(y2 + 500) * 2] = index + 1;
      board[convertedX + 1][(y1 + 500) * 2] = index + 1;
      board[convertedX + 1][(y2 + 500) * 2] = index + 1;
    }
    for (let y = y1 + 1; y < y2; y++) {
      const convertedY = (y + 500) * 2;
      board[(x1 + 500) * 2][convertedY - 1] = index + 1;
      board[(x2 + 500) * 2][convertedY - 1] = index + 1;
      board[(x1 + 500) * 2][convertedY] = index + 1;
      board[(x2 + 500) * 2][convertedY] = index + 1;
      board[(x1 + 500) * 2][convertedY + 1] = index + 1;
      board[(x2 + 500) * 2][convertedY + 1] = index + 1;
    }
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const DFS = (x: number, y: number) => {
    visited[x][y] = true;
    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];
      if (nx < 0 || nx >= MAX || ny < 0 || ny >= MAX) {
        continue;
      }
      if (board[nx][ny] !== -1 && !visited[nx][ny]) {
        DFS(nx, ny);
      }
    }
  };

  let answer = 0;
  for (let x = 0; x < MAX; x++) {
    for (let y = 0; y < MAX; y++) {
      if (board[x][y] !== -1 && !visited[x][y]) {
        answer += 1;
        DFS(x, y);
      }
    }
  }
  console.log(answer - 1);
};
solution(coords);
