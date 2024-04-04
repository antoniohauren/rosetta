import type { MyTuple } from "../models/rosetta";

export function flattenObject(obj: object, parentKey = "") {
  let result: [string, string][] = [];

  for (const [key, value] of Object.entries(obj)) {
    const nestedKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === "object") {
      result = result.concat(flattenObject(value, nestedKey));
    } else {
      result.push([nestedKey, value]);
    }
  }

  return result;
}

type NestedObject = {
  [key: string]: NestedObject | string;
}


export function unflattenObject(input: string[], value: string): MyTuple {
    const keys = input;
    const result: NestedObject = {};
    let temp = result;

    for(const key of keys.slice(0, -1)) {
      temp[key] = {};
      temp = temp[key] as NestedObject;
    }

    temp[keys[keys.length - 1]] = value;

    return result;
}