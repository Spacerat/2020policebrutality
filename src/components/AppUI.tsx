import { h } from "preact";
import { Cards } from "./Cards";
import { Search } from "./Search";

import { EnrichedEntry, Query, Counts, QueryUpdates } from "../enrichment";
import { Button } from "./lib";

export type AppUIProps = {
  data: EnrichedEntry[];
  query: Query;
  counts: Counts;
  slices: { start: Date; end: Date }[];
  updateQuery: (updates: QueryUpdates) => void;
};

export function AppUI(props: AppUIProps) {
  const dateFmt = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };
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
      <h2>{props.counts.total} Incidents</h2>
      {props.slices.map((sliceDate) => (
        <Button
          active={props.query.start == sliceDate.start}
          onClick={() => {
            props.updateQuery({ start: sliceDate.start });
          }}
          key={sliceDate.valueOf()}
        >
          {renderDateRange(sliceDate.start, sliceDate.end)}
        </Button>
      ))}
      <Cards data={props.data} />
    </div>
  );
}

function renderDateRange(from: Date, to: Date) {
  const fullDateFmt = {
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  if (from.getFullYear() != to.getFullYear()) {
    const fromStr = from.toLocaleString("default", fullDateFmt);
    const toStr = to.toLocaleString("default", fullDateFmt);
    return (
      <span>
        {`${fromStr} -`}
        <br />
        {`${toStr}`}
      </span>
    );
  } else {
    const shortFmt = { month: "short", day: "numeric" };
    const fromStr = from.toLocaleString("default", shortFmt);
    const toStr = to.toLocaleString("default", shortFmt);
    return (
      <span>
        {`${fromStr} - ${toStr}`}
        <br />
        {to.getFullYear()}
      </span>
    );
  }
}
