import data from "./incidents";
import categories from "./categories";

export type Entry = typeof data.data[0];

export type Categories = { [key: string]: string[] };
