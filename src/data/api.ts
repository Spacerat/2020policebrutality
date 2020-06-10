import { Data, Entry } from "./types";

const API =
  "https://raw.githubusercontent.com/2020PB/police-brutality/data_build/all-locations.json";

export default function getLatestData(): Promise<Entry[]> {
  return fetch(API)
    .then((response) => response.json() as Promise<Data>)
    .then((data) => data.data);
}
