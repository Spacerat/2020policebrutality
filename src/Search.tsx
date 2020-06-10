import { h } from "preact";
import { byFirst } from "./utils";
import { UIProps } from "./App";
import { Button } from "./lib";
export function Search(props: UIProps) {
  const states = Object.entries(props.counts.states)
    .sort(byFirst)
    .map(([state, count]) => (
      <Button
        title={state}
        count={count}
        active={props.query.states.includes(state)}
        onClick={() => props.updateQuery({ toggleState: state })}
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
      />
    ));
  return (
    <div>
      <h2>States</h2>
      <div>{states}</div>
      <br></br>
      <h2>Tags</h2>
      <div>{tags}</div>
    </div>
  );
}
