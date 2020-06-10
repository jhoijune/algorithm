import GraphBase from './GraphBase';
import ArrayQueue from './ArrayQueue';
import Heap from './Heap';

class MatrixGraph implements GraphBase {
  private _count: number;

  private _adj: number[][];

  constructor(count: number) {
    this._count = count;
    this._adj = Array.from(Array(count), () => new Array(count).fill(0));
  }

  addDirectedEdge(src: number, dst: number, cost: number = 1) {
    this._adj[src][dst] = cost;
  }

  addUndirectedEdge(src: number, dst: number, cost: number = 1) {
    this.addDirectedEdge(src, dst, cost);
    this.addDirectedEdge(dst, src, cost);
  }

  private _dfsUtil(start: number, visited: boolean[], path: number[]) {
    if (visited[start]) {
      return;
    }
    visited[start] = true;
    path.push(start);
    const vertices = this._adj[start];
    for (let end = 0; end < this._count; end++) {
      if (start !== end && vertices[end] > 0) {
        this._dfsUtil(end, visited, path);
      }
    }
  }

  dfs(source: number, target: number): boolean {
    const visited = new Array<boolean>(this._count).fill(false);
    const path: number[] = [];
    this._dfsUtil(source, visited, path);
    console.log(`DFS Path is : ${path}`);
    return visited[target];
  }

  dfsStack(source: number, target: number): boolean {
    const visited = new Array<boolean>(this._count).fill(false);
    const stack: number[] = [];
    const path: number[] = [];
    stack.push(source);
    while (stack.length !== 0) {
      const start = stack.pop()!;
      visited[start] = true;
      path.push(start);
      const vertices = this._adj[start];
      for (let end = this._count - 1; end >= 0; end--) {
        if (start !== end && vertices[end] > 0 && !visited[end]) {
          stack.push(end);
        }
      }
    }
    console.log(`DFS Path is : ${path}`);
    return visited[target];
  }

  bfs(source: number, target: number): boolean {
    const visited = new Array<boolean>(this._count).fill(false);
    const path: number[] = [];
    const queue = new ArrayQueue<number>();
    visited[source] = true;
    queue.enqueue(source);
    while (!queue.isEmpty()) {
      const start = queue.dequeue()!;
      path.push(start);
      const vertices = this._adj[start];
      for (let end = 0; end < this._count; end++) {
        if (start !== end && vertices[end] > 0 && !visited[end]) {
          visited[end] = true;
          queue.enqueue(end);
        }
      }
    }
    console.log(`DFS Path is : ${path}`);
    return visited[target];
  }

  prim() {
    const prev = new Array<number>(this._count).fill(-1);
    const dist = new Array<number>(this._count).fill(Number.POSITIVE_INFINITY);
    const visited = new Array<boolean>(this._count).fill(false);
    const pq = new Heap<number>();
    let source = 0;
    dist[source] = 0;
    pq.add(0, source);
    while (!pq.isEmpty()) {
      const [, dst] = pq.remove();
      source = dst;
      if (visited[source]) {
        continue;
      }
      visited[source] = true;
      for (let dst = 0; dst < this._count; dst++) {
        if (
          source !== dst &&
          !visited[dst] &&
          this._adj[source][dst] > 0 &&
          dist[dst] > this._adj[source][dst]
        ) {
          prev[dst] = source;
          dist[dst] = this._adj[source][dst];
          pq.add(this._adj[source][dst], dst);
        }
      }
    }
  }

  printBrief() {
    console.log(this._adj);
  }

  printDetail() {
    for (let src = 0; src < this._count; src++) {
      let text = `Node index [${src}] is connected with :`;
      for (let dst = 0; dst < this._count; dst++) {
        if (this._adj[src][dst] !== 0) {
          text += `${dst} (${this._adj[src][dst]})`;
        }
        console.log(text);
      }
    }
  }
}

export default MatrixGraph;
