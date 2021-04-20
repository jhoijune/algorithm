// Java 기반

interface MapBase<K, V> {
  size(): number;
  isEmpty(): boolean;
  has(key: K): boolean;
  get(key: K): V | undefined;
  set(key: K, value: V): V | undefined;
  delete(key: K): V | undefined;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  entries(): IterableIterator<[K, V]>;
}

export default MapBase;
