import { h, Component } from "preact";

import data from "../data/incidents";
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

type AppState = {
  data: EnrichedEntry[];
  filtered: EnrichedEntry[];
  query: Query;
  counts: Counts;
};

export class App extends Component<{}, AppState> {
  state = {
    data: [],
    query: { tags: [], title: "", states: [] },
    counts: { tags: {}, states: {} },
    filtered: [],
  };

  componentDidMount() {
    const enriched = enrich(data.data, categories);
    const query = paramsToQuery(window.location.search);
    this.setState({
      data: enriched,
      ...this.processQuery(enriched, query),
    });

    getLatestData().then((data) => {
      const enriched = enrich(data, categories);
      this.setState({
        data: enriched,
        ...this.processQuery(enriched, this.state.query),
      });
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
