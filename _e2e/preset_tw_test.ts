import { expect, test } from "../dev_deps.ts";
import { generate, presetTw } from "../mod.ts";

const expects: [string, string][] = [
  ["aspect-auto", ".aspect-auto{aspect-ratio:auto;}"],
  ["aspect-square", ".aspect-square{aspect-ratio:1 / 1;}"],
  ["aspect-video", ".aspect-video{aspect-ratio:16 / 9;}"],
  ["columns-1", ".columns-1{columns:1;}"],
  ["columns-10", ".columns-10{columns:10;}"],
  ["columns-auto", ".columns-auto{columns:auto;}"],
  ["columns-3xs", ".columns-3xs{columns:16rem;}"],
  ["columns-2xs", ".columns-2xs{columns:18rem;}"],
  ["columns-xs", ".columns-xs{columns:20rem;}"],
  ["columns-sm", ".columns-sm{columns:24rem;}"],
  ["columns-md", ".columns-md{columns:28rem;}"],
  ["columns-lg", ".columns-lg{columns:32rem;}"],
  ["columns-xl", ".columns-xl{columns:36rem;}"],
  ["columns-2xl", ".columns-2xl{columns:42rem;}"],
  ["columns-3xl", ".columns-3xl{columns:48rem;}"],
  ["columns-4xl", ".columns-4xl{columns:56rem;}"],
  ["columns-5xl", ".columns-5xl{columns:64rem;}"],
  ["columns-6xl", ".columns-6xl{columns:72rem;}"],
  ["columns-7xl", ".columns-7xl{columns:80rem;}"],
  ["break-after-auto", ".break-after-auto{break-after:auto;}"],
  ["break-after-avoid", ".break-after-avoid{break-after:avoid;}"],
  ["break-after-all", ".break-after-all{break-after:all;}"],
  [
    "break-after-avoid-page",
    ".break-after-avoid-page{break-after:avoid-page;}",
  ],
  ["break-after-page", ".break-after-page{break-after:page;}"],
  ["break-after-left", ".break-after-left{break-after:left;}"],
  ["break-after-right", ".break-after-right{break-after:right;}"],
  ["break-after-column", ".break-after-column{break-after:column;}"],
  ["break-before-auto", ".break-before-auto{break-before:auto;}"],
  ["break-before-avoid", ".break-before-avoid{break-before:avoid;}"],
  ["break-before-all", ".break-before-all{break-before:all;}"],
  [
    "break-before-avoid-page",
    ".break-before-avoid-page{break-before:avoid-page;}",
  ],
  ["break-before-page", ".break-before-page{break-before:page;}"],
  ["break-before-left", ".break-before-left{break-before:left;}"],
  ["break-before-right", ".break-before-right{break-before:right;}"],
  ["break-before-column", ".break-before-column{break-before:column;}"],
  ["break-inside-auto", ".break-inside-auto{break-inside:auto;}"],
  ["break-inside-avoid", ".break-inside-avoid{break-inside:avoid;}"],
  [
    "break-inside-avoid-page",
    ".break-inside-avoid-page{break-inside:avoid-page;}",
  ],
  [
    "break-inside-avoid-column",
    ".break-inside-avoid-column{break-inside:avoid-column;}",
  ],
  [
    "box-decoration-clone",
    ".box-decoration-clone{box-decoration-break:clone;}",
  ],
  [
    "box-decoration-slice",
    ".box-decoration-slice{box-decoration-break:slice;}",
  ],
  ["box-border", ".box-border{box-sizing:border-box;}"],
  ["box-content", ".box-content{box-sizing:content-box;}"],
  ["block", ".block{display:block;}"],
  ["inline-block", ".inline-block{display:inline-block;}"],
  ["inline", ".inline{display:inline;}"],
  ["flex", ".flex{display:flex;}"],
  ["inline-flex", ".inline-flex{display:inline-flex;}"],
  ["table", ".table{display:table;}"],
  ["inline-table", ".inline-table{display:inline-table;}"],
  ["table-caption", ".table-caption{display:table-caption;}"],
  // ["table-cell", ".table-cell{display:table-cell;}"],
  // ["table-column", ".table-column{display:table-column;}"],
  // ["table-column-group", ".table-column-group{display:table-column-group;}"],
  // ["table-footer-group", ".table-footer-group{display:table-footer-group;}"],
  // ["table-header-group", ".table-header-group{display:table-header-group;}"],
  // ["table-row-group", ".table-row-group{display:table-row-group;}"],
  // ["table-row", ".table-row{display:table-row;}"],
  // ["flow-root", ".flow-root{display:flow-root;}"],
  ["grid", ".grid{display:grid;}"],
  // ["inline-grid", ".inline-grid{display:inline-grid;}"],
  ["contents", ".contents{display:contents;}"],
  ["list-item", ".list-item{display:list-item;}"],
  ["hidden", ".hidden{display:none;}"],
  ["float-right", ".float-right{float:right;}"],
  ["float-left", ".float-left{float:left;}"],
  ["float-none", ".float-none{float:none;}"],
  ["clear-left", ".clear-left{clear:left;}"],
  ["clear-right", ".clear-right{clear:right;}"],
  ["clear-both", ".clear-both{clear:both;}"],
  ["clear-none", ".clear-none{clear:none;}"],
  ["isolate", ".isolate{isolation:isolate;}"],
  ["isolation-auto", ".isolation-auto{isolation:auto;}"],
  ["object-contain", ".object-contain{object-fit:contain;}"],
  ["object-cover", ".object-cover{object-fit:cover;}"],
  ["object-fill", ".object-fill{object-fit:fill;}"],
  ["object-none", ".object-none{object-fit:none;}"],
  ["object-scale-down", ".object-scale-down{object-fit:scale-down;}"],
  ["object-bottom", ".object-bottom{object-position:bottom;}"],
  ["object-center", ".object-center{object-position:center;}"],
  ["object-left", ".object-left{object-position:left;}"],
  ["object-right", ".object-right{object-position:right;}"],
  ["object-top", ".object-top{object-position:top;}"],
  [
    "object-right-bottom",
    ".object-right-bottom{object-position:right bottom;}",
  ],
  ["object-right-top", ".object-right-top{object-position:right top;}"],
  ["object-left-bottom", ".object-left-bottom{object-position:left bottom;}"],
  ["object-left-top", ".object-left-top{object-position:left top;}"],
  ["overflow-auto", ".overflow-auto{overflow:auto;}"],
  ["overflow-hidden", ".overflow-hidden{overflow:hidden;}"],
  ["overflow-clip", ".overflow-clip{overflow:clip;}"],
  ["overflow-visible", ".overflow-visible{overflow:visible;}"],
  ["overflow-scroll", ".overflow-scroll{overflow:scroll;}"],
  ["overflow-x-auto", ".overflow-x-auto{overflow-x:auto;}"],
  ["overflow-y-auto", ".overflow-y-auto{overflow-y:auto;}"],
  ["overflow-x-hidden", ".overflow-x-hidden{overflow-x:hidden;}"],
  ["overflow-y-hidden", ".overflow-y-hidden{overflow-y:hidden;}"],
  ["overflow-x-clip", ".overflow-x-clip{overflow-x:clip;}"],
  ["overflow-y-clip", ".overflow-y-clip{overflow-y:clip;}"],
  ["overflow-x-visible", ".overflow-x-visible{overflow-x:visible;}"],
  ["overflow-y-visible", ".overflow-y-visible{overflow-y:visible;}"],
  ["overflow-x-scroll", ".overflow-x-scroll{overflow-x:scroll;}"],
  ["overflow-y-scroll", ".overflow-y-scroll{overflow-y:scroll;}"],
  ["overscroll-auto", ".overscroll-auto{overscroll-behavior:auto;}"],
  ["overscroll-contain", ".overscroll-contain{overscroll-behavior:contain;}"],
  ["overscroll-none", ".overscroll-none{overscroll-behavior:none;}"],
  ["overscroll-y-auto", ".overscroll-y-auto{overscroll-behavior-y:auto;}"],
  [
    "overscroll-y-contain",
    ".overscroll-y-contain{overscroll-behavior-y:contain;}",
  ],
  ["overscroll-y-none", ".overscroll-y-none{overscroll-behavior-y:none;}"],
  ["overscroll-x-auto", ".overscroll-x-auto{overscroll-behavior-x:auto;}"],
  [
    "overscroll-x-contain",
    ".overscroll-x-contain{overscroll-behavior-x:contain;}",
  ],
  ["overscroll-x-none", ".overscroll-x-none{overscroll-behavior-x:none;}"],
  ["static", ".static{position:static;}"],
  ["fixed", ".fixed{position:fixed;}"],
  ["absolute", ".absolute{position:absolute;}"],
  ["relative", ".relative{position:relative;}"],
  ["sticky", ".sticky{position:sticky;}"],
  ["inset-0", ".inset-0{top:0px;right:0px;bottom:0px;left:0px;}"],
  ["left-full", ".left-full{left:100%;}"],
  ["visible", ".visible{visibility:visible;}"],
  ["invisible", ".invisible{visibility:hidden;}"],
  ["z-0", ".z-0{z-index:0;}"],
  ["z-10", ".z-10{z-index:10;}"],
  ["z-20", ".z-20{z-index:20;}"],
  ["z-30", ".z-30{z-index:30;}"],
  ["z-40", ".z-40{z-index:40;}"],
  ["z-50", ".z-50{z-index:50;}"],
  ["z-auto", ".z-auto{z-index:auto;}"],
  ["flex-1", ".flex-1{flex:1 1 0%;}"],
  ["flex-auto", ".flex-auto{flex:1 1 auto;}"],
  ["flex-initial", ".flex-initial{flex:0 1 auto;}"],
  ["flex-none", ".flex-none{flex:none;}"],
  ["content-center", ".content-center{align-content:center;}"],
  ["content-start", ".content-start{align-content:flex-start;}"],
  ["content-end", ".content-end{align-content:flex-end;}"],
  ["content-between", ".content-between{align-content:space-between;}"],
  ["content-around", ".content-around{align-content:space-around;}"],
  ["content-evenly", ".content-evenly{align-content:space-evenly;}"],
  ["m-0", ".m-0{margin:0px;}"],
  ["ml-auto", ".ml-auto{margin-left:auto;}"],
  ["w-0.5", ".w-0\\.5{width:0.125rem;}"],
  ["w-1.5", ".w-1\\.5{width:0.375rem;}"],
  ["w-2.5", ".w-2\\.5{width:0.625rem;}"],
  ["w-3.5", ".w-3\\.5{width:0.875rem;}"],
  ["w-0", ".w-0{width:0px;}"],
  ["w-px", ".w-px{width:1px;}"],
  ["w-1", ".w-1{width:0.25rem;}"],
  ["w-2", ".w-2{width:0.5rem;}"],
  ["w-3", ".w-3{width:0.75rem;}"],
  ["w-4", ".w-4{width:1rem;}"],
  ["w-5", ".w-5{width:1.25rem;}"],
  ["w-6", ".w-6{width:1.5rem;}"],
  ["w-7", ".w-7{width:1.75rem;}"],
  ["w-8", ".w-8{width:2rem;}"],
  ["w-9", ".w-9{width:2.25rem;}"],
  ["w-10", ".w-10{width:2.5rem;}"],
  ["w-11", ".w-11{width:2.75rem;}"],
  ["w-12", ".w-12{width:3rem;}"],
  ["w-14", ".w-14{width:3.5rem;}"],
  ["w-16", ".w-16{width:4rem;}"],
  ["w-20", ".w-20{width:5rem;}"],
  ["w-24", ".w-24{width:6rem;}"],
  ["w-28", ".w-28{width:7rem;}"],
  ["w-32", ".w-32{width:8rem;}"],
  ["w-36", ".w-36{width:9rem;}"],
  ["w-40", ".w-40{width:10rem;}"],
  ["w-44", ".w-44{width:11rem;}"],
  ["w-48", ".w-48{width:12rem;}"],
  ["w-52", ".w-52{width:13rem;}"],
  ["w-56", ".w-56{width:14rem;}"],
  ["w-60", ".w-60{width:15rem;}"],
  ["w-64", ".w-64{width:16rem;}"],
  ["w-72", ".w-72{width:18rem;}"],
  ["w-80", ".w-80{width:20rem;}"],
  ["w-96", ".w-96{width:24rem;}"],
  ["w-auto", ".w-auto{width:auto;}"],
  ["w-full", ".w-full{width:100%;}"],
  ["w-screen", ".w-screen{width:100vw;}"],
  ["w-min", ".w-min{width:min-content;}"],
  ["w-max", ".w-max{width:max-content;}"],
  ["w-fit", ".w-fit{width:fit-content;}"],
  ["w-1/2", ".w-1\\/2{width:50%;}"],
  ["w-1/3", ".w-1\\/3{width:33.33333333333333%;}"],
  ["w-2/3", ".w-2\\/3{width:66.66666666666666%;}"],
  ["w-1/4", ".w-1\\/4{width:25%;}"],
  ["w-2/4", ".w-2\\/4{width:50%;}"],
  ["w-3/4", ".w-3\\/4{width:75%;}"],
  ["w-1/5", ".w-1\\/5{width:20%;}"],
  ["w-2/5", ".w-2\\/5{width:40%;}"],
  ["w-3/5", ".w-3\\/5{width:60%;}"],
  ["w-4/5", ".w-4\\/5{width:80%;}"],
  ["w-1/6", ".w-1\\/6{width:16.666666666666664%;}"],
  ["w-2/6", ".w-2\\/6{width:33.33333333333333%;}"],
  ["w-3/6", ".w-3\\/6{width:50%;}"],
  ["w-4/6", ".w-4\\/6{width:66.66666666666666%;}"],
  ["w-5/6", ".w-5\\/6{width:83.33333333333334%;}"],
  ["w-1/12", ".w-1\\/12{width:8.333333333333332%;}"],
  ["w-2/12", ".w-2\\/12{width:16.666666666666664%;}"],
  ["w-3/12", ".w-3\\/12{width:25%;}"],
  ["w-4/12", ".w-4\\/12{width:33.33333333333333%;}"],
  ["w-5/12", ".w-5\\/12{width:41.66666666666667%;}"],
  ["w-6/12", ".w-6\\/12{width:50%;}"],
  ["w-7/12", ".w-7\\/12{width:58.333333333333336%;}"],
  ["w-8/12", ".w-8\\/12{width:66.66666666666666%;}"],
  ["w-9/12", ".w-9\\/12{width:75%;}"],
  ["w-10/12", ".w-10\\/12{width:83.33333333333334%;}"],
  ["w-11/12", ".w-11\\/12{width:91.66666666666666%;}"],
  ["min-w-0", ".min-w-0{min-width:0px;}"],
  ["min-w-full", ".min-w-full{min-width:100%;}"],
  ["min-w-min", ".min-w-min{min-width:min-content;}"],
  ["min-w-max", ".min-w-max{min-width:max-content;}"],
  ["min-w-fit", ".min-w-fit{min-width:fit-content;}"],
  ["max-w-0", ".max-w-0{max-width:0rem;}"],
  ["max-w-none", ".max-w-none{max-width:none;}"],
  ["max-w-xs", ".max-w-xs{max-width:20rem;}"],
  ["max-w-sm", ".max-w-sm{max-width:24rem;}"],
  ["max-w-md", ".max-w-md{max-width:28rem;}"],
  ["max-w-lg", ".max-w-lg{max-width:32rem;}"],
  ["max-w-xl", ".max-w-xl{max-width:36rem;}"],
  ["max-w-2xl", ".max-w-2xl{max-width:42rem;}"],
  ["max-w-3xl", ".max-w-3xl{max-width:48rem;}"],
  ["max-w-4xl", ".max-w-4xl{max-width:56rem;}"],
  ["max-w-5xl", ".max-w-5xl{max-width:64rem;}"],
  ["max-w-6xl", ".max-w-6xl{max-width:72rem;}"],
  ["max-w-7xl", ".max-w-7xl{max-width:80rem;}"],
  ["max-w-full", ".max-w-full{max-width:100%;}"],
  ["max-w-min", ".max-w-min{max-width:min-content;}"],
  ["max-w-max", ".max-w-max{max-width:max-content;}"],
  ["max-w-fit", ".max-w-fit{max-width:fit-content;}"],
  ["max-w-prose", ".max-w-prose{max-width:65ch;}"],
  ["max-w-screen-sm", ".max-w-screen-sm{max-width:640px;}"],
  ["max-w-screen-md", ".max-w-screen-md{max-width:768px;}"],
  ["max-w-screen-lg", ".max-w-screen-lg{max-width:1024px;}"],
  ["max-w-screen-xl", ".max-w-screen-xl{max-width:1280px;}"],
  ["max-w-screen-2xl", ".max-w-screen-2xl{max-width:1536px;}"],
  ["h-5/6", ".h-5\\/6{height:83.33333333333334%;}"],
  ["h-full", ".h-full{height:100%;}"],
  ["h-screen", ".h-screen{height:100vh;}"],
  ["h-min", ".h-min{height:min-content;}"],
  ["h-max", ".h-max{height:max-content;}"],
  ["h-fit", ".h-fit{height:fit-content;}"],
  ["max-h-0.5", ".max-h-0\\.5{max-height:0.125rem;}"],
  ["max-h-1.5", ".max-h-1\\.5{max-height:0.375rem;}"],
  ["max-h-2.5", ".max-h-2\\.5{max-height:0.625rem;}"],
  ["max-h-3.5", ".max-h-3\\.5{max-height:0.875rem;}"],
  ["max-h-0", ".max-h-0{max-height:0px;}"],
  ["max-h-px", ".max-h-px{max-height:1px;}"],
  ["max-h-1", ".max-h-1{max-height:0.25rem;}"],
  ["max-h-2", ".max-h-2{max-height:0.5rem;}"],
  ["max-h-3", ".max-h-3{max-height:0.75rem;}"],
  ["max-h-4", ".max-h-4{max-height:1rem;}"],
  ["max-h-5", ".max-h-5{max-height:1.25rem;}"],
  ["max-h-6", ".max-h-6{max-height:1.5rem;}"],
  ["max-h-7", ".max-h-7{max-height:1.75rem;}"],
  ["max-h-8", ".max-h-8{max-height:2rem;}"],
  ["max-h-9", ".max-h-9{max-height:2.25rem;}"],
  ["max-h-10", ".max-h-10{max-height:2.5rem;}"],
  ["max-h-11", ".max-h-11{max-height:2.75rem;}"],
  ["max-h-12", ".max-h-12{max-height:3rem;}"],
  ["max-h-14", ".max-h-14{max-height:3.5rem;}"],
  ["max-h-16", ".max-h-16{max-height:4rem;}"],
  ["max-h-20", ".max-h-20{max-height:5rem;}"],
  ["max-h-24", ".max-h-24{max-height:6rem;}"],
  ["max-h-28", ".max-h-28{max-height:7rem;}"],
  ["max-h-32", ".max-h-32{max-height:8rem;}"],
  ["max-h-36", ".max-h-36{max-height:9rem;}"],
  ["max-h-40", ".max-h-40{max-height:10rem;}"],
  ["max-h-44", ".max-h-44{max-height:11rem;}"],
  ["max-h-48", ".max-h-48{max-height:12rem;}"],
  ["max-h-52", ".max-h-52{max-height:13rem;}"],
  ["max-h-56", ".max-h-56{max-height:14rem;}"],
  ["max-h-60", ".max-h-60{max-height:15rem;}"],
  ["max-h-64", ".max-h-64{max-height:16rem;}"],
  ["max-h-72", ".max-h-72{max-height:18rem;}"],
  ["max-h-80", ".max-h-80{max-height:20rem;}"],
  ["max-h-96", ".max-h-96{max-height:24rem;}"],
  ["max-h-full", ".max-h-full{max-height:100%;}"],
  ["max-h-screen", ".max-h-screen{max-height:100vh;}"],
  ["max-h-min", ".max-h-min{max-height:min-content;}"],
  ["max-h-max", ".max-h-max{max-height:max-content;}"],
  ["max-h-fit", ".max-h-fit{max-height:fit-content;}"],
  ["text-xs", ".text-xs{font-size:0.75rem;line-height:1rem;}"],
  ["text-sm", ".text-sm{font-size:0.875rem;line-height:1.25rem;}"],
  ["text-base", ".text-base{font-size:1rem;line-height:1.5rem;}"],
  ["text-lg", ".text-lg{font-size:1.125rem;line-height:1.75rem;}"],
  ["text-xl", ".text-xl{font-size:1.25rem;line-height:1.75rem;}"],
  ["text-2xl", ".text-2xl{font-size:1.5rem;line-height:2rem;}"],
  ["text-3xl", ".text-3xl{font-size:1.875rem;line-height:2.25rem;}"],
  ["text-4xl", ".text-4xl{font-size:2.25rem;line-height:2.5rem;}"],
  ["text-5xl", ".text-5xl{font-size:3rem;line-height:1;}"],
  ["text-6xl", ".text-6xl{font-size:3.75rem;line-height:1;}"],
  ["text-7xl", ".text-7xl{font-size:4.5rem;line-height:1;}"],
  ["text-8xl", ".text-8xl{font-size:6rem;line-height:1;}"],
  ["text-9xl", ".text-9xl{font-size:8rem;line-height:1;}"],
  [
    "antialiased",
    ".antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}",
  ],
  [
    "subpixel-antialiased",
    ".subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;}",
  ],
  ["italic", ".italic{font-style:italic;}"],
  ["not-italic", ".not-italic{font-style:normal;}"],
  ["font-thin", ".font-thin{font-weight:100;}"],
  ["font-extralight", ".font-extralight{font-weight:200;}"],
  ["font-light", ".font-light{font-weight:300;}"],
  ["font-normal", ".font-normal{font-weight:400;}"],
  ["font-medium", ".font-medium{font-weight:500;}"],
  ["font-semibold", ".font-semibold{font-weight:600;}"],
  ["font-bold", ".font-bold{font-weight:700;}"],
  ["font-extrabold", ".font-extrabold{font-weight:800;}"],
  ["font-black", ".font-black{font-weight:900;}"],
  ["tracking-tighter", ".tracking-tighter{letter-spacing:-0.05em;}"],
  ["tracking-tight", ".tracking-tight{letter-spacing:-0.025em;}"],
  ["tracking-normal", ".tracking-normal{letter-spacing:0em;}"],
  ["tracking-wide", ".tracking-wide{letter-spacing:0.025em;}"],
  ["tracking-wider", ".tracking-wider{letter-spacing:0.05em;}"],
  ["tracking-widest", ".tracking-widest{letter-spacing:0.1em;}"],
  ["leading-3", ".leading-3{line-height:.75rem;}"],
  ["leading-4", ".leading-4{line-height:1rem;}"],
  ["leading-5", ".leading-5{line-height:1.25rem;}"],
  ["leading-6", ".leading-6{line-height:1.5rem;}"],
  ["leading-7", ".leading-7{line-height:1.75rem;}"],
  ["leading-8", ".leading-8{line-height:2rem;}"],
  ["leading-9", ".leading-9{line-height:2.25rem;}"],
  ["leading-10", ".leading-10{line-height:2.5rem;}"],
  ["leading-none", ".leading-none{line-height:1;}"],
  ["leading-tight", ".leading-tight{line-height:1.25;}"],
  ["leading-snug", ".leading-snug{line-height:1.375;}"],
  ["leading-normal", ".leading-normal{line-height:1.5;}"],
  ["leading-relaxed", ".leading-relaxed{line-height:1.625;}"],
  ["leading-loose", ".leading-loose{line-height:2;}"],
  ["text-left", ".text-left{text-align:left;}"],
  ["text-center", ".text-center{text-align:center;}"],
  ["text-right", ".text-right{text-align:right;}"],
  ["text-justify", ".text-justify{text-align:justify;}"],
  ["underline", ".underline{text-decoration-line:underline;}"],
  ["overline", ".overline{text-decoration-line:overline;}"],
  ["line-through", ".line-through{text-decoration-line:line-through;}"],
  ["no-underline", ".no-underline{text-decoration-line:none;}"],
  ["align-baseline", ".align-baseline{vertical-align:baseline;}"],
  ["align-top", ".align-top{vertical-align:top;}"],
  ["align-middle", ".align-middle{vertical-align:middle;}"],
  ["align-bottom", ".align-bottom{vertical-align:bottom;}"],
  ["align-text-top", ".align-text-top{vertical-align:text-top;}"],
  ["align-text-bottom", ".align-text-bottom{vertical-align:text-bottom;}"],
  ["align-sub", ".align-sub{vertical-align:sub;}"],
  ["align-super", ".align-super{vertical-align:super;}"],
  ["whitespace-normal", ".whitespace-normal{white-space:normal;}"],
  ["whitespace-nowrap", ".whitespace-nowrap{white-space:nowrap;}"],
  ["whitespace-pre", ".whitespace-pre{white-space:pre;}"],
  ["whitespace-pre-line", ".whitespace-pre-line{white-space:pre-line;}"],
  ["whitespace-pre-wrap", ".whitespace-pre-wrap{white-space:pre-wrap;}"],
  ["break-normal", ".break-normal{word-break:normal;overflow-wrap:normal;}"],
  ["break-words", ".break-words{overflow-wrap:break-word;}"],
  ["break-all", ".break-all{word-break:break-all;}"],
  ["content-none", ".content-none{content:none;}"],

  ["rounded", ".rounded{border-radius:0.25rem;}"],
  ["rounded-none", ".rounded-none{border-radius:0px;}"],
  ["rounded-sm", ".rounded-sm{border-radius:0.125rem;}"],
  ["rounded-md", ".rounded-md{border-radius:0.375rem;}"],
  ["rounded-lg", ".rounded-lg{border-radius:0.5rem;}"],
  ["rounded-xl", ".rounded-xl{border-radius:0.75rem;}"],
  ["rounded-2xl", ".rounded-2xl{border-radius:1rem;}"],
  ["rounded-3xl", ".rounded-3xl{border-radius:1.5rem;}"],
  ["rounded-full", ".rounded-full{border-radius:9999px;}"],
  [
    "rounded-t",
    ".rounded-t{border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;}",
  ],
  [
    "rounded-r",
    ".rounded-r{border-top-right-radius:0.25rem;border-bottom-right-radius:0.25rem;}",
  ],
  [
    "rounded-b",
    ".rounded-b{border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem;}",
  ],
  [
    "rounded-l",
    ".rounded-l{border-top-left-radius:0.25rem;border-bottom-left-radius:0.25rem;}",
  ],
  ["rounded-tr", ".rounded-tr{border-top-right-radius:0.25rem;}"],
  ["rounded-br", ".rounded-br{border-bottom-right-radius:0.25rem;}"],
  ["rounded-bl", ".rounded-bl{border-bottom-left-radius:0.25rem;}"],
  ["rounded-tl", ".rounded-tl{border-top-left-radius:0.25rem;}"],
  [
    "rounded-t-none",
    ".rounded-t-none{border-top-left-radius:0px;border-top-right-radius:0px;}",
  ],
  [
    "rounded-t-sm",
    ".rounded-t-sm{border-top-left-radius:0.125rem;border-top-right-radius:0.125rem;}",
  ],
  [
    "rounded-t-md",
    ".rounded-t-md{border-top-left-radius:0.375rem;border-top-right-radius:0.375rem;}",
  ],
  [
    "rounded-t-lg",
    ".rounded-t-lg{border-top-left-radius:0.5rem;border-top-right-radius:0.5rem;}",
  ],
  [
    "rounded-t-xl",
    ".rounded-t-xl{border-top-left-radius:0.75rem;border-top-right-radius:0.75rem;}",
  ],
  [
    "rounded-t-2xl",
    ".rounded-t-2xl{border-top-left-radius:1rem;border-top-right-radius:1rem;}",
  ],
  [
    "rounded-t-3xl",
    ".rounded-t-3xl{border-top-left-radius:1.5rem;border-top-right-radius:1.5rem;}",
  ],
  [
    "rounded-t-full",
    ".rounded-t-full{border-top-left-radius:9999px;border-top-right-radius:9999px;}",
  ],
  [
    "rounded-r-none",
    ".rounded-r-none{border-top-right-radius:0px;border-bottom-right-radius:0px;}",
  ],
  [
    "rounded-r-sm",
    ".rounded-r-sm{border-top-right-radius:0.125rem;border-bottom-right-radius:0.125rem;}",
  ],
  [
    "rounded-r-md",
    ".rounded-r-md{border-top-right-radius:0.375rem;border-bottom-right-radius:0.375rem;}",
  ],
  [
    "rounded-r-lg",
    ".rounded-r-lg{border-top-right-radius:0.5rem;border-bottom-right-radius:0.5rem;}",
  ],
  [
    "rounded-r-xl",
    ".rounded-r-xl{border-top-right-radius:0.75rem;border-bottom-right-radius:0.75rem;}",
  ],
  [
    "rounded-r-2xl",
    ".rounded-r-2xl{border-top-right-radius:1rem;border-bottom-right-radius:1rem;}",
  ],
  [
    "rounded-r-3xl",
    ".rounded-r-3xl{border-top-right-radius:1.5rem;border-bottom-right-radius:1.5rem;}",
  ],
  [
    "rounded-r-full",
    ".rounded-r-full{border-top-right-radius:9999px;border-bottom-right-radius:9999px;}",
  ],
  [
    "rounded-b-none",
    ".rounded-b-none{border-bottom-right-radius:0px;border-bottom-left-radius:0px;}",
  ],
  [
    "rounded-b-sm",
    ".rounded-b-sm{border-bottom-right-radius:0.125rem;border-bottom-left-radius:0.125rem;}",
  ],
  [
    "rounded-b-md",
    ".rounded-b-md{border-bottom-right-radius:0.375rem;border-bottom-left-radius:0.375rem;}",
  ],
  [
    "rounded-b-lg",
    ".rounded-b-lg{border-bottom-right-radius:0.5rem;border-bottom-left-radius:0.5rem;}",
  ],
  [
    "rounded-b-xl",
    ".rounded-b-xl{border-bottom-right-radius:0.75rem;border-bottom-left-radius:0.75rem;}",
  ],
  [
    "rounded-b-2xl",
    ".rounded-b-2xl{border-bottom-right-radius:1rem;border-bottom-left-radius:1rem;}",
  ],
  [
    "rounded-b-3xl",
    ".rounded-b-3xl{border-bottom-right-radius:1.5rem;border-bottom-left-radius:1.5rem;}",
  ],
  [
    "rounded-b-full",
    ".rounded-b-full{border-bottom-right-radius:9999px;border-bottom-left-radius:9999px;}",
  ],
  [
    "rounded-l-none",
    ".rounded-l-none{border-top-left-radius:0px;border-bottom-left-radius:0px;}",
  ],
  [
    "rounded-l-sm",
    ".rounded-l-sm{border-top-left-radius:0.125rem;border-bottom-left-radius:0.125rem;}",
  ],
  [
    "rounded-l-md",
    ".rounded-l-md{border-top-left-radius:0.375rem;border-bottom-left-radius:0.375rem;}",
  ],
  [
    "rounded-l-lg",
    ".rounded-l-lg{border-top-left-radius:0.5rem;border-bottom-left-radius:0.5rem;}",
  ],
  [
    "rounded-l-xl",
    ".rounded-l-xl{border-top-left-radius:0.75rem;border-bottom-left-radius:0.75rem;}",
  ],
  [
    "rounded-l-2xl",
    ".rounded-l-2xl{border-top-left-radius:1rem;border-bottom-left-radius:1rem;}",
  ],
  [
    "rounded-l-3xl",
    ".rounded-l-3xl{border-top-left-radius:1.5rem;border-bottom-left-radius:1.5rem;}",
  ],
  [
    "rounded-l-full",
    ".rounded-l-full{border-top-left-radius:9999px;border-bottom-left-radius:9999px;}",
  ],
  ["rounded-tl-none", ".rounded-tl-none{border-top-left-radius:0px;}"],
  ["rounded-tl-sm", ".rounded-tl-sm{border-top-left-radius:0.125rem;}"],
  ["rounded-tl-md", ".rounded-tl-md{border-top-left-radius:0.375rem;}"],
  ["rounded-tl-lg", ".rounded-tl-lg{border-top-left-radius:0.5rem;}"],
  ["rounded-tl-xl", ".rounded-tl-xl{border-top-left-radius:0.75rem;}"],
  ["rounded-tl-2xl", ".rounded-tl-2xl{border-top-left-radius:1rem;}"],
  ["rounded-tl-3xl", ".rounded-tl-3xl{border-top-left-radius:1.5rem;}"],
  ["rounded-tl-full", ".rounded-tl-full{border-top-left-radius:9999px;}"],
  ["rounded-tr-none", ".rounded-tr-none{border-top-right-radius:0px;}"],
  ["rounded-tr-sm", ".rounded-tr-sm{border-top-right-radius:0.125rem;}"],
  ["rounded-tr-md", ".rounded-tr-md{border-top-right-radius:0.375rem;}"],
  ["rounded-tr-lg", ".rounded-tr-lg{border-top-right-radius:0.5rem;}"],
  ["rounded-tr-xl", ".rounded-tr-xl{border-top-right-radius:0.75rem;}"],
  ["rounded-tr-2xl", ".rounded-tr-2xl{border-top-right-radius:1rem;}"],
  ["rounded-tr-3xl", ".rounded-tr-3xl{border-top-right-radius:1.5rem;}"],
  ["rounded-tr-full", ".rounded-tr-full{border-top-right-radius:9999px;}"],
  ["rounded-br-none", ".rounded-br-none{border-bottom-right-radius:0px;}"],
  ["rounded-br-sm", ".rounded-br-sm{border-bottom-right-radius:0.125rem;}"],
  ["rounded-br-md", ".rounded-br-md{border-bottom-right-radius:0.375rem;}"],
  ["rounded-br-lg", ".rounded-br-lg{border-bottom-right-radius:0.5rem;}"],
  ["rounded-br-xl", ".rounded-br-xl{border-bottom-right-radius:0.75rem;}"],
  ["rounded-br-2xl", ".rounded-br-2xl{border-bottom-right-radius:1rem;}"],
  ["rounded-br-3xl", ".rounded-br-3xl{border-bottom-right-radius:1.5rem;}"],
  ["rounded-br-full", ".rounded-br-full{border-bottom-right-radius:9999px;}"],
  ["rounded-bl-none", ".rounded-bl-none{border-bottom-left-radius:0px;}"],
  ["rounded-bl-sm", ".rounded-bl-sm{border-bottom-left-radius:0.125rem;}"],
  ["rounded-bl-md", ".rounded-bl-md{border-bottom-left-radius:0.375rem;}"],
  ["rounded-bl-lg", ".rounded-bl-lg{border-bottom-left-radius:0.5rem;}"],
  ["rounded-bl-xl", ".rounded-bl-xl{border-bottom-left-radius:0.75rem;}"],
  ["rounded-bl-2xl", ".rounded-bl-2xl{border-bottom-left-radius:1rem;}"],
  ["rounded-bl-3xl", ".rounded-bl-3xl{border-bottom-left-radius:1.5rem;}"],
  ["rounded-bl-full", ".rounded-bl-full{border-bottom-left-radius:9999px;}"],
  ["border", ".border{border-width:1px;}"],
  ["border-0", ".border-0{border-width:0px;}"],
  ["border-2", ".border-2{border-width:2px;}"],
  ["border-4", ".border-4{border-width:4px;}"],
  ["border-8", ".border-8{border-width:8px;}"],
  ["border-x", ".border-x{border-left-width:1px;border-right-width:1px;}"],
  ["border-y", ".border-y{border-top-width:1px;border-bottom-width:1px;}"],
  ["border-t", ".border-t{border-top-width:1px;}"],
  ["border-r", ".border-r{border-right-width:1px;}"],
  ["border-b", ".border-b{border-bottom-width:1px;}"],
  ["border-l", ".border-l{border-left-width:1px;}"],
  ["border-x-0", ".border-x-0{border-left-width:0px;border-right-width:0px;}"],
  ["border-x-2", ".border-x-2{border-left-width:2px;border-right-width:2px;}"],
  ["border-x-4", ".border-x-4{border-left-width:4px;border-right-width:4px;}"],
  ["border-x-8", ".border-x-8{border-left-width:8px;border-right-width:8px;}"],
  ["border-y-0", ".border-y-0{border-top-width:0px;border-bottom-width:0px;}"],
  ["border-y-2", ".border-y-2{border-top-width:2px;border-bottom-width:2px;}"],
  ["border-y-4", ".border-y-4{border-top-width:4px;border-bottom-width:4px;}"],
  ["border-y-8", ".border-y-8{border-top-width:8px;border-bottom-width:8px;}"],
  ["border-t-0", ".border-t-0{border-top-width:0px;}"],
  ["border-t-2", ".border-t-2{border-top-width:2px;}"],
  ["border-t-4", ".border-t-4{border-top-width:4px;}"],
  ["border-t-8", ".border-t-8{border-top-width:8px;}"],
  ["border-r-0", ".border-r-0{border-right-width:0px;}"],
  ["border-r-2", ".border-r-2{border-right-width:2px;}"],
  ["border-r-4", ".border-r-4{border-right-width:4px;}"],
  ["border-r-8", ".border-r-8{border-right-width:8px;}"],
  ["border-b-0", ".border-b-0{border-bottom-width:0px;}"],
  ["border-b-2", ".border-b-2{border-bottom-width:2px;}"],
  ["border-b-4", ".border-b-4{border-bottom-width:4px;}"],
  ["border-b-8", ".border-b-8{border-bottom-width:8px;}"],
  ["border-l-0", ".border-l-0{border-left-width:0px;}"],
  ["border-l-2", ".border-l-2{border-left-width:2px;}"],
  ["border-l-4", ".border-l-4{border-left-width:4px;}"],
  ["border-l-8", ".border-l-8{border-left-width:8px;}"],
  ["border-solid", ".border-solid{border-style:solid;}"],
  ["border-dashed", ".border-dashed{border-style:dashed;}"],
  ["border-dotted", ".border-dotted{border-style:dotted;}"],
  ["border-double", ".border-double{border-style:double;}"],
  ["border-hidden", ".border-hidden{border-style:hidden;}"],
  ["border-none", ".border-none{border-style:none;}"],
  ["outline-0", ".outline-0{outline-width:0px;}"],
  ["outline-1", ".outline-1{outline-width:1px;}"],
  ["outline-2", ".outline-2{outline-width:2px;}"],
  ["outline-4", ".outline-4{outline-width:4px;}"],
  ["outline-8", ".outline-8{outline-width:8px;}"],
  ["outline", ".outline{outline-style:solid;}"],
  [
    "outline-none",
    ".outline-none{outline:2px solid transparent;outline-offset:2px;}",
  ],
  ["outline-dashed", ".outline-dashed{outline-style:dashed;}"],
  ["outline-dotted", ".outline-dotted{outline-style:dotted;}"],
  ["outline-double", ".outline-double{outline-style:double;}"],
  ["outline-hidden", ".outline-hidden{outline-style:hidden;}"],
  ["outline-offset-0", ".outline-offset-0{outline-offset:0px;}"],
  ["outline-offset-1", ".outline-offset-1{outline-offset:1px;}"],
  ["outline-offset-2", ".outline-offset-2{outline-offset:2px;}"],
  ["outline-offset-4", ".outline-offset-4{outline-offset:4px;}"],
  ["outline-offset-8", ".outline-offset-8{outline-offset:8px;}"],
  ["border-collapse", ".border-collapse{border-collapse:collapse;}"],
  ["border-separate", ".border-separate{border-collapse:separate;}"],
];

const config = { presets: [presetTw()] };

test("presetTw", () => {
  expects.forEach(([className, result]) => {
    expect(generate(config, new Set([className])).css).toBe(
      result,
    );
  });
});