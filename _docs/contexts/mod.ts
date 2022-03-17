import { createContext, Dispatch, SetStateAction } from "react";

export const DarkModeContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => false]);
