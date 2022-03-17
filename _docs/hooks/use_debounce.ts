import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useDebounce = (
  effect: EffectCallback,
  option: { delay: number },
  deps?: DependencyList,
) => {
  const ref = useRef<ReturnType<EffectCallback>>();
  useEffect(() => {
    const timerId = setTimeout(() => {
      ref.current = effect();
    }, option?.delay);

    return () => {
      clearTimeout(timerId);
      ref.current?.();
    };
  }, deps);
};

export default useDebounce;
