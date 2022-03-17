import React, { useContext } from "react";
import { clsx } from "~/deps.ts";
import Switch from "~/components/switch.tsx";
import { DarkModeContext } from "~/contexts/mod.ts";

const ToggleDark = (): JSX.Element => {
  const [enabled, setEnabled] = useContext(DarkModeContext);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      title="Switch dark mode"
      className={`${enabled ? "bg-dark-900" : "bg-dark-700"}
          relative inline-flex flex-shrink-0 h-[24px] w-[48px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-flex items-center justify-center h-[20px] w-[20px] rounded-full text-black bg-white shadow-lg transform transition ease-in-out duration-200`}
      >
        <span
          className={clsx(
            "w-3.5 h-3.5 transition-all duration-700",
            enabled ? "i-mdi-weather-night" : "i-mdi-white-balance-sunny",
          )}
        />
      </span>
    </Switch>
  );
};

export default ToggleDark;
