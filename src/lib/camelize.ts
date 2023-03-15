export type CamelCase<T extends PropertyKey> =
  T extends string ? T extends `${infer F}_${infer R}` ? `${F}${Capitalize<CamelCase<R>>}` : T : T;
export const camelCase = (str: string) => str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

export type Camelize<T, S = false> = { [K in keyof T as CamelCase<K>]: S extends true ? T[K] : Camelize<T[K]> };
export const camelize = <T, S extends boolean = false>(obj: T, shallow?: S): T extends string ? string : Camelize<T, S> => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return typeof obj === 'string' ? camelCase(obj) : walk(obj, shallow);
};

// eslint-disable-next-line func-style
function objectKeys<Obj extends object, StringOnlyKeys extends boolean = true>(obj: Obj) {
  return Object.keys(obj) as StringOnlyKeys extends true ? Extract<keyof Obj, string>[] : (keyof Obj)[];
}

// eslint-disable-next-line func-style
function walk<Obj, S extends boolean = false>(obj: Obj, shallow = false): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date || obj instanceof RegExp) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(v => shallow ? v : walk(v), shallow);
  }

  return objectKeys(obj).reduce((res, key) => {
    const camel = camelCase(key) as keyof Camelize<Obj, S>;
    res[camel] = shallow ? obj[key] : walk(obj[key], shallow);
    return res;
  }, {} as Camelize<Obj, S>);
}
