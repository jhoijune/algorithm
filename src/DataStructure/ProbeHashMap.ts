import AbstractHashMap from './AbstractHashMap';
import MapEntry from './MapEntry';

class ProbeHashMap<K, V> extends AbstractHashMap<K, V> {
  #table: (MapEntry<K, V> | object)[] = [];

  #DEFUNCT = {};

  constructor(cap: number, p: number) {
    super(cap, p);
  }

  protected _createTable() {
    this.#table = new Array(this.capacity);
  }

  private _isAvailable(index: number) {
    return this.#table[index] == null || this.#table[index] === this.#DEFUNCT;
  }

  private _findSlot(hash: number, key: K) {
    let avail = -1;
    let index = hash;
    do {
      if (this._isAvailable(index)) {
        if (avail === -1) avail = index;
        if (this.#table[index] == null) break;
      } else if ((this.#table[index] as MapEntry<K, V>).getKey() === key) {
        return index;
      }
      index = (index + 1) % this.capacity;
    } while (index !== hash);
    return -(avail + 1);
  }

  protected _bucketGet(hash: number, key: K) {
    const index = this._findSlot(hash, key);
    if (index < 0) return undefined;
    return (this.#table[index] as MapEntry<K, V>).getValue() as V;
  }

  protected _bucketSet(hash: number, key: K, value: V) {
    const index = this._findSlot(hash, key);
    if (index >= 0)
      return (this.#table[index] as MapEntry<K, V>).setValue(value);
    this.#table[-(index + 1)] = new MapEntry(key, value);
    this.n++;
    return undefined;
  }

  protected _bucketRemove(hash: number, key: K) {
    const index = this._findSlot(hash, key);
    if (index < 0) return undefined;
    const answer = (this.#table[index] as MapEntry<K, V>).getValue() as V;
    this.#table[index] = this.#DEFUNCT;
    this.n--;
    return answer;
  }

  *values(): IterableIterator<V> {
    for (const value of this.#table) {
      if (value != null && value !== this.#DEFUNCT) {
        yield (value as MapEntry<K, V>).getValue() as V;
      }
    }
  }

  *keys(): IterableIterator<K> {
    for (const value of this.#table) {
      if (value != null && value !== this.#DEFUNCT) {
        yield (value as MapEntry<K, V>).getKey() as K;
      }
    }
  }

  *entries(): IterableIterator<[K, V]> {
    for (const value of this.#table) {
      if (value != null && value !== this.#DEFUNCT) {
        yield [
          (value as MapEntry<K, V>).getKey() as K,
          (value as MapEntry<K, V>).getValue() as V,
        ];
      }
    }
  }
}

export default ProbeHashMap;
