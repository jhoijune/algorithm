import Position from './Position';
import Tree from './Tree';

abstract class BinaryTree<T> extends Tree<T> {
  /**
   * Returns the Position of p's left child (or null if no child exists).
   * @param p
   */
  abstract left(p: Position<T>): Position<T> | null;

  /**
   * Returns the Position of p's right child (or null if no child exists).
   * @param p
   */
  abstract right(p: Position<T>): Position<T> | null;

  /**
   * Returns the Position of p's sibling (or null if no sibling exists).
   * @param p
   */
  sibling(p: Position<T>): Position<T> | null {
    const parent: Position<T> | null = this.parent(p);
    if (parent === null) {
      return null;
    }
    if (this.left(parent) === p) {
      return this.right(parent);
    }
    return this.left(parent);
  }

  /**
   * Returns the number of children of Position p
   * @param p
   */
  numChildren(p: Position<T>): number {
    let count: number = 0;
    if (this.left(p) !== null) {
      count += 1;
    }
    if (this.right(p) !== null) {
      count += 1;
    }
    return count;
  }

  *children(p: Position<T>): IterableIterator<Position<T>> {
    const left: Position<T> | null = this.left(p);
    const right: Position<T> | null = this.right(p);
    if (left !== null) {
      yield left;
    }
    if (right !== null) {
      yield right;
    }
  }

  /**
   * Generate an inorder iteration of positions in the tree.
   */
  *inorder(): IterableIterator<Position<T>> {
    if (!this.isEmpty()) {
      for (const position of this._subtree_inorder(this.root()!)) {
        yield position;
      }
    }
  }

  /**
   * Generate an inorder iteration of positions in subtree rooted at position.
   * @param position
   */
  private *_subtree_inorder(
    position: Position<T>
  ): IterableIterator<Position<T>> {
    if (this.left(position) !== null) {
      for (const grandChildren of this._subtree_inorder(this.left(position)!)) {
        yield grandChildren;
      }
    }
    yield position;
    if (this.right(position) !== null) {
      for (const grandChildren of this._subtree_inorder(
        this.right(position)!
      )) {
        yield grandChildren;
      }
    }
  }

  *positions(): IterableIterator<Position<T>> {
    for (const position of this.inorder()) {
      yield position;
    }
  }
}

export default BinaryTree;
