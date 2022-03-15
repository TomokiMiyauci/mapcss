import type { CSSMap } from "../../core/types.ts";

export const overflow: CSSMap = {
  auto: { overflow: "auto" },
  hidden: { overflow: "hidden" },
  clip: { overflow: "clip" },
  visible: { overflow: "visible" },
  scroll: { overflow: "scroll" },
  x: {
    auto: { overflowX: "auto" },
    hidden: { overflowX: "hidden" },
    clip: { overflowX: "clip" },
    visible: { overflowX: "visible" },
    scroll: { overflowX: "scroll" },
  },
  y: {
    auto: { overflowY: "auto" },
    hidden: { overflowY: "hidden" },
    clip: { overflowY: "clip" },
    visible: { overflowY: "visible" },
    scroll: { overflowY: "scroll" },
  },
};
