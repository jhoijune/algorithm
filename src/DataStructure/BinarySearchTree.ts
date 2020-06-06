import LinkedBinaryTree, { Node } from './LinkedBinaryTree';
import Position from './Position';
import { threadId } from 'worker_threads';

class BinarySearchTree extends LinkedBinaryTree<number> {
  addRoot(element: number): Position<number> {
    if (this._root === null) {
      return super.addRoot(element);
    }
    const node = this._validate(this._root);
    const exRoot = this._root;
    this._root = this._createNode(element);
    this._size += 1;
    if (node.element! < element) {
      this._root.left = exRoot;
    } else {
      this._root.right = exRoot;
    }
    return this._root as Position<number>;
  }

  addLeft(parent: Position<number>, element: number): Position<number> {
    const node = this._validate(parent);
    if (node.element! <= element) {
      throw Error('element is greater or equal to parent element');
    }
    return super.addLeft(parent, element);
  }

  addRight(parent: Position<number>, element: number): Position<number> {
    const node = this._validate(parent);
    if (node.element! > element) {
      throw Error('element is less than parent element');
    }
    return super.addRight(parent, element);
  }

  private _insert(element: number, node: Node<number>): this {
    if (node.element! <= element) {
      if (node.right === null) {
        super.addRight(node, element);
        return this;
      }
      return this._insert(element, node.right);
    }
    if (node.left === null) {
      super.addLeft(node, element);
      return this;
    }
    return this._insert(element, node.left);
  }

  insert(element: number): this {
    if (this._root === null) {
      this.addRoot(element);
      return this;
    }
    return this._insert(element, this._root);
  }

  private _isLeftChild(node: Node<number>): boolean {
    const parent = node.parent!;
    if (parent.left === node) {
      return true;
    }
    return false;
  }

  private _delete(element: number, node: Node<number> | null): this {
    if (node === null) {
      return this;
    }
    if (node.element! > element) {
      return this._delete(element, node.left);
    } else if (node.element! < element) {
      return this._delete(element, node.right);
    }
    const childLen = this.numChildren(node);
    if (childLen === 0) {
      if (node.parent === null) {
        this._root = null;
      } else {
        if (this._isLeftChild(node)) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      }
    } else if (childLen === 1) {
      const hasLeftChild = node.left !== null ? true : false;
      if (node.parent === null) {
        this._root = hasLeftChild ? node.left : node.right;
      } else {
        if (this._isLeftChild(node)) {
          node.parent.left = hasLeftChild ? node.left : node.right;
        } else {
          node.parent.right = hasLeftChild ? node.left : node.right;
        }
      }
    } else {
      const rightNode = node.right!;
      const leftNode = node.left!;
      let minNode = rightNode.left;
      if (minNode === null) {
        if (node.parent === null) {
          this._root = rightNode;
          this._root.left = leftNode;
        } else {
          rightNode.left = leftNode;
          const isLeft = this._isLeftChild(node);
          if (isLeft) {
            node.parent.left = rightNode;
          } else {
            node.parent.right = rightNode;
          }
        }
      } else {
        while (minNode!.left === null) {
          minNode = minNode!.left;
        }
        minNode!.parent!.left = null;
        if (node.parent === null) {
          this._root = minNode!;
          this._root.left = leftNode;
          this._root.right = rightNode;
        } else {
          const isLeft = this._isLeftChild(node);
          minNode!.left = leftNode;
          minNode!.right = rightNode;
          if (isLeft) {
            node.parent!.left = minNode;
          } else {
            node.parent!.right = minNode;
          }
        }
      }
    }
    this._size -= 1;
    return this;
  }

  delete(element: number): this {
    return this._delete(element, this._root);
  }

  private _search(element: number, node: Node<number> | null): boolean {
    if (node === null) {
      return false;
    }
    if (node.element! > element) {
      return this._search(element, node.left);
    } else if (node.element! < element) {
      return this._search(element, node.right);
    }
    return true;
  }

  search(element: number): boolean {
    return this._search(element, this._root);
  }

  private _findMax(node: Node<number>): number {
    if (node.right !== null) {
      return this._findMax(node.right);
    }
    return node.element!;
  }

  private _findMin(node: Node<number>): number {
    if (node.left !== null) {
      return this._findMin(node.left);
    }
    return node.element!;
  }

  findMax(position: Position<number>): number {
    if (this._root === null) {
      throw Error('Binary Search Tree is empty');
    }
    return this._findMax(this._root);
  }

  findMin(): number {
    if (this._root === null) {
      throw Error('Binary Search Tree is empty');
    }
    return this._findMin(this._root);
  }
}

export default BinarySearchTree;
