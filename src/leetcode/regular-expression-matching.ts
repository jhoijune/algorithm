const isMatch = function (s: string, p: string): boolean {
  const size = s.length;
  const re = /[a-z.]\*?/g;
  const splited = p.match(re);
  if (splited === null) {
    if (s === p) {
      return true;
    }
    return false;
  }
  let fixed = 0;
  let nonFixed = 0;
  for (let index = 0; index < splited.length; index++) {
    if (splited[index].length === 1) {
      fixed += 1;
    } else {
      nonFixed += 1;
    }
  }
  const limit = size - fixed;

  let answer = false;
  const DFS = (counts: number[], sum: number) => {
    if (counts.length === nonFixed) {
      let comp: string[] = [];
      let index = 0;
      for (const char of splited) {
        if (char.length === 2) {
          for (let count = 0; count < counts[index]; count++) {
            comp.push(char[0]);
          }
          index += 1;
        } else {
          comp.push(char);
        }
      }
      if (comp.length !== s.length) {
        return;
      }
      index = 0;
      for (; index < size; index++) {
        if (comp[index] !== s[index] && comp[index] !== '.') {
          return;
        }
      }
      answer = true;
      return;
    } else if (counts.length === nonFixed - 1) {
      counts.push(limit - sum);
      DFS(counts, limit);
      counts.pop();
    }
    for (let count = 0; count <= limit - sum; count++) {
      counts.push(count);
      DFS(counts, sum + count);
      if (answer) {
        return;
      }
      counts.pop();
    }
  };
  DFS([], 0);
  return answer;
};

const isMatch2 = function (s: string, p: string): boolean {
  let answer = false;
  const util = (s: string, p: string) => {
    if (answer) {
      return;
    }
    if (p.length === 0) {
      if (s.length === 0) {
        answer = true;
      }
      return;
    }
    if (p.length > 1 && p[1] === '*') {
      util(s, p.slice(2));
      if (s.length !== 0 && (s[0] === p[0] || p[0] === '.')) {
        util(s.slice(1), p.slice(2));
        util(s.slice(1), p);
      }
    } else if (s.length > 0 && (s[0] === p[0] || p[0] === '.')) {
      util(s.slice(1), p.slice(1));
    }
  };
  util(s, p);
  return answer;
};

console.log(isMatch2('a', 'ab*'));
