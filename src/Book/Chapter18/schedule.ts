const schedule = (
  e: [number, number],
  x: [number, number],
  a: [number[], number[]],
  t: [number[], number[]]
) => {
  const size = a[0].length;
  const t1 = new Array<number>(size);
  const t2 = new Array<number>(size);
  t1[0] = e[0] + a[0][0];
  t2[0] = e[1] + a[1][0];
  for (let index = 1; index < size - 1; index++) {
    t1[index] = Math.min(
      t1[index - 1] + a[0][index],
      t2[index - 1] + t[1][index - 1] + a[0][index]
    );
    t2[index] = Math.min(
      t2[index - 1] + a[1][index],
      t1[index - 1] + t[0][index - 1] + a[1][index]
    );
  }
  t1[size - 1] = t1[size - 2] + x[0];
  t2[size - 1] = t2[size - 2] + x[1];
  return Math.min(t1[size - 1], t2[size - 1]);
};
