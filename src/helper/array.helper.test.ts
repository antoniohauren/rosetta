import assert from "node:assert";
import { describe, it } from "node:test";
import { type RawKeyValue, flattenArray } from "./array.helper";

describe("array-helper", () => {
  it("should flatten array", () => {
    const input: RawKeyValue[] = [
      ["key", "value"],
      ["key", { key1: "value1" }],
    ];

    const res = flattenArray(input);
    const exp = [
      ["key", "value"],
      ["key.key1", "value1"],
    ];

    assert.deepEqual(res, exp);
  });
});
