import { h, Component } from "preact";

import data from "../data/incidents";
import categories from "../data/categories";

import type { EnrichedEntry, Query, Counts } from "../enrichment";
import { enrich, queryData, getCounts, isQueryEmpty } from "../enrichment";

import { joinWithFinal, toggled } from "../utils";

import "../app.css";
import { AppUI } from "./AppUI";

type AppState = {
  data: EnrichedEntry[];
  filtered: EnrichedEntry[];
  query: Query;
  counts: Counts;
};

export type UIProps = {
  data: EnrichedEntry[];
  query: Query;
  counts: Counts;
  updateQuery: (updates: QueryUpdates) => void;
};

type QueryUpdates = {
  toggleState?: string;
  toggleTag?: string;
  title?: string;
};

function updateQuery(q: Query, updates: QueryUpdates): Query {
  return {
    title: updates.title ?? q.title,
    states: toggled(q.states, updates.toggleState),
    tags: toggled(q.tags, updates.toggleTag),
  };
}

function queryToParams(query: Query): string {
  const elements = [
    query.states.length > 0
      ? query.states.map((s) => `state=${s}`).join("&")
      : null,
    query.tags.length > 0 ? query.tags.map((s) => `tag=${s}`).join("&") : null,
    query.title ? `search=${query.title}` : null,
  ].filter((x) => !!x);

  const params = elements.join("&");

  return params.length > 0 ? `?${params}` : "";
}

export function queryToTitle(query: Query): string {
  const elements = [
    "Police Brutality at George Floyd Protests",
    query.states.length > 0
      ? " in " + joinWithFinal(query.states, ", ", " and ").join("")
      : null,
    query.tags.length > 0 ? ` (tags: ${query.tags.join(", ")})` : null,
    query.title ? ` - "${query.title}"` : null,
  ];

  return elements.filter((x) => !!x).join(" ");
}

export function paramsToQuery(params: string): Query {
  const parsed = new URLSearchParams(params);
  return {
    states: parsed.getAll("state"),
    tags: parsed.getAll("tag"),
    title: parsed.get("search") ?? "",
  };
}

function updateHistory(query: Query) {
  const title = queryToTitle(query);
  history.replaceState(query, title, queryToParams(query));
  document.title = title;
}

export class App extends Component<{}, AppState> {
  componentWillMount() {
    const enriched = enrich(data.data, categories);
    const query = paramsToQuery(window.location.search);
    this.setState({
      data: enriched,
      ...this.processQuery(enriched, query),
    });
  }

  processQuery(data: EnrichedEntry[], query: Query) {
    const filtered = queryData(data, query);
    const counts = getCounts(data, filtered);
    return { filtered, counts, query };
  }

  updateQuery(updates: QueryUpdates) {
    const newQuery = updateQuery(this.state.query, updates);
    updateHistory(newQuery);
    this.setState(this.processQuery(this.state.data, newQuery));
  }

  render() {
    return (
      <AppUI
        data={this.state.filtered}
        query={this.state.query}
        counts={this.state.counts}
        updateQuery={(q: Query) => this.updateQuery(q)}
      />
    );
  }
}
