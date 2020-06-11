import type { Entry, Categories } from "./data/types";
import { toggled, compare } from "./utils";

export type EnrichedEntry = Entry & { tags: string[] };

export type Query = {
  tags: string[];
  states: string[];
  title: string;
};

export type Counts = {
  states: { [key: string]: number };
  tags: { [key: string]: number };
};

export function enrich(data: Entry[], categories: Categories): EnrichedEntry[] {
  // Enrich all data with tags
  return data
    .map((entry) => enrichOne(entry, categories))
    .sort((a, b) => {
      const dateComp = compare(b.date, a.date);
      return dateComp == 0
        ? compare(a.state + a.city, b.state + b.city)
        : dateComp;
    });
}

function enrichOne(entry: Entry, categories: Categories): EnrichedEntry {
  // Enrich an entry with tags
  const tags = Object.entries(categories)
    .filter(([_, values]) => {
      return values.find((v) =>
        entry.name.toLowerCase().includes(v.toLowerCase())
      );
    })
    .map(([category, _]) => category);

  return { ...entry, tags };
}

export function isQueryEmpty(query: Query) {
  // Return true if nothing is being searched for
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
  // Return all entries which match the query, or all entries if the query is empty

  if (isQueryEmpty(query)) {
    return data;
  }

  const { tags, states, title } = query;
  return data.filter((entry) => {
    const tagMatch =
      tags.length === 0 || tags.every((t) => entry.tags.includes(t));
    const statesMatch = states.length === 0 || states.includes(entry.state);
    const titleMatch = title === "" || entry.name.includes(title);

    return tagMatch && statesMatch && titleMatch;
  });
}

export type QueryUpdates = {
  toggleState?: string;
  toggleTag?: string;
  title?: string;
};

export function updateQuery(q: Query, updates: QueryUpdates): Query {
  return {
    title: updates.title ?? q.title,
    states: toggled(q.states, updates.toggleState),
    tags: toggled(q.tags, updates.toggleTag),
  };
}

export function getCounts(data: EnrichedEntry[], filtered: EnrichedEntry[]) {
  // Get the count of each state and tag in 'filtered'. Use the full dataset 'data' to log zero-counts.
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
