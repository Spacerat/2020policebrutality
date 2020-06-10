import { h } from "preact";
import { EnrichedEntry } from "../enrichment";
import { Link } from "./lib";
import { join } from "../utils";

export function Cards({ data }: { data: EnrichedEntry[] }) {
  const cards = data.map((entry) => <Card entry={entry} key={entry.id} />);
  return <div>{cards} </div>;
}

function Card({ entry }: { entry: EnrichedEntry }) {
  const links = join(
    entry.links.map((l) => <Link link={l} key={l} />),
    ", "
  );
  const tags = join(
    entry.tags.map((t) => <Tag tag={t} key={t} />),
    " "
  );
  return (
    <div className="card">
      <div className="cardcols" id={entry.id}>
        <div className="title">
          <span>{entry.name}</span>
          <br></br>
          <br></br>
          <div className="links">{links}</div>
        </div>
        <div className="tags">
          <span>{tags}</span>
        </div>
        <div className="timeplace">
          <div>{entry.date}</div>
          <br></br>
          <div> {entry.state + " - " + entry.city} </div>
        </div>
        <div className="icons">
          <a href={entry.edit_at}>✏️</a> <a href={"#" + entry.id}>🔗</a>
        </div>
      </div>
    </div>
  );
}

function Tag({ tag }: { tag: string }) {
  return <span className={`tag tag-${tag.toLowerCase()}`}>{tag}</span>;
}
