process.stdin.resume();
process.stdin.setEncoding('utf8');

const solveMeFirst = (a: number, b: number): number => a + b;

let input: string = '';

process.stdin.on('data', (data) => {
  input += data;
});

process.stdin.on('end', () => {
  const lines: string[] = input.split('\n');
  const a: number = parseInt(lines[0], 10);
  const b: number = parseInt(lines[1], 10);
  const result = solveMeFirst(a, b);
  console.log(result);
});
