class DisjointSet<T> {
  private _parent: Map<T, T> = new Map();

  makeGroup(element: T): T {
    this._parent.set(element, element);
    return element;
  }

  find(element: T): T {
    let curr: T = element;
    while (this._parent.get(curr)! !== curr) {
      curr = this._parent.get(curr)!;
    }
    return curr;
  }

  union(elem1: T, elem2: T) {
    let root1 = this.find(elem1);
    let root2 = this.find(elem2);
    if (root1 === root2) {
      return;
    }
    if (root1 < root2) {
      this._parent.set(root2, root1);
    } else {
      this._parent.set(root1, root2);
    }
  }

  print() {
    console.log(this._parent);
  }
}

export default DisjointSet;
