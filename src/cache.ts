import { evictionAlgorithm } from "./evictionAlgorithm";

interface Storage {
  [key: string]: string;
}

interface Counts {
  [key: string]: number;
}

export class Cache {
  storage: Storage = {};
  maxCapacity: number;
  evictionAlgorithm: evictionAlgorithm;
  capacity: number = 0;

  constructor(maxCapacity: number, evictionAlgorithm: evictionAlgorithm) {
    this.maxCapacity = maxCapacity;
    this.evictionAlgorithm = evictionAlgorithm;
  }

  setevictionAlgorithm(e: evictionAlgorithm) {
    this.evictionAlgorithm = e;
  }

  evict() {
    this.evictionAlgorithm.evict(this);
    this.capacity--;
  }

  add(key: string, value: string) {
    if (this.capacity === this.maxCapacity) {
      this.evict();
    }
    if (this.capacity < this.maxCapacity) {
      this.evictionAlgorithm.processInsertion(key);
      this.storage[key] = value;
      this.capacity++;
    } else {
      throw new Error("Eviction failed");
    }
  }

  get(key: string): string {
    this.evictionAlgorithm.processAccess(key);
    return this.storage[key];
  }

  delete(key: string) {
    delete this.storage[key];
  }
}
