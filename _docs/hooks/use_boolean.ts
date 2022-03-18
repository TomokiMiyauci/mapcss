import { Dispatch, SetStateAction, useState } from "react";

type VFn = () => void;

export type Dispatcher = {
  on: VFn;
  off: VFn;
  toggle: VFn;
  dispatch: Dispatch<SetStateAction<boolean>>;
};

export type UseBooleanReturn = [boolean, Dispatcher];

const useBoolean = (
  initialState: boolean | (() => boolean) = false,
): UseBooleanReturn => {
  const [state, dispatch] = useState(initialState);
  const on = (): void => dispatch(true);
  const off = (): void => dispatch(false);
  const toggle = (): void => dispatch((value) => !value);

  return [state, { on, off, toggle, dispatch }];
};

export default useBoolean;
