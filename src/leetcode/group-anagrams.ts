const groupAnagrams = function (strs: string[]): string[][] {
  const size = 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  const indexMapping = new Map<string, number>();
  const answer: string[][] = [];
  for (const str of strs) {
    const counter = new Array<number>(size).fill(0);
    for (const char of str) {
      const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      counter[index] += 1;
    }
    const key = counter.join(',');
    if (indexMapping.has(key)) {
      const index = indexMapping.get(key)!;
      answer[index].push(str);
    } else {
      const arr = [str];
      indexMapping.set(key, answer.length);
      answer.push(arr);
    }
  }
  return answer;
};
