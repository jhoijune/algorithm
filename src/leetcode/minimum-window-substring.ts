const minWindow = (s: string, t: string) => {
  const size = s.length;
  const charMap = new Map<string, number>();
  for (const char of t) {
    const ex = charMap.get(char);
    if (typeof ex === 'undefined') {
      charMap.set(char, 1);
    } else {
      charMap.set(char, ex + 1);
    }
  }
  let answer = '';
  let left = 0;
  let right = 0;
  const map = new Map<string, number>();
  let count = 0;
  while (left < size && right < size) {
    if (charMap.has(s[right])) {
      const ex = map.get(s[right]);
      const num = charMap.get(s[right])!;
      if (typeof ex === 'undefined') {
        if (num === 1) {
          count += 1;
        }
        map.set(s[right], 1);
      } else {
        if (ex + 1 === num) {
          count += 1;
        }
        map.set(s[right], ex + 1);
      }
    }
    while (count === charMap.size) {
      if (answer.length === 0 || answer.length > right - left + 1) {
        answer = s.slice(left, right + 1);
      }
      if (charMap.has(s[left])) {
        const ex = map.get(s[left])!;
        if (ex === charMap.get(s[left])!) {
          count -= 1;
        }
        map.set(s[left], ex - 1);
      }
      left += 1;
    }
    right += 1;
  }
  return answer;
};
console.log(minWindow('ADOBECODEBANC', 'ABC'));
