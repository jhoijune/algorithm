import {} from 'module';

const solution = (sticker: number[]) => {
  const size = sticker.length;
  if (size <= 3) {
    let max = sticker[0];
    for (let index = 1; index < size; index++) {
      max = Math.max(sticker[index], max);
    }
    return max;
  }
  const table1 = new Array<number>(size).fill(0);
  const table2 = new Array<number>(size).fill(0);
  table1[0] = sticker[0];
  table1[1] = sticker[0];
  table2[1] = sticker[1];
  for (let index = 2; index < size - 1; index++) {
    table1[index] = Math.max(
      table1[index - 2] + sticker[index],
      table1[index - 1]
    );
    table2[index] = Math.max(
      table2[index - 2] + sticker[index],
      table2[index - 1]
    );
  }
  table1[size - 1] = Math.max(table1[size - 3], table1[size - 2]);
  table2[size - 1] = Math.max(
    table2[size - 3] + sticker[size - 1],
    table2[size - 2]
  );
  return Math.max(table1[size - 1], table2[size - 1]);
};

console.log(solution([1, 3, 2, 5, 4]));
