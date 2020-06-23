import {} from 'module';

const CODE_A = 'A'.charCodeAt(0);
const CODE_Z = 'Z'.charCodeAt(0);
const CODE_a = 'a'.charCodeAt(0);
const DIFF = CODE_Z - CODE_A + 1;

const solution = (s: string, n: number): string => {
  /**
   * 시저 암호
   * time complexity: O(n)
   */
  let answer = '';
  for (const char of s) {
    if (char === ' ') {
      answer += char;
    } else if (char.charCodeAt(0) >= CODE_A && char.charCodeAt(0) <= CODE_Z) {
      const code = (((char.charCodeAt(0) + n) % CODE_A) % DIFF) + CODE_A;
      answer += String.fromCharCode(code);
    } else {
      const code = (((char.charCodeAt(0) + n) % CODE_a) % DIFF) + CODE_a;
      answer += String.fromCharCode(code);
    }
  }
  return answer;
};
