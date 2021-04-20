import AbstractMap from './AbstractMap';
import MapEntry from './MapEntry';

class UnsortedTableMap<K, V> extends AbstractMap<K, V> {
  #table: MapEntry<K, V>[] = [];

  private findIndex(key: K): number {
    const size = this.size();
    for (let index = 0; index < size; index++) {
      if (this.#table[index].getKey() === key) {
        return index;
      }
    }
    return -1;
  }

  has(key: K): boolean {
    const index = this.findIndex(key);
    return index !== -1;
  }

  size(): number {
    return this.#table.length;
  }

  get(key: K): V | undefined {
    const index = this.findIndex(key);
    if (index === -1) {
      return undefined;
    }
    return this.#table[index].getValue();
  }

  set(key: K, value: V): V | undefined {
    const index = this.findIndex(key);
    if (index === -1) {
      this.#table.push(new MapEntry(key, value));
      return undefined;
    } else {
      return this.#table[index].setValue(value);
    }
  }

  delete(key: K): V | undefined {
    const index = this.findIndex(key);
    const size = this.size();
    if (index === -1) {
      return undefined;
    }
    const found = this.#table[index].getValue();
    if (index !== size - 1) {
      this.#table[index] = this.#table[size - 1];
    }
    this.#table.pop();
    return found;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const entry of this.#table) {
      yield [entry.getKey(), entry.getValue()];
    }
  }

  *keys(): IterableIterator<K> {
    for (const entry of this.#table) {
      yield entry.getKey();
    }
  }

  *values(): IterableIterator<V> {
    for (const entry of this.#table) {
      yield entry.getValue();
    }
  }
}

export default UnsortedTableMap;
