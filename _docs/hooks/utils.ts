import { MutableRefObject, RefObject, useEffect, useRef } from "react";

/**
 * Define ref hooks
 * @typeParam T - Return hooks value with `_ref`
 */
type UseRef<
  T extends {
    _ref: RefObject<unknown> | MutableRefObject<unknown>;
    [k: PropertyKey]: unknown;
  },
> = () => T;

type UseIsFirstMountRefReturn = {
  isFirstMount: boolean;
  _ref: RefObject<boolean>;
};

/**
 * Ref of first mount or not
 * @returns Object includes `isFirstMount` what is first mount or not
 *
 * @example
 * ```tsx
 * const { isFirstMount } = useIsFirstMountRef()
 * // isFirstMount: true
 * // re-render
 * // isFirstMount: false
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/ref-useidfirstmountref
 * @beta
 */
const useIsFirstMountRef: UseRef<UseIsFirstMountRefReturn> = () => {
  const isFirstMount = useRef<boolean>(true);

  if (isFirstMount.current) {
    isFirstMount.current = false;

    return {
      isFirstMount: true,
      _ref: isFirstMount,
    };
  }

  return {
    isFirstMount: isFirstMount.current,
    _ref: isFirstMount,
  };
};

/**
 * Hooks for effect on update dependency
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - Effect will only activate if the values in the list change.
 *
 * @example
 * ```ts
 * const [state, setState] = useState(false)
 *
 * useUpdateEffect(() => {
 *   // Not call when first mount
 *   // When deps update, then effect
 * }, [state])
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/enhancement-useupdateeffect
 */
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const { isFirstMount } = useIsFirstMountRef();

  useEffect(() => {
    if (isFirstMount) return;

    return effect();
  }, deps);
};
