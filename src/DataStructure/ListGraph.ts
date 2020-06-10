import GraphBase from './GraphBase';
import ArrayQueue from './ArrayQueue';
import Heap from './Heap';
import DisjoinSet from './DisjointSet';

class Edge {
  constructor(public dst: number, public cost: number = 1) {}
}

class ListGraph implements GraphBase {
  private _adj: Edge[][];

  private _count: number;

  constructor(count: number) {
    this._count = count;
    this._adj = Array.from(Array(count), () => new Array());
  }

  addDirectedEdge(src: number, dst: number, cost: number = 1) {
    const edge = new Edge(dst, cost);
    this._adj[src].push(edge);
  }

  addUndirectedEdge(src: number, dst: number, cost: number = 1) {
    this.addDirectedEdge(src, dst, cost);
    this.addDirectedEdge(dst, src, cost);
  }

  private _dfsUtil(start: number, visited: boolean[], path: number[]) {
    if (visited[start]) {
      return;
    }
    console.log(start);
    visited[start] = true;
    path.push(start);
    const edges = this._adj[start];
    const edgeLen = edges.length;
    for (let end = 0; end < edgeLen; end++) {
      const { dst } = edges[end];
      this._dfsUtil(dst, visited, path);
    }
  }

  dfs(source: number, target: number) {
    const visited = new Array<boolean>(this._count).fill(false);
    const path: number[] = [];
    this._dfsUtil(source, visited, path);
    console.log(`DFS Path is : ${path}`);
    return visited[target];
  }

  dfsStack(source: number, target: number) {
    const visited = new Array<boolean>(this._count).fill(false);
    const stack: number[] = [];
    const path: number[] = [];
    stack.push(source);
    visited[source] = true;
    while (stack.length !== 0) {
      const curr = stack.pop()!;
      path.push(curr);
      const edges = this._adj[curr];
      for (let index = edges.length - 1; index >= 0; index--) {
        const { dst } = edges[index];
        if (!visited[dst]) {
          visited[dst] = true;
          stack.push(dst);
        }
      }
    }
    console.log(`DFS Path is : ${path}`);
    return visited[target];
  }

  bfs(source: number, target: number): boolean {
    const visited = new Array<boolean>(this._count).fill(false);
    const queue = new ArrayQueue<number>();
    const path: number[] = [];
    visited[source] = true;
    queue.enqueue(source);
    while (!queue.isEmpty()) {
      const start = queue.dequeue()!;
      path.push(start);
      const edges = this._adj[start];
      for (const edge of edges) {
        if (!visited[edge.dst]) {
          visited[edge.dst] = true; // key point
          queue.enqueue(edge.dst);
        }
      }
    }
    console.log(`DFS Path is : ${path}`);
    return visited[target];
  }

  private _topologicalSortUtil(
    source: number,
    visited: boolean[],
    stack: number[]
  ) {
    visited[source] = true;
    const edges = this._adj[source];
    for (let index = 0; index < edges.length; index++) {
      const edge = edges[index];
      if (!visited[edge.dst]) {
        this._topologicalSortUtil(index, visited, stack);
      }
    }
    stack.push(source);
  }

  topologicalSort() {
    const stack: number[] = [];
    const visited = new Array<boolean>(this._count).fill(false);
    const output = [];
    for (let start = 0; start < this._count; start++) {
      if (!visited[start]) {
        this._topologicalSortUtil(start, visited, stack);
      }
    }
    while (stack.length !== 0) {
      output.push(stack.pop());
    }
    console.log(output);
  }

  private _countAllPathDFSUtil(
    source: number,
    target: number,
    visited: boolean[]
  ): number {
    if (source === target) {
      return 1;
    }
    let count = 0;
    visited[source] = true;
    const edges = this._adj[source];
    for (let index = 0; index < edges.length; index++) {
      const { dst } = edges[index];
      if (!visited[dst]) {
        count += this._countAllPathDFSUtil(dst, target, visited);
      }
    }
    visited[source] = false;
    return count;
  }

  countAllPathDFS(source: number, target: number): number {
    const visited = new Array(this._count).fill(false);
    return this._countAllPathDFSUtil(source, target, visited);
  }

  countAllPathBFS(source: number, target: number): number {
    const visited = new Array<boolean>(this._count).fill(false);
    const queue = new ArrayQueue<[number, boolean[], number[]]>();
    queue.enqueue([source, [...visited], []]);
    let count = 0;
    while (!queue.isEmpty()) {
      const [curr, visited, path] = queue.dequeue()!;
      path.push(curr);
      visited[curr] = true;
      if (curr === target) {
        console.log(path);
        count += 1;
      } else {
        const edges = this._adj[curr];
        for (let index = 0; index < edges.length; index++) {
          const { dst } = edges[index];
          if (!visited[dst]) {
            queue.enqueue([dst, [...visited], [...path]]);
          }
        }
      }
    }
    return count;
  }

