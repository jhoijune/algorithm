import {} from 'module';

const solution = (n: number, m: number) => {
  let great = n > m ? n : m;
  let small = n > m ? m : n;
  while (great % small !== 0) {
    const temp = small;
    small = great % small;
    great = temp;
  }
  return [small, (n * m) / small];
};
