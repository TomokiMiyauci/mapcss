import { generateStyleSheet, presetTypography } from "../../mod.ts";
import { expect, test } from "../../dev_deps.ts";
test("generated Style Sheet", () => {
  const table: [string, string][] = [
    [
      "prose",
      `.prose :where(h1):not(.not-prose),.prose :where(h2):not(.not-prose),.prose :where(h3):not(.not-prose),.prose :where(h4):not(.not-prose),.prose :where(h5):not(.not-prose),.prose :where(h6):not(.not-prose){color:var(--map-prose-headings);font-weight:600;line-height:1.25}.prose :where(a):not(.not-prose){color:var(--map-prose-links);font-weight:500;text-decoration:underline}.prose :where(a code):not(.not-prose){color:var(--map-prose-links)}.prose :where(p):not(.not-prose),.prose :where(ul):not(.not-prose),.prose :where(ol):not(.not-prose),.prose :where(pre):not(.not-prose){line-height:1.75;margin:1em 0}.prose :where(blockquote):not(.not-prose){border-left:.25em solid var(--map-prose-borders);font-style:italic;margin:1em 0;padding-left:1em}.prose :where(h3):not(.not-prose){font-size:1.375em;margin:1.5em 0 .5em}.prose :where(h4):not(.not-prose){font-size:1.125em;margin:1em 0}.prose :where(img):not(.not-prose),.prose :where(video):not(.not-prose){max-width:100%}.prose :where(figure):not(.not-prose),.prose :where(picture):not(.not-prose){margin:1em 0}.prose :where(figcaption):not(.not-prose){color:var(--map-prose-captions);font-size:.875em}.prose :where(code):not(.not-prose){color:var(--map-prose-code);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation-Mono,Courier-New,monospace;font-size:.875em;font-weight:600}.prose :where(:not(pre)>code):not(.not-prose)::before,.prose :where(:not(pre)>code):not(.not-prose)::after{content:"\`"}.prose :where(pre):not(.not-prose){border-radius:.375rem;overflow-x:auto;padding:1.25rem 1.5rem}.prose :where(pre):not(.not-prose),.prose :where(code):not(.not-prose){-moz-hyphens:none;-moz-tab-size:4;-o-tab-size:4;-webkit-hyphens:none;background:transparent;hyphens:none;tab-size:4;white-space:pre;word-break:normal;word-spacing:normal;word-wrap:normal}.prose :where(pre code):not(.not-prose){font-weight:inherit}.prose :where(ol):not(.not-prose),.prose :where(ul):not(.not-prose){padding-left:1.25em}.prose :where(ul):not(.not-prose){list-style-type:disc}.prose :where(ol>li):not(.not-prose)::marker,.prose :where(ul>li):not(.not-prose)::marker,.prose :where(summary):not(.not-prose)::marker{color:var(--map-prose-lists)}.prose :where(hr):not(.not-prose){border:1px solid var(--map-prose-hr);margin:2em 0}.prose :where(table):not(.not-prose){border-collapse:collapse;display:block;margin:1em 0;overflow-x:auto}.prose :where(tr):not(.not-prose):nth-child(2n){background:var(--map-prose-bg-soft)}.prose :where(td):not(.not-prose),.prose :where(th):not(.not-prose){border:1px solid var(--map-prose-borders);padding:.625em 1em}.prose :where(abbr):not(.not-prose){cursor:help}.prose :where(kbd):not(.not-prose){border:1px solid;border-radius:.25rem;color:var(--map-prose-code);font-size:.875em;padding:.25rem .5rem}.prose :where(details):not(.not-prose){background:var(--map-prose-bg-soft);margin:1em 0;padding:1.25rem 1.5rem}.prose :where(summary):not(.not-prose){cursor:pointer;font-weight:600}.prose{color:--map-prose-body;max-width:65ch}`,
    ],
  ];

  table.forEach(([token, result]) =>
    expect(
      generateStyleSheet({
        presets: [presetTypography()],
      }, token).css,
    ).toBe(result)
  );
});
