import { h } from "preact";
import { EnrichedEntry } from "../enrichment";
import { Link } from "./lib";
import { join } from "../utils";

export function Cards({ data }: { data: EnrichedEntry[] }) {
  const cards = data.map((entry) => <Card entry={entry} />);
  return <div>{cards} </div>;
}

function Card({ entry }: { entry: EnrichedEntry }) {
  const links = join(
    entry.links.map((l) => <Link link={l} />),
    ", "
  );
  const tags = join(
    entry.tags.map((t) => <Tag tag={t} />),
    " "
  );
  return (
    <div className="card">
      <div className="cardcols" id={entry.id}>
        <div className="title">
          <span>{entry.title}</span>
          <br></br>
          <br></br>
          <div className="links">{links}</div>
        </div>
        <div className="tags">
          <span>{tags}</span>
        </div>
        <div className="timeplace">
          <div>{Intl.DateTimeFormat("en").format(Date.parse(entry.date))}</div>
          <div> {entry.state + " - " + entry.city} </div>
        </div>
      </div>
      <div className="hardlink">
        <a href={"#" + entry.id}>🔗</a>
      </div>
    </div>
  );
}

function Tag({ tag }: { tag: string }) {
  return <span className={`tag tag-${tag.toLowerCase()}`}>{tag}</span>;
}
