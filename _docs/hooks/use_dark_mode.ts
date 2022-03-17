import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUpdateEffect } from "~/hooks/utils.ts";

const useDarkMode = (
  initialState = false,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    const media = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (
      theme === "dark" ||
      (theme === null &&
        media)
    ) {
      document.documentElement.classList.add("dark");
      setValue(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useUpdateEffect(() => {
    if (value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [value]);

  return [value, setValue];
};

export default useDarkMode;
