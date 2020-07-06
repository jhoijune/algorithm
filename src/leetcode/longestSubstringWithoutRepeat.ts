const lengthOfLongestSubstring = (s: string) => {
  const size = s.length;
  const charSet = new Set<string>();
  let answer = 0;
  let left = 0;
  let right = 0;
  while (left < size && right < size) {
    if (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left += 1;
    } else {
      charSet.add(s[right]);
      right += 1;
      answer = Math.max(answer, right - left);
    }
  }
  return answer;
};
