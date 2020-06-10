import { h } from "preact";
import { Cards } from "./Cards";
import { UIProps } from "./App";
import { Search } from "./Search";
export function AppUI(props: UIProps) {
  return (
    <div className="app">
      <h1>
        Incidents of Police Brutality During the 2020 George Floyd protests
      </h1>
      <h2 style={{ color: "red" }}>
        NOTE: THIS IS A WORK IN PROGRESS AND DOES NOT CURRENTLY FETCH THE LATEST
        DATA. SEE{" "}
        <a href="https://2020policebrutality.netlify.app/">
          2020policebrutality.netlify.app
        </a>{" "}
        FOR UP TO DATE DATA.
      </h2>
      <Search {...props} />
      <h2>Incidents</h2>
      <Cards data={props.data} />
    </div>
  );
}
