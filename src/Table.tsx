import { h } from "preact";
import { EnrichedEntry } from "./enrichment";
import { join } from "./utils";
import { Link } from "./lib";

export function Table({ data }: { data: EnrichedEntry[] }) {
  const rows = data.map((entry) => <Row entry={entry} />);
  return (
    <table>
      <thead>
        <tr>
          <th> Location </th>
          <th> Date </th>
          <th> Title </th>
          <th> Tags </th>
          <th> Links </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export function Row({ entry }: { entry: EnrichedEntry }) {
  return (
    <tr>
      <td>{entry.state + " - " + entry.city}</td>
      <td>{Intl.DateTimeFormat("en").format(Date.parse(entry.date))}</td>
      <td>{entry.title}</td>
      <td>{entry.tags.join(", ")}</td>
      <td>{join(entry.links.map(Link), ", ")}</td>
    </tr>
  );
}
