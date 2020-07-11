import { createInterface } from 'readline';

const solution = (adj: number[][]) => {
  const size = adj.length;
  let answer = Infinity;
  const visited = new Array<boolean>(size).fill(false);
  const dfs = (src: number, cost: number) => {
    if (visited.every((v) => v) && src === 0) {
      answer = Math.min(answer, cost);
    }
    for (let dst = 0; dst < size; dst++) {
      if (adj[src][dst] !== 0 && !visited[dst]) {
        visited[dst] = true;
        dfs(dst, cost + adj[src][dst]);
        visited[dst] = false;
      }
    }
  };
  dfs(0, 0);
  console.log(answer);
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let size = 0;

const adj: number[][] = [];

rl.on('line', (line) => {
  if (size === 0) {
    size = Number(line);
  } else {
    const container = line.split(' ').map((v) => Number(v));
    adj.push(container);
    if (adj.length === size) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(adj);
  process.exit();
});
