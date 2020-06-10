import { h, render } from "preact";
import { App } from "./components/App";
import { paramsToQuery, queryToTitle } from "./components/history";

// Set the document title to match the search query
document.title = queryToTitle(paramsToQuery(window.location.search));

const mountNode = document.getElementById("app");
render(<App />, mountNode);
