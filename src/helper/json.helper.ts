export function JsonParse<T>(data: string) {
    return JSON.parse(data) as T
}