import { readFileSync } from 'fs';
/**
 * 메모리 초과를 해결하지 못하겠음
 */
const source = __dirname + '\\input.txt';
const input = readFileSync(source)
  .toString()
  .trim()
  .split('\n')
  .map((v) =>
    v
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );

const solution = (puzzle: number[][]) => {
  const start = (() => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (puzzle[row][col] === 0) {
          return [row, col] as [number, number];
        }
      }
    }
  })();
  const converted = puzzle.flat().join('');
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  let queue: [string, number, [number, number]][] = [];
  queue.push([converted, 0, start!]);
  const used: { [key: string]: boolean } = {};
  used[converted] = true;

  const convertCoord = (row: number, col: number) => 3 * row + col;

  const swap = (str: string, idx1: number, idx2: number): string => {
    const arr = str.split('');
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
    return arr.join('');
  };

  const check = (str: string) => {
    for (let index = 0; index < 9; index++) {
      if (str[index] !== String(index + 1) && str[index] !== '0') {
        return false;
      }
    }
    return true;
  };

  while (queue.length !== 0) {
    const [str, count, [row, col]] = queue.shift()!;
    if (check(str)) {
      console.log(count);
      return;
    }
    for (let dir = 0; dir < 4; dir++) {
      const nr = row + dr[dir];
      const nc = col + dc[dir];
      if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3) {
        const idx1 = convertCoord(row, col);
        const idx2 = convertCoord(nr, nc);
        const swapped = swap(str, idx1, idx2);
        if (!used[swapped]) {
          used[swapped] = true;
          queue.push([swapped, count + 1, [nr, nc]]);
        }
      }
    }
  }
  console.log(-1);
};

solution(input);
