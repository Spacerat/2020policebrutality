import urlparse from "url-parse";

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

const URL_CACHE = new Map<string, string>();

export function urlName(url: string): string {
  if (URL_CACHE.has(url)) {
    return URL_CACHE.get(url);
  }
  let hostname = urlparse(url).hostname;
  hostname = hostname.replace(
    /old\.|news\.|touch\.|mobile\.|www\.|edition\.|\.com?|\.ch|\.ca|$[ivm]\.|\.org|\.au|\.live|\.net|\.uk/g,
    ""
  );
  hostname = hostname.replace("redd.it", "reddit");
  hostname = hostname.replace("youtu.be", "youtube");
  URL_CACHE.set(url, hostname);
  return hostname;
}

export function compare(a: any, b: any): number {
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

const DATE_CACHE = new Map<string, string>();

export function formatDate(date: string) {
  if (DATE_CACHE.has(date)) {
    return DATE_CACHE.get(date);
  }

  const formatted = Intl.DateTimeFormat("en").format(Date.parse(date));
  DATE_CACHE.set(date, formatted);
  return formatted;
}
