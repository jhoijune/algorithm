const findSubstring = function (s: string, words: string[]): number[] {
  const size = s.length;
  const wordsSize = words.length;
  if (size === 0 || wordsSize === 0) {
    return [];
  }
  const wordLen = words[0].length;
  const answer: number[] = [];
  const wordMap = new Map<string, number>();
  for (const word of words) {
    const ex = wordMap.get(word);
    if (typeof ex === 'undefined') {
      wordMap.set(word, 1);
    } else {
      wordMap.set(word, ex + 1);
    }
  }
  const tempMap = new Map<string, number>();
  for (let start = 0; start <= size - wordLen * wordsSize; start++) {
    let count = 0;
    for (; count < wordsSize; count++) {
      const sliced = s.slice(
        start + wordLen * count,
        start + wordLen * (count + 1)
      );
      if (wordMap.has(sliced)) {
        const curr = tempMap.get(sliced);
        const limit = wordMap.get(sliced)!;
        if (typeof curr === 'undefined') {
          tempMap.set(sliced, 1);
        } else if (curr < limit) {
          tempMap.set(sliced, curr + 1);
        } else if (curr === limit) {
          break;
        }
      } else {
        break;
      }
    }
    if (count === wordsSize) {
      answer.push(start);
    }
    tempMap.clear();
  }
  return answer;
};

console.log(
  findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word'])
);
