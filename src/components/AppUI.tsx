import { h } from "preact";
import { Cards } from "./Cards";
import { Search } from "./Search";

import { EnrichedEntry, Query, Counts, QueryUpdates } from "../enrichment";

export type AppUIProps = {
  data: EnrichedEntry[];
  query: Query;
  counts: Counts;
  updateQuery: (updates: QueryUpdates) => void;
};

export function AppUI(props: AppUIProps) {
  return (
    <div className="app">
      <h1>Police Brutality during the 2020 George Floyd protests</h1>
      <p>
        A searchable list of incidents of police brutality which occurred during
        and after the 2020 George Floyd protests.
      </p>

      <p>
        {" "}
        This data is collected by{" "}
        <a href="https://www.reddit.com/r/2020PoliceBrutality/">
          /r/2020PoliceBrutality
        </a>{" "}
        at{" "}
        <a href="https://github.com/2020PB/police-brutality">
          github.com/2020PB/police-brutality
        </a>
        , where you can report new incidents.
      </p>
      <p>
        This website itself is also{" "}
        <a href="https://github.com/Spacerat/2020policebrutality">
          open source.
        </a>
      </p>
      <Search {...props} />
      <h2>{props.data.length} Incidents</h2>
      <Cards data={props.data} />
    </div>
  );
}
