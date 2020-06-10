interface GraphBase {
  addDirectedEdge: (src: number, dst: number, cost: number) => void;

  addUndirectedEdge: (src: number, dst: number, cost: number) => void;

  printBrief: () => void;

  printDetail: () => void;
}

export default GraphBase;
