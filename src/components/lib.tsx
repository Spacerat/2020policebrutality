import { h } from "preact";
import { urlName } from "../urlName";
export function Button({
  title,
  count,
  active,
  onClick,
}: {
  title: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  const text = count > 0 ? `${title} (${count})` : title;
  const button = (
    <button className={active ? "toggled" : ""} onClick={onClick}>
      {text}
    </button>
  );
  return button;
}
export function Link({ link }: { link: string }) {
  const title = urlName(link);
  return <a href={link}>{title}</a>;
}
