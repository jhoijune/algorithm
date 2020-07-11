import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count: number;

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    count = Number(line);
  } else {
    if (true) {
      rl.close();
    }
  }
}).on('close', () => {
  process.exit();
});
