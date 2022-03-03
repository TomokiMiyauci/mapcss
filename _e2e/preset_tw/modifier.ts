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
  ["focus-within:block", ".focus-within\\:block:focus-within{display:block}"],
  [
    "focus-visible:block",
    ".focus-visible\\:block:focus-visible{display:block}",
  ],
  ["active:block", ".active\\:block:active{display:block}"],
  ["visited:block", ".visited\\:block:visited{display:block}"],
  ["target:block", ".target\\:block:target{display:block}"],
  ["first:block", ".first\\:block:first-child{display:block}"],
  ["last:block", ".last\\:block:last-child{display:block}"],
  ["only:block", ".only\\:block:only-child{display:block}"],
  ["odd:block", ".odd\\:block:nth-child(odd){display:block}"],
  ["even:block", ".even\\:block:nth-child(even){display:block}"],
  [
    "first-of-type:block",
    ".first-of-type\\:block:first-of-type{display:block}",
  ],
  [
    "last-of-type:block",
    ".last-of-type\\:block:last-of-type{display:block}",
  ],
  [
    "only-of-type:block",
    ".only-of-type\\:block:only-of-type{display:block}",
  ],
  ["empty:block", ".empty\\:block:empty{display:block}"],
  ["disabled:block", ".disabled\\:block:disabled{display:block}"],
  ["checked:block", ".checked\\:block:checked{display:block}"],
  [
    "indeterminate:block",
    ".indeterminate\\:block:indeterminate{display:block}",
  ],
  ["default:block", ".default\\:block:default{display:block}"],
  ["required:block", ".required\\:block:required{display:block}"],
  ["valid:block", ".valid\\:block:valid{display:block}"],
  ["invalid:block", ".invalid\\:block:invalid{display:block}"],
  ["in-range:block", ".in-range\\:block:in-range{display:block}"],
  ["out-of-range:block", ".out-of-range\\:block:out-of-range{display:block}"],
  [
    "placeholder-shown:block",
    ".placeholder-shown\\:block:placeholder-shown{display:block}",
  ],
  ["autofill:block", ".autofill\\:block:autofill{display:block}"],
  ["read-only:block", ".read-only\\:block:read-only{display:block}"],
  [
    "before:block",
    ".before\\:block::before{content:var(--map-content);display:block}",
  ],
  [
    "after:block",
    ".after\\:block::after{content:var(--map-content);display:block}",
  ],
  [
    "first-letter:uppercase",
    ".first-letter\\:uppercase::first-letter{text-transform:uppercase}",
  ],
  [
    "first-line:uppercase",
    ".first-line\\:uppercase::first-line{text-transform:uppercase}",
  ],
  [
    "marker:text-black",
    ".marker\\:text-black::marker{color:rgb(0 0 0/1)}",
  ],
  [
    "selection:text-black",
    ".selection\\:text-black::selection{color:rgb(0 0 0/1)}",
  ],
  ["file:mr-4", ".file\\:mr-4::file-selector-button{margin-right:1rem}"],
  [
    "placeholder:italic",
    ".placeholder\\:italic::placeholder{font-style:italic}",
  ],
  [
    "portrait:hidden",
    "@media (orientation:portrait){.portrait\\:hidden{display:none}}",
  ],
  [
    "landscape:hidden",
    "@media (orientation:landscape){.landscape\\:hidden{display:none}}",
  ],
  [
    "motion-safe:block",
    "@media (prefers-reduced-motion:no-preference){.motion-safe\\:block{display:block}}",
  ],
  [
    "motion-reduce:hidden",
    "@media (prefers-reduced-motion:reduce){.motion-reduce\\:hidden{display:none}}",
  ],
  ["print:hidden", "@media print{.print\\:hidden{display:none}}"],
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
    "dark:sm:block",
    "@media (prefers-color-scheme:dark){@media (min-width:640px){.dark\\:sm\\:block{display:block}}}",
  ],
];

export const modifier: [string, string][] = [
  ...simple,
  ...complex,
];
