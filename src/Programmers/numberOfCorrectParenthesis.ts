import {} from 'module';

const solution = (n: number): number => {
  const table = Array.from(Array(n + 1), () => new Set<string>());
  table[1].add('()');
  table[4].add('(())(())');
  for (let num = 2; num <= n; num++) {
    for (const ex of table[num - 1]) {
      table[num].add(`(${ex})`);
      table[num].add(`()${ex}`);
      table[num].add(`${ex}()`);
    }
  }
  console.log(table[5].size);
  return table[n].size;
};

console.log(solution(10));