  private _transitiveClosureUtil(
    source: number,
    target: number,
    tc: number[][]
  ) {
    if (source !== target) {
      tc[source][target] = 1;
    }
    const edges = this._adj[target];
    for (let index = 0; index < edges.length; index++) {
      const { dst } = edges[index];
      if (tc[source][dst] === 0) {
        this._transitiveClosureUtil(source, dst, tc);
      }
    }
  }

  transitiveClosure(): number[][] {
    const tc: number[][] = Array.from(Array(this._count), () =>
      new Array(this._count).fill(0)
    );
    for (let index = 0; index < this._count; index++) {
      this._transitiveClosureUtil(index, index, tc);
    }
    return tc;
  }

  private _isCyclePresentUndirectedUtil(
    source: number,
    parent: number,
    visited: boolean[]
  ): boolean {
    visited[source] = true;
    const edges = this._adj[source];
    for (let end = 0; end < edges.length; end++) {
      const { dst } = edges[end];
      if (!visited[dst]) {
        if (this._isCyclePresentUndirectedUtil(dst, source, visited)) {
          return true;
        }
      } else if (dst !== parent) {
        return true;
      }
    }
    return false;
  }

  isCyclePresentUndirected(): boolean {
    const visited = new Array<boolean>(this._count).fill(false);
    for (let curr = 0; curr < this._count; curr++) {
      if (!visited[curr]) {
        if (this._isCyclePresentUndirectedUtil(curr, -1, visited)) {
          return true;
        }
      }
    }
    return false;
  }

  transposeGraph(): ListGraph {
    const graph = new ListGraph(this._count);
    for (let i = 0; i < this._count; i++) {
      const edges = this._adj[i];
      for (let j = 0; j < edges.length; j++) {
        const { dst } = edges[j];
        graph.addDirectedEdge(dst, i);
      }
    }
    return graph;
  }

  private _dfsUtil2(start: number, visited: boolean[]) {
    visited[start] = true;
    const edges = this._adj[start];
    for (const { dst } of edges) {
      if (!visited[dst]) {
        this._dfsUtil2(dst, visited);
      }
    }
  }

  isConnected() {
    const visited = new Array<boolean>(this._count).fill(false);
    this._dfsUtil2(0, visited);
    if (visited.includes(false)) {
      return false;
    }
    return true;
  }

  isStronglyConnected() {
    const visited = new Array<boolean>(this._count).fill(false);
    this._dfsUtil2(0, visited);
    if (visited.includes(false)) {
      return false;
    }
    const transposed = this.transposeGraph();
    visited.fill(false);
    transposed._dfsUtil2(0, visited);
    if (visited.includes(false)) {
      return false;
    }
    return true;
  }

  prim() {
    const previous = new Array<number>(this._count).fill(-1);
    const dist = new Array<number>(this._count).fill(Infinity);
    const visited = new Array<boolean>(this._count).fill(false);
    let source = 0;
    dist[source] = 0;
    const pq = new Heap<number>();
    pq.add(0, 0);
    while (!pq.isEmpty()) {
      const [, dst] = pq.remove();
      source = dst;
      if (visited[source]) {
        continue;
      }
      visited[source] = true;
      const edges = this._adj[source];
      for (const { dst, cost } of edges) {
        if (dist[dst] > cost && !visited[dst]) {
          dist[dst] = cost;
          previous[dst] = source;
          pq.add(cost, dst);
        }
      }
    }
  }

  kruskal() {
    const tree: [number, number][] = [];
    const pq = new Heap<[number, number]>();
    const clusters = new DisjoinSet<number>();
    for (let src = 0; src < this._count; src++) {
      const edges = this._adj[src];
      clusters.makeGroup(src);
      for (const { dst, cost } of edges) {
        pq.add(cost, [src, dst]);
      }
    }
    while (!pq.isEmpty() && tree.length < this._count) {
      const [, [src, dst]] = pq.remove();
      const srcRoot = clusters.find(src);
      const dstRoot = clusters.find(dst);
      if (srcRoot !== dstRoot) {
        clusters.union(srcRoot, dstRoot);
        tree.push([src, dst]);
      }
    }
    console.log(tree);
  }

  shortestPathForUnweightd(source: number) {
    const dist = new Array(this._count).fill(Infinity);
    const path = new Array(this._count).fill(0);
    const queue = new ArrayQueue<number>();
    queue.enqueue(source);
    dist[source] = 0;
    while (!queue.isEmpty()) {
      const curr = queue.dequeue()!;
      const edges = this._adj[curr];
      for (const { dst } of edges) {
        if (dist[dst] === Infinity) {
          dist[dst] = dist[curr] + 1;
          path[dst] = curr;
          queue.enqueue(dst);
        }
      }
    }
  }

