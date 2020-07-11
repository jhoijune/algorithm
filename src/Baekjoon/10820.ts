import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (string: string) => {
  const counts = new Array<number>(4).fill(0);
  for (const char of string) {
    if (
      'a'.charCodeAt(0) <= char.charCodeAt(0) &&
      'z'.charCodeAt(0) >= char.charCodeAt(0)
    ) {
      counts[0] += 1;
    } else if (
      'A'.charCodeAt(0) <= char.charCodeAt(0) &&
      'Z'.charCodeAt(0) >= char.charCodeAt(0)
    ) {
      counts[1] += 1;
    } else if (!Number.isNaN(Number.parseInt(char))) {
      counts[2] += 1;
    } else if (char === ' ') {
      counts[3] += 1;
    }
  }
  console.log(`${counts[0]} ${counts[1]} ${counts[2]} ${counts[3]}`);
};

rl.on('line', (line) => {
  solution(line);
}).on('close', () => {
  process.exit();
});
