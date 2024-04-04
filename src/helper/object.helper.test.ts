import assert from "node:assert";
import { describe, it } from "node:test";
import { flattenObject, unflattenObject } from "./object.helper";

describe("object-helper", () => {
  it("should flatten object", () => {
    const input = { key: { key1: "value1" } };

    const res = flattenObject(input);
    const exp = [["key.key1", "value1"]];

    assert.deepEqual(res, exp);
  });

  it("should flatten big nested object", () => {
    const input = { key: { key1: { key2: { key3: "value3" } } } };

    const res = flattenObject(input);
    const exp = [["key.key1.key2.key3", "value3"]];

    assert.deepEqual(res, exp);
  });

  it("should unflatten object", () => {
    const input = ["key1","key2","key3"];

    const res = unflattenObject(input, "value3");
    const exp = {
      key1: {
        key2: {
          key3: "value3",
        },
      },
    };

    assert.deepEqual(res, exp);
  });
});
