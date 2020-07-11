import {} from 'module';

const solution = (words: string[]) => {
  const size = words.length;
  words.sort();
  let answer = 0;

  const matchedCount = (word1: string, word2: string): number => {
    const size1 = word1.length;
    const size2 = word2.length;
    let matched = 0;
    while (matched < Math.min(size1, size2)) {
      if (word1[matched] === word2[matched]) {
        matched += 1;
      } else {
        break;
      }
    }
    return matched;
  };

  for (let curr = 0; curr < size; curr++) {
    let minCount = -Infinity;
    if (curr !== 0) {
      const count = matchedCount(words[curr], words[curr - 1]);
      minCount = Math.max(minCount, count + 1);
    }
    if (curr !== size - 1) {
      const count = matchedCount(words[curr], words[curr + 1]);
      minCount = Math.max(minCount, count + 1);
    }
    answer += Math.min(minCount, words[curr].length);
  }
  return answer;
};
