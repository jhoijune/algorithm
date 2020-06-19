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

  private _findUtil(element: string): TrieNode | null {
    let curr = this._root;
    for (const char of element) {
      const node = this._verify(curr, char);
      if (node === null) {
        return null;
      }
      curr = node;
    }
    return curr;
  }

  find(element: string): boolean {
    const string = element.toLowerCase();
    const node = this._findUtil(string);
    if (node === null || !node.isLastChar) {
      return false;
    }
    return true;
  }

  remove(element: string): boolean {
    const string = element.toLowerCase();
    const node = this._findUtil(string);
    if (node === null || !node.isLastChar) {
      return false;
    }
    let curr = node;
    while (curr.char !== null && curr.childrenSize === 0) {
      const ch = curr.char;
      curr = curr.parent!;
      const index = curr.map.get(ch)!;
      curr.children[index] = null;
      curr.childrenSize -= 1;
    }
    this._size -= 1;
    return true;
  }

  private _DFS(node: TrieNode, exString: string, result: string[]) {
    for (const child of node.children) {
      if (child !== null) {
        const candidate = exString + child.char;
        if (child.isLastChar) {
          result.push(candidate);
          this._DFS(child, candidate, result);
        } else {
          this._DFS(child, candidate, result);
        }
      }
    }
  }

  private _matchUtil(
    element: string,
    start?: TrieNode
  ): [TrieNode, string[]] | null {
    const string = element.toLowerCase();
    let curr: TrieNode;
    if (typeof start === 'undefined') {
      const node = this._findUtil(string);
      if (node === null) {
        return null;
      }
      curr = node;
    } else {
      const temp = this._verify(start, string[string.length - 1]);
      if (temp === null) {
        return null;
      }
      curr = temp;
    }
    const result: string[] = [];
    this._DFS(curr, string, result);
    return [curr, result];
  }

  match(element: string): string[] {
    const string = element.toLowerCase();
    const result = this._matchUtil(string);
    if (result === null) {
      return [];
    }
    return result[1];
  }
}

export default Trie;
