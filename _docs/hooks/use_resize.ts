import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useResize = (
  callback: (ev: UIEvent) => ReturnType<EffectCallback>,
  deps?: DependencyList,
) => {
  const ref = useRef<ReturnType<EffectCallback>>();
  const fn = (ev: UIEvent) => {
    ref.current = callback(ev);
  };
  useEffect(() => {
    window.addEventListener("resize", fn);

    return () => {
      window.removeEventListener("resize", fn);
      ref.current?.();
    };
  }, deps);
};

export default useResize;
