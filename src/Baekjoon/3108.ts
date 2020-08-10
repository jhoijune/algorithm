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
  const set = [[[0, 0, 0, 0]]];

  const belongPointLine = (a: number[], b: number[]): boolean => {
    if (a[0] >= b[0] && a[0] <= b[1]) {
      return true;
    } else if (a[1] >= b[0] && a[1] <= b[1]) {
      return true;
    } else if (b[0] >= a[0] && b[0] <= a[1]) {
      return true;
    } else if (b[1] >= a[0] && b[1] <= a[1]) {
      return true;
    }
    return false;
  };

  const compareLine = (a: number[], b: number[]): boolean => {
    if (a[0] === a[2] && b[0] === b[2] && a[0] === b[0]) {
      // ㅣ ㅣ
      if (belongPointLine([a[1], a[3]], [b[1], b[3]])) {
        return true;
      } else {
        return false;
      }
    } else if (a[1] === a[3] && b[1] === b[3] && a[1] === b[1]) {
      // ㅡ ㅡ
      if (belongPointLine([a[0], a[2]], [b[0], b[2]])) {
        return true;
      } else {
        return false;
      }
    } else if (a[0] === a[2]) {
    }
    return false;
  };

  const compareRectangle = (a: number[], b: number[]): boolean => {
    const [ax1, ay1, ax2, ay2] = a;
    const [bx1, by1, bx2, by2] = b;
    return true;
  };
  for (const coord of coords) {
    let num = 0;
    while (num < set.length) {
      let belong = false;
      for (const ex of set[num]) {
        if (compareRectangle(ex, coord)) {
          belong = true;
          break;
        }
      }
      if (belong) {
        set[num].push(coord);
        break;
      } else {
        num += 1;
      }
    }
    if (num === set.length) {
      set.push([coord]);
    }
  }
  console.log(set.length - 1);
};
solution(coords);
