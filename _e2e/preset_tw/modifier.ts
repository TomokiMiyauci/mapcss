const simple: [string, string][] = [
  ["sm:block", "@media (min-width:640px){.sm\\:block{display:block}}"],
  ["md:block", "@media (min-width:768px){.md\\:block{display:block}}"],
  ["lg:block", "@media (min-width:1024px){.lg\\:block{display:block}}"],
  ["xl:block", "@media (min-width:1280px){.xl\\:block{display:block}}"],
  ["2xl:block", "@media (min-width:1536px){.\\32 xl\\:block{display:block}}"],
  [
    "dark:block",
    "@media (prefers-color-scheme:dark){.dark\\:block{display:block}}",
  ],
  ["hover:block", ".hover\\:block:hover{display:block}"],
  ["focus:block", ".focus\\:block:focus{display:block}"],
  ["!w-1", ".\\!w-1{width:0.25rem !important}"],
  ["-w-1", ".-w-1{width:-0.25rem}"],
  ["scrollbar:w-1", ".scrollbar\\:w-1::-webkit-scrollbar{width:0.25rem}"],
  [
    "scrollbar:!w-1",
    ".scrollbar\\:\\!w-1::-webkit-scrollbar{width:0.25rem !important}",
  ],
  [
    "scrollbar-track:rounded",
    ".scrollbar-track\\:rounded::-webkit-scrollbar-track{border-radius:0.25rem}",
  ],
  [
    "scrollbar-thumb:rounded",
    ".scrollbar-thumb\\:rounded::-webkit-scrollbar-thumb{border-radius:0.25rem}",
  ],
  ["group:block", ""],
  ["group-hover:block", ".group:hover .group-hover\\:block{display:block}"],
];

const complex: [string, string][] = [
  [
    "sm:block",
    "@media (prefers-color-scheme:dark){.dark\\:block{display:block}}",
  ],
];

export const modifier: [string, string][] = [
  ...simple,
  ...complex,
];