  dijkstra(source: number) {
    const dist = new Array(this._count).fill(Infinity);
    const parent = new Array(this._count).fill(-1);
    const pq = new Heap<number>();
    dist[source] = 0;
    for (let num = 0; num < this._count; num++) {
      pq.add(dist[num], num);
    }
    while (!pq.isEmpty()) {
      const [, vertex] = pq.remove();
      const edges = this._adj[vertex];
      for (const { dst, cost } of edges) {
        const alt = dist[vertex] + cost;
        if (alt < dist[dst]) {
          const ex = dist[dst];
          dist[dst] = alt;
          parent[dst] = vertex;
          pq.update(ex, dst, alt);
        }
      }
    }
    for (let index = 0; index < this._count; index++) {
      if (dist[index] === Infinity) {
        console.log(`Node id ${index} is Unreachable`);
      } else {
        console.log(
          `Node id ${index}, prev: ${parent[index]} cost: ${dist[index]}`
        );
      }
    }
  }

  bellmanFordShortestPath(source: number) {
    const path = new Array(this._count).fill(-1);
    const dist = new Array(this._count).fill(Infinity);
    dist[source] = 0;
    for (let i = 0; i < this._count - 1; i++) {
      for (let j = 0; j < this._count; j++) {
        const edges = this._adj[j];
        for (const { dst, cost } of edges) {
          const newDistance = dist[j] + cost;
          if (dist[dst] > newDistance) {
            dist[dst] = newDistance;
            path[dst] = j;
          }
        }
      }
    }
  }

  private _hamiltonianPathUtil(
    pSize: number,
    path: number[],
    added: boolean[]
  ): boolean {
    if (pSize === this._count) {
      return true;
    }
    for (let vertex = 0; vertex < this._count; vertex++) {
      let bool = false;
      if (pSize === 0) {
        bool = true;
      }
      if (!bool && !added[vertex]) {
        const edges = this._adj[path[pSize - 1]];
        for (const { dst } of edges) {
          if (dst === vertex) {
            bool = true;
            break;
          }
        }
      }
      if (bool) {
        path[pSize++] = vertex;
        added[vertex] = true;
        if (this._hamiltonianPathUtil(pSize, path, added)) {
          return true;
        }
        pSize -= 1;
        added[vertex] = false;
      }
    }
    return false;
  }

  hamiltonianPath(): boolean {
    const path = new Array<number>(this._count).fill(0);
    const added = new Array<boolean>(this._count).fill(false);
    if (this._hamiltonianPathUtil(0, path, added)) {
      return true;
    }
    return false;
  }

  private _hamiltonianCycleUtil(
    pSize: number,
    path: number[],
    added: boolean[]
  ) {
    if (pSize === this._count) {
      const edges = this._adj[path[pSize - 1]];
      for (const { dst } of edges) {
        if (dst === path[0]) {
          path[pSize] = path[0];
          return true;
        }
      }
      return false;
    }
    for (let vertex = 0; vertex < this._count; vertex++) {
      let bool = false;
      if (pSize === 0) {
        bool = true;
      }
      if (!bool && !added[vertex]) {
        const edges = this._adj[path[pSize - 1]];
        for (const { dst } of edges) {
          if (dst === vertex) {
            bool = true;
            break;
          }
        }
      }
      if (bool) {
        path[pSize++] = vertex;
        added[vertex] = true;
        if (this._hamiltonianPathUtil(pSize, path, added)) {
          return true;
        }
        pSize -= 1;
        added[vertex] = false;
      }
    }
    return false;
  }

  hamiltonianCycle(): boolean {
    const path = new Array<number>(this._count + 1).fill(0);
    const added = new Array<boolean>(this._count).fill(false);
    if (this._hamiltonianCycleUtil(0, path, added)) {
      return true;
    }
    return false;
  }

  isEulerian(): number {
    if (!this.isConnected()) {
      return 0;
    }
    const inDegree = new Array<number>(this._count).fill(0);
    const outDegree = new Array<number>(this._count).fill(0);
    for (let index = 0; index < this._count; index++) {
      const edges = this._adj[index];
      for (const { dst } of edges) {
        outDegree[index] += 1;
        inDegree[dst] += 1;
      }
    }
    let oddCount = 0;
    for (let index = 0; index < this._count; index++) {
      if (inDegree[index] + (outDegree[index] % 2) !== 0) {
        oddCount += 1;
      }
    }
    if (oddCount === 0) {
      return 2;
    } else if (oddCount === 2) {
      return 1;
    }
    return 0;
  }

  printBrief() {
    console.log(this._adj);
  }

  printDetail() {
    for (let start = 0; start < this._count; start++) {
      const edges = this._adj[start];
      let output = `Vertex ${start} is connected to : `;
      for (let end = 0; end < edges.length; end++) {
        const edge = edges[end];
        output += `${edge.dst} (${edge.cost})`;
      }
      console.log(output);
    }
  }
}

export default ListGraph;
