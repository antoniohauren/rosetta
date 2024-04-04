export type RawKeyValue = [string, string | object];
export type KeyValue = [string, string];

export function flattenArray(arr: RawKeyValue[]): KeyValue[] {
  const result: [string, string][] = [];

  for (const [key, value] of arr) {
    if (typeof value === "object") {
      const [oKey, oValue] = Object.entries(value)[0];

      result.push([`${key}.${oKey}`, oValue]);
    } else {
      result.push([key, value]);
    }
  }

  return result;
}

