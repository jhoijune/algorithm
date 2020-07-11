import {} from 'module';

class TrieNode {
  char: string;

  size: number;

  children: Map<string, TrieNode> = new Map<string, TrieNode>();

  constructor(char: string) {
    this.char = char;
    this.size = 1;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode('');
    this.root.size = 0;
  }

  insert(word: string) {
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
        node.size += 1;
      }
      curr = node;
      loc += 1;
    }
  }

  isOnlyOne(str: string): boolean {
    const size = str.length;
    let curr = this.root;
    let loc = 0;
    while (loc < size) {
      curr = curr.children.get(str[loc])!;
      loc += 1;
    }
    return curr.size < 2;
  }
}

const solution = (words: string[]) => {
  /**
   * 자동완성
   */
  const trie = new Trie();
  let answer = 0;
  for (const word of words) {
    trie.insert(word);
  }
  for (const word of words) {
    const { length } = word;
    let loc = 0;
    while (loc < length - 1) {
      if (trie.isOnlyOne(word.slice(0, loc + 1))) {
        answer += loc + 1;
        break;
      }
      loc += 1;
    }
    if (loc === length - 1) {
      answer += length;
    }
  }
  return answer;
};
