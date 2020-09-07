import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const populations: number[][] = [];
for (let index = 1; index < input.length; index++) {
  populations.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (populations: number[][]) {
  const N = populations.length;
  let answer = Infinity;

  const markBorder1 = function (
    district: number[][],
    x: number,
    y: number,
    d1: number,
    d2: number
  ) {
    for (let count = 0; count <= d1; count++) {
      district[x + count - 1][y - count - 1] = 5;
    }
  };

  const markBorder2 = function (
    district: number[][],
    x: number,
    y: number,
    d1: number,
    d2: number
  ) {
    for (let count = 0; count <= d2; count++) {
      district[x + count - 1][y + count - 1] = 5;
    }
  };

  const markBorder3 = function (
    district: number[][],
    x: number,
    y: number,
    d1: number,
    d2: number
  ) {
    for (let count = 0; count <= d2; count++) {
      district[x + d1 + count - 1][y - d1 + count - 1] = 5;
    }
  };

  const markBorder4 = function (
    district: number[][],
    x: number,
    y: number,
    d1: number,
    d2: number
  ) {
    for (let count = 0; count <= d1; count++) {
      district[x + d2 + count - 1][y + d2 - count - 1] = 5;
    }
  };

  for (let d1 = 1; d1 <= N; d1++) {
    for (let d2 = 1; d2 <= N; d2++) {
      for (let x = 1; x + d1 + d2 < N; x++) {
        for (let y = d1 + 1; y + d2 <= N; y++) {
          const district = Array.from(Array(N), () =>
            new Array<number>(N).fill(0)
          );
          markBorder1(district, x, y, d1, d2);
          markBorder2(district, x, y, d1, d2);
          markBorder3(district, x, y, d1, d2);
          markBorder4(district, x, y, d1, d2);

          for (let row = 0; row < N; row++) {
            let start = N;
            let end = 0;
            for (let col = 0; col < N; col++) {
              if (district[row][col] === 5) {
                start = Math.min(start, col);
                end = Math.max(end, col);
              }
            }
            for (let col = start + 1; col < end; col++) {
              district[row][col] = 5;
            }
          }
          for (let row = 1; row <= N; row++) {
            for (let col = 1; col <= N; col++) {
              if (district[row - 1][col - 1] === 5) {
                continue;
              } else if (row >= 1 && row < x + d1 && col >= 1 && col <= y) {
                district[row - 1][col - 1] = 1;
              } else if (row >= 1 && row <= x + d2 && col > y && col <= N) {
                district[row - 1][col - 1] = 2;
              } else if (
                row >= x + d1 &&
                row <= N &&
                col >= 1 &&
                col < y - d1 + d2
              ) {
                district[row - 1][col - 1] = 3;
              } else if (
                row > x + d2 &&
                row <= N &&
                col >= y - d1 + d2 &&
                col <= N
              ) {
                district[row - 1][col - 1] = 4;
              }
            }
          }

          const distPopulations = new Array(5).fill(0);
          for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
              const party = district[row][col] - 1;
              distPopulations[party] += populations[row][col];
            }
          }
          distPopulations.sort((a, b) => a - b);
          answer = Math.min(answer, distPopulations[4] - distPopulations[0]);
        }
      }
    }
  }
  console.log(answer);
};

solution(populations);
