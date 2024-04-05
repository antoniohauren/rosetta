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

  it("should flatten tree like array", () => {
    const input: RawKeyValue[] = [
      ["key", "value"],
      [
        "key",
        {
          key1: {
            key2: {
              key3: "value3",
            },
            key4: "value4",
          },
          key5: {
            key6: "value6",
          },
        },
      ],
    ];

    const res = flattenArray(input);
    const exp = [
      ["key", "value"],
      ["key.key1.key2.key3", "value3"],
      ["key.key1.key4", "value4"],
      ["key.key5.key6", "value6"]
    ];

    assert.deepEqual(res, exp);
  });

  it("should flatten multiple times", () => {
    const input: RawKeyValue[] = [
      ["key", "value"],
      ["key", { key1: { key2: { key3: "value3" } } }],
    ];

    const res = flattenArray(input);
    const exp = [
      ["key", "value"],
      ["key.key1.key2.key3", "value3"],
    ];

    assert.deepEqual(res, exp);
  });
});
