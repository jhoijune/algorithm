import {} from 'module';

const rotate = (matrix: number[][]) => {
  const size = matrix.length;
  const copied: number[][] = [];
  for (const rows of matrix) {
    copied.push([...rows]);
  }
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      matrix[row][col] = copied[size - 1 - col][row];
    }
  }
};

const verify = (
  key: number[][],
  lock: number[][],
  lockSize: number,
  incRow: number,
  incCol: number
): boolean => {
  const M = key.length;
  const copied: number[][] = [];
  for (const rows of lock) {
    copied.push([...rows]);
  }
  for (let row = 0; row < M; row++) {
    for (let col = 0; col < M; col++) {
      copied[row + incRow][col + incCol] =
        copied[row + incRow][col + incCol] + key[row][col];
    }
  }
  for (let row = lockSize; row < 2 * lockSize; row++) {
    for (let col = lockSize; col < 2 * lockSize; col++) {
      if (copied[row][col] !== 1) {
        return false;
      }
    }
  }
  return true;
};

const solution = (key: number[][], lock: number[][]): boolean => {
  /**
   * 자물쇠와 열쇠
   */
  const M = key.length;
  const N = lock.length;
  const mod = Array.from(Array(3 * N), () => new Array<number>(3 * N).fill(0));
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      mod[N + row][N + col] = lock[row][col];
    }
  }
  for (let count = 0; count < 4; count++) {
    for (let incRow = 0; incRow < 2 * N; incRow++) {
      for (let incCol = 0; incCol < 2 * N; incCol++) {
        if (verify(key, mod, N, incRow, incCol)) {
          return true;
        }
      }
    }
    rotate(key);
  }
  return false;
};

console.log(
  solution(
    [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
  )
);
