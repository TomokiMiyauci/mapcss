import React, { ReactNode } from "react";
export type ExampleProps = {
  children?: ReactNode;
};

export default function Example({ children }: ExampleProps) {
  return (
    <div className="bg-slate-50 dark:bg-dark-800 mt-4 rounded-xl overflow-hidden border border-black/5 dark:border-dark-900/50">
      {children}
    </div>
  );
}
