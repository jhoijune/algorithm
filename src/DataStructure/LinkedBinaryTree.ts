import BinaryTree from './BinaryTree';
import Position from './Position';

class Node<T> implements Position<T> {
  private _element: T | null;

  private _parent: Node<T> | null;

  private _left: Node<T> | null;

  private _right: Node<T> | null;

  constructor(element: T, parent?: Node<T>, left?: Node<T>, right?: Node<T>) {
    this._element = element;
    this._parent = parent || null;
    this._left = left || null;
    this._right = right || null;
  }

  // accessor methods
  get element(): T | null {
    return this._element;
  }

  get parent(): Node<T> | null {
    return this._parent;
  }

  get left(): Node<T> | null {
    return this._left;
  }

  get right(): Node<T> | null {
    return this._right;
  }

  // update methods

  set element(element: T | null) {
    this._element = element;
  }

  set parent(node: Node<T> | null) {
    this._parent = node;
  }

  set left(node: Node<T> | null) {
    this._left = node;
  }

  set right(node: Node<T> | null) {
    this._right = node;
  }
}

class LinkedBinaryTree<T> extends BinaryTree<T> {
  protected _root: Node<T> | null;

  private _size: number;

  constructor() {
    super();
    this._root = null;
    this._size = 0;
  }

  /**
   * Factory function to create a new node storing element
   * @param element
   * @param parent
   * @param left
   * @param right
   */
  protected _createNode(
    element: T,
    parent?: Node<T>,
    left?: Node<T>,
    right?: Node<T>
  ): Node<T> {
    return new Node(element, parent, left, right);
  }

  /**
   *  Validates the position and returns it as a node.
   *  prevent direct use of nodes.
   * @param p
   * @throws {Error} if argument p is not Position type
   * @throws {Error} if Position p is no longer in the tree.
   */
  protected _validate(p: Position<T>): Node<T> {
    if (!(p instanceof Node)) {
      throw Error('Not valid position type');
    }
    const node: Node<T> = p as Node<T>;
    if (node.parent === node) {
      throw Error('p is no longer in the tree');
    }
    return node;
  }

  /**
   * Returns the number of nodes in the tree.
   */
  size(): number {
    return this._size;
  }

  /**
   * Returns the root Position of the tree
   */
  root(): Position<T> | null {
    return this._root;
  }

  /**
   * Returns the Position of p's parent (or null if p is root).
   * @param p
   */
  parent(p: Position<T>): Position<T> | null {
    const node: Node<T> = this._validate(p);
    const parent: Node<T> | null = node.parent;
    return parent;
  }

  /**
   * Returns the Position of p's left child (or null if no child exists).
   * @param p
   */
  left(p: Position<T>): Position<T> | null {
    const node: Node<T> = this._validate(p);
    const left: Node<T> | null = node.left;
    if (left === null) {
      return left;
    }
    return left as Position<T>;
  }

  /**
   * Returns the Position of p's right child (or null if no child exists).
   * @param p
   */
  right(p: Position<T>): Position<T> | null {
    const node: Node<T> = this._validate(p);
    const right: Node<T> | null = node.right;
    if (right === null) {
      return right;
    }
    return right as Position<T>;
  }

  /**
   * Places element at the root of an empty tree and returns its new Position
   * @param element
   * @throws {Error} if tree is not empty.
   */
  addRoot(element: T): Position<T> {
    if (!this.isEmpty()) {
      throw Error('Tree is not empty');
    }
    this._root = this._createNode(element);
    this._size = 1;
    return this._root as Position<T>;
  }

  /**
   * Creates a new left child of Position p storing element e; returns its Position
   * @param parent
   * @param element
   * @throws {Error} if Position p already has a left child
   */
  addLeft(parent: Position<T>, element: T): Position<T> {
    const node: Node<T> = this._validate(parent);
    if (node.left !== null) {
      throw Error('p already has a left child');
    }
    const child: Node<T> = this._createNode(element, node);
    node.left = child;
    this._size += 1;
    return child as Position<T>;
  }

  /**
   * Creates a new right child of Position p storing element; returns its Position
   * @param parent
   * @param element
   * @throws {Error} if p already has a right child
   */
  addRight(parent: Position<T>, element: T): Position<T> {
    const node: Node<T> = this._validate(parent);
    if (node.right !== null) {
      throw Error('p already has a right child');
    }
    const child: Node<T> = this._createNode(element, node);
    node.right = child;
    this._size += 1;
    return child as Position<T>;
  }

  /**
   * Replaces the element at Position p with e and returns the replaced element.
   * @param p
   * @param element
   */
  set(p: Position<T>, element: T): T | null {
    const node: Node<T> = this._validate(p);
    const exElement: T | null = node.element;
    node.element = element;
    return exElement;
  }

  /**
   * Attaches trees t1 and t2 as left and right subtrees of external p.
   * @param p
   * @param t1
   * @param t2
   */
  attach(
    p: Position<T>,
    t1: LinkedBinaryTree<T>,
    t2: LinkedBinaryTree<T>
  ): void {
    if (this.isInternal(p)) {
      throw Error('p must be a leaf');
    }
    const node: Node<T> = this._validate(p);
    this._size += t1.size() + t2.size();
    if (!t1.isEmpty()) {
      t1._root!.parent = node;
      node.left = t1._root;
      t1._root = null;
      t1._size = 0;
    }
    if (!t2.isEmpty()) {
      t2._root!.parent = node;
      node.right = t2._root;
      t2._root = null;
      t2._size = 0;
    }
  }

  /**
   * Removes the node at Position p and replaces it with its child, if any.
   * @param p
   * @throws {Error} if position has two children.
   */
  remove(p: Position<T>) {
    if (this.numChildren(p) === 2) {
      throw Error('p has two children');
    }
    const node: Node<T> = this._validate(p);
    const child: Node<T> | null = node.left !== null ? node.left : node.right;
    const parent: Node<T> | null = node.parent;
    if (child !== null) {
      child.parent = parent;
    }
    if (parent === null) {
      this._root = child;
    } else {
      if (node === parent.left) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
    this._size -= 1;
    const exElement = node.element;
    node.element = null;
    node.left = null;
    node.right = null;
    node.parent = node;
    return exElement;
  }
}

export default LinkedBinaryTree;
