import { h } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

import defaultDataRaw from "../data/incidents";
import getLatestData from "../data/api";
import categories from "../data/categories";

import {
  enrich,
  queryData,
  getCounts,
  updateQuery,
  QueryUpdates,
} from "../enrichment";

import "../app.css";
import { AppUI } from "./AppUI";
import { paramsToQuery, updateHistory } from "./history";
import { getDateSlice, getDateSlices } from "../data/dateBucket";

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
  const [displayData, counts, slices] = useMemo(() => {
    const filtered = queryData(data, query);
    const counts = getCounts(data, filtered);
    const sliced = getDateSlice(filtered, query.start, 100);
    const slices = getDateSlices(filtered, 100);

    return [sliced, counts, slices];
  }, [query, data]);

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
      data={displayData}
      slices={slices}
      query={query}
      counts={counts}
      updateQuery={updateQueryState}
    />
  );
}
