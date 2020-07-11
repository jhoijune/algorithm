import {} from 'module';

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

const solution = (n: number, costs: [number, number, number][]): number => {
  costs.sort(([, , a], [, , b]) => a - b);
  const ds = new DisjointSet<number>();
  for (let num = 0; num < n; num++) {
    ds.makeGroup(num);
  }
  const answer: number[] = [];
  let index = 0;
  while (answer.length !== n - 1) {
    const [src, dst, cost] = costs[index++];
    const srcRoot = ds.find(src);
    const dstRoot = ds.find(dst);
    if (srcRoot !== dstRoot) {
      ds.union(srcRoot, dstRoot);
      answer.push(cost);
    }
  }
  return answer.reduce((prev, curr) => prev + curr, 0);
};

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
