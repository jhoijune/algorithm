import MapBase from './MapBase';

abstract class AbstractMap<K, V> implements MapBase<K, V> {
  abstract size(): number;

  abstract has(key: K): boolean;

  abstract get(key: K): V | undefined;

  abstract set(key: K, value: V): V | undefined;

  abstract delete(key: K): V | undefined;

  abstract keys(): IterableIterator<K>;

  abstract values(): IterableIterator<V>;

  abstract entries(): IterableIterator<[K, V]>;

  isEmpty(): boolean {
    return this.size() === 0;
  }
}

export default AbstractMap;
