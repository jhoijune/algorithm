import Heap from '../../DataStructure/Heap';

class Node {
  public element: string | null;

  public left: Node | null = null;

  public right: Node | null = null;

  constructor(element: string | null) {
    this.element = element;
  }
}

class HuffmanTree {
  private _root: Node;

  private _table: { [char: string]: string } = {};

  constructor(element: string | null = null) {
    this._root = new Node(element);
  }

  static bind(t1: HuffmanTree, t2: HuffmanTree): HuffmanTree {
    const tree = new HuffmanTree();
    tree._root.left = t1._root;
    tree._root.right = t2._root;
    if (t1._root.element === null) {
      for (const char in t1._table) {
        const code = t1._table[char];
        tree._table[char] = '0' + code;
      }
    } else {
      const char = t1._root.element;
      tree._table[char] = '0';
    }
    if (t2._root.element === null) {
      for (const char in t2._table) {
        const code = t2._table[char];
        tree._table[char] = '1' + code;
      }
    } else {
      const char = t2._root.element;
      tree._table[char] = '1';
    }
    return tree;
  }

  print(): { [char: string]: string } {
    return { ...this._table };
  }
}

const encode = (text: string): [string, { [code: string]: string }] => {
  const ht = new Map<string, number>();
  const pq = new Heap<HuffmanTree>();
  for (const char of text) {
    if (ht.has(char)) {
      const exCount = ht.get(char)!;
      ht.set(char, exCount + 1);
    } else {
      ht.set(char, 1);
    }
  }
  for (const key of ht.keys()) {
    const count = ht.get(key)!;
    pq.add(count, new HuffmanTree(key));
  }
  while (pq.size() > 1) {
    const [count1, t1] = pq.remove();
    const [count2, t2] = pq.remove();
    const tree = HuffmanTree.bind(t1, t2);
    pq.add(count1 + count2, tree);
  }
  const [, tree] = pq.remove();
  const table = tree.print();
  let result = '';
  for (const char of text) {
    result += table[char];
  }
  const reversed: { [code: string]: string } = {};
  for (const char in table) {
    const code = table[char];
    reversed[code] = char;
  }
  return [result, reversed];
};

const decode = (encoded: string, table: { [key: string]: string }): string => {
  let result = '';
  let curr = '';
  for (const bit of encoded) {
    curr += bit;
    if (curr in table) {
      result += table[curr];
      curr = '';
    }
  }
  return result;
};

export { encode, decode };
