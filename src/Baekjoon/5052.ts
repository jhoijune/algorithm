import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (strings: string[]) => {
  const size = strings.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i !== j) {
        const size1 = strings[i].length;
        const size2 = strings[j].length;
        const min = Math.min(size1, size2);
        for (let loc = 0; loc < min; loc++) {
          if (strings[i][loc] === strings[j][loc]) {
            console.log('NO');
            return;
          }
        }
      }
    }
  }
  console.log('YES');
};

let cases: number;
let count: number | null = null;
const phoneNumbers: string[][] = [];

rl.on('line', (line) => {
  if (typeof cases === 'undefined') {
    cases = Number(line);
  } else if (count === null) {
    count = Number(line);
    phoneNumbers.push([]);
  } else {
    phoneNumbers[phoneNumbers.length - 1].push(line);
    if (phoneNumbers[phoneNumbers.length - 1].length === count) {
      count === null;
      if (phoneNumbers.length === cases) {
        rl.close();
      }
    }
  }
}).on('close', () => {
  for (const phoneNumber of phoneNumbers) {
    solution(phoneNumber);
  }
  process.exit();
});
