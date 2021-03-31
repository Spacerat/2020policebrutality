import { h, Component } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

import defaultDataRaw from "../data/incidents";
import getLatestData from "../data/api";
import categories from "../data/categories";

import {
  enrich,
  queryData,
  getCounts,
  updateQuery,
  EnrichedEntry,
  Query,
  Counts,
  QueryUpdates,
} from "../enrichment";

import "../app.css";
import { AppUI } from "./AppUI";
import { paramsToQuery, updateHistory } from "./history";

const initialState = {
  tags: [],
  title: "",
  states: [],
};

export function App() {
  const [query, setQuery] = useState(() =>
    paramsToQuery(window.location.search)
  );

  // Set initial data
  const [data, setData] = useState(() =>
    enrich(defaultDataRaw.data, categories)
  );

  // Fetch new data on load
  useEffect(() => {
    getLatestData().then((newData) => {
      setData(() => enrich(newData, categories));
    });
  }, []);

  // Computed data
  const filtered = useMemo(() => queryData(data, query), [query, data]);
  const counts = useMemo(() => getCounts(data, filtered), [data, filtered]);

  // Define update function
  const updateQueryState = useCallback(
    (updates: QueryUpdates) => {
      setQuery(updateQuery(query, updates));
    },
    [query]
  );

  // Handle history updates
  useEffect(() => updateHistory(query), [query]);

  return (
    <AppUI
      data={filtered}
      query={query}
      counts={counts}
      updateQuery={(q: Query) => updateQueryState(q)}
    />
  );
}
