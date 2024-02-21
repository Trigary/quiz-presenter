class Key<T> {}

export type ImportErrorData = { title: string; message: string; cause: unknown | null }
export const importErrorKey = new Key<ImportErrorData>()

const data = new Map<Key<any>, any>()

export const setTemp = <T>(key: Key<T>, value: T | null) => {
  data.set(key, value)
}

export const takeTemp = <T>(key: Key<T>): T | null => {
  return data.has(key) ? data.get(key) : null
}

export const isTempSet = <T>(key: Key<T>): boolean => {
  return data.has(key)
}

export const takeTempOrThrow = <T>(key: Key<T>): T => {
  if (isTempSet(key)) return data.get(key)
  throw new Error(`No value for key ${key}`)
}
