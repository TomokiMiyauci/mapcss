import React from "react";

type Props =
  & SwitchProps
  & Omit<JSX.IntrinsicElements["button"], keyof SwitchProps>;

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Switch(
  { checked, onChange, ...rest }: Props,
): JSX.Element {
  return (
    <button
      {...rest}
      onClick={() => {
        onChange(!checked);
      }}
      type="button"
      role="switch"
      aria-checked={checked}
    />
  );
}
