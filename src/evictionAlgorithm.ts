import { Cache } from "./cache";

export abstract class evictionAlgorithm {
  abstract evict(cache: Cache): void;

  abstract processAccess(key: string): void;
  abstract processInsertion(key: string): void;
}
