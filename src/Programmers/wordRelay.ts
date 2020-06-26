import {} from 'module';

const solution = (n: number, words: string[]): [number, number] => {
  /**
   * 영어 끝말잇기
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const size = words.length;
  const wordSet = new Set<string>();
  let lastChar: string | null = null;
  for (let index = 0; index < size; index++) {
    const word = words[index];
    const num = (index % n) + 1;
    const order = Math.floor(index / n) + 1;
    if (wordSet.has(word)) {
      return [num, order];
    } else {
      if (lastChar === null || word[0] === lastChar) {
        wordSet.add(word);
        lastChar = word[word.length - 1];
      } else {
        return [num, order];
      }
    }
  }
  return [0, 0];
};
