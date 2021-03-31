import { h } from "preact";
import { EnrichedEntry } from "../enrichment";
import { Link } from "./lib";
import { compare, groupBy, join } from "../utils";
import { urlName } from "../urlName";

export function Cards({ data }: { data: EnrichedEntry[] }) {
  const cards = data.map((entry) => <Card entry={entry} key={entry.id} />);
  return <div>{cards}</div>;
}

function Card({ entry }: { entry: EnrichedEntry }) {
  const grouped = groupBy(entry.links, urlName);

  const links = join(
    Object.entries(grouped)
      .sort(([t1, l1], [t2, l2]) => compare(t1, t2))
      .map(([title, links]) =>
        links.length == 1 ? (
          <a href={links[0]}>{title}</a>
        ) : (
          <span>
            {title} (
            <span>
              {join(
                links.map((link, i) => <a href={link}>{i + 1}</a>),
                ", "
              )}
            </span>
            )
          </span>
        )
      ),
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
