export function join<T, S>(array: T[], joiner: S): Array<T | S> {
  const out: (T | S)[] = [];
  array.forEach((item, idx) => {
    out.push(item);
    if (idx != array.length - 1) {
      out.push(joiner);
    }
  });
  return out;
}

export function joinWithFinal<T, S>(
  array: T[],
  joiner: S,
  final: S
): Array<T | S> {
  const out: (T | S)[] = [];
  array.forEach((item, idx) => {
    out.push(item);
    if (idx == array.length - 2) {
      out.push(final);
    } else if (idx != array.length - 1) {
      out.push(joiner);
    }
  });
  return out;
}

export function groupBy<T>(items: T[], by: (item: T) => string) {
  const result: { [k: string]: T[] } = {};
  for (const item of items) {
    const key = by(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}

export function compare<T>(a: T, b: T): number {
  return a == b ? 0 : a > b ? 1 : -1;
}

export function byFirst<T>(a: [T, ...any[]], b: [T, ...any[]]): number {
  return compare(a[0], b[0]);
}

export function toggled<T>(arr: T[], item?: T): T[] {
  if (item === undefined) {
    return arr;
  }
  const prevLength = arr.length;
  const filtered = arr.filter((x) => x != item);
  if (filtered.length == prevLength) {
    filtered.push(item);
  }
  return filtered;
}

export function memo<K, V>(func: (k: K) => V) {
  const cache = new Map<K, V>();
  return (k: K) => {
    const cached = cache.get(k);
    if (cached) return cached;
    const result = func(k);
    cache.set(k, result);
    return result;
  };
}
