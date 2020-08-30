export function filterArrayByKey<T>(array: T[], key: T) {
  return array.filter((_key) => _key !== key);
}

export function filterObjectByKey<T>(
  object: { [key: string]: T },
  key: string
): { [key: string]: T } {
  const { [key]: value, ...filteredObject } = object;
  return filteredObject;
}

export function findAndReplaceByKey<T>(array: T[], key: T, newKey: T) {
  return array.map((_key) => (_key === key ? newKey : _key));
}
