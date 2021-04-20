import AbstractHashMap from './AbstractHashMap';
import UnsortedTableMap from './UnsortedTableMap';

class ChainHashMap<K, V> extends AbstractHashMap<K, V> {
  #table: (UnsortedTableMap<K, V> | null)[] = [];

  constructor(cap: number, p: number) {
    super(cap, p);
  }

  protected _createTable() {
    this.#table = new Array(this.capacity);
  }

  protected _bucketGet(hash: number, key: K): V | undefined {
    const bucket = this.#table[hash];
    if (bucket == null) {
      return undefined;
    }
    return bucket.get(key);
  }

  protected _bucketSet(hash: number, key: K, value: V): V | undefined {
    let bucket = this.#table[hash];
    if (bucket == null) {
      this.#table[hash] = new UnsortedTableMap<K, V>();
      bucket = this.#table[hash];
    }
    const oldSize = bucket!.size();
    const ex = bucket!.set(key, value);
    this.n += bucket!.size() - oldSize;
    return ex;
  }

  protected _bucketRemove(hash: number, key: K): V | undefined {
    const bucket = this.#table[hash];
    if (bucket == null) {
      return undefined;
    }
    const oldSize = bucket.size();
    const ex = bucket.delete(key);
    this.n -= oldSize - bucket.size();
    return ex;
  }

  *keys(): IterableIterator<K> {
    for (const bucket of this.#table) {
      if (bucket != null) {
        for (const key of bucket.keys()) {
          yield key;
        }
      }
    }
  }

  *values(): IterableIterator<V> {
    for (const bucket of this.#table) {
      if (bucket != null) {
        for (const value of bucket.values()) {
          yield value;
        }
      }
    }
  }

  *entries(): IterableIterator<[K, V]> {
    for (const bucket of this.#table) {
      if (bucket != null) {
        for (const entry of bucket.entries()) {
          yield entry;
        }
      }
    }
  }
}

export default ChainHashMap;
