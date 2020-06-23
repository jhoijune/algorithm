import {} from 'module';

const convertBinary = (n: number) => {
  let result = '';
  while (n > 0) {
    const remain = n % 2;
    result = remain + result;
    n = Math.floor(n / 2);
  }
  return result;
};

const solution = (n: number, arr1: number[], arr2: number[]) => {
  /**
   * 비밀지도
   * time complexity: O(n^2);
   * space complexity: O(n^2);
   */
  const answer: string[] = [];
  for (let row = 0; row < n; row++) {
    let string = ''; //
    const code1 = convertBinary(arr1[row]).padStart(n, '0');
    const code2 = convertBinary(arr2[row]).padStart(n, '0');
    for (let col = 0; col < n; col++) {
      let code = Number.parseInt(code1[col]) | Number.parseInt(code2[col]);
      if (code === 1) {
        string += '#';
      } else {
        string += ' ';
      }
    }
    answer.push(string);
  }
  return answer;
};
