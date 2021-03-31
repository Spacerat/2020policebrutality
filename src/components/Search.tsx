import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Counts, Query, QueryUpdates } from "../enrichment";
import { byFirst } from "../utils";

import { Button } from "./lib";

export type SearchProps = {
  query: Query;
  counts: Counts;
  updateQuery: (updates: QueryUpdates) => void;
};

export function Search(props: SearchProps) {
  const { counts, query, updateQuery } = props;

  const states = Object.entries(counts.states)
    .sort(byFirst)
    .map(([state, count]) => (
      <Button
        count={count}
        active={query.states.includes(state)}
        onClick={() => updateQuery({ toggleState: state })}
        key={state}
      >
        {state}
      </Button>
    ));
  const tags = Object.entries(counts.tags)
    .sort(byFirst)
    .map(([tag, count]) => (
      <Button
        count={count}
        active={query.tags.includes(tag)}
        onClick={() => updateQuery({ toggleTag: tag })}
        key={tag}
      >
        {tag}
      </Button>
    ));
  return (
    <div>
      <h3>Search in title</h3>
      <input
        type="text"
        value={query.title}
        onChange={(e) => updateQuery({ title: (e.target as any).value })} // not sure why .value is a type error here
      />
      <h3>Select states</h3>
      <div>{states}</div>
      <br></br>
      <h3>Filter by tags</h3>
      <div>{tags}</div>
    </div>
  );
}
