import {} from 'module';

const solution = (n: number, a: number, b: number): number => {
  let round = 1;
  while (Math.ceil(a / 2) !== Math.ceil(b / 2)) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    round += 1;
  }
  return round;
};
