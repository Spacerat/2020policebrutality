import { h } from "preact";
import { byFirst } from "../utils";
import { AppUIProps } from "./AppUI";
import { Button } from "./lib";

export function Search(props: AppUIProps) {
  const states = Object.entries(props.counts.states)
    .sort(byFirst)
    .map(([state, count]) => (
      <Button
        title={state}
        count={count}
        active={props.query.states.includes(state)}
        onClick={() => props.updateQuery({ toggleState: state })}
        key={state}
      />
    ));
  const tags = Object.entries(props.counts.tags)
    .sort(byFirst)
    .map(([tag, count]) => (
      <Button
        title={tag}
        count={count}
        active={props.query.tags.includes(tag)}
        onClick={() => props.updateQuery({ toggleTag: tag })}
        key={tag}
      />
    ));
  return (
    <div>
      <h3>Search in title</h3>
      <input
        type="text"
        value={props.query.title}
        onChange={(e) => props.updateQuery({ title: e.target.value })}
      />
      <h3>Select states</h3>
      <div>{states}</div>
      <br></br>
      <h3>Filter by tags</h3>
      <div>{tags}</div>
    </div>
  );
}
