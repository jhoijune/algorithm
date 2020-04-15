import ArrayQueue from './ArrayQueue';
import GeneralTree from './GeneralTree';
import LinkedBinaryTree from './LinkedBinaryTree';
import Position from './Position';

// TODO:  타입인 Position도 union에 묶이게
const union = {
  ArrayQueue,
  GeneralTree,
  LinkedBinaryTree,
};

export default union;
export { ArrayQueue, GeneralTree, LinkedBinaryTree, Position };
