import {} from 'module';

const solution = (begin: string, target: string, words: string[]): number => {
  /**
   * 단어 변환
   * time compleixty: O(n!)
   */
  if (!words.includes(target)) {
    return 0;
  }
  const wordLen = begin.length;
  const size = words.length;
  const isUsed = new Array(size).fill(false);
  let answer = Infinity;
  const util = (curr: string, index: number, count: number) => {
    if (curr === target) {
      answer = Math.min(answer, count);
      return;
    }
    if (!isUsed[index]) {
      isUsed[index] = true;
      let matched = 0;
      for (let loc = 0; loc < wordLen; loc++) {
        if (curr[loc] === words[index][loc]) {
          matched += 1;
        }
      }
      if (matched === wordLen - 1) {
        for (let ind = 0; ind < size; ind++) {
          util(words[index], ind, count + 1);
        }
      }
      isUsed[index] = false;
    }
  };
  for (let index = 0; index < size; index++) {
    util(begin, index, 0);
  }
  return answer;
};
