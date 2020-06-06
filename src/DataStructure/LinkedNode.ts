abstract class LinkedNode<T> {
  constructor(public value: T, public next: LinkedNode<T> | null = null) {}
}

export default LinkedNode;
