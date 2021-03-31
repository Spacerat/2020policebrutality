import urlparse from "url-parse";
import { memo } from "./utils";

export const urlName = memo((url: string): string => {
  let hostname = urlparse(url).hostname;
  hostname = hostname.replace(
    /old\.|news\.|touch\.|mobile\.|www\.|edition\.|\.com?|\.ch|\.ca|$[ivm]\.|\.org|\.au|\.live|\.net|\.uk/g,
    ""
  );
  hostname = hostname.replace("redd.it", "reddit");
  hostname = hostname.replace("youtu.be", "youtube");
  return hostname;
});
