import { useContext, useMemo } from "react";
import { DarkModeContext } from "~/contexts/mod.ts";

const useColorModeValue = <Light, Dark>(light: Light, dark: Dark) => {
  const [isDark] = useContext(DarkModeContext);
  return useMemo(() => isDark ? dark : light, [isDark]);
};

export default useColorModeValue;
