import {} from 'module';
import { StringDecoder } from 'string_decoder';

declare global {
  interface String {
    reverse(): string;
  }
}

String.prototype.reverse = function (this: string) {
  return this.split('').reverse().join('');
};

class TrieNode {
  char: string;

  count: number = 1;

  children: Map<string, TrieNode> = new Map();

  constructor(char: string) {
    this.char = char;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode('');
    this.root.count = 0;
  }

  insert(word: string) {
    this.root.count += 1;
    const size = word.length;
    let curr = this.root;
    let loc = 0;
    while (loc < size) {
      const char = word[loc];
      let node = curr.children.get(char);
      if (typeof node === 'undefined') {
        node = new TrieNode(char);
        curr.children.set(char, node);
      } else {
        node.count += 1;
      }
      curr = node;
      loc += 1;
    }
  }

  returnMatched(str: string): number {
    const size = str.length;
    let curr = this.root;
    let loc = 0;
    while (loc < size) {
      const char = str[loc];
      if (char === '?') {
        return curr.count;
      }
      const node = curr.children.get(char);
      if (typeof node === 'undefined') {
        return 0;
      }
      curr = node;
      loc += 1;
    }
    return curr.count;
  }
}

const solution = (words: string[], queries: string[]): number[] => {
  /**
   * 가사 검색
   */
  const answer: number[] = [];
  const tries: (null | Trie)[] = new Array(10001).fill(null);
  const reverseTries: (null | Trie)[] = new Array(10001).fill(null);
  for (const word of words) {
    const size = word.length;
    if (tries[size] !== null) {
      tries[size]!.insert(word);
      reverseTries[size]!.insert(word.reverse());
    } else {
      const trie = new Trie();
      trie.insert(word);
      const reverseTrie = new Trie();
      reverseTrie.insert(word.reverse());
      tries[size] = trie;
      reverseTries[size] = reverseTrie;
    }
  }
  for (const query of queries) {
    const size = query.length;
    if (tries[size] === null) {
      answer.push(0);
    } else {
      if (query[0] === '?') {
        answer.push(reverseTries[size]!.returnMatched(query.reverse()));
      } else {
        answer.push(tries[size]!.returnMatched(query));
      }
    }
  }
  return answer;
};
