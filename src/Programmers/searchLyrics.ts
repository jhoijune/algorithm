class TrieNode {
  char: string | null;

  parent: TrieNode | null;

  children: (TrieNode | null)[] = [];

  childrenSize: number = 0;

  map: Map<string, number> = new Map<string, number>();

  isLastChar: boolean = false;

  constructor(char: string | null, parent: TrieNode | null = null) {
    this.char = char;
    this.parent = parent;
  }
}

class Trie {
  private _root: TrieNode;

  private _size: number;

  constructor() {
    this._root = new TrieNode(null);
    this._size = 0;
  }

  /**
   * Returns the number of nodes in the tree.
   */
  size(): number {
    return this._size;
  }

  insert(element: string): this {
    const string = element.toLowerCase();
    let curr = this._root;
    for (const char of string) {
      const index = curr.map.get(char);
      if (typeof index === 'undefined') {
        const node = new TrieNode(char, curr);
        curr.children.push(node);
        curr.map.set(char, curr.children.length - 1);
        curr.childrenSize += 1;
        curr = node;
      } else {
        const child = curr.children[index];
        if (child === null) {
          const node = new TrieNode(char, curr);
          curr.children[index] = node;
          curr.childrenSize += 1;
          curr = node;
        } else {
          curr = child;
        }
      }
    }
    if (!curr.isLastChar) {
      curr.isLastChar = true;
      this._size += 1;
    }
    return this;
  }

  private _verify(node: TrieNode, char: string): TrieNode | null {
    const index = node.map.get(char);
    if (typeof index === 'undefined') {
      return null;
    }
    const child = node.children[index];
    if (child === null) {
      return null;
    }
    return child;
  }

  private _queryUtil(node: TrieNode, string: string, loc: number): number {
    if (string.length === loc && node.isLastChar) {
      return 1;
    } else if (string.length === loc) {
      return 0;
    }
    let result = 0;
    if (string[loc] === '?') {
      for (const children of node.children) {
        if (children !== null) {
          result += this._queryUtil(children, string, loc + 1);
        }
      }
    } else {
      const next = this._verify(node, string[loc]);
      if (next !== null) {
        result += this._queryUtil(next, string, loc + 1);
      }
    }
    return result;
  }

  query(element: string): number {
    const string = element.toLowerCase();
    const curr = this._root;
    const result = this._queryUtil(curr, string, 0);
    return result;
  }
}

const solution = (words: string[], queries: string[]): number[] => {
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }
  const answer: number[] = [];
  for (const query of queries) {
    const count = trie.query(query);
    answer.push(count);
  }
  return answer;
};
