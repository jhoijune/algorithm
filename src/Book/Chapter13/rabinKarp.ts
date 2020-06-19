const rabinKarp = (text: string, pattern: string): number => {
  const prime = 109345121;
  const scale = Math.floor(Math.random() * prime);
  const shift = Math.floor(Math.random() * prime);
  const hashFunction = (string: string): number => {
    let hashCode = 0;
    for (const char of string) {
      const charCode = char.charCodeAt(0);
      hashCode = (hashCode << 5) - hashCode + charCode;
      hashCode |= 0;
    }
    return (hashCode * scale + shift) % prime;
  };
  const textLen = text.length;
  const patternLen = pattern.length;
  const patternCode = hashFunction(pattern);
  let start = 0;
  while (start <= textLen - patternLen) {
    const portion = text.slice(start, start + patternLen);
    const portionCode = hashFunction(portion);
    if (portionCode === patternCode) {
      if (portion === pattern) {
        return start;
      }
    }
    start += 1;
  }
  return -1;
};
