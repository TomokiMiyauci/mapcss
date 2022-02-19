import React, { ReactNode } from "react";
export type ExampleProps = {
  children?: ReactNode;
};

export default function Example({ children }: ExampleProps) {
  return (
    <div className="bg-slate-50 mt-4 rounded-xl overflow-hidden border border-black/5">
      {children}
    </div>
  );
}
