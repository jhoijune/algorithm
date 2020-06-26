import {} from 'module';

const solution = (str1: string, str2: string) => {
  /**
   * 뉴스 클러스터링
   * time complexity: O(n+m)
   * space complexity: O(n+m)
   */
  const size1 = str1.length;
  const size2 = str2.length;
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  const wordSet = new Set<string>();
  let index = 0;
  const re = /[a-zA-Z]{2}/;
  while (index < size1 - 1) {
    const word = str1.slice(index, index + 2).toLowerCase();
    if (re.test(word)) {
      wordSet.add(word);
      const exCount = map1.get(word);
      if (typeof exCount === 'undefined') {
        map1.set(word, 1);
      } else {
        map1.set(word, exCount + 1);
      }
    }
    index += 1;
  }
  index = 0;
  while (index < size2 - 1) {
    const word = str2.slice(index, index + 2).toLowerCase();
    if (re.test(word)) {
      wordSet.add(word);
      const exCount = map2.get(word);
      if (typeof exCount === 'undefined') {
        map2.set(word, 1);
      } else {
        map2.set(word, exCount + 1);
      }
    }
    index += 1;
  }
  let numer = 0;
  let deno = 0;
  for (const word of wordSet.keys()) {
    const count1 = map1.get(word);
    const count2 = map2.get(word);
    if (typeof count1 !== 'undefined' && typeof count2 !== 'undefined') {
      numer += Math.min(count1, count2);
      deno += Math.max(count1, count2);
    } else if (typeof count1 !== 'undefined') {
      deno += count1;
    } else if (typeof count2 !== 'undefined') {
      deno += count2;
    }
  }
  let result: number;
  if (deno === 0) {
    result = 1;
  } else {
    result = numer / deno;
  }
  return Math.floor(result * 65536);
};
