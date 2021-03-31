import { EnrichedEntry } from "../enrichment";
import { compare } from "../utils";
import { Entry } from "./types";

export type DateSlice = { start: Date; end: Date };

export function getDateSlice(
  entries: EnrichedEntry[],
  start: Date | null,
  size = 100
) {
  let firstEntry =
    start !== null
      ? entries.findIndex((entry) => entry.jsDate.valueOf() < start.valueOf())
      : size;
  if (firstEntry == -1) firstEntry = entries.length;

  return entries.slice(Math.max(firstEntry - size, 0), firstEntry);
}

export function getDateSlices(entries: EnrichedEntry[], size = 100) {
  const sorted = Array.from(entries).sort((a, b) =>
    compare(a.jsDate.valueOf(), b.jsDate.valueOf())
  );
  const slices: DateSlice[] = [];
  for (let i = 0; i < sorted.length; i += size) {
    slices.push({
      start: sorted[i].jsDate,
      end:
        i + size - 1 > sorted.length
          ? sorted[sorted.length - 1].jsDate
          : sorted[i + size - 1].jsDate,
    });
  }

  return slices;
}
