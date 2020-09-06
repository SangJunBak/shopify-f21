export function findAndReplaceByKey<T>(array: T[], key: T, newKey: T) {
  return array.map((_key) => (_key === key ? newKey : _key));
}
