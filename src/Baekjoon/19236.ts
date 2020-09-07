import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: string[][] = [];

for (let index = 0; index < 4; index++) {
  const splited = input[index]
    .trim()
    .split(' ')
    .map((v) => Number(v));
  board.push([]);
  for (let count = 0; count < 4; count++) {
    board[index].push(`${splited[2 * count]} ${splited[2 * count + 1] - 1}`);
  }
}

const solution = function (board: string[][]) {
  const SHARK = '0';
  const EMPTY = '-1';
  const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dc = [0, -1, -1, -1, 0, 1, 1, 1];
  let queue: [number, string[][]][] = [];

  let [answer, dir] = board[0][0].split(' ').map((v) => Number(v));
  board[0][0] = `${SHARK} ${dir}`;
  queue.push([answer, board]);

  const isShark = function (board: string[][], row: number, col: number) {
    const [num] = board[row][col].split(' ');
    return num === SHARK;
  };

  const moveFish = function (board: string[][]) {
    const visited = new Array<boolean>(16).fill(false);
    for (let target = 1; target <= 16; target++) {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const [num, dir] = board[row][col].split(' ').map((v) => Number(v));
          if (num === target && !visited[target - 1]) {
            visited[target - 1] = true;
            for (let inc = 0; inc < 8; inc++) {
              const newDir = (dir + inc) % 8;
              const nr = row + dr[newDir];
              const nc = col + dc[newDir];
              if (
                nr >= 0 &&
                nr < 4 &&
                nc >= 0 &&
                nc < 4 &&
                !isShark(board, nr, nc)
              ) {
                board[row][col] = board[nr][nc];
                board[nr][nc] = `${num} ${newDir}`;
                break;
              }
            }
          }
        }
      }
    }
  };

  const moveShark = function (
    board: string[][],
    sum: number,
    queue: [number, string[][]][]
  ) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (isShark(board, row, col)) {
          const [, dir] = board[row][col].split(' ').map((v) => Number(v));
          board[row][col] = EMPTY;
          for (let count = 1; count <= 3; count++) {
            const nr = row + dr[dir] * count;
            const nc = col + dc[dir] * count;
            if (
              nr < 0 ||
              nr >= 4 ||
              nc < 0 ||
              nc >= 4 ||
              board[nr][nc] === EMPTY
            ) {
              continue;
            }
            const copied: string[][] = [];
            for (let index = 0; index < 4; index++) {
              copied.push([...board[index]]);
            }
            const [num, newDir] = copied[nr][nc]
              .split(' ')
              .map((v) => Number(v));
            copied[nr][nc] = `${SHARK} ${newDir}`;
            answer = Math.max(answer, sum + num);
            queue.push([sum + num, copied]);
          }
        }
      }
    }
  };

  while (queue.length !== 0) {
    const newQueue: [number, string[][]][] = [];
    for (const [sum, board] of queue) {
      moveFish(board);
      moveShark(board, sum, newQueue);
    }
    queue = newQueue;
  }
  console.log(answer);
};

solution(board);
