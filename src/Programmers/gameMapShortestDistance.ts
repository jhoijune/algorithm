import {} from 'module';

const solution = (maps: number[][]): number => {
  /**
   * 게임맵 최단 거리
   */
  const EMPTY = 1;
  const N = maps.length;
  const M = maps[0].length;
  const visited = Array.from(Array(N), () => new Array<boolean>(M).fill(false));
  let queue: [number, number][] = [[0, 0]];
  let count = 1;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length !== 0) {
    const newQueue: [number, number][] = [];
    for (const [row, col] of queue) {
      for (let dir = 0; dir < 4; dir++) {
        const nr = row + dr[dir];
        const nc = col + dc[dir];
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
          continue;
        }
        if (nr === N - 1 && nc === M - 1) {
          return count + 1;
        }
        if (maps[nr][nc] === EMPTY && !visited[nr][nc]) {
          visited[nr][nc] = true;
          newQueue.push([nr, nc]);
        }
      }
    }
    queue = newQueue;
    count += 1;
  }
  return -1;
};

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
);
