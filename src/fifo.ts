import { Cache } from "./cache";
import { evictionAlgorithm } from "./evictionAlgorithm";

export class fifo extends evictionAlgorithm {
  keys: string[] = [];

  processInsertion(key: string): void {
    this.keys.push(key);
  }

  processAccess(key: string): void {
    // throw new Error("Method not implemented.");
  }

  evict(cache: Cache) {
    const first = this.keys[0];
    cache.delete(first);
    this.keys = this.keys.slice(1);
    console.log(`Evicted ${first} using fifo`);
  }
}
