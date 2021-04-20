const pow = function (x: number, n: number, aux: Map<number, number>): number {
  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return x;
  } else if (aux.has(n)) {
    return aux.get(n)!;
  }
  const left = pow(x, Math.ceil(n / 2), aux);
  aux.set(Math.ceil(n / 2), left);
  const right = pow(x, Math.floor(n / 2), aux);
  aux.set(Math.floor(n / 2), right);
  return left * right;
};

const myPow = function (x: number, n: number) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  const aux = new Map<number, number>();
  return pow(x, n, aux);
};
