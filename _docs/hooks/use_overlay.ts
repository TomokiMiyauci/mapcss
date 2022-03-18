import { useContext } from "react";
import { OverlayContext } from "~/contexts/mod.ts";
import useResize from "~/hooks/use_resize.ts";

const useOverlay = () => {
  const [node, { off, ...rest }] = useContext(OverlayContext);

  useResize((ev) => {
    if (node && (ev.target as Window).innerWidth > 768) {
      off();
    }
  }, [node]);

  return [node, { off, ...rest }] as const;
};

export default useOverlay;
