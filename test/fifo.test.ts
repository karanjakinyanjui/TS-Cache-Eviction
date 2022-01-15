import { Cache } from "../src/cache";
import { fifo } from "../src/fifo";
import { lru } from "../src/lru";
import { lfu } from "../src/lfu";

describe("test fifo ", () => {
  it("should remove the first key", () => {
    const cache = new Cache(2, new fifo());
    cache.add("a", "The first value");
    cache.add("b", "The second value");
    cache.add("c", "The third value");
    expect(new Set(Object.keys(cache.storage))).toStrictEqual(
      new Set(["b", "c"])
    );
  });
});

describe("test lru", () => {
  it("should remove the least recently used key", () => {
    const cache = new Cache(2, new lru());
    cache.add("a", "The first value");
    cache.add("b", "The second value");
    const b = cache.get("b");
    console.log(b);
    const a = cache.get("a");
    console.log(a);
    cache.add("c", "The third value");
    expect(new Set(Object.keys(cache.storage))).toStrictEqual(
      new Set(["a", "c"])
    );
  });
});

describe("test lfu", () => {
  it("should remove the least frequently used key", () => {
    const cache = new Cache(2, new lfu());
    cache.add("a", "The first value");
    cache.add("b", "The second value");
    cache.get("b");
    cache.get("b");
    cache.get("b");
    cache.get("b");
    cache.get("a");
    cache.get("a");
    cache.add("c", "The third value");
    expect(new Set(Object.keys(cache.storage))).toStrictEqual(
      new Set(["b", "c"])
    );
  });
});
