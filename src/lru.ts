import { Cache } from "./cache";
import { evictionAlgorithm } from "./evictionAlgorithm";

export class lru extends evictionAlgorithm {
  accessed: string[] = [];

  processAccess(key: string): void {
    this.updateAccessed(key);
  }

  processInsertion(key: string): void {
    //
  }

  updateAccessed(key: string) {
    const accessed = this.accessed.filter((i) => i !== key);
    accessed.push(key);
    this.accessed = accessed;
  }

  evict(cache: Cache) {
    const last = this.accessed[0];
    cache.delete(last);
    this.accessed = this.accessed.slice(1);
    console.log(`Evicted ${last} using lru`);
  }
}
