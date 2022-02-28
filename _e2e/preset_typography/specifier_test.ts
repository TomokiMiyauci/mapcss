import { generate, presetTypography } from "../../mod.ts";
import { expect, test } from "../../dev_deps.ts";
test("generated Style Sheet", () => {
  const table: [string, string][] = [
    [
      "prose",
      `.prose :where(h1):not(.not-prose){color:var(--map-prose-headings);font-weight:600;line-height:1.25}.prose :where(h2):not(.not-prose){color:var(--map-prose-headings);font-weight:600;line-height:1.25}.prose :where(a):not(.not-prose){color:var(--map-prose-links);font-weight:500;text-decoration:underline}.prose :where(a code):not(.not-prose){color:var(--map-prose-links)}.prose :where(p):not(.not-prose){line-height:1.75;margin:1em 0}.prose :where(ul):not(.not-prose){line-height:1.75;margin:1em 0}.prose :where(ol):not(.not-prose){line-height:1.75;margin:1em 0}.prose :where(pre):not(.not-prose){line-height:1.75;margin:1em 0}.prose :where(blockquote):not(.not-prose){border-left:.25em solid var(--map-prose-borders);font-style:italic;margin:1em 0;padding-left:1em}.prose :where(h3):not(.not-prose){font-size:1.375em;margin:1.5em 0 .5em}.prose :where(h4):not(.not-prose){font-size:1.125em;margin:1em 0}.prose :where(img):not(.not-prose){max-width:100%}.prose :where(video):not(.not-prose){max-width:100%}.prose :where(figure):not(.not-prose){margin:1em 0}.prose :where(picture):not(.not-prose){margin:1em 0}.prose :where(figcaption):not(.not-prose){color:var(--map-prose-captions);font-size:.875em}.prose :where(code):not(.not-prose){color:var(--map-prose-code);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation-Mono,Courier-New,monospace;font-size:.875em;font-weight:600}.prose :where(:not(pre)>code):not(.not-prose)::before{content:"\`"}.prose :where(:not(pre)>code):not(.not-prose)::after{content:"\`"}.prose :where(pre):not(.not-prose){border-radius:.375rem;overflow-x:auto;padding:1.25rem 1.5rem}.prose :where(pre):not(.not-prose){-moz-hyphens:none;-moz-tab-size:4;-o-tab-size:4;-webkit-hyphens:none;background:transparent;hyphens:none;tab-size:4;white-space:pre;word-break:normal;word-spacing:normal;word-wrap:normal}.prose :where(code):not(.not-prose){-moz-hyphens:none;-moz-tab-size:4;-o-tab-size:4;-webkit-hyphens:none;background:transparent;hyphens:none;tab-size:4;white-space:pre;word-break:normal;word-spacing:normal;word-wrap:normal}.prose :where(pre code):not(.not-prose){font-weight:inherit}.prose :where(ol):not(.not-prose){padding-left:1.25em}.prose :where(ul):not(.not-prose){padding-left:1.25em}.prose :where(ul):not(.not-prose){list-style-type:disc}.prose :where(ol>li):not(.not-prose)::marker{color:var(--map-prose-lists)}.prose :where(ul>li):not(.not-prose)::marker{color:var(--map-prose-lists)}.prose :where(summary):not(.not-prose)::marker{color:var(--map-prose-lists)}.prose :where(hr):not(.not-prose){border:1px solid var(--map-prose-hr);margin:2em 0}.prose :where(table):not(.not-prose){border-collapse:collapse;display:block;margin:1em 0;overflow-x:auto}.prose :where(tr):not(.not-prose):nth-child(2n){background:var(--map-prose-bg-soft)}.prose :where(td):not(.not-prose){border:1px solid var(--map-prose-borders);padding:.625em 1em}.prose :where(th):not(.not-prose){border:1px solid var(--map-prose-borders);padding:.625em 1em}.prose :where(abbr):not(.not-prose){cursor:help}.prose :where(kbd):not(.not-prose){border:1px solid;border-radius:.25rem;color:var(--map-prose-code);font-size:.875em;padding:.25rem .5rem}.prose :where(details):not(.not-prose){background:var(--map-prose-bg-soft);margin:1em 0;padding:1.25rem 1.5rem}.prose :where(summary):not(.not-prose){cursor:pointer;font-weight:600}`,
    ],
    [
      "prose-invert",
      ".prose-invert{--map-prose-bg-soft:var(--map-prose-invert-bg-soft);--map-prose-borders:var(--map-prose-invert-borders);--map-prose-captions:var(--map-prose-invert-captions);--map-prose-code:var(--map-prose-invert-code);--map-prose-headings:var(--map-prose-invert-headings);--map-prose-hr:var(--map-prose-invert-hr);--map-prose-links:var(--map-prose-invert-links);--map-prose-lists:var(--map-prose-invert-lists)}",
    ],
    [
      "prose-red",
      ".prose-red{--map-prose-bg-soft:#fee2e2;--map-prose-borders:#fecaca;--map-prose-captions:#ef4444;--map-prose-code:#7f1d1d;--map-prose-headings:#7f1d1d;--map-prose-hr:#fecaca;--map-prose-invert-bg-soft:#991b1b;--map-prose-invert-borders:#b91c1c;--map-prose-invert-captions:#f87171;--map-prose-invert-code:#fee2e2;--map-prose-invert-headings:#fee2e2;--map-prose-invert-hr:#b91c1c;--map-prose-invert-links:#fee2e2;--map-prose-invert-lists:#ef4444;--map-prose-links:#7f1d1d;--map-prose-lists:#f87171}",
    ],
    [
      "prose-blue-500",
      ".prose-blue-500{--map-prose-bg-soft:#3b82f6;--map-prose-borders:#3b82f6;--map-prose-captions:#3b82f6;--map-prose-code:#3b82f6;--map-prose-headings:#3b82f6;--map-prose-hr:#3b82f6;--map-prose-invert-bg-soft:#3b82f6;--map-prose-invert-borders:#3b82f6;--map-prose-invert-captions:#3b82f6;--map-prose-invert-code:#3b82f6;--map-prose-invert-headings:#3b82f6;--map-prose-invert-hr:#3b82f6;--map-prose-invert-links:#3b82f6;--map-prose-invert-lists:#3b82f6;--map-prose-links:#3b82f6;--map-prose-lists:#3b82f6}",
    ],
    ["prose-unknown", ""],
  ];

  table.forEach(([token, result]) =>
    expect(
      generate(
        {
          preset: [presetTypography()],
        },
        token,
        { compress: true },
      ).css,
    ).toBe(result)
  );
});
