import type { Entry, Categories } from "./data/types";

export type EnrichedEntry = Entry & { tags: string[] };

export type Query = {
  tags: string[];
  states: string[];
  title: string;
};

export function enrich(data: Entry[], categories: Categories): EnrichedEntry[] {
  // Enrich all data with tags
  return data.map((entry) => enrichOne(entry, categories));
}

function enrichOne(data: Entry, categories: Categories): EnrichedEntry {
  // Enrich an entry with tags
  const tags = Object.entries(categories)
    .filter(([_, values]) => {
      return values.find((v) =>
        data.title.toLowerCase().includes(v.toLowerCase())
      );
    })
    .map(([category, _]) => category);

  return { ...data, tags };
}

export function isQueryEmpty(query: Query) {
  return (
    query.tags.length == 0 &&
    query.states.length == 0 &&
    query.title.length == 0
  );
}

export function queryData(
  data: EnrichedEntry[],
  query: Query
): EnrichedEntry[] {
  // Return all entries which match query
  if (isQueryEmpty(query)) {
    return data;
  }

  const { tags, states, title } = query;
  return data.filter((entry) => {
    const tagMatch =
      tags.length === 0 || tags.every((t) => entry.tags.includes(t));
    const statesMatch = states.length === 0 || states.includes(entry.state);
    const titleMatch = title === "" || entry.title.includes(title);

    return tagMatch && statesMatch && titleMatch;
  });
}

export type Counts = {
  states: { [key: string]: number };
  tags: { [key: string]: number };
};

export function getCounts(data: EnrichedEntry[], filtered: EnrichedEntry[]) {
  const counts: Counts = { states: {}, tags: {} };

  data.forEach((entry: EnrichedEntry) => {
    counts.states[entry.state] = 0;
    entry.tags.forEach((tag) => {
      counts.tags[tag] = 0;
    });
  });

  filtered.forEach((entry: EnrichedEntry) => {
    counts.states[entry.state] = (counts.states[entry.state] ?? 0) + 1;
    entry.tags.forEach((tag) => {
      counts.tags[tag] = (counts.tags[tag] ?? 0) + 1;
    });
  });
  return counts;
}
