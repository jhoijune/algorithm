import Position from './Position';
import Tree from './Tree';

abstract class GeneralTree<T> extends Tree<T> {
  /**
   * Returns the Position of p's sibling (or null if no sibling exists).
   * @param p
   */
  sibling(p: Position<T>): Position<T> | null {}

  /**
   * Returns the number of children of Position p
   * @param p
   */
  numChildren(p: Position<T>): number {}

  *children(p: Position<T>): IterableIterator<Position<T>> {}
}

export default GeneralTree;
