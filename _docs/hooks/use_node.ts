import { ReactNode, useState } from "react";

export type UseNodeReturn = [
  ReactNode,
  {
    on: (node: ReactNode) => void;
    off: () => void;
    toggle: (node: ReactNode) => void;
  },
];

const useNode = (): UseNodeReturn => {
  const [node, setNode] = useState<ReactNode>();

  const on = (node: ReactNode) => setNode(node);
  const off = () => setNode(undefined);
  const toggle = (node: ReactNode) =>
    setNode((_node) => {
      if (_node) {
        setNode(undefined);
      } else {
        setNode(node);
      }
    });

  return [node, { on, off, toggle }];
};

export default useNode;
