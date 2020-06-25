const convertBinary = (num: number): string => {
  let result = '';
  while (num !== 0) {
    const mod = num % 2;
    result = mod + result;
    num = Math.floor(num / 2);
  }
  return result;
};

export default convertBinary;
