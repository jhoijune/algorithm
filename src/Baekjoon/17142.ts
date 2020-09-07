import { readFileSync } from 'fs';

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const [, M] = input[0]
  .trim()
  .split(' ')
  .map((v) => Number(v));
const board: number[][] = [];
for (let index = 1; index < input.length; index++) {
  board.push(
    input[index]
      .trim()
      .split(' ')
      .map((v) => Number(v))
  );
}

const solution = function (board: number[][], M: number) {
  const WALL = 1;
  const VIRUS = 2;
  const N = board.length;
  const virusCoords: string[] = [];
  let wallLen = 0;

  const createKey = (row: number, col: number) => `${row},${col}`;

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (board[row][col] === VIRUS) {
        virusCoords.push(createKey(row, col));
      } else if (board[row][col] === WALL) {
        wallLen += 1;
      }
    }
  }

  const target = N * N - wallLen;

  if (virusCoords.length === target) {
    console.log(0);
    return;
  }

  const combinationUtil = function* (
    start: number,
    count: number,
    indexs: number[]
  ): IterableIterator<number[]> {
    if (count === M) {
      yield indexs;
    } else {
      for (let index = start; index < virusCoords.length - M + count; index++) {
        indexs.push(index);
        for (const yielded of combinationUtil(start + 1, count + 1, indexs)) {
          yield yielded;
        }
        indexs.pop();
      }
    }
  };

  const combination = function* (): IterableIterator<number[]> {
    for (const indexs of combinationUtil(0, 0, [])) {
      yield indexs;
    }
  };

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const spreadVirus = function (coords: Set<string>): Set<string> {
    const spreaded = new Set<string>();
    for (const coord of coords) {
      spreaded.add(coord);
      const [row, col] = coord.split(',').map((v) => Number(v));
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr >= 0 && nr < N && nc >= 0 && nc < N && board[nr][nc] !== WALL) {
          const key = createKey(nr, nc);
          spreaded.add(key);
        }
      }
    }
    return spreaded;
  };

  const checkBoard = function (coords: Set<string>): boolean {
    const union = new Set<string>(virusCoords);
    for (const coord of coords) {
      union.add(coord);
    }
    return union.size === target;
  };

  let queue: Set<string>[] = [];
  for (const indexs of combination()) {
    const coords = new Set<string>();
    for (const index of indexs) {
      coords.add(virusCoords[index]);
    }
    queue.push(coords);
  }

  let time = 1;
  while (queue.length !== 0) {
    const newQueue: Set<string>[] = [];
    for (const coords of queue) {
      const newCoords = spreadVirus(coords);
      if (newCoords.size === coords.size) {
        continue;
      }
      if (checkBoard(newCoords)) {
        console.log(time);
        return;
      }
      newQueue.push(newCoords);
    }
    queue = newQueue;
    time += 1;
  }
  console.log(-1);
};

solution(board, M);
