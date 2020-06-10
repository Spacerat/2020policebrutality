import { h, render } from "preact";
import { App, paramsToQuery, queryToTitle } from "./App";

document.title = queryToTitle(paramsToQuery(window.location.search));

const mountNode = document.getElementById("app");
render(<App />, mountNode);
