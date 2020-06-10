import { Query } from "../enrichment";
import { joinWithFinal } from "../utils";

function queryToParams(query: Query): string {
  const elements = [
    query.states.length > 0
      ? query.states.map((s) => `state=${s}`).join("&")
      : null,
    query.tags.length > 0 ? query.tags.map((s) => `tag=${s}`).join("&") : null,
    query.title ? `search=${query.title}` : null,
  ].filter((x) => !!x);
  const params = elements.join("&");
  return params.length > 0 ? `./?${params}` : "./";
}

export function queryToTitle(query: Query): string {
  const elements = [
    "Police Brutality at George Floyd Protests",
    query.states.length > 0
      ? " in " + joinWithFinal(query.states, ", ", " and ").join("")
      : null,
    query.tags.length > 0 ? ` (tags: ${query.tags.join(", ")})` : null,
    query.title ? ` - "${query.title}"` : null,
  ];
  return elements.filter((x) => !!x).join(" ");
}

export function paramsToQuery(params: string): Query {
  const parsed = new URLSearchParams(params);
  return {
    states: parsed.getAll("state"),
    tags: parsed.getAll("tag"),
    title: parsed.get("search") ?? "",
  };
}

export function updateHistory(query: Query) {
  const title = queryToTitle(query);
  history.replaceState(query, title, queryToParams(query));
  document.title = title;
}
