import { combination } from '../../Util';

type CPI = {
  coord: Coordinate;
  index: number;
};

class Coordinate {
  constructor(public x: number, public y: number) {}
}

const calcDist = (c1: Coordinate, c2: Coordinate): number => {
  return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
};

const returnPair = (a: CPI, b: CPI): [number, number] => [a.index, b.index];

const closestPairUtil = (
  arr: CPI[],
  start: number,
  end: number
): [number, [number, number]] => {
  if (end - start === 1) {
    const dist = calcDist(arr[start].coord, arr[end].coord);
    return [dist, returnPair(arr[start], arr[end])];
  } else if (end - start === 2) {
    let dist = Infinity;
    let result: [number, number] = [-1, -1];
    for (const [e1, e2] of combination(start, start + 2, 2)) {
      const temp = calcDist(arr[e1].coord, arr[e2].coord);
      if (temp < dist) {
        dist = temp;
        result = returnPair(arr[e1], arr[e2]);
      }
    }
    return [dist, result];
  }
  const mid = Math.floor((start + end) / 2);
  const [delta1, pair1] = closestPairUtil(arr, start, mid);
  const [delta2, pair2] = closestPairUtil(arr, mid + 1, end);
  let delta = Math.min(delta1, delta2);
  let pair = delta === delta1 ? pair1 : pair2;
  const basis = (arr[mid].coord.x + arr[mid + 1].coord.x) / 2;
  const candidates = [];
  let index = mid;
  while (index >= 0 && arr[index].coord.x >= basis - delta) {
    candidates.push(index);
    index -= 1;
  }
  for (const e1 of candidates) {
    const { x, y } = arr[e1].coord;
    let e2 = mid + 1;
    while (e2 <= end && arr[e2].coord.x <= x + delta) {
      if (y - delta <= arr[e2].coord.y && y + delta >= arr[e2].coord.y) {
        const dist = calcDist(arr[e1].coord, arr[e2].coord);
        if (dist < delta) {
          delta = dist;
          pair = returnPair(arr[e1], arr[e2]);
        }
      }
      e2 += 1;
    }
  }
  return [delta, pair];
};

const closestPair = (coord: Coordinate[]): [number, number] => {
  const size = coord.length;
  if (size < 2) {
    return [-1, -1];
  }
  const modified: CPI[] = coord.map((coord, index) => ({
    index,
    coord,
  }));
  modified.sort(({ coord: a }, { coord: b }) => a.x - b.x);
  const [, pair] = closestPairUtil(modified, 0, size - 1);
  return pair;
};

const closestPair2 = (coord: Coordinate[]): [number, number] => {
  const size = coord.length;
  if (size < 2) {
    return [-1, -1];
  }
  let dist = Infinity;
  let pair: [number, number] = [-1, -1];
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const temp = calcDist(coord[i], coord[j]);
      if (temp < dist) {
        dist = temp;
        pair = [i, j];
      }
    }
  }
  return pair;
};

export { closestPair, closestPair2, Coordinate };
