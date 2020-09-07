import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const board: number[][] = [];
for (let index = 0; index < 9; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (board: number[][]) {
  const locations: [number, number][] = [];
  const locationIndex = new Map<string, number>();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        locationIndex.set(`${row},${col}`, locations.length);
        locations.push([row, col]);
      }
    }
  }

  const size = locations.length;

  const numbers = new Array<number>(size)
    .fill(0)
    .map(() => new Array<number>());

  for (let row = 0; row < 9; row++) {
    const isExist = new Array<boolean>(9).fill(false);
    const indexs: number[] = [];
    for (let col = 0; col < 9; col++) {
      if (locationIndex.has(`${row},${col}`)) {
        indexs.push(locationIndex.get(`${row},${col}`)!);
      }
      const num = board[row][col];
      isExist[num - 1] = true;
    }
    for (let number = 1; number < 10; number++) {
      if (!isExist[number - 1]) {
        for (const index of indexs) {
          if (!numbers[index].includes(number)) {
            numbers[index].push(number);
          }
        }
      }
    }
  }

  for (let col = 0; col < 9; col++) {
    const isExist = new Array<boolean>(9).fill(false);
    const indexs: number[] = [];
    for (let row = 0; row < 9; row++) {
      if (locationIndex.has(`${row},${col}`)) {
        indexs.push(locationIndex.get(`${row},${col}`)!);
      }
      const num = board[row][col];
      isExist[num - 1] = true;
    }
    for (let number = 1; number < 10; number++) {
      if (!isExist[number - 1]) {
        for (const index of indexs) {
          if (!numbers[index].includes(number)) {
            numbers[index].push(number);
          }
        }
      }
    }
  }

  for (let rowDistrict = 0; rowDistrict < 3; rowDistrict++) {
    for (let colDistrict = 0; colDistrict < 3; colDistrict++) {
      const isExist = new Array<boolean>(9).fill(false);
      const indexs: number[] = [];
      for (let rowInc = 0; rowInc < 3; rowInc++) {
        for (let colInc = 0; colInc < 3; colInc++) {
          if (
            locationIndex.has(
              `${rowDistrict * 3 + rowInc},${colDistrict * 3 + colInc}`
            )
          ) {
            indexs.push(
              locationIndex.get(
                `${rowDistrict * 3 + rowInc},${colDistrict * 3 + colInc}`
              )!
            );
          }
          const num = board[rowDistrict * 3 + rowInc][colDistrict * 3 + colInc];
          isExist[num - 1] = true;
        }
      }
      for (let number = 1; number < 10; number++) {
        if (!isExist[number - 1]) {
          for (const index of indexs) {
            if (!numbers[index].includes(number)) {
              numbers[index].push(number);
            }
          }
        }
      }
    }
  }

  const indexs = new Array<number>(size).fill(0);
  while (indexs[0] !== numbers[0].length) {
    for (let index = 0; index < size; index++) {
      const [row, col] = locations[index];
      const number = numbers[index][indexs[index]];
      board[row][col] = number;
    }

    let verified = true;
    for (let row = 0; row < 9 && verified; row++) {
      const isExist = new Array<boolean>(9).fill(false);
      for (let col = 0; col < 9 && verified; col++) {
        const num = board[row][col];
        if (isExist[num - 1]) {
          verified = false;
        } else {
          isExist[num - 1] = true;
        }
      }
    }

    for (let col = 0; col < 9 && verified; col++) {
      const isExist = new Array<boolean>(9).fill(false);
      for (let row = 0; row < 9 && verified; row++) {
        const num = board[row][col];
        if (isExist[num - 1]) {
          verified = false;
        } else {
          isExist[num - 1] = true;
        }
      }
    }

    for (let rowDistrict = 0; rowDistrict < 3 && verified; rowDistrict++) {
      for (let colDistrict = 0; colDistrict < 3 && verified; colDistrict++) {
        const isExist = new Array<boolean>(9).fill(false);
        for (let rowInc = 0; rowInc < 3 && verified; rowInc++) {
          for (let colInc = 0; colInc < 3 && verified; colInc++) {
            const num =
              board[rowDistrict * 3 + rowInc][colDistrict * 3 + colInc];
            if (isExist[num - 1]) {
              verified = false;
              break;
            } else {
              isExist[num - 1] = true;
            }
          }
        }
      }
    }

    if (verified) {
      for (let index = 0; index < 9; index++) {
        console.log(board[index].join(' '));
      }
      return;
    }

    indexs[size - 1] += 1;
    for (let index = size - 1; index > 0; index--) {
      if (indexs[index] === numbers[index].length) {
        indexs[index - 1] += 1;
        indexs[index] = 0;
      } else {
        break;
      }
    }
  }
};

solution(board);
