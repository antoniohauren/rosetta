import { flattenObject } from "./object.helper";

export type RawKeyValue = [string, string | object];
export type KeyValue = [string, string];

export function flattenArray(arr: RawKeyValue[]): KeyValue[] {
  const result: [string, string][] = [];

  for (const [key, value] of arr) {
    if (typeof value === "object") {
      const flattened = flattenObject(value)
      for(const [nestedKey, nestedValue] of flattened) {
        result.push([`${key}.${nestedKey}`, nestedValue])
      }
    } else {
      result.push([key, value]);
    }
  }

  return result;
}

