import { h, render } from "preact";
import { App, paramsToQuery, queryToTitle } from "./components/App";

// Set the document title to match the search query
document.title = queryToTitle(paramsToQuery(window.location.search));

const mountNode = document.getElementById("app");
render(<App />, mountNode);
