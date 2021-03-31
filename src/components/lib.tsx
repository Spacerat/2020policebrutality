import { ComponentChild, ComponentChildren, h } from "preact";
import { urlName } from "../urlName";

export type ButtonProps = {
  count?: number;
  active: boolean;
  onClick: () => void;
  children: ComponentChild;
};

export function Button({ count, active, onClick, children }: ButtonProps) {
  return (
    <button className={active ? "toggled" : ""} onClick={onClick}>
      {children}
      {count && count > 0 ? <span>{` (${count})`}</span> : null}
    </button>
  );
}
