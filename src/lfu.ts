import { Cache } from "./cache";
import { evictionAlgorithm } from "./evictionAlgorithm";

interface Counts {
  [key: string]: number;
}

export class lfu extends evictionAlgorithm {
  accessCounts: Counts = {};

  processInsertion(key: string): void {
    // throw new Error("Method not implemented.");
  }

  processAccess(key: string): void {
    if (key in this.accessCounts) this.accessCounts[key]++;
    else this.accessCounts[key] = 1;
  }

  evict(cache: Cache) {
    const counts = this.accessCounts;
    let leastCount = Math.min(...Object.values(counts));
    let least = Object.keys(counts).find((i) => counts[i] === leastCount) || "";
    cache.delete(least);
    console.log(`Evicted ${least} using lfu`);
  }
}
