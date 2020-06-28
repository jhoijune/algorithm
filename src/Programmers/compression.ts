import {} from 'module';

const solution = (msg: string) => {
  /**
   * 압축
   * time complexity: O(n^3)
   * space complexity: O(n)
   */
  const size = msg.length;
  const dict: string[] = [];
  for (let i = 0; i <= 'Z'.charCodeAt(0) - 'A'.charCodeAt(0); i++) {
    dict.push(String.fromCharCode('A'.charCodeAt(0) + i));
  }
  const answer: number[] = [];
  let maxLen = 1;
  let loc = 0;
  while (loc < size) {
    let len = maxLen;
    while (len > 0) {
      if (loc + len <= size) {
        const sliced = msg.slice(loc, loc + len);
        let index = dict.length - 1;
        for (; index >= 0; index--) {
          if (sliced == dict[index]) {
            answer.push(index + 1);
            break;
          }
        }
        if (index !== -1) {
          if (loc + len + 1 <= size) {
            const toAdd = msg.slice(loc, loc + len + 1);
            if (toAdd.length > maxLen) {
              maxLen = toAdd.length;
            }
            dict.push(toAdd);
          }
          break;
        }
      }
      len -= 1;
    }
    loc += len;
  }
  return answer;
};
