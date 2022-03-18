import { createContext, Dispatch, SetStateAction } from "react";
import { UseNodeReturn } from "~/hooks/use_node.ts";

const F = (): boolean => false;
const vfn = () => {};

export const DarkModeContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, F]);
export const OverlayContext = createContext<UseNodeReturn>([
  undefined,
  { on: vfn, off: vfn, toggle: vfn },
]);
