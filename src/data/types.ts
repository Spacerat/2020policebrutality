import data from "./incidents";

export type Data = typeof data;
export type Entry = typeof data.data[0];
export type Categories = { [key: string]: string[] };
