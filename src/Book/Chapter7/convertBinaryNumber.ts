// Converting Decimal Numbers to Binary Numbers using stack data structure

const convertBinaryNumber = (num: number): string => {
  const stack: number[] = [];
  let foo = num;
  while (foo !== 0) {
    const quotient = Math.floor(foo / 2);
    const remainder = foo % 2;
    stack.push(remainder);
    foo = quotient;
  }
  stack.reverse();
  return '0b' + stack.join('');
};

(() => {
  console.log(convertBinaryNumber(10));
})();
