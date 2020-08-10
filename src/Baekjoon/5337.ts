import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');
const commands: string[] = [];
for (let index = 2; index < input.length; index += 2) {
  commands.push(input[index].trim());
}

const solution = (commands: string[]) => {
  const createSide = (str: string) =>
    Array.from(Array(3), () => new Array<string>(3).fill(str));

  const cube: {
    [key: string]: string[][];
  } = {
    U: createSide('w'),
    D: createSide('y'),
    F: createSide('r'),
    B: createSide('o'),
    L: createSide('g'),
    R: createSide('b'),
  };

  const printSide = (cube: { [key: string]: string[][] }, side: string) => {
    for (let row = 0; row < 3; row++) {
      console.log(cube[side][row].join(''));
    }
  };

  const copySide = (cube: { [key: string]: string[][] }, side: string) => {
    const result: string[][] = [];
    for (let row = 0; row < 3; row++) {
      result.push([...cube[side][row]]);
    }
    return result;
  };

  // [side,number,direction]
  const mapped: {
    [key: string]: [string, number, number][];
  } = {
    'U+': [
      ['F', 0, 0],
      ['L', 0, 0],
      ['B', 0, 0],
      ['R', 0, 0],
    ],
    'U-': [
      ['F', 0, 0],
      ['R', 0, 0],
      ['B', 0, 0],
      ['L', 0, 0],
    ],
    'D+': [
      ['F', 2, 0],
      ['R', 2, 0],
      ['B', 2, 0],
      ['L', 2, 0],
    ],
    'D-': [
      ['F', 2, 0],
      ['L', 2, 0],
      ['B', 2, 0],
      ['R', 2, 0],
    ],
    'F+': [
      ['U', 2, 2],
      ['R', 0, 1],
      ['D', 0, 2],
      ['L', 2, 1],
    ],
    'F-': [
      ['U', 2, 0],
      ['L', 2, 3],
      ['D', 0, 0],
      ['R', 0, 3],
    ],
    'B+': [
      ['U', 0, 0],
      ['L', 0, 3],
      ['D', 2, 0],
      ['R', 2, 3],
    ],
    'B-': [
      ['U', 0, 2],
      ['R', 2, 1],
      ['D', 2, 2],
      ['L', 0, 1],
    ],
    'L+': [
      ['U', 0, 3],
      ['F', 0, 1],
      ['D', 0, 1],
      ['B', 2, 3],
    ],
    'L-': [
      ['U', 0, 1],
      ['B', 2, 3],
      ['D', 0, 3],
      ['F', 0, 1],
    ],
    'R+': [
      ['U', 2, 1],
      ['B', 0, 3],
      ['D', 2, 3],
      ['F', 2, 1],
    ],
    'R-': [
      ['U', 2, 3],
      ['F', 2, 1],
      ['D', 2, 1],
      ['B', 0, 3],
    ],
  };

  const rotate = (
    cube: {
      [key: string]: string[][];
    },
    side: string,
    direction: string
  ) => {
    const copied: {
      [key: string]: string[][];
    } = {};
    copied[side] = copySide(cube, side);
    if (direction === '+') {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          cube[side][col][2 - row] = copied[side][row][col];
        }
      }
    } else {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          cube[side][2 - col][row] = copied[side][row][col];
        }
      }
    }

    const curr = mapped[side + direction];
    for (const [currSide] of curr) {
      copied[currSide] = copySide(cube, currSide);
    }
    for (let index = 0; index < 4; index++) {
      const [srcSide, srcNum, srcDir] = curr[index];
      const [targetSide, targetNum, targetDir] = curr[(index + 1) % 4];
      for (let num = 0; num < 3; num++) {
        switch (targetDir) {
          case 0: {
            if (srcDir % 2 === 0) {
              cube[targetSide][targetNum][num] = copied[srcSide][srcNum][num];
            } else {
              cube[targetSide][targetNum][num] = copied[srcSide][num][srcNum];
            }
            break;
          }
          case 1: {
            if (srcDir % 2 === 0) {
              cube[targetSide][num][targetNum] = copied[srcSide][srcNum][num];
            } else {
              cube[targetSide][num][targetNum] = copied[srcSide][num][srcNum];
            }
            break;
          }
          case 2: {
            if (srcDir % 2 === 0) {
              cube[targetSide][targetNum][2 - num] =
                copied[srcSide][srcNum][num];
            } else {
              cube[targetSide][targetNum][2 - num] =
                copied[srcSide][num][srcNum];
            }
            break;
          }
          case 3: {
            if (srcDir % 2 === 0) {
              cube[targetSide][2 - num][targetNum] =
                copied[srcSide][srcNum][num];
            } else {
              cube[targetSide][2 - num][targetNum] =
                copied[srcSide][num][srcNum];
            }
            break;
          }
        }
      }
    }
  };

  for (const command of commands) {
    const cube: {
      [key: string]: string[][];
    } = {
      U: createSide('w'),
      D: createSide('y'),
      F: createSide('r'),
      B: createSide('o'),
      L: createSide('g'),
      R: createSide('b'),
    };
    for (const curr of command.split(' ')) {
      rotate(cube, curr[0], curr[1]);
    }
    printSide(cube, 'U');
  }
};

solution(commands);
