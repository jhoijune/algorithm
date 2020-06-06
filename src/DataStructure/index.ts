import ArrayQueue from './ArrayQueue';
import GeneralTree from './GeneralTree';
import LinkedBinaryTree from './LinkedBinaryTree';
import NumberHeap from './NumberHeap';
import Position from './Position';

// TODO:  타입인 Position도 union에 묶이게
const union = {
  ArrayQueue,
  GeneralTree,
  LinkedBinaryTree,
  NumberHeap,
};

export default union;
export { ArrayQueue, GeneralTree, LinkedBinaryTree, Position, NumberHeap };
