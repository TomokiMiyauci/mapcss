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
  ["top-0", ".top-0{top:0px;}"],
  ["right-0", ".right-0{right:0px;}"],
  ["bottom-0", ".bottom-0{bottom:0px;}"],
  ["left-0", ".left-0{left:0px;}"],
  ["top-px", ".top-px{top:1px;}"],
  ["right-px", ".right-px{right:1px;}"],
  ["bottom-px", ".bottom-px{bottom:1px;}"],
  ["left-px", ".left-px{left:1px;}"],
  ["top-1", ".top-1{top:0.25rem;}"],
  ["right-1", ".right-1{right:0.25rem;}"],
  ["bottom-1", ".bottom-1{bottom:0.25rem;}"],
  ["left-1", ".left-1{left:0.25rem;}"],
  ["left-2", ".left-2{left:0.5rem;}"],
  ["top-2", ".top-2{top:0.5rem;}"],
  ["right-2", ".right-2{right:0.5rem;}"],
  ["bottom-2", ".bottom-2{bottom:0.5rem;}"],
  ["right-3", ".right-3{right:0.75rem;}"],
  ["bottom-3", ".bottom-3{bottom:0.75rem;}"],
  ["top-3", ".top-3{top:0.75rem;}"],
  ["top-4", ".top-4{top:1rem;}"],
  ["right-4", ".right-4{right:1rem;}"],
  ["bottom-4", ".bottom-4{bottom:1rem;}"],
  ["left-3", ".left-3{left:0.75rem;}"],
  ["left-4", ".left-4{left:1rem;}"],
  ["left-5", ".left-5{left:1.25rem;}"],
  ["left-6", ".left-6{left:1.5rem;}"],
  ["left-7", ".left-7{left:1.75rem;}"],
  ["left-8", ".left-8{left:2rem;}"],
  ["left-9", ".left-9{left:2.25rem;}"],
  ["left-10", ".left-10{left:2.5rem;}"],
  ["left-11", ".left-11{left:2.75rem;}"],
  ["left-12", ".left-12{left:3rem;}"],
  ["left-14", ".left-14{left:3.5rem;}"],
  ["top-5", ".top-5{top:1.25rem;}"],
  ["top-6", ".top-6{top:1.5rem;}"],
  ["top-7", ".top-7{top:1.75rem;}"],
  ["top-8", ".top-8{top:2rem;}"],
  ["top-9", ".top-9{top:2.25rem;}"],
  ["top-10", ".top-10{top:2.5rem;}"],
  ["top-11", ".top-11{top:2.75rem;}"],
  ["top-12", ".top-12{top:3rem;}"],
  ["top-14", ".top-14{top:3.5rem;}"],
  ["right-5", ".right-5{right:1.25rem;}"],
  ["right-6", ".right-6{right:1.5rem;}"],
  ["right-7", ".right-7{right:1.75rem;}"],
  ["right-8", ".right-8{right:2rem;}"],
  ["right-9", ".right-9{right:2.25rem;}"],
  ["right-10", ".right-10{right:2.5rem;}"],
  ["right-11", ".right-11{right:2.75rem;}"],
  ["right-12", ".right-12{right:3rem;}"],
  ["right-14", ".right-14{right:3.5rem;}"],
  ["bottom-5", ".bottom-5{bottom:1.25rem;}"],
  ["bottom-6", ".bottom-6{bottom:1.5rem;}"],
  ["bottom-7", ".bottom-7{bottom:1.75rem;}"],
  ["bottom-8", ".bottom-8{bottom:2rem;}"],
  ["bottom-9", ".bottom-9{bottom:2.25rem;}"],
  ["bottom-10", ".bottom-10{bottom:2.5rem;}"],
  ["bottom-11", ".bottom-11{bottom:2.75rem;}"],
  ["bottom-12", ".bottom-12{bottom:3rem;}"],
  ["bottom-14", ".bottom-14{bottom:3.5rem;}"],
  ["top-16", ".top-16{top:4rem;}"],
  ["right-16", ".right-16{right:4rem;}"],
  ["bottom-16", ".bottom-16{bottom:4rem;}"],
  ["left-16", ".left-16{left:4rem;}"],
  ["top-20", ".top-20{top:5rem;}"],
  ["right-20", ".right-20{right:5rem;}"],
  ["bottom-20", ".bottom-20{bottom:5rem;}"],
  ["left-20", ".left-20{left:5rem;}"],
  ["top-24", ".top-24{top:6rem;}"],
  ["right-24", ".right-24{right:6rem;}"],
  ["bottom-24", ".bottom-24{bottom:6rem;}"],
  ["left-24", ".left-24{left:6rem;}"],
  ["top-28", ".top-28{top:7rem;}"],
  ["right-28", ".right-28{right:7rem;}"],
  ["bottom-28", ".bottom-28{bottom:7rem;}"],
  ["left-28", ".left-28{left:7rem;}"],
  ["top-32", ".top-32{top:8rem;}"],
  ["right-32", ".right-32{right:8rem;}"],
  ["bottom-32", ".bottom-32{bottom:8rem;}"],
  ["left-32", ".left-32{left:8rem;}"],
  ["top-36", ".top-36{top:9rem;}"],
  ["right-36", ".right-36{right:9rem;}"],
  ["bottom-36", ".bottom-36{bottom:9rem;}"],
  ["left-36", ".left-36{left:9rem;}"],
  ["top-40", ".top-40{top:10rem;}"],
  ["right-40", ".right-40{right:10rem;}"],
  ["bottom-40", ".bottom-40{bottom:10rem;}"],
  ["left-40", ".left-40{left:10rem;}"],
  ["top-44", ".top-44{top:11rem;}"],
  ["right-44", ".right-44{right:11rem;}"],
  ["bottom-44", ".bottom-44{bottom:11rem;}"],
  ["left-44", ".left-44{left:11rem;}"],
  ["top-48", ".top-48{top:12rem;}"],
  ["right-48", ".right-48{right:12rem;}"],
  ["bottom-48", ".bottom-48{bottom:12rem;}"],
  ["left-48", ".left-48{left:12rem;}"],
  ["top-52", ".top-52{top:13rem;}"],
  ["right-52", ".right-52{right:13rem;}"],
  ["bottom-52", ".bottom-52{bottom:13rem;}"],
  ["left-52", ".left-52{left:13rem;}"],
  ["top-56", ".top-56{top:14rem;}"],
  ["right-56", ".right-56{right:14rem;}"],
  ["bottom-56", ".bottom-56{bottom:14rem;}"],
  ["left-56", ".left-56{left:14rem;}"],
  ["top-60", ".top-60{top:15rem;}"],
  ["right-60", ".right-60{right:15rem;}"],
  ["bottom-60", ".bottom-60{bottom:15rem;}"],
  ["left-60", ".left-60{left:15rem;}"],
  ["top-64", ".top-64{top:16rem;}"],
  ["right-64", ".right-64{right:16rem;}"],
  ["bottom-64", ".bottom-64{bottom:16rem;}"],
  ["left-64", ".left-64{left:16rem;}"],
  ["top-72", ".top-72{top:18rem;}"],
  ["right-72", ".right-72{right:18rem;}"],
  ["bottom-72", ".bottom-72{bottom:18rem;}"],
  ["left-72", ".left-72{left:18rem;}"],
  ["top-80", ".top-80{top:20rem;}"],
  ["right-80", ".right-80{right:20rem;}"],
  ["bottom-80", ".bottom-80{bottom:20rem;}"],
  ["left-80", ".left-80{left:20rem;}"],
  ["top-96", ".top-96{top:24rem;}"],
  ["right-96", ".right-96{right:24rem;}"],
  ["bottom-96", ".bottom-96{bottom:24rem;}"],
  ["left-96", ".left-96{left:24rem;}"],
  ["top-auto", ".top-auto{top:auto;}"],
  ["top-full", ".top-full{top:100%;}"],
  ["right-auto", ".right-auto{right:auto;}"],
  ["right-full", ".right-full{right:100%;}"],
  ["bottom-auto", ".bottom-auto{bottom:auto;}"],
  ["bottom-full", ".bottom-full{bottom:100%;}"],
  ["left-auto", ".left-auto{left:auto;}"],
  ["left-full", ".left-full{left:100%;}"],
  ["inset-x-0", ".inset-x-0{left:0px;right:0px;}"],
  ["inset-y-0", ".inset-y-0{bottom:0px;top:0px;}"],
  ["inset-x-px", ".inset-x-px{left:1px;right:1px;}"],
  ["inset-y-px", ".inset-y-px{bottom:1px;top:1px;}"],
  ["inset-x-1", ".inset-x-1{left:0.25rem;right:0.25rem;}"],
  ["inset-y-1", ".inset-y-1{bottom:0.25rem;top:0.25rem;}"],
  ["inset-x-2", ".inset-x-2{left:0.5rem;right:0.5rem;}"],
  ["inset-y-2", ".inset-y-2{bottom:0.5rem;top:0.5rem;}"],
  ["inset-x-3", ".inset-x-3{left:0.75rem;right:0.75rem;}"],
  ["inset-y-3", ".inset-y-3{bottom:0.75rem;top:0.75rem;}"],
  ["inset-x-4", ".inset-x-4{left:1rem;right:1rem;}"],
  ["inset-y-4", ".inset-y-4{bottom:1rem;top:1rem;}"],
  ["inset-x-5", ".inset-x-5{left:1.25rem;right:1.25rem;}"],
  ["inset-y-5", ".inset-y-5{bottom:1.25rem;top:1.25rem;}"],
  ["inset-x-6", ".inset-x-6{left:1.5rem;right:1.5rem;}"],
  ["inset-y-6", ".inset-y-6{bottom:1.5rem;top:1.5rem;}"],
  ["inset-x-7", ".inset-x-7{left:1.75rem;right:1.75rem;}"],
  ["inset-y-7", ".inset-y-7{bottom:1.75rem;top:1.75rem;}"],
  ["inset-x-8", ".inset-x-8{left:2rem;right:2rem;}"],
  ["inset-y-8", ".inset-y-8{bottom:2rem;top:2rem;}"],
  ["inset-x-9", ".inset-x-9{left:2.25rem;right:2.25rem;}"],
  ["inset-y-9", ".inset-y-9{bottom:2.25rem;top:2.25rem;}"],
  ["inset-x-10", ".inset-x-10{left:2.5rem;right:2.5rem;}"],
  ["inset-y-10", ".inset-y-10{bottom:2.5rem;top:2.5rem;}"],
  ["inset-x-11", ".inset-x-11{left:2.75rem;right:2.75rem;}"],
  ["inset-y-11", ".inset-y-11{bottom:2.75rem;top:2.75rem;}"],
  ["inset-x-12", ".inset-x-12{left:3rem;right:3rem;}"],
  ["inset-y-12", ".inset-y-12{bottom:3rem;top:3rem;}"],
  ["inset-x-14", ".inset-x-14{left:3.5rem;right:3.5rem;}"],
  ["inset-y-14", ".inset-y-14{bottom:3.5rem;top:3.5rem;}"],
  ["inset-x-16", ".inset-x-16{left:4rem;right:4rem;}"],
  ["inset-y-16", ".inset-y-16{bottom:4rem;top:4rem;}"],
  ["inset-x-20", ".inset-x-20{left:5rem;right:5rem;}"],
  ["inset-y-20", ".inset-y-20{bottom:5rem;top:5rem;}"],
  ["inset-x-24", ".inset-x-24{left:6rem;right:6rem;}"],
  ["inset-y-24", ".inset-y-24{bottom:6rem;top:6rem;}"],
  ["inset-x-28", ".inset-x-28{left:7rem;right:7rem;}"],
  ["inset-y-28", ".inset-y-28{bottom:7rem;top:7rem;}"],
  ["inset-x-32", ".inset-x-32{left:8rem;right:8rem;}"],
  ["inset-y-32", ".inset-y-32{bottom:8rem;top:8rem;}"],
  ["inset-x-36", ".inset-x-36{left:9rem;right:9rem;}"],
  ["inset-y-36", ".inset-y-36{bottom:9rem;top:9rem;}"],
  ["inset-x-40", ".inset-x-40{left:10rem;right:10rem;}"],
  ["inset-y-40", ".inset-y-40{bottom:10rem;top:10rem;}"],
  ["inset-x-44", ".inset-x-44{left:11rem;right:11rem;}"],
  ["inset-y-44", ".inset-y-44{bottom:11rem;top:11rem;}"],
  ["inset-x-48", ".inset-x-48{left:12rem;right:12rem;}"],
  ["inset-y-48", ".inset-y-48{bottom:12rem;top:12rem;}"],
  ["inset-x-52", ".inset-x-52{left:13rem;right:13rem;}"],
  ["inset-y-52", ".inset-y-52{bottom:13rem;top:13rem;}"],
  ["inset-x-56", ".inset-x-56{left:14rem;right:14rem;}"],
  ["inset-y-56", ".inset-y-56{bottom:14rem;top:14rem;}"],
  ["inset-x-60", ".inset-x-60{left:15rem;right:15rem;}"],
  ["inset-y-60", ".inset-y-60{bottom:15rem;top:15rem;}"],
  ["inset-x-64", ".inset-x-64{left:16rem;right:16rem;}"],
  ["inset-y-64", ".inset-y-64{bottom:16rem;top:16rem;}"],
  ["inset-x-72", ".inset-x-72{left:18rem;right:18rem;}"],
  ["inset-y-72", ".inset-y-72{bottom:18rem;top:18rem;}"],
  ["inset-x-80", ".inset-x-80{left:20rem;right:20rem;}"],
  ["inset-y-80", ".inset-y-80{bottom:20rem;top:20rem;}"],
  ["inset-x-96", ".inset-x-96{left:24rem;right:24rem;}"],
  ["inset-y-96", ".inset-y-96{bottom:24rem;top:24rem;}"],
  ["inset-x-auto", ".inset-x-auto{left:auto;right:auto;}"],
  ["inset-x-full", ".inset-x-full{left:100%;right:100%;}"],
  ["inset-y-auto", ".inset-y-auto{bottom:auto;top:auto;}"],
  ["inset-y-full", ".inset-y-full{bottom:100%;top:100%;}"],
  ["inset-x-0.5", ".inset-x-0\\.5{left:0.125rem;right:0.125rem;}"],
  ["inset-y-0.5", ".inset-y-0\\.5{bottom:0.125rem;top:0.125rem;}"],
  ["inset-x-1.5", ".inset-x-1\\.5{left:0.375rem;right:0.375rem;}"],
  ["inset-y-1.5", ".inset-y-1\\.5{bottom:0.375rem;top:0.375rem;}"],
  ["inset-x-2.5", ".inset-x-2\\.5{left:0.625rem;right:0.625rem;}"],
  ["inset-y-2.5", ".inset-y-2\\.5{bottom:0.625rem;top:0.625rem;}"],
  ["inset-x-3.5", ".inset-x-3\\.5{left:0.875rem;right:0.875rem;}"],
  ["inset-y-3.5", ".inset-y-3\\.5{bottom:0.875rem;top:0.875rem;}"],
  ["top-0.5", ".top-0\\.5{top:0.125rem;}"],
  ["right-0.5", ".right-0\\.5{right:0.125rem;}"],
  ["bottom-0.5", ".bottom-0\\.5{bottom:0.125rem;}"],
  ["left-0.5", ".left-0\\.5{left:0.125rem;}"],
  ["top-1.5", ".top-1\\.5{top:0.375rem;}"],
  ["right-1.5", ".right-1\\.5{right:0.375rem;}"],
  ["bottom-1.5", ".bottom-1\\.5{bottom:0.375rem;}"],
  ["left-1.5", ".left-1\\.5{left:0.375rem;}"],
  ["top-2.5", ".top-2\\.5{top:0.625rem;}"],
  ["right-2.5", ".right-2\\.5{right:0.625rem;}"],
  ["bottom-2.5", ".bottom-2\\.5{bottom:0.625rem;}"],
  ["left-2.5", ".left-2\\.5{left:0.625rem;}"],
  ["top-3.5", ".top-3\\.5{top:0.875rem;}"],
  ["right-3.5", ".right-3\\.5{right:0.875rem;}"],
  ["bottom-3.5", ".bottom-3\\.5{bottom:0.875rem;}"],
  ["left-3.5", ".left-3\\.5{left:0.875rem;}"],
  [
    "inset-0.5",
    ".inset-0\\.5{bottom:0.125rem;left:0.125rem;right:0.125rem;top:0.125rem;}",
  ],
  [
    "inset-1.5",
    ".inset-1\\.5{bottom:0.375rem;left:0.375rem;right:0.375rem;top:0.375rem;}",
  ],
  [
    "inset-2.5",
    ".inset-2\\.5{bottom:0.625rem;left:0.625rem;right:0.625rem;top:0.625rem;}",
  ],
  [
    "inset-3.5",
    ".inset-3\\.5{bottom:0.875rem;left:0.875rem;right:0.875rem;top:0.875rem;}",
  ],
  ["inset-0", ".inset-0{bottom:0px;left:0px;right:0px;top:0px;}"],
  ["inset-px", ".inset-px{bottom:1px;left:1px;right:1px;top:1px;}"],
  [
    "inset-1",
    ".inset-1{bottom:0.25rem;left:0.25rem;right:0.25rem;top:0.25rem;}",
  ],
  ["inset-2", ".inset-2{bottom:0.5rem;left:0.5rem;right:0.5rem;top:0.5rem;}"],
  [
    "inset-3",
    ".inset-3{bottom:0.75rem;left:0.75rem;right:0.75rem;top:0.75rem;}",
  ],
  ["inset-4", ".inset-4{bottom:1rem;left:1rem;right:1rem;top:1rem;}"],
  [
    "inset-5",
    ".inset-5{bottom:1.25rem;left:1.25rem;right:1.25rem;top:1.25rem;}",
  ],
  ["inset-6", ".inset-6{bottom:1.5rem;left:1.5rem;right:1.5rem;top:1.5rem;}"],
  [
    "inset-7",
    ".inset-7{bottom:1.75rem;left:1.75rem;right:1.75rem;top:1.75rem;}",
  ],
  ["inset-8", ".inset-8{bottom:2rem;left:2rem;right:2rem;top:2rem;}"],
  [
    "inset-9",
    ".inset-9{bottom:2.25rem;left:2.25rem;right:2.25rem;top:2.25rem;}",
  ],
  ["inset-10", ".inset-10{bottom:2.5rem;left:2.5rem;right:2.5rem;top:2.5rem;}"],
  [
    "inset-11",
    ".inset-11{bottom:2.75rem;left:2.75rem;right:2.75rem;top:2.75rem;}",
  ],
  ["inset-12", ".inset-12{bottom:3rem;left:3rem;right:3rem;top:3rem;}"],
  ["inset-14", ".inset-14{bottom:3.5rem;left:3.5rem;right:3.5rem;top:3.5rem;}"],
  ["inset-16", ".inset-16{bottom:4rem;left:4rem;right:4rem;top:4rem;}"],
  ["inset-20", ".inset-20{bottom:5rem;left:5rem;right:5rem;top:5rem;}"],
  ["inset-24", ".inset-24{bottom:6rem;left:6rem;right:6rem;top:6rem;}"],
  ["inset-28", ".inset-28{bottom:7rem;left:7rem;right:7rem;top:7rem;}"],
  ["inset-32", ".inset-32{bottom:8rem;left:8rem;right:8rem;top:8rem;}"],
  ["inset-36", ".inset-36{bottom:9rem;left:9rem;right:9rem;top:9rem;}"],
  ["inset-40", ".inset-40{bottom:10rem;left:10rem;right:10rem;top:10rem;}"],
  ["inset-44", ".inset-44{bottom:11rem;left:11rem;right:11rem;top:11rem;}"],
  ["inset-48", ".inset-48{bottom:12rem;left:12rem;right:12rem;top:12rem;}"],
  ["inset-52", ".inset-52{bottom:13rem;left:13rem;right:13rem;top:13rem;}"],
  ["inset-56", ".inset-56{bottom:14rem;left:14rem;right:14rem;top:14rem;}"],
  ["inset-60", ".inset-60{bottom:15rem;left:15rem;right:15rem;top:15rem;}"],
  ["inset-64", ".inset-64{bottom:16rem;left:16rem;right:16rem;top:16rem;}"],
  ["inset-72", ".inset-72{bottom:18rem;left:18rem;right:18rem;top:18rem;}"],
  ["inset-80", ".inset-80{bottom:20rem;left:20rem;right:20rem;top:20rem;}"],
  ["inset-96", ".inset-96{bottom:24rem;left:24rem;right:24rem;top:24rem;}"],
  ["inset-auto", ".inset-auto{bottom:auto;left:auto;right:auto;top:auto;}"],
  ["inset-full", ".inset-full{bottom:100%;left:100%;right:100%;top:100%;}"],
  ["top-1/2", ".top-1\\/2{top:50%;}"],
  ["top-1/3", ".top-1\\/3{top:33.333333%;}"],
  ["top-2/3", ".top-2\\/3{top:66.666667%;}"],
  ["top-1/4", ".top-1\\/4{top:25%;}"],
  ["top-2/4", ".top-2\\/4{top:50%;}"],
  ["top-3/4", ".top-3\\/4{top:75%;}"],
  ["right-1/2", ".right-1\\/2{right:50%;}"],
  ["right-1/3", ".right-1\\/3{right:33.333333%;}"],
  ["right-2/3", ".right-2\\/3{right:66.666667%;}"],
  ["right-1/4", ".right-1\\/4{right:25%;}"],
  ["right-2/4", ".right-2\\/4{right:50%;}"],
  ["right-3/4", ".right-3\\/4{right:75%;}"],
  ["bottom-1/2", ".bottom-1\\/2{bottom:50%;}"],
  ["bottom-1/3", ".bottom-1\\/3{bottom:33.333333%;}"],
  ["bottom-2/3", ".bottom-2\\/3{bottom:66.666667%;}"],
  ["bottom-1/4", ".bottom-1\\/4{bottom:25%;}"],
  ["bottom-2/4", ".bottom-2\\/4{bottom:50%;}"],
  ["bottom-3/4", ".bottom-3\\/4{bottom:75%;}"],
  ["left-1/2", ".left-1\\/2{left:50%;}"],
  ["left-1/3", ".left-1\\/3{left:33.333333%;}"],
  ["left-2/3", ".left-2\\/3{left:66.666667%;}"],
  ["left-1/4", ".left-1\\/4{left:25%;}"],
  ["left-2/4", ".left-2\\/4{left:50%;}"],
  ["left-3/4", ".left-3\\/4{left:75%;}"],
  ["inset-1/2", ".inset-1\\/2{bottom:50%;left:50%;right:50%;top:50%;}"],
  [
    "inset-1/3",
    ".inset-1\\/3{bottom:33.333333%;left:33.333333%;right:33.333333%;top:33.333333%;}",
  ],
  [
    "inset-2/3",
    ".inset-2\\/3{bottom:66.666667%;left:66.666667%;right:66.666667%;top:66.666667%;}",
  ],
  ["inset-1/4", ".inset-1\\/4{bottom:25%;left:25%;right:25%;top:25%;}"],
  ["inset-2/4", ".inset-2\\/4{bottom:50%;left:50%;right:50%;top:50%;}"],
  ["inset-3/4", ".inset-3\\/4{bottom:75%;left:75%;right:75%;top:75%;}"],
  ["inset-x-1/2", ".inset-x-1\\/2{left:50%;right:50%;}"],
  [
    "inset-x-1/3",
    ".inset-x-1\\/3{left:33.333333%;right:33.333333%;}",
  ],
  [
    "inset-x-2/3",
    ".inset-x-2\\/3{left:66.666667%;right:66.666667%;}",
  ],
  ["inset-x-1/4", ".inset-x-1\\/4{left:25%;right:25%;}"],
  ["inset-x-2/4", ".inset-x-2\\/4{left:50%;right:50%;}"],
  ["inset-x-3/4", ".inset-x-3\\/4{left:75%;right:75%;}"],
  ["inset-y-1/2", ".inset-y-1\\/2{bottom:50%;top:50%;}"],
  [
    "inset-y-1/3",
    ".inset-y-1\\/3{bottom:33.333333%;top:33.333333%;}",
  ],
  [
    "inset-y-2/3",
    ".inset-y-2\\/3{bottom:66.666667%;top:66.666667%;}",
  ],
  ["inset-y-1/4", ".inset-y-1\\/4{bottom:25%;top:25%;}"],
  ["inset-y-2/4", ".inset-y-2\\/4{bottom:50%;top:50%;}"],
  ["inset-y-3/4", ".inset-y-3\\/4{bottom:75%;top:75%;}"],
  ["inset-[3px]", ".inset-\\[3px\\]{bottom:3px;left:3px;right:3px;top:3px;}"],
  ["inset-x-[3px]", ".inset-x-\\[3px\\]{left:3px;right:3px;}"],
  ["inset-y-[3px]", ".inset-y-\\[3px\\]{bottom:3px;top:3px;}"],
  ["top-[3px]", ".top-\\[3px\\]{top:3px;}"],
  ["left-[3px]", ".left-\\[3px\\]{left:3px;}"],
  ["right-[3px]", ".right-\\[3px\\]{right:3px;}"],
  ["bottom-[3px]", ".bottom-\\[3px\\]{bottom:3px;}"],
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
  ["justify-start", ".justify-start{justify-content:flex-start;}"],
  ["justify-end", ".justify-end{justify-content:flex-end;}"],
  ["justify-center", ".justify-center{justify-content:center;}"],
  ["justify-between", ".justify-between{justify-content:space-between;}"],
  ["justify-around", ".justify-around{justify-content:space-around;}"],
  ["justify-evenly", ".justify-evenly{justify-content:space-evenly;}"],
  ["justify-start", ".justify-start{justify-content:flex-start;}"],
  ["justify-end", ".justify-end{justify-content:flex-end;}"],
  ["justify-center", ".justify-center{justify-content:center;}"],
  ["justify-between", ".justify-between{justify-content:space-between;}"],
  ["justify-around", ".justify-around{justify-content:space-around;}"],
  ["justify-evenly", ".justify-evenly{justify-content:space-evenly;}"],
  ["justify-self-auto", ".justify-self-auto{justify-self:auto;}"],
  ["justify-self-start", ".justify-self-start{justify-self:start;}"],
  ["justify-self-end", ".justify-self-end{justify-self:end;}"],
  ["justify-self-center", ".justify-self-center{justify-self:center;}"],
  ["justify-self-stretch", ".justify-self-stretch{justify-self:stretch;}"],
  ["content-center", ".content-center{align-content:center;}"],
  ["content-start", ".content-start{align-content:flex-start;}"],
  ["content-end", ".content-end{align-content:flex-end;}"],
  ["content-between", ".content-between{align-content:space-between;}"],
  ["content-around", ".content-around{align-content:space-around;}"],
  ["content-evenly", ".content-evenly{align-content:space-evenly;}"],
  ["content-center", ".content-center{align-content:center;}"],
  ["content-start", ".content-start{align-content:flex-start;}"],
  ["content-end", ".content-end{align-content:flex-end;}"],
  ["content-between", ".content-between{align-content:space-between;}"],
  ["content-around", ".content-around{align-content:space-around;}"],
  ["content-evenly", ".content-evenly{align-content:space-evenly;}"],
  ["items-start", ".items-start{align-items:flex-start;}"],
  ["items-end", ".items-end{align-items:flex-end;}"],
  ["items-center", ".items-center{align-items:center;}"],
  ["items-baseline", ".items-baseline{align-items:baseline;}"],
  ["items-stretch", ".items-stretch{align-items:stretch;}"],
  ["place-content-center", ".place-content-center{place-content:center;}"],
  ["place-content-start", ".place-content-start{place-content:start;}"],
  ["place-content-end", ".place-content-end{place-content:end;}"],
  [
    "place-content-between",
    ".place-content-between{place-content:space-between;}",
  ],
  [
    "place-content-around",
    ".place-content-around{place-content:space-around;}",
  ],
  [
    "place-content-evenly",
    ".place-content-evenly{place-content:space-evenly;}",
  ],
  ["place-content-stretch", ".place-content-stretch{place-content:stretch;}"],
  ["place-items-start", ".place-items-start{place-items:start;}"],
  ["place-items-end", ".place-items-end{place-items:end;}"],
  ["place-items-center", ".place-items-center{place-items:center;}"],
  ["place-items-stretch", ".place-items-stretch{place-items:stretch;}"],
  ["place-self-auto", ".place-self-auto{place-self:auto;}"],
  ["place-self-start", ".place-self-start{place-self:start;}"],
  ["place-self-end", ".place-self-end{place-self:end;}"],
  ["place-self-center", ".place-self-center{place-self:center;}"],
  ["place-self-stretch", ".place-self-stretch{place-self:stretch;}"],
  ["m-0", ".m-0{margin:0px;}"],
  ["mx-0", ".mx-0{margin-left:0px;margin-right:0px;}"],
  ["my-0", ".my-0{margin-bottom:0px;margin-top:0px;}"],
  ["mt-0", ".mt-0{margin-top:0px;}"],
  ["mr-0", ".mr-0{margin-right:0px;}"],
  ["mb-0", ".mb-0{margin-bottom:0px;}"],
  ["ml-0", ".ml-0{margin-left:0px;}"],
  ["m-px", ".m-px{margin:1px;}"],
  ["mx-px", ".mx-px{margin-left:1px;margin-right:1px;}"],
  ["my-px", ".my-px{margin-bottom:1px;margin-top:1px;}"],
  ["mt-px", ".mt-px{margin-top:1px;}"],
  ["mr-px", ".mr-px{margin-right:1px;}"],
  ["mb-px", ".mb-px{margin-bottom:1px;}"],
  ["ml-px", ".ml-px{margin-left:1px;}"],
  ["m-1", ".m-1{margin:0.25rem;}"],
  ["mx-1", ".mx-1{margin-left:0.25rem;margin-right:0.25rem;}"],
  ["my-1", ".my-1{margin-bottom:0.25rem;margin-top:0.25rem;}"],
  ["mt-1", ".mt-1{margin-top:0.25rem;}"],
  ["mr-1", ".mr-1{margin-right:0.25rem;}"],
  ["mb-1", ".mb-1{margin-bottom:0.25rem;}"],
  ["ml-1", ".ml-1{margin-left:0.25rem;}"],
  ["m-2", ".m-2{margin:0.5rem;}"],
  ["mx-2", ".mx-2{margin-left:0.5rem;margin-right:0.5rem;}"],
  ["my-2", ".my-2{margin-bottom:0.5rem;margin-top:0.5rem;}"],
  ["mt-2", ".mt-2{margin-top:0.5rem;}"],
  ["mr-2", ".mr-2{margin-right:0.5rem;}"],
  ["mb-2", ".mb-2{margin-bottom:0.5rem;}"],
  ["ml-2", ".ml-2{margin-left:0.5rem;}"],
  ["m-3", ".m-3{margin:0.75rem;}"],
  ["mx-3", ".mx-3{margin-left:0.75rem;margin-right:0.75rem;}"],
  ["my-3", ".my-3{margin-bottom:0.75rem;margin-top:0.75rem;}"],
  ["mt-3", ".mt-3{margin-top:0.75rem;}"],
  ["mr-3", ".mr-3{margin-right:0.75rem;}"],
  ["mb-3", ".mb-3{margin-bottom:0.75rem;}"],
  ["ml-3", ".ml-3{margin-left:0.75rem;}"],
  ["m-4", ".m-4{margin:1rem;}"],
  ["mx-4", ".mx-4{margin-left:1rem;margin-right:1rem;}"],
  ["my-4", ".my-4{margin-bottom:1rem;margin-top:1rem;}"],
  ["mt-4", ".mt-4{margin-top:1rem;}"],
  ["mr-4", ".mr-4{margin-right:1rem;}"],
  ["mb-4", ".mb-4{margin-bottom:1rem;}"],
  ["ml-4", ".ml-4{margin-left:1rem;}"],
  ["m-5", ".m-5{margin:1.25rem;}"],
  ["mx-5", ".mx-5{margin-left:1.25rem;margin-right:1.25rem;}"],
  ["my-5", ".my-5{margin-bottom:1.25rem;margin-top:1.25rem;}"],
  ["mt-5", ".mt-5{margin-top:1.25rem;}"],
  ["mr-5", ".mr-5{margin-right:1.25rem;}"],
  ["mb-5", ".mb-5{margin-bottom:1.25rem;}"],
  ["ml-5", ".ml-5{margin-left:1.25rem;}"],
  ["m-6", ".m-6{margin:1.5rem;}"],
  ["mx-6", ".mx-6{margin-left:1.5rem;margin-right:1.5rem;}"],
  ["my-6", ".my-6{margin-bottom:1.5rem;margin-top:1.5rem;}"],
  ["mt-6", ".mt-6{margin-top:1.5rem;}"],
  ["mr-6", ".mr-6{margin-right:1.5rem;}"],
  ["mb-6", ".mb-6{margin-bottom:1.5rem;}"],
  ["ml-6", ".ml-6{margin-left:1.5rem;}"],
  ["m-7", ".m-7{margin:1.75rem;}"],
  ["mx-7", ".mx-7{margin-left:1.75rem;margin-right:1.75rem;}"],
  ["my-7", ".my-7{margin-bottom:1.75rem;margin-top:1.75rem;}"],
  ["mt-7", ".mt-7{margin-top:1.75rem;}"],
  ["mr-7", ".mr-7{margin-right:1.75rem;}"],
  ["mb-7", ".mb-7{margin-bottom:1.75rem;}"],
  ["ml-7", ".ml-7{margin-left:1.75rem;}"],
  ["m-8", ".m-8{margin:2rem;}"],
  ["mx-8", ".mx-8{margin-left:2rem;margin-right:2rem;}"],
  ["my-8", ".my-8{margin-bottom:2rem;margin-top:2rem;}"],
  ["mt-8", ".mt-8{margin-top:2rem;}"],
  ["mr-8", ".mr-8{margin-right:2rem;}"],
  ["mb-8", ".mb-8{margin-bottom:2rem;}"],
  ["ml-8", ".ml-8{margin-left:2rem;}"],
  ["m-9", ".m-9{margin:2.25rem;}"],
  ["mx-9", ".mx-9{margin-left:2.25rem;margin-right:2.25rem;}"],
  ["my-9", ".my-9{margin-bottom:2.25rem;margin-top:2.25rem;}"],
  ["mt-9", ".mt-9{margin-top:2.25rem;}"],
  ["mr-9", ".mr-9{margin-right:2.25rem;}"],
  ["mb-9", ".mb-9{margin-bottom:2.25rem;}"],
  ["ml-9", ".ml-9{margin-left:2.25rem;}"],
  ["m-10", ".m-10{margin:2.5rem;}"],
  ["mx-10", ".mx-10{margin-left:2.5rem;margin-right:2.5rem;}"],
  ["my-10", ".my-10{margin-bottom:2.5rem;margin-top:2.5rem;}"],
  ["mt-10", ".mt-10{margin-top:2.5rem;}"],
  ["mr-10", ".mr-10{margin-right:2.5rem;}"],
  ["mb-10", ".mb-10{margin-bottom:2.5rem;}"],
  ["ml-10", ".ml-10{margin-left:2.5rem;}"],
  ["m-11", ".m-11{margin:2.75rem;}"],
  ["mx-11", ".mx-11{margin-left:2.75rem;margin-right:2.75rem;}"],
  ["my-11", ".my-11{margin-bottom:2.75rem;margin-top:2.75rem;}"],
  ["mt-11", ".mt-11{margin-top:2.75rem;}"],
  ["mr-11", ".mr-11{margin-right:2.75rem;}"],
  ["mb-11", ".mb-11{margin-bottom:2.75rem;}"],
  ["ml-11", ".ml-11{margin-left:2.75rem;}"],
  ["m-12", ".m-12{margin:3rem;}"],
  ["mx-12", ".mx-12{margin-left:3rem;margin-right:3rem;}"],
  ["my-12", ".my-12{margin-bottom:3rem;margin-top:3rem;}"],
  ["mt-12", ".mt-12{margin-top:3rem;}"],
  ["mr-12", ".mr-12{margin-right:3rem;}"],
  ["mb-12", ".mb-12{margin-bottom:3rem;}"],
  ["ml-12", ".ml-12{margin-left:3rem;}"],
  ["m-14", ".m-14{margin:3.5rem;}"],
  ["mx-14", ".mx-14{margin-left:3.5rem;margin-right:3.5rem;}"],
  ["my-14", ".my-14{margin-bottom:3.5rem;margin-top:3.5rem;}"],
  ["mt-14", ".mt-14{margin-top:3.5rem;}"],
  ["mr-14", ".mr-14{margin-right:3.5rem;}"],
  ["mb-14", ".mb-14{margin-bottom:3.5rem;}"],
  ["ml-14", ".ml-14{margin-left:3.5rem;}"],
  ["m-16", ".m-16{margin:4rem;}"],
  ["mx-16", ".mx-16{margin-left:4rem;margin-right:4rem;}"],
  ["my-16", ".my-16{margin-bottom:4rem;margin-top:4rem;}"],
  ["mt-16", ".mt-16{margin-top:4rem;}"],
  ["mr-16", ".mr-16{margin-right:4rem;}"],
  ["mb-16", ".mb-16{margin-bottom:4rem;}"],
  ["ml-16", ".ml-16{margin-left:4rem;}"],
  ["m-20", ".m-20{margin:5rem;}"],
  ["mx-20", ".mx-20{margin-left:5rem;margin-right:5rem;}"],
  ["my-20", ".my-20{margin-bottom:5rem;margin-top:5rem;}"],
  ["mt-20", ".mt-20{margin-top:5rem;}"],
  ["mr-20", ".mr-20{margin-right:5rem;}"],
  ["mb-20", ".mb-20{margin-bottom:5rem;}"],
  ["ml-20", ".ml-20{margin-left:5rem;}"],
  ["m-24", ".m-24{margin:6rem;}"],
  ["mx-24", ".mx-24{margin-left:6rem;margin-right:6rem;}"],
  ["my-24", ".my-24{margin-bottom:6rem;margin-top:6rem;}"],
  ["mt-24", ".mt-24{margin-top:6rem;}"],
  ["mr-24", ".mr-24{margin-right:6rem;}"],
  ["mb-24", ".mb-24{margin-bottom:6rem;}"],
  ["ml-24", ".ml-24{margin-left:6rem;}"],
  ["m-28", ".m-28{margin:7rem;}"],
  ["mx-28", ".mx-28{margin-left:7rem;margin-right:7rem;}"],
  ["my-28", ".my-28{margin-bottom:7rem;margin-top:7rem;}"],
  ["mt-28", ".mt-28{margin-top:7rem;}"],
  ["mr-28", ".mr-28{margin-right:7rem;}"],
  ["mb-28", ".mb-28{margin-bottom:7rem;}"],
  ["ml-28", ".ml-28{margin-left:7rem;}"],
  ["m-32", ".m-32{margin:8rem;}"],
  ["mx-32", ".mx-32{margin-left:8rem;margin-right:8rem;}"],
  ["my-32", ".my-32{margin-bottom:8rem;margin-top:8rem;}"],
  ["mt-32", ".mt-32{margin-top:8rem;}"],
  ["mr-32", ".mr-32{margin-right:8rem;}"],
  ["mb-32", ".mb-32{margin-bottom:8rem;}"],
  ["ml-32", ".ml-32{margin-left:8rem;}"],
  ["m-36", ".m-36{margin:9rem;}"],
  ["mx-36", ".mx-36{margin-left:9rem;margin-right:9rem;}"],
  ["my-36", ".my-36{margin-bottom:9rem;margin-top:9rem;}"],
  ["mt-36", ".mt-36{margin-top:9rem;}"],
  ["mr-36", ".mr-36{margin-right:9rem;}"],
  ["mb-36", ".mb-36{margin-bottom:9rem;}"],
  ["ml-36", ".ml-36{margin-left:9rem;}"],
  ["m-40", ".m-40{margin:10rem;}"],
  ["mx-40", ".mx-40{margin-left:10rem;margin-right:10rem;}"],
  ["my-40", ".my-40{margin-bottom:10rem;margin-top:10rem;}"],
  ["mt-40", ".mt-40{margin-top:10rem;}"],
  ["mr-40", ".mr-40{margin-right:10rem;}"],
  ["mb-40", ".mb-40{margin-bottom:10rem;}"],
  ["ml-40", ".ml-40{margin-left:10rem;}"],
  ["m-44", ".m-44{margin:11rem;}"],
  ["mx-44", ".mx-44{margin-left:11rem;margin-right:11rem;}"],
  ["my-44", ".my-44{margin-bottom:11rem;margin-top:11rem;}"],
  ["mt-44", ".mt-44{margin-top:11rem;}"],
  ["mr-44", ".mr-44{margin-right:11rem;}"],
  ["mb-44", ".mb-44{margin-bottom:11rem;}"],
  ["ml-44", ".ml-44{margin-left:11rem;}"],
  ["m-48", ".m-48{margin:12rem;}"],
  ["mx-48", ".mx-48{margin-left:12rem;margin-right:12rem;}"],
  ["my-48", ".my-48{margin-bottom:12rem;margin-top:12rem;}"],
  ["mt-48", ".mt-48{margin-top:12rem;}"],
  ["mr-48", ".mr-48{margin-right:12rem;}"],
  ["mb-48", ".mb-48{margin-bottom:12rem;}"],
  ["ml-48", ".ml-48{margin-left:12rem;}"],
  ["m-52", ".m-52{margin:13rem;}"],
  ["mx-52", ".mx-52{margin-left:13rem;margin-right:13rem;}"],
  ["my-52", ".my-52{margin-bottom:13rem;margin-top:13rem;}"],
  ["mt-52", ".mt-52{margin-top:13rem;}"],
  ["mr-52", ".mr-52{margin-right:13rem;}"],
  ["mb-52", ".mb-52{margin-bottom:13rem;}"],
  ["ml-52", ".ml-52{margin-left:13rem;}"],
  ["m-56", ".m-56{margin:14rem;}"],
  ["mx-56", ".mx-56{margin-left:14rem;margin-right:14rem;}"],
  ["my-56", ".my-56{margin-bottom:14rem;margin-top:14rem;}"],
  ["mt-56", ".mt-56{margin-top:14rem;}"],
  ["mr-56", ".mr-56{margin-right:14rem;}"],
  ["mb-56", ".mb-56{margin-bottom:14rem;}"],
  ["ml-56", ".ml-56{margin-left:14rem;}"],
  ["m-60", ".m-60{margin:15rem;}"],
  ["mx-60", ".mx-60{margin-left:15rem;margin-right:15rem;}"],
  ["my-60", ".my-60{margin-bottom:15rem;margin-top:15rem;}"],
  ["mt-60", ".mt-60{margin-top:15rem;}"],
  ["mr-60", ".mr-60{margin-right:15rem;}"],
  ["mb-60", ".mb-60{margin-bottom:15rem;}"],
  ["ml-60", ".ml-60{margin-left:15rem;}"],
  ["m-64", ".m-64{margin:16rem;}"],
  ["mx-64", ".mx-64{margin-left:16rem;margin-right:16rem;}"],
  ["my-64", ".my-64{margin-bottom:16rem;margin-top:16rem;}"],
  ["mt-64", ".mt-64{margin-top:16rem;}"],
  ["mr-64", ".mr-64{margin-right:16rem;}"],
  ["mb-64", ".mb-64{margin-bottom:16rem;}"],
  ["ml-64", ".ml-64{margin-left:16rem;}"],
  ["m-72", ".m-72{margin:18rem;}"],
  ["mx-72", ".mx-72{margin-left:18rem;margin-right:18rem;}"],
  ["my-72", ".my-72{margin-bottom:18rem;margin-top:18rem;}"],
  ["mt-72", ".mt-72{margin-top:18rem;}"],
  ["mr-72", ".mr-72{margin-right:18rem;}"],
  ["mb-72", ".mb-72{margin-bottom:18rem;}"],
  ["ml-72", ".ml-72{margin-left:18rem;}"],
  ["m-80", ".m-80{margin:20rem;}"],
  ["mx-80", ".mx-80{margin-left:20rem;margin-right:20rem;}"],
  ["my-80", ".my-80{margin-bottom:20rem;margin-top:20rem;}"],
  ["mt-80", ".mt-80{margin-top:20rem;}"],
  ["mr-80", ".mr-80{margin-right:20rem;}"],
  ["mb-80", ".mb-80{margin-bottom:20rem;}"],
  ["ml-80", ".ml-80{margin-left:20rem;}"],
  ["m-96", ".m-96{margin:24rem;}"],
  ["mx-96", ".mx-96{margin-left:24rem;margin-right:24rem;}"],
  ["my-96", ".my-96{margin-bottom:24rem;margin-top:24rem;}"],
  ["mt-96", ".mt-96{margin-top:24rem;}"],
  ["mr-96", ".mr-96{margin-right:24rem;}"],
  ["mb-96", ".mb-96{margin-bottom:24rem;}"],
  ["ml-96", ".ml-96{margin-left:24rem;}"],
  ["m-auto", ".m-auto{margin:auto;}"],
  ["mx-auto", ".mx-auto{margin-left:auto;margin-right:auto;}"],
  ["my-auto", ".my-auto{margin-bottom:auto;margin-top:auto;}"],
  ["mt-auto", ".mt-auto{margin-top:auto;}"],
  ["mr-auto", ".mr-auto{margin-right:auto;}"],
  ["mb-auto", ".mb-auto{margin-bottom:auto;}"],
  ["ml-auto", ".ml-auto{margin-left:auto;}"],
  ["ml-auto", ".ml-auto{margin-left:auto;}"],
  ["m-0.5", ".m-0\\.5{margin:0.125rem;}"],
  ["mx-0.5", ".mx-0\\.5{margin-left:0.125rem;margin-right:0.125rem;}"],
  ["my-0.5", ".my-0\\.5{margin-bottom:0.125rem;margin-top:0.125rem;}"],
  ["mt-0.5", ".mt-0\\.5{margin-top:0.125rem;}"],
  ["mr-0.5", ".mr-0\\.5{margin-right:0.125rem;}"],
  ["mb-0.5", ".mb-0\\.5{margin-bottom:0.125rem;}"],
  ["ml-0.5", ".ml-0\\.5{margin-left:0.125rem;}"],
  ["m-1.5", ".m-1\\.5{margin:0.375rem;}"],
  ["mx-1.5", ".mx-1\\.5{margin-left:0.375rem;margin-right:0.375rem;}"],
  ["my-1.5", ".my-1\\.5{margin-bottom:0.375rem;margin-top:0.375rem;}"],
  ["mt-1.5", ".mt-1\\.5{margin-top:0.375rem;}"],
  ["mr-1.5", ".mr-1\\.5{margin-right:0.375rem;}"],
  ["mb-1.5", ".mb-1\\.5{margin-bottom:0.375rem;}"],
  ["ml-1.5", ".ml-1\\.5{margin-left:0.375rem;}"],
  ["m-2.5", ".m-2\\.5{margin:0.625rem;}"],
  ["mx-2.5", ".mx-2\\.5{margin-left:0.625rem;margin-right:0.625rem;}"],
  ["my-2.5", ".my-2\\.5{margin-bottom:0.625rem;margin-top:0.625rem;}"],
  ["mt-2.5", ".mt-2\\.5{margin-top:0.625rem;}"],
  ["mr-2.5", ".mr-2\\.5{margin-right:0.625rem;}"],
  ["mb-2.5", ".mb-2\\.5{margin-bottom:0.625rem;}"],
  ["ml-2.5", ".ml-2\\.5{margin-left:0.625rem;}"],
  ["m-3.5", ".m-3\\.5{margin:0.875rem;}"],
  ["mx-3.5", ".mx-3\\.5{margin-left:0.875rem;margin-right:0.875rem;}"],
  ["my-3.5", ".my-3\\.5{margin-bottom:0.875rem;margin-top:0.875rem;}"],
  ["mt-3.5", ".mt-3\\.5{margin-top:0.875rem;}"],
  ["mr-3.5", ".mr-3\\.5{margin-right:0.875rem;}"],
  ["mb-3.5", ".mb-3\\.5{margin-bottom:0.875rem;}"],
  ["ml-3.5", ".ml-3\\.5{margin-left:0.875rem;}"],
  ["m-[1px]", ".m-\\[1px\\]{margin:1px;}"],
  ["mx-[1px]", ".mx-\\[1px\\]{margin-left:1px;margin-right:1px;}"],
  ["my-[1px]", ".my-\\[1px\\]{margin-bottom:1px;margin-top:1px;}"],
  ["mt-[1px]", ".mt-\\[1px\\]{margin-top:1px;}"],
  ["ml-[1px]", ".ml-\\[1px\\]{margin-left:1px;}"],
  ["mb-[1px]", ".mb-\\[1px\\]{margin-bottom:1px;}"],
  ["mr-[1px]", ".mr-\\[1px\\]{margin-right:1px;}"],
  ["p-0", ".p-0{padding:0px;}"],
  ["px-0", ".px-0{padding-left:0px;padding-right:0px;}"],
  ["py-0", ".py-0{padding-bottom:0px;padding-top:0px;}"],
  ["pt-0", ".pt-0{padding-top:0px;}"],
  ["pr-0", ".pr-0{padding-right:0px;}"],
  ["pb-0", ".pb-0{padding-bottom:0px;}"],
  ["pl-0", ".pl-0{padding-left:0px;}"],
  ["p-px", ".p-px{padding:1px;}"],
  ["px-px", ".px-px{padding-left:1px;padding-right:1px;}"],
  ["py-px", ".py-px{padding-bottom:1px;padding-top:1px;}"],
  ["pt-px", ".pt-px{padding-top:1px;}"],
  ["pr-px", ".pr-px{padding-right:1px;}"],
  ["pb-px", ".pb-px{padding-bottom:1px;}"],
  ["pl-px", ".pl-px{padding-left:1px;}"],
  ["p-1", ".p-1{padding:0.25rem;}"],
  ["px-1", ".px-1{padding-left:0.25rem;padding-right:0.25rem;}"],
  ["py-1", ".py-1{padding-bottom:0.25rem;padding-top:0.25rem;}"],
  ["pt-1", ".pt-1{padding-top:0.25rem;}"],
  ["pr-1", ".pr-1{padding-right:0.25rem;}"],
  ["pb-1", ".pb-1{padding-bottom:0.25rem;}"],
  ["pl-1", ".pl-1{padding-left:0.25rem;}"],
  ["p-2", ".p-2{padding:0.5rem;}"],
  ["px-2", ".px-2{padding-left:0.5rem;padding-right:0.5rem;}"],
  ["py-2", ".py-2{padding-bottom:0.5rem;padding-top:0.5rem;}"],
  ["pt-2", ".pt-2{padding-top:0.5rem;}"],
  ["pr-2", ".pr-2{padding-right:0.5rem;}"],
  ["pb-2", ".pb-2{padding-bottom:0.5rem;}"],
  ["pl-2", ".pl-2{padding-left:0.5rem;}"],
  ["p-3", ".p-3{padding:0.75rem;}"],
  ["px-3", ".px-3{padding-left:0.75rem;padding-right:0.75rem;}"],
  ["py-3", ".py-3{padding-bottom:0.75rem;padding-top:0.75rem;}"],
  ["pt-3", ".pt-3{padding-top:0.75rem;}"],
  ["pr-3", ".pr-3{padding-right:0.75rem;}"],
  ["pb-3", ".pb-3{padding-bottom:0.75rem;}"],
  ["pl-3", ".pl-3{padding-left:0.75rem;}"],
  ["p-4", ".p-4{padding:1rem;}"],
  ["px-4", ".px-4{padding-left:1rem;padding-right:1rem;}"],
  ["py-4", ".py-4{padding-bottom:1rem;padding-top:1rem;}"],
  ["pt-4", ".pt-4{padding-top:1rem;}"],
  ["pr-4", ".pr-4{padding-right:1rem;}"],
  ["pb-4", ".pb-4{padding-bottom:1rem;}"],
  ["pl-4", ".pl-4{padding-left:1rem;}"],
  ["p-5", ".p-5{padding:1.25rem;}"],
  ["px-5", ".px-5{padding-left:1.25rem;padding-right:1.25rem;}"],
  ["py-5", ".py-5{padding-bottom:1.25rem;padding-top:1.25rem;}"],
  ["pt-5", ".pt-5{padding-top:1.25rem;}"],
  ["pr-5", ".pr-5{padding-right:1.25rem;}"],
  ["pb-5", ".pb-5{padding-bottom:1.25rem;}"],
  ["pl-5", ".pl-5{padding-left:1.25rem;}"],
  ["p-6", ".p-6{padding:1.5rem;}"],
  ["px-6", ".px-6{padding-left:1.5rem;padding-right:1.5rem;}"],
  ["py-6", ".py-6{padding-bottom:1.5rem;padding-top:1.5rem;}"],
  ["pt-6", ".pt-6{padding-top:1.5rem;}"],
  ["pr-6", ".pr-6{padding-right:1.5rem;}"],
  ["pb-6", ".pb-6{padding-bottom:1.5rem;}"],
  ["pl-6", ".pl-6{padding-left:1.5rem;}"],
  ["p-7", ".p-7{padding:1.75rem;}"],
  ["px-7", ".px-7{padding-left:1.75rem;padding-right:1.75rem;}"],
  ["py-7", ".py-7{padding-bottom:1.75rem;padding-top:1.75rem;}"],
  ["pt-7", ".pt-7{padding-top:1.75rem;}"],
  ["pr-7", ".pr-7{padding-right:1.75rem;}"],
  ["pb-7", ".pb-7{padding-bottom:1.75rem;}"],
  ["pl-7", ".pl-7{padding-left:1.75rem;}"],
  ["p-8", ".p-8{padding:2rem;}"],
  ["px-8", ".px-8{padding-left:2rem;padding-right:2rem;}"],
  ["py-8", ".py-8{padding-bottom:2rem;padding-top:2rem;}"],
  ["pt-8", ".pt-8{padding-top:2rem;}"],
  ["pr-8", ".pr-8{padding-right:2rem;}"],
  ["pb-8", ".pb-8{padding-bottom:2rem;}"],
  ["pl-8", ".pl-8{padding-left:2rem;}"],
  ["p-9", ".p-9{padding:2.25rem;}"],
  ["px-9", ".px-9{padding-left:2.25rem;padding-right:2.25rem;}"],
  ["py-9", ".py-9{padding-bottom:2.25rem;padding-top:2.25rem;}"],
  ["pt-9", ".pt-9{padding-top:2.25rem;}"],
  ["pr-9", ".pr-9{padding-right:2.25rem;}"],
  ["pb-9", ".pb-9{padding-bottom:2.25rem;}"],
  ["pl-9", ".pl-9{padding-left:2.25rem;}"],
  ["p-10", ".p-10{padding:2.5rem;}"],
  ["px-10", ".px-10{padding-left:2.5rem;padding-right:2.5rem;}"],
  ["py-10", ".py-10{padding-bottom:2.5rem;padding-top:2.5rem;}"],
  ["pt-10", ".pt-10{padding-top:2.5rem;}"],
  ["pr-10", ".pr-10{padding-right:2.5rem;}"],
  ["pb-10", ".pb-10{padding-bottom:2.5rem;}"],
  ["pl-10", ".pl-10{padding-left:2.5rem;}"],
  ["p-11", ".p-11{padding:2.75rem;}"],
  ["px-11", ".px-11{padding-left:2.75rem;padding-right:2.75rem;}"],
  ["py-11", ".py-11{padding-bottom:2.75rem;padding-top:2.75rem;}"],
  ["pt-11", ".pt-11{padding-top:2.75rem;}"],
  ["pr-11", ".pr-11{padding-right:2.75rem;}"],
  ["pb-11", ".pb-11{padding-bottom:2.75rem;}"],
  ["pl-11", ".pl-11{padding-left:2.75rem;}"],
  ["p-12", ".p-12{padding:3rem;}"],
  ["px-12", ".px-12{padding-left:3rem;padding-right:3rem;}"],
  ["py-12", ".py-12{padding-bottom:3rem;padding-top:3rem;}"],
  ["pt-12", ".pt-12{padding-top:3rem;}"],
  ["pr-12", ".pr-12{padding-right:3rem;}"],
  ["pb-12", ".pb-12{padding-bottom:3rem;}"],
  ["pl-12", ".pl-12{padding-left:3rem;}"],
  ["p-14", ".p-14{padding:3.5rem;}"],
  ["px-14", ".px-14{padding-left:3.5rem;padding-right:3.5rem;}"],
  ["py-14", ".py-14{padding-bottom:3.5rem;padding-top:3.5rem;}"],
  ["pt-14", ".pt-14{padding-top:3.5rem;}"],
  ["pr-14", ".pr-14{padding-right:3.5rem;}"],
  ["pb-14", ".pb-14{padding-bottom:3.5rem;}"],
  ["pl-14", ".pl-14{padding-left:3.5rem;}"],
  ["p-16", ".p-16{padding:4rem;}"],
  ["px-16", ".px-16{padding-left:4rem;padding-right:4rem;}"],
  ["py-16", ".py-16{padding-bottom:4rem;padding-top:4rem;}"],
  ["pt-16", ".pt-16{padding-top:4rem;}"],
  ["pr-16", ".pr-16{padding-right:4rem;}"],
  ["pb-16", ".pb-16{padding-bottom:4rem;}"],
  ["pl-16", ".pl-16{padding-left:4rem;}"],
  ["p-20", ".p-20{padding:5rem;}"],
  ["px-20", ".px-20{padding-left:5rem;padding-right:5rem;}"],
  ["py-20", ".py-20{padding-bottom:5rem;padding-top:5rem;}"],
  ["pt-20", ".pt-20{padding-top:5rem;}"],
  ["pr-20", ".pr-20{padding-right:5rem;}"],
  ["pb-20", ".pb-20{padding-bottom:5rem;}"],
  ["pl-20", ".pl-20{padding-left:5rem;}"],
  ["p-24", ".p-24{padding:6rem;}"],
  ["px-24", ".px-24{padding-left:6rem;padding-right:6rem;}"],
  ["py-24", ".py-24{padding-bottom:6rem;padding-top:6rem;}"],
  ["pt-24", ".pt-24{padding-top:6rem;}"],
  ["pr-24", ".pr-24{padding-right:6rem;}"],
  ["pb-24", ".pb-24{padding-bottom:6rem;}"],
  ["pl-24", ".pl-24{padding-left:6rem;}"],
  ["p-28", ".p-28{padding:7rem;}"],
  ["px-28", ".px-28{padding-left:7rem;padding-right:7rem;}"],
  ["py-28", ".py-28{padding-bottom:7rem;padding-top:7rem;}"],
  ["pt-28", ".pt-28{padding-top:7rem;}"],
  ["pr-28", ".pr-28{padding-right:7rem;}"],
  ["pb-28", ".pb-28{padding-bottom:7rem;}"],
  ["pl-28", ".pl-28{padding-left:7rem;}"],
  ["p-32", ".p-32{padding:8rem;}"],
  ["px-32", ".px-32{padding-left:8rem;padding-right:8rem;}"],
  ["py-32", ".py-32{padding-bottom:8rem;padding-top:8rem;}"],
  ["pt-32", ".pt-32{padding-top:8rem;}"],
  ["pr-32", ".pr-32{padding-right:8rem;}"],
  ["pb-32", ".pb-32{padding-bottom:8rem;}"],
  ["pl-32", ".pl-32{padding-left:8rem;}"],
  ["p-36", ".p-36{padding:9rem;}"],
  ["px-36", ".px-36{padding-left:9rem;padding-right:9rem;}"],
  ["py-36", ".py-36{padding-bottom:9rem;padding-top:9rem;}"],
  ["pt-36", ".pt-36{padding-top:9rem;}"],
  ["pr-36", ".pr-36{padding-right:9rem;}"],
  ["pb-36", ".pb-36{padding-bottom:9rem;}"],
  ["pl-36", ".pl-36{padding-left:9rem;}"],
  ["p-40", ".p-40{padding:10rem;}"],
  ["px-40", ".px-40{padding-left:10rem;padding-right:10rem;}"],
  ["py-40", ".py-40{padding-bottom:10rem;padding-top:10rem;}"],
  ["pt-40", ".pt-40{padding-top:10rem;}"],
  ["pr-40", ".pr-40{padding-right:10rem;}"],
  ["pb-40", ".pb-40{padding-bottom:10rem;}"],
  ["pl-40", ".pl-40{padding-left:10rem;}"],
  ["p-44", ".p-44{padding:11rem;}"],
  ["px-44", ".px-44{padding-left:11rem;padding-right:11rem;}"],
  ["py-44", ".py-44{padding-bottom:11rem;padding-top:11rem;}"],
  ["pt-44", ".pt-44{padding-top:11rem;}"],
  ["pr-44", ".pr-44{padding-right:11rem;}"],
  ["pb-44", ".pb-44{padding-bottom:11rem;}"],
  ["pl-44", ".pl-44{padding-left:11rem;}"],
  ["p-48", ".p-48{padding:12rem;}"],
  ["px-48", ".px-48{padding-left:12rem;padding-right:12rem;}"],
  ["py-48", ".py-48{padding-bottom:12rem;padding-top:12rem;}"],
  ["pt-48", ".pt-48{padding-top:12rem;}"],
  ["pr-48", ".pr-48{padding-right:12rem;}"],
  ["pb-48", ".pb-48{padding-bottom:12rem;}"],
  ["pl-48", ".pl-48{padding-left:12rem;}"],
  ["p-52", ".p-52{padding:13rem;}"],
  ["px-52", ".px-52{padding-left:13rem;padding-right:13rem;}"],
  ["py-52", ".py-52{padding-bottom:13rem;padding-top:13rem;}"],
  ["pt-52", ".pt-52{padding-top:13rem;}"],
  ["pr-52", ".pr-52{padding-right:13rem;}"],
  ["pb-52", ".pb-52{padding-bottom:13rem;}"],
  ["pl-52", ".pl-52{padding-left:13rem;}"],
  ["p-56", ".p-56{padding:14rem;}"],
  ["px-56", ".px-56{padding-left:14rem;padding-right:14rem;}"],
  ["py-56", ".py-56{padding-bottom:14rem;padding-top:14rem;}"],
  ["pt-56", ".pt-56{padding-top:14rem;}"],
  ["pr-56", ".pr-56{padding-right:14rem;}"],
  ["pb-56", ".pb-56{padding-bottom:14rem;}"],
  ["pl-56", ".pl-56{padding-left:14rem;}"],
  ["p-60", ".p-60{padding:15rem;}"],
  ["px-60", ".px-60{padding-left:15rem;padding-right:15rem;}"],
  ["py-60", ".py-60{padding-bottom:15rem;padding-top:15rem;}"],
  ["pt-60", ".pt-60{padding-top:15rem;}"],
  ["pr-60", ".pr-60{padding-right:15rem;}"],
  ["pb-60", ".pb-60{padding-bottom:15rem;}"],
  ["pl-60", ".pl-60{padding-left:15rem;}"],
  ["p-64", ".p-64{padding:16rem;}"],
  ["px-64", ".px-64{padding-left:16rem;padding-right:16rem;}"],
  ["py-64", ".py-64{padding-bottom:16rem;padding-top:16rem;}"],
  ["pt-64", ".pt-64{padding-top:16rem;}"],
  ["pr-64", ".pr-64{padding-right:16rem;}"],
  ["pb-64", ".pb-64{padding-bottom:16rem;}"],
  ["pl-64", ".pl-64{padding-left:16rem;}"],
  ["p-72", ".p-72{padding:18rem;}"],
  ["px-72", ".px-72{padding-left:18rem;padding-right:18rem;}"],
  ["py-72", ".py-72{padding-bottom:18rem;padding-top:18rem;}"],
  ["pt-72", ".pt-72{padding-top:18rem;}"],
  ["pr-72", ".pr-72{padding-right:18rem;}"],
  ["pb-72", ".pb-72{padding-bottom:18rem;}"],
  ["pl-72", ".pl-72{padding-left:18rem;}"],
  ["p-80", ".p-80{padding:20rem;}"],
  ["px-80", ".px-80{padding-left:20rem;padding-right:20rem;}"],
  ["py-80", ".py-80{padding-bottom:20rem;padding-top:20rem;}"],
  ["pt-80", ".pt-80{padding-top:20rem;}"],
  ["pr-80", ".pr-80{padding-right:20rem;}"],
  ["pb-80", ".pb-80{padding-bottom:20rem;}"],
  ["pl-80", ".pl-80{padding-left:20rem;}"],
  ["p-96", ".p-96{padding:24rem;}"],
  ["px-96", ".px-96{padding-left:24rem;padding-right:24rem;}"],
  ["py-96", ".py-96{padding-bottom:24rem;padding-top:24rem;}"],
  ["pt-96", ".pt-96{padding-top:24rem;}"],
  ["pr-96", ".pr-96{padding-right:24rem;}"],
  ["pb-96", ".pb-96{padding-bottom:24rem;}"],
  ["pl-96", ".pl-96{padding-left:24rem;}"],
  ["p-auto", ".p-auto{padding:auto;}"],
  ["px-auto", ".px-auto{padding-left:auto;padding-right:auto;}"],
  ["py-auto", ".py-auto{padding-bottom:auto;padding-top:auto;}"],
  ["pt-auto", ".pt-auto{padding-top:auto;}"],
  ["pr-auto", ".pr-auto{padding-right:auto;}"],
  ["pb-auto", ".pb-auto{padding-bottom:auto;}"],
  ["pl-auto", ".pl-auto{padding-left:auto;}"],
  ["pl-auto", ".pl-auto{padding-left:auto;}"],
  ["p-0.5", ".p-0\\.5{padding:0.125rem;}"],
  ["px-0.5", ".px-0\\.5{padding-left:0.125rem;padding-right:0.125rem;}"],
  ["py-0.5", ".py-0\\.5{padding-bottom:0.125rem;padding-top:0.125rem;}"],
  ["pt-0.5", ".pt-0\\.5{padding-top:0.125rem;}"],
  ["pr-0.5", ".pr-0\\.5{padding-right:0.125rem;}"],
  ["pb-0.5", ".pb-0\\.5{padding-bottom:0.125rem;}"],
  ["pl-0.5", ".pl-0\\.5{padding-left:0.125rem;}"],
  ["p-1.5", ".p-1\\.5{padding:0.375rem;}"],
  ["px-1.5", ".px-1\\.5{padding-left:0.375rem;padding-right:0.375rem;}"],
  ["py-1.5", ".py-1\\.5{padding-bottom:0.375rem;padding-top:0.375rem;}"],
  ["pt-1.5", ".pt-1\\.5{padding-top:0.375rem;}"],
  ["pr-1.5", ".pr-1\\.5{padding-right:0.375rem;}"],
  ["pb-1.5", ".pb-1\\.5{padding-bottom:0.375rem;}"],
  ["pl-1.5", ".pl-1\\.5{padding-left:0.375rem;}"],
  ["p-2.5", ".p-2\\.5{padding:0.625rem;}"],
  ["px-2.5", ".px-2\\.5{padding-left:0.625rem;padding-right:0.625rem;}"],
  ["py-2.5", ".py-2\\.5{padding-bottom:0.625rem;padding-top:0.625rem;}"],
  ["pt-2.5", ".pt-2\\.5{padding-top:0.625rem;}"],
  ["pr-2.5", ".pr-2\\.5{padding-right:0.625rem;}"],
  ["pb-2.5", ".pb-2\\.5{padding-bottom:0.625rem;}"],
  ["pl-2.5", ".pl-2\\.5{padding-left:0.625rem;}"],
  ["p-3.5", ".p-3\\.5{padding:0.875rem;}"],
  ["px-3.5", ".px-3\\.5{padding-left:0.875rem;padding-right:0.875rem;}"],
  ["py-3.5", ".py-3\\.5{padding-bottom:0.875rem;padding-top:0.875rem;}"],
  ["pt-3.5", ".pt-3\\.5{padding-top:0.875rem;}"],
  ["pr-3.5", ".pr-3\\.5{padding-right:0.875rem;}"],
  ["pb-3.5", ".pb-3\\.5{padding-bottom:0.875rem;}"],
  ["pl-3.5", ".pl-3\\.5{padding-left:0.875rem;}"],
  ["p-[1px]", ".p-\\[1px\\]{padding:1px;}"],
  ["px-[1px]", ".px-\\[1px\\]{padding-left:1px;padding-right:1px;}"],
  ["py-[1px]", ".py-\\[1px\\]{padding-bottom:1px;padding-top:1px;}"],
  ["pt-[1px]", ".pt-\\[1px\\]{padding-top:1px;}"],
  ["pl-[1px]", ".pl-\\[1px\\]{padding-left:1px;}"],
  ["pb-[1px]", ".pb-\\[1px\\]{padding-bottom:1px;}"],
  ["pr-[1px]", ".pr-\\[1px\\]{padding-right:1px;}"],
  [
    "space-x-0",
    ".space-x-0>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0px * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0px * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-px",
    ".space-x-px>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(1px * calc(1 - var(--map-space-x-reverse)));margin-right:calc(1px * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-1",
    ".space-x-1>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0.25rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0.25rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-2",
    ".space-x-2>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0.5rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0.5rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-3",
    ".space-x-3>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0.75rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0.75rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-4",
    ".space-x-4>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(1rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(1rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-5",
    ".space-x-5>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(1.25rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(1.25rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-6",
    ".space-x-6>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(1.5rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(1.5rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-7",
    ".space-x-7>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(1.75rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(1.75rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-8",
    ".space-x-8>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(2rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(2rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-9",
    ".space-x-9>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(2.25rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(2.25rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-10",
    ".space-x-10>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(2.5rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(2.5rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-11",
    ".space-x-11>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(2.75rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(2.75rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-12",
    ".space-x-12>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(3rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(3rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-14",
    ".space-x-14>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(3.5rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(3.5rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-16",
    ".space-x-16>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(4rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(4rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-20",
    ".space-x-20>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(5rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(5rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-24",
    ".space-x-24>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(6rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(6rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-28",
    ".space-x-28>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(7rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(7rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-32",
    ".space-x-32>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(8rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(8rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-36",
    ".space-x-36>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(9rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(9rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-40",
    ".space-x-40>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(10rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(10rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-44",
    ".space-x-44>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(11rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(11rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-48",
    ".space-x-48>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(12rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(12rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-52",
    ".space-x-52>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(13rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(13rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-56",
    ".space-x-56>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(14rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(14rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-60",
    ".space-x-60>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(15rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(15rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-64",
    ".space-x-64>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(16rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(16rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-72",
    ".space-x-72>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(18rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(18rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-80",
    ".space-x-80>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(20rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(20rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-96",
    ".space-x-96>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(24rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(24rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-reverse",
    ".space-x-reverse>:not([hidden])~:not([hidden]){--map-space-x-reverse:1;}",
  ],
  [
    "space-y-reverse",
    ".space-y-reverse>:not([hidden])~:not([hidden]){--map-space-y-reverse:1;}",
  ],
  [
    "space-y-0",
    ".space-y-0>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0px * var(--map-space-y-reverse));margin-top:calc(0px * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-px",
    ".space-y-px>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(1px * var(--map-space-y-reverse));margin-top:calc(1px * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-2",
    ".space-y-2>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.5rem * var(--map-space-y-reverse));margin-top:calc(0.5rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-3",
    ".space-y-3>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.75rem * var(--map-space-y-reverse));margin-top:calc(0.75rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-4",
    ".space-y-4>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(1rem * var(--map-space-y-reverse));margin-top:calc(1rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-5",
    ".space-y-5>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(1.25rem * var(--map-space-y-reverse));margin-top:calc(1.25rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-6",
    ".space-y-6>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(1.5rem * var(--map-space-y-reverse));margin-top:calc(1.5rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-7",
    ".space-y-7>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(1.75rem * var(--map-space-y-reverse));margin-top:calc(1.75rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-8",
    ".space-y-8>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(2rem * var(--map-space-y-reverse));margin-top:calc(2rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-9",
    ".space-y-9>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(2.25rem * var(--map-space-y-reverse));margin-top:calc(2.25rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-10",
    ".space-y-10>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(2.5rem * var(--map-space-y-reverse));margin-top:calc(2.5rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-11",
    ".space-y-11>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(2.75rem * var(--map-space-y-reverse));margin-top:calc(2.75rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-12",
    ".space-y-12>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(3rem * var(--map-space-y-reverse));margin-top:calc(3rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-14",
    ".space-y-14>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(3.5rem * var(--map-space-y-reverse));margin-top:calc(3.5rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-16",
    ".space-y-16>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(4rem * var(--map-space-y-reverse));margin-top:calc(4rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-20",
    ".space-y-20>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(5rem * var(--map-space-y-reverse));margin-top:calc(5rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-24",
    ".space-y-24>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(6rem * var(--map-space-y-reverse));margin-top:calc(6rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-28",
    ".space-y-28>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(7rem * var(--map-space-y-reverse));margin-top:calc(7rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-32",
    ".space-y-32>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(8rem * var(--map-space-y-reverse));margin-top:calc(8rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-36",
    ".space-y-36>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(9rem * var(--map-space-y-reverse));margin-top:calc(9rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-40",
    ".space-y-40>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(10rem * var(--map-space-y-reverse));margin-top:calc(10rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-44",
    ".space-y-44>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(11rem * var(--map-space-y-reverse));margin-top:calc(11rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-48",
    ".space-y-48>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(12rem * var(--map-space-y-reverse));margin-top:calc(12rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-52",
    ".space-y-52>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(13rem * var(--map-space-y-reverse));margin-top:calc(13rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-56",
    ".space-y-56>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(14rem * var(--map-space-y-reverse));margin-top:calc(14rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-60",
    ".space-y-60>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(15rem * var(--map-space-y-reverse));margin-top:calc(15rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-64",
    ".space-y-64>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(16rem * var(--map-space-y-reverse));margin-top:calc(16rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-72",
    ".space-y-72>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(18rem * var(--map-space-y-reverse));margin-top:calc(18rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-80",
    ".space-y-80>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(20rem * var(--map-space-y-reverse));margin-top:calc(20rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-96",
    ".space-y-96>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(24rem * var(--map-space-y-reverse));margin-top:calc(24rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-0.5",
    ".space-y-0\\.5>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.125rem * var(--map-space-y-reverse));margin-top:calc(0.125rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-0.5",
    ".space-y-0\\.5>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.125rem * var(--map-space-y-reverse));margin-top:calc(0.125rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-1.5",
    ".space-y-1\\.5>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.375rem * var(--map-space-y-reverse));margin-top:calc(0.375rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-2.5",
    ".space-y-2\\.5>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.625rem * var(--map-space-y-reverse));margin-top:calc(0.625rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-y-3.5",
    ".space-y-3\\.5>:not([hidden])~:not([hidden]){--map-space-y-reverse:0;margin-bottom:calc(0.875rem * var(--map-space-y-reverse));margin-top:calc(0.875rem * calc(1 - var(--map-space-y-reverse)));}",
  ],
  [
    "space-x-0.5",
    ".space-x-0\\.5>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0.125rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0.125rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-1.5",
    ".space-x-1\\.5>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0.375rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0.375rem * var(--map-space-x-reverse));}",
  ],
  [
    "space-x-2.5",
    ".space-x-2\\.5>:not([hidden])~:not([hidden]){--map-space-x-reverse:0;margin-left:calc(0.625rem * calc(1 - var(--map-space-x-reverse)));margin-right:calc(0.625rem * var(--map-space-x-reverse));}",
  ],
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
  ["w-1/3", ".w-1\\/3{width:33.333333%;}"],
  ["w-2/3", ".w-2\\/3{width:66.666667%;}"],
  ["w-1/4", ".w-1\\/4{width:25%;}"],
  ["w-2/4", ".w-2\\/4{width:50%;}"],
  ["w-3/4", ".w-3\\/4{width:75%;}"],
  ["w-1/5", ".w-1\\/5{width:20%;}"],
  ["w-2/5", ".w-2\\/5{width:40%;}"],
  ["w-3/5", ".w-3\\/5{width:60%;}"],
  ["w-4/5", ".w-4\\/5{width:80%;}"],
  ["w-1/6", ".w-1\\/6{width:16.666667%;}"],
  ["w-2/6", ".w-2\\/6{width:33.333333%;}"],
  ["w-3/6", ".w-3\\/6{width:50%;}"],
  ["w-4/6", ".w-4\\/6{width:66.666667%;}"],
  ["w-5/6", ".w-5\\/6{width:83.333333%;}"],
  ["w-1/12", ".w-1\\/12{width:8.333333%;}"],
  ["w-2/12", ".w-2\\/12{width:16.666667%;}"],
  ["w-3/12", ".w-3\\/12{width:25%;}"],
  ["w-4/12", ".w-4\\/12{width:33.333333%;}"],
  ["w-5/12", ".w-5\\/12{width:41.666667%;}"],
  ["w-6/12", ".w-6\\/12{width:50%;}"],
  ["w-7/12", ".w-7\\/12{width:58.333333%;}"],
  ["w-8/12", ".w-8\\/12{width:66.666667%;}"],
  ["w-9/12", ".w-9\\/12{width:75%;}"],
  ["w-10/12", ".w-10\\/12{width:83.333333%;}"],
  ["w-11/12", ".w-11\\/12{width:91.666667%;}"],
  ["w-[1rem]", ".w-\\[1rem\\]{width:1rem;}"],
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
  ["h-5/6", ".h-5\\/6{height:83.333333%;}"],
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
    ".antialiased{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;}",
  ],
  [
    "subpixel-antialiased",
    ".subpixel-antialiased{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;}",
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
  [
    "font-sans",
    `.font-sans{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}`,
  ],
  [
    "font-serif",
    `.font-serif{font-family:ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;}`,
  ],
  [
    "font-mono",
    `.font-mono{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;}`,
  ],
  ["tracking-tighter", ".tracking-tighter{letter-spacing:-0.05em;}"],
  ["tracking-tight", ".tracking-tight{letter-spacing:-0.025em;}"],
  ["tracking-normal", ".tracking-normal{letter-spacing:0em;}"],
  ["tracking-wide", ".tracking-wide{letter-spacing:0.025em;}"],
  ["tracking-wider", ".tracking-wider{letter-spacing:0.05em;}"],
  ["tracking-widest", ".tracking-widest{letter-spacing:0.1em;}"],
  ["leading-3", ".leading-3{line-height:0.75rem;}"],
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
  ["text-inherit", ".text-inherit{color:inherit;}"],
  ["text-current", ".text-current{color:currentColor;}"],
  ["text-transparent", ".text-transparent{color:transparent;}"],
  ["text-black", ".text-black{color:rgb(0 0 0/1);}"],
  ["text-white", ".text-white{color:rgb(255 255 255/1);}"],
  ["text-slate-50", ".text-slate-50{color:rgb(248 250 252/1);}"],
  ["text-slate-100", ".text-slate-100{color:rgb(241 245 249/1);}"],
  ["text-slate-200", ".text-slate-200{color:rgb(226 232 240/1);}"],
  ["text-slate-300", ".text-slate-300{color:rgb(203 213 225/1);}"],
  ["text-slate-400", ".text-slate-400{color:rgb(148 163 184/1);}"],
  ["text-slate-500", ".text-slate-500{color:rgb(100 116 139/1);}"],
  ["text-slate-600", ".text-slate-600{color:rgb(71 85 105/1);}"],
  ["text-slate-700", ".text-slate-700{color:rgb(51 65 85/1);}"],
  ["text-slate-800", ".text-slate-800{color:rgb(30 41 59/1);}"],
  ["text-slate-900", ".text-slate-900{color:rgb(15 23 42/1);}"],
  ["text-gray-50", ".text-gray-50{color:rgb(249 250 251/1);}"],
  ["text-gray-100", ".text-gray-100{color:rgb(243 244 246/1);}"],
  ["text-gray-200", ".text-gray-200{color:rgb(229 231 235/1);}"],
  ["text-gray-300", ".text-gray-300{color:rgb(209 213 219/1);}"],
  ["text-gray-400", ".text-gray-400{color:rgb(156 163 175/1);}"],
  ["text-gray-500", ".text-gray-500{color:rgb(107 114 128/1);}"],
  ["text-gray-600", ".text-gray-600{color:rgb(75 85 99/1);}"],
  ["text-gray-700", ".text-gray-700{color:rgb(55 65 81/1);}"],
  ["text-gray-800", ".text-gray-800{color:rgb(31 41 55/1);}"],
  ["text-gray-900", ".text-gray-900{color:rgb(17 24 39/1);}"],
  ["text-zinc-50", ".text-zinc-50{color:rgb(250 250 250/1);}"],
  ["text-zinc-100", ".text-zinc-100{color:rgb(244 244 245/1);}"],
  ["text-zinc-200", ".text-zinc-200{color:rgb(228 228 231/1);}"],
  ["text-zinc-300", ".text-zinc-300{color:rgb(212 212 216/1);}"],
  ["text-zinc-400", ".text-zinc-400{color:rgb(161 161 170/1);}"],
  ["text-zinc-500", ".text-zinc-500{color:rgb(113 113 122/1);}"],
  ["text-zinc-600", ".text-zinc-600{color:rgb(82 82 91/1);}"],
  ["text-zinc-700", ".text-zinc-700{color:rgb(63 63 70/1);}"],
  ["text-zinc-800", ".text-zinc-800{color:rgb(39 39 42/1);}"],
  ["text-zinc-900", ".text-zinc-900{color:rgb(24 24 27/1);}"],
  ["text-neutral-50", ".text-neutral-50{color:rgb(250 250 250/1);}"],
  ["text-neutral-100", ".text-neutral-100{color:rgb(245 245 245/1);}"],
  ["text-neutral-200", ".text-neutral-200{color:rgb(229 229 229/1);}"],
  ["text-neutral-300", ".text-neutral-300{color:rgb(212 212 212/1);}"],
  ["text-neutral-400", ".text-neutral-400{color:rgb(163 163 163/1);}"],
  ["text-neutral-500", ".text-neutral-500{color:rgb(115 115 115/1);}"],
  ["text-neutral-600", ".text-neutral-600{color:rgb(82 82 82/1);}"],
  ["text-neutral-700", ".text-neutral-700{color:rgb(64 64 64/1);}"],
  ["text-neutral-800", ".text-neutral-800{color:rgb(38 38 38/1);}"],
  ["text-neutral-900", ".text-neutral-900{color:rgb(23 23 23/1);}"],
  ["text-stone-50", ".text-stone-50{color:rgb(250 250 249/1);}"],
  ["text-stone-100", ".text-stone-100{color:rgb(245 245 244/1);}"],
  ["text-stone-200", ".text-stone-200{color:rgb(231 229 228/1);}"],
  ["text-stone-300", ".text-stone-300{color:rgb(214 211 209/1);}"],
  ["text-stone-400", ".text-stone-400{color:rgb(168 162 158/1);}"],
  ["text-stone-500", ".text-stone-500{color:rgb(120 113 108/1);}"],
  ["text-stone-600", ".text-stone-600{color:rgb(87 83 78/1);}"],
  ["text-stone-700", ".text-stone-700{color:rgb(68 64 60/1);}"],
  ["text-stone-800", ".text-stone-800{color:rgb(41 37 36/1);}"],
  ["text-stone-900", ".text-stone-900{color:rgb(28 25 23/1);}"],
  ["text-red-50", ".text-red-50{color:rgb(254 242 242/1);}"],
  ["text-red-100", ".text-red-100{color:rgb(254 226 226/1);}"],
  ["text-red-200", ".text-red-200{color:rgb(254 202 202/1);}"],
  ["text-red-300", ".text-red-300{color:rgb(252 165 165/1);}"],
  ["text-red-400", ".text-red-400{color:rgb(248 113 113/1);}"],
  ["text-red-500", ".text-red-500{color:rgb(239 68 68/1);}"],
  ["text-red-600", ".text-red-600{color:rgb(220 38 38/1);}"],
  ["text-red-700", ".text-red-700{color:rgb(185 28 28/1);}"],
  ["text-red-800", ".text-red-800{color:rgb(153 27 27/1);}"],
  ["text-red-900", ".text-red-900{color:rgb(127 29 29/1);}"],
  ["text-orange-50", ".text-orange-50{color:rgb(255 247 237/1);}"],
  ["text-orange-100", ".text-orange-100{color:rgb(255 237 213/1);}"],
  ["text-orange-200", ".text-orange-200{color:rgb(254 215 170/1);}"],
  ["text-orange-300", ".text-orange-300{color:rgb(253 186 116/1);}"],
  ["text-orange-400", ".text-orange-400{color:rgb(251 146 60/1);}"],
  ["text-orange-500", ".text-orange-500{color:rgb(249 115 22/1);}"],
  ["text-orange-600", ".text-orange-600{color:rgb(234 88 12/1);}"],
  ["text-orange-700", ".text-orange-700{color:rgb(194 65 12/1);}"],
  ["text-orange-800", ".text-orange-800{color:rgb(154 52 18/1);}"],
  ["text-orange-900", ".text-orange-900{color:rgb(124 45 18/1);}"],
  ["text-amber-50", ".text-amber-50{color:rgb(255 251 235/1);}"],
  ["text-amber-100", ".text-amber-100{color:rgb(254 243 199/1);}"],
  ["text-amber-200", ".text-amber-200{color:rgb(253 230 138/1);}"],
  ["text-amber-300", ".text-amber-300{color:rgb(252 211 77/1);}"],
  ["text-amber-400", ".text-amber-400{color:rgb(251 191 36/1);}"],
  ["text-amber-500", ".text-amber-500{color:rgb(245 158 11/1);}"],
  ["text-amber-600", ".text-amber-600{color:rgb(217 119 6/1);}"],
  ["text-amber-700", ".text-amber-700{color:rgb(180 83 9/1);}"],
  ["text-amber-800", ".text-amber-800{color:rgb(146 64 14/1);}"],
  ["text-amber-900", ".text-amber-900{color:rgb(120 53 15/1);}"],
  ["text-yellow-50", ".text-yellow-50{color:rgb(254 252 232/1);}"],
  ["text-yellow-100", ".text-yellow-100{color:rgb(254 249 195/1);}"],
  ["text-yellow-200", ".text-yellow-200{color:rgb(254 240 138/1);}"],
  ["text-yellow-300", ".text-yellow-300{color:rgb(253 224 71/1);}"],
  ["text-yellow-400", ".text-yellow-400{color:rgb(250 204 21/1);}"],
  ["text-yellow-500", ".text-yellow-500{color:rgb(234 179 8/1);}"],
  ["text-yellow-600", ".text-yellow-600{color:rgb(202 138 4/1);}"],
  ["text-yellow-700", ".text-yellow-700{color:rgb(161 98 7/1);}"],
  ["text-yellow-800", ".text-yellow-800{color:rgb(133 77 14/1);}"],
  ["text-yellow-900", ".text-yellow-900{color:rgb(113 63 18/1);}"],
  ["text-lime-50", ".text-lime-50{color:rgb(247 254 231/1);}"],
  ["text-lime-100", ".text-lime-100{color:rgb(236 252 203/1);}"],
  ["text-lime-200", ".text-lime-200{color:rgb(217 249 157/1);}"],
  ["text-lime-300", ".text-lime-300{color:rgb(190 242 100/1);}"],
  ["text-lime-400", ".text-lime-400{color:rgb(163 230 53/1);}"],
  ["text-lime-500", ".text-lime-500{color:rgb(132 204 22/1);}"],
  ["text-lime-600", ".text-lime-600{color:rgb(101 163 13/1);}"],
  ["text-lime-700", ".text-lime-700{color:rgb(77 124 15/1);}"],
  ["text-lime-800", ".text-lime-800{color:rgb(63 98 18/1);}"],
  ["text-lime-900", ".text-lime-900{color:rgb(54 83 20/1);}"],
  ["text-green-50", ".text-green-50{color:rgb(240 253 244/1);}"],
  ["text-green-100", ".text-green-100{color:rgb(220 252 231/1);}"],
  ["text-green-200", ".text-green-200{color:rgb(187 247 208/1);}"],
  ["text-green-300", ".text-green-300{color:rgb(134 239 172/1);}"],
  ["text-green-400", ".text-green-400{color:rgb(74 222 128/1);}"],
  ["text-green-500", ".text-green-500{color:rgb(34 197 94/1);}"],
  ["text-green-600", ".text-green-600{color:rgb(22 163 74/1);}"],
  ["text-green-700", ".text-green-700{color:rgb(21 128 61/1);}"],
  ["text-green-800", ".text-green-800{color:rgb(22 101 52/1);}"],
  ["text-green-900", ".text-green-900{color:rgb(20 83 45/1);}"],
  ["text-emerald-50", ".text-emerald-50{color:rgb(236 253 245/1);}"],
  ["text-emerald-100", ".text-emerald-100{color:rgb(209 250 229/1);}"],
  ["text-emerald-200", ".text-emerald-200{color:rgb(167 243 208/1);}"],
  ["text-emerald-300", ".text-emerald-300{color:rgb(110 231 183/1);}"],
  ["text-emerald-400", ".text-emerald-400{color:rgb(52 211 153/1);}"],
  ["text-emerald-500", ".text-emerald-500{color:rgb(16 185 129/1);}"],
  ["text-emerald-600", ".text-emerald-600{color:rgb(5 150 105/1);}"],
  ["text-emerald-700", ".text-emerald-700{color:rgb(4 120 87/1);}"],
  ["text-emerald-800", ".text-emerald-800{color:rgb(6 95 70/1);}"],
  ["text-emerald-900", ".text-emerald-900{color:rgb(6 78 59/1);}"],
  ["text-teal-50", ".text-teal-50{color:rgb(240 253 250/1);}"],
  ["text-teal-100", ".text-teal-100{color:rgb(204 251 241/1);}"],
  ["text-teal-200", ".text-teal-200{color:rgb(153 246 228/1);}"],
  ["text-teal-300", ".text-teal-300{color:rgb(94 234 212/1);}"],
  ["text-teal-400", ".text-teal-400{color:rgb(45 212 191/1);}"],
  ["text-teal-500", ".text-teal-500{color:rgb(20 184 166/1);}"],
  ["text-teal-600", ".text-teal-600{color:rgb(13 148 136/1);}"],
  ["text-teal-700", ".text-teal-700{color:rgb(15 118 110/1);}"],
  ["text-teal-800", ".text-teal-800{color:rgb(17 94 89/1);}"],
  ["text-teal-900", ".text-teal-900{color:rgb(19 78 74/1);}"],
  ["text-cyan-50", ".text-cyan-50{color:rgb(236 254 255/1);}"],
  ["text-cyan-100", ".text-cyan-100{color:rgb(207 250 254/1);}"],
  ["text-cyan-200", ".text-cyan-200{color:rgb(165 243 252/1);}"],
  ["text-cyan-300", ".text-cyan-300{color:rgb(103 232 249/1);}"],
  ["text-cyan-400", ".text-cyan-400{color:rgb(34 211 238/1);}"],
  ["text-cyan-500", ".text-cyan-500{color:rgb(6 182 212/1);}"],
  ["text-cyan-600", ".text-cyan-600{color:rgb(8 145 178/1);}"],
  ["text-cyan-700", ".text-cyan-700{color:rgb(14 116 144/1);}"],
  ["text-cyan-800", ".text-cyan-800{color:rgb(21 94 117/1);}"],
  ["text-cyan-900", ".text-cyan-900{color:rgb(22 78 99/1);}"],
  ["text-sky-50", ".text-sky-50{color:rgb(240 249 255/1);}"],
  ["text-sky-100", ".text-sky-100{color:rgb(224 242 254/1);}"],
  ["text-sky-200", ".text-sky-200{color:rgb(186 230 253/1);}"],
  ["text-sky-300", ".text-sky-300{color:rgb(125 211 252/1);}"],
  ["text-sky-400", ".text-sky-400{color:rgb(56 189 248/1);}"],
  ["text-sky-500", ".text-sky-500{color:rgb(14 165 233/1);}"],
  ["text-sky-600", ".text-sky-600{color:rgb(2 132 199/1);}"],
  ["text-sky-700", ".text-sky-700{color:rgb(3 105 161/1);}"],
  ["text-sky-800", ".text-sky-800{color:rgb(7 89 133/1);}"],
  ["text-sky-900", ".text-sky-900{color:rgb(12 74 110/1);}"],
  ["text-blue-50", ".text-blue-50{color:rgb(239 246 255/1);}"],
  ["text-blue-100", ".text-blue-100{color:rgb(219 234 254/1);}"],
  ["text-blue-200", ".text-blue-200{color:rgb(191 219 254/1);}"],
  ["text-blue-300", ".text-blue-300{color:rgb(147 197 253/1);}"],
  ["text-blue-400", ".text-blue-400{color:rgb(96 165 250/1);}"],
  ["text-blue-500", ".text-blue-500{color:rgb(59 130 246/1);}"],
  ["text-blue-600", ".text-blue-600{color:rgb(37 99 235/1);}"],
  ["text-blue-700", ".text-blue-700{color:rgb(29 78 216/1);}"],
  ["text-blue-800", ".text-blue-800{color:rgb(30 64 175/1);}"],
  ["text-blue-900", ".text-blue-900{color:rgb(30 58 138/1);}"],
  ["text-indigo-50", ".text-indigo-50{color:rgb(238 242 255/1);}"],
  ["text-indigo-100", ".text-indigo-100{color:rgb(224 231 255/1);}"],
  ["text-indigo-200", ".text-indigo-200{color:rgb(199 210 254/1);}"],
  ["text-indigo-300", ".text-indigo-300{color:rgb(165 180 252/1);}"],
  ["text-indigo-400", ".text-indigo-400{color:rgb(129 140 248/1);}"],
  ["text-indigo-500", ".text-indigo-500{color:rgb(99 102 241/1);}"],
  ["text-indigo-600", ".text-indigo-600{color:rgb(79 70 229/1);}"],
  ["text-indigo-700", ".text-indigo-700{color:rgb(67 56 202/1);}"],
  ["text-indigo-800", ".text-indigo-800{color:rgb(55 48 163/1);}"],
  ["text-indigo-900", ".text-indigo-900{color:rgb(49 46 129/1);}"],
  ["text-violet-50", ".text-violet-50{color:rgb(245 243 255/1);}"],
  ["text-violet-100", ".text-violet-100{color:rgb(237 233 254/1);}"],
  ["text-violet-200", ".text-violet-200{color:rgb(221 214 254/1);}"],
  ["text-violet-300", ".text-violet-300{color:rgb(196 181 253/1);}"],
  ["text-violet-400", ".text-violet-400{color:rgb(167 139 250/1);}"],
  ["text-violet-500", ".text-violet-500{color:rgb(139 92 246/1);}"],
  ["text-violet-600", ".text-violet-600{color:rgb(124 58 237/1);}"],
  ["text-violet-700", ".text-violet-700{color:rgb(109 40 217/1);}"],
  ["text-violet-800", ".text-violet-800{color:rgb(91 33 182/1);}"],
  ["text-violet-900", ".text-violet-900{color:rgb(76 29 149/1);}"],
  ["text-purple-50", ".text-purple-50{color:rgb(250 245 255/1);}"],
  ["text-purple-100", ".text-purple-100{color:rgb(243 232 255/1);}"],
  ["text-purple-200", ".text-purple-200{color:rgb(233 213 255/1);}"],
  ["text-purple-300", ".text-purple-300{color:rgb(216 180 254/1);}"],
  ["text-purple-400", ".text-purple-400{color:rgb(192 132 252/1);}"],
  ["text-purple-500", ".text-purple-500{color:rgb(168 85 247/1);}"],
  ["text-purple-600", ".text-purple-600{color:rgb(147 51 234/1);}"],
  ["text-purple-700", ".text-purple-700{color:rgb(126 34 206/1);}"],
  ["text-purple-800", ".text-purple-800{color:rgb(107 33 168/1);}"],
  ["text-purple-900", ".text-purple-900{color:rgb(88 28 135/1);}"],
  ["text-fuchsia-50", ".text-fuchsia-50{color:rgb(253 244 255/1);}"],
  ["text-fuchsia-100", ".text-fuchsia-100{color:rgb(250 232 255/1);}"],
  ["text-fuchsia-200", ".text-fuchsia-200{color:rgb(245 208 254/1);}"],
  ["text-fuchsia-300", ".text-fuchsia-300{color:rgb(240 171 252/1);}"],
  ["text-fuchsia-400", ".text-fuchsia-400{color:rgb(232 121 249/1);}"],
  ["text-fuchsia-500", ".text-fuchsia-500{color:rgb(217 70 239/1);}"],
  ["text-fuchsia-600", ".text-fuchsia-600{color:rgb(192 38 211/1);}"],
  ["text-fuchsia-700", ".text-fuchsia-700{color:rgb(162 28 175/1);}"],
  ["text-fuchsia-800", ".text-fuchsia-800{color:rgb(134 25 143/1);}"],
  ["text-fuchsia-900", ".text-fuchsia-900{color:rgb(112 26 117/1);}"],
  ["text-pink-50", ".text-pink-50{color:rgb(253 242 248/1);}"],
  ["text-pink-100", ".text-pink-100{color:rgb(252 231 243/1);}"],
  ["text-pink-200", ".text-pink-200{color:rgb(251 207 232/1);}"],
  ["text-pink-300", ".text-pink-300{color:rgb(249 168 212/1);}"],
  ["text-pink-400", ".text-pink-400{color:rgb(244 114 182/1);}"],
  ["text-pink-500", ".text-pink-500{color:rgb(236 72 153/1);}"],
  ["text-pink-600", ".text-pink-600{color:rgb(219 39 119/1);}"],
  ["text-pink-700", ".text-pink-700{color:rgb(190 24 93/1);}"],
  ["text-pink-800", ".text-pink-800{color:rgb(157 23 77/1);}"],
  ["text-pink-900", ".text-pink-900{color:rgb(131 24 67/1);}"],
  ["text-rose-50", ".text-rose-50{color:rgb(255 241 242/1);}"],
  ["text-rose-100", ".text-rose-100{color:rgb(255 228 230/1);}"],
  ["text-rose-200", ".text-rose-200{color:rgb(254 205 211/1);}"],
  ["text-rose-300", ".text-rose-300{color:rgb(253 164 175/1);}"],
  ["text-rose-400", ".text-rose-400{color:rgb(251 113 133/1);}"],
  ["text-rose-500", ".text-rose-500{color:rgb(244 63 94/1);}"],
  ["text-rose-600", ".text-rose-600{color:rgb(225 29 72/1);}"],
  ["text-rose-700", ".text-rose-700{color:rgb(190 18 60/1);}"],
  ["text-rose-800", ".text-rose-800{color:rgb(159 18 57/1);}"],
  ["text-rose-900", ".text-rose-900{color:rgb(136 19 55/1);}"],
  ["text-black/50", ".text-black\\/50{color:rgb(0 0 0/.5);}"],
  ["text-white/50", ".text-white\\/50{color:rgb(255 255 255/.5);}"],
  ["text-slate-50/50", ".text-slate-50\\/50{color:rgb(248 250 252/.5);}"],
  ["text-slate-100/50", ".text-slate-100\\/50{color:rgb(241 245 249/.5);}"],
  ["text-slate-200/50", ".text-slate-200\\/50{color:rgb(226 232 240/.5);}"],
  ["text-slate-300/50", ".text-slate-300\\/50{color:rgb(203 213 225/.5);}"],
  ["text-slate-400/50", ".text-slate-400\\/50{color:rgb(148 163 184/.5);}"],
  ["text-slate-500/50", ".text-slate-500\\/50{color:rgb(100 116 139/.5);}"],
  ["text-slate-600/50", ".text-slate-600\\/50{color:rgb(71 85 105/.5);}"],
  ["text-slate-700/50", ".text-slate-700\\/50{color:rgb(51 65 85/.5);}"],
  ["text-slate-800/50", ".text-slate-800\\/50{color:rgb(30 41 59/.5);}"],
  ["text-slate-900/50", ".text-slate-900\\/50{color:rgb(15 23 42/.5);}"],
  ["text-gray-50/50", ".text-gray-50\\/50{color:rgb(249 250 251/.5);}"],
  ["text-gray-100/50", ".text-gray-100\\/50{color:rgb(243 244 246/.5);}"],
  ["text-gray-200/50", ".text-gray-200\\/50{color:rgb(229 231 235/.5);}"],
  ["text-gray-300/50", ".text-gray-300\\/50{color:rgb(209 213 219/.5);}"],
  ["text-gray-400/50", ".text-gray-400\\/50{color:rgb(156 163 175/.5);}"],
  ["text-gray-500/50", ".text-gray-500\\/50{color:rgb(107 114 128/.5);}"],
  ["text-gray-600/50", ".text-gray-600\\/50{color:rgb(75 85 99/.5);}"],
  ["text-gray-700/50", ".text-gray-700\\/50{color:rgb(55 65 81/.5);}"],
  ["text-gray-800/50", ".text-gray-800\\/50{color:rgb(31 41 55/.5);}"],
  ["text-gray-900/50", ".text-gray-900\\/50{color:rgb(17 24 39/.5);}"],
  ["text-zinc-50/50", ".text-zinc-50\\/50{color:rgb(250 250 250/.5);}"],
  ["text-zinc-100/50", ".text-zinc-100\\/50{color:rgb(244 244 245/.5);}"],
  ["text-zinc-200/50", ".text-zinc-200\\/50{color:rgb(228 228 231/.5);}"],
  ["text-zinc-300/50", ".text-zinc-300\\/50{color:rgb(212 212 216/.5);}"],
  ["text-zinc-400/50", ".text-zinc-400\\/50{color:rgb(161 161 170/.5);}"],
  ["text-zinc-500/50", ".text-zinc-500\\/50{color:rgb(113 113 122/.5);}"],
  ["text-zinc-600/50", ".text-zinc-600\\/50{color:rgb(82 82 91/.5);}"],
  ["text-zinc-700/50", ".text-zinc-700\\/50{color:rgb(63 63 70/.5);}"],
  ["text-zinc-800/50", ".text-zinc-800\\/50{color:rgb(39 39 42/.5);}"],
  ["text-zinc-900/50", ".text-zinc-900\\/50{color:rgb(24 24 27/.5);}"],
  ["text-neutral-50/50", ".text-neutral-50\\/50{color:rgb(250 250 250/.5);}"],
  ["text-neutral-100/50", ".text-neutral-100\\/50{color:rgb(245 245 245/.5);}"],
  ["text-neutral-200/50", ".text-neutral-200\\/50{color:rgb(229 229 229/.5);}"],
  ["text-neutral-300/50", ".text-neutral-300\\/50{color:rgb(212 212 212/.5);}"],
  ["text-neutral-400/50", ".text-neutral-400\\/50{color:rgb(163 163 163/.5);}"],
  ["text-neutral-500/50", ".text-neutral-500\\/50{color:rgb(115 115 115/.5);}"],
  ["text-neutral-600/50", ".text-neutral-600\\/50{color:rgb(82 82 82/.5);}"],
  ["text-neutral-700/50", ".text-neutral-700\\/50{color:rgb(64 64 64/.5);}"],
  ["text-neutral-800/50", ".text-neutral-800\\/50{color:rgb(38 38 38/.5);}"],
  ["text-neutral-900/50", ".text-neutral-900\\/50{color:rgb(23 23 23/.5);}"],
  ["text-stone-50/50", ".text-stone-50\\/50{color:rgb(250 250 249/.5);}"],
  ["text-stone-100/50", ".text-stone-100\\/50{color:rgb(245 245 244/.5);}"],
  ["text-stone-200/50", ".text-stone-200\\/50{color:rgb(231 229 228/.5);}"],
  ["text-stone-300/50", ".text-stone-300\\/50{color:rgb(214 211 209/.5);}"],
  ["text-stone-400/50", ".text-stone-400\\/50{color:rgb(168 162 158/.5);}"],
  ["text-stone-500/50", ".text-stone-500\\/50{color:rgb(120 113 108/.5);}"],
  ["text-stone-600/50", ".text-stone-600\\/50{color:rgb(87 83 78/.5);}"],
  ["text-stone-700/50", ".text-stone-700\\/50{color:rgb(68 64 60/.5);}"],
  ["text-stone-800/50", ".text-stone-800\\/50{color:rgb(41 37 36/.5);}"],
  ["text-stone-900/50", ".text-stone-900\\/50{color:rgb(28 25 23/.5);}"],
  ["text-red-50/50", ".text-red-50\\/50{color:rgb(254 242 242/.5);}"],
  ["text-red-100/50", ".text-red-100\\/50{color:rgb(254 226 226/.5);}"],
  ["text-red-200/50", ".text-red-200\\/50{color:rgb(254 202 202/.5);}"],
  ["text-red-300/50", ".text-red-300\\/50{color:rgb(252 165 165/.5);}"],
  ["text-red-400/50", ".text-red-400\\/50{color:rgb(248 113 113/.5);}"],
  ["text-red-500/50", ".text-red-500\\/50{color:rgb(239 68 68/.5);}"],
  ["text-red-600/50", ".text-red-600\\/50{color:rgb(220 38 38/.5);}"],
  ["text-red-700/50", ".text-red-700\\/50{color:rgb(185 28 28/.5);}"],
  ["text-red-800/50", ".text-red-800\\/50{color:rgb(153 27 27/.5);}"],
  ["text-red-900/50", ".text-red-900\\/50{color:rgb(127 29 29/.5);}"],
  ["text-orange-50/50", ".text-orange-50\\/50{color:rgb(255 247 237/.5);}"],
  ["text-orange-100/50", ".text-orange-100\\/50{color:rgb(255 237 213/.5);}"],
  ["text-orange-200/50", ".text-orange-200\\/50{color:rgb(254 215 170/.5);}"],
  ["text-orange-300/50", ".text-orange-300\\/50{color:rgb(253 186 116/.5);}"],
  ["text-orange-400/50", ".text-orange-400\\/50{color:rgb(251 146 60/.5);}"],
  ["text-orange-500/50", ".text-orange-500\\/50{color:rgb(249 115 22/.5);}"],
  ["text-orange-600/50", ".text-orange-600\\/50{color:rgb(234 88 12/.5);}"],
  ["text-orange-700/50", ".text-orange-700\\/50{color:rgb(194 65 12/.5);}"],
  ["text-orange-800/50", ".text-orange-800\\/50{color:rgb(154 52 18/.5);}"],
  ["text-orange-900/50", ".text-orange-900\\/50{color:rgb(124 45 18/.5);}"],
  ["text-amber-50/50", ".text-amber-50\\/50{color:rgb(255 251 235/.5);}"],
  ["text-amber-100/50", ".text-amber-100\\/50{color:rgb(254 243 199/.5);}"],
  ["text-amber-200/50", ".text-amber-200\\/50{color:rgb(253 230 138/.5);}"],
  ["text-amber-300/50", ".text-amber-300\\/50{color:rgb(252 211 77/.5);}"],
  ["text-amber-400/50", ".text-amber-400\\/50{color:rgb(251 191 36/.5);}"],
  ["text-amber-500/50", ".text-amber-500\\/50{color:rgb(245 158 11/.5);}"],
  ["text-amber-600/50", ".text-amber-600\\/50{color:rgb(217 119 6/.5);}"],
  ["text-amber-700/50", ".text-amber-700\\/50{color:rgb(180 83 9/.5);}"],
  ["text-amber-800/50", ".text-amber-800\\/50{color:rgb(146 64 14/.5);}"],
  ["text-amber-900/50", ".text-amber-900\\/50{color:rgb(120 53 15/.5);}"],
  ["text-yellow-50/50", ".text-yellow-50\\/50{color:rgb(254 252 232/.5);}"],
  ["text-yellow-100/50", ".text-yellow-100\\/50{color:rgb(254 249 195/.5);}"],
  ["text-yellow-200/50", ".text-yellow-200\\/50{color:rgb(254 240 138/.5);}"],
  ["text-yellow-300/50", ".text-yellow-300\\/50{color:rgb(253 224 71/.5);}"],
  ["text-yellow-400/50", ".text-yellow-400\\/50{color:rgb(250 204 21/.5);}"],
  ["text-yellow-500/50", ".text-yellow-500\\/50{color:rgb(234 179 8/.5);}"],
  ["text-yellow-600/50", ".text-yellow-600\\/50{color:rgb(202 138 4/.5);}"],
  ["text-yellow-700/50", ".text-yellow-700\\/50{color:rgb(161 98 7/.5);}"],
  ["text-yellow-800/50", ".text-yellow-800\\/50{color:rgb(133 77 14/.5);}"],
  ["text-yellow-900/50", ".text-yellow-900\\/50{color:rgb(113 63 18/.5);}"],
  ["text-lime-50/50", ".text-lime-50\\/50{color:rgb(247 254 231/.5);}"],
  ["text-lime-100/50", ".text-lime-100\\/50{color:rgb(236 252 203/.5);}"],
  ["text-lime-200/50", ".text-lime-200\\/50{color:rgb(217 249 157/.5);}"],
  ["text-lime-300/50", ".text-lime-300\\/50{color:rgb(190 242 100/.5);}"],
  ["text-lime-400/50", ".text-lime-400\\/50{color:rgb(163 230 53/.5);}"],
  ["text-lime-500/50", ".text-lime-500\\/50{color:rgb(132 204 22/.5);}"],
  ["text-lime-600/50", ".text-lime-600\\/50{color:rgb(101 163 13/.5);}"],
  ["text-lime-700/50", ".text-lime-700\\/50{color:rgb(77 124 15/.5);}"],
  ["text-lime-800/50", ".text-lime-800\\/50{color:rgb(63 98 18/.5);}"],
  ["text-lime-900/50", ".text-lime-900\\/50{color:rgb(54 83 20/.5);}"],
  ["text-green-50/50", ".text-green-50\\/50{color:rgb(240 253 244/.5);}"],
  ["text-green-100/50", ".text-green-100\\/50{color:rgb(220 252 231/.5);}"],
  ["text-green-200/50", ".text-green-200\\/50{color:rgb(187 247 208/.5);}"],
  ["text-green-300/50", ".text-green-300\\/50{color:rgb(134 239 172/.5);}"],
  ["text-green-400/50", ".text-green-400\\/50{color:rgb(74 222 128/.5);}"],
  ["text-green-500/50", ".text-green-500\\/50{color:rgb(34 197 94/.5);}"],
  ["text-green-600/50", ".text-green-600\\/50{color:rgb(22 163 74/.5);}"],
  ["text-green-700/50", ".text-green-700\\/50{color:rgb(21 128 61/.5);}"],
  ["text-green-800/50", ".text-green-800\\/50{color:rgb(22 101 52/.5);}"],
  ["text-green-900/50", ".text-green-900\\/50{color:rgb(20 83 45/.5);}"],
  ["text-emerald-50/50", ".text-emerald-50\\/50{color:rgb(236 253 245/.5);}"],
  ["text-emerald-100/50", ".text-emerald-100\\/50{color:rgb(209 250 229/.5);}"],
  ["text-emerald-200/50", ".text-emerald-200\\/50{color:rgb(167 243 208/.5);}"],
  ["text-emerald-300/50", ".text-emerald-300\\/50{color:rgb(110 231 183/.5);}"],
  ["text-emerald-400/50", ".text-emerald-400\\/50{color:rgb(52 211 153/.5);}"],
  ["text-emerald-500/50", ".text-emerald-500\\/50{color:rgb(16 185 129/.5);}"],
  ["text-emerald-600/50", ".text-emerald-600\\/50{color:rgb(5 150 105/.5);}"],
  ["text-emerald-700/50", ".text-emerald-700\\/50{color:rgb(4 120 87/.5);}"],
  ["text-emerald-800/50", ".text-emerald-800\\/50{color:rgb(6 95 70/.5);}"],
  ["text-emerald-900/50", ".text-emerald-900\\/50{color:rgb(6 78 59/.5);}"],
  ["text-teal-50/50", ".text-teal-50\\/50{color:rgb(240 253 250/.5);}"],
  ["text-teal-100/50", ".text-teal-100\\/50{color:rgb(204 251 241/.5);}"],
  ["text-teal-200/50", ".text-teal-200\\/50{color:rgb(153 246 228/.5);}"],
  ["text-teal-300/50", ".text-teal-300\\/50{color:rgb(94 234 212/.5);}"],
  ["text-teal-400/50", ".text-teal-400\\/50{color:rgb(45 212 191/.5);}"],
  ["text-teal-500/50", ".text-teal-500\\/50{color:rgb(20 184 166/.5);}"],
  ["text-teal-600/50", ".text-teal-600\\/50{color:rgb(13 148 136/.5);}"],
  ["text-teal-700/50", ".text-teal-700\\/50{color:rgb(15 118 110/.5);}"],
  ["text-teal-800/50", ".text-teal-800\\/50{color:rgb(17 94 89/.5);}"],
  ["text-teal-900/50", ".text-teal-900\\/50{color:rgb(19 78 74/.5);}"],
  ["text-cyan-50/50", ".text-cyan-50\\/50{color:rgb(236 254 255/.5);}"],
  ["text-cyan-100/50", ".text-cyan-100\\/50{color:rgb(207 250 254/.5);}"],
  ["text-cyan-200/50", ".text-cyan-200\\/50{color:rgb(165 243 252/.5);}"],
  ["text-cyan-300/50", ".text-cyan-300\\/50{color:rgb(103 232 249/.5);}"],
  ["text-cyan-400/50", ".text-cyan-400\\/50{color:rgb(34 211 238/.5);}"],
  ["text-cyan-500/50", ".text-cyan-500\\/50{color:rgb(6 182 212/.5);}"],
  ["text-cyan-600/50", ".text-cyan-600\\/50{color:rgb(8 145 178/.5);}"],
  ["text-cyan-700/50", ".text-cyan-700\\/50{color:rgb(14 116 144/.5);}"],
  ["text-cyan-800/50", ".text-cyan-800\\/50{color:rgb(21 94 117/.5);}"],
  ["text-cyan-900/50", ".text-cyan-900\\/50{color:rgb(22 78 99/.5);}"],
  ["text-sky-50/50", ".text-sky-50\\/50{color:rgb(240 249 255/.5);}"],
  ["text-sky-100/50", ".text-sky-100\\/50{color:rgb(224 242 254/.5);}"],
  ["text-sky-200/50", ".text-sky-200\\/50{color:rgb(186 230 253/.5);}"],
  ["text-sky-300/50", ".text-sky-300\\/50{color:rgb(125 211 252/.5);}"],
  ["text-sky-400/50", ".text-sky-400\\/50{color:rgb(56 189 248/.5);}"],
  ["text-sky-500/50", ".text-sky-500\\/50{color:rgb(14 165 233/.5);}"],
  ["text-sky-600/50", ".text-sky-600\\/50{color:rgb(2 132 199/.5);}"],
  ["text-sky-700/50", ".text-sky-700\\/50{color:rgb(3 105 161/.5);}"],
  ["text-sky-800/50", ".text-sky-800\\/50{color:rgb(7 89 133/.5);}"],
  ["text-sky-900/50", ".text-sky-900\\/50{color:rgb(12 74 110/.5);}"],
  ["text-blue-50/50", ".text-blue-50\\/50{color:rgb(239 246 255/.5);}"],
  ["text-blue-100/50", ".text-blue-100\\/50{color:rgb(219 234 254/.5);}"],
  ["text-blue-200/50", ".text-blue-200\\/50{color:rgb(191 219 254/.5);}"],
  ["text-blue-300/50", ".text-blue-300\\/50{color:rgb(147 197 253/.5);}"],
  ["text-blue-400/50", ".text-blue-400\\/50{color:rgb(96 165 250/.5);}"],
  ["text-blue-500/50", ".text-blue-500\\/50{color:rgb(59 130 246/.5);}"],
  ["text-blue-600/50", ".text-blue-600\\/50{color:rgb(37 99 235/.5);}"],
  ["text-blue-700/50", ".text-blue-700\\/50{color:rgb(29 78 216/.5);}"],
  ["text-blue-800/50", ".text-blue-800\\/50{color:rgb(30 64 175/.5);}"],
  ["text-blue-900/50", ".text-blue-900\\/50{color:rgb(30 58 138/.5);}"],
  ["text-indigo-50/50", ".text-indigo-50\\/50{color:rgb(238 242 255/.5);}"],
  ["text-indigo-100/50", ".text-indigo-100\\/50{color:rgb(224 231 255/.5);}"],
  ["text-indigo-200/50", ".text-indigo-200\\/50{color:rgb(199 210 254/.5);}"],
  ["text-indigo-300/50", ".text-indigo-300\\/50{color:rgb(165 180 252/.5);}"],
  ["text-indigo-400/50", ".text-indigo-400\\/50{color:rgb(129 140 248/.5);}"],
  ["text-indigo-500/50", ".text-indigo-500\\/50{color:rgb(99 102 241/.5);}"],
  ["text-indigo-600/50", ".text-indigo-600\\/50{color:rgb(79 70 229/.5);}"],
  ["text-indigo-700/50", ".text-indigo-700\\/50{color:rgb(67 56 202/.5);}"],
  ["text-indigo-800/50", ".text-indigo-800\\/50{color:rgb(55 48 163/.5);}"],
  ["text-indigo-900/50", ".text-indigo-900\\/50{color:rgb(49 46 129/.5);}"],
  ["text-violet-50/50", ".text-violet-50\\/50{color:rgb(245 243 255/.5);}"],
  ["text-violet-100/50", ".text-violet-100\\/50{color:rgb(237 233 254/.5);}"],
  ["text-violet-200/50", ".text-violet-200\\/50{color:rgb(221 214 254/.5);}"],
  ["text-violet-300/50", ".text-violet-300\\/50{color:rgb(196 181 253/.5);}"],
  ["text-violet-400/50", ".text-violet-400\\/50{color:rgb(167 139 250/.5);}"],
  ["text-violet-500/50", ".text-violet-500\\/50{color:rgb(139 92 246/.5);}"],
  ["text-violet-600/50", ".text-violet-600\\/50{color:rgb(124 58 237/.5);}"],
  ["text-violet-700/50", ".text-violet-700\\/50{color:rgb(109 40 217/.5);}"],
  ["text-violet-800/50", ".text-violet-800\\/50{color:rgb(91 33 182/.5);}"],
  ["text-violet-900/50", ".text-violet-900\\/50{color:rgb(76 29 149/.5);}"],
  ["text-purple-50/50", ".text-purple-50\\/50{color:rgb(250 245 255/.5);}"],
  ["text-purple-100/50", ".text-purple-100\\/50{color:rgb(243 232 255/.5);}"],
  ["text-purple-200/50", ".text-purple-200\\/50{color:rgb(233 213 255/.5);}"],
  ["text-purple-300/50", ".text-purple-300\\/50{color:rgb(216 180 254/.5);}"],
  ["text-purple-400/50", ".text-purple-400\\/50{color:rgb(192 132 252/.5);}"],
  ["text-purple-500/50", ".text-purple-500\\/50{color:rgb(168 85 247/.5);}"],
  ["text-purple-600/50", ".text-purple-600\\/50{color:rgb(147 51 234/.5);}"],
  ["text-purple-700/50", ".text-purple-700\\/50{color:rgb(126 34 206/.5);}"],
  ["text-purple-800/50", ".text-purple-800\\/50{color:rgb(107 33 168/.5);}"],
  ["text-purple-900/50", ".text-purple-900\\/50{color:rgb(88 28 135/.5);}"],
  ["text-fuchsia-50/50", ".text-fuchsia-50\\/50{color:rgb(253 244 255/.5);}"],
  ["text-fuchsia-100/50", ".text-fuchsia-100\\/50{color:rgb(250 232 255/.5);}"],
  ["text-fuchsia-200/50", ".text-fuchsia-200\\/50{color:rgb(245 208 254/.5);}"],
  ["text-fuchsia-300/50", ".text-fuchsia-300\\/50{color:rgb(240 171 252/.5);}"],
  ["text-fuchsia-400/50", ".text-fuchsia-400\\/50{color:rgb(232 121 249/.5);}"],
  ["text-fuchsia-500/50", ".text-fuchsia-500\\/50{color:rgb(217 70 239/.5);}"],
  ["text-fuchsia-600/50", ".text-fuchsia-600\\/50{color:rgb(192 38 211/.5);}"],
  ["text-fuchsia-700/50", ".text-fuchsia-700\\/50{color:rgb(162 28 175/.5);}"],
  ["text-fuchsia-800/50", ".text-fuchsia-800\\/50{color:rgb(134 25 143/.5);}"],
  ["text-fuchsia-900/50", ".text-fuchsia-900\\/50{color:rgb(112 26 117/.5);}"],
  ["text-pink-50/50", ".text-pink-50\\/50{color:rgb(253 242 248/.5);}"],
  ["text-pink-100/50", ".text-pink-100\\/50{color:rgb(252 231 243/.5);}"],
  ["text-pink-200/50", ".text-pink-200\\/50{color:rgb(251 207 232/.5);}"],
  ["text-pink-300/50", ".text-pink-300\\/50{color:rgb(249 168 212/.5);}"],
  ["text-pink-400/50", ".text-pink-400\\/50{color:rgb(244 114 182/.5);}"],
  ["text-pink-500/50", ".text-pink-500\\/50{color:rgb(236 72 153/.5);}"],
  ["text-pink-600/50", ".text-pink-600\\/50{color:rgb(219 39 119/.5);}"],
  ["text-pink-700/50", ".text-pink-700\\/50{color:rgb(190 24 93/.5);}"],
  ["text-pink-800/50", ".text-pink-800\\/50{color:rgb(157 23 77/.5);}"],
  ["text-pink-900/50", ".text-pink-900\\/50{color:rgb(131 24 67/.5);}"],
  ["text-rose-50/50", ".text-rose-50\\/50{color:rgb(255 241 242/.5);}"],
  ["text-rose-100/50", ".text-rose-100\\/50{color:rgb(255 228 230/.5);}"],
  ["text-rose-200/50", ".text-rose-200\\/50{color:rgb(254 205 211/.5);}"],
  ["text-rose-300/50", ".text-rose-300\\/50{color:rgb(253 164 175/.5);}"],
  ["text-rose-400/50", ".text-rose-400\\/50{color:rgb(251 113 133/.5);}"],
  ["text-rose-500/50", ".text-rose-500\\/50{color:rgb(244 63 94/.5);}"],
  ["text-rose-600/50", ".text-rose-600\\/50{color:rgb(225 29 72/.5);}"],
  ["text-rose-700/50", ".text-rose-700\\/50{color:rgb(190 18 60/.5);}"],
  ["text-rose-800/50", ".text-rose-800\\/50{color:rgb(159 18 57/.5);}"],
  ["text-rose-900/50", ".text-rose-900\\/50{color:rgb(136 19 55/.5);}"],
  ["text-inherit/[1%]", ""],
  ["text-current/[1%]", ""],
  ["text-transparent/[1%]", ""],
  ["text-black/[1%]", ".text-black\\/\\[1\\%\\]{color:rgb(0 0 0/1%);}"],
  ["text-white/[1%]", ".text-white\\/\\[1\\%\\]{color:rgb(255 255 255/1%);}"],
  [
    "text-slate-50/[1%]",
    ".text-slate-50\\/\\[1\\%\\]{color:rgb(248 250 252/1%);}",
  ],
  [
    "text-slate-100/[1%]",
    ".text-slate-100\\/\\[1\\%\\]{color:rgb(241 245 249/1%);}",
  ],
  [
    "text-slate-200/[1%]",
    ".text-slate-200\\/\\[1\\%\\]{color:rgb(226 232 240/1%);}",
  ],
  [
    "text-slate-300/[1%]",
    ".text-slate-300\\/\\[1\\%\\]{color:rgb(203 213 225/1%);}",
  ],
  [
    "text-slate-400/[1%]",
    ".text-slate-400\\/\\[1\\%\\]{color:rgb(148 163 184/1%);}",
  ],
  [
    "text-slate-500/[1%]",
    ".text-slate-500\\/\\[1\\%\\]{color:rgb(100 116 139/1%);}",
  ],
  [
    "text-slate-600/[1%]",
    ".text-slate-600\\/\\[1\\%\\]{color:rgb(71 85 105/1%);}",
  ],
  [
    "text-slate-700/[1%]",
    ".text-slate-700\\/\\[1\\%\\]{color:rgb(51 65 85/1%);}",
  ],
  [
    "text-slate-800/[1%]",
    ".text-slate-800\\/\\[1\\%\\]{color:rgb(30 41 59/1%);}",
  ],
  [
    "text-slate-900/[1%]",
    ".text-slate-900\\/\\[1\\%\\]{color:rgb(15 23 42/1%);}",
  ],
  [
    "text-gray-50/[1%]",
    ".text-gray-50\\/\\[1\\%\\]{color:rgb(249 250 251/1%);}",
  ],
  [
    "text-gray-100/[1%]",
    ".text-gray-100\\/\\[1\\%\\]{color:rgb(243 244 246/1%);}",
  ],
  [
    "text-gray-200/[1%]",
    ".text-gray-200\\/\\[1\\%\\]{color:rgb(229 231 235/1%);}",
  ],
  [
    "text-gray-300/[1%]",
    ".text-gray-300\\/\\[1\\%\\]{color:rgb(209 213 219/1%);}",
  ],
  [
    "text-gray-400/[1%]",
    ".text-gray-400\\/\\[1\\%\\]{color:rgb(156 163 175/1%);}",
  ],
  [
    "text-gray-500/[1%]",
    ".text-gray-500\\/\\[1\\%\\]{color:rgb(107 114 128/1%);}",
  ],
  [
    "text-gray-600/[1%]",
    ".text-gray-600\\/\\[1\\%\\]{color:rgb(75 85 99/1%);}",
  ],
  [
    "text-gray-700/[1%]",
    ".text-gray-700\\/\\[1\\%\\]{color:rgb(55 65 81/1%);}",
  ],
  [
    "text-gray-800/[1%]",
    ".text-gray-800\\/\\[1\\%\\]{color:rgb(31 41 55/1%);}",
  ],
  [
    "text-gray-900/[1%]",
    ".text-gray-900\\/\\[1\\%\\]{color:rgb(17 24 39/1%);}",
  ],
  [
    "text-zinc-50/[1%]",
    ".text-zinc-50\\/\\[1\\%\\]{color:rgb(250 250 250/1%);}",
  ],
  [
    "text-zinc-100/[1%]",
    ".text-zinc-100\\/\\[1\\%\\]{color:rgb(244 244 245/1%);}",
  ],
  [
    "text-zinc-200/[1%]",
    ".text-zinc-200\\/\\[1\\%\\]{color:rgb(228 228 231/1%);}",
  ],
  [
    "text-zinc-300/[1%]",
    ".text-zinc-300\\/\\[1\\%\\]{color:rgb(212 212 216/1%);}",
  ],
  [
    "text-zinc-400/[1%]",
    ".text-zinc-400\\/\\[1\\%\\]{color:rgb(161 161 170/1%);}",
  ],
  [
    "text-zinc-500/[1%]",
    ".text-zinc-500\\/\\[1\\%\\]{color:rgb(113 113 122/1%);}",
  ],
  [
    "text-zinc-600/[1%]",
    ".text-zinc-600\\/\\[1\\%\\]{color:rgb(82 82 91/1%);}",
  ],
  [
    "text-zinc-700/[1%]",
    ".text-zinc-700\\/\\[1\\%\\]{color:rgb(63 63 70/1%);}",
  ],
  [
    "text-zinc-800/[1%]",
    ".text-zinc-800\\/\\[1\\%\\]{color:rgb(39 39 42/1%);}",
  ],
  [
    "text-zinc-900/[1%]",
    ".text-zinc-900\\/\\[1\\%\\]{color:rgb(24 24 27/1%);}",
  ],
  [
    "text-neutral-50/[1%]",
    ".text-neutral-50\\/\\[1\\%\\]{color:rgb(250 250 250/1%);}",
  ],
  [
    "text-neutral-100/[1%]",
    ".text-neutral-100\\/\\[1\\%\\]{color:rgb(245 245 245/1%);}",
  ],
  [
    "text-neutral-200/[1%]",
    ".text-neutral-200\\/\\[1\\%\\]{color:rgb(229 229 229/1%);}",
  ],
  [
    "text-neutral-300/[1%]",
    ".text-neutral-300\\/\\[1\\%\\]{color:rgb(212 212 212/1%);}",
  ],
  [
    "text-neutral-400/[1%]",
    ".text-neutral-400\\/\\[1\\%\\]{color:rgb(163 163 163/1%);}",
  ],
  [
    "text-neutral-500/[1%]",
    ".text-neutral-500\\/\\[1\\%\\]{color:rgb(115 115 115/1%);}",
  ],
  [
    "text-neutral-600/[1%]",
    ".text-neutral-600\\/\\[1\\%\\]{color:rgb(82 82 82/1%);}",
  ],
  [
    "text-neutral-700/[1%]",
    ".text-neutral-700\\/\\[1\\%\\]{color:rgb(64 64 64/1%);}",
  ],
  [
    "text-neutral-800/[1%]",
    ".text-neutral-800\\/\\[1\\%\\]{color:rgb(38 38 38/1%);}",
  ],
  [
    "text-neutral-900/[1%]",
    ".text-neutral-900\\/\\[1\\%\\]{color:rgb(23 23 23/1%);}",
  ],
  [
    "text-stone-50/[1%]",
    ".text-stone-50\\/\\[1\\%\\]{color:rgb(250 250 249/1%);}",
  ],
  [
    "text-stone-100/[1%]",
    ".text-stone-100\\/\\[1\\%\\]{color:rgb(245 245 244/1%);}",
  ],
  [
    "text-stone-200/[1%]",
    ".text-stone-200\\/\\[1\\%\\]{color:rgb(231 229 228/1%);}",
  ],
  [
    "text-stone-300/[1%]",
    ".text-stone-300\\/\\[1\\%\\]{color:rgb(214 211 209/1%);}",
  ],
  [
    "text-stone-400/[1%]",
    ".text-stone-400\\/\\[1\\%\\]{color:rgb(168 162 158/1%);}",
  ],
  [
    "text-stone-500/[1%]",
    ".text-stone-500\\/\\[1\\%\\]{color:rgb(120 113 108/1%);}",
  ],
  [
    "text-stone-600/[1%]",
    ".text-stone-600\\/\\[1\\%\\]{color:rgb(87 83 78/1%);}",
  ],
  [
    "text-stone-700/[1%]",
    ".text-stone-700\\/\\[1\\%\\]{color:rgb(68 64 60/1%);}",
  ],
  [
    "text-stone-800/[1%]",
    ".text-stone-800\\/\\[1\\%\\]{color:rgb(41 37 36/1%);}",
  ],
  [
    "text-stone-900/[1%]",
    ".text-stone-900\\/\\[1\\%\\]{color:rgb(28 25 23/1%);}",
  ],
  ["text-red-50/[1%]", ".text-red-50\\/\\[1\\%\\]{color:rgb(254 242 242/1%);}"],
  [
    "text-red-100/[1%]",
    ".text-red-100\\/\\[1\\%\\]{color:rgb(254 226 226/1%);}",
  ],
  [
    "text-red-200/[1%]",
    ".text-red-200\\/\\[1\\%\\]{color:rgb(254 202 202/1%);}",
  ],
  [
    "text-red-300/[1%]",
    ".text-red-300\\/\\[1\\%\\]{color:rgb(252 165 165/1%);}",
  ],
  [
    "text-red-400/[1%]",
    ".text-red-400\\/\\[1\\%\\]{color:rgb(248 113 113/1%);}",
  ],
  ["text-red-500/[1%]", ".text-red-500\\/\\[1\\%\\]{color:rgb(239 68 68/1%);}"],
  ["text-red-600/[1%]", ".text-red-600\\/\\[1\\%\\]{color:rgb(220 38 38/1%);}"],
  ["text-red-700/[1%]", ".text-red-700\\/\\[1\\%\\]{color:rgb(185 28 28/1%);}"],
  ["text-red-800/[1%]", ".text-red-800\\/\\[1\\%\\]{color:rgb(153 27 27/1%);}"],
  ["text-red-900/[1%]", ".text-red-900\\/\\[1\\%\\]{color:rgb(127 29 29/1%);}"],
  [
    "text-orange-50/[1%]",
    ".text-orange-50\\/\\[1\\%\\]{color:rgb(255 247 237/1%);}",
  ],
  [
    "text-orange-100/[1%]",
    ".text-orange-100\\/\\[1\\%\\]{color:rgb(255 237 213/1%);}",
  ],
  [
    "text-orange-200/[1%]",
    ".text-orange-200\\/\\[1\\%\\]{color:rgb(254 215 170/1%);}",
  ],
  [
    "text-orange-300/[1%]",
    ".text-orange-300\\/\\[1\\%\\]{color:rgb(253 186 116/1%);}",
  ],
  [
    "text-orange-400/[1%]",
    ".text-orange-400\\/\\[1\\%\\]{color:rgb(251 146 60/1%);}",
  ],
  [
    "text-orange-500/[1%]",
    ".text-orange-500\\/\\[1\\%\\]{color:rgb(249 115 22/1%);}",
  ],
  [
    "text-orange-600/[1%]",
    ".text-orange-600\\/\\[1\\%\\]{color:rgb(234 88 12/1%);}",
  ],
  [
    "text-orange-700/[1%]",
    ".text-orange-700\\/\\[1\\%\\]{color:rgb(194 65 12/1%);}",
  ],
  [
    "text-orange-800/[1%]",
    ".text-orange-800\\/\\[1\\%\\]{color:rgb(154 52 18/1%);}",
  ],
  [
    "text-orange-900/[1%]",
    ".text-orange-900\\/\\[1\\%\\]{color:rgb(124 45 18/1%);}",
  ],
  [
    "text-amber-50/[1%]",
    ".text-amber-50\\/\\[1\\%\\]{color:rgb(255 251 235/1%);}",
  ],
  [
    "text-amber-100/[1%]",
    ".text-amber-100\\/\\[1\\%\\]{color:rgb(254 243 199/1%);}",
  ],
  [
    "text-amber-200/[1%]",
    ".text-amber-200\\/\\[1\\%\\]{color:rgb(253 230 138/1%);}",
  ],
  [
    "text-amber-300/[1%]",
    ".text-amber-300\\/\\[1\\%\\]{color:rgb(252 211 77/1%);}",
  ],
  [
    "text-amber-400/[1%]",
    ".text-amber-400\\/\\[1\\%\\]{color:rgb(251 191 36/1%);}",
  ],
  [
    "text-amber-500/[1%]",
    ".text-amber-500\\/\\[1\\%\\]{color:rgb(245 158 11/1%);}",
  ],
  [
    "text-amber-600/[1%]",
    ".text-amber-600\\/\\[1\\%\\]{color:rgb(217 119 6/1%);}",
  ],
  [
    "text-amber-700/[1%]",
    ".text-amber-700\\/\\[1\\%\\]{color:rgb(180 83 9/1%);}",
  ],
  [
    "text-amber-800/[1%]",
    ".text-amber-800\\/\\[1\\%\\]{color:rgb(146 64 14/1%);}",
  ],
  [
    "text-amber-900/[1%]",
    ".text-amber-900\\/\\[1\\%\\]{color:rgb(120 53 15/1%);}",
  ],
  [
    "text-yellow-50/[1%]",
    ".text-yellow-50\\/\\[1\\%\\]{color:rgb(254 252 232/1%);}",
  ],
  [
    "text-yellow-100/[1%]",
    ".text-yellow-100\\/\\[1\\%\\]{color:rgb(254 249 195/1%);}",
  ],
  [
    "text-yellow-200/[1%]",
    ".text-yellow-200\\/\\[1\\%\\]{color:rgb(254 240 138/1%);}",
  ],
  [
    "text-yellow-300/[1%]",
    ".text-yellow-300\\/\\[1\\%\\]{color:rgb(253 224 71/1%);}",
  ],
  [
    "text-yellow-400/[1%]",
    ".text-yellow-400\\/\\[1\\%\\]{color:rgb(250 204 21/1%);}",
  ],
  [
    "text-yellow-500/[1%]",
    ".text-yellow-500\\/\\[1\\%\\]{color:rgb(234 179 8/1%);}",
  ],
  [
    "text-yellow-600/[1%]",
    ".text-yellow-600\\/\\[1\\%\\]{color:rgb(202 138 4/1%);}",
  ],
  [
    "text-yellow-700/[1%]",
    ".text-yellow-700\\/\\[1\\%\\]{color:rgb(161 98 7/1%);}",
  ],
  [
    "text-yellow-800/[1%]",
    ".text-yellow-800\\/\\[1\\%\\]{color:rgb(133 77 14/1%);}",
  ],
  [
    "text-yellow-900/[1%]",
    ".text-yellow-900\\/\\[1\\%\\]{color:rgb(113 63 18/1%);}",
  ],
  [
    "text-lime-50/[1%]",
    ".text-lime-50\\/\\[1\\%\\]{color:rgb(247 254 231/1%);}",
  ],
  [
    "text-lime-100/[1%]",
    ".text-lime-100\\/\\[1\\%\\]{color:rgb(236 252 203/1%);}",
  ],
  [
    "text-lime-200/[1%]",
    ".text-lime-200\\/\\[1\\%\\]{color:rgb(217 249 157/1%);}",
  ],
  [
    "text-lime-300/[1%]",
    ".text-lime-300\\/\\[1\\%\\]{color:rgb(190 242 100/1%);}",
  ],
  [
    "text-lime-400/[1%]",
    ".text-lime-400\\/\\[1\\%\\]{color:rgb(163 230 53/1%);}",
  ],
  [
    "text-lime-500/[1%]",
    ".text-lime-500\\/\\[1\\%\\]{color:rgb(132 204 22/1%);}",
  ],
  [
    "text-lime-600/[1%]",
    ".text-lime-600\\/\\[1\\%\\]{color:rgb(101 163 13/1%);}",
  ],
  [
    "text-lime-700/[1%]",
    ".text-lime-700\\/\\[1\\%\\]{color:rgb(77 124 15/1%);}",
  ],
  [
    "text-lime-800/[1%]",
    ".text-lime-800\\/\\[1\\%\\]{color:rgb(63 98 18/1%);}",
  ],
  [
    "text-lime-900/[1%]",
    ".text-lime-900\\/\\[1\\%\\]{color:rgb(54 83 20/1%);}",
  ],
  [
    "text-green-50/[1%]",
    ".text-green-50\\/\\[1\\%\\]{color:rgb(240 253 244/1%);}",
  ],
  [
    "text-green-100/[1%]",
    ".text-green-100\\/\\[1\\%\\]{color:rgb(220 252 231/1%);}",
  ],
  [
    "text-green-200/[1%]",
    ".text-green-200\\/\\[1\\%\\]{color:rgb(187 247 208/1%);}",
  ],
  [
    "text-green-300/[1%]",
    ".text-green-300\\/\\[1\\%\\]{color:rgb(134 239 172/1%);}",
  ],
  [
    "text-green-400/[1%]",
    ".text-green-400\\/\\[1\\%\\]{color:rgb(74 222 128/1%);}",
  ],
  [
    "text-green-500/[1%]",
    ".text-green-500\\/\\[1\\%\\]{color:rgb(34 197 94/1%);}",
  ],
  [
    "text-green-600/[1%]",
    ".text-green-600\\/\\[1\\%\\]{color:rgb(22 163 74/1%);}",
  ],
  [
    "text-green-700/[1%]",
    ".text-green-700\\/\\[1\\%\\]{color:rgb(21 128 61/1%);}",
  ],
  [
    "text-green-800/[1%]",
    ".text-green-800\\/\\[1\\%\\]{color:rgb(22 101 52/1%);}",
  ],
  [
    "text-green-900/[1%]",
    ".text-green-900\\/\\[1\\%\\]{color:rgb(20 83 45/1%);}",
  ],
  [
    "text-emerald-50/[1%]",
    ".text-emerald-50\\/\\[1\\%\\]{color:rgb(236 253 245/1%);}",
  ],
  [
    "text-emerald-100/[1%]",
    ".text-emerald-100\\/\\[1\\%\\]{color:rgb(209 250 229/1%);}",
  ],
  [
    "text-emerald-200/[1%]",
    ".text-emerald-200\\/\\[1\\%\\]{color:rgb(167 243 208/1%);}",
  ],
  [
    "text-emerald-300/[1%]",
    ".text-emerald-300\\/\\[1\\%\\]{color:rgb(110 231 183/1%);}",
  ],
  [
    "text-emerald-400/[1%]",
    ".text-emerald-400\\/\\[1\\%\\]{color:rgb(52 211 153/1%);}",
  ],
  [
    "text-emerald-500/[1%]",
    ".text-emerald-500\\/\\[1\\%\\]{color:rgb(16 185 129/1%);}",
  ],
  [
    "text-emerald-600/[1%]",
    ".text-emerald-600\\/\\[1\\%\\]{color:rgb(5 150 105/1%);}",
  ],
  [
    "text-emerald-700/[1%]",
    ".text-emerald-700\\/\\[1\\%\\]{color:rgb(4 120 87/1%);}",
  ],
  [
    "text-emerald-800/[1%]",
    ".text-emerald-800\\/\\[1\\%\\]{color:rgb(6 95 70/1%);}",
  ],
  [
    "text-emerald-900/[1%]",
    ".text-emerald-900\\/\\[1\\%\\]{color:rgb(6 78 59/1%);}",
  ],
  [
    "text-teal-50/[1%]",
    ".text-teal-50\\/\\[1\\%\\]{color:rgb(240 253 250/1%);}",
  ],
  [
    "text-teal-100/[1%]",
    ".text-teal-100\\/\\[1\\%\\]{color:rgb(204 251 241/1%);}",
  ],
  [
    "text-teal-200/[1%]",
    ".text-teal-200\\/\\[1\\%\\]{color:rgb(153 246 228/1%);}",
  ],
  [
    "text-teal-300/[1%]",
    ".text-teal-300\\/\\[1\\%\\]{color:rgb(94 234 212/1%);}",
  ],
  [
    "text-teal-400/[1%]",
    ".text-teal-400\\/\\[1\\%\\]{color:rgb(45 212 191/1%);}",
  ],
  [
    "text-teal-500/[1%]",
    ".text-teal-500\\/\\[1\\%\\]{color:rgb(20 184 166/1%);}",
  ],
  [
    "text-teal-600/[1%]",
    ".text-teal-600\\/\\[1\\%\\]{color:rgb(13 148 136/1%);}",
  ],
  [
    "text-teal-700/[1%]",
    ".text-teal-700\\/\\[1\\%\\]{color:rgb(15 118 110/1%);}",
  ],
  [
    "text-teal-800/[1%]",
    ".text-teal-800\\/\\[1\\%\\]{color:rgb(17 94 89/1%);}",
  ],
  [
    "text-teal-900/[1%]",
    ".text-teal-900\\/\\[1\\%\\]{color:rgb(19 78 74/1%);}",
  ],
  [
    "text-cyan-50/[1%]",
    ".text-cyan-50\\/\\[1\\%\\]{color:rgb(236 254 255/1%);}",
  ],
  [
    "text-cyan-100/[1%]",
    ".text-cyan-100\\/\\[1\\%\\]{color:rgb(207 250 254/1%);}",
  ],
  [
    "text-cyan-200/[1%]",
    ".text-cyan-200\\/\\[1\\%\\]{color:rgb(165 243 252/1%);}",
  ],
  [
    "text-cyan-300/[1%]",
    ".text-cyan-300\\/\\[1\\%\\]{color:rgb(103 232 249/1%);}",
  ],
  [
    "text-cyan-400/[1%]",
    ".text-cyan-400\\/\\[1\\%\\]{color:rgb(34 211 238/1%);}",
  ],
  [
    "text-cyan-500/[1%]",
    ".text-cyan-500\\/\\[1\\%\\]{color:rgb(6 182 212/1%);}",
  ],
  [
    "text-cyan-600/[1%]",
    ".text-cyan-600\\/\\[1\\%\\]{color:rgb(8 145 178/1%);}",
  ],
  [
    "text-cyan-700/[1%]",
    ".text-cyan-700\\/\\[1\\%\\]{color:rgb(14 116 144/1%);}",
  ],
  [
    "text-cyan-800/[1%]",
    ".text-cyan-800\\/\\[1\\%\\]{color:rgb(21 94 117/1%);}",
  ],
  [
    "text-cyan-900/[1%]",
    ".text-cyan-900\\/\\[1\\%\\]{color:rgb(22 78 99/1%);}",
  ],
  ["text-sky-50/[1%]", ".text-sky-50\\/\\[1\\%\\]{color:rgb(240 249 255/1%);}"],
  [
    "text-sky-100/[1%]",
    ".text-sky-100\\/\\[1\\%\\]{color:rgb(224 242 254/1%);}",
  ],
  [
    "text-sky-200/[1%]",
    ".text-sky-200\\/\\[1\\%\\]{color:rgb(186 230 253/1%);}",
  ],
  [
    "text-sky-300/[1%]",
    ".text-sky-300\\/\\[1\\%\\]{color:rgb(125 211 252/1%);}",
  ],
  [
    "text-sky-400/[1%]",
    ".text-sky-400\\/\\[1\\%\\]{color:rgb(56 189 248/1%);}",
  ],
  [
    "text-sky-500/[1%]",
    ".text-sky-500\\/\\[1\\%\\]{color:rgb(14 165 233/1%);}",
  ],
  ["text-sky-600/[1%]", ".text-sky-600\\/\\[1\\%\\]{color:rgb(2 132 199/1%);}"],
  ["text-sky-700/[1%]", ".text-sky-700\\/\\[1\\%\\]{color:rgb(3 105 161/1%);}"],
  ["text-sky-800/[1%]", ".text-sky-800\\/\\[1\\%\\]{color:rgb(7 89 133/1%);}"],
  ["text-sky-900/[1%]", ".text-sky-900\\/\\[1\\%\\]{color:rgb(12 74 110/1%);}"],
  [
    "text-blue-50/[1%]",
    ".text-blue-50\\/\\[1\\%\\]{color:rgb(239 246 255/1%);}",
  ],
  [
    "text-blue-100/[1%]",
    ".text-blue-100\\/\\[1\\%\\]{color:rgb(219 234 254/1%);}",
  ],
  [
    "text-blue-200/[1%]",
    ".text-blue-200\\/\\[1\\%\\]{color:rgb(191 219 254/1%);}",
  ],
  [
    "text-blue-300/[1%]",
    ".text-blue-300\\/\\[1\\%\\]{color:rgb(147 197 253/1%);}",
  ],
  [
    "text-blue-400/[1%]",
    ".text-blue-400\\/\\[1\\%\\]{color:rgb(96 165 250/1%);}",
  ],
  [
    "text-blue-500/[1%]",
    ".text-blue-500\\/\\[1\\%\\]{color:rgb(59 130 246/1%);}",
  ],
  [
    "text-blue-600/[1%]",
    ".text-blue-600\\/\\[1\\%\\]{color:rgb(37 99 235/1%);}",
  ],
  [
    "text-blue-700/[1%]",
    ".text-blue-700\\/\\[1\\%\\]{color:rgb(29 78 216/1%);}",
  ],
  [
    "text-blue-800/[1%]",
    ".text-blue-800\\/\\[1\\%\\]{color:rgb(30 64 175/1%);}",
  ],
  [
    "text-blue-900/[1%]",
    ".text-blue-900\\/\\[1\\%\\]{color:rgb(30 58 138/1%);}",
  ],
  [
    "text-indigo-50/[1%]",
    ".text-indigo-50\\/\\[1\\%\\]{color:rgb(238 242 255/1%);}",
  ],
  [
    "text-indigo-100/[1%]",
    ".text-indigo-100\\/\\[1\\%\\]{color:rgb(224 231 255/1%);}",
  ],
  [
    "text-indigo-200/[1%]",
    ".text-indigo-200\\/\\[1\\%\\]{color:rgb(199 210 254/1%);}",
  ],
  [
    "text-indigo-300/[1%]",
    ".text-indigo-300\\/\\[1\\%\\]{color:rgb(165 180 252/1%);}",
  ],
  [
    "text-indigo-400/[1%]",
    ".text-indigo-400\\/\\[1\\%\\]{color:rgb(129 140 248/1%);}",
  ],
  [
    "text-indigo-500/[1%]",
    ".text-indigo-500\\/\\[1\\%\\]{color:rgb(99 102 241/1%);}",
  ],
  [
    "text-indigo-600/[1%]",
    ".text-indigo-600\\/\\[1\\%\\]{color:rgb(79 70 229/1%);}",
  ],
  [
    "text-indigo-700/[1%]",
    ".text-indigo-700\\/\\[1\\%\\]{color:rgb(67 56 202/1%);}",
  ],
  [
    "text-indigo-800/[1%]",
    ".text-indigo-800\\/\\[1\\%\\]{color:rgb(55 48 163/1%);}",
  ],
  [
    "text-indigo-900/[1%]",
    ".text-indigo-900\\/\\[1\\%\\]{color:rgb(49 46 129/1%);}",
  ],
  [
    "text-violet-50/[1%]",
    ".text-violet-50\\/\\[1\\%\\]{color:rgb(245 243 255/1%);}",
  ],
  [
    "text-violet-100/[1%]",
    ".text-violet-100\\/\\[1\\%\\]{color:rgb(237 233 254/1%);}",
  ],
  [
    "text-violet-200/[1%]",
    ".text-violet-200\\/\\[1\\%\\]{color:rgb(221 214 254/1%);}",
  ],
  [
    "text-violet-300/[1%]",
    ".text-violet-300\\/\\[1\\%\\]{color:rgb(196 181 253/1%);}",
  ],
  [
    "text-violet-400/[1%]",
    ".text-violet-400\\/\\[1\\%\\]{color:rgb(167 139 250/1%);}",
  ],
  [
    "text-violet-500/[1%]",
    ".text-violet-500\\/\\[1\\%\\]{color:rgb(139 92 246/1%);}",
  ],
  [
    "text-violet-600/[1%]",
    ".text-violet-600\\/\\[1\\%\\]{color:rgb(124 58 237/1%);}",
  ],
  [
    "text-violet-700/[1%]",
    ".text-violet-700\\/\\[1\\%\\]{color:rgb(109 40 217/1%);}",
  ],
  [
    "text-violet-800/[1%]",
    ".text-violet-800\\/\\[1\\%\\]{color:rgb(91 33 182/1%);}",
  ],
  [
    "text-violet-900/[1%]",
    ".text-violet-900\\/\\[1\\%\\]{color:rgb(76 29 149/1%);}",
  ],
  [
    "text-purple-50/[1%]",
    ".text-purple-50\\/\\[1\\%\\]{color:rgb(250 245 255/1%);}",
  ],
  [
    "text-purple-100/[1%]",
    ".text-purple-100\\/\\[1\\%\\]{color:rgb(243 232 255/1%);}",
  ],
  [
    "text-purple-200/[1%]",
    ".text-purple-200\\/\\[1\\%\\]{color:rgb(233 213 255/1%);}",
  ],
  [
    "text-purple-300/[1%]",
    ".text-purple-300\\/\\[1\\%\\]{color:rgb(216 180 254/1%);}",
  ],
  [
    "text-purple-400/[1%]",
    ".text-purple-400\\/\\[1\\%\\]{color:rgb(192 132 252/1%);}",
  ],
  [
    "text-purple-500/[1%]",
    ".text-purple-500\\/\\[1\\%\\]{color:rgb(168 85 247/1%);}",
  ],
  [
    "text-purple-600/[1%]",
    ".text-purple-600\\/\\[1\\%\\]{color:rgb(147 51 234/1%);}",
  ],
  [
    "text-purple-700/[1%]",
    ".text-purple-700\\/\\[1\\%\\]{color:rgb(126 34 206/1%);}",
  ],
  [
    "text-purple-800/[1%]",
    ".text-purple-800\\/\\[1\\%\\]{color:rgb(107 33 168/1%);}",
  ],
  [
    "text-purple-900/[1%]",
    ".text-purple-900\\/\\[1\\%\\]{color:rgb(88 28 135/1%);}",
  ],
  [
    "text-fuchsia-50/[1%]",
    ".text-fuchsia-50\\/\\[1\\%\\]{color:rgb(253 244 255/1%);}",
  ],
  [
    "text-fuchsia-100/[1%]",
    ".text-fuchsia-100\\/\\[1\\%\\]{color:rgb(250 232 255/1%);}",
  ],
  [
    "text-fuchsia-200/[1%]",
    ".text-fuchsia-200\\/\\[1\\%\\]{color:rgb(245 208 254/1%);}",
  ],
  [
    "text-fuchsia-300/[1%]",
    ".text-fuchsia-300\\/\\[1\\%\\]{color:rgb(240 171 252/1%);}",
  ],
  [
    "text-fuchsia-400/[1%]",
    ".text-fuchsia-400\\/\\[1\\%\\]{color:rgb(232 121 249/1%);}",
  ],
  [
    "text-fuchsia-500/[1%]",
    ".text-fuchsia-500\\/\\[1\\%\\]{color:rgb(217 70 239/1%);}",
  ],
  [
    "text-fuchsia-600/[1%]",
    ".text-fuchsia-600\\/\\[1\\%\\]{color:rgb(192 38 211/1%);}",
  ],
  [
    "text-fuchsia-700/[1%]",
    ".text-fuchsia-700\\/\\[1\\%\\]{color:rgb(162 28 175/1%);}",
  ],
  [
    "text-fuchsia-800/[1%]",
    ".text-fuchsia-800\\/\\[1\\%\\]{color:rgb(134 25 143/1%);}",
  ],
  [
    "text-fuchsia-900/[1%]",
    ".text-fuchsia-900\\/\\[1\\%\\]{color:rgb(112 26 117/1%);}",
  ],
  [
    "text-pink-50/[1%]",
    ".text-pink-50\\/\\[1\\%\\]{color:rgb(253 242 248/1%);}",
  ],
  [
    "text-pink-100/[1%]",
    ".text-pink-100\\/\\[1\\%\\]{color:rgb(252 231 243/1%);}",
  ],
  [
    "text-pink-200/[1%]",
    ".text-pink-200\\/\\[1\\%\\]{color:rgb(251 207 232/1%);}",
  ],
  [
    "text-pink-300/[1%]",
    ".text-pink-300\\/\\[1\\%\\]{color:rgb(249 168 212/1%);}",
  ],
  [
    "text-pink-400/[1%]",
    ".text-pink-400\\/\\[1\\%\\]{color:rgb(244 114 182/1%);}",
  ],
  [
    "text-pink-500/[1%]",
    ".text-pink-500\\/\\[1\\%\\]{color:rgb(236 72 153/1%);}",
  ],
  [
    "text-pink-600/[1%]",
    ".text-pink-600\\/\\[1\\%\\]{color:rgb(219 39 119/1%);}",
  ],
  [
    "text-pink-700/[1%]",
    ".text-pink-700\\/\\[1\\%\\]{color:rgb(190 24 93/1%);}",
  ],
  [
    "text-pink-800/[1%]",
    ".text-pink-800\\/\\[1\\%\\]{color:rgb(157 23 77/1%);}",
  ],
  [
    "text-pink-900/[1%]",
    ".text-pink-900\\/\\[1\\%\\]{color:rgb(131 24 67/1%);}",
  ],
  [
    "text-rose-50/[1%]",
    ".text-rose-50\\/\\[1\\%\\]{color:rgb(255 241 242/1%);}",
  ],
  [
    "text-rose-100/[1%]",
    ".text-rose-100\\/\\[1\\%\\]{color:rgb(255 228 230/1%);}",
  ],
  [
    "text-rose-200/[1%]",
    ".text-rose-200\\/\\[1\\%\\]{color:rgb(254 205 211/1%);}",
  ],
  [
    "text-rose-300/[1%]",
    ".text-rose-300\\/\\[1\\%\\]{color:rgb(253 164 175/1%);}",
  ],
  [
    "text-rose-400/[1%]",
    ".text-rose-400\\/\\[1\\%\\]{color:rgb(251 113 133/1%);}",
  ],
  [
    "text-rose-500/[1%]",
    ".text-rose-500\\/\\[1\\%\\]{color:rgb(244 63 94/1%);}",
  ],
  [
    "text-rose-600/[1%]",
    ".text-rose-600\\/\\[1\\%\\]{color:rgb(225 29 72/1%);}",
  ],
  [
    "text-rose-700/[1%]",
    ".text-rose-700\\/\\[1\\%\\]{color:rgb(190 18 60/1%);}",
  ],
  [
    "text-rose-800/[1%]",
    ".text-rose-800\\/\\[1\\%\\]{color:rgb(159 18 57/1%);}",
  ],
  [
    "text-rose-900/[1%]",
    ".text-rose-900\\/\\[1\\%\\]{color:rgb(136 19 55/1%);}",
  ],
  ["underline", ".underline{text-decoration-line:underline;}"],
  ["overline", ".overline{text-decoration-line:overline;}"],
  ["line-through", ".line-through{text-decoration-line:line-through;}"],
  ["no-underline", ".no-underline{text-decoration-line:none;}"],
  ["decoration-inherit", ".decoration-inherit{text-decoration-color:inherit;}"],
  [
    "decoration-current",
    ".decoration-current{text-decoration-color:currentColor;}",
  ],
  [
    "decoration-transparent",
    ".decoration-transparent{text-decoration-color:transparent;}",
  ],
  [
    "decoration-black",
    ".decoration-black{text-decoration-color:rgb(0 0 0/1);}",
  ],
  [
    "decoration-white",
    ".decoration-white{text-decoration-color:rgb(255 255 255/1);}",
  ],
  [
    "decoration-slate-50",
    ".decoration-slate-50{text-decoration-color:rgb(248 250 252/1);}",
  ],
  [
    "decoration-slate-100",
    ".decoration-slate-100{text-decoration-color:rgb(241 245 249/1);}",
  ],
  [
    "decoration-slate-200",
    ".decoration-slate-200{text-decoration-color:rgb(226 232 240/1);}",
  ],
  [
    "decoration-slate-300",
    ".decoration-slate-300{text-decoration-color:rgb(203 213 225/1);}",
  ],
  [
    "decoration-slate-400",
    ".decoration-slate-400{text-decoration-color:rgb(148 163 184/1);}",
  ],
  [
    "decoration-slate-500",
    ".decoration-slate-500{text-decoration-color:rgb(100 116 139/1);}",
  ],
  [
    "decoration-slate-600",
    ".decoration-slate-600{text-decoration-color:rgb(71 85 105/1);}",
  ],
  [
    "decoration-slate-700",
    ".decoration-slate-700{text-decoration-color:rgb(51 65 85/1);}",
  ],
  [
    "decoration-slate-800",
    ".decoration-slate-800{text-decoration-color:rgb(30 41 59/1);}",
  ],
  [
    "decoration-slate-900",
    ".decoration-slate-900{text-decoration-color:rgb(15 23 42/1);}",
  ],
  [
    "decoration-gray-50",
    ".decoration-gray-50{text-decoration-color:rgb(249 250 251/1);}",
  ],
  [
    "decoration-gray-100",
    ".decoration-gray-100{text-decoration-color:rgb(243 244 246/1);}",
  ],
  [
    "decoration-gray-200",
    ".decoration-gray-200{text-decoration-color:rgb(229 231 235/1);}",
  ],
  [
    "decoration-gray-300",
    ".decoration-gray-300{text-decoration-color:rgb(209 213 219/1);}",
  ],
  [
    "decoration-gray-400",
    ".decoration-gray-400{text-decoration-color:rgb(156 163 175/1);}",
  ],
  [
    "decoration-gray-500",
    ".decoration-gray-500{text-decoration-color:rgb(107 114 128/1);}",
  ],
  [
    "decoration-gray-600",
    ".decoration-gray-600{text-decoration-color:rgb(75 85 99/1);}",
  ],
  [
    "decoration-gray-700",
    ".decoration-gray-700{text-decoration-color:rgb(55 65 81/1);}",
  ],
  [
    "decoration-gray-800",
    ".decoration-gray-800{text-decoration-color:rgb(31 41 55/1);}",
  ],
  [
    "decoration-gray-900",
    ".decoration-gray-900{text-decoration-color:rgb(17 24 39/1);}",
  ],
  [
    "decoration-zinc-50",
    ".decoration-zinc-50{text-decoration-color:rgb(250 250 250/1);}",
  ],
  [
    "decoration-zinc-100",
    ".decoration-zinc-100{text-decoration-color:rgb(244 244 245/1);}",
  ],
  [
    "decoration-zinc-200",
    ".decoration-zinc-200{text-decoration-color:rgb(228 228 231/1);}",
  ],
  [
    "decoration-zinc-300",
    ".decoration-zinc-300{text-decoration-color:rgb(212 212 216/1);}",
  ],
  [
    "decoration-zinc-400",
    ".decoration-zinc-400{text-decoration-color:rgb(161 161 170/1);}",
  ],
  [
    "decoration-zinc-500",
    ".decoration-zinc-500{text-decoration-color:rgb(113 113 122/1);}",
  ],
  [
    "decoration-zinc-600",
    ".decoration-zinc-600{text-decoration-color:rgb(82 82 91/1);}",
  ],
  [
    "decoration-zinc-700",
    ".decoration-zinc-700{text-decoration-color:rgb(63 63 70/1);}",
  ],
  [
    "decoration-zinc-800",
    ".decoration-zinc-800{text-decoration-color:rgb(39 39 42/1);}",
  ],
  [
    "decoration-zinc-900",
    ".decoration-zinc-900{text-decoration-color:rgb(24 24 27/1);}",
  ],
  [
    "decoration-neutral-50",
    ".decoration-neutral-50{text-decoration-color:rgb(250 250 250/1);}",
  ],
  [
    "decoration-neutral-100",
    ".decoration-neutral-100{text-decoration-color:rgb(245 245 245/1);}",
  ],
  [
    "decoration-neutral-200",
    ".decoration-neutral-200{text-decoration-color:rgb(229 229 229/1);}",
  ],
  [
    "decoration-neutral-300",
    ".decoration-neutral-300{text-decoration-color:rgb(212 212 212/1);}",
  ],
  [
    "decoration-neutral-400",
    ".decoration-neutral-400{text-decoration-color:rgb(163 163 163/1);}",
  ],
  [
    "decoration-neutral-500",
    ".decoration-neutral-500{text-decoration-color:rgb(115 115 115/1);}",
  ],
  [
    "decoration-neutral-600",
    ".decoration-neutral-600{text-decoration-color:rgb(82 82 82/1);}",
  ],
  [
    "decoration-neutral-700",
    ".decoration-neutral-700{text-decoration-color:rgb(64 64 64/1);}",
  ],
  [
    "decoration-neutral-800",
    ".decoration-neutral-800{text-decoration-color:rgb(38 38 38/1);}",
  ],
  [
    "decoration-neutral-900",
    ".decoration-neutral-900{text-decoration-color:rgb(23 23 23/1);}",
  ],
  [
    "decoration-stone-50",
    ".decoration-stone-50{text-decoration-color:rgb(250 250 249/1);}",
  ],
  [
    "decoration-stone-100",
    ".decoration-stone-100{text-decoration-color:rgb(245 245 244/1);}",
  ],
  [
    "decoration-stone-200",
    ".decoration-stone-200{text-decoration-color:rgb(231 229 228/1);}",
  ],
  [
    "decoration-stone-300",
    ".decoration-stone-300{text-decoration-color:rgb(214 211 209/1);}",
  ],
  [
    "decoration-stone-400",
    ".decoration-stone-400{text-decoration-color:rgb(168 162 158/1);}",
  ],
  [
    "decoration-stone-500",
    ".decoration-stone-500{text-decoration-color:rgb(120 113 108/1);}",
  ],
  [
    "decoration-stone-600",
    ".decoration-stone-600{text-decoration-color:rgb(87 83 78/1);}",
  ],
  [
    "decoration-stone-700",
    ".decoration-stone-700{text-decoration-color:rgb(68 64 60/1);}",
  ],
  [
    "decoration-stone-800",
    ".decoration-stone-800{text-decoration-color:rgb(41 37 36/1);}",
  ],
  [
    "decoration-stone-900",
    ".decoration-stone-900{text-decoration-color:rgb(28 25 23/1);}",
  ],
  [
    "decoration-red-50",
    ".decoration-red-50{text-decoration-color:rgb(254 242 242/1);}",
  ],
  [
    "decoration-red-100",
    ".decoration-red-100{text-decoration-color:rgb(254 226 226/1);}",
  ],
  [
    "decoration-red-200",
    ".decoration-red-200{text-decoration-color:rgb(254 202 202/1);}",
  ],
  [
    "decoration-red-300",
    ".decoration-red-300{text-decoration-color:rgb(252 165 165/1);}",
  ],
  [
    "decoration-red-400",
    ".decoration-red-400{text-decoration-color:rgb(248 113 113/1);}",
  ],
  [
    "decoration-red-500",
    ".decoration-red-500{text-decoration-color:rgb(239 68 68/1);}",
  ],
  [
    "decoration-red-600",
    ".decoration-red-600{text-decoration-color:rgb(220 38 38/1);}",
  ],
  [
    "decoration-red-700",
    ".decoration-red-700{text-decoration-color:rgb(185 28 28/1);}",
  ],
  [
    "decoration-red-800",
    ".decoration-red-800{text-decoration-color:rgb(153 27 27/1);}",
  ],
  [
    "decoration-red-900",
    ".decoration-red-900{text-decoration-color:rgb(127 29 29/1);}",
  ],
  [
    "decoration-orange-50",
    ".decoration-orange-50{text-decoration-color:rgb(255 247 237/1);}",
  ],
  [
    "decoration-orange-100",
    ".decoration-orange-100{text-decoration-color:rgb(255 237 213/1);}",
  ],
  [
    "decoration-orange-200",
    ".decoration-orange-200{text-decoration-color:rgb(254 215 170/1);}",
  ],
  [
    "decoration-orange-300",
    ".decoration-orange-300{text-decoration-color:rgb(253 186 116/1);}",
  ],
  [
    "decoration-orange-400",
    ".decoration-orange-400{text-decoration-color:rgb(251 146 60/1);}",
  ],
  [
    "decoration-orange-500",
    ".decoration-orange-500{text-decoration-color:rgb(249 115 22/1);}",
  ],
  [
    "decoration-orange-600",
    ".decoration-orange-600{text-decoration-color:rgb(234 88 12/1);}",
  ],
  [
    "decoration-orange-700",
    ".decoration-orange-700{text-decoration-color:rgb(194 65 12/1);}",
  ],
  [
    "decoration-orange-800",
    ".decoration-orange-800{text-decoration-color:rgb(154 52 18/1);}",
  ],
  [
    "decoration-orange-900",
    ".decoration-orange-900{text-decoration-color:rgb(124 45 18/1);}",
  ],
  [
    "decoration-amber-50",
    ".decoration-amber-50{text-decoration-color:rgb(255 251 235/1);}",
  ],
  [
    "decoration-amber-100",
    ".decoration-amber-100{text-decoration-color:rgb(254 243 199/1);}",
  ],
  [
    "decoration-amber-200",
    ".decoration-amber-200{text-decoration-color:rgb(253 230 138/1);}",
  ],
  [
    "decoration-amber-300",
    ".decoration-amber-300{text-decoration-color:rgb(252 211 77/1);}",
  ],
  [
    "decoration-amber-400",
    ".decoration-amber-400{text-decoration-color:rgb(251 191 36/1);}",
  ],
  [
    "decoration-amber-500",
    ".decoration-amber-500{text-decoration-color:rgb(245 158 11/1);}",
  ],
  [
    "decoration-amber-600",
    ".decoration-amber-600{text-decoration-color:rgb(217 119 6/1);}",
  ],
  [
    "decoration-amber-700",
    ".decoration-amber-700{text-decoration-color:rgb(180 83 9/1);}",
  ],
  [
    "decoration-amber-800",
    ".decoration-amber-800{text-decoration-color:rgb(146 64 14/1);}",
  ],
  [
    "decoration-amber-900",
    ".decoration-amber-900{text-decoration-color:rgb(120 53 15/1);}",
  ],
  [
    "decoration-yellow-50",
    ".decoration-yellow-50{text-decoration-color:rgb(254 252 232/1);}",
  ],
  [
    "decoration-yellow-100",
    ".decoration-yellow-100{text-decoration-color:rgb(254 249 195/1);}",
  ],
  [
    "decoration-yellow-200",
    ".decoration-yellow-200{text-decoration-color:rgb(254 240 138/1);}",
  ],
  [
    "decoration-yellow-300",
    ".decoration-yellow-300{text-decoration-color:rgb(253 224 71/1);}",
  ],
  [
    "decoration-yellow-400",
    ".decoration-yellow-400{text-decoration-color:rgb(250 204 21/1);}",
  ],
  [
    "decoration-yellow-500",
    ".decoration-yellow-500{text-decoration-color:rgb(234 179 8/1);}",
  ],
  [
    "decoration-yellow-600",
    ".decoration-yellow-600{text-decoration-color:rgb(202 138 4/1);}",
  ],
  [
    "decoration-yellow-700",
    ".decoration-yellow-700{text-decoration-color:rgb(161 98 7/1);}",
  ],
  [
    "decoration-yellow-800",
    ".decoration-yellow-800{text-decoration-color:rgb(133 77 14/1);}",
  ],
  [
    "decoration-yellow-900",
    ".decoration-yellow-900{text-decoration-color:rgb(113 63 18/1);}",
  ],
  [
    "decoration-lime-50",
    ".decoration-lime-50{text-decoration-color:rgb(247 254 231/1);}",
  ],
  [
    "decoration-lime-100",
    ".decoration-lime-100{text-decoration-color:rgb(236 252 203/1);}",
  ],
  [
    "decoration-lime-200",
    ".decoration-lime-200{text-decoration-color:rgb(217 249 157/1);}",
  ],
  [
    "decoration-lime-300",
    ".decoration-lime-300{text-decoration-color:rgb(190 242 100/1);}",
  ],
  [
    "decoration-lime-400",
    ".decoration-lime-400{text-decoration-color:rgb(163 230 53/1);}",
  ],
  [
    "decoration-lime-500",
    ".decoration-lime-500{text-decoration-color:rgb(132 204 22/1);}",
  ],
  [
    "decoration-lime-600",
    ".decoration-lime-600{text-decoration-color:rgb(101 163 13/1);}",
  ],
  [
    "decoration-lime-700",
    ".decoration-lime-700{text-decoration-color:rgb(77 124 15/1);}",
  ],
  [
    "decoration-lime-800",
    ".decoration-lime-800{text-decoration-color:rgb(63 98 18/1);}",
  ],
  [
    "decoration-lime-900",
    ".decoration-lime-900{text-decoration-color:rgb(54 83 20/1);}",
  ],
  [
    "decoration-green-50",
    ".decoration-green-50{text-decoration-color:rgb(240 253 244/1);}",
  ],
  [
    "decoration-green-100",
    ".decoration-green-100{text-decoration-color:rgb(220 252 231/1);}",
  ],
  [
    "decoration-green-200",
    ".decoration-green-200{text-decoration-color:rgb(187 247 208/1);}",
  ],
  [
    "decoration-green-300",
    ".decoration-green-300{text-decoration-color:rgb(134 239 172/1);}",
  ],
  [
    "decoration-green-400",
    ".decoration-green-400{text-decoration-color:rgb(74 222 128/1);}",
  ],
  [
    "decoration-green-500",
    ".decoration-green-500{text-decoration-color:rgb(34 197 94/1);}",
  ],
  [
    "decoration-green-600",
    ".decoration-green-600{text-decoration-color:rgb(22 163 74/1);}",
  ],
  [
    "decoration-green-700",
    ".decoration-green-700{text-decoration-color:rgb(21 128 61/1);}",
  ],
  [
    "decoration-green-800",
    ".decoration-green-800{text-decoration-color:rgb(22 101 52/1);}",
  ],
  [
    "decoration-green-900",
    ".decoration-green-900{text-decoration-color:rgb(20 83 45/1);}",
  ],
  [
    "decoration-emerald-50",
    ".decoration-emerald-50{text-decoration-color:rgb(236 253 245/1);}",
  ],
  [
    "decoration-emerald-100",
    ".decoration-emerald-100{text-decoration-color:rgb(209 250 229/1);}",
  ],
  [
    "decoration-emerald-200",
    ".decoration-emerald-200{text-decoration-color:rgb(167 243 208/1);}",
  ],
  [
    "decoration-emerald-300",
    ".decoration-emerald-300{text-decoration-color:rgb(110 231 183/1);}",
  ],
  [
    "decoration-emerald-400",
    ".decoration-emerald-400{text-decoration-color:rgb(52 211 153/1);}",
  ],
  [
    "decoration-emerald-500",
    ".decoration-emerald-500{text-decoration-color:rgb(16 185 129/1);}",
  ],
  [
    "decoration-emerald-600",
    ".decoration-emerald-600{text-decoration-color:rgb(5 150 105/1);}",
  ],
  [
    "decoration-emerald-700",
    ".decoration-emerald-700{text-decoration-color:rgb(4 120 87/1);}",
  ],
  [
    "decoration-emerald-800",
    ".decoration-emerald-800{text-decoration-color:rgb(6 95 70/1);}",
  ],
  [
    "decoration-emerald-900",
    ".decoration-emerald-900{text-decoration-color:rgb(6 78 59/1);}",
  ],
  [
    "decoration-teal-50",
    ".decoration-teal-50{text-decoration-color:rgb(240 253 250/1);}",
  ],
  [
    "decoration-teal-100",
    ".decoration-teal-100{text-decoration-color:rgb(204 251 241/1);}",
  ],
  [
    "decoration-teal-200",
    ".decoration-teal-200{text-decoration-color:rgb(153 246 228/1);}",
  ],
  [
    "decoration-teal-300",
    ".decoration-teal-300{text-decoration-color:rgb(94 234 212/1);}",
  ],
  [
    "decoration-teal-400",
    ".decoration-teal-400{text-decoration-color:rgb(45 212 191/1);}",
  ],
  [
    "decoration-teal-500",
    ".decoration-teal-500{text-decoration-color:rgb(20 184 166/1);}",
  ],
  [
    "decoration-teal-600",
    ".decoration-teal-600{text-decoration-color:rgb(13 148 136/1);}",
  ],
  [
    "decoration-teal-700",
    ".decoration-teal-700{text-decoration-color:rgb(15 118 110/1);}",
  ],
  [
    "decoration-teal-800",
    ".decoration-teal-800{text-decoration-color:rgb(17 94 89/1);}",
  ],
  [
    "decoration-teal-900",
    ".decoration-teal-900{text-decoration-color:rgb(19 78 74/1);}",
  ],
  [
    "decoration-cyan-50",
    ".decoration-cyan-50{text-decoration-color:rgb(236 254 255/1);}",
  ],
  [
    "decoration-cyan-100",
    ".decoration-cyan-100{text-decoration-color:rgb(207 250 254/1);}",
  ],
  [
    "decoration-cyan-200",
    ".decoration-cyan-200{text-decoration-color:rgb(165 243 252/1);}",
  ],
  [
    "decoration-cyan-300",
    ".decoration-cyan-300{text-decoration-color:rgb(103 232 249/1);}",
  ],
  [
    "decoration-cyan-400",
    ".decoration-cyan-400{text-decoration-color:rgb(34 211 238/1);}",
  ],
  [
    "decoration-cyan-500",
    ".decoration-cyan-500{text-decoration-color:rgb(6 182 212/1);}",
  ],
  [
    "decoration-cyan-600",
    ".decoration-cyan-600{text-decoration-color:rgb(8 145 178/1);}",
  ],
  [
    "decoration-cyan-700",
    ".decoration-cyan-700{text-decoration-color:rgb(14 116 144/1);}",
  ],
  [
    "decoration-cyan-800",
    ".decoration-cyan-800{text-decoration-color:rgb(21 94 117/1);}",
  ],
  [
    "decoration-cyan-900",
    ".decoration-cyan-900{text-decoration-color:rgb(22 78 99/1);}",
  ],
  [
    "decoration-sky-50",
    ".decoration-sky-50{text-decoration-color:rgb(240 249 255/1);}",
  ],
  [
    "decoration-sky-100",
    ".decoration-sky-100{text-decoration-color:rgb(224 242 254/1);}",
  ],
  [
    "decoration-sky-200",
    ".decoration-sky-200{text-decoration-color:rgb(186 230 253/1);}",
  ],
  [
    "decoration-sky-300",
    ".decoration-sky-300{text-decoration-color:rgb(125 211 252/1);}",
  ],
  [
    "decoration-sky-400",
    ".decoration-sky-400{text-decoration-color:rgb(56 189 248/1);}",
  ],
  [
    "decoration-sky-500",
    ".decoration-sky-500{text-decoration-color:rgb(14 165 233/1);}",
  ],
  [
    "decoration-sky-600",
    ".decoration-sky-600{text-decoration-color:rgb(2 132 199/1);}",
  ],
  [
    "decoration-sky-700",
    ".decoration-sky-700{text-decoration-color:rgb(3 105 161/1);}",
  ],
  [
    "decoration-sky-800",
    ".decoration-sky-800{text-decoration-color:rgb(7 89 133/1);}",
  ],
  [
    "decoration-sky-900",
    ".decoration-sky-900{text-decoration-color:rgb(12 74 110/1);}",
  ],
  [
    "decoration-blue-50",
    ".decoration-blue-50{text-decoration-color:rgb(239 246 255/1);}",
  ],
  [
    "decoration-blue-100",
    ".decoration-blue-100{text-decoration-color:rgb(219 234 254/1);}",
  ],
  [
    "decoration-blue-200",
    ".decoration-blue-200{text-decoration-color:rgb(191 219 254/1);}",
  ],
  [
    "decoration-blue-300",
    ".decoration-blue-300{text-decoration-color:rgb(147 197 253/1);}",
  ],
  [
    "decoration-blue-400",
    ".decoration-blue-400{text-decoration-color:rgb(96 165 250/1);}",
  ],
  [
    "decoration-blue-500",
    ".decoration-blue-500{text-decoration-color:rgb(59 130 246/1);}",
  ],
  [
    "decoration-blue-600",
    ".decoration-blue-600{text-decoration-color:rgb(37 99 235/1);}",
  ],
  [
    "decoration-blue-700",
    ".decoration-blue-700{text-decoration-color:rgb(29 78 216/1);}",
  ],
  [
    "decoration-blue-800",
    ".decoration-blue-800{text-decoration-color:rgb(30 64 175/1);}",
  ],
  [
    "decoration-blue-900",
    ".decoration-blue-900{text-decoration-color:rgb(30 58 138/1);}",
  ],
  [
    "decoration-indigo-50",
    ".decoration-indigo-50{text-decoration-color:rgb(238 242 255/1);}",
  ],
  [
    "decoration-indigo-100",
    ".decoration-indigo-100{text-decoration-color:rgb(224 231 255/1);}",
  ],
  [
    "decoration-indigo-200",
    ".decoration-indigo-200{text-decoration-color:rgb(199 210 254/1);}",
  ],
  [
    "decoration-indigo-300",
    ".decoration-indigo-300{text-decoration-color:rgb(165 180 252/1);}",
  ],
  [
    "decoration-indigo-400",
    ".decoration-indigo-400{text-decoration-color:rgb(129 140 248/1);}",
  ],
  [
    "decoration-indigo-500",
    ".decoration-indigo-500{text-decoration-color:rgb(99 102 241/1);}",
  ],
  [
    "decoration-indigo-600",
    ".decoration-indigo-600{text-decoration-color:rgb(79 70 229/1);}",
  ],
  [
    "decoration-indigo-700",
    ".decoration-indigo-700{text-decoration-color:rgb(67 56 202/1);}",
  ],
  [
    "decoration-indigo-800",
    ".decoration-indigo-800{text-decoration-color:rgb(55 48 163/1);}",
  ],
  [
    "decoration-indigo-900",
    ".decoration-indigo-900{text-decoration-color:rgb(49 46 129/1);}",
  ],
  [
    "decoration-violet-50",
    ".decoration-violet-50{text-decoration-color:rgb(245 243 255/1);}",
  ],
  [
    "decoration-violet-100",
    ".decoration-violet-100{text-decoration-color:rgb(237 233 254/1);}",
  ],
  [
    "decoration-violet-200",
    ".decoration-violet-200{text-decoration-color:rgb(221 214 254/1);}",
  ],
  [
    "decoration-violet-300",
    ".decoration-violet-300{text-decoration-color:rgb(196 181 253/1);}",
  ],
  [
    "decoration-violet-400",
    ".decoration-violet-400{text-decoration-color:rgb(167 139 250/1);}",
  ],
  [
    "decoration-violet-500",
    ".decoration-violet-500{text-decoration-color:rgb(139 92 246/1);}",
  ],
  [
    "decoration-violet-600",
    ".decoration-violet-600{text-decoration-color:rgb(124 58 237/1);}",
  ],
  [
    "decoration-violet-700",
    ".decoration-violet-700{text-decoration-color:rgb(109 40 217/1);}",
  ],
  [
    "decoration-violet-800",
    ".decoration-violet-800{text-decoration-color:rgb(91 33 182/1);}",
  ],
  [
    "decoration-violet-900",
    ".decoration-violet-900{text-decoration-color:rgb(76 29 149/1);}",
  ],
  [
    "decoration-purple-50",
    ".decoration-purple-50{text-decoration-color:rgb(250 245 255/1);}",
  ],
  [
    "decoration-purple-100",
    ".decoration-purple-100{text-decoration-color:rgb(243 232 255/1);}",
  ],
  [
    "decoration-purple-200",
    ".decoration-purple-200{text-decoration-color:rgb(233 213 255/1);}",
  ],
  [
    "decoration-purple-300",
    ".decoration-purple-300{text-decoration-color:rgb(216 180 254/1);}",
  ],
  [
    "decoration-purple-400",
    ".decoration-purple-400{text-decoration-color:rgb(192 132 252/1);}",
  ],
  [
    "decoration-purple-500",
    ".decoration-purple-500{text-decoration-color:rgb(168 85 247/1);}",
  ],
  [
    "decoration-purple-600",
    ".decoration-purple-600{text-decoration-color:rgb(147 51 234/1);}",
  ],
  [
    "decoration-purple-700",
    ".decoration-purple-700{text-decoration-color:rgb(126 34 206/1);}",
  ],
  [
    "decoration-purple-800",
    ".decoration-purple-800{text-decoration-color:rgb(107 33 168/1);}",
  ],
  [
    "decoration-purple-900",
    ".decoration-purple-900{text-decoration-color:rgb(88 28 135/1);}",
  ],
  [
    "decoration-fuchsia-50",
    ".decoration-fuchsia-50{text-decoration-color:rgb(253 244 255/1);}",
  ],
  [
    "decoration-fuchsia-100",
    ".decoration-fuchsia-100{text-decoration-color:rgb(250 232 255/1);}",
  ],
  [
    "decoration-fuchsia-200",
    ".decoration-fuchsia-200{text-decoration-color:rgb(245 208 254/1);}",
  ],
  [
    "decoration-fuchsia-300",
    ".decoration-fuchsia-300{text-decoration-color:rgb(240 171 252/1);}",
  ],
  [
    "decoration-fuchsia-400",
    ".decoration-fuchsia-400{text-decoration-color:rgb(232 121 249/1);}",
  ],
  [
    "decoration-fuchsia-500",
    ".decoration-fuchsia-500{text-decoration-color:rgb(217 70 239/1);}",
  ],
  [
    "decoration-fuchsia-600",
    ".decoration-fuchsia-600{text-decoration-color:rgb(192 38 211/1);}",
  ],
  [
    "decoration-fuchsia-700",
    ".decoration-fuchsia-700{text-decoration-color:rgb(162 28 175/1);}",
  ],
  [
    "decoration-fuchsia-800",
    ".decoration-fuchsia-800{text-decoration-color:rgb(134 25 143/1);}",
  ],
  [
    "decoration-fuchsia-900",
    ".decoration-fuchsia-900{text-decoration-color:rgb(112 26 117/1);}",
  ],
  [
    "decoration-pink-50",
    ".decoration-pink-50{text-decoration-color:rgb(253 242 248/1);}",
  ],
  [
    "decoration-pink-100",
    ".decoration-pink-100{text-decoration-color:rgb(252 231 243/1);}",
  ],
  [
    "decoration-pink-200",
    ".decoration-pink-200{text-decoration-color:rgb(251 207 232/1);}",
  ],
  [
    "decoration-pink-300",
    ".decoration-pink-300{text-decoration-color:rgb(249 168 212/1);}",
  ],
  [
    "decoration-pink-400",
    ".decoration-pink-400{text-decoration-color:rgb(244 114 182/1);}",
  ],
  [
    "decoration-pink-500",
    ".decoration-pink-500{text-decoration-color:rgb(236 72 153/1);}",
  ],
  [
    "decoration-pink-600",
    ".decoration-pink-600{text-decoration-color:rgb(219 39 119/1);}",
  ],
  [
    "decoration-pink-700",
    ".decoration-pink-700{text-decoration-color:rgb(190 24 93/1);}",
  ],
  [
    "decoration-pink-800",
    ".decoration-pink-800{text-decoration-color:rgb(157 23 77/1);}",
  ],
  [
    "decoration-pink-900",
    ".decoration-pink-900{text-decoration-color:rgb(131 24 67/1);}",
  ],
  [
    "decoration-rose-50",
    ".decoration-rose-50{text-decoration-color:rgb(255 241 242/1);}",
  ],
  [
    "decoration-rose-100",
    ".decoration-rose-100{text-decoration-color:rgb(255 228 230/1);}",
  ],
  [
    "decoration-rose-200",
    ".decoration-rose-200{text-decoration-color:rgb(254 205 211/1);}",
  ],
  [
    "decoration-rose-300",
    ".decoration-rose-300{text-decoration-color:rgb(253 164 175/1);}",
  ],
  [
    "decoration-rose-400",
    ".decoration-rose-400{text-decoration-color:rgb(251 113 133/1);}",
  ],
  [
    "decoration-rose-500",
    ".decoration-rose-500{text-decoration-color:rgb(244 63 94/1);}",
  ],
  [
    "decoration-rose-600",
    ".decoration-rose-600{text-decoration-color:rgb(225 29 72/1);}",
  ],
  [
    "decoration-rose-700",
    ".decoration-rose-700{text-decoration-color:rgb(190 18 60/1);}",
  ],
  [
    "decoration-rose-800",
    ".decoration-rose-800{text-decoration-color:rgb(159 18 57/1);}",
  ],
  [
    "decoration-rose-900",
    ".decoration-rose-900{text-decoration-color:rgb(136 19 55/1);}",
  ],
  [
    "decoration-black/50",
    ".decoration-black\\/50{text-decoration-color:rgb(0 0 0/.5);}",
  ],
  [
    "decoration-white/50",
    ".decoration-white\\/50{text-decoration-color:rgb(255 255 255/.5);}",
  ],
  [
    "decoration-slate-50/50",
    ".decoration-slate-50\\/50{text-decoration-color:rgb(248 250 252/.5);}",
  ],
  [
    "decoration-slate-100/50",
    ".decoration-slate-100\\/50{text-decoration-color:rgb(241 245 249/.5);}",
  ],
  [
    "decoration-slate-200/50",
    ".decoration-slate-200\\/50{text-decoration-color:rgb(226 232 240/.5);}",
  ],
  [
    "decoration-slate-300/50",
    ".decoration-slate-300\\/50{text-decoration-color:rgb(203 213 225/.5);}",
  ],
  [
    "decoration-slate-400/50",
    ".decoration-slate-400\\/50{text-decoration-color:rgb(148 163 184/.5);}",
  ],
  [
    "decoration-slate-500/50",
    ".decoration-slate-500\\/50{text-decoration-color:rgb(100 116 139/.5);}",
  ],
  [
    "decoration-slate-600/50",
    ".decoration-slate-600\\/50{text-decoration-color:rgb(71 85 105/.5);}",
  ],
  [
    "decoration-slate-700/50",
    ".decoration-slate-700\\/50{text-decoration-color:rgb(51 65 85/.5);}",
  ],
  [
    "decoration-slate-800/50",
    ".decoration-slate-800\\/50{text-decoration-color:rgb(30 41 59/.5);}",
  ],
  [
    "decoration-slate-900/50",
    ".decoration-slate-900\\/50{text-decoration-color:rgb(15 23 42/.5);}",
  ],
  [
    "decoration-gray-50/50",
    ".decoration-gray-50\\/50{text-decoration-color:rgb(249 250 251/.5);}",
  ],
  [
    "decoration-gray-100/50",
    ".decoration-gray-100\\/50{text-decoration-color:rgb(243 244 246/.5);}",
  ],
  [
    "decoration-gray-200/50",
    ".decoration-gray-200\\/50{text-decoration-color:rgb(229 231 235/.5);}",
  ],
  [
    "decoration-gray-300/50",
    ".decoration-gray-300\\/50{text-decoration-color:rgb(209 213 219/.5);}",
  ],
  [
    "decoration-gray-400/50",
    ".decoration-gray-400\\/50{text-decoration-color:rgb(156 163 175/.5);}",
  ],
  [
    "decoration-gray-500/50",
    ".decoration-gray-500\\/50{text-decoration-color:rgb(107 114 128/.5);}",
  ],
  [
    "decoration-gray-600/50",
    ".decoration-gray-600\\/50{text-decoration-color:rgb(75 85 99/.5);}",
  ],
  [
    "decoration-gray-700/50",
    ".decoration-gray-700\\/50{text-decoration-color:rgb(55 65 81/.5);}",
  ],
  [
    "decoration-gray-800/50",
    ".decoration-gray-800\\/50{text-decoration-color:rgb(31 41 55/.5);}",
  ],
  [
    "decoration-gray-900/50",
    ".decoration-gray-900\\/50{text-decoration-color:rgb(17 24 39/.5);}",
  ],
  [
    "decoration-zinc-50/50",
    ".decoration-zinc-50\\/50{text-decoration-color:rgb(250 250 250/.5);}",
  ],
  [
    "decoration-zinc-100/50",
    ".decoration-zinc-100\\/50{text-decoration-color:rgb(244 244 245/.5);}",
  ],
  [
    "decoration-zinc-200/50",
    ".decoration-zinc-200\\/50{text-decoration-color:rgb(228 228 231/.5);}",
  ],
  [
    "decoration-zinc-300/50",
    ".decoration-zinc-300\\/50{text-decoration-color:rgb(212 212 216/.5);}",
  ],
  [
    "decoration-zinc-400/50",
    ".decoration-zinc-400\\/50{text-decoration-color:rgb(161 161 170/.5);}",
  ],
  [
    "decoration-zinc-500/50",
    ".decoration-zinc-500\\/50{text-decoration-color:rgb(113 113 122/.5);}",
  ],
  [
    "decoration-zinc-600/50",
    ".decoration-zinc-600\\/50{text-decoration-color:rgb(82 82 91/.5);}",
  ],
  [
    "decoration-zinc-700/50",
    ".decoration-zinc-700\\/50{text-decoration-color:rgb(63 63 70/.5);}",
  ],
  [
    "decoration-zinc-800/50",
    ".decoration-zinc-800\\/50{text-decoration-color:rgb(39 39 42/.5);}",
  ],
  [
    "decoration-zinc-900/50",
    ".decoration-zinc-900\\/50{text-decoration-color:rgb(24 24 27/.5);}",
  ],
  [
    "decoration-neutral-50/50",
    ".decoration-neutral-50\\/50{text-decoration-color:rgb(250 250 250/.5);}",
  ],
  [
    "decoration-neutral-100/50",
    ".decoration-neutral-100\\/50{text-decoration-color:rgb(245 245 245/.5);}",
  ],
  [
    "decoration-neutral-200/50",
    ".decoration-neutral-200\\/50{text-decoration-color:rgb(229 229 229/.5);}",
  ],
  [
    "decoration-neutral-300/50",
    ".decoration-neutral-300\\/50{text-decoration-color:rgb(212 212 212/.5);}",
  ],
  [
    "decoration-neutral-400/50",
    ".decoration-neutral-400\\/50{text-decoration-color:rgb(163 163 163/.5);}",
  ],
  [
    "decoration-neutral-500/50",
    ".decoration-neutral-500\\/50{text-decoration-color:rgb(115 115 115/.5);}",
  ],
  [
    "decoration-neutral-600/50",
    ".decoration-neutral-600\\/50{text-decoration-color:rgb(82 82 82/.5);}",
  ],
  [
    "decoration-neutral-700/50",
    ".decoration-neutral-700\\/50{text-decoration-color:rgb(64 64 64/.5);}",
  ],
  [
    "decoration-neutral-800/50",
    ".decoration-neutral-800\\/50{text-decoration-color:rgb(38 38 38/.5);}",
  ],
  [
    "decoration-neutral-900/50",
    ".decoration-neutral-900\\/50{text-decoration-color:rgb(23 23 23/.5);}",
  ],
  [
    "decoration-stone-50/50",
    ".decoration-stone-50\\/50{text-decoration-color:rgb(250 250 249/.5);}",
  ],
  [
    "decoration-stone-100/50",
    ".decoration-stone-100\\/50{text-decoration-color:rgb(245 245 244/.5);}",
  ],
  [
    "decoration-stone-200/50",
    ".decoration-stone-200\\/50{text-decoration-color:rgb(231 229 228/.5);}",
  ],
  [
    "decoration-stone-300/50",
    ".decoration-stone-300\\/50{text-decoration-color:rgb(214 211 209/.5);}",
  ],
  [
    "decoration-stone-400/50",
    ".decoration-stone-400\\/50{text-decoration-color:rgb(168 162 158/.5);}",
  ],
  [
    "decoration-stone-500/50",
    ".decoration-stone-500\\/50{text-decoration-color:rgb(120 113 108/.5);}",
  ],
  [
    "decoration-stone-600/50",
    ".decoration-stone-600\\/50{text-decoration-color:rgb(87 83 78/.5);}",
  ],
  [
    "decoration-stone-700/50",
    ".decoration-stone-700\\/50{text-decoration-color:rgb(68 64 60/.5);}",
  ],
  [
    "decoration-stone-800/50",
    ".decoration-stone-800\\/50{text-decoration-color:rgb(41 37 36/.5);}",
  ],
  [
    "decoration-stone-900/50",
    ".decoration-stone-900\\/50{text-decoration-color:rgb(28 25 23/.5);}",
  ],
  [
    "decoration-red-50/50",
    ".decoration-red-50\\/50{text-decoration-color:rgb(254 242 242/.5);}",
  ],
  [
    "decoration-red-100/50",
    ".decoration-red-100\\/50{text-decoration-color:rgb(254 226 226/.5);}",
  ],
  [
    "decoration-red-200/50",
    ".decoration-red-200\\/50{text-decoration-color:rgb(254 202 202/.5);}",
  ],
  [
    "decoration-red-300/50",
    ".decoration-red-300\\/50{text-decoration-color:rgb(252 165 165/.5);}",
  ],
  [
    "decoration-red-400/50",
    ".decoration-red-400\\/50{text-decoration-color:rgb(248 113 113/.5);}",
  ],
  [
    "decoration-red-500/50",
    ".decoration-red-500\\/50{text-decoration-color:rgb(239 68 68/.5);}",
  ],
  [
    "decoration-red-600/50",
    ".decoration-red-600\\/50{text-decoration-color:rgb(220 38 38/.5);}",
  ],
  [
    "decoration-red-700/50",
    ".decoration-red-700\\/50{text-decoration-color:rgb(185 28 28/.5);}",
  ],
  [
    "decoration-red-800/50",
    ".decoration-red-800\\/50{text-decoration-color:rgb(153 27 27/.5);}",
  ],
  [
    "decoration-red-900/50",
    ".decoration-red-900\\/50{text-decoration-color:rgb(127 29 29/.5);}",
  ],
  [
    "decoration-orange-50/50",
    ".decoration-orange-50\\/50{text-decoration-color:rgb(255 247 237/.5);}",
  ],
  [
    "decoration-orange-100/50",
    ".decoration-orange-100\\/50{text-decoration-color:rgb(255 237 213/.5);}",
  ],
  [
    "decoration-orange-200/50",
    ".decoration-orange-200\\/50{text-decoration-color:rgb(254 215 170/.5);}",
  ],
  [
    "decoration-orange-300/50",
    ".decoration-orange-300\\/50{text-decoration-color:rgb(253 186 116/.5);}",
  ],
  [
    "decoration-orange-400/50",
    ".decoration-orange-400\\/50{text-decoration-color:rgb(251 146 60/.5);}",
  ],
  [
    "decoration-orange-500/50",
    ".decoration-orange-500\\/50{text-decoration-color:rgb(249 115 22/.5);}",
  ],
  [
    "decoration-orange-600/50",
    ".decoration-orange-600\\/50{text-decoration-color:rgb(234 88 12/.5);}",
  ],
  [
    "decoration-orange-700/50",
    ".decoration-orange-700\\/50{text-decoration-color:rgb(194 65 12/.5);}",
  ],
  [
    "decoration-orange-800/50",
    ".decoration-orange-800\\/50{text-decoration-color:rgb(154 52 18/.5);}",
  ],
  [
    "decoration-orange-900/50",
    ".decoration-orange-900\\/50{text-decoration-color:rgb(124 45 18/.5);}",
  ],
  [
    "decoration-amber-50/50",
    ".decoration-amber-50\\/50{text-decoration-color:rgb(255 251 235/.5);}",
  ],
  [
    "decoration-amber-100/50",
    ".decoration-amber-100\\/50{text-decoration-color:rgb(254 243 199/.5);}",
  ],
  [
    "decoration-amber-200/50",
    ".decoration-amber-200\\/50{text-decoration-color:rgb(253 230 138/.5);}",
  ],
  [
    "decoration-amber-300/50",
    ".decoration-amber-300\\/50{text-decoration-color:rgb(252 211 77/.5);}",
  ],
  [
    "decoration-amber-400/50",
    ".decoration-amber-400\\/50{text-decoration-color:rgb(251 191 36/.5);}",
  ],
  [
    "decoration-amber-500/50",
    ".decoration-amber-500\\/50{text-decoration-color:rgb(245 158 11/.5);}",
  ],
  [
    "decoration-amber-600/50",
    ".decoration-amber-600\\/50{text-decoration-color:rgb(217 119 6/.5);}",
  ],
  [
    "decoration-amber-700/50",
    ".decoration-amber-700\\/50{text-decoration-color:rgb(180 83 9/.5);}",
  ],
  [
    "decoration-amber-800/50",
    ".decoration-amber-800\\/50{text-decoration-color:rgb(146 64 14/.5);}",
  ],
  [
    "decoration-amber-900/50",
    ".decoration-amber-900\\/50{text-decoration-color:rgb(120 53 15/.5);}",
  ],
  [
    "decoration-yellow-50/50",
    ".decoration-yellow-50\\/50{text-decoration-color:rgb(254 252 232/.5);}",
  ],
  [
    "decoration-yellow-100/50",
    ".decoration-yellow-100\\/50{text-decoration-color:rgb(254 249 195/.5);}",
  ],
  [
    "decoration-yellow-200/50",
    ".decoration-yellow-200\\/50{text-decoration-color:rgb(254 240 138/.5);}",
  ],
  [
    "decoration-yellow-300/50",
    ".decoration-yellow-300\\/50{text-decoration-color:rgb(253 224 71/.5);}",
  ],
  [
    "decoration-yellow-400/50",
    ".decoration-yellow-400\\/50{text-decoration-color:rgb(250 204 21/.5);}",
  ],
  [
    "decoration-yellow-500/50",
    ".decoration-yellow-500\\/50{text-decoration-color:rgb(234 179 8/.5);}",
  ],
  [
    "decoration-yellow-600/50",
    ".decoration-yellow-600\\/50{text-decoration-color:rgb(202 138 4/.5);}",
  ],
  [
    "decoration-yellow-700/50",
    ".decoration-yellow-700\\/50{text-decoration-color:rgb(161 98 7/.5);}",
  ],
  [
    "decoration-yellow-800/50",
    ".decoration-yellow-800\\/50{text-decoration-color:rgb(133 77 14/.5);}",
  ],
  [
    "decoration-yellow-900/50",
    ".decoration-yellow-900\\/50{text-decoration-color:rgb(113 63 18/.5);}",
  ],
  [
    "decoration-lime-50/50",
    ".decoration-lime-50\\/50{text-decoration-color:rgb(247 254 231/.5);}",
  ],
  [
    "decoration-lime-100/50",
    ".decoration-lime-100\\/50{text-decoration-color:rgb(236 252 203/.5);}",
  ],
  [
    "decoration-lime-200/50",
    ".decoration-lime-200\\/50{text-decoration-color:rgb(217 249 157/.5);}",
  ],
  [
    "decoration-lime-300/50",
    ".decoration-lime-300\\/50{text-decoration-color:rgb(190 242 100/.5);}",
  ],
  [
    "decoration-lime-400/50",
    ".decoration-lime-400\\/50{text-decoration-color:rgb(163 230 53/.5);}",
  ],
  [
    "decoration-lime-500/50",
    ".decoration-lime-500\\/50{text-decoration-color:rgb(132 204 22/.5);}",
  ],
  [
    "decoration-lime-600/50",
    ".decoration-lime-600\\/50{text-decoration-color:rgb(101 163 13/.5);}",
  ],
  [
    "decoration-lime-700/50",
    ".decoration-lime-700\\/50{text-decoration-color:rgb(77 124 15/.5);}",
  ],
  [
    "decoration-lime-800/50",
    ".decoration-lime-800\\/50{text-decoration-color:rgb(63 98 18/.5);}",
  ],
  [
    "decoration-lime-900/50",
    ".decoration-lime-900\\/50{text-decoration-color:rgb(54 83 20/.5);}",
  ],
  [
    "decoration-green-50/50",
    ".decoration-green-50\\/50{text-decoration-color:rgb(240 253 244/.5);}",
  ],
  [
    "decoration-green-100/50",
    ".decoration-green-100\\/50{text-decoration-color:rgb(220 252 231/.5);}",
  ],
  [
    "decoration-green-200/50",
    ".decoration-green-200\\/50{text-decoration-color:rgb(187 247 208/.5);}",
  ],
  [
    "decoration-green-300/50",
    ".decoration-green-300\\/50{text-decoration-color:rgb(134 239 172/.5);}",
  ],
  [
    "decoration-green-400/50",
    ".decoration-green-400\\/50{text-decoration-color:rgb(74 222 128/.5);}",
  ],
  [
    "decoration-green-500/50",
    ".decoration-green-500\\/50{text-decoration-color:rgb(34 197 94/.5);}",
  ],
  [
    "decoration-green-600/50",
    ".decoration-green-600\\/50{text-decoration-color:rgb(22 163 74/.5);}",
  ],
  [
    "decoration-green-700/50",
    ".decoration-green-700\\/50{text-decoration-color:rgb(21 128 61/.5);}",
  ],
  [
    "decoration-green-800/50",
    ".decoration-green-800\\/50{text-decoration-color:rgb(22 101 52/.5);}",
  ],
  [
    "decoration-green-900/50",
    ".decoration-green-900\\/50{text-decoration-color:rgb(20 83 45/.5);}",
  ],
  [
    "decoration-emerald-50/50",
    ".decoration-emerald-50\\/50{text-decoration-color:rgb(236 253 245/.5);}",
  ],
  [
    "decoration-emerald-100/50",
    ".decoration-emerald-100\\/50{text-decoration-color:rgb(209 250 229/.5);}",
  ],
  [
    "decoration-emerald-200/50",
    ".decoration-emerald-200\\/50{text-decoration-color:rgb(167 243 208/.5);}",
  ],
  [
    "decoration-emerald-300/50",
    ".decoration-emerald-300\\/50{text-decoration-color:rgb(110 231 183/.5);}",
  ],
  [
    "decoration-emerald-400/50",
    ".decoration-emerald-400\\/50{text-decoration-color:rgb(52 211 153/.5);}",
  ],
  [
    "decoration-emerald-500/50",
    ".decoration-emerald-500\\/50{text-decoration-color:rgb(16 185 129/.5);}",
  ],
  [
    "decoration-emerald-600/50",
    ".decoration-emerald-600\\/50{text-decoration-color:rgb(5 150 105/.5);}",
  ],
  [
    "decoration-emerald-700/50",
    ".decoration-emerald-700\\/50{text-decoration-color:rgb(4 120 87/.5);}",
  ],
  [
    "decoration-emerald-800/50",
    ".decoration-emerald-800\\/50{text-decoration-color:rgb(6 95 70/.5);}",
  ],
  [
    "decoration-emerald-900/50",
    ".decoration-emerald-900\\/50{text-decoration-color:rgb(6 78 59/.5);}",
  ],
  [
    "decoration-teal-50/50",
    ".decoration-teal-50\\/50{text-decoration-color:rgb(240 253 250/.5);}",
  ],
  [
    "decoration-teal-100/50",
    ".decoration-teal-100\\/50{text-decoration-color:rgb(204 251 241/.5);}",
  ],
  [
    "decoration-teal-200/50",
    ".decoration-teal-200\\/50{text-decoration-color:rgb(153 246 228/.5);}",
  ],
  [
    "decoration-teal-300/50",
    ".decoration-teal-300\\/50{text-decoration-color:rgb(94 234 212/.5);}",
  ],
  [
    "decoration-teal-400/50",
    ".decoration-teal-400\\/50{text-decoration-color:rgb(45 212 191/.5);}",
  ],
  [
    "decoration-teal-500/50",
    ".decoration-teal-500\\/50{text-decoration-color:rgb(20 184 166/.5);}",
  ],
  [
    "decoration-teal-600/50",
    ".decoration-teal-600\\/50{text-decoration-color:rgb(13 148 136/.5);}",
  ],
  [
    "decoration-teal-700/50",
    ".decoration-teal-700\\/50{text-decoration-color:rgb(15 118 110/.5);}",
  ],
  [
    "decoration-teal-800/50",
    ".decoration-teal-800\\/50{text-decoration-color:rgb(17 94 89/.5);}",
  ],
  [
    "decoration-teal-900/50",
    ".decoration-teal-900\\/50{text-decoration-color:rgb(19 78 74/.5);}",
  ],
  [
    "decoration-cyan-50/50",
    ".decoration-cyan-50\\/50{text-decoration-color:rgb(236 254 255/.5);}",
  ],
  [
    "decoration-cyan-100/50",
    ".decoration-cyan-100\\/50{text-decoration-color:rgb(207 250 254/.5);}",
  ],
  [
    "decoration-cyan-200/50",
    ".decoration-cyan-200\\/50{text-decoration-color:rgb(165 243 252/.5);}",
  ],
  [
    "decoration-cyan-300/50",
    ".decoration-cyan-300\\/50{text-decoration-color:rgb(103 232 249/.5);}",
  ],
  [
    "decoration-cyan-400/50",
    ".decoration-cyan-400\\/50{text-decoration-color:rgb(34 211 238/.5);}",
  ],
  [
    "decoration-cyan-500/50",
    ".decoration-cyan-500\\/50{text-decoration-color:rgb(6 182 212/.5);}",
  ],
  [
    "decoration-cyan-600/50",
    ".decoration-cyan-600\\/50{text-decoration-color:rgb(8 145 178/.5);}",
  ],
  [
    "decoration-cyan-700/50",
    ".decoration-cyan-700\\/50{text-decoration-color:rgb(14 116 144/.5);}",
  ],
  [
    "decoration-cyan-800/50",
    ".decoration-cyan-800\\/50{text-decoration-color:rgb(21 94 117/.5);}",
  ],
  [
    "decoration-cyan-900/50",
    ".decoration-cyan-900\\/50{text-decoration-color:rgb(22 78 99/.5);}",
  ],
  [
    "decoration-sky-50/50",
    ".decoration-sky-50\\/50{text-decoration-color:rgb(240 249 255/.5);}",
  ],
  [
    "decoration-sky-100/50",
    ".decoration-sky-100\\/50{text-decoration-color:rgb(224 242 254/.5);}",
  ],
  [
    "decoration-sky-200/50",
    ".decoration-sky-200\\/50{text-decoration-color:rgb(186 230 253/.5);}",
  ],
  [
    "decoration-sky-300/50",
    ".decoration-sky-300\\/50{text-decoration-color:rgb(125 211 252/.5);}",
  ],
  [
    "decoration-sky-400/50",
    ".decoration-sky-400\\/50{text-decoration-color:rgb(56 189 248/.5);}",
  ],
  [
    "decoration-sky-500/50",
    ".decoration-sky-500\\/50{text-decoration-color:rgb(14 165 233/.5);}",
  ],
  [
    "decoration-sky-600/50",
    ".decoration-sky-600\\/50{text-decoration-color:rgb(2 132 199/.5);}",
  ],
  [
    "decoration-sky-700/50",
    ".decoration-sky-700\\/50{text-decoration-color:rgb(3 105 161/.5);}",
  ],
  [
    "decoration-sky-800/50",
    ".decoration-sky-800\\/50{text-decoration-color:rgb(7 89 133/.5);}",
  ],
  [
    "decoration-sky-900/50",
    ".decoration-sky-900\\/50{text-decoration-color:rgb(12 74 110/.5);}",
  ],
  [
    "decoration-blue-50/50",
    ".decoration-blue-50\\/50{text-decoration-color:rgb(239 246 255/.5);}",
  ],
  [
    "decoration-blue-100/50",
    ".decoration-blue-100\\/50{text-decoration-color:rgb(219 234 254/.5);}",
  ],
  [
    "decoration-blue-200/50",
    ".decoration-blue-200\\/50{text-decoration-color:rgb(191 219 254/.5);}",
  ],
  [
    "decoration-blue-300/50",
    ".decoration-blue-300\\/50{text-decoration-color:rgb(147 197 253/.5);}",
  ],
  [
    "decoration-blue-400/50",
    ".decoration-blue-400\\/50{text-decoration-color:rgb(96 165 250/.5);}",
  ],
  [
    "decoration-blue-500/50",
    ".decoration-blue-500\\/50{text-decoration-color:rgb(59 130 246/.5);}",
  ],
  [
    "decoration-blue-600/50",
    ".decoration-blue-600\\/50{text-decoration-color:rgb(37 99 235/.5);}",
  ],
  [
    "decoration-blue-700/50",
    ".decoration-blue-700\\/50{text-decoration-color:rgb(29 78 216/.5);}",
  ],
  [
    "decoration-blue-800/50",
    ".decoration-blue-800\\/50{text-decoration-color:rgb(30 64 175/.5);}",
  ],
  [
    "decoration-blue-900/50",
    ".decoration-blue-900\\/50{text-decoration-color:rgb(30 58 138/.5);}",
  ],
  [
    "decoration-indigo-50/50",
    ".decoration-indigo-50\\/50{text-decoration-color:rgb(238 242 255/.5);}",
  ],
  [
    "decoration-indigo-100/50",
    ".decoration-indigo-100\\/50{text-decoration-color:rgb(224 231 255/.5);}",
  ],
  [
    "decoration-indigo-200/50",
    ".decoration-indigo-200\\/50{text-decoration-color:rgb(199 210 254/.5);}",
  ],
  [
    "decoration-indigo-300/50",
    ".decoration-indigo-300\\/50{text-decoration-color:rgb(165 180 252/.5);}",
  ],
  [
    "decoration-indigo-400/50",
    ".decoration-indigo-400\\/50{text-decoration-color:rgb(129 140 248/.5);}",
  ],
  [
    "decoration-indigo-500/50",
    ".decoration-indigo-500\\/50{text-decoration-color:rgb(99 102 241/.5);}",
  ],
  [
    "decoration-indigo-600/50",
    ".decoration-indigo-600\\/50{text-decoration-color:rgb(79 70 229/.5);}",
  ],
  [
    "decoration-indigo-700/50",
    ".decoration-indigo-700\\/50{text-decoration-color:rgb(67 56 202/.5);}",
  ],
  [
    "decoration-indigo-800/50",
    ".decoration-indigo-800\\/50{text-decoration-color:rgb(55 48 163/.5);}",
  ],
  [
    "decoration-indigo-900/50",
    ".decoration-indigo-900\\/50{text-decoration-color:rgb(49 46 129/.5);}",
  ],
  [
    "decoration-violet-50/50",
    ".decoration-violet-50\\/50{text-decoration-color:rgb(245 243 255/.5);}",
  ],
  [
    "decoration-violet-100/50",
    ".decoration-violet-100\\/50{text-decoration-color:rgb(237 233 254/.5);}",
  ],
  [
    "decoration-violet-200/50",
    ".decoration-violet-200\\/50{text-decoration-color:rgb(221 214 254/.5);}",
  ],
  [
    "decoration-violet-300/50",
    ".decoration-violet-300\\/50{text-decoration-color:rgb(196 181 253/.5);}",
  ],
  [
    "decoration-violet-400/50",
    ".decoration-violet-400\\/50{text-decoration-color:rgb(167 139 250/.5);}",
  ],
  [
    "decoration-violet-500/50",
    ".decoration-violet-500\\/50{text-decoration-color:rgb(139 92 246/.5);}",
  ],
  [
    "decoration-violet-600/50",
    ".decoration-violet-600\\/50{text-decoration-color:rgb(124 58 237/.5);}",
  ],
  [
    "decoration-violet-700/50",
    ".decoration-violet-700\\/50{text-decoration-color:rgb(109 40 217/.5);}",
  ],
  [
    "decoration-violet-800/50",
    ".decoration-violet-800\\/50{text-decoration-color:rgb(91 33 182/.5);}",
  ],
  [
    "decoration-violet-900/50",
    ".decoration-violet-900\\/50{text-decoration-color:rgb(76 29 149/.5);}",
  ],
  [
    "decoration-purple-50/50",
    ".decoration-purple-50\\/50{text-decoration-color:rgb(250 245 255/.5);}",
  ],
  [
    "decoration-purple-100/50",
    ".decoration-purple-100\\/50{text-decoration-color:rgb(243 232 255/.5);}",
  ],
  [
    "decoration-purple-200/50",
    ".decoration-purple-200\\/50{text-decoration-color:rgb(233 213 255/.5);}",
  ],
  [
    "decoration-purple-300/50",
    ".decoration-purple-300\\/50{text-decoration-color:rgb(216 180 254/.5);}",
  ],
  [
    "decoration-purple-400/50",
    ".decoration-purple-400\\/50{text-decoration-color:rgb(192 132 252/.5);}",
  ],
  [
    "decoration-purple-500/50",
    ".decoration-purple-500\\/50{text-decoration-color:rgb(168 85 247/.5);}",
  ],
  [
    "decoration-purple-600/50",
    ".decoration-purple-600\\/50{text-decoration-color:rgb(147 51 234/.5);}",
  ],
  [
    "decoration-purple-700/50",
    ".decoration-purple-700\\/50{text-decoration-color:rgb(126 34 206/.5);}",
  ],
  [
    "decoration-purple-800/50",
    ".decoration-purple-800\\/50{text-decoration-color:rgb(107 33 168/.5);}",
  ],
  [
    "decoration-purple-900/50",
    ".decoration-purple-900\\/50{text-decoration-color:rgb(88 28 135/.5);}",
  ],
  [
    "decoration-fuchsia-50/50",
    ".decoration-fuchsia-50\\/50{text-decoration-color:rgb(253 244 255/.5);}",
  ],
  [
    "decoration-fuchsia-100/50",
    ".decoration-fuchsia-100\\/50{text-decoration-color:rgb(250 232 255/.5);}",
  ],
  [
    "decoration-fuchsia-200/50",
    ".decoration-fuchsia-200\\/50{text-decoration-color:rgb(245 208 254/.5);}",
  ],
  [
    "decoration-fuchsia-300/50",
    ".decoration-fuchsia-300\\/50{text-decoration-color:rgb(240 171 252/.5);}",
  ],
  [
    "decoration-fuchsia-400/50",
    ".decoration-fuchsia-400\\/50{text-decoration-color:rgb(232 121 249/.5);}",
  ],
  [
    "decoration-fuchsia-500/50",
    ".decoration-fuchsia-500\\/50{text-decoration-color:rgb(217 70 239/.5);}",
  ],
  [
    "decoration-fuchsia-600/50",
    ".decoration-fuchsia-600\\/50{text-decoration-color:rgb(192 38 211/.5);}",
  ],
  [
    "decoration-fuchsia-700/50",
    ".decoration-fuchsia-700\\/50{text-decoration-color:rgb(162 28 175/.5);}",
  ],
  [
    "decoration-fuchsia-800/50",
    ".decoration-fuchsia-800\\/50{text-decoration-color:rgb(134 25 143/.5);}",
  ],
  [
    "decoration-fuchsia-900/50",
    ".decoration-fuchsia-900\\/50{text-decoration-color:rgb(112 26 117/.5);}",
  ],
  [
    "decoration-pink-50/50",
    ".decoration-pink-50\\/50{text-decoration-color:rgb(253 242 248/.5);}",
  ],
  [
    "decoration-pink-100/50",
    ".decoration-pink-100\\/50{text-decoration-color:rgb(252 231 243/.5);}",
  ],
  [
    "decoration-pink-200/50",
    ".decoration-pink-200\\/50{text-decoration-color:rgb(251 207 232/.5);}",
  ],
  [
    "decoration-pink-300/50",
    ".decoration-pink-300\\/50{text-decoration-color:rgb(249 168 212/.5);}",
  ],
  [
    "decoration-pink-400/50",
    ".decoration-pink-400\\/50{text-decoration-color:rgb(244 114 182/.5);}",
  ],
  [
    "decoration-pink-500/50",
    ".decoration-pink-500\\/50{text-decoration-color:rgb(236 72 153/.5);}",
  ],
  [
    "decoration-pink-600/50",
    ".decoration-pink-600\\/50{text-decoration-color:rgb(219 39 119/.5);}",
  ],
  [
    "decoration-pink-700/50",
    ".decoration-pink-700\\/50{text-decoration-color:rgb(190 24 93/.5);}",
  ],
  [
    "decoration-pink-800/50",
    ".decoration-pink-800\\/50{text-decoration-color:rgb(157 23 77/.5);}",
  ],
  [
    "decoration-pink-900/50",
    ".decoration-pink-900\\/50{text-decoration-color:rgb(131 24 67/.5);}",
  ],
  [
    "decoration-rose-50/50",
    ".decoration-rose-50\\/50{text-decoration-color:rgb(255 241 242/.5);}",
  ],
  [
    "decoration-rose-100/50",
    ".decoration-rose-100\\/50{text-decoration-color:rgb(255 228 230/.5);}",
  ],
  [
    "decoration-rose-200/50",
    ".decoration-rose-200\\/50{text-decoration-color:rgb(254 205 211/.5);}",
  ],
  [
    "decoration-rose-300/50",
    ".decoration-rose-300\\/50{text-decoration-color:rgb(253 164 175/.5);}",
  ],
  [
    "decoration-rose-400/50",
    ".decoration-rose-400\\/50{text-decoration-color:rgb(251 113 133/.5);}",
  ],
  [
    "decoration-rose-500/50",
    ".decoration-rose-500\\/50{text-decoration-color:rgb(244 63 94/.5);}",
  ],
  [
    "decoration-rose-600/50",
    ".decoration-rose-600\\/50{text-decoration-color:rgb(225 29 72/.5);}",
  ],
  [
    "decoration-rose-700/50",
    ".decoration-rose-700\\/50{text-decoration-color:rgb(190 18 60/.5);}",
  ],
  [
    "decoration-rose-800/50",
    ".decoration-rose-800\\/50{text-decoration-color:rgb(159 18 57/.5);}",
  ],
  [
    "decoration-rose-900/50",
    ".decoration-rose-900\\/50{text-decoration-color:rgb(136 19 55/.5);}",
  ],
  ["decoration-inherit/[1%]", ""],
  ["decoration-current/[1%]", ""],
  ["decoration-transparent/[1%]", ""],
  [
    "decoration-black/[1%]",
    ".decoration-black\\/\\[1\\%\\]{text-decoration-color:rgb(0 0 0/1%);}",
  ],
  [
    "decoration-white/[1%]",
    ".decoration-white\\/\\[1\\%\\]{text-decoration-color:rgb(255 255 255/1%);}",
  ],
  [
    "decoration-slate-50/[1%]",
    ".decoration-slate-50\\/\\[1\\%\\]{text-decoration-color:rgb(248 250 252/1%);}",
  ],
  [
    "decoration-slate-100/[1%]",
    ".decoration-slate-100\\/\\[1\\%\\]{text-decoration-color:rgb(241 245 249/1%);}",
  ],
  [
    "decoration-slate-200/[1%]",
    ".decoration-slate-200\\/\\[1\\%\\]{text-decoration-color:rgb(226 232 240/1%);}",
  ],
  [
    "decoration-slate-300/[1%]",
    ".decoration-slate-300\\/\\[1\\%\\]{text-decoration-color:rgb(203 213 225/1%);}",
  ],
  [
    "decoration-slate-400/[1%]",
    ".decoration-slate-400\\/\\[1\\%\\]{text-decoration-color:rgb(148 163 184/1%);}",
  ],
  [
    "decoration-slate-500/[1%]",
    ".decoration-slate-500\\/\\[1\\%\\]{text-decoration-color:rgb(100 116 139/1%);}",
  ],
  [
    "decoration-slate-600/[1%]",
    ".decoration-slate-600\\/\\[1\\%\\]{text-decoration-color:rgb(71 85 105/1%);}",
  ],
  [
    "decoration-slate-700/[1%]",
    ".decoration-slate-700\\/\\[1\\%\\]{text-decoration-color:rgb(51 65 85/1%);}",
  ],
  [
    "decoration-slate-800/[1%]",
    ".decoration-slate-800\\/\\[1\\%\\]{text-decoration-color:rgb(30 41 59/1%);}",
  ],
  [
    "decoration-slate-900/[1%]",
    ".decoration-slate-900\\/\\[1\\%\\]{text-decoration-color:rgb(15 23 42/1%);}",
  ],
  [
    "decoration-gray-50/[1%]",
    ".decoration-gray-50\\/\\[1\\%\\]{text-decoration-color:rgb(249 250 251/1%);}",
  ],
  [
    "decoration-gray-100/[1%]",
    ".decoration-gray-100\\/\\[1\\%\\]{text-decoration-color:rgb(243 244 246/1%);}",
  ],
  [
    "decoration-gray-200/[1%]",
    ".decoration-gray-200\\/\\[1\\%\\]{text-decoration-color:rgb(229 231 235/1%);}",
  ],
  [
    "decoration-gray-300/[1%]",
    ".decoration-gray-300\\/\\[1\\%\\]{text-decoration-color:rgb(209 213 219/1%);}",
  ],
  [
    "decoration-gray-400/[1%]",
    ".decoration-gray-400\\/\\[1\\%\\]{text-decoration-color:rgb(156 163 175/1%);}",
  ],
  [
    "decoration-gray-500/[1%]",
    ".decoration-gray-500\\/\\[1\\%\\]{text-decoration-color:rgb(107 114 128/1%);}",
  ],
  [
    "decoration-gray-600/[1%]",
    ".decoration-gray-600\\/\\[1\\%\\]{text-decoration-color:rgb(75 85 99/1%);}",
  ],
  [
    "decoration-gray-700/[1%]",
    ".decoration-gray-700\\/\\[1\\%\\]{text-decoration-color:rgb(55 65 81/1%);}",
  ],
  [
    "decoration-gray-800/[1%]",
    ".decoration-gray-800\\/\\[1\\%\\]{text-decoration-color:rgb(31 41 55/1%);}",
  ],
  [
    "decoration-gray-900/[1%]",
    ".decoration-gray-900\\/\\[1\\%\\]{text-decoration-color:rgb(17 24 39/1%);}",
  ],
  [
    "decoration-zinc-50/[1%]",
    ".decoration-zinc-50\\/\\[1\\%\\]{text-decoration-color:rgb(250 250 250/1%);}",
  ],
  [
    "decoration-zinc-100/[1%]",
    ".decoration-zinc-100\\/\\[1\\%\\]{text-decoration-color:rgb(244 244 245/1%);}",
  ],
  [
    "decoration-zinc-200/[1%]",
    ".decoration-zinc-200\\/\\[1\\%\\]{text-decoration-color:rgb(228 228 231/1%);}",
  ],
  [
    "decoration-zinc-300/[1%]",
    ".decoration-zinc-300\\/\\[1\\%\\]{text-decoration-color:rgb(212 212 216/1%);}",
  ],
  [
    "decoration-zinc-400/[1%]",
    ".decoration-zinc-400\\/\\[1\\%\\]{text-decoration-color:rgb(161 161 170/1%);}",
  ],
  [
    "decoration-zinc-500/[1%]",
    ".decoration-zinc-500\\/\\[1\\%\\]{text-decoration-color:rgb(113 113 122/1%);}",
  ],
  [
    "decoration-zinc-600/[1%]",
    ".decoration-zinc-600\\/\\[1\\%\\]{text-decoration-color:rgb(82 82 91/1%);}",
  ],
  [
    "decoration-zinc-700/[1%]",
    ".decoration-zinc-700\\/\\[1\\%\\]{text-decoration-color:rgb(63 63 70/1%);}",
  ],
  [
    "decoration-zinc-800/[1%]",
    ".decoration-zinc-800\\/\\[1\\%\\]{text-decoration-color:rgb(39 39 42/1%);}",
  ],
  [
    "decoration-zinc-900/[1%]",
    ".decoration-zinc-900\\/\\[1\\%\\]{text-decoration-color:rgb(24 24 27/1%);}",
  ],
  [
    "decoration-neutral-50/[1%]",
    ".decoration-neutral-50\\/\\[1\\%\\]{text-decoration-color:rgb(250 250 250/1%);}",
  ],
  [
    "decoration-neutral-100/[1%]",
    ".decoration-neutral-100\\/\\[1\\%\\]{text-decoration-color:rgb(245 245 245/1%);}",
  ],
  [
    "decoration-neutral-200/[1%]",
    ".decoration-neutral-200\\/\\[1\\%\\]{text-decoration-color:rgb(229 229 229/1%);}",
  ],
  [
    "decoration-neutral-300/[1%]",
    ".decoration-neutral-300\\/\\[1\\%\\]{text-decoration-color:rgb(212 212 212/1%);}",
  ],
  [
    "decoration-neutral-400/[1%]",
    ".decoration-neutral-400\\/\\[1\\%\\]{text-decoration-color:rgb(163 163 163/1%);}",
  ],
  [
    "decoration-neutral-500/[1%]",
    ".decoration-neutral-500\\/\\[1\\%\\]{text-decoration-color:rgb(115 115 115/1%);}",
  ],
  [
    "decoration-neutral-600/[1%]",
    ".decoration-neutral-600\\/\\[1\\%\\]{text-decoration-color:rgb(82 82 82/1%);}",
  ],
  [
    "decoration-neutral-700/[1%]",
    ".decoration-neutral-700\\/\\[1\\%\\]{text-decoration-color:rgb(64 64 64/1%);}",
  ],
  [
    "decoration-neutral-800/[1%]",
    ".decoration-neutral-800\\/\\[1\\%\\]{text-decoration-color:rgb(38 38 38/1%);}",
  ],
  [
    "decoration-neutral-900/[1%]",
    ".decoration-neutral-900\\/\\[1\\%\\]{text-decoration-color:rgb(23 23 23/1%);}",
  ],
  [
    "decoration-stone-50/[1%]",
    ".decoration-stone-50\\/\\[1\\%\\]{text-decoration-color:rgb(250 250 249/1%);}",
  ],
  [
    "decoration-stone-100/[1%]",
    ".decoration-stone-100\\/\\[1\\%\\]{text-decoration-color:rgb(245 245 244/1%);}",
  ],
  [
    "decoration-stone-200/[1%]",
    ".decoration-stone-200\\/\\[1\\%\\]{text-decoration-color:rgb(231 229 228/1%);}",
  ],
  [
    "decoration-stone-300/[1%]",
    ".decoration-stone-300\\/\\[1\\%\\]{text-decoration-color:rgb(214 211 209/1%);}",
  ],
  [
    "decoration-stone-400/[1%]",
    ".decoration-stone-400\\/\\[1\\%\\]{text-decoration-color:rgb(168 162 158/1%);}",
  ],
  [
    "decoration-stone-500/[1%]",
    ".decoration-stone-500\\/\\[1\\%\\]{text-decoration-color:rgb(120 113 108/1%);}",
  ],
  [
    "decoration-stone-600/[1%]",
    ".decoration-stone-600\\/\\[1\\%\\]{text-decoration-color:rgb(87 83 78/1%);}",
  ],
  [
    "decoration-stone-700/[1%]",
    ".decoration-stone-700\\/\\[1\\%\\]{text-decoration-color:rgb(68 64 60/1%);}",
  ],
  [
    "decoration-stone-800/[1%]",
    ".decoration-stone-800\\/\\[1\\%\\]{text-decoration-color:rgb(41 37 36/1%);}",
  ],
  [
    "decoration-stone-900/[1%]",
    ".decoration-stone-900\\/\\[1\\%\\]{text-decoration-color:rgb(28 25 23/1%);}",
  ],
  [
    "decoration-red-50/[1%]",
    ".decoration-red-50\\/\\[1\\%\\]{text-decoration-color:rgb(254 242 242/1%);}",
  ],
  [
    "decoration-red-100/[1%]",
    ".decoration-red-100\\/\\[1\\%\\]{text-decoration-color:rgb(254 226 226/1%);}",
  ],
  [
    "decoration-red-200/[1%]",
    ".decoration-red-200\\/\\[1\\%\\]{text-decoration-color:rgb(254 202 202/1%);}",
  ],
  [
    "decoration-red-300/[1%]",
    ".decoration-red-300\\/\\[1\\%\\]{text-decoration-color:rgb(252 165 165/1%);}",
  ],
  [
    "decoration-red-400/[1%]",
    ".decoration-red-400\\/\\[1\\%\\]{text-decoration-color:rgb(248 113 113/1%);}",
  ],
  [
    "decoration-red-500/[1%]",
    ".decoration-red-500\\/\\[1\\%\\]{text-decoration-color:rgb(239 68 68/1%);}",
  ],
  [
    "decoration-red-600/[1%]",
    ".decoration-red-600\\/\\[1\\%\\]{text-decoration-color:rgb(220 38 38/1%);}",
  ],
  [
    "decoration-red-700/[1%]",
    ".decoration-red-700\\/\\[1\\%\\]{text-decoration-color:rgb(185 28 28/1%);}",
  ],
  [
    "decoration-red-800/[1%]",
    ".decoration-red-800\\/\\[1\\%\\]{text-decoration-color:rgb(153 27 27/1%);}",
  ],
  [
    "decoration-red-900/[1%]",
    ".decoration-red-900\\/\\[1\\%\\]{text-decoration-color:rgb(127 29 29/1%);}",
  ],
  [
    "decoration-orange-50/[1%]",
    ".decoration-orange-50\\/\\[1\\%\\]{text-decoration-color:rgb(255 247 237/1%);}",
  ],
  [
    "decoration-orange-100/[1%]",
    ".decoration-orange-100\\/\\[1\\%\\]{text-decoration-color:rgb(255 237 213/1%);}",
  ],
  [
    "decoration-orange-200/[1%]",
    ".decoration-orange-200\\/\\[1\\%\\]{text-decoration-color:rgb(254 215 170/1%);}",
  ],
  [
    "decoration-orange-300/[1%]",
    ".decoration-orange-300\\/\\[1\\%\\]{text-decoration-color:rgb(253 186 116/1%);}",
  ],
  [
    "decoration-orange-400/[1%]",
    ".decoration-orange-400\\/\\[1\\%\\]{text-decoration-color:rgb(251 146 60/1%);}",
  ],
  [
    "decoration-orange-500/[1%]",
    ".decoration-orange-500\\/\\[1\\%\\]{text-decoration-color:rgb(249 115 22/1%);}",
  ],
  [
    "decoration-orange-600/[1%]",
    ".decoration-orange-600\\/\\[1\\%\\]{text-decoration-color:rgb(234 88 12/1%);}",
  ],
  [
    "decoration-orange-700/[1%]",
    ".decoration-orange-700\\/\\[1\\%\\]{text-decoration-color:rgb(194 65 12/1%);}",
  ],
  [
    "decoration-orange-800/[1%]",
    ".decoration-orange-800\\/\\[1\\%\\]{text-decoration-color:rgb(154 52 18/1%);}",
  ],
  [
    "decoration-orange-900/[1%]",
    ".decoration-orange-900\\/\\[1\\%\\]{text-decoration-color:rgb(124 45 18/1%);}",
  ],
  [
    "decoration-amber-50/[1%]",
    ".decoration-amber-50\\/\\[1\\%\\]{text-decoration-color:rgb(255 251 235/1%);}",
  ],
  [
    "decoration-amber-100/[1%]",
    ".decoration-amber-100\\/\\[1\\%\\]{text-decoration-color:rgb(254 243 199/1%);}",
  ],
  [
    "decoration-amber-200/[1%]",
    ".decoration-amber-200\\/\\[1\\%\\]{text-decoration-color:rgb(253 230 138/1%);}",
  ],
  [
    "decoration-amber-300/[1%]",
    ".decoration-amber-300\\/\\[1\\%\\]{text-decoration-color:rgb(252 211 77/1%);}",
  ],
  [
    "decoration-amber-400/[1%]",
    ".decoration-amber-400\\/\\[1\\%\\]{text-decoration-color:rgb(251 191 36/1%);}",
  ],
  [
    "decoration-amber-500/[1%]",
    ".decoration-amber-500\\/\\[1\\%\\]{text-decoration-color:rgb(245 158 11/1%);}",
  ],
  [
    "decoration-amber-600/[1%]",
    ".decoration-amber-600\\/\\[1\\%\\]{text-decoration-color:rgb(217 119 6/1%);}",
  ],
  [
    "decoration-amber-700/[1%]",
    ".decoration-amber-700\\/\\[1\\%\\]{text-decoration-color:rgb(180 83 9/1%);}",
  ],
  [
    "decoration-amber-800/[1%]",
    ".decoration-amber-800\\/\\[1\\%\\]{text-decoration-color:rgb(146 64 14/1%);}",
  ],
  [
    "decoration-amber-900/[1%]",
    ".decoration-amber-900\\/\\[1\\%\\]{text-decoration-color:rgb(120 53 15/1%);}",
  ],
  [
    "decoration-yellow-50/[1%]",
    ".decoration-yellow-50\\/\\[1\\%\\]{text-decoration-color:rgb(254 252 232/1%);}",
  ],
  [
    "decoration-yellow-100/[1%]",
    ".decoration-yellow-100\\/\\[1\\%\\]{text-decoration-color:rgb(254 249 195/1%);}",
  ],
  [
    "decoration-yellow-200/[1%]",
    ".decoration-yellow-200\\/\\[1\\%\\]{text-decoration-color:rgb(254 240 138/1%);}",
  ],
  [
    "decoration-yellow-300/[1%]",
    ".decoration-yellow-300\\/\\[1\\%\\]{text-decoration-color:rgb(253 224 71/1%);}",
  ],
  [
    "decoration-yellow-400/[1%]",
    ".decoration-yellow-400\\/\\[1\\%\\]{text-decoration-color:rgb(250 204 21/1%);}",
  ],
  [
    "decoration-yellow-500/[1%]",
    ".decoration-yellow-500\\/\\[1\\%\\]{text-decoration-color:rgb(234 179 8/1%);}",
  ],
  [
    "decoration-yellow-600/[1%]",
    ".decoration-yellow-600\\/\\[1\\%\\]{text-decoration-color:rgb(202 138 4/1%);}",
  ],
  [
    "decoration-yellow-700/[1%]",
    ".decoration-yellow-700\\/\\[1\\%\\]{text-decoration-color:rgb(161 98 7/1%);}",
  ],
  [
    "decoration-yellow-800/[1%]",
    ".decoration-yellow-800\\/\\[1\\%\\]{text-decoration-color:rgb(133 77 14/1%);}",
  ],
  [
    "decoration-yellow-900/[1%]",
    ".decoration-yellow-900\\/\\[1\\%\\]{text-decoration-color:rgb(113 63 18/1%);}",
  ],
  [
    "decoration-lime-50/[1%]",
    ".decoration-lime-50\\/\\[1\\%\\]{text-decoration-color:rgb(247 254 231/1%);}",
  ],
  [
    "decoration-lime-100/[1%]",
    ".decoration-lime-100\\/\\[1\\%\\]{text-decoration-color:rgb(236 252 203/1%);}",
  ],
  [
    "decoration-lime-200/[1%]",
    ".decoration-lime-200\\/\\[1\\%\\]{text-decoration-color:rgb(217 249 157/1%);}",
  ],
  [
    "decoration-lime-300/[1%]",
    ".decoration-lime-300\\/\\[1\\%\\]{text-decoration-color:rgb(190 242 100/1%);}",
  ],
  [
    "decoration-lime-400/[1%]",
    ".decoration-lime-400\\/\\[1\\%\\]{text-decoration-color:rgb(163 230 53/1%);}",
  ],
  [
    "decoration-lime-500/[1%]",
    ".decoration-lime-500\\/\\[1\\%\\]{text-decoration-color:rgb(132 204 22/1%);}",
  ],
  [
    "decoration-lime-600/[1%]",
    ".decoration-lime-600\\/\\[1\\%\\]{text-decoration-color:rgb(101 163 13/1%);}",
  ],
  [
    "decoration-lime-700/[1%]",
    ".decoration-lime-700\\/\\[1\\%\\]{text-decoration-color:rgb(77 124 15/1%);}",
  ],
  [
    "decoration-lime-800/[1%]",
    ".decoration-lime-800\\/\\[1\\%\\]{text-decoration-color:rgb(63 98 18/1%);}",
  ],
  [
    "decoration-lime-900/[1%]",
    ".decoration-lime-900\\/\\[1\\%\\]{text-decoration-color:rgb(54 83 20/1%);}",
  ],
  [
    "decoration-green-50/[1%]",
    ".decoration-green-50\\/\\[1\\%\\]{text-decoration-color:rgb(240 253 244/1%);}",
  ],
  [
    "decoration-green-100/[1%]",
    ".decoration-green-100\\/\\[1\\%\\]{text-decoration-color:rgb(220 252 231/1%);}",
  ],
  [
    "decoration-green-200/[1%]",
    ".decoration-green-200\\/\\[1\\%\\]{text-decoration-color:rgb(187 247 208/1%);}",
  ],
  [
    "decoration-green-300/[1%]",
    ".decoration-green-300\\/\\[1\\%\\]{text-decoration-color:rgb(134 239 172/1%);}",
  ],
  [
    "decoration-green-400/[1%]",
    ".decoration-green-400\\/\\[1\\%\\]{text-decoration-color:rgb(74 222 128/1%);}",
  ],
  [
    "decoration-green-500/[1%]",
    ".decoration-green-500\\/\\[1\\%\\]{text-decoration-color:rgb(34 197 94/1%);}",
  ],
  [
    "decoration-green-600/[1%]",
    ".decoration-green-600\\/\\[1\\%\\]{text-decoration-color:rgb(22 163 74/1%);}",
  ],
  [
    "decoration-green-700/[1%]",
    ".decoration-green-700\\/\\[1\\%\\]{text-decoration-color:rgb(21 128 61/1%);}",
  ],
  [
    "decoration-green-800/[1%]",
    ".decoration-green-800\\/\\[1\\%\\]{text-decoration-color:rgb(22 101 52/1%);}",
  ],
  [
    "decoration-green-900/[1%]",
    ".decoration-green-900\\/\\[1\\%\\]{text-decoration-color:rgb(20 83 45/1%);}",
  ],
  [
    "decoration-emerald-50/[1%]",
    ".decoration-emerald-50\\/\\[1\\%\\]{text-decoration-color:rgb(236 253 245/1%);}",
  ],
  [
    "decoration-emerald-100/[1%]",
    ".decoration-emerald-100\\/\\[1\\%\\]{text-decoration-color:rgb(209 250 229/1%);}",
  ],
  [
    "decoration-emerald-200/[1%]",
    ".decoration-emerald-200\\/\\[1\\%\\]{text-decoration-color:rgb(167 243 208/1%);}",
  ],
  [
    "decoration-emerald-300/[1%]",
    ".decoration-emerald-300\\/\\[1\\%\\]{text-decoration-color:rgb(110 231 183/1%);}",
  ],
  [
    "decoration-emerald-400/[1%]",
    ".decoration-emerald-400\\/\\[1\\%\\]{text-decoration-color:rgb(52 211 153/1%);}",
  ],
  [
    "decoration-emerald-500/[1%]",
    ".decoration-emerald-500\\/\\[1\\%\\]{text-decoration-color:rgb(16 185 129/1%);}",
  ],
  [
    "decoration-emerald-600/[1%]",
    ".decoration-emerald-600\\/\\[1\\%\\]{text-decoration-color:rgb(5 150 105/1%);}",
  ],
  [
    "decoration-emerald-700/[1%]",
    ".decoration-emerald-700\\/\\[1\\%\\]{text-decoration-color:rgb(4 120 87/1%);}",
  ],
  [
    "decoration-emerald-800/[1%]",
    ".decoration-emerald-800\\/\\[1\\%\\]{text-decoration-color:rgb(6 95 70/1%);}",
  ],
  [
    "decoration-emerald-900/[1%]",
    ".decoration-emerald-900\\/\\[1\\%\\]{text-decoration-color:rgb(6 78 59/1%);}",
  ],
  [
    "decoration-teal-50/[1%]",
    ".decoration-teal-50\\/\\[1\\%\\]{text-decoration-color:rgb(240 253 250/1%);}",
  ],
  [
    "decoration-teal-100/[1%]",
    ".decoration-teal-100\\/\\[1\\%\\]{text-decoration-color:rgb(204 251 241/1%);}",
  ],
  [
    "decoration-teal-200/[1%]",
    ".decoration-teal-200\\/\\[1\\%\\]{text-decoration-color:rgb(153 246 228/1%);}",
  ],
  [
    "decoration-teal-300/[1%]",
    ".decoration-teal-300\\/\\[1\\%\\]{text-decoration-color:rgb(94 234 212/1%);}",
  ],
  [
    "decoration-teal-400/[1%]",
    ".decoration-teal-400\\/\\[1\\%\\]{text-decoration-color:rgb(45 212 191/1%);}",
  ],
  [
    "decoration-teal-500/[1%]",
    ".decoration-teal-500\\/\\[1\\%\\]{text-decoration-color:rgb(20 184 166/1%);}",
  ],
  [
    "decoration-teal-600/[1%]",
    ".decoration-teal-600\\/\\[1\\%\\]{text-decoration-color:rgb(13 148 136/1%);}",
  ],
  [
    "decoration-teal-700/[1%]",
    ".decoration-teal-700\\/\\[1\\%\\]{text-decoration-color:rgb(15 118 110/1%);}",
  ],
  [
    "decoration-teal-800/[1%]",
    ".decoration-teal-800\\/\\[1\\%\\]{text-decoration-color:rgb(17 94 89/1%);}",
  ],
  [
    "decoration-teal-900/[1%]",
    ".decoration-teal-900\\/\\[1\\%\\]{text-decoration-color:rgb(19 78 74/1%);}",
  ],
  [
    "decoration-cyan-50/[1%]",
    ".decoration-cyan-50\\/\\[1\\%\\]{text-decoration-color:rgb(236 254 255/1%);}",
  ],
  [
    "decoration-cyan-100/[1%]",
    ".decoration-cyan-100\\/\\[1\\%\\]{text-decoration-color:rgb(207 250 254/1%);}",
  ],
  [
    "decoration-cyan-200/[1%]",
    ".decoration-cyan-200\\/\\[1\\%\\]{text-decoration-color:rgb(165 243 252/1%);}",
  ],
  [
    "decoration-cyan-300/[1%]",
    ".decoration-cyan-300\\/\\[1\\%\\]{text-decoration-color:rgb(103 232 249/1%);}",
  ],
  [
    "decoration-cyan-400/[1%]",
    ".decoration-cyan-400\\/\\[1\\%\\]{text-decoration-color:rgb(34 211 238/1%);}",
  ],
  [
    "decoration-cyan-500/[1%]",
    ".decoration-cyan-500\\/\\[1\\%\\]{text-decoration-color:rgb(6 182 212/1%);}",
  ],
  [
    "decoration-cyan-600/[1%]",
    ".decoration-cyan-600\\/\\[1\\%\\]{text-decoration-color:rgb(8 145 178/1%);}",
  ],
  [
    "decoration-cyan-700/[1%]",
    ".decoration-cyan-700\\/\\[1\\%\\]{text-decoration-color:rgb(14 116 144/1%);}",
  ],
  [
    "decoration-cyan-800/[1%]",
    ".decoration-cyan-800\\/\\[1\\%\\]{text-decoration-color:rgb(21 94 117/1%);}",
  ],
  [
    "decoration-cyan-900/[1%]",
    ".decoration-cyan-900\\/\\[1\\%\\]{text-decoration-color:rgb(22 78 99/1%);}",
  ],
  [
    "decoration-sky-50/[1%]",
    ".decoration-sky-50\\/\\[1\\%\\]{text-decoration-color:rgb(240 249 255/1%);}",
  ],
  [
    "decoration-sky-100/[1%]",
    ".decoration-sky-100\\/\\[1\\%\\]{text-decoration-color:rgb(224 242 254/1%);}",
  ],
  [
    "decoration-sky-200/[1%]",
    ".decoration-sky-200\\/\\[1\\%\\]{text-decoration-color:rgb(186 230 253/1%);}",
  ],
  [
    "decoration-sky-300/[1%]",
    ".decoration-sky-300\\/\\[1\\%\\]{text-decoration-color:rgb(125 211 252/1%);}",
  ],
  [
    "decoration-sky-400/[1%]",
    ".decoration-sky-400\\/\\[1\\%\\]{text-decoration-color:rgb(56 189 248/1%);}",
  ],
  [
    "decoration-sky-500/[1%]",
    ".decoration-sky-500\\/\\[1\\%\\]{text-decoration-color:rgb(14 165 233/1%);}",
  ],
  [
    "decoration-sky-600/[1%]",
    ".decoration-sky-600\\/\\[1\\%\\]{text-decoration-color:rgb(2 132 199/1%);}",
  ],
  [
    "decoration-sky-700/[1%]",
    ".decoration-sky-700\\/\\[1\\%\\]{text-decoration-color:rgb(3 105 161/1%);}",
  ],
  [
    "decoration-sky-800/[1%]",
    ".decoration-sky-800\\/\\[1\\%\\]{text-decoration-color:rgb(7 89 133/1%);}",
  ],
  [
    "decoration-sky-900/[1%]",
    ".decoration-sky-900\\/\\[1\\%\\]{text-decoration-color:rgb(12 74 110/1%);}",
  ],
  [
    "decoration-blue-50/[1%]",
    ".decoration-blue-50\\/\\[1\\%\\]{text-decoration-color:rgb(239 246 255/1%);}",
  ],
  [
    "decoration-blue-100/[1%]",
    ".decoration-blue-100\\/\\[1\\%\\]{text-decoration-color:rgb(219 234 254/1%);}",
  ],
  [
    "decoration-blue-200/[1%]",
    ".decoration-blue-200\\/\\[1\\%\\]{text-decoration-color:rgb(191 219 254/1%);}",
  ],
  [
    "decoration-blue-300/[1%]",
    ".decoration-blue-300\\/\\[1\\%\\]{text-decoration-color:rgb(147 197 253/1%);}",
  ],
  [
    "decoration-blue-400/[1%]",
    ".decoration-blue-400\\/\\[1\\%\\]{text-decoration-color:rgb(96 165 250/1%);}",
  ],
  [
    "decoration-blue-500/[1%]",
    ".decoration-blue-500\\/\\[1\\%\\]{text-decoration-color:rgb(59 130 246/1%);}",
  ],
  [
    "decoration-blue-600/[1%]",
    ".decoration-blue-600\\/\\[1\\%\\]{text-decoration-color:rgb(37 99 235/1%);}",
  ],
  [
    "decoration-blue-700/[1%]",
    ".decoration-blue-700\\/\\[1\\%\\]{text-decoration-color:rgb(29 78 216/1%);}",
  ],
  [
    "decoration-blue-800/[1%]",
    ".decoration-blue-800\\/\\[1\\%\\]{text-decoration-color:rgb(30 64 175/1%);}",
  ],
  [
    "decoration-blue-900/[1%]",
    ".decoration-blue-900\\/\\[1\\%\\]{text-decoration-color:rgb(30 58 138/1%);}",
  ],
  [
    "decoration-indigo-50/[1%]",
    ".decoration-indigo-50\\/\\[1\\%\\]{text-decoration-color:rgb(238 242 255/1%);}",
  ],
  [
    "decoration-indigo-100/[1%]",
    ".decoration-indigo-100\\/\\[1\\%\\]{text-decoration-color:rgb(224 231 255/1%);}",
  ],
  [
    "decoration-indigo-200/[1%]",
    ".decoration-indigo-200\\/\\[1\\%\\]{text-decoration-color:rgb(199 210 254/1%);}",
  ],
  [
    "decoration-indigo-300/[1%]",
    ".decoration-indigo-300\\/\\[1\\%\\]{text-decoration-color:rgb(165 180 252/1%);}",
  ],
  [
    "decoration-indigo-400/[1%]",
    ".decoration-indigo-400\\/\\[1\\%\\]{text-decoration-color:rgb(129 140 248/1%);}",
  ],
  [
    "decoration-indigo-500/[1%]",
    ".decoration-indigo-500\\/\\[1\\%\\]{text-decoration-color:rgb(99 102 241/1%);}",
  ],
  [
    "decoration-indigo-600/[1%]",
    ".decoration-indigo-600\\/\\[1\\%\\]{text-decoration-color:rgb(79 70 229/1%);}",
  ],
  [
    "decoration-indigo-700/[1%]",
    ".decoration-indigo-700\\/\\[1\\%\\]{text-decoration-color:rgb(67 56 202/1%);}",
  ],
  [
    "decoration-indigo-800/[1%]",
    ".decoration-indigo-800\\/\\[1\\%\\]{text-decoration-color:rgb(55 48 163/1%);}",
  ],
  [
    "decoration-indigo-900/[1%]",
    ".decoration-indigo-900\\/\\[1\\%\\]{text-decoration-color:rgb(49 46 129/1%);}",
  ],
  [
    "decoration-violet-50/[1%]",
    ".decoration-violet-50\\/\\[1\\%\\]{text-decoration-color:rgb(245 243 255/1%);}",
  ],
  [
    "decoration-violet-100/[1%]",
    ".decoration-violet-100\\/\\[1\\%\\]{text-decoration-color:rgb(237 233 254/1%);}",
  ],
  [
    "decoration-violet-200/[1%]",
    ".decoration-violet-200\\/\\[1\\%\\]{text-decoration-color:rgb(221 214 254/1%);}",
  ],
  [
    "decoration-violet-300/[1%]",
    ".decoration-violet-300\\/\\[1\\%\\]{text-decoration-color:rgb(196 181 253/1%);}",
  ],
  [
    "decoration-violet-400/[1%]",
    ".decoration-violet-400\\/\\[1\\%\\]{text-decoration-color:rgb(167 139 250/1%);}",
  ],
  [
    "decoration-violet-500/[1%]",
    ".decoration-violet-500\\/\\[1\\%\\]{text-decoration-color:rgb(139 92 246/1%);}",
  ],
  [
    "decoration-violet-600/[1%]",
    ".decoration-violet-600\\/\\[1\\%\\]{text-decoration-color:rgb(124 58 237/1%);}",
  ],
  [
    "decoration-violet-700/[1%]",
    ".decoration-violet-700\\/\\[1\\%\\]{text-decoration-color:rgb(109 40 217/1%);}",
  ],
  [
    "decoration-violet-800/[1%]",
    ".decoration-violet-800\\/\\[1\\%\\]{text-decoration-color:rgb(91 33 182/1%);}",
  ],
  [
    "decoration-violet-900/[1%]",
    ".decoration-violet-900\\/\\[1\\%\\]{text-decoration-color:rgb(76 29 149/1%);}",
  ],
  [
    "decoration-purple-50/[1%]",
    ".decoration-purple-50\\/\\[1\\%\\]{text-decoration-color:rgb(250 245 255/1%);}",
  ],
  [
    "decoration-purple-100/[1%]",
    ".decoration-purple-100\\/\\[1\\%\\]{text-decoration-color:rgb(243 232 255/1%);}",
  ],
  [
    "decoration-purple-200/[1%]",
    ".decoration-purple-200\\/\\[1\\%\\]{text-decoration-color:rgb(233 213 255/1%);}",
  ],
  [
    "decoration-purple-300/[1%]",
    ".decoration-purple-300\\/\\[1\\%\\]{text-decoration-color:rgb(216 180 254/1%);}",
  ],
  [
    "decoration-purple-400/[1%]",
    ".decoration-purple-400\\/\\[1\\%\\]{text-decoration-color:rgb(192 132 252/1%);}",
  ],
  [
    "decoration-purple-500/[1%]",
    ".decoration-purple-500\\/\\[1\\%\\]{text-decoration-color:rgb(168 85 247/1%);}",
  ],
  [
    "decoration-purple-600/[1%]",
    ".decoration-purple-600\\/\\[1\\%\\]{text-decoration-color:rgb(147 51 234/1%);}",
  ],
  [
    "decoration-purple-700/[1%]",
    ".decoration-purple-700\\/\\[1\\%\\]{text-decoration-color:rgb(126 34 206/1%);}",
  ],
  [
    "decoration-purple-800/[1%]",
    ".decoration-purple-800\\/\\[1\\%\\]{text-decoration-color:rgb(107 33 168/1%);}",
  ],
  [
    "decoration-purple-900/[1%]",
    ".decoration-purple-900\\/\\[1\\%\\]{text-decoration-color:rgb(88 28 135/1%);}",
  ],
  [
    "decoration-fuchsia-50/[1%]",
    ".decoration-fuchsia-50\\/\\[1\\%\\]{text-decoration-color:rgb(253 244 255/1%);}",
  ],
  [
    "decoration-fuchsia-100/[1%]",
    ".decoration-fuchsia-100\\/\\[1\\%\\]{text-decoration-color:rgb(250 232 255/1%);}",
  ],
  [
    "decoration-fuchsia-200/[1%]",
    ".decoration-fuchsia-200\\/\\[1\\%\\]{text-decoration-color:rgb(245 208 254/1%);}",
  ],
  [
    "decoration-fuchsia-300/[1%]",
    ".decoration-fuchsia-300\\/\\[1\\%\\]{text-decoration-color:rgb(240 171 252/1%);}",
  ],
  [
    "decoration-fuchsia-400/[1%]",
    ".decoration-fuchsia-400\\/\\[1\\%\\]{text-decoration-color:rgb(232 121 249/1%);}",
  ],
  [
    "decoration-fuchsia-500/[1%]",
    ".decoration-fuchsia-500\\/\\[1\\%\\]{text-decoration-color:rgb(217 70 239/1%);}",
  ],
  [
    "decoration-fuchsia-600/[1%]",
    ".decoration-fuchsia-600\\/\\[1\\%\\]{text-decoration-color:rgb(192 38 211/1%);}",
  ],
  [
    "decoration-fuchsia-700/[1%]",
    ".decoration-fuchsia-700\\/\\[1\\%\\]{text-decoration-color:rgb(162 28 175/1%);}",
  ],
  [
    "decoration-fuchsia-800/[1%]",
    ".decoration-fuchsia-800\\/\\[1\\%\\]{text-decoration-color:rgb(134 25 143/1%);}",
  ],
  [
    "decoration-fuchsia-900/[1%]",
    ".decoration-fuchsia-900\\/\\[1\\%\\]{text-decoration-color:rgb(112 26 117/1%);}",
  ],
  [
    "decoration-pink-50/[1%]",
    ".decoration-pink-50\\/\\[1\\%\\]{text-decoration-color:rgb(253 242 248/1%);}",
  ],
  [
    "decoration-pink-100/[1%]",
    ".decoration-pink-100\\/\\[1\\%\\]{text-decoration-color:rgb(252 231 243/1%);}",
  ],
  [
    "decoration-pink-200/[1%]",
    ".decoration-pink-200\\/\\[1\\%\\]{text-decoration-color:rgb(251 207 232/1%);}",
  ],
  [
    "decoration-pink-300/[1%]",
    ".decoration-pink-300\\/\\[1\\%\\]{text-decoration-color:rgb(249 168 212/1%);}",
  ],
  [
    "decoration-pink-400/[1%]",
    ".decoration-pink-400\\/\\[1\\%\\]{text-decoration-color:rgb(244 114 182/1%);}",
  ],
  [
    "decoration-pink-500/[1%]",
    ".decoration-pink-500\\/\\[1\\%\\]{text-decoration-color:rgb(236 72 153/1%);}",
  ],
  [
    "decoration-pink-600/[1%]",
    ".decoration-pink-600\\/\\[1\\%\\]{text-decoration-color:rgb(219 39 119/1%);}",
  ],
  [
    "decoration-pink-700/[1%]",
    ".decoration-pink-700\\/\\[1\\%\\]{text-decoration-color:rgb(190 24 93/1%);}",
  ],
  [
    "decoration-pink-800/[1%]",
    ".decoration-pink-800\\/\\[1\\%\\]{text-decoration-color:rgb(157 23 77/1%);}",
  ],
  [
    "decoration-pink-900/[1%]",
    ".decoration-pink-900\\/\\[1\\%\\]{text-decoration-color:rgb(131 24 67/1%);}",
  ],
  [
    "decoration-rose-50/[1%]",
    ".decoration-rose-50\\/\\[1\\%\\]{text-decoration-color:rgb(255 241 242/1%);}",
  ],
  [
    "decoration-rose-100/[1%]",
    ".decoration-rose-100\\/\\[1\\%\\]{text-decoration-color:rgb(255 228 230/1%);}",
  ],
  [
    "decoration-rose-200/[1%]",
    ".decoration-rose-200\\/\\[1\\%\\]{text-decoration-color:rgb(254 205 211/1%);}",
  ],
  [
    "decoration-rose-300/[1%]",
    ".decoration-rose-300\\/\\[1\\%\\]{text-decoration-color:rgb(253 164 175/1%);}",
  ],
  [
    "decoration-rose-400/[1%]",
    ".decoration-rose-400\\/\\[1\\%\\]{text-decoration-color:rgb(251 113 133/1%);}",
  ],
  [
    "decoration-rose-500/[1%]",
    ".decoration-rose-500\\/\\[1\\%\\]{text-decoration-color:rgb(244 63 94/1%);}",
  ],
  [
    "decoration-rose-600/[1%]",
    ".decoration-rose-600\\/\\[1\\%\\]{text-decoration-color:rgb(225 29 72/1%);}",
  ],
  [
    "decoration-rose-700/[1%]",
    ".decoration-rose-700\\/\\[1\\%\\]{text-decoration-color:rgb(190 18 60/1%);}",
  ],
  [
    "decoration-rose-800/[1%]",
    ".decoration-rose-800\\/\\[1\\%\\]{text-decoration-color:rgb(159 18 57/1%);}",
  ],
  [
    "decoration-rose-900/[1%]",
    ".decoration-rose-900\\/\\[1\\%\\]{text-decoration-color:rgb(136 19 55/1%);}",
  ],
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
  ["break-normal", ".break-normal{overflow-wrap:normal;word-break:normal;}"],
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
    ".rounded-r{border-bottom-right-radius:0.25rem;border-top-right-radius:0.25rem;}",
  ],
  [
    "rounded-b",
    ".rounded-b{border-bottom-left-radius:0.25rem;border-bottom-right-radius:0.25rem;}",
  ],
  [
    "rounded-l",
    ".rounded-l{border-bottom-left-radius:0.25rem;border-top-left-radius:0.25rem;}",
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
    ".rounded-r-none{border-bottom-right-radius:0px;border-top-right-radius:0px;}",
  ],
  [
    "rounded-r-sm",
    ".rounded-r-sm{border-bottom-right-radius:0.125rem;border-top-right-radius:0.125rem;}",
  ],
  [
    "rounded-r-md",
    ".rounded-r-md{border-bottom-right-radius:0.375rem;border-top-right-radius:0.375rem;}",
  ],
  [
    "rounded-r-lg",
    ".rounded-r-lg{border-bottom-right-radius:0.5rem;border-top-right-radius:0.5rem;}",
  ],
  [
    "rounded-r-xl",
    ".rounded-r-xl{border-bottom-right-radius:0.75rem;border-top-right-radius:0.75rem;}",
  ],
  [
    "rounded-r-2xl",
    ".rounded-r-2xl{border-bottom-right-radius:1rem;border-top-right-radius:1rem;}",
  ],
  [
    "rounded-r-3xl",
    ".rounded-r-3xl{border-bottom-right-radius:1.5rem;border-top-right-radius:1.5rem;}",
  ],
  [
    "rounded-r-full",
    ".rounded-r-full{border-bottom-right-radius:9999px;border-top-right-radius:9999px;}",
  ],
  [
    "rounded-b-none",
    ".rounded-b-none{border-bottom-left-radius:0px;border-bottom-right-radius:0px;}",
  ],
  [
    "rounded-b-sm",
    ".rounded-b-sm{border-bottom-left-radius:0.125rem;border-bottom-right-radius:0.125rem;}",
  ],
  [
    "rounded-b-md",
    ".rounded-b-md{border-bottom-left-radius:0.375rem;border-bottom-right-radius:0.375rem;}",
  ],
  [
    "rounded-b-lg",
    ".rounded-b-lg{border-bottom-left-radius:0.5rem;border-bottom-right-radius:0.5rem;}",
  ],
  [
    "rounded-b-xl",
    ".rounded-b-xl{border-bottom-left-radius:0.75rem;border-bottom-right-radius:0.75rem;}",
  ],
  [
    "rounded-b-2xl",
    ".rounded-b-2xl{border-bottom-left-radius:1rem;border-bottom-right-radius:1rem;}",
  ],
  [
    "rounded-b-3xl",
    ".rounded-b-3xl{border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem;}",
  ],
  [
    "rounded-b-full",
    ".rounded-b-full{border-bottom-left-radius:9999px;border-bottom-right-radius:9999px;}",
  ],
  [
    "rounded-l-none",
    ".rounded-l-none{border-bottom-left-radius:0px;border-top-left-radius:0px;}",
  ],
  [
    "rounded-l-sm",
    ".rounded-l-sm{border-bottom-left-radius:0.125rem;border-top-left-radius:0.125rem;}",
  ],
  [
    "rounded-l-md",
    ".rounded-l-md{border-bottom-left-radius:0.375rem;border-top-left-radius:0.375rem;}",
  ],
  [
    "rounded-l-lg",
    ".rounded-l-lg{border-bottom-left-radius:0.5rem;border-top-left-radius:0.5rem;}",
  ],
  [
    "rounded-l-xl",
    ".rounded-l-xl{border-bottom-left-radius:0.75rem;border-top-left-radius:0.75rem;}",
  ],
  [
    "rounded-l-2xl",
    ".rounded-l-2xl{border-bottom-left-radius:1rem;border-top-left-radius:1rem;}",
  ],
  [
    "rounded-l-3xl",
    ".rounded-l-3xl{border-bottom-left-radius:1.5rem;border-top-left-radius:1.5rem;}",
  ],
  [
    "rounded-l-full",
    ".rounded-l-full{border-bottom-left-radius:9999px;border-top-left-radius:9999px;}",
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
  ["border-y", ".border-y{border-bottom-width:1px;border-top-width:1px;}"],
  ["border-t", ".border-t{border-top-width:1px;}"],
  ["border-r", ".border-r{border-right-width:1px;}"],
  ["border-b", ".border-b{border-bottom-width:1px;}"],
  ["border-l", ".border-l{border-left-width:1px;}"],
  ["border-x-0", ".border-x-0{border-left-width:0px;border-right-width:0px;}"],
  ["border-x-2", ".border-x-2{border-left-width:2px;border-right-width:2px;}"],
  ["border-x-4", ".border-x-4{border-left-width:4px;border-right-width:4px;}"],
  ["border-x-8", ".border-x-8{border-left-width:8px;border-right-width:8px;}"],
  ["border-y-0", ".border-y-0{border-bottom-width:0px;border-top-width:0px;}"],
  ["border-y-2", ".border-y-2{border-bottom-width:2px;border-top-width:2px;}"],
  ["border-y-4", ".border-y-4{border-bottom-width:4px;border-top-width:4px;}"],
  ["border-y-8", ".border-y-8{border-bottom-width:8px;border-top-width:8px;}"],
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
  ["border-t-inherit", ".border-t-inherit{border-top-color:inherit;}"],
  ["border-t-current", ".border-t-current{border-top-color:currentColor;}"],
  [
    "border-t-transparent",
    ".border-t-transparent{border-top-color:transparent;}",
  ],
  ["border-t-black", ".border-t-black{border-top-color:rgba(0,0,0,1);}"],
  ["border-t-white", ".border-t-white{border-top-color:rgba(255,255,255,1);}"],
  ["border-r-inherit", ".border-r-inherit{border-right-color:inherit;}"],
  ["border-r-current", ".border-r-current{border-right-color:currentColor;}"],
  [
    "border-r-transparent",
    ".border-r-transparent{border-right-color:transparent;}",
  ],
  ["border-r-black", ".border-r-black{border-right-color:rgba(0,0,0,1);}"],
  [
    "border-r-white",
    ".border-r-white{border-right-color:rgba(255,255,255,1);}",
  ],
  ["border-b-inherit", ".border-b-inherit{border-bottom-color:inherit;}"],
  ["border-b-current", ".border-b-current{border-bottom-color:currentColor;}"],
  [
    "border-b-transparent",
    ".border-b-transparent{border-bottom-color:transparent;}",
  ],
  ["border-b-black", ".border-b-black{border-bottom-color:rgba(0,0,0,1);}"],
  [
    "border-b-white",
    ".border-b-white{border-bottom-color:rgba(255,255,255,1);}",
  ],
  ["border-l-inherit", ".border-l-inherit{border-left-color:inherit;}"],
  ["border-l-current", ".border-l-current{border-left-color:currentColor;}"],
  [
    "border-l-transparent",
    ".border-l-transparent{border-left-color:transparent;}",
  ],
  ["border-l-black", ".border-l-black{border-left-color:rgba(0,0,0,1);}"],
  ["border-l-white", ".border-l-white{border-left-color:rgba(255,255,255,1);}"],
  ["border-inherit", ".border-inherit{border-color:inherit;}"],
  ["border-current", ".border-current{border-color:currentColor;}"],
  ["border-transparent", ".border-transparent{border-color:transparent;}"],
  ["border-black", ".border-black{border-color:rgba(0,0,0,1);}"],
  ["border-white", ".border-white{border-color:rgba(255,255,255,1);}"],
  ["border-slate-50", ".border-slate-50{border-color:rgba(248,250,252,1);}"],
  ["border-slate-100", ".border-slate-100{border-color:rgba(241,245,249,1);}"],
  ["border-slate-200", ".border-slate-200{border-color:rgba(226,232,240,1);}"],
  ["border-slate-300", ".border-slate-300{border-color:rgba(203,213,225,1);}"],
  ["border-slate-400", ".border-slate-400{border-color:rgba(148,163,184,1);}"],
  ["border-slate-500", ".border-slate-500{border-color:rgba(100,116,139,1);}"],
  ["border-slate-600", ".border-slate-600{border-color:rgba(71,85,105,1);}"],
  ["border-slate-700", ".border-slate-700{border-color:rgba(51,65,85,1);}"],
  ["border-slate-800", ".border-slate-800{border-color:rgba(30,41,59,1);}"],
  ["border-slate-900", ".border-slate-900{border-color:rgba(15,23,42,1);}"],
  ["border-gray-50", ".border-gray-50{border-color:rgba(249,250,251,1);}"],
  ["border-gray-100", ".border-gray-100{border-color:rgba(243,244,246,1);}"],
  ["border-gray-200", ".border-gray-200{border-color:rgba(229,231,235,1);}"],
  ["border-gray-300", ".border-gray-300{border-color:rgba(209,213,219,1);}"],
  ["border-gray-400", ".border-gray-400{border-color:rgba(156,163,175,1);}"],
  ["border-gray-500", ".border-gray-500{border-color:rgba(107,114,128,1);}"],
  ["border-gray-600", ".border-gray-600{border-color:rgba(75,85,99,1);}"],
  ["border-gray-700", ".border-gray-700{border-color:rgba(55,65,81,1);}"],
  ["border-gray-800", ".border-gray-800{border-color:rgba(31,41,55,1);}"],
  ["border-gray-900", ".border-gray-900{border-color:rgba(17,24,39,1);}"],
  ["border-zinc-50", ".border-zinc-50{border-color:rgba(250,250,250,1);}"],
  ["border-zinc-100", ".border-zinc-100{border-color:rgba(244,244,245,1);}"],
  ["border-zinc-200", ".border-zinc-200{border-color:rgba(228,228,231,1);}"],
  ["border-zinc-300", ".border-zinc-300{border-color:rgba(212,212,216,1);}"],
  ["border-zinc-400", ".border-zinc-400{border-color:rgba(161,161,170,1);}"],
  ["border-zinc-500", ".border-zinc-500{border-color:rgba(113,113,122,1);}"],
  ["border-zinc-600", ".border-zinc-600{border-color:rgba(82,82,91,1);}"],
  ["border-zinc-700", ".border-zinc-700{border-color:rgba(63,63,70,1);}"],
  ["border-zinc-800", ".border-zinc-800{border-color:rgba(39,39,42,1);}"],
  ["border-zinc-900", ".border-zinc-900{border-color:rgba(24,24,27,1);}"],
  [
    "border-neutral-50",
    ".border-neutral-50{border-color:rgba(250,250,250,1);}",
  ],
  [
    "border-neutral-100",
    ".border-neutral-100{border-color:rgba(245,245,245,1);}",
  ],
  [
    "border-neutral-200",
    ".border-neutral-200{border-color:rgba(229,229,229,1);}",
  ],
  [
    "border-neutral-300",
    ".border-neutral-300{border-color:rgba(212,212,212,1);}",
  ],
  [
    "border-neutral-400",
    ".border-neutral-400{border-color:rgba(163,163,163,1);}",
  ],
  [
    "border-neutral-500",
    ".border-neutral-500{border-color:rgba(115,115,115,1);}",
  ],
  ["border-neutral-600", ".border-neutral-600{border-color:rgba(82,82,82,1);}"],
  ["border-neutral-700", ".border-neutral-700{border-color:rgba(64,64,64,1);}"],
  ["border-neutral-800", ".border-neutral-800{border-color:rgba(38,38,38,1);}"],
  ["border-neutral-900", ".border-neutral-900{border-color:rgba(23,23,23,1);}"],
  ["border-stone-50", ".border-stone-50{border-color:rgba(250,250,249,1);}"],
  ["border-stone-100", ".border-stone-100{border-color:rgba(245,245,244,1);}"],
  ["border-stone-200", ".border-stone-200{border-color:rgba(231,229,228,1);}"],
  ["border-stone-300", ".border-stone-300{border-color:rgba(214,211,209,1);}"],
  ["border-stone-400", ".border-stone-400{border-color:rgba(168,162,158,1);}"],
  ["border-stone-500", ".border-stone-500{border-color:rgba(120,113,108,1);}"],
  ["border-stone-600", ".border-stone-600{border-color:rgba(87,83,78,1);}"],
  ["border-stone-700", ".border-stone-700{border-color:rgba(68,64,60,1);}"],
  ["border-stone-800", ".border-stone-800{border-color:rgba(41,37,36,1);}"],
  ["border-stone-900", ".border-stone-900{border-color:rgba(28,25,23,1);}"],
  ["border-red-50", ".border-red-50{border-color:rgba(254,242,242,1);}"],
  ["border-red-100", ".border-red-100{border-color:rgba(254,226,226,1);}"],
  ["border-red-200", ".border-red-200{border-color:rgba(254,202,202,1);}"],
  ["border-red-300", ".border-red-300{border-color:rgba(252,165,165,1);}"],
  ["border-red-400", ".border-red-400{border-color:rgba(248,113,113,1);}"],
  ["border-red-500", ".border-red-500{border-color:rgba(239,68,68,1);}"],
  ["border-red-600", ".border-red-600{border-color:rgba(220,38,38,1);}"],
  ["border-red-700", ".border-red-700{border-color:rgba(185,28,28,1);}"],
  ["border-red-800", ".border-red-800{border-color:rgba(153,27,27,1);}"],
  ["border-red-900", ".border-red-900{border-color:rgba(127,29,29,1);}"],
  ["border-orange-50", ".border-orange-50{border-color:rgba(255,247,237,1);}"],
  [
    "border-orange-100",
    ".border-orange-100{border-color:rgba(255,237,213,1);}",
  ],
  [
    "border-orange-200",
    ".border-orange-200{border-color:rgba(254,215,170,1);}",
  ],
  [
    "border-orange-300",
    ".border-orange-300{border-color:rgba(253,186,116,1);}",
  ],
  ["border-orange-400", ".border-orange-400{border-color:rgba(251,146,60,1);}"],
  ["border-orange-500", ".border-orange-500{border-color:rgba(249,115,22,1);}"],
  ["border-orange-600", ".border-orange-600{border-color:rgba(234,88,12,1);}"],
  ["border-orange-700", ".border-orange-700{border-color:rgba(194,65,12,1);}"],
  ["border-orange-800", ".border-orange-800{border-color:rgba(154,52,18,1);}"],
  ["border-orange-900", ".border-orange-900{border-color:rgba(124,45,18,1);}"],
  ["border-amber-50", ".border-amber-50{border-color:rgba(255,251,235,1);}"],
  ["border-amber-100", ".border-amber-100{border-color:rgba(254,243,199,1);}"],
  ["border-amber-200", ".border-amber-200{border-color:rgba(253,230,138,1);}"],
  ["border-amber-300", ".border-amber-300{border-color:rgba(252,211,77,1);}"],
  ["border-amber-400", ".border-amber-400{border-color:rgba(251,191,36,1);}"],
  ["border-amber-500", ".border-amber-500{border-color:rgba(245,158,11,1);}"],
  ["border-amber-600", ".border-amber-600{border-color:rgba(217,119,6,1);}"],
  ["border-amber-700", ".border-amber-700{border-color:rgba(180,83,9,1);}"],
  ["border-amber-800", ".border-amber-800{border-color:rgba(146,64,14,1);}"],
  ["border-amber-900", ".border-amber-900{border-color:rgba(120,53,15,1);}"],
  ["border-yellow-50", ".border-yellow-50{border-color:rgba(254,252,232,1);}"],
  [
    "border-yellow-100",
    ".border-yellow-100{border-color:rgba(254,249,195,1);}",
  ],
  [
    "border-yellow-200",
    ".border-yellow-200{border-color:rgba(254,240,138,1);}",
  ],
  ["border-yellow-300", ".border-yellow-300{border-color:rgba(253,224,71,1);}"],
  ["border-yellow-400", ".border-yellow-400{border-color:rgba(250,204,21,1);}"],
  ["border-yellow-500", ".border-yellow-500{border-color:rgba(234,179,8,1);}"],
  ["border-yellow-600", ".border-yellow-600{border-color:rgba(202,138,4,1);}"],
  ["border-yellow-700", ".border-yellow-700{border-color:rgba(161,98,7,1);}"],
  ["border-yellow-800", ".border-yellow-800{border-color:rgba(133,77,14,1);}"],
  ["border-yellow-900", ".border-yellow-900{border-color:rgba(113,63,18,1);}"],
  ["border-lime-50", ".border-lime-50{border-color:rgba(247,254,231,1);}"],
  ["border-lime-100", ".border-lime-100{border-color:rgba(236,252,203,1);}"],
  ["border-lime-200", ".border-lime-200{border-color:rgba(217,249,157,1);}"],
  ["border-lime-300", ".border-lime-300{border-color:rgba(190,242,100,1);}"],
  ["border-lime-400", ".border-lime-400{border-color:rgba(163,230,53,1);}"],
  ["border-lime-500", ".border-lime-500{border-color:rgba(132,204,22,1);}"],
  ["border-lime-600", ".border-lime-600{border-color:rgba(101,163,13,1);}"],
  ["border-lime-700", ".border-lime-700{border-color:rgba(77,124,15,1);}"],
  ["border-lime-800", ".border-lime-800{border-color:rgba(63,98,18,1);}"],
  ["border-lime-900", ".border-lime-900{border-color:rgba(54,83,20,1);}"],
  ["border-green-50", ".border-green-50{border-color:rgba(240,253,244,1);}"],
  ["border-green-100", ".border-green-100{border-color:rgba(220,252,231,1);}"],
  ["border-green-200", ".border-green-200{border-color:rgba(187,247,208,1);}"],
  ["border-green-300", ".border-green-300{border-color:rgba(134,239,172,1);}"],
  ["border-green-400", ".border-green-400{border-color:rgba(74,222,128,1);}"],
  ["border-green-500", ".border-green-500{border-color:rgba(34,197,94,1);}"],
  ["border-green-600", ".border-green-600{border-color:rgba(22,163,74,1);}"],
  ["border-green-700", ".border-green-700{border-color:rgba(21,128,61,1);}"],
  ["border-green-800", ".border-green-800{border-color:rgba(22,101,52,1);}"],
  ["border-green-900", ".border-green-900{border-color:rgba(20,83,45,1);}"],
  [
    "border-emerald-50",
    ".border-emerald-50{border-color:rgba(236,253,245,1);}",
  ],
  [
    "border-emerald-100",
    ".border-emerald-100{border-color:rgba(209,250,229,1);}",
  ],
  [
    "border-emerald-200",
    ".border-emerald-200{border-color:rgba(167,243,208,1);}",
  ],
  [
    "border-emerald-300",
    ".border-emerald-300{border-color:rgba(110,231,183,1);}",
  ],
  [
    "border-emerald-400",
    ".border-emerald-400{border-color:rgba(52,211,153,1);}",
  ],
  [
    "border-emerald-500",
    ".border-emerald-500{border-color:rgba(16,185,129,1);}",
  ],
  [
    "border-emerald-600",
    ".border-emerald-600{border-color:rgba(5,150,105,1);}",
  ],
  ["border-emerald-700", ".border-emerald-700{border-color:rgba(4,120,87,1);}"],
  ["border-emerald-800", ".border-emerald-800{border-color:rgba(6,95,70,1);}"],
  ["border-emerald-900", ".border-emerald-900{border-color:rgba(6,78,59,1);}"],
  ["border-teal-50", ".border-teal-50{border-color:rgba(240,253,250,1);}"],
  ["border-teal-100", ".border-teal-100{border-color:rgba(204,251,241,1);}"],
  ["border-teal-200", ".border-teal-200{border-color:rgba(153,246,228,1);}"],
  ["border-teal-300", ".border-teal-300{border-color:rgba(94,234,212,1);}"],
  ["border-teal-400", ".border-teal-400{border-color:rgba(45,212,191,1);}"],
  ["border-teal-500", ".border-teal-500{border-color:rgba(20,184,166,1);}"],
  ["border-teal-600", ".border-teal-600{border-color:rgba(13,148,136,1);}"],
  ["border-teal-700", ".border-teal-700{border-color:rgba(15,118,110,1);}"],
  ["border-teal-800", ".border-teal-800{border-color:rgba(17,94,89,1);}"],
  ["border-teal-900", ".border-teal-900{border-color:rgba(19,78,74,1);}"],
  ["border-cyan-50", ".border-cyan-50{border-color:rgba(236,254,255,1);}"],
  ["border-cyan-100", ".border-cyan-100{border-color:rgba(207,250,254,1);}"],
  ["border-cyan-200", ".border-cyan-200{border-color:rgba(165,243,252,1);}"],
  ["border-cyan-300", ".border-cyan-300{border-color:rgba(103,232,249,1);}"],
  ["border-cyan-400", ".border-cyan-400{border-color:rgba(34,211,238,1);}"],
  ["border-cyan-500", ".border-cyan-500{border-color:rgba(6,182,212,1);}"],
  ["border-cyan-600", ".border-cyan-600{border-color:rgba(8,145,178,1);}"],
  ["border-cyan-700", ".border-cyan-700{border-color:rgba(14,116,144,1);}"],
  ["border-cyan-800", ".border-cyan-800{border-color:rgba(21,94,117,1);}"],
  ["border-cyan-900", ".border-cyan-900{border-color:rgba(22,78,99,1);}"],
  ["border-sky-50", ".border-sky-50{border-color:rgba(240,249,255,1);}"],
  ["border-sky-100", ".border-sky-100{border-color:rgba(224,242,254,1);}"],
  ["border-sky-200", ".border-sky-200{border-color:rgba(186,230,253,1);}"],
  ["border-sky-300", ".border-sky-300{border-color:rgba(125,211,252,1);}"],
  ["border-sky-400", ".border-sky-400{border-color:rgba(56,189,248,1);}"],
  ["border-sky-500", ".border-sky-500{border-color:rgba(14,165,233,1);}"],
  ["border-sky-600", ".border-sky-600{border-color:rgba(2,132,199,1);}"],
  ["border-sky-700", ".border-sky-700{border-color:rgba(3,105,161,1);}"],
  ["border-sky-800", ".border-sky-800{border-color:rgba(7,89,133,1);}"],
  ["border-sky-900", ".border-sky-900{border-color:rgba(12,74,110,1);}"],
  ["border-blue-50", ".border-blue-50{border-color:rgba(239,246,255,1);}"],
  ["border-blue-100", ".border-blue-100{border-color:rgba(219,234,254,1);}"],
  ["border-blue-200", ".border-blue-200{border-color:rgba(191,219,254,1);}"],
  ["border-blue-300", ".border-blue-300{border-color:rgba(147,197,253,1);}"],
  ["border-blue-400", ".border-blue-400{border-color:rgba(96,165,250,1);}"],
  ["border-blue-500", ".border-blue-500{border-color:rgba(59,130,246,1);}"],
  ["border-blue-600", ".border-blue-600{border-color:rgba(37,99,235,1);}"],
  ["border-blue-700", ".border-blue-700{border-color:rgba(29,78,216,1);}"],
  ["border-blue-800", ".border-blue-800{border-color:rgba(30,64,175,1);}"],
  ["border-blue-900", ".border-blue-900{border-color:rgba(30,58,138,1);}"],
  ["border-indigo-50", ".border-indigo-50{border-color:rgba(238,242,255,1);}"],
  [
    "border-indigo-100",
    ".border-indigo-100{border-color:rgba(224,231,255,1);}",
  ],
  [
    "border-indigo-200",
    ".border-indigo-200{border-color:rgba(199,210,254,1);}",
  ],
  [
    "border-indigo-300",
    ".border-indigo-300{border-color:rgba(165,180,252,1);}",
  ],
  [
    "border-indigo-400",
    ".border-indigo-400{border-color:rgba(129,140,248,1);}",
  ],
  ["border-indigo-500", ".border-indigo-500{border-color:rgba(99,102,241,1);}"],
  ["border-indigo-600", ".border-indigo-600{border-color:rgba(79,70,229,1);}"],
  ["border-indigo-700", ".border-indigo-700{border-color:rgba(67,56,202,1);}"],
  ["border-indigo-800", ".border-indigo-800{border-color:rgba(55,48,163,1);}"],
  ["border-indigo-900", ".border-indigo-900{border-color:rgba(49,46,129,1);}"],
  ["border-violet-50", ".border-violet-50{border-color:rgba(245,243,255,1);}"],
  [
    "border-violet-100",
    ".border-violet-100{border-color:rgba(237,233,254,1);}",
  ],
  [
    "border-violet-200",
    ".border-violet-200{border-color:rgba(221,214,254,1);}",
  ],
  [
    "border-violet-300",
    ".border-violet-300{border-color:rgba(196,181,253,1);}",
  ],
  [
    "border-violet-400",
    ".border-violet-400{border-color:rgba(167,139,250,1);}",
  ],
  ["border-violet-500", ".border-violet-500{border-color:rgba(139,92,246,1);}"],
  ["border-violet-600", ".border-violet-600{border-color:rgba(124,58,237,1);}"],
  ["border-violet-700", ".border-violet-700{border-color:rgba(109,40,217,1);}"],
  ["border-violet-800", ".border-violet-800{border-color:rgba(91,33,182,1);}"],
  ["border-violet-900", ".border-violet-900{border-color:rgba(76,29,149,1);}"],
  ["border-purple-50", ".border-purple-50{border-color:rgba(250,245,255,1);}"],
  [
    "border-purple-100",
    ".border-purple-100{border-color:rgba(243,232,255,1);}",
  ],
  [
    "border-purple-200",
    ".border-purple-200{border-color:rgba(233,213,255,1);}",
  ],
  [
    "border-purple-300",
    ".border-purple-300{border-color:rgba(216,180,254,1);}",
  ],
  [
    "border-purple-400",
    ".border-purple-400{border-color:rgba(192,132,252,1);}",
  ],
  ["border-purple-500", ".border-purple-500{border-color:rgba(168,85,247,1);}"],
  ["border-purple-600", ".border-purple-600{border-color:rgba(147,51,234,1);}"],
  ["border-purple-700", ".border-purple-700{border-color:rgba(126,34,206,1);}"],
  ["border-purple-800", ".border-purple-800{border-color:rgba(107,33,168,1);}"],
  ["border-purple-900", ".border-purple-900{border-color:rgba(88,28,135,1);}"],
  [
    "border-fuchsia-50",
    ".border-fuchsia-50{border-color:rgba(253,244,255,1);}",
  ],
  [
    "border-fuchsia-100",
    ".border-fuchsia-100{border-color:rgba(250,232,255,1);}",
  ],
  [
    "border-fuchsia-200",
    ".border-fuchsia-200{border-color:rgba(245,208,254,1);}",
  ],
  [
    "border-fuchsia-300",
    ".border-fuchsia-300{border-color:rgba(240,171,252,1);}",
  ],
  [
    "border-fuchsia-400",
    ".border-fuchsia-400{border-color:rgba(232,121,249,1);}",
  ],
  [
    "border-fuchsia-500",
    ".border-fuchsia-500{border-color:rgba(217,70,239,1);}",
  ],
  [
    "border-fuchsia-600",
    ".border-fuchsia-600{border-color:rgba(192,38,211,1);}",
  ],
  [
    "border-fuchsia-700",
    ".border-fuchsia-700{border-color:rgba(162,28,175,1);}",
  ],
  [
    "border-fuchsia-800",
    ".border-fuchsia-800{border-color:rgba(134,25,143,1);}",
  ],
  [
    "border-fuchsia-900",
    ".border-fuchsia-900{border-color:rgba(112,26,117,1);}",
  ],
  ["border-pink-50", ".border-pink-50{border-color:rgba(253,242,248,1);}"],
  ["border-pink-100", ".border-pink-100{border-color:rgba(252,231,243,1);}"],
  ["border-pink-200", ".border-pink-200{border-color:rgba(251,207,232,1);}"],
  ["border-pink-300", ".border-pink-300{border-color:rgba(249,168,212,1);}"],
  ["border-pink-400", ".border-pink-400{border-color:rgba(244,114,182,1);}"],
  ["border-pink-500", ".border-pink-500{border-color:rgba(236,72,153,1);}"],
  ["border-pink-600", ".border-pink-600{border-color:rgba(219,39,119,1);}"],
  ["border-pink-700", ".border-pink-700{border-color:rgba(190,24,93,1);}"],
  ["border-pink-800", ".border-pink-800{border-color:rgba(157,23,77,1);}"],
  ["border-pink-900", ".border-pink-900{border-color:rgba(131,24,67,1);}"],
  ["border-rose-50", ".border-rose-50{border-color:rgba(255,241,242,1);}"],
  ["border-rose-100", ".border-rose-100{border-color:rgba(255,228,230,1);}"],
  ["border-rose-200", ".border-rose-200{border-color:rgba(254,205,211,1);}"],
  ["border-rose-300", ".border-rose-300{border-color:rgba(253,164,175,1);}"],
  ["border-rose-400", ".border-rose-400{border-color:rgba(251,113,133,1);}"],
  ["border-rose-500", ".border-rose-500{border-color:rgba(244,63,94,1);}"],
  ["border-rose-600", ".border-rose-600{border-color:rgba(225,29,72,1);}"],
  ["border-rose-700", ".border-rose-700{border-color:rgba(190,18,60,1);}"],
  ["border-rose-800", ".border-rose-800{border-color:rgba(159,18,57,1);}"],
  ["border-rose-900", ".border-rose-900{border-color:rgba(136,19,55,1);}"],
  [
    "border-x-inherit",
    ".border-x-inherit{border-left-color:inherit;border-right-color:inherit;}",
  ],
  [
    "border-x-current",
    ".border-x-current{border-left-color:currentColor;border-right-color:currentColor;}",
  ],
  [
    "border-x-transparent",
    ".border-x-transparent{border-left-color:transparent;border-right-color:transparent;}",
  ],
  [
    "border-x-black",
    ".border-x-black{border-left-color:rgba(0,0,0,1);border-right-color:rgba(0,0,0,1);}",
  ],
  [
    "border-x-white",
    ".border-x-white{border-left-color:rgba(255,255,255,1);border-right-color:rgba(255,255,255,1);}",
  ],
  [
    "border-x-slate-50",
    ".border-x-slate-50{border-left-color:rgba(248,250,252,1);border-right-color:rgba(248,250,252,1);}",
  ],
  [
    "border-x-slate-100",
    ".border-x-slate-100{border-left-color:rgba(241,245,249,1);border-right-color:rgba(241,245,249,1);}",
  ],
  [
    "border-x-slate-200",
    ".border-x-slate-200{border-left-color:rgba(226,232,240,1);border-right-color:rgba(226,232,240,1);}",
  ],
  [
    "border-x-slate-300",
    ".border-x-slate-300{border-left-color:rgba(203,213,225,1);border-right-color:rgba(203,213,225,1);}",
  ],
  [
    "border-x-slate-400",
    ".border-x-slate-400{border-left-color:rgba(148,163,184,1);border-right-color:rgba(148,163,184,1);}",
  ],
  [
    "border-x-slate-500",
    ".border-x-slate-500{border-left-color:rgba(100,116,139,1);border-right-color:rgba(100,116,139,1);}",
  ],
  [
    "border-x-slate-600",
    ".border-x-slate-600{border-left-color:rgba(71,85,105,1);border-right-color:rgba(71,85,105,1);}",
  ],
  [
    "border-x-slate-700",
    ".border-x-slate-700{border-left-color:rgba(51,65,85,1);border-right-color:rgba(51,65,85,1);}",
  ],
  [
    "border-x-slate-800",
    ".border-x-slate-800{border-left-color:rgba(30,41,59,1);border-right-color:rgba(30,41,59,1);}",
  ],
  [
    "border-x-slate-900",
    ".border-x-slate-900{border-left-color:rgba(15,23,42,1);border-right-color:rgba(15,23,42,1);}",
  ],
  [
    "border-x-gray-50",
    ".border-x-gray-50{border-left-color:rgba(249,250,251,1);border-right-color:rgba(249,250,251,1);}",
  ],
  [
    "border-x-gray-100",
    ".border-x-gray-100{border-left-color:rgba(243,244,246,1);border-right-color:rgba(243,244,246,1);}",
  ],
  [
    "border-x-gray-200",
    ".border-x-gray-200{border-left-color:rgba(229,231,235,1);border-right-color:rgba(229,231,235,1);}",
  ],
  [
    "border-x-gray-300",
    ".border-x-gray-300{border-left-color:rgba(209,213,219,1);border-right-color:rgba(209,213,219,1);}",
  ],
  [
    "border-x-gray-400",
    ".border-x-gray-400{border-left-color:rgba(156,163,175,1);border-right-color:rgba(156,163,175,1);}",
  ],
  [
    "border-x-gray-500",
    ".border-x-gray-500{border-left-color:rgba(107,114,128,1);border-right-color:rgba(107,114,128,1);}",
  ],
  [
    "border-x-gray-600",
    ".border-x-gray-600{border-left-color:rgba(75,85,99,1);border-right-color:rgba(75,85,99,1);}",
  ],
  [
    "border-x-gray-700",
    ".border-x-gray-700{border-left-color:rgba(55,65,81,1);border-right-color:rgba(55,65,81,1);}",
  ],
  [
    "border-x-gray-800",
    ".border-x-gray-800{border-left-color:rgba(31,41,55,1);border-right-color:rgba(31,41,55,1);}",
  ],
  [
    "border-x-gray-900",
    ".border-x-gray-900{border-left-color:rgba(17,24,39,1);border-right-color:rgba(17,24,39,1);}",
  ],
  [
    "border-x-zinc-50",
    ".border-x-zinc-50{border-left-color:rgba(250,250,250,1);border-right-color:rgba(250,250,250,1);}",
  ],
  [
    "border-x-zinc-100",
    ".border-x-zinc-100{border-left-color:rgba(244,244,245,1);border-right-color:rgba(244,244,245,1);}",
  ],
  [
    "border-x-zinc-200",
    ".border-x-zinc-200{border-left-color:rgba(228,228,231,1);border-right-color:rgba(228,228,231,1);}",
  ],
  [
    "border-x-zinc-300",
    ".border-x-zinc-300{border-left-color:rgba(212,212,216,1);border-right-color:rgba(212,212,216,1);}",
  ],
  [
    "border-x-zinc-400",
    ".border-x-zinc-400{border-left-color:rgba(161,161,170,1);border-right-color:rgba(161,161,170,1);}",
  ],
  [
    "border-x-zinc-500",
    ".border-x-zinc-500{border-left-color:rgba(113,113,122,1);border-right-color:rgba(113,113,122,1);}",
  ],
  [
    "border-x-zinc-600",
    ".border-x-zinc-600{border-left-color:rgba(82,82,91,1);border-right-color:rgba(82,82,91,1);}",
  ],
  [
    "border-x-zinc-700",
    ".border-x-zinc-700{border-left-color:rgba(63,63,70,1);border-right-color:rgba(63,63,70,1);}",
  ],
  [
    "border-x-zinc-800",
    ".border-x-zinc-800{border-left-color:rgba(39,39,42,1);border-right-color:rgba(39,39,42,1);}",
  ],
  [
    "border-x-zinc-900",
    ".border-x-zinc-900{border-left-color:rgba(24,24,27,1);border-right-color:rgba(24,24,27,1);}",
  ],
  [
    "border-x-neutral-50",
    ".border-x-neutral-50{border-left-color:rgba(250,250,250,1);border-right-color:rgba(250,250,250,1);}",
  ],
  [
    "border-x-neutral-100",
    ".border-x-neutral-100{border-left-color:rgba(245,245,245,1);border-right-color:rgba(245,245,245,1);}",
  ],
  [
    "border-x-neutral-200",
    ".border-x-neutral-200{border-left-color:rgba(229,229,229,1);border-right-color:rgba(229,229,229,1);}",
  ],
  [
    "border-x-neutral-300",
    ".border-x-neutral-300{border-left-color:rgba(212,212,212,1);border-right-color:rgba(212,212,212,1);}",
  ],
  [
    "border-x-neutral-400",
    ".border-x-neutral-400{border-left-color:rgba(163,163,163,1);border-right-color:rgba(163,163,163,1);}",
  ],
  [
    "border-x-neutral-500",
    ".border-x-neutral-500{border-left-color:rgba(115,115,115,1);border-right-color:rgba(115,115,115,1);}",
  ],
  [
    "border-x-neutral-600",
    ".border-x-neutral-600{border-left-color:rgba(82,82,82,1);border-right-color:rgba(82,82,82,1);}",
  ],
  [
    "border-x-neutral-700",
    ".border-x-neutral-700{border-left-color:rgba(64,64,64,1);border-right-color:rgba(64,64,64,1);}",
  ],
  [
    "border-x-neutral-800",
    ".border-x-neutral-800{border-left-color:rgba(38,38,38,1);border-right-color:rgba(38,38,38,1);}",
  ],
  [
    "border-x-neutral-900",
    ".border-x-neutral-900{border-left-color:rgba(23,23,23,1);border-right-color:rgba(23,23,23,1);}",
  ],
  [
    "border-x-stone-50",
    ".border-x-stone-50{border-left-color:rgba(250,250,249,1);border-right-color:rgba(250,250,249,1);}",
  ],
  [
    "border-x-stone-100",
    ".border-x-stone-100{border-left-color:rgba(245,245,244,1);border-right-color:rgba(245,245,244,1);}",
  ],
  [
    "border-x-stone-200",
    ".border-x-stone-200{border-left-color:rgba(231,229,228,1);border-right-color:rgba(231,229,228,1);}",
  ],
  [
    "border-x-stone-300",
    ".border-x-stone-300{border-left-color:rgba(214,211,209,1);border-right-color:rgba(214,211,209,1);}",
  ],
  [
    "border-x-stone-400",
    ".border-x-stone-400{border-left-color:rgba(168,162,158,1);border-right-color:rgba(168,162,158,1);}",
  ],
  [
    "border-x-stone-500",
    ".border-x-stone-500{border-left-color:rgba(120,113,108,1);border-right-color:rgba(120,113,108,1);}",
  ],
  [
    "border-x-stone-600",
    ".border-x-stone-600{border-left-color:rgba(87,83,78,1);border-right-color:rgba(87,83,78,1);}",
  ],
  [
    "border-x-stone-700",
    ".border-x-stone-700{border-left-color:rgba(68,64,60,1);border-right-color:rgba(68,64,60,1);}",
  ],
  [
    "border-x-stone-800",
    ".border-x-stone-800{border-left-color:rgba(41,37,36,1);border-right-color:rgba(41,37,36,1);}",
  ],
  [
    "border-x-stone-900",
    ".border-x-stone-900{border-left-color:rgba(28,25,23,1);border-right-color:rgba(28,25,23,1);}",
  ],
  [
    "border-x-red-50",
    ".border-x-red-50{border-left-color:rgba(254,242,242,1);border-right-color:rgba(254,242,242,1);}",
  ],
  [
    "border-x-red-100",
    ".border-x-red-100{border-left-color:rgba(254,226,226,1);border-right-color:rgba(254,226,226,1);}",
  ],
  [
    "border-x-red-200",
    ".border-x-red-200{border-left-color:rgba(254,202,202,1);border-right-color:rgba(254,202,202,1);}",
  ],
  [
    "border-x-red-300",
    ".border-x-red-300{border-left-color:rgba(252,165,165,1);border-right-color:rgba(252,165,165,1);}",
  ],
  [
    "border-x-red-400",
    ".border-x-red-400{border-left-color:rgba(248,113,113,1);border-right-color:rgba(248,113,113,1);}",
  ],
  [
    "border-x-red-500",
    ".border-x-red-500{border-left-color:rgba(239,68,68,1);border-right-color:rgba(239,68,68,1);}",
  ],
  [
    "border-x-red-600",
    ".border-x-red-600{border-left-color:rgba(220,38,38,1);border-right-color:rgba(220,38,38,1);}",
  ],
  [
    "border-x-red-700",
    ".border-x-red-700{border-left-color:rgba(185,28,28,1);border-right-color:rgba(185,28,28,1);}",
  ],
  [
    "border-x-red-800",
    ".border-x-red-800{border-left-color:rgba(153,27,27,1);border-right-color:rgba(153,27,27,1);}",
  ],
  [
    "border-x-red-900",
    ".border-x-red-900{border-left-color:rgba(127,29,29,1);border-right-color:rgba(127,29,29,1);}",
  ],
  [
    "border-x-orange-50",
    ".border-x-orange-50{border-left-color:rgba(255,247,237,1);border-right-color:rgba(255,247,237,1);}",
  ],
  [
    "border-x-orange-100",
    ".border-x-orange-100{border-left-color:rgba(255,237,213,1);border-right-color:rgba(255,237,213,1);}",
  ],
  [
    "border-x-orange-200",
    ".border-x-orange-200{border-left-color:rgba(254,215,170,1);border-right-color:rgba(254,215,170,1);}",
  ],
  [
    "border-x-orange-300",
    ".border-x-orange-300{border-left-color:rgba(253,186,116,1);border-right-color:rgba(253,186,116,1);}",
  ],
  [
    "border-x-orange-400",
    ".border-x-orange-400{border-left-color:rgba(251,146,60,1);border-right-color:rgba(251,146,60,1);}",
  ],
  [
    "border-x-orange-500",
    ".border-x-orange-500{border-left-color:rgba(249,115,22,1);border-right-color:rgba(249,115,22,1);}",
  ],
  [
    "border-x-orange-600",
    ".border-x-orange-600{border-left-color:rgba(234,88,12,1);border-right-color:rgba(234,88,12,1);}",
  ],
  [
    "border-x-orange-700",
    ".border-x-orange-700{border-left-color:rgba(194,65,12,1);border-right-color:rgba(194,65,12,1);}",
  ],
  [
    "border-x-orange-800",
    ".border-x-orange-800{border-left-color:rgba(154,52,18,1);border-right-color:rgba(154,52,18,1);}",
  ],
  [
    "border-x-orange-900",
    ".border-x-orange-900{border-left-color:rgba(124,45,18,1);border-right-color:rgba(124,45,18,1);}",
  ],
  [
    "border-x-amber-50",
    ".border-x-amber-50{border-left-color:rgba(255,251,235,1);border-right-color:rgba(255,251,235,1);}",
  ],
  [
    "border-x-amber-100",
    ".border-x-amber-100{border-left-color:rgba(254,243,199,1);border-right-color:rgba(254,243,199,1);}",
  ],
  [
    "border-x-amber-200",
    ".border-x-amber-200{border-left-color:rgba(253,230,138,1);border-right-color:rgba(253,230,138,1);}",
  ],
  [
    "border-x-amber-300",
    ".border-x-amber-300{border-left-color:rgba(252,211,77,1);border-right-color:rgba(252,211,77,1);}",
  ],
  [
    "border-x-amber-400",
    ".border-x-amber-400{border-left-color:rgba(251,191,36,1);border-right-color:rgba(251,191,36,1);}",
  ],
  [
    "border-x-amber-500",
    ".border-x-amber-500{border-left-color:rgba(245,158,11,1);border-right-color:rgba(245,158,11,1);}",
  ],
  [
    "border-x-amber-600",
    ".border-x-amber-600{border-left-color:rgba(217,119,6,1);border-right-color:rgba(217,119,6,1);}",
  ],
  [
    "border-x-amber-700",
    ".border-x-amber-700{border-left-color:rgba(180,83,9,1);border-right-color:rgba(180,83,9,1);}",
  ],
  [
    "border-x-amber-800",
    ".border-x-amber-800{border-left-color:rgba(146,64,14,1);border-right-color:rgba(146,64,14,1);}",
  ],
  [
    "border-x-amber-900",
    ".border-x-amber-900{border-left-color:rgba(120,53,15,1);border-right-color:rgba(120,53,15,1);}",
  ],
  [
    "border-x-yellow-50",
    ".border-x-yellow-50{border-left-color:rgba(254,252,232,1);border-right-color:rgba(254,252,232,1);}",
  ],
  [
    "border-x-yellow-100",
    ".border-x-yellow-100{border-left-color:rgba(254,249,195,1);border-right-color:rgba(254,249,195,1);}",
  ],
  [
    "border-x-yellow-200",
    ".border-x-yellow-200{border-left-color:rgba(254,240,138,1);border-right-color:rgba(254,240,138,1);}",
  ],
  [
    "border-x-yellow-300",
    ".border-x-yellow-300{border-left-color:rgba(253,224,71,1);border-right-color:rgba(253,224,71,1);}",
  ],
  [
    "border-x-yellow-400",
    ".border-x-yellow-400{border-left-color:rgba(250,204,21,1);border-right-color:rgba(250,204,21,1);}",
  ],
  [
    "border-x-yellow-500",
    ".border-x-yellow-500{border-left-color:rgba(234,179,8,1);border-right-color:rgba(234,179,8,1);}",
  ],
  [
    "border-x-yellow-600",
    ".border-x-yellow-600{border-left-color:rgba(202,138,4,1);border-right-color:rgba(202,138,4,1);}",
  ],
  [
    "border-x-yellow-700",
    ".border-x-yellow-700{border-left-color:rgba(161,98,7,1);border-right-color:rgba(161,98,7,1);}",
  ],
  [
    "border-x-yellow-800",
    ".border-x-yellow-800{border-left-color:rgba(133,77,14,1);border-right-color:rgba(133,77,14,1);}",
  ],
  [
    "border-x-yellow-900",
    ".border-x-yellow-900{border-left-color:rgba(113,63,18,1);border-right-color:rgba(113,63,18,1);}",
  ],
  [
    "border-x-lime-50",
    ".border-x-lime-50{border-left-color:rgba(247,254,231,1);border-right-color:rgba(247,254,231,1);}",
  ],
  [
    "border-x-lime-100",
    ".border-x-lime-100{border-left-color:rgba(236,252,203,1);border-right-color:rgba(236,252,203,1);}",
  ],
  [
    "border-x-lime-200",
    ".border-x-lime-200{border-left-color:rgba(217,249,157,1);border-right-color:rgba(217,249,157,1);}",
  ],
  [
    "border-x-lime-300",
    ".border-x-lime-300{border-left-color:rgba(190,242,100,1);border-right-color:rgba(190,242,100,1);}",
  ],
  [
    "border-x-lime-400",
    ".border-x-lime-400{border-left-color:rgba(163,230,53,1);border-right-color:rgba(163,230,53,1);}",
  ],
  [
    "border-x-lime-500",
    ".border-x-lime-500{border-left-color:rgba(132,204,22,1);border-right-color:rgba(132,204,22,1);}",
  ],
  [
    "border-x-lime-600",
    ".border-x-lime-600{border-left-color:rgba(101,163,13,1);border-right-color:rgba(101,163,13,1);}",
  ],
  [
    "border-x-lime-700",
    ".border-x-lime-700{border-left-color:rgba(77,124,15,1);border-right-color:rgba(77,124,15,1);}",
  ],
  [
    "border-x-lime-800",
    ".border-x-lime-800{border-left-color:rgba(63,98,18,1);border-right-color:rgba(63,98,18,1);}",
  ],
  [
    "border-x-lime-900",
    ".border-x-lime-900{border-left-color:rgba(54,83,20,1);border-right-color:rgba(54,83,20,1);}",
  ],
  [
    "border-x-green-50",
    ".border-x-green-50{border-left-color:rgba(240,253,244,1);border-right-color:rgba(240,253,244,1);}",
  ],
  [
    "border-x-green-100",
    ".border-x-green-100{border-left-color:rgba(220,252,231,1);border-right-color:rgba(220,252,231,1);}",
  ],
  [
    "border-x-green-200",
    ".border-x-green-200{border-left-color:rgba(187,247,208,1);border-right-color:rgba(187,247,208,1);}",
  ],
  [
    "border-x-green-300",
    ".border-x-green-300{border-left-color:rgba(134,239,172,1);border-right-color:rgba(134,239,172,1);}",
  ],
  [
    "border-x-green-400",
    ".border-x-green-400{border-left-color:rgba(74,222,128,1);border-right-color:rgba(74,222,128,1);}",
  ],
  [
    "border-x-green-500",
    ".border-x-green-500{border-left-color:rgba(34,197,94,1);border-right-color:rgba(34,197,94,1);}",
  ],
  [
    "border-x-green-600",
    ".border-x-green-600{border-left-color:rgba(22,163,74,1);border-right-color:rgba(22,163,74,1);}",
  ],
  [
    "border-x-green-700",
    ".border-x-green-700{border-left-color:rgba(21,128,61,1);border-right-color:rgba(21,128,61,1);}",
  ],
  [
    "border-x-green-800",
    ".border-x-green-800{border-left-color:rgba(22,101,52,1);border-right-color:rgba(22,101,52,1);}",
  ],
  [
    "border-x-green-900",
    ".border-x-green-900{border-left-color:rgba(20,83,45,1);border-right-color:rgba(20,83,45,1);}",
  ],
  [
    "border-x-emerald-50",
    ".border-x-emerald-50{border-left-color:rgba(236,253,245,1);border-right-color:rgba(236,253,245,1);}",
  ],
  [
    "border-x-emerald-100",
    ".border-x-emerald-100{border-left-color:rgba(209,250,229,1);border-right-color:rgba(209,250,229,1);}",
  ],
  [
    "border-x-emerald-200",
    ".border-x-emerald-200{border-left-color:rgba(167,243,208,1);border-right-color:rgba(167,243,208,1);}",
  ],
  [
    "border-x-emerald-300",
    ".border-x-emerald-300{border-left-color:rgba(110,231,183,1);border-right-color:rgba(110,231,183,1);}",
  ],
  [
    "border-x-emerald-400",
    ".border-x-emerald-400{border-left-color:rgba(52,211,153,1);border-right-color:rgba(52,211,153,1);}",
  ],
  [
    "border-x-emerald-500",
    ".border-x-emerald-500{border-left-color:rgba(16,185,129,1);border-right-color:rgba(16,185,129,1);}",
  ],
  [
    "border-x-emerald-600",
    ".border-x-emerald-600{border-left-color:rgba(5,150,105,1);border-right-color:rgba(5,150,105,1);}",
  ],
  [
    "border-x-emerald-700",
    ".border-x-emerald-700{border-left-color:rgba(4,120,87,1);border-right-color:rgba(4,120,87,1);}",
  ],
  [
    "border-x-emerald-800",
    ".border-x-emerald-800{border-left-color:rgba(6,95,70,1);border-right-color:rgba(6,95,70,1);}",
  ],
  [
    "border-x-emerald-900",
    ".border-x-emerald-900{border-left-color:rgba(6,78,59,1);border-right-color:rgba(6,78,59,1);}",
  ],
  [
    "border-x-teal-50",
    ".border-x-teal-50{border-left-color:rgba(240,253,250,1);border-right-color:rgba(240,253,250,1);}",
  ],
  [
    "border-x-teal-100",
    ".border-x-teal-100{border-left-color:rgba(204,251,241,1);border-right-color:rgba(204,251,241,1);}",
  ],
  [
    "border-x-teal-200",
    ".border-x-teal-200{border-left-color:rgba(153,246,228,1);border-right-color:rgba(153,246,228,1);}",
  ],
  [
    "border-x-teal-300",
    ".border-x-teal-300{border-left-color:rgba(94,234,212,1);border-right-color:rgba(94,234,212,1);}",
  ],
  [
    "border-x-teal-400",
    ".border-x-teal-400{border-left-color:rgba(45,212,191,1);border-right-color:rgba(45,212,191,1);}",
  ],
  [
    "border-x-teal-500",
    ".border-x-teal-500{border-left-color:rgba(20,184,166,1);border-right-color:rgba(20,184,166,1);}",
  ],
  [
    "border-x-teal-600",
    ".border-x-teal-600{border-left-color:rgba(13,148,136,1);border-right-color:rgba(13,148,136,1);}",
  ],
  [
    "border-x-teal-700",
    ".border-x-teal-700{border-left-color:rgba(15,118,110,1);border-right-color:rgba(15,118,110,1);}",
  ],
  [
    "border-x-teal-800",
    ".border-x-teal-800{border-left-color:rgba(17,94,89,1);border-right-color:rgba(17,94,89,1);}",
  ],
  [
    "border-x-teal-900",
    ".border-x-teal-900{border-left-color:rgba(19,78,74,1);border-right-color:rgba(19,78,74,1);}",
  ],
  [
    "border-x-cyan-50",
    ".border-x-cyan-50{border-left-color:rgba(236,254,255,1);border-right-color:rgba(236,254,255,1);}",
  ],
  [
    "border-x-cyan-100",
    ".border-x-cyan-100{border-left-color:rgba(207,250,254,1);border-right-color:rgba(207,250,254,1);}",
  ],
  [
    "border-x-cyan-200",
    ".border-x-cyan-200{border-left-color:rgba(165,243,252,1);border-right-color:rgba(165,243,252,1);}",
  ],
  [
    "border-x-cyan-300",
    ".border-x-cyan-300{border-left-color:rgba(103,232,249,1);border-right-color:rgba(103,232,249,1);}",
  ],
  [
    "border-x-cyan-400",
    ".border-x-cyan-400{border-left-color:rgba(34,211,238,1);border-right-color:rgba(34,211,238,1);}",
  ],
  [
    "border-x-cyan-500",
    ".border-x-cyan-500{border-left-color:rgba(6,182,212,1);border-right-color:rgba(6,182,212,1);}",
  ],
  [
    "border-x-cyan-600",
    ".border-x-cyan-600{border-left-color:rgba(8,145,178,1);border-right-color:rgba(8,145,178,1);}",
  ],
  [
    "border-x-cyan-700",
    ".border-x-cyan-700{border-left-color:rgba(14,116,144,1);border-right-color:rgba(14,116,144,1);}",
  ],
  [
    "border-x-cyan-800",
    ".border-x-cyan-800{border-left-color:rgba(21,94,117,1);border-right-color:rgba(21,94,117,1);}",
  ],
  [
    "border-x-cyan-900",
    ".border-x-cyan-900{border-left-color:rgba(22,78,99,1);border-right-color:rgba(22,78,99,1);}",
  ],
  [
    "border-x-sky-50",
    ".border-x-sky-50{border-left-color:rgba(240,249,255,1);border-right-color:rgba(240,249,255,1);}",
  ],
  [
    "border-x-sky-100",
    ".border-x-sky-100{border-left-color:rgba(224,242,254,1);border-right-color:rgba(224,242,254,1);}",
  ],
  [
    "border-x-sky-200",
    ".border-x-sky-200{border-left-color:rgba(186,230,253,1);border-right-color:rgba(186,230,253,1);}",
  ],
  [
    "border-x-sky-300",
    ".border-x-sky-300{border-left-color:rgba(125,211,252,1);border-right-color:rgba(125,211,252,1);}",
  ],
  [
    "border-x-sky-400",
    ".border-x-sky-400{border-left-color:rgba(56,189,248,1);border-right-color:rgba(56,189,248,1);}",
  ],
  [
    "border-x-sky-500",
    ".border-x-sky-500{border-left-color:rgba(14,165,233,1);border-right-color:rgba(14,165,233,1);}",
  ],
  [
    "border-x-sky-600",
    ".border-x-sky-600{border-left-color:rgba(2,132,199,1);border-right-color:rgba(2,132,199,1);}",
  ],
  [
    "border-x-sky-700",
    ".border-x-sky-700{border-left-color:rgba(3,105,161,1);border-right-color:rgba(3,105,161,1);}",
  ],
  [
    "border-x-sky-800",
    ".border-x-sky-800{border-left-color:rgba(7,89,133,1);border-right-color:rgba(7,89,133,1);}",
  ],
  [
    "border-x-sky-900",
    ".border-x-sky-900{border-left-color:rgba(12,74,110,1);border-right-color:rgba(12,74,110,1);}",
  ],
  [
    "border-x-blue-50",
    ".border-x-blue-50{border-left-color:rgba(239,246,255,1);border-right-color:rgba(239,246,255,1);}",
  ],
  [
    "border-x-blue-100",
    ".border-x-blue-100{border-left-color:rgba(219,234,254,1);border-right-color:rgba(219,234,254,1);}",
  ],
  [
    "border-x-blue-200",
    ".border-x-blue-200{border-left-color:rgba(191,219,254,1);border-right-color:rgba(191,219,254,1);}",
  ],
  [
    "border-x-blue-300",
    ".border-x-blue-300{border-left-color:rgba(147,197,253,1);border-right-color:rgba(147,197,253,1);}",
  ],
  [
    "border-x-blue-400",
    ".border-x-blue-400{border-left-color:rgba(96,165,250,1);border-right-color:rgba(96,165,250,1);}",
  ],
  [
    "border-x-blue-500",
    ".border-x-blue-500{border-left-color:rgba(59,130,246,1);border-right-color:rgba(59,130,246,1);}",
  ],
  [
    "border-x-blue-600",
    ".border-x-blue-600{border-left-color:rgba(37,99,235,1);border-right-color:rgba(37,99,235,1);}",
  ],
  [
    "border-x-blue-700",
    ".border-x-blue-700{border-left-color:rgba(29,78,216,1);border-right-color:rgba(29,78,216,1);}",
  ],
  [
    "border-x-blue-800",
    ".border-x-blue-800{border-left-color:rgba(30,64,175,1);border-right-color:rgba(30,64,175,1);}",
  ],
  [
    "border-x-blue-900",
    ".border-x-blue-900{border-left-color:rgba(30,58,138,1);border-right-color:rgba(30,58,138,1);}",
  ],
  [
    "border-x-indigo-50",
    ".border-x-indigo-50{border-left-color:rgba(238,242,255,1);border-right-color:rgba(238,242,255,1);}",
  ],
  [
    "border-x-indigo-100",
    ".border-x-indigo-100{border-left-color:rgba(224,231,255,1);border-right-color:rgba(224,231,255,1);}",
  ],
  [
    "border-x-indigo-200",
    ".border-x-indigo-200{border-left-color:rgba(199,210,254,1);border-right-color:rgba(199,210,254,1);}",
  ],
  [
    "border-x-indigo-300",
    ".border-x-indigo-300{border-left-color:rgba(165,180,252,1);border-right-color:rgba(165,180,252,1);}",
  ],
  [
    "border-x-indigo-400",
    ".border-x-indigo-400{border-left-color:rgba(129,140,248,1);border-right-color:rgba(129,140,248,1);}",
  ],
  [
    "border-x-indigo-500",
    ".border-x-indigo-500{border-left-color:rgba(99,102,241,1);border-right-color:rgba(99,102,241,1);}",
  ],
  [
    "border-x-indigo-600",
    ".border-x-indigo-600{border-left-color:rgba(79,70,229,1);border-right-color:rgba(79,70,229,1);}",
  ],
  [
    "border-x-indigo-700",
    ".border-x-indigo-700{border-left-color:rgba(67,56,202,1);border-right-color:rgba(67,56,202,1);}",
  ],
  [
    "border-x-indigo-800",
    ".border-x-indigo-800{border-left-color:rgba(55,48,163,1);border-right-color:rgba(55,48,163,1);}",
  ],
  [
    "border-x-indigo-900",
    ".border-x-indigo-900{border-left-color:rgba(49,46,129,1);border-right-color:rgba(49,46,129,1);}",
  ],
  [
    "border-x-violet-50",
    ".border-x-violet-50{border-left-color:rgba(245,243,255,1);border-right-color:rgba(245,243,255,1);}",
  ],
  [
    "border-x-violet-100",
    ".border-x-violet-100{border-left-color:rgba(237,233,254,1);border-right-color:rgba(237,233,254,1);}",
  ],
  [
    "border-x-violet-200",
    ".border-x-violet-200{border-left-color:rgba(221,214,254,1);border-right-color:rgba(221,214,254,1);}",
  ],
  [
    "border-x-violet-300",
    ".border-x-violet-300{border-left-color:rgba(196,181,253,1);border-right-color:rgba(196,181,253,1);}",
  ],
  [
    "border-x-violet-400",
    ".border-x-violet-400{border-left-color:rgba(167,139,250,1);border-right-color:rgba(167,139,250,1);}",
  ],
  [
    "border-x-violet-500",
    ".border-x-violet-500{border-left-color:rgba(139,92,246,1);border-right-color:rgba(139,92,246,1);}",
  ],
  [
    "border-x-violet-600",
    ".border-x-violet-600{border-left-color:rgba(124,58,237,1);border-right-color:rgba(124,58,237,1);}",
  ],
  [
    "border-x-violet-700",
    ".border-x-violet-700{border-left-color:rgba(109,40,217,1);border-right-color:rgba(109,40,217,1);}",
  ],
  [
    "border-x-violet-800",
    ".border-x-violet-800{border-left-color:rgba(91,33,182,1);border-right-color:rgba(91,33,182,1);}",
  ],
  [
    "border-x-violet-900",
    ".border-x-violet-900{border-left-color:rgba(76,29,149,1);border-right-color:rgba(76,29,149,1);}",
  ],
  [
    "border-x-purple-50",
    ".border-x-purple-50{border-left-color:rgba(250,245,255,1);border-right-color:rgba(250,245,255,1);}",
  ],
  [
    "border-x-purple-100",
    ".border-x-purple-100{border-left-color:rgba(243,232,255,1);border-right-color:rgba(243,232,255,1);}",
  ],
  [
    "border-x-purple-200",
    ".border-x-purple-200{border-left-color:rgba(233,213,255,1);border-right-color:rgba(233,213,255,1);}",
  ],
  [
    "border-x-purple-300",
    ".border-x-purple-300{border-left-color:rgba(216,180,254,1);border-right-color:rgba(216,180,254,1);}",
  ],
  [
    "border-x-purple-400",
    ".border-x-purple-400{border-left-color:rgba(192,132,252,1);border-right-color:rgba(192,132,252,1);}",
  ],
  [
    "border-x-purple-500",
    ".border-x-purple-500{border-left-color:rgba(168,85,247,1);border-right-color:rgba(168,85,247,1);}",
  ],
  [
    "border-x-purple-600",
    ".border-x-purple-600{border-left-color:rgba(147,51,234,1);border-right-color:rgba(147,51,234,1);}",
  ],
  [
    "border-x-purple-700",
    ".border-x-purple-700{border-left-color:rgba(126,34,206,1);border-right-color:rgba(126,34,206,1);}",
  ],
  [
    "border-x-purple-800",
    ".border-x-purple-800{border-left-color:rgba(107,33,168,1);border-right-color:rgba(107,33,168,1);}",
  ],
  [
    "border-x-purple-900",
    ".border-x-purple-900{border-left-color:rgba(88,28,135,1);border-right-color:rgba(88,28,135,1);}",
  ],
  [
    "border-x-fuchsia-50",
    ".border-x-fuchsia-50{border-left-color:rgba(253,244,255,1);border-right-color:rgba(253,244,255,1);}",
  ],
  [
    "border-x-fuchsia-100",
    ".border-x-fuchsia-100{border-left-color:rgba(250,232,255,1);border-right-color:rgba(250,232,255,1);}",
  ],
  [
    "border-x-fuchsia-200",
    ".border-x-fuchsia-200{border-left-color:rgba(245,208,254,1);border-right-color:rgba(245,208,254,1);}",
  ],
  [
    "border-x-fuchsia-300",
    ".border-x-fuchsia-300{border-left-color:rgba(240,171,252,1);border-right-color:rgba(240,171,252,1);}",
  ],
  [
    "border-x-fuchsia-400",
    ".border-x-fuchsia-400{border-left-color:rgba(232,121,249,1);border-right-color:rgba(232,121,249,1);}",
  ],
  [
    "border-x-fuchsia-500",
    ".border-x-fuchsia-500{border-left-color:rgba(217,70,239,1);border-right-color:rgba(217,70,239,1);}",
  ],
  [
    "border-x-fuchsia-600",
    ".border-x-fuchsia-600{border-left-color:rgba(192,38,211,1);border-right-color:rgba(192,38,211,1);}",
  ],
  [
    "border-x-fuchsia-700",
    ".border-x-fuchsia-700{border-left-color:rgba(162,28,175,1);border-right-color:rgba(162,28,175,1);}",
  ],
  [
    "border-x-fuchsia-800",
    ".border-x-fuchsia-800{border-left-color:rgba(134,25,143,1);border-right-color:rgba(134,25,143,1);}",
  ],
  [
    "border-x-fuchsia-900",
    ".border-x-fuchsia-900{border-left-color:rgba(112,26,117,1);border-right-color:rgba(112,26,117,1);}",
  ],
  [
    "border-x-pink-50",
    ".border-x-pink-50{border-left-color:rgba(253,242,248,1);border-right-color:rgba(253,242,248,1);}",
  ],
  [
    "border-x-pink-100",
    ".border-x-pink-100{border-left-color:rgba(252,231,243,1);border-right-color:rgba(252,231,243,1);}",
  ],
  [
    "border-x-pink-200",
    ".border-x-pink-200{border-left-color:rgba(251,207,232,1);border-right-color:rgba(251,207,232,1);}",
  ],
  [
    "border-x-pink-300",
    ".border-x-pink-300{border-left-color:rgba(249,168,212,1);border-right-color:rgba(249,168,212,1);}",
  ],
  [
    "border-x-pink-400",
    ".border-x-pink-400{border-left-color:rgba(244,114,182,1);border-right-color:rgba(244,114,182,1);}",
  ],
  [
    "border-x-pink-500",
    ".border-x-pink-500{border-left-color:rgba(236,72,153,1);border-right-color:rgba(236,72,153,1);}",
  ],
  [
    "border-x-pink-600",
    ".border-x-pink-600{border-left-color:rgba(219,39,119,1);border-right-color:rgba(219,39,119,1);}",
  ],
  [
    "border-x-pink-700",
    ".border-x-pink-700{border-left-color:rgba(190,24,93,1);border-right-color:rgba(190,24,93,1);}",
  ],
  [
    "border-x-pink-800",
    ".border-x-pink-800{border-left-color:rgba(157,23,77,1);border-right-color:rgba(157,23,77,1);}",
  ],
  [
    "border-x-pink-900",
    ".border-x-pink-900{border-left-color:rgba(131,24,67,1);border-right-color:rgba(131,24,67,1);}",
  ],
  [
    "border-x-rose-50",
    ".border-x-rose-50{border-left-color:rgba(255,241,242,1);border-right-color:rgba(255,241,242,1);}",
  ],
  [
    "border-x-rose-100",
    ".border-x-rose-100{border-left-color:rgba(255,228,230,1);border-right-color:rgba(255,228,230,1);}",
  ],
  [
    "border-x-rose-200",
    ".border-x-rose-200{border-left-color:rgba(254,205,211,1);border-right-color:rgba(254,205,211,1);}",
  ],
  [
    "border-x-rose-300",
    ".border-x-rose-300{border-left-color:rgba(253,164,175,1);border-right-color:rgba(253,164,175,1);}",
  ],
  [
    "border-x-rose-400",
    ".border-x-rose-400{border-left-color:rgba(251,113,133,1);border-right-color:rgba(251,113,133,1);}",
  ],
  [
    "border-x-rose-500",
    ".border-x-rose-500{border-left-color:rgba(244,63,94,1);border-right-color:rgba(244,63,94,1);}",
  ],
  [
    "border-x-rose-600",
    ".border-x-rose-600{border-left-color:rgba(225,29,72,1);border-right-color:rgba(225,29,72,1);}",
  ],
  [
    "border-x-rose-700",
    ".border-x-rose-700{border-left-color:rgba(190,18,60,1);border-right-color:rgba(190,18,60,1);}",
  ],
  [
    "border-x-rose-800",
    ".border-x-rose-800{border-left-color:rgba(159,18,57,1);border-right-color:rgba(159,18,57,1);}",
  ],
  [
    "border-x-rose-900",
    ".border-x-rose-900{border-left-color:rgba(136,19,55,1);border-right-color:rgba(136,19,55,1);}",
  ],
  [
    "border-y-inherit",
    ".border-y-inherit{border-bottom-color:inherit;border-top-color:inherit;}",
  ],
  [
    "border-y-current",
    ".border-y-current{border-bottom-color:currentColor;border-top-color:currentColor;}",
  ],
  [
    "border-y-transparent",
    ".border-y-transparent{border-bottom-color:transparent;border-top-color:transparent;}",
  ],
  [
    "border-y-black",
    ".border-y-black{border-bottom-color:rgba(0,0,0,1);border-top-color:rgba(0,0,0,1);}",
  ],
  [
    "border-y-white",
    ".border-y-white{border-bottom-color:rgba(255,255,255,1);border-top-color:rgba(255,255,255,1);}",
  ],
  [
    "border-y-slate-50",
    ".border-y-slate-50{border-bottom-color:rgba(248,250,252,1);border-top-color:rgba(248,250,252,1);}",
  ],
  [
    "border-y-slate-100",
    ".border-y-slate-100{border-bottom-color:rgba(241,245,249,1);border-top-color:rgba(241,245,249,1);}",
  ],
  [
    "border-y-slate-200",
    ".border-y-slate-200{border-bottom-color:rgba(226,232,240,1);border-top-color:rgba(226,232,240,1);}",
  ],
  [
    "border-y-slate-300",
    ".border-y-slate-300{border-bottom-color:rgba(203,213,225,1);border-top-color:rgba(203,213,225,1);}",
  ],
  [
    "border-y-slate-400",
    ".border-y-slate-400{border-bottom-color:rgba(148,163,184,1);border-top-color:rgba(148,163,184,1);}",
  ],
  [
    "border-y-slate-500",
    ".border-y-slate-500{border-bottom-color:rgba(100,116,139,1);border-top-color:rgba(100,116,139,1);}",
  ],
  [
    "border-y-slate-600",
    ".border-y-slate-600{border-bottom-color:rgba(71,85,105,1);border-top-color:rgba(71,85,105,1);}",
  ],
  [
    "border-y-slate-700",
    ".border-y-slate-700{border-bottom-color:rgba(51,65,85,1);border-top-color:rgba(51,65,85,1);}",
  ],
  [
    "border-y-slate-800",
    ".border-y-slate-800{border-bottom-color:rgba(30,41,59,1);border-top-color:rgba(30,41,59,1);}",
  ],
  [
    "border-y-slate-900",
    ".border-y-slate-900{border-bottom-color:rgba(15,23,42,1);border-top-color:rgba(15,23,42,1);}",
  ],
  [
    "border-y-gray-50",
    ".border-y-gray-50{border-bottom-color:rgba(249,250,251,1);border-top-color:rgba(249,250,251,1);}",
  ],
  [
    "border-y-gray-100",
    ".border-y-gray-100{border-bottom-color:rgba(243,244,246,1);border-top-color:rgba(243,244,246,1);}",
  ],
  [
    "border-y-gray-200",
    ".border-y-gray-200{border-bottom-color:rgba(229,231,235,1);border-top-color:rgba(229,231,235,1);}",
  ],
  [
    "border-y-gray-300",
    ".border-y-gray-300{border-bottom-color:rgba(209,213,219,1);border-top-color:rgba(209,213,219,1);}",
  ],
  [
    "border-y-gray-400",
    ".border-y-gray-400{border-bottom-color:rgba(156,163,175,1);border-top-color:rgba(156,163,175,1);}",
  ],
  [
    "border-y-gray-500",
    ".border-y-gray-500{border-bottom-color:rgba(107,114,128,1);border-top-color:rgba(107,114,128,1);}",
  ],
  [
    "border-y-gray-600",
    ".border-y-gray-600{border-bottom-color:rgba(75,85,99,1);border-top-color:rgba(75,85,99,1);}",
  ],
  [
    "border-y-gray-700",
    ".border-y-gray-700{border-bottom-color:rgba(55,65,81,1);border-top-color:rgba(55,65,81,1);}",
  ],
  [
    "border-y-gray-800",
    ".border-y-gray-800{border-bottom-color:rgba(31,41,55,1);border-top-color:rgba(31,41,55,1);}",
  ],
  [
    "border-y-gray-900",
    ".border-y-gray-900{border-bottom-color:rgba(17,24,39,1);border-top-color:rgba(17,24,39,1);}",
  ],
  [
    "border-y-zinc-50",
    ".border-y-zinc-50{border-bottom-color:rgba(250,250,250,1);border-top-color:rgba(250,250,250,1);}",
  ],
  [
    "border-y-zinc-100",
    ".border-y-zinc-100{border-bottom-color:rgba(244,244,245,1);border-top-color:rgba(244,244,245,1);}",
  ],
  [
    "border-y-zinc-200",
    ".border-y-zinc-200{border-bottom-color:rgba(228,228,231,1);border-top-color:rgba(228,228,231,1);}",
  ],
  [
    "border-y-zinc-300",
    ".border-y-zinc-300{border-bottom-color:rgba(212,212,216,1);border-top-color:rgba(212,212,216,1);}",
  ],
  [
    "border-y-zinc-400",
    ".border-y-zinc-400{border-bottom-color:rgba(161,161,170,1);border-top-color:rgba(161,161,170,1);}",
  ],
  [
    "border-y-zinc-500",
    ".border-y-zinc-500{border-bottom-color:rgba(113,113,122,1);border-top-color:rgba(113,113,122,1);}",
  ],
  [
    "border-y-zinc-600",
    ".border-y-zinc-600{border-bottom-color:rgba(82,82,91,1);border-top-color:rgba(82,82,91,1);}",
  ],
  [
    "border-y-zinc-700",
    ".border-y-zinc-700{border-bottom-color:rgba(63,63,70,1);border-top-color:rgba(63,63,70,1);}",
  ],
  [
    "border-y-zinc-800",
    ".border-y-zinc-800{border-bottom-color:rgba(39,39,42,1);border-top-color:rgba(39,39,42,1);}",
  ],
  [
    "border-y-zinc-900",
    ".border-y-zinc-900{border-bottom-color:rgba(24,24,27,1);border-top-color:rgba(24,24,27,1);}",
  ],
  [
    "border-y-neutral-50",
    ".border-y-neutral-50{border-bottom-color:rgba(250,250,250,1);border-top-color:rgba(250,250,250,1);}",
  ],
  [
    "border-y-neutral-100",
    ".border-y-neutral-100{border-bottom-color:rgba(245,245,245,1);border-top-color:rgba(245,245,245,1);}",
  ],
  [
    "border-y-neutral-200",
    ".border-y-neutral-200{border-bottom-color:rgba(229,229,229,1);border-top-color:rgba(229,229,229,1);}",
  ],
  [
    "border-y-neutral-300",
    ".border-y-neutral-300{border-bottom-color:rgba(212,212,212,1);border-top-color:rgba(212,212,212,1);}",
  ],
  [
    "border-y-neutral-400",
    ".border-y-neutral-400{border-bottom-color:rgba(163,163,163,1);border-top-color:rgba(163,163,163,1);}",
  ],
  [
    "border-y-neutral-500",
    ".border-y-neutral-500{border-bottom-color:rgba(115,115,115,1);border-top-color:rgba(115,115,115,1);}",
  ],
  [
    "border-y-neutral-600",
    ".border-y-neutral-600{border-bottom-color:rgba(82,82,82,1);border-top-color:rgba(82,82,82,1);}",
  ],
  [
    "border-y-neutral-700",
    ".border-y-neutral-700{border-bottom-color:rgba(64,64,64,1);border-top-color:rgba(64,64,64,1);}",
  ],
  [
    "border-y-neutral-800",
    ".border-y-neutral-800{border-bottom-color:rgba(38,38,38,1);border-top-color:rgba(38,38,38,1);}",
  ],
  [
    "border-y-neutral-900",
    ".border-y-neutral-900{border-bottom-color:rgba(23,23,23,1);border-top-color:rgba(23,23,23,1);}",
  ],
  [
    "border-y-stone-50",
    ".border-y-stone-50{border-bottom-color:rgba(250,250,249,1);border-top-color:rgba(250,250,249,1);}",
  ],
  [
    "border-y-stone-100",
    ".border-y-stone-100{border-bottom-color:rgba(245,245,244,1);border-top-color:rgba(245,245,244,1);}",
  ],
  [
    "border-y-stone-200",
    ".border-y-stone-200{border-bottom-color:rgba(231,229,228,1);border-top-color:rgba(231,229,228,1);}",
  ],
  [
    "border-y-stone-300",
    ".border-y-stone-300{border-bottom-color:rgba(214,211,209,1);border-top-color:rgba(214,211,209,1);}",
  ],
  [
    "border-y-stone-400",
    ".border-y-stone-400{border-bottom-color:rgba(168,162,158,1);border-top-color:rgba(168,162,158,1);}",
  ],
  [
    "border-y-stone-500",
    ".border-y-stone-500{border-bottom-color:rgba(120,113,108,1);border-top-color:rgba(120,113,108,1);}",
  ],
  [
    "border-y-stone-600",
    ".border-y-stone-600{border-bottom-color:rgba(87,83,78,1);border-top-color:rgba(87,83,78,1);}",
  ],
  [
    "border-y-stone-700",
    ".border-y-stone-700{border-bottom-color:rgba(68,64,60,1);border-top-color:rgba(68,64,60,1);}",
  ],
  [
    "border-y-stone-800",
    ".border-y-stone-800{border-bottom-color:rgba(41,37,36,1);border-top-color:rgba(41,37,36,1);}",
  ],
  [
    "border-y-stone-900",
    ".border-y-stone-900{border-bottom-color:rgba(28,25,23,1);border-top-color:rgba(28,25,23,1);}",
  ],
  [
    "border-y-red-50",
    ".border-y-red-50{border-bottom-color:rgba(254,242,242,1);border-top-color:rgba(254,242,242,1);}",
  ],
  [
    "border-y-red-100",
    ".border-y-red-100{border-bottom-color:rgba(254,226,226,1);border-top-color:rgba(254,226,226,1);}",
  ],
  [
    "border-y-red-200",
    ".border-y-red-200{border-bottom-color:rgba(254,202,202,1);border-top-color:rgba(254,202,202,1);}",
  ],
  [
    "border-y-red-300",
    ".border-y-red-300{border-bottom-color:rgba(252,165,165,1);border-top-color:rgba(252,165,165,1);}",
  ],
  [
    "border-y-red-400",
    ".border-y-red-400{border-bottom-color:rgba(248,113,113,1);border-top-color:rgba(248,113,113,1);}",
  ],
  [
    "border-y-red-500",
    ".border-y-red-500{border-bottom-color:rgba(239,68,68,1);border-top-color:rgba(239,68,68,1);}",
  ],
  [
    "border-y-red-600",
    ".border-y-red-600{border-bottom-color:rgba(220,38,38,1);border-top-color:rgba(220,38,38,1);}",
  ],
  [
    "border-y-red-700",
    ".border-y-red-700{border-bottom-color:rgba(185,28,28,1);border-top-color:rgba(185,28,28,1);}",
  ],
  [
    "border-y-red-800",
    ".border-y-red-800{border-bottom-color:rgba(153,27,27,1);border-top-color:rgba(153,27,27,1);}",
  ],
  [
    "border-y-red-900",
    ".border-y-red-900{border-bottom-color:rgba(127,29,29,1);border-top-color:rgba(127,29,29,1);}",
  ],
  [
    "border-y-orange-50",
    ".border-y-orange-50{border-bottom-color:rgba(255,247,237,1);border-top-color:rgba(255,247,237,1);}",
  ],
  [
    "border-y-orange-100",
    ".border-y-orange-100{border-bottom-color:rgba(255,237,213,1);border-top-color:rgba(255,237,213,1);}",
  ],
  [
    "border-y-orange-200",
    ".border-y-orange-200{border-bottom-color:rgba(254,215,170,1);border-top-color:rgba(254,215,170,1);}",
  ],
  [
    "border-y-orange-300",
    ".border-y-orange-300{border-bottom-color:rgba(253,186,116,1);border-top-color:rgba(253,186,116,1);}",
  ],
  [
    "border-y-orange-400",
    ".border-y-orange-400{border-bottom-color:rgba(251,146,60,1);border-top-color:rgba(251,146,60,1);}",
  ],
  [
    "border-y-orange-500",
    ".border-y-orange-500{border-bottom-color:rgba(249,115,22,1);border-top-color:rgba(249,115,22,1);}",
  ],
  [
    "border-y-orange-600",
    ".border-y-orange-600{border-bottom-color:rgba(234,88,12,1);border-top-color:rgba(234,88,12,1);}",
  ],
  [
    "border-y-orange-700",
    ".border-y-orange-700{border-bottom-color:rgba(194,65,12,1);border-top-color:rgba(194,65,12,1);}",
  ],
  [
    "border-y-orange-800",
    ".border-y-orange-800{border-bottom-color:rgba(154,52,18,1);border-top-color:rgba(154,52,18,1);}",
  ],
  [
    "border-y-orange-900",
    ".border-y-orange-900{border-bottom-color:rgba(124,45,18,1);border-top-color:rgba(124,45,18,1);}",
  ],
  [
    "border-y-amber-50",
    ".border-y-amber-50{border-bottom-color:rgba(255,251,235,1);border-top-color:rgba(255,251,235,1);}",
  ],
  [
    "border-y-amber-100",
    ".border-y-amber-100{border-bottom-color:rgba(254,243,199,1);border-top-color:rgba(254,243,199,1);}",
  ],
  [
    "border-y-amber-200",
    ".border-y-amber-200{border-bottom-color:rgba(253,230,138,1);border-top-color:rgba(253,230,138,1);}",
  ],
  [
    "border-y-amber-300",
    ".border-y-amber-300{border-bottom-color:rgba(252,211,77,1);border-top-color:rgba(252,211,77,1);}",
  ],
  [
    "border-y-amber-400",
    ".border-y-amber-400{border-bottom-color:rgba(251,191,36,1);border-top-color:rgba(251,191,36,1);}",
  ],
  [
    "border-y-amber-500",
    ".border-y-amber-500{border-bottom-color:rgba(245,158,11,1);border-top-color:rgba(245,158,11,1);}",
  ],
  [
    "border-y-amber-600",
    ".border-y-amber-600{border-bottom-color:rgba(217,119,6,1);border-top-color:rgba(217,119,6,1);}",
  ],
  [
    "border-y-amber-700",
    ".border-y-amber-700{border-bottom-color:rgba(180,83,9,1);border-top-color:rgba(180,83,9,1);}",
  ],
  [
    "border-y-amber-800",
    ".border-y-amber-800{border-bottom-color:rgba(146,64,14,1);border-top-color:rgba(146,64,14,1);}",
  ],
  [
    "border-y-amber-900",
    ".border-y-amber-900{border-bottom-color:rgba(120,53,15,1);border-top-color:rgba(120,53,15,1);}",
  ],
  [
    "border-y-yellow-50",
    ".border-y-yellow-50{border-bottom-color:rgba(254,252,232,1);border-top-color:rgba(254,252,232,1);}",
  ],
  [
    "border-y-yellow-100",
    ".border-y-yellow-100{border-bottom-color:rgba(254,249,195,1);border-top-color:rgba(254,249,195,1);}",
  ],
  [
    "border-y-yellow-200",
    ".border-y-yellow-200{border-bottom-color:rgba(254,240,138,1);border-top-color:rgba(254,240,138,1);}",
  ],
  [
    "border-y-yellow-300",
    ".border-y-yellow-300{border-bottom-color:rgba(253,224,71,1);border-top-color:rgba(253,224,71,1);}",
  ],
  [
    "border-y-yellow-400",
    ".border-y-yellow-400{border-bottom-color:rgba(250,204,21,1);border-top-color:rgba(250,204,21,1);}",
  ],
  [
    "border-y-yellow-500",
    ".border-y-yellow-500{border-bottom-color:rgba(234,179,8,1);border-top-color:rgba(234,179,8,1);}",
  ],
  [
    "border-y-yellow-600",
    ".border-y-yellow-600{border-bottom-color:rgba(202,138,4,1);border-top-color:rgba(202,138,4,1);}",
  ],
  [
    "border-y-yellow-700",
    ".border-y-yellow-700{border-bottom-color:rgba(161,98,7,1);border-top-color:rgba(161,98,7,1);}",
  ],
  [
    "border-y-yellow-800",
    ".border-y-yellow-800{border-bottom-color:rgba(133,77,14,1);border-top-color:rgba(133,77,14,1);}",
  ],
  [
    "border-y-yellow-900",
    ".border-y-yellow-900{border-bottom-color:rgba(113,63,18,1);border-top-color:rgba(113,63,18,1);}",
  ],
  [
    "border-y-lime-50",
    ".border-y-lime-50{border-bottom-color:rgba(247,254,231,1);border-top-color:rgba(247,254,231,1);}",
  ],
  [
    "border-y-lime-100",
    ".border-y-lime-100{border-bottom-color:rgba(236,252,203,1);border-top-color:rgba(236,252,203,1);}",
  ],
  [
    "border-y-lime-200",
    ".border-y-lime-200{border-bottom-color:rgba(217,249,157,1);border-top-color:rgba(217,249,157,1);}",
  ],
  [
    "border-y-lime-300",
    ".border-y-lime-300{border-bottom-color:rgba(190,242,100,1);border-top-color:rgba(190,242,100,1);}",
  ],
  [
    "border-y-lime-400",
    ".border-y-lime-400{border-bottom-color:rgba(163,230,53,1);border-top-color:rgba(163,230,53,1);}",
  ],
  [
    "border-y-lime-500",
    ".border-y-lime-500{border-bottom-color:rgba(132,204,22,1);border-top-color:rgba(132,204,22,1);}",
  ],
  [
    "border-y-lime-600",
    ".border-y-lime-600{border-bottom-color:rgba(101,163,13,1);border-top-color:rgba(101,163,13,1);}",
  ],
  [
    "border-y-lime-700",
    ".border-y-lime-700{border-bottom-color:rgba(77,124,15,1);border-top-color:rgba(77,124,15,1);}",
  ],
  [
    "border-y-lime-800",
    ".border-y-lime-800{border-bottom-color:rgba(63,98,18,1);border-top-color:rgba(63,98,18,1);}",
  ],
  [
    "border-y-lime-900",
    ".border-y-lime-900{border-bottom-color:rgba(54,83,20,1);border-top-color:rgba(54,83,20,1);}",
  ],
  [
    "border-y-green-50",
    ".border-y-green-50{border-bottom-color:rgba(240,253,244,1);border-top-color:rgba(240,253,244,1);}",
  ],
  [
    "border-y-green-100",
    ".border-y-green-100{border-bottom-color:rgba(220,252,231,1);border-top-color:rgba(220,252,231,1);}",
  ],
  [
    "border-y-green-200",
    ".border-y-green-200{border-bottom-color:rgba(187,247,208,1);border-top-color:rgba(187,247,208,1);}",
  ],
  [
    "border-y-green-300",
    ".border-y-green-300{border-bottom-color:rgba(134,239,172,1);border-top-color:rgba(134,239,172,1);}",
  ],
  [
    "border-y-green-400",
    ".border-y-green-400{border-bottom-color:rgba(74,222,128,1);border-top-color:rgba(74,222,128,1);}",
  ],
  [
    "border-y-green-500",
    ".border-y-green-500{border-bottom-color:rgba(34,197,94,1);border-top-color:rgba(34,197,94,1);}",
  ],
  [
    "border-y-green-600",
    ".border-y-green-600{border-bottom-color:rgba(22,163,74,1);border-top-color:rgba(22,163,74,1);}",
  ],
  [
    "border-y-green-700",
    ".border-y-green-700{border-bottom-color:rgba(21,128,61,1);border-top-color:rgba(21,128,61,1);}",
  ],
  [
    "border-y-green-800",
    ".border-y-green-800{border-bottom-color:rgba(22,101,52,1);border-top-color:rgba(22,101,52,1);}",
  ],
  [
    "border-y-green-900",
    ".border-y-green-900{border-bottom-color:rgba(20,83,45,1);border-top-color:rgba(20,83,45,1);}",
  ],
  [
    "border-y-emerald-50",
    ".border-y-emerald-50{border-bottom-color:rgba(236,253,245,1);border-top-color:rgba(236,253,245,1);}",
  ],
  [
    "border-y-emerald-100",
    ".border-y-emerald-100{border-bottom-color:rgba(209,250,229,1);border-top-color:rgba(209,250,229,1);}",
  ],
  [
    "border-y-emerald-200",
    ".border-y-emerald-200{border-bottom-color:rgba(167,243,208,1);border-top-color:rgba(167,243,208,1);}",
  ],
  [
    "border-y-emerald-300",
    ".border-y-emerald-300{border-bottom-color:rgba(110,231,183,1);border-top-color:rgba(110,231,183,1);}",
  ],
  [
    "border-y-emerald-400",
    ".border-y-emerald-400{border-bottom-color:rgba(52,211,153,1);border-top-color:rgba(52,211,153,1);}",
  ],
  [
    "border-y-emerald-500",
    ".border-y-emerald-500{border-bottom-color:rgba(16,185,129,1);border-top-color:rgba(16,185,129,1);}",
  ],
  [
    "border-y-emerald-600",
    ".border-y-emerald-600{border-bottom-color:rgba(5,150,105,1);border-top-color:rgba(5,150,105,1);}",
  ],
  [
    "border-y-emerald-700",
    ".border-y-emerald-700{border-bottom-color:rgba(4,120,87,1);border-top-color:rgba(4,120,87,1);}",
  ],
  [
    "border-y-emerald-800",
    ".border-y-emerald-800{border-bottom-color:rgba(6,95,70,1);border-top-color:rgba(6,95,70,1);}",
  ],
  [
    "border-y-emerald-900",
    ".border-y-emerald-900{border-bottom-color:rgba(6,78,59,1);border-top-color:rgba(6,78,59,1);}",
  ],
  [
    "border-y-teal-50",
    ".border-y-teal-50{border-bottom-color:rgba(240,253,250,1);border-top-color:rgba(240,253,250,1);}",
  ],
  [
    "border-y-teal-100",
    ".border-y-teal-100{border-bottom-color:rgba(204,251,241,1);border-top-color:rgba(204,251,241,1);}",
  ],
  [
    "border-y-teal-200",
    ".border-y-teal-200{border-bottom-color:rgba(153,246,228,1);border-top-color:rgba(153,246,228,1);}",
  ],
  [
    "border-y-teal-300",
    ".border-y-teal-300{border-bottom-color:rgba(94,234,212,1);border-top-color:rgba(94,234,212,1);}",
  ],
  [
    "border-y-teal-400",
    ".border-y-teal-400{border-bottom-color:rgba(45,212,191,1);border-top-color:rgba(45,212,191,1);}",
  ],
  [
    "border-y-teal-500",
    ".border-y-teal-500{border-bottom-color:rgba(20,184,166,1);border-top-color:rgba(20,184,166,1);}",
  ],
  [
    "border-y-teal-600",
    ".border-y-teal-600{border-bottom-color:rgba(13,148,136,1);border-top-color:rgba(13,148,136,1);}",
  ],
  [
    "border-y-teal-700",
    ".border-y-teal-700{border-bottom-color:rgba(15,118,110,1);border-top-color:rgba(15,118,110,1);}",
  ],
  [
    "border-y-teal-800",
    ".border-y-teal-800{border-bottom-color:rgba(17,94,89,1);border-top-color:rgba(17,94,89,1);}",
  ],
  [
    "border-y-teal-900",
    ".border-y-teal-900{border-bottom-color:rgba(19,78,74,1);border-top-color:rgba(19,78,74,1);}",
  ],
  [
    "border-y-cyan-50",
    ".border-y-cyan-50{border-bottom-color:rgba(236,254,255,1);border-top-color:rgba(236,254,255,1);}",
  ],
  [
    "border-y-cyan-100",
    ".border-y-cyan-100{border-bottom-color:rgba(207,250,254,1);border-top-color:rgba(207,250,254,1);}",
  ],
  [
    "border-y-cyan-200",
    ".border-y-cyan-200{border-bottom-color:rgba(165,243,252,1);border-top-color:rgba(165,243,252,1);}",
  ],
  [
    "border-y-cyan-300",
    ".border-y-cyan-300{border-bottom-color:rgba(103,232,249,1);border-top-color:rgba(103,232,249,1);}",
  ],
  [
    "border-y-cyan-400",
    ".border-y-cyan-400{border-bottom-color:rgba(34,211,238,1);border-top-color:rgba(34,211,238,1);}",
  ],
  [
    "border-y-cyan-500",
    ".border-y-cyan-500{border-bottom-color:rgba(6,182,212,1);border-top-color:rgba(6,182,212,1);}",
  ],
  [
    "border-y-cyan-600",
    ".border-y-cyan-600{border-bottom-color:rgba(8,145,178,1);border-top-color:rgba(8,145,178,1);}",
  ],
  [
    "border-y-cyan-700",
    ".border-y-cyan-700{border-bottom-color:rgba(14,116,144,1);border-top-color:rgba(14,116,144,1);}",
  ],
  [
    "border-y-cyan-800",
    ".border-y-cyan-800{border-bottom-color:rgba(21,94,117,1);border-top-color:rgba(21,94,117,1);}",
  ],
  [
    "border-y-cyan-900",
    ".border-y-cyan-900{border-bottom-color:rgba(22,78,99,1);border-top-color:rgba(22,78,99,1);}",
  ],
  [
    "border-y-sky-50",
    ".border-y-sky-50{border-bottom-color:rgba(240,249,255,1);border-top-color:rgba(240,249,255,1);}",
  ],
  [
    "border-y-sky-100",
    ".border-y-sky-100{border-bottom-color:rgba(224,242,254,1);border-top-color:rgba(224,242,254,1);}",
  ],
  [
    "border-y-sky-200",
    ".border-y-sky-200{border-bottom-color:rgba(186,230,253,1);border-top-color:rgba(186,230,253,1);}",
  ],
  [
    "border-y-sky-300",
    ".border-y-sky-300{border-bottom-color:rgba(125,211,252,1);border-top-color:rgba(125,211,252,1);}",
  ],
  [
    "border-y-sky-400",
    ".border-y-sky-400{border-bottom-color:rgba(56,189,248,1);border-top-color:rgba(56,189,248,1);}",
  ],
  [
    "border-y-sky-500",
    ".border-y-sky-500{border-bottom-color:rgba(14,165,233,1);border-top-color:rgba(14,165,233,1);}",
  ],
  [
    "border-y-sky-600",
    ".border-y-sky-600{border-bottom-color:rgba(2,132,199,1);border-top-color:rgba(2,132,199,1);}",
  ],
  [
    "border-y-sky-700",
    ".border-y-sky-700{border-bottom-color:rgba(3,105,161,1);border-top-color:rgba(3,105,161,1);}",
  ],
  [
    "border-y-sky-800",
    ".border-y-sky-800{border-bottom-color:rgba(7,89,133,1);border-top-color:rgba(7,89,133,1);}",
  ],
  [
    "border-y-sky-900",
    ".border-y-sky-900{border-bottom-color:rgba(12,74,110,1);border-top-color:rgba(12,74,110,1);}",
  ],
  [
    "border-y-blue-50",
    ".border-y-blue-50{border-bottom-color:rgba(239,246,255,1);border-top-color:rgba(239,246,255,1);}",
  ],
  [
    "border-y-blue-100",
    ".border-y-blue-100{border-bottom-color:rgba(219,234,254,1);border-top-color:rgba(219,234,254,1);}",
  ],
  [
    "border-y-blue-200",
    ".border-y-blue-200{border-bottom-color:rgba(191,219,254,1);border-top-color:rgba(191,219,254,1);}",
  ],
  [
    "border-y-blue-300",
    ".border-y-blue-300{border-bottom-color:rgba(147,197,253,1);border-top-color:rgba(147,197,253,1);}",
  ],
  [
    "border-y-blue-400",
    ".border-y-blue-400{border-bottom-color:rgba(96,165,250,1);border-top-color:rgba(96,165,250,1);}",
  ],
  [
    "border-y-blue-500",
    ".border-y-blue-500{border-bottom-color:rgba(59,130,246,1);border-top-color:rgba(59,130,246,1);}",
  ],
  [
    "border-y-blue-600",
    ".border-y-blue-600{border-bottom-color:rgba(37,99,235,1);border-top-color:rgba(37,99,235,1);}",
  ],
  [
    "border-y-blue-700",
    ".border-y-blue-700{border-bottom-color:rgba(29,78,216,1);border-top-color:rgba(29,78,216,1);}",
  ],
  [
    "border-y-blue-800",
    ".border-y-blue-800{border-bottom-color:rgba(30,64,175,1);border-top-color:rgba(30,64,175,1);}",
  ],
  [
    "border-y-blue-900",
    ".border-y-blue-900{border-bottom-color:rgba(30,58,138,1);border-top-color:rgba(30,58,138,1);}",
  ],
  [
    "border-y-indigo-50",
    ".border-y-indigo-50{border-bottom-color:rgba(238,242,255,1);border-top-color:rgba(238,242,255,1);}",
  ],
  [
    "border-y-indigo-100",
    ".border-y-indigo-100{border-bottom-color:rgba(224,231,255,1);border-top-color:rgba(224,231,255,1);}",
  ],
  [
    "border-y-indigo-200",
    ".border-y-indigo-200{border-bottom-color:rgba(199,210,254,1);border-top-color:rgba(199,210,254,1);}",
  ],
  [
    "border-y-indigo-300",
    ".border-y-indigo-300{border-bottom-color:rgba(165,180,252,1);border-top-color:rgba(165,180,252,1);}",
  ],
  [
    "border-y-indigo-400",
    ".border-y-indigo-400{border-bottom-color:rgba(129,140,248,1);border-top-color:rgba(129,140,248,1);}",
  ],
  [
    "border-y-indigo-500",
    ".border-y-indigo-500{border-bottom-color:rgba(99,102,241,1);border-top-color:rgba(99,102,241,1);}",
  ],
  [
    "border-y-indigo-600",
    ".border-y-indigo-600{border-bottom-color:rgba(79,70,229,1);border-top-color:rgba(79,70,229,1);}",
  ],
  [
    "border-y-indigo-700",
    ".border-y-indigo-700{border-bottom-color:rgba(67,56,202,1);border-top-color:rgba(67,56,202,1);}",
  ],
  [
    "border-y-indigo-800",
    ".border-y-indigo-800{border-bottom-color:rgba(55,48,163,1);border-top-color:rgba(55,48,163,1);}",
  ],
  [
    "border-y-indigo-900",
    ".border-y-indigo-900{border-bottom-color:rgba(49,46,129,1);border-top-color:rgba(49,46,129,1);}",
  ],
  [
    "border-y-violet-50",
    ".border-y-violet-50{border-bottom-color:rgba(245,243,255,1);border-top-color:rgba(245,243,255,1);}",
  ],
  [
    "border-y-violet-100",
    ".border-y-violet-100{border-bottom-color:rgba(237,233,254,1);border-top-color:rgba(237,233,254,1);}",
  ],
  [
    "border-y-violet-200",
    ".border-y-violet-200{border-bottom-color:rgba(221,214,254,1);border-top-color:rgba(221,214,254,1);}",
  ],
  [
    "border-y-violet-300",
    ".border-y-violet-300{border-bottom-color:rgba(196,181,253,1);border-top-color:rgba(196,181,253,1);}",
  ],
  [
    "border-y-violet-400",
    ".border-y-violet-400{border-bottom-color:rgba(167,139,250,1);border-top-color:rgba(167,139,250,1);}",
  ],
  [
    "border-y-violet-500",
    ".border-y-violet-500{border-bottom-color:rgba(139,92,246,1);border-top-color:rgba(139,92,246,1);}",
  ],
  [
    "border-y-violet-600",
    ".border-y-violet-600{border-bottom-color:rgba(124,58,237,1);border-top-color:rgba(124,58,237,1);}",
  ],
  [
    "border-y-violet-700",
    ".border-y-violet-700{border-bottom-color:rgba(109,40,217,1);border-top-color:rgba(109,40,217,1);}",
  ],
  [
    "border-y-violet-800",
    ".border-y-violet-800{border-bottom-color:rgba(91,33,182,1);border-top-color:rgba(91,33,182,1);}",
  ],
  [
    "border-y-violet-900",
    ".border-y-violet-900{border-bottom-color:rgba(76,29,149,1);border-top-color:rgba(76,29,149,1);}",
  ],
  [
    "border-y-purple-50",
    ".border-y-purple-50{border-bottom-color:rgba(250,245,255,1);border-top-color:rgba(250,245,255,1);}",
  ],
  [
    "border-y-purple-100",
    ".border-y-purple-100{border-bottom-color:rgba(243,232,255,1);border-top-color:rgba(243,232,255,1);}",
  ],
  [
    "border-y-purple-200",
    ".border-y-purple-200{border-bottom-color:rgba(233,213,255,1);border-top-color:rgba(233,213,255,1);}",
  ],
  [
    "border-y-purple-300",
    ".border-y-purple-300{border-bottom-color:rgba(216,180,254,1);border-top-color:rgba(216,180,254,1);}",
  ],
  [
    "border-y-purple-400",
    ".border-y-purple-400{border-bottom-color:rgba(192,132,252,1);border-top-color:rgba(192,132,252,1);}",
  ],
  [
    "border-y-purple-500",
    ".border-y-purple-500{border-bottom-color:rgba(168,85,247,1);border-top-color:rgba(168,85,247,1);}",
  ],
  [
    "border-y-purple-600",
    ".border-y-purple-600{border-bottom-color:rgba(147,51,234,1);border-top-color:rgba(147,51,234,1);}",
  ],
  [
    "border-y-purple-700",
    ".border-y-purple-700{border-bottom-color:rgba(126,34,206,1);border-top-color:rgba(126,34,206,1);}",
  ],
  [
    "border-y-purple-800",
    ".border-y-purple-800{border-bottom-color:rgba(107,33,168,1);border-top-color:rgba(107,33,168,1);}",
  ],
  [
    "border-y-purple-900",
    ".border-y-purple-900{border-bottom-color:rgba(88,28,135,1);border-top-color:rgba(88,28,135,1);}",
  ],
  [
    "border-y-fuchsia-50",
    ".border-y-fuchsia-50{border-bottom-color:rgba(253,244,255,1);border-top-color:rgba(253,244,255,1);}",
  ],
  [
    "border-y-fuchsia-100",
    ".border-y-fuchsia-100{border-bottom-color:rgba(250,232,255,1);border-top-color:rgba(250,232,255,1);}",
  ],
  [
    "border-y-fuchsia-200",
    ".border-y-fuchsia-200{border-bottom-color:rgba(245,208,254,1);border-top-color:rgba(245,208,254,1);}",
  ],
  [
    "border-y-fuchsia-300",
    ".border-y-fuchsia-300{border-bottom-color:rgba(240,171,252,1);border-top-color:rgba(240,171,252,1);}",
  ],
  [
    "border-y-fuchsia-400",
    ".border-y-fuchsia-400{border-bottom-color:rgba(232,121,249,1);border-top-color:rgba(232,121,249,1);}",
  ],
  [
    "border-y-fuchsia-500",
    ".border-y-fuchsia-500{border-bottom-color:rgba(217,70,239,1);border-top-color:rgba(217,70,239,1);}",
  ],
  [
    "border-y-fuchsia-600",
    ".border-y-fuchsia-600{border-bottom-color:rgba(192,38,211,1);border-top-color:rgba(192,38,211,1);}",
  ],
  [
    "border-y-fuchsia-700",
    ".border-y-fuchsia-700{border-bottom-color:rgba(162,28,175,1);border-top-color:rgba(162,28,175,1);}",
  ],
  [
    "border-y-fuchsia-800",
    ".border-y-fuchsia-800{border-bottom-color:rgba(134,25,143,1);border-top-color:rgba(134,25,143,1);}",
  ],
  [
    "border-y-fuchsia-900",
    ".border-y-fuchsia-900{border-bottom-color:rgba(112,26,117,1);border-top-color:rgba(112,26,117,1);}",
  ],
  [
    "border-y-pink-50",
    ".border-y-pink-50{border-bottom-color:rgba(253,242,248,1);border-top-color:rgba(253,242,248,1);}",
  ],
  [
    "border-y-pink-100",
    ".border-y-pink-100{border-bottom-color:rgba(252,231,243,1);border-top-color:rgba(252,231,243,1);}",
  ],
  [
    "border-y-pink-200",
    ".border-y-pink-200{border-bottom-color:rgba(251,207,232,1);border-top-color:rgba(251,207,232,1);}",
  ],
  [
    "border-y-pink-300",
    ".border-y-pink-300{border-bottom-color:rgba(249,168,212,1);border-top-color:rgba(249,168,212,1);}",
  ],
  [
    "border-y-pink-400",
    ".border-y-pink-400{border-bottom-color:rgba(244,114,182,1);border-top-color:rgba(244,114,182,1);}",
  ],
  [
    "border-y-pink-500",
    ".border-y-pink-500{border-bottom-color:rgba(236,72,153,1);border-top-color:rgba(236,72,153,1);}",
  ],
  [
    "border-y-pink-600",
    ".border-y-pink-600{border-bottom-color:rgba(219,39,119,1);border-top-color:rgba(219,39,119,1);}",
  ],
  [
    "border-y-pink-700",
    ".border-y-pink-700{border-bottom-color:rgba(190,24,93,1);border-top-color:rgba(190,24,93,1);}",
  ],
  [
    "border-y-pink-800",
    ".border-y-pink-800{border-bottom-color:rgba(157,23,77,1);border-top-color:rgba(157,23,77,1);}",
  ],
  [
    "border-y-pink-900",
    ".border-y-pink-900{border-bottom-color:rgba(131,24,67,1);border-top-color:rgba(131,24,67,1);}",
  ],
  [
    "border-y-rose-50",
    ".border-y-rose-50{border-bottom-color:rgba(255,241,242,1);border-top-color:rgba(255,241,242,1);}",
  ],
  [
    "border-y-rose-100",
    ".border-y-rose-100{border-bottom-color:rgba(255,228,230,1);border-top-color:rgba(255,228,230,1);}",
  ],
  [
    "border-y-rose-200",
    ".border-y-rose-200{border-bottom-color:rgba(254,205,211,1);border-top-color:rgba(254,205,211,1);}",
  ],
  [
    "border-y-rose-300",
    ".border-y-rose-300{border-bottom-color:rgba(253,164,175,1);border-top-color:rgba(253,164,175,1);}",
  ],
  [
    "border-y-rose-400",
    ".border-y-rose-400{border-bottom-color:rgba(251,113,133,1);border-top-color:rgba(251,113,133,1);}",
  ],
  [
    "border-y-rose-500",
    ".border-y-rose-500{border-bottom-color:rgba(244,63,94,1);border-top-color:rgba(244,63,94,1);}",
  ],
  [
    "border-y-rose-600",
    ".border-y-rose-600{border-bottom-color:rgba(225,29,72,1);border-top-color:rgba(225,29,72,1);}",
  ],
  [
    "border-y-rose-700",
    ".border-y-rose-700{border-bottom-color:rgba(190,18,60,1);border-top-color:rgba(190,18,60,1);}",
  ],
  [
    "border-y-rose-800",
    ".border-y-rose-800{border-bottom-color:rgba(159,18,57,1);border-top-color:rgba(159,18,57,1);}",
  ],
  [
    "border-y-rose-900",
    ".border-y-rose-900{border-bottom-color:rgba(136,19,55,1);border-top-color:rgba(136,19,55,1);}",
  ],
  [
    "border-t-slate-50",
    ".border-t-slate-50{border-top-color:rgba(248,250,252,1);}",
  ],
  [
    "border-t-slate-100",
    ".border-t-slate-100{border-top-color:rgba(241,245,249,1);}",
  ],
  [
    "border-t-slate-200",
    ".border-t-slate-200{border-top-color:rgba(226,232,240,1);}",
  ],
  [
    "border-t-slate-300",
    ".border-t-slate-300{border-top-color:rgba(203,213,225,1);}",
  ],
  [
    "border-t-slate-400",
    ".border-t-slate-400{border-top-color:rgba(148,163,184,1);}",
  ],
  [
    "border-t-slate-500",
    ".border-t-slate-500{border-top-color:rgba(100,116,139,1);}",
  ],
  [
    "border-t-slate-600",
    ".border-t-slate-600{border-top-color:rgba(71,85,105,1);}",
  ],
  [
    "border-t-slate-700",
    ".border-t-slate-700{border-top-color:rgba(51,65,85,1);}",
  ],
  [
    "border-t-slate-800",
    ".border-t-slate-800{border-top-color:rgba(30,41,59,1);}",
  ],
  [
    "border-t-slate-900",
    ".border-t-slate-900{border-top-color:rgba(15,23,42,1);}",
  ],
  [
    "border-t-gray-50",
    ".border-t-gray-50{border-top-color:rgba(249,250,251,1);}",
  ],
  [
    "border-t-gray-100",
    ".border-t-gray-100{border-top-color:rgba(243,244,246,1);}",
  ],
  [
    "border-t-gray-200",
    ".border-t-gray-200{border-top-color:rgba(229,231,235,1);}",
  ],
  [
    "border-t-gray-300",
    ".border-t-gray-300{border-top-color:rgba(209,213,219,1);}",
  ],
  [
    "border-t-gray-400",
    ".border-t-gray-400{border-top-color:rgba(156,163,175,1);}",
  ],
  [
    "border-t-gray-500",
    ".border-t-gray-500{border-top-color:rgba(107,114,128,1);}",
  ],
  [
    "border-t-gray-600",
    ".border-t-gray-600{border-top-color:rgba(75,85,99,1);}",
  ],
  [
    "border-t-gray-700",
    ".border-t-gray-700{border-top-color:rgba(55,65,81,1);}",
  ],
  [
    "border-t-gray-800",
    ".border-t-gray-800{border-top-color:rgba(31,41,55,1);}",
  ],
  [
    "border-t-gray-900",
    ".border-t-gray-900{border-top-color:rgba(17,24,39,1);}",
  ],
  [
    "border-t-zinc-50",
    ".border-t-zinc-50{border-top-color:rgba(250,250,250,1);}",
  ],
  [
    "border-t-zinc-100",
    ".border-t-zinc-100{border-top-color:rgba(244,244,245,1);}",
  ],
  [
    "border-t-zinc-200",
    ".border-t-zinc-200{border-top-color:rgba(228,228,231,1);}",
  ],
  [
    "border-t-zinc-300",
    ".border-t-zinc-300{border-top-color:rgba(212,212,216,1);}",
  ],
  [
    "border-t-zinc-400",
    ".border-t-zinc-400{border-top-color:rgba(161,161,170,1);}",
  ],
  [
    "border-t-zinc-500",
    ".border-t-zinc-500{border-top-color:rgba(113,113,122,1);}",
  ],
  [
    "border-t-zinc-600",
    ".border-t-zinc-600{border-top-color:rgba(82,82,91,1);}",
  ],
  [
    "border-t-zinc-700",
    ".border-t-zinc-700{border-top-color:rgba(63,63,70,1);}",
  ],
  [
    "border-t-zinc-800",
    ".border-t-zinc-800{border-top-color:rgba(39,39,42,1);}",
  ],
  [
    "border-t-zinc-900",
    ".border-t-zinc-900{border-top-color:rgba(24,24,27,1);}",
  ],
  [
    "border-t-neutral-50",
    ".border-t-neutral-50{border-top-color:rgba(250,250,250,1);}",
  ],
  [
    "border-t-neutral-100",
    ".border-t-neutral-100{border-top-color:rgba(245,245,245,1);}",
  ],
  [
    "border-t-neutral-200",
    ".border-t-neutral-200{border-top-color:rgba(229,229,229,1);}",
  ],
  [
    "border-t-neutral-300",
    ".border-t-neutral-300{border-top-color:rgba(212,212,212,1);}",
  ],
  [
    "border-t-neutral-400",
    ".border-t-neutral-400{border-top-color:rgba(163,163,163,1);}",
  ],
  [
    "border-t-neutral-500",
    ".border-t-neutral-500{border-top-color:rgba(115,115,115,1);}",
  ],
  [
    "border-t-neutral-600",
    ".border-t-neutral-600{border-top-color:rgba(82,82,82,1);}",
  ],
  [
    "border-t-neutral-700",
    ".border-t-neutral-700{border-top-color:rgba(64,64,64,1);}",
  ],
  [
    "border-t-neutral-800",
    ".border-t-neutral-800{border-top-color:rgba(38,38,38,1);}",
  ],
  [
    "border-t-neutral-900",
    ".border-t-neutral-900{border-top-color:rgba(23,23,23,1);}",
  ],
  [
    "border-t-stone-50",
    ".border-t-stone-50{border-top-color:rgba(250,250,249,1);}",
  ],
  [
    "border-t-stone-100",
    ".border-t-stone-100{border-top-color:rgba(245,245,244,1);}",
  ],
  [
    "border-t-stone-200",
    ".border-t-stone-200{border-top-color:rgba(231,229,228,1);}",
  ],
  [
    "border-t-stone-300",
    ".border-t-stone-300{border-top-color:rgba(214,211,209,1);}",
  ],
  [
    "border-t-stone-400",
    ".border-t-stone-400{border-top-color:rgba(168,162,158,1);}",
  ],
  [
    "border-t-stone-500",
    ".border-t-stone-500{border-top-color:rgba(120,113,108,1);}",
  ],
  [
    "border-t-stone-600",
    ".border-t-stone-600{border-top-color:rgba(87,83,78,1);}",
  ],
  [
    "border-t-stone-700",
    ".border-t-stone-700{border-top-color:rgba(68,64,60,1);}",
  ],
  [
    "border-t-stone-800",
    ".border-t-stone-800{border-top-color:rgba(41,37,36,1);}",
  ],
  [
    "border-t-stone-900",
    ".border-t-stone-900{border-top-color:rgba(28,25,23,1);}",
  ],
  [
    "border-t-red-50",
    ".border-t-red-50{border-top-color:rgba(254,242,242,1);}",
  ],
  [
    "border-t-red-100",
    ".border-t-red-100{border-top-color:rgba(254,226,226,1);}",
  ],
  [
    "border-t-red-200",
    ".border-t-red-200{border-top-color:rgba(254,202,202,1);}",
  ],
  [
    "border-t-red-300",
    ".border-t-red-300{border-top-color:rgba(252,165,165,1);}",
  ],
  [
    "border-t-red-400",
    ".border-t-red-400{border-top-color:rgba(248,113,113,1);}",
  ],
  [
    "border-t-red-500",
    ".border-t-red-500{border-top-color:rgba(239,68,68,1);}",
  ],
  [
    "border-t-red-600",
    ".border-t-red-600{border-top-color:rgba(220,38,38,1);}",
  ],
  [
    "border-t-red-700",
    ".border-t-red-700{border-top-color:rgba(185,28,28,1);}",
  ],
  [
    "border-t-red-800",
    ".border-t-red-800{border-top-color:rgba(153,27,27,1);}",
  ],
  [
    "border-t-red-900",
    ".border-t-red-900{border-top-color:rgba(127,29,29,1);}",
  ],
  [
    "border-t-orange-50",
    ".border-t-orange-50{border-top-color:rgba(255,247,237,1);}",
  ],
  [
    "border-t-orange-100",
    ".border-t-orange-100{border-top-color:rgba(255,237,213,1);}",
  ],
  [
    "border-t-orange-200",
    ".border-t-orange-200{border-top-color:rgba(254,215,170,1);}",
  ],
  [
    "border-t-orange-300",
    ".border-t-orange-300{border-top-color:rgba(253,186,116,1);}",
  ],
  [
    "border-t-orange-400",
    ".border-t-orange-400{border-top-color:rgba(251,146,60,1);}",
  ],
  [
    "border-t-orange-500",
    ".border-t-orange-500{border-top-color:rgba(249,115,22,1);}",
  ],
  [
    "border-t-orange-600",
    ".border-t-orange-600{border-top-color:rgba(234,88,12,1);}",
  ],
  [
    "border-t-orange-700",
    ".border-t-orange-700{border-top-color:rgba(194,65,12,1);}",
  ],
  [
    "border-t-orange-800",
    ".border-t-orange-800{border-top-color:rgba(154,52,18,1);}",
  ],
  [
    "border-t-orange-900",
    ".border-t-orange-900{border-top-color:rgba(124,45,18,1);}",
  ],
  [
    "border-t-amber-50",
    ".border-t-amber-50{border-top-color:rgba(255,251,235,1);}",
  ],
  [
    "border-t-amber-100",
    ".border-t-amber-100{border-top-color:rgba(254,243,199,1);}",
  ],
  [
    "border-t-amber-200",
    ".border-t-amber-200{border-top-color:rgba(253,230,138,1);}",
  ],
  [
    "border-t-amber-300",
    ".border-t-amber-300{border-top-color:rgba(252,211,77,1);}",
  ],
  [
    "border-t-amber-400",
    ".border-t-amber-400{border-top-color:rgba(251,191,36,1);}",
  ],
  [
    "border-t-amber-500",
    ".border-t-amber-500{border-top-color:rgba(245,158,11,1);}",
  ],
  [
    "border-t-amber-600",
    ".border-t-amber-600{border-top-color:rgba(217,119,6,1);}",
  ],
  [
    "border-t-amber-700",
    ".border-t-amber-700{border-top-color:rgba(180,83,9,1);}",
  ],
  [
    "border-t-amber-800",
    ".border-t-amber-800{border-top-color:rgba(146,64,14,1);}",
  ],
  [
    "border-t-amber-900",
    ".border-t-amber-900{border-top-color:rgba(120,53,15,1);}",
  ],
  [
    "border-t-yellow-50",
    ".border-t-yellow-50{border-top-color:rgba(254,252,232,1);}",
  ],
  [
    "border-t-yellow-100",
    ".border-t-yellow-100{border-top-color:rgba(254,249,195,1);}",
  ],
  [
    "border-t-yellow-200",
    ".border-t-yellow-200{border-top-color:rgba(254,240,138,1);}",
  ],
  [
    "border-t-yellow-300",
    ".border-t-yellow-300{border-top-color:rgba(253,224,71,1);}",
  ],
  [
    "border-t-yellow-400",
    ".border-t-yellow-400{border-top-color:rgba(250,204,21,1);}",
  ],
  [
    "border-t-yellow-500",
    ".border-t-yellow-500{border-top-color:rgba(234,179,8,1);}",
  ],
  [
    "border-t-yellow-600",
    ".border-t-yellow-600{border-top-color:rgba(202,138,4,1);}",
  ],
  [
    "border-t-yellow-700",
    ".border-t-yellow-700{border-top-color:rgba(161,98,7,1);}",
  ],
  [
    "border-t-yellow-800",
    ".border-t-yellow-800{border-top-color:rgba(133,77,14,1);}",
  ],
  [
    "border-t-yellow-900",
    ".border-t-yellow-900{border-top-color:rgba(113,63,18,1);}",
  ],
  [
    "border-t-lime-50",
    ".border-t-lime-50{border-top-color:rgba(247,254,231,1);}",
  ],
  [
    "border-t-lime-100",
    ".border-t-lime-100{border-top-color:rgba(236,252,203,1);}",
  ],
  [
    "border-t-lime-200",
    ".border-t-lime-200{border-top-color:rgba(217,249,157,1);}",
  ],
  [
    "border-t-lime-300",
    ".border-t-lime-300{border-top-color:rgba(190,242,100,1);}",
  ],
  [
    "border-t-lime-400",
    ".border-t-lime-400{border-top-color:rgba(163,230,53,1);}",
  ],
  [
    "border-t-lime-500",
    ".border-t-lime-500{border-top-color:rgba(132,204,22,1);}",
  ],
  [
    "border-t-lime-600",
    ".border-t-lime-600{border-top-color:rgba(101,163,13,1);}",
  ],
  [
    "border-t-lime-700",
    ".border-t-lime-700{border-top-color:rgba(77,124,15,1);}",
  ],
  [
    "border-t-lime-800",
    ".border-t-lime-800{border-top-color:rgba(63,98,18,1);}",
  ],
  [
    "border-t-lime-900",
    ".border-t-lime-900{border-top-color:rgba(54,83,20,1);}",
  ],
  [
    "border-t-green-50",
    ".border-t-green-50{border-top-color:rgba(240,253,244,1);}",
  ],
  [
    "border-t-green-100",
    ".border-t-green-100{border-top-color:rgba(220,252,231,1);}",
  ],
  [
    "border-t-green-200",
    ".border-t-green-200{border-top-color:rgba(187,247,208,1);}",
  ],
  [
    "border-t-green-300",
    ".border-t-green-300{border-top-color:rgba(134,239,172,1);}",
  ],
  [
    "border-t-green-400",
    ".border-t-green-400{border-top-color:rgba(74,222,128,1);}",
  ],
  [
    "border-t-green-500",
    ".border-t-green-500{border-top-color:rgba(34,197,94,1);}",
  ],
  [
    "border-t-green-600",
    ".border-t-green-600{border-top-color:rgba(22,163,74,1);}",
  ],
  [
    "border-t-green-700",
    ".border-t-green-700{border-top-color:rgba(21,128,61,1);}",
  ],
  [
    "border-t-green-800",
    ".border-t-green-800{border-top-color:rgba(22,101,52,1);}",
  ],
  [
    "border-t-green-900",
    ".border-t-green-900{border-top-color:rgba(20,83,45,1);}",
  ],
  [
    "border-t-emerald-50",
    ".border-t-emerald-50{border-top-color:rgba(236,253,245,1);}",
  ],
  [
    "border-t-emerald-100",
    ".border-t-emerald-100{border-top-color:rgba(209,250,229,1);}",
  ],
  [
    "border-t-emerald-200",
    ".border-t-emerald-200{border-top-color:rgba(167,243,208,1);}",
  ],
  [
    "border-t-emerald-300",
    ".border-t-emerald-300{border-top-color:rgba(110,231,183,1);}",
  ],
  [
    "border-t-emerald-400",
    ".border-t-emerald-400{border-top-color:rgba(52,211,153,1);}",
  ],
  [
    "border-t-emerald-500",
    ".border-t-emerald-500{border-top-color:rgba(16,185,129,1);}",
  ],
  [
    "border-t-emerald-600",
    ".border-t-emerald-600{border-top-color:rgba(5,150,105,1);}",
  ],
  [
    "border-t-emerald-700",
    ".border-t-emerald-700{border-top-color:rgba(4,120,87,1);}",
  ],
  [
    "border-t-emerald-800",
    ".border-t-emerald-800{border-top-color:rgba(6,95,70,1);}",
  ],
  [
    "border-t-emerald-900",
    ".border-t-emerald-900{border-top-color:rgba(6,78,59,1);}",
  ],
  [
    "border-t-teal-50",
    ".border-t-teal-50{border-top-color:rgba(240,253,250,1);}",
  ],
  [
    "border-t-teal-100",
    ".border-t-teal-100{border-top-color:rgba(204,251,241,1);}",
  ],
  [
    "border-t-teal-200",
    ".border-t-teal-200{border-top-color:rgba(153,246,228,1);}",
  ],
  [
    "border-t-teal-300",
    ".border-t-teal-300{border-top-color:rgba(94,234,212,1);}",
  ],
  [
    "border-t-teal-400",
    ".border-t-teal-400{border-top-color:rgba(45,212,191,1);}",
  ],
  [
    "border-t-teal-500",
    ".border-t-teal-500{border-top-color:rgba(20,184,166,1);}",
  ],
  [
    "border-t-teal-600",
    ".border-t-teal-600{border-top-color:rgba(13,148,136,1);}",
  ],
  [
    "border-t-teal-700",
    ".border-t-teal-700{border-top-color:rgba(15,118,110,1);}",
  ],
  [
    "border-t-teal-800",
    ".border-t-teal-800{border-top-color:rgba(17,94,89,1);}",
  ],
  [
    "border-t-teal-900",
    ".border-t-teal-900{border-top-color:rgba(19,78,74,1);}",
  ],
  [
    "border-t-cyan-50",
    ".border-t-cyan-50{border-top-color:rgba(236,254,255,1);}",
  ],
  [
    "border-t-cyan-100",
    ".border-t-cyan-100{border-top-color:rgba(207,250,254,1);}",
  ],
  [
    "border-t-cyan-200",
    ".border-t-cyan-200{border-top-color:rgba(165,243,252,1);}",
  ],
  [
    "border-t-cyan-300",
    ".border-t-cyan-300{border-top-color:rgba(103,232,249,1);}",
  ],
  [
    "border-t-cyan-400",
    ".border-t-cyan-400{border-top-color:rgba(34,211,238,1);}",
  ],
  [
    "border-t-cyan-500",
    ".border-t-cyan-500{border-top-color:rgba(6,182,212,1);}",
  ],
  [
    "border-t-cyan-600",
    ".border-t-cyan-600{border-top-color:rgba(8,145,178,1);}",
  ],
  [
    "border-t-cyan-700",
    ".border-t-cyan-700{border-top-color:rgba(14,116,144,1);}",
  ],
  [
    "border-t-cyan-800",
    ".border-t-cyan-800{border-top-color:rgba(21,94,117,1);}",
  ],
  [
    "border-t-cyan-900",
    ".border-t-cyan-900{border-top-color:rgba(22,78,99,1);}",
  ],
  [
    "border-t-sky-50",
    ".border-t-sky-50{border-top-color:rgba(240,249,255,1);}",
  ],
  [
    "border-t-sky-100",
    ".border-t-sky-100{border-top-color:rgba(224,242,254,1);}",
  ],
  [
    "border-t-sky-200",
    ".border-t-sky-200{border-top-color:rgba(186,230,253,1);}",
  ],
  [
    "border-t-sky-300",
    ".border-t-sky-300{border-top-color:rgba(125,211,252,1);}",
  ],
  [
    "border-t-sky-400",
    ".border-t-sky-400{border-top-color:rgba(56,189,248,1);}",
  ],
  [
    "border-t-sky-500",
    ".border-t-sky-500{border-top-color:rgba(14,165,233,1);}",
  ],
  [
    "border-t-sky-600",
    ".border-t-sky-600{border-top-color:rgba(2,132,199,1);}",
  ],
  [
    "border-t-sky-700",
    ".border-t-sky-700{border-top-color:rgba(3,105,161,1);}",
  ],
  ["border-t-sky-800", ".border-t-sky-800{border-top-color:rgba(7,89,133,1);}"],
  [
    "border-t-sky-900",
    ".border-t-sky-900{border-top-color:rgba(12,74,110,1);}",
  ],
  [
    "border-t-blue-50",
    ".border-t-blue-50{border-top-color:rgba(239,246,255,1);}",
  ],
  [
    "border-t-blue-100",
    ".border-t-blue-100{border-top-color:rgba(219,234,254,1);}",
  ],
  [
    "border-t-blue-200",
    ".border-t-blue-200{border-top-color:rgba(191,219,254,1);}",
  ],
  [
    "border-t-blue-300",
    ".border-t-blue-300{border-top-color:rgba(147,197,253,1);}",
  ],
  [
    "border-t-blue-400",
    ".border-t-blue-400{border-top-color:rgba(96,165,250,1);}",
  ],
  [
    "border-t-blue-500",
    ".border-t-blue-500{border-top-color:rgba(59,130,246,1);}",
  ],
  [
    "border-t-blue-600",
    ".border-t-blue-600{border-top-color:rgba(37,99,235,1);}",
  ],
  [
    "border-t-blue-700",
    ".border-t-blue-700{border-top-color:rgba(29,78,216,1);}",
  ],
  [
    "border-t-blue-800",
    ".border-t-blue-800{border-top-color:rgba(30,64,175,1);}",
  ],
  [
    "border-t-blue-900",
    ".border-t-blue-900{border-top-color:rgba(30,58,138,1);}",
  ],
  [
    "border-t-indigo-50",
    ".border-t-indigo-50{border-top-color:rgba(238,242,255,1);}",
  ],
  [
    "border-t-indigo-100",
    ".border-t-indigo-100{border-top-color:rgba(224,231,255,1);}",
  ],
  [
    "border-t-indigo-200",
    ".border-t-indigo-200{border-top-color:rgba(199,210,254,1);}",
  ],
  [
    "border-t-indigo-300",
    ".border-t-indigo-300{border-top-color:rgba(165,180,252,1);}",
  ],
  [
    "border-t-indigo-400",
    ".border-t-indigo-400{border-top-color:rgba(129,140,248,1);}",
  ],
  [
    "border-t-indigo-500",
    ".border-t-indigo-500{border-top-color:rgba(99,102,241,1);}",
  ],
  [
    "border-t-indigo-600",
    ".border-t-indigo-600{border-top-color:rgba(79,70,229,1);}",
  ],
  [
    "border-t-indigo-700",
    ".border-t-indigo-700{border-top-color:rgba(67,56,202,1);}",
  ],
  [
    "border-t-indigo-800",
    ".border-t-indigo-800{border-top-color:rgba(55,48,163,1);}",
  ],
  [
    "border-t-indigo-900",
    ".border-t-indigo-900{border-top-color:rgba(49,46,129,1);}",
  ],
  [
    "border-t-violet-50",
    ".border-t-violet-50{border-top-color:rgba(245,243,255,1);}",
  ],
  [
    "border-t-violet-100",
    ".border-t-violet-100{border-top-color:rgba(237,233,254,1);}",
  ],
  [
    "border-t-violet-200",
    ".border-t-violet-200{border-top-color:rgba(221,214,254,1);}",
  ],
  [
    "border-t-violet-300",
    ".border-t-violet-300{border-top-color:rgba(196,181,253,1);}",
  ],
  [
    "border-t-violet-400",
    ".border-t-violet-400{border-top-color:rgba(167,139,250,1);}",
  ],
  [
    "border-t-violet-500",
    ".border-t-violet-500{border-top-color:rgba(139,92,246,1);}",
  ],
  [
    "border-t-violet-600",
    ".border-t-violet-600{border-top-color:rgba(124,58,237,1);}",
  ],
  [
    "border-t-violet-700",
    ".border-t-violet-700{border-top-color:rgba(109,40,217,1);}",
  ],
  [
    "border-t-violet-800",
    ".border-t-violet-800{border-top-color:rgba(91,33,182,1);}",
  ],
  [
    "border-t-violet-900",
    ".border-t-violet-900{border-top-color:rgba(76,29,149,1);}",
  ],
  [
    "border-t-purple-50",
    ".border-t-purple-50{border-top-color:rgba(250,245,255,1);}",
  ],
  [
    "border-t-purple-100",
    ".border-t-purple-100{border-top-color:rgba(243,232,255,1);}",
  ],
  [
    "border-t-purple-200",
    ".border-t-purple-200{border-top-color:rgba(233,213,255,1);}",
  ],
  [
    "border-t-purple-300",
    ".border-t-purple-300{border-top-color:rgba(216,180,254,1);}",
  ],
  [
    "border-t-purple-400",
    ".border-t-purple-400{border-top-color:rgba(192,132,252,1);}",
  ],
  [
    "border-t-purple-500",
    ".border-t-purple-500{border-top-color:rgba(168,85,247,1);}",
  ],
  [
    "border-t-purple-600",
    ".border-t-purple-600{border-top-color:rgba(147,51,234,1);}",
  ],
  [
    "border-t-purple-700",
    ".border-t-purple-700{border-top-color:rgba(126,34,206,1);}",
  ],
  [
    "border-t-purple-800",
    ".border-t-purple-800{border-top-color:rgba(107,33,168,1);}",
  ],
  [
    "border-t-purple-900",
    ".border-t-purple-900{border-top-color:rgba(88,28,135,1);}",
  ],
  [
    "border-t-fuchsia-50",
    ".border-t-fuchsia-50{border-top-color:rgba(253,244,255,1);}",
  ],
  [
    "border-t-fuchsia-100",
    ".border-t-fuchsia-100{border-top-color:rgba(250,232,255,1);}",
  ],
  [
    "border-t-fuchsia-200",
    ".border-t-fuchsia-200{border-top-color:rgba(245,208,254,1);}",
  ],
  [
    "border-t-fuchsia-300",
    ".border-t-fuchsia-300{border-top-color:rgba(240,171,252,1);}",
  ],
  [
    "border-t-fuchsia-400",
    ".border-t-fuchsia-400{border-top-color:rgba(232,121,249,1);}",
  ],
  [
    "border-t-fuchsia-500",
    ".border-t-fuchsia-500{border-top-color:rgba(217,70,239,1);}",
  ],
  [
    "border-t-fuchsia-600",
    ".border-t-fuchsia-600{border-top-color:rgba(192,38,211,1);}",
  ],
  [
    "border-t-fuchsia-700",
    ".border-t-fuchsia-700{border-top-color:rgba(162,28,175,1);}",
  ],
  [
    "border-t-fuchsia-800",
    ".border-t-fuchsia-800{border-top-color:rgba(134,25,143,1);}",
  ],
  [
    "border-t-fuchsia-900",
    ".border-t-fuchsia-900{border-top-color:rgba(112,26,117,1);}",
  ],
  [
    "border-t-pink-50",
    ".border-t-pink-50{border-top-color:rgba(253,242,248,1);}",
  ],
  [
    "border-t-pink-100",
    ".border-t-pink-100{border-top-color:rgba(252,231,243,1);}",
  ],
  [
    "border-t-pink-200",
    ".border-t-pink-200{border-top-color:rgba(251,207,232,1);}",
  ],
  [
    "border-t-pink-300",
    ".border-t-pink-300{border-top-color:rgba(249,168,212,1);}",
  ],
  [
    "border-t-pink-400",
    ".border-t-pink-400{border-top-color:rgba(244,114,182,1);}",
  ],
  [
    "border-t-pink-500",
    ".border-t-pink-500{border-top-color:rgba(236,72,153,1);}",
  ],
  [
    "border-t-pink-600",
    ".border-t-pink-600{border-top-color:rgba(219,39,119,1);}",
  ],
  [
    "border-t-pink-700",
    ".border-t-pink-700{border-top-color:rgba(190,24,93,1);}",
  ],
  [
    "border-t-pink-800",
    ".border-t-pink-800{border-top-color:rgba(157,23,77,1);}",
  ],
  [
    "border-t-pink-900",
    ".border-t-pink-900{border-top-color:rgba(131,24,67,1);}",
  ],
  [
    "border-t-rose-50",
    ".border-t-rose-50{border-top-color:rgba(255,241,242,1);}",
  ],
  [
    "border-t-rose-100",
    ".border-t-rose-100{border-top-color:rgba(255,228,230,1);}",
  ],
  [
    "border-t-rose-200",
    ".border-t-rose-200{border-top-color:rgba(254,205,211,1);}",
  ],
  [
    "border-t-rose-300",
    ".border-t-rose-300{border-top-color:rgba(253,164,175,1);}",
  ],
  [
    "border-t-rose-400",
    ".border-t-rose-400{border-top-color:rgba(251,113,133,1);}",
  ],
  [
    "border-t-rose-500",
    ".border-t-rose-500{border-top-color:rgba(244,63,94,1);}",
  ],
  [
    "border-t-rose-600",
    ".border-t-rose-600{border-top-color:rgba(225,29,72,1);}",
  ],
  [
    "border-t-rose-700",
    ".border-t-rose-700{border-top-color:rgba(190,18,60,1);}",
  ],
  [
    "border-t-rose-800",
    ".border-t-rose-800{border-top-color:rgba(159,18,57,1);}",
  ],
  [
    "border-t-rose-900",
    ".border-t-rose-900{border-top-color:rgba(136,19,55,1);}",
  ],
  [
    "border-r-slate-50",
    ".border-r-slate-50{border-right-color:rgba(248,250,252,1);}",
  ],
  [
    "border-r-slate-100",
    ".border-r-slate-100{border-right-color:rgba(241,245,249,1);}",
  ],
  [
    "border-r-slate-200",
    ".border-r-slate-200{border-right-color:rgba(226,232,240,1);}",
  ],
  [
    "border-r-slate-300",
    ".border-r-slate-300{border-right-color:rgba(203,213,225,1);}",
  ],
  [
    "border-r-slate-400",
    ".border-r-slate-400{border-right-color:rgba(148,163,184,1);}",
  ],
  [
    "border-r-slate-500",
    ".border-r-slate-500{border-right-color:rgba(100,116,139,1);}",
  ],
  [
    "border-r-slate-600",
    ".border-r-slate-600{border-right-color:rgba(71,85,105,1);}",
  ],
  [
    "border-r-slate-700",
    ".border-r-slate-700{border-right-color:rgba(51,65,85,1);}",
  ],
  [
    "border-r-slate-800",
    ".border-r-slate-800{border-right-color:rgba(30,41,59,1);}",
  ],
  [
    "border-r-slate-900",
    ".border-r-slate-900{border-right-color:rgba(15,23,42,1);}",
  ],
  [
    "border-r-gray-50",
    ".border-r-gray-50{border-right-color:rgba(249,250,251,1);}",
  ],
  [
    "border-r-gray-100",
    ".border-r-gray-100{border-right-color:rgba(243,244,246,1);}",
  ],
  [
    "border-r-gray-200",
    ".border-r-gray-200{border-right-color:rgba(229,231,235,1);}",
  ],
  [
    "border-r-gray-300",
    ".border-r-gray-300{border-right-color:rgba(209,213,219,1);}",
  ],
  [
    "border-r-gray-400",
    ".border-r-gray-400{border-right-color:rgba(156,163,175,1);}",
  ],
  [
    "border-r-gray-500",
    ".border-r-gray-500{border-right-color:rgba(107,114,128,1);}",
  ],
  [
    "border-r-gray-600",
    ".border-r-gray-600{border-right-color:rgba(75,85,99,1);}",
  ],
  [
    "border-r-gray-700",
    ".border-r-gray-700{border-right-color:rgba(55,65,81,1);}",
  ],
  [
    "border-r-gray-800",
    ".border-r-gray-800{border-right-color:rgba(31,41,55,1);}",
  ],
  [
    "border-r-gray-900",
    ".border-r-gray-900{border-right-color:rgba(17,24,39,1);}",
  ],
  [
    "border-r-zinc-50",
    ".border-r-zinc-50{border-right-color:rgba(250,250,250,1);}",
  ],
  [
    "border-r-zinc-100",
    ".border-r-zinc-100{border-right-color:rgba(244,244,245,1);}",
  ],
  [
    "border-r-zinc-200",
    ".border-r-zinc-200{border-right-color:rgba(228,228,231,1);}",
  ],
  [
    "border-r-zinc-300",
    ".border-r-zinc-300{border-right-color:rgba(212,212,216,1);}",
  ],
  [
    "border-r-zinc-400",
    ".border-r-zinc-400{border-right-color:rgba(161,161,170,1);}",
  ],
  [
    "border-r-zinc-500",
    ".border-r-zinc-500{border-right-color:rgba(113,113,122,1);}",
  ],
  [
    "border-r-zinc-600",
    ".border-r-zinc-600{border-right-color:rgba(82,82,91,1);}",
  ],
  [
    "border-r-zinc-700",
    ".border-r-zinc-700{border-right-color:rgba(63,63,70,1);}",
  ],
  [
    "border-r-zinc-800",
    ".border-r-zinc-800{border-right-color:rgba(39,39,42,1);}",
  ],
  [
    "border-r-zinc-900",
    ".border-r-zinc-900{border-right-color:rgba(24,24,27,1);}",
  ],
  [
    "border-r-neutral-50",
    ".border-r-neutral-50{border-right-color:rgba(250,250,250,1);}",
  ],
  [
    "border-r-neutral-100",
    ".border-r-neutral-100{border-right-color:rgba(245,245,245,1);}",
  ],
  [
    "border-r-neutral-200",
    ".border-r-neutral-200{border-right-color:rgba(229,229,229,1);}",
  ],
  [
    "border-r-neutral-300",
    ".border-r-neutral-300{border-right-color:rgba(212,212,212,1);}",
  ],
  [
    "border-r-neutral-400",
    ".border-r-neutral-400{border-right-color:rgba(163,163,163,1);}",
  ],
  [
    "border-r-neutral-500",
    ".border-r-neutral-500{border-right-color:rgba(115,115,115,1);}",
  ],
  [
    "border-r-neutral-600",
    ".border-r-neutral-600{border-right-color:rgba(82,82,82,1);}",
  ],
  [
    "border-r-neutral-700",
    ".border-r-neutral-700{border-right-color:rgba(64,64,64,1);}",
  ],
  [
    "border-r-neutral-800",
    ".border-r-neutral-800{border-right-color:rgba(38,38,38,1);}",
  ],
  [
    "border-r-neutral-900",
    ".border-r-neutral-900{border-right-color:rgba(23,23,23,1);}",
  ],
  [
    "border-r-stone-50",
    ".border-r-stone-50{border-right-color:rgba(250,250,249,1);}",
  ],
  [
    "border-r-stone-100",
    ".border-r-stone-100{border-right-color:rgba(245,245,244,1);}",
  ],
  [
    "border-r-stone-200",
    ".border-r-stone-200{border-right-color:rgba(231,229,228,1);}",
  ],
  [
    "border-r-stone-300",
    ".border-r-stone-300{border-right-color:rgba(214,211,209,1);}",
  ],
  [
    "border-r-stone-400",
    ".border-r-stone-400{border-right-color:rgba(168,162,158,1);}",
  ],
  [
    "border-r-stone-500",
    ".border-r-stone-500{border-right-color:rgba(120,113,108,1);}",
  ],
  [
    "border-r-stone-600",
    ".border-r-stone-600{border-right-color:rgba(87,83,78,1);}",
  ],
  [
    "border-r-stone-700",
    ".border-r-stone-700{border-right-color:rgba(68,64,60,1);}",
  ],
  [
    "border-r-stone-800",
    ".border-r-stone-800{border-right-color:rgba(41,37,36,1);}",
  ],
  [
    "border-r-stone-900",
    ".border-r-stone-900{border-right-color:rgba(28,25,23,1);}",
  ],
  [
    "border-r-red-50",
    ".border-r-red-50{border-right-color:rgba(254,242,242,1);}",
  ],
  [
    "border-r-red-100",
    ".border-r-red-100{border-right-color:rgba(254,226,226,1);}",
  ],
  [
    "border-r-red-200",
    ".border-r-red-200{border-right-color:rgba(254,202,202,1);}",
  ],
  [
    "border-r-red-300",
    ".border-r-red-300{border-right-color:rgba(252,165,165,1);}",
  ],
  [
    "border-r-red-400",
    ".border-r-red-400{border-right-color:rgba(248,113,113,1);}",
  ],
  [
    "border-r-red-500",
    ".border-r-red-500{border-right-color:rgba(239,68,68,1);}",
  ],
  [
    "border-r-red-600",
    ".border-r-red-600{border-right-color:rgba(220,38,38,1);}",
  ],
  [
    "border-r-red-700",
    ".border-r-red-700{border-right-color:rgba(185,28,28,1);}",
  ],
  [
    "border-r-red-800",
    ".border-r-red-800{border-right-color:rgba(153,27,27,1);}",
  ],
  [
    "border-r-red-900",
    ".border-r-red-900{border-right-color:rgba(127,29,29,1);}",
  ],
  [
    "border-r-orange-50",
    ".border-r-orange-50{border-right-color:rgba(255,247,237,1);}",
  ],
  [
    "border-r-orange-100",
    ".border-r-orange-100{border-right-color:rgba(255,237,213,1);}",
  ],
  [
    "border-r-orange-200",
    ".border-r-orange-200{border-right-color:rgba(254,215,170,1);}",
  ],
  [
    "border-r-orange-300",
    ".border-r-orange-300{border-right-color:rgba(253,186,116,1);}",
  ],
  [
    "border-r-orange-400",
    ".border-r-orange-400{border-right-color:rgba(251,146,60,1);}",
  ],
  [
    "border-r-orange-500",
    ".border-r-orange-500{border-right-color:rgba(249,115,22,1);}",
  ],
  [
    "border-r-orange-600",
    ".border-r-orange-600{border-right-color:rgba(234,88,12,1);}",
  ],
  [
    "border-r-orange-700",
    ".border-r-orange-700{border-right-color:rgba(194,65,12,1);}",
  ],
  [
    "border-r-orange-800",
    ".border-r-orange-800{border-right-color:rgba(154,52,18,1);}",
  ],
  [
    "border-r-orange-900",
    ".border-r-orange-900{border-right-color:rgba(124,45,18,1);}",
  ],
  [
    "border-r-amber-50",
    ".border-r-amber-50{border-right-color:rgba(255,251,235,1);}",
  ],
  [
    "border-r-amber-100",
    ".border-r-amber-100{border-right-color:rgba(254,243,199,1);}",
  ],
  [
    "border-r-amber-200",
    ".border-r-amber-200{border-right-color:rgba(253,230,138,1);}",
  ],
  [
    "border-r-amber-300",
    ".border-r-amber-300{border-right-color:rgba(252,211,77,1);}",
  ],
  [
    "border-r-amber-400",
    ".border-r-amber-400{border-right-color:rgba(251,191,36,1);}",
  ],
  [
    "border-r-amber-500",
    ".border-r-amber-500{border-right-color:rgba(245,158,11,1);}",
  ],
  [
    "border-r-amber-600",
    ".border-r-amber-600{border-right-color:rgba(217,119,6,1);}",
  ],
  [
    "border-r-amber-700",
    ".border-r-amber-700{border-right-color:rgba(180,83,9,1);}",
  ],
  [
    "border-r-amber-800",
    ".border-r-amber-800{border-right-color:rgba(146,64,14,1);}",
  ],
  [
    "border-r-amber-900",
    ".border-r-amber-900{border-right-color:rgba(120,53,15,1);}",
  ],
  [
    "border-r-yellow-50",
    ".border-r-yellow-50{border-right-color:rgba(254,252,232,1);}",
  ],
  [
    "border-r-yellow-100",
    ".border-r-yellow-100{border-right-color:rgba(254,249,195,1);}",
  ],
  [
    "border-r-yellow-200",
    ".border-r-yellow-200{border-right-color:rgba(254,240,138,1);}",
  ],
  [
    "border-r-yellow-300",
    ".border-r-yellow-300{border-right-color:rgba(253,224,71,1);}",
  ],
  [
    "border-r-yellow-400",
    ".border-r-yellow-400{border-right-color:rgba(250,204,21,1);}",
  ],
  [
    "border-r-yellow-500",
    ".border-r-yellow-500{border-right-color:rgba(234,179,8,1);}",
  ],
  [
    "border-r-yellow-600",
    ".border-r-yellow-600{border-right-color:rgba(202,138,4,1);}",
  ],
  [
    "border-r-yellow-700",
    ".border-r-yellow-700{border-right-color:rgba(161,98,7,1);}",
  ],
  [
    "border-r-yellow-800",
    ".border-r-yellow-800{border-right-color:rgba(133,77,14,1);}",
  ],
  [
    "border-r-yellow-900",
    ".border-r-yellow-900{border-right-color:rgba(113,63,18,1);}",
  ],
  [
    "border-r-lime-50",
    ".border-r-lime-50{border-right-color:rgba(247,254,231,1);}",
  ],
  [
    "border-r-lime-100",
    ".border-r-lime-100{border-right-color:rgba(236,252,203,1);}",
  ],
  [
    "border-r-lime-200",
    ".border-r-lime-200{border-right-color:rgba(217,249,157,1);}",
  ],
  [
    "border-r-lime-300",
    ".border-r-lime-300{border-right-color:rgba(190,242,100,1);}",
  ],
  [
    "border-r-lime-400",
    ".border-r-lime-400{border-right-color:rgba(163,230,53,1);}",
  ],
  [
    "border-r-lime-500",
    ".border-r-lime-500{border-right-color:rgba(132,204,22,1);}",
  ],
  [
    "border-r-lime-600",
    ".border-r-lime-600{border-right-color:rgba(101,163,13,1);}",
  ],
  [
    "border-r-lime-700",
    ".border-r-lime-700{border-right-color:rgba(77,124,15,1);}",
  ],
  [
    "border-r-lime-800",
    ".border-r-lime-800{border-right-color:rgba(63,98,18,1);}",
  ],
  [
    "border-r-lime-900",
    ".border-r-lime-900{border-right-color:rgba(54,83,20,1);}",
  ],
  [
    "border-r-green-50",
    ".border-r-green-50{border-right-color:rgba(240,253,244,1);}",
  ],
  [
    "border-r-green-100",
    ".border-r-green-100{border-right-color:rgba(220,252,231,1);}",
  ],
  [
    "border-r-green-200",
    ".border-r-green-200{border-right-color:rgba(187,247,208,1);}",
  ],
  [
    "border-r-green-300",
    ".border-r-green-300{border-right-color:rgba(134,239,172,1);}",
  ],
  [
    "border-r-green-400",
    ".border-r-green-400{border-right-color:rgba(74,222,128,1);}",
  ],
  [
    "border-r-green-500",
    ".border-r-green-500{border-right-color:rgba(34,197,94,1);}",
  ],
  [
    "border-r-green-600",
    ".border-r-green-600{border-right-color:rgba(22,163,74,1);}",
  ],
  [
    "border-r-green-700",
    ".border-r-green-700{border-right-color:rgba(21,128,61,1);}",
  ],
  [
    "border-r-green-800",
    ".border-r-green-800{border-right-color:rgba(22,101,52,1);}",
  ],
  [
    "border-r-green-900",
    ".border-r-green-900{border-right-color:rgba(20,83,45,1);}",
  ],
  [
    "border-r-emerald-50",
    ".border-r-emerald-50{border-right-color:rgba(236,253,245,1);}",
  ],
  [
    "border-r-emerald-100",
    ".border-r-emerald-100{border-right-color:rgba(209,250,229,1);}",
  ],
  [
    "border-r-emerald-200",
    ".border-r-emerald-200{border-right-color:rgba(167,243,208,1);}",
  ],
  [
    "border-r-emerald-300",
    ".border-r-emerald-300{border-right-color:rgba(110,231,183,1);}",
  ],
  [
    "border-r-emerald-400",
    ".border-r-emerald-400{border-right-color:rgba(52,211,153,1);}",
  ],
  [
    "border-r-emerald-500",
    ".border-r-emerald-500{border-right-color:rgba(16,185,129,1);}",
  ],
  [
    "border-r-emerald-600",
    ".border-r-emerald-600{border-right-color:rgba(5,150,105,1);}",
  ],
  [
    "border-r-emerald-700",
    ".border-r-emerald-700{border-right-color:rgba(4,120,87,1);}",
  ],
  [
    "border-r-emerald-800",
    ".border-r-emerald-800{border-right-color:rgba(6,95,70,1);}",
  ],
  [
    "border-r-emerald-900",
    ".border-r-emerald-900{border-right-color:rgba(6,78,59,1);}",
  ],
  [
    "border-r-teal-50",
    ".border-r-teal-50{border-right-color:rgba(240,253,250,1);}",
  ],
  [
    "border-r-teal-100",
    ".border-r-teal-100{border-right-color:rgba(204,251,241,1);}",
  ],
  [
    "border-r-teal-200",
    ".border-r-teal-200{border-right-color:rgba(153,246,228,1);}",
  ],
  [
    "border-r-teal-300",
    ".border-r-teal-300{border-right-color:rgba(94,234,212,1);}",
  ],
  [
    "border-r-teal-400",
    ".border-r-teal-400{border-right-color:rgba(45,212,191,1);}",
  ],
  [
    "border-r-teal-500",
    ".border-r-teal-500{border-right-color:rgba(20,184,166,1);}",
  ],
  [
    "border-r-teal-600",
    ".border-r-teal-600{border-right-color:rgba(13,148,136,1);}",
  ],
  [
    "border-r-teal-700",
    ".border-r-teal-700{border-right-color:rgba(15,118,110,1);}",
  ],
  [
    "border-r-teal-800",
    ".border-r-teal-800{border-right-color:rgba(17,94,89,1);}",
  ],
  [
    "border-r-teal-900",
    ".border-r-teal-900{border-right-color:rgba(19,78,74,1);}",
  ],
  [
    "border-r-cyan-50",
    ".border-r-cyan-50{border-right-color:rgba(236,254,255,1);}",
  ],
  [
    "border-r-cyan-100",
    ".border-r-cyan-100{border-right-color:rgba(207,250,254,1);}",
  ],
  [
    "border-r-cyan-200",
    ".border-r-cyan-200{border-right-color:rgba(165,243,252,1);}",
  ],
  [
    "border-r-cyan-300",
    ".border-r-cyan-300{border-right-color:rgba(103,232,249,1);}",
  ],
  [
    "border-r-cyan-400",
    ".border-r-cyan-400{border-right-color:rgba(34,211,238,1);}",
  ],
  [
    "border-r-cyan-500",
    ".border-r-cyan-500{border-right-color:rgba(6,182,212,1);}",
  ],
  [
    "border-r-cyan-600",
    ".border-r-cyan-600{border-right-color:rgba(8,145,178,1);}",
  ],
  [
    "border-r-cyan-700",
    ".border-r-cyan-700{border-right-color:rgba(14,116,144,1);}",
  ],
  [
    "border-r-cyan-800",
    ".border-r-cyan-800{border-right-color:rgba(21,94,117,1);}",
  ],
  [
    "border-r-cyan-900",
    ".border-r-cyan-900{border-right-color:rgba(22,78,99,1);}",
  ],
  [
    "border-r-sky-50",
    ".border-r-sky-50{border-right-color:rgba(240,249,255,1);}",
  ],
  [
    "border-r-sky-100",
    ".border-r-sky-100{border-right-color:rgba(224,242,254,1);}",
  ],
  [
    "border-r-sky-200",
    ".border-r-sky-200{border-right-color:rgba(186,230,253,1);}",
  ],
  [
    "border-r-sky-300",
    ".border-r-sky-300{border-right-color:rgba(125,211,252,1);}",
  ],
  [
    "border-r-sky-400",
    ".border-r-sky-400{border-right-color:rgba(56,189,248,1);}",
  ],
  [
    "border-r-sky-500",
    ".border-r-sky-500{border-right-color:rgba(14,165,233,1);}",
  ],
  [
    "border-r-sky-600",
    ".border-r-sky-600{border-right-color:rgba(2,132,199,1);}",
  ],
  [
    "border-r-sky-700",
    ".border-r-sky-700{border-right-color:rgba(3,105,161,1);}",
  ],
  [
    "border-r-sky-800",
    ".border-r-sky-800{border-right-color:rgba(7,89,133,1);}",
  ],
  [
    "border-r-sky-900",
    ".border-r-sky-900{border-right-color:rgba(12,74,110,1);}",
  ],
  [
    "border-r-blue-50",
    ".border-r-blue-50{border-right-color:rgba(239,246,255,1);}",
  ],
  [
    "border-r-blue-100",
    ".border-r-blue-100{border-right-color:rgba(219,234,254,1);}",
  ],
  [
    "border-r-blue-200",
    ".border-r-blue-200{border-right-color:rgba(191,219,254,1);}",
  ],
  [
    "border-r-blue-300",
    ".border-r-blue-300{border-right-color:rgba(147,197,253,1);}",
  ],
  [
    "border-r-blue-400",
    ".border-r-blue-400{border-right-color:rgba(96,165,250,1);}",
  ],
  [
    "border-r-blue-500",
    ".border-r-blue-500{border-right-color:rgba(59,130,246,1);}",
  ],
  [
    "border-r-blue-600",
    ".border-r-blue-600{border-right-color:rgba(37,99,235,1);}",
  ],
  [
    "border-r-blue-700",
    ".border-r-blue-700{border-right-color:rgba(29,78,216,1);}",
  ],
  [
    "border-r-blue-800",
    ".border-r-blue-800{border-right-color:rgba(30,64,175,1);}",
  ],
  [
    "border-r-blue-900",
    ".border-r-blue-900{border-right-color:rgba(30,58,138,1);}",
  ],
  [
    "border-r-indigo-50",
    ".border-r-indigo-50{border-right-color:rgba(238,242,255,1);}",
  ],
  [
    "border-r-indigo-100",
    ".border-r-indigo-100{border-right-color:rgba(224,231,255,1);}",
  ],
  [
    "border-r-indigo-200",
    ".border-r-indigo-200{border-right-color:rgba(199,210,254,1);}",
  ],
  [
    "border-r-indigo-300",
    ".border-r-indigo-300{border-right-color:rgba(165,180,252,1);}",
  ],
  [
    "border-r-indigo-400",
    ".border-r-indigo-400{border-right-color:rgba(129,140,248,1);}",
  ],
  [
    "border-r-indigo-500",
    ".border-r-indigo-500{border-right-color:rgba(99,102,241,1);}",
  ],
  [
    "border-r-indigo-600",
    ".border-r-indigo-600{border-right-color:rgba(79,70,229,1);}",
  ],
  [
    "border-r-indigo-700",
    ".border-r-indigo-700{border-right-color:rgba(67,56,202,1);}",
  ],
  [
    "border-r-indigo-800",
    ".border-r-indigo-800{border-right-color:rgba(55,48,163,1);}",
  ],
  [
    "border-r-indigo-900",
    ".border-r-indigo-900{border-right-color:rgba(49,46,129,1);}",
  ],
  [
    "border-r-violet-50",
    ".border-r-violet-50{border-right-color:rgba(245,243,255,1);}",
  ],
  [
    "border-r-violet-100",
    ".border-r-violet-100{border-right-color:rgba(237,233,254,1);}",
  ],
  [
    "border-r-violet-200",
    ".border-r-violet-200{border-right-color:rgba(221,214,254,1);}",
  ],
  [
    "border-r-violet-300",
    ".border-r-violet-300{border-right-color:rgba(196,181,253,1);}",
  ],
  [
    "border-r-violet-400",
    ".border-r-violet-400{border-right-color:rgba(167,139,250,1);}",
  ],
  [
    "border-r-violet-500",
    ".border-r-violet-500{border-right-color:rgba(139,92,246,1);}",
  ],
  [
    "border-r-violet-600",
    ".border-r-violet-600{border-right-color:rgba(124,58,237,1);}",
  ],
  [
    "border-r-violet-700",
    ".border-r-violet-700{border-right-color:rgba(109,40,217,1);}",
  ],
  [
    "border-r-violet-800",
    ".border-r-violet-800{border-right-color:rgba(91,33,182,1);}",
  ],
  [
    "border-r-violet-900",
    ".border-r-violet-900{border-right-color:rgba(76,29,149,1);}",
  ],
  [
    "border-r-purple-50",
    ".border-r-purple-50{border-right-color:rgba(250,245,255,1);}",
  ],
  [
    "border-r-purple-100",
    ".border-r-purple-100{border-right-color:rgba(243,232,255,1);}",
  ],
  [
    "border-r-purple-200",
    ".border-r-purple-200{border-right-color:rgba(233,213,255,1);}",
  ],
  [
    "border-r-purple-300",
    ".border-r-purple-300{border-right-color:rgba(216,180,254,1);}",
  ],
  [
    "border-r-purple-400",
    ".border-r-purple-400{border-right-color:rgba(192,132,252,1);}",
  ],
  [
    "border-r-purple-500",
    ".border-r-purple-500{border-right-color:rgba(168,85,247,1);}",
  ],
  [
    "border-r-purple-600",
    ".border-r-purple-600{border-right-color:rgba(147,51,234,1);}",
  ],
  [
    "border-r-purple-700",
    ".border-r-purple-700{border-right-color:rgba(126,34,206,1);}",
  ],
  [
    "border-r-purple-800",
    ".border-r-purple-800{border-right-color:rgba(107,33,168,1);}",
  ],
  [
    "border-r-purple-900",
    ".border-r-purple-900{border-right-color:rgba(88,28,135,1);}",
  ],
  [
    "border-r-fuchsia-50",
    ".border-r-fuchsia-50{border-right-color:rgba(253,244,255,1);}",
  ],
  [
    "border-r-fuchsia-100",
    ".border-r-fuchsia-100{border-right-color:rgba(250,232,255,1);}",
  ],
  [
    "border-r-fuchsia-200",
    ".border-r-fuchsia-200{border-right-color:rgba(245,208,254,1);}",
  ],
  [
    "border-r-fuchsia-300",
    ".border-r-fuchsia-300{border-right-color:rgba(240,171,252,1);}",
  ],
  [
    "border-r-fuchsia-400",
    ".border-r-fuchsia-400{border-right-color:rgba(232,121,249,1);}",
  ],
  [
    "border-r-fuchsia-500",
    ".border-r-fuchsia-500{border-right-color:rgba(217,70,239,1);}",
  ],
  [
    "border-r-fuchsia-600",
    ".border-r-fuchsia-600{border-right-color:rgba(192,38,211,1);}",
  ],
  [
    "border-r-fuchsia-700",
    ".border-r-fuchsia-700{border-right-color:rgba(162,28,175,1);}",
  ],
  [
    "border-r-fuchsia-800",
    ".border-r-fuchsia-800{border-right-color:rgba(134,25,143,1);}",
  ],
  [
    "border-r-fuchsia-900",
    ".border-r-fuchsia-900{border-right-color:rgba(112,26,117,1);}",
  ],
  [
    "border-r-pink-50",
    ".border-r-pink-50{border-right-color:rgba(253,242,248,1);}",
  ],
  [
    "border-r-pink-100",
    ".border-r-pink-100{border-right-color:rgba(252,231,243,1);}",
  ],
  [
    "border-r-pink-200",
    ".border-r-pink-200{border-right-color:rgba(251,207,232,1);}",
  ],
  [
    "border-r-pink-300",
    ".border-r-pink-300{border-right-color:rgba(249,168,212,1);}",
  ],
  [
    "border-r-pink-400",
    ".border-r-pink-400{border-right-color:rgba(244,114,182,1);}",
  ],
  [
    "border-r-pink-500",
    ".border-r-pink-500{border-right-color:rgba(236,72,153,1);}",
  ],
  [
    "border-r-pink-600",
    ".border-r-pink-600{border-right-color:rgba(219,39,119,1);}",
  ],
  [
    "border-r-pink-700",
    ".border-r-pink-700{border-right-color:rgba(190,24,93,1);}",
  ],
  [
    "border-r-pink-800",
    ".border-r-pink-800{border-right-color:rgba(157,23,77,1);}",
  ],
  [
    "border-r-pink-900",
    ".border-r-pink-900{border-right-color:rgba(131,24,67,1);}",
  ],
  [
    "border-r-rose-50",
    ".border-r-rose-50{border-right-color:rgba(255,241,242,1);}",
  ],
  [
    "border-r-rose-100",
    ".border-r-rose-100{border-right-color:rgba(255,228,230,1);}",
  ],
  [
    "border-r-rose-200",
    ".border-r-rose-200{border-right-color:rgba(254,205,211,1);}",
  ],
  [
    "border-r-rose-300",
    ".border-r-rose-300{border-right-color:rgba(253,164,175,1);}",
  ],
  [
    "border-r-rose-400",
    ".border-r-rose-400{border-right-color:rgba(251,113,133,1);}",
  ],
  [
    "border-r-rose-500",
    ".border-r-rose-500{border-right-color:rgba(244,63,94,1);}",
  ],
  [
    "border-r-rose-600",
    ".border-r-rose-600{border-right-color:rgba(225,29,72,1);}",
  ],
  [
    "border-r-rose-700",
    ".border-r-rose-700{border-right-color:rgba(190,18,60,1);}",
  ],
  [
    "border-r-rose-800",
    ".border-r-rose-800{border-right-color:rgba(159,18,57,1);}",
  ],
  [
    "border-r-rose-900",
    ".border-r-rose-900{border-right-color:rgba(136,19,55,1);}",
  ],
  [
    "border-b-slate-50",
    ".border-b-slate-50{border-bottom-color:rgba(248,250,252,1);}",
  ],
  [
    "border-b-slate-100",
    ".border-b-slate-100{border-bottom-color:rgba(241,245,249,1);}",
  ],
  [
    "border-b-slate-200",
    ".border-b-slate-200{border-bottom-color:rgba(226,232,240,1);}",
  ],
  [
    "border-b-slate-300",
    ".border-b-slate-300{border-bottom-color:rgba(203,213,225,1);}",
  ],
  [
    "border-b-slate-400",
    ".border-b-slate-400{border-bottom-color:rgba(148,163,184,1);}",
  ],
  [
    "border-b-slate-500",
    ".border-b-slate-500{border-bottom-color:rgba(100,116,139,1);}",
  ],
  [
    "border-b-slate-600",
    ".border-b-slate-600{border-bottom-color:rgba(71,85,105,1);}",
  ],
  [
    "border-b-slate-700",
    ".border-b-slate-700{border-bottom-color:rgba(51,65,85,1);}",
  ],
  [
    "border-b-slate-800",
    ".border-b-slate-800{border-bottom-color:rgba(30,41,59,1);}",
  ],
  [
    "border-b-slate-900",
    ".border-b-slate-900{border-bottom-color:rgba(15,23,42,1);}",
  ],
  [
    "border-b-gray-50",
    ".border-b-gray-50{border-bottom-color:rgba(249,250,251,1);}",
  ],
  [
    "border-b-gray-100",
    ".border-b-gray-100{border-bottom-color:rgba(243,244,246,1);}",
  ],
  [
    "border-b-gray-200",
    ".border-b-gray-200{border-bottom-color:rgba(229,231,235,1);}",
  ],
  [
    "border-b-gray-300",
    ".border-b-gray-300{border-bottom-color:rgba(209,213,219,1);}",
  ],
  [
    "border-b-gray-400",
    ".border-b-gray-400{border-bottom-color:rgba(156,163,175,1);}",
  ],
  [
    "border-b-gray-500",
    ".border-b-gray-500{border-bottom-color:rgba(107,114,128,1);}",
  ],
  [
    "border-b-gray-600",
    ".border-b-gray-600{border-bottom-color:rgba(75,85,99,1);}",
  ],
  [
    "border-b-gray-700",
    ".border-b-gray-700{border-bottom-color:rgba(55,65,81,1);}",
  ],
  [
    "border-b-gray-800",
    ".border-b-gray-800{border-bottom-color:rgba(31,41,55,1);}",
  ],
  [
    "border-b-gray-900",
    ".border-b-gray-900{border-bottom-color:rgba(17,24,39,1);}",
  ],
  [
    "border-b-zinc-50",
    ".border-b-zinc-50{border-bottom-color:rgba(250,250,250,1);}",
  ],
  [
    "border-b-zinc-100",
    ".border-b-zinc-100{border-bottom-color:rgba(244,244,245,1);}",
  ],
  [
    "border-b-zinc-200",
    ".border-b-zinc-200{border-bottom-color:rgba(228,228,231,1);}",
  ],
  [
    "border-b-zinc-300",
    ".border-b-zinc-300{border-bottom-color:rgba(212,212,216,1);}",
  ],
  [
    "border-b-zinc-400",
    ".border-b-zinc-400{border-bottom-color:rgba(161,161,170,1);}",
  ],
  [
    "border-b-zinc-500",
    ".border-b-zinc-500{border-bottom-color:rgba(113,113,122,1);}",
  ],
  [
    "border-b-zinc-600",
    ".border-b-zinc-600{border-bottom-color:rgba(82,82,91,1);}",
  ],
  [
    "border-b-zinc-700",
    ".border-b-zinc-700{border-bottom-color:rgba(63,63,70,1);}",
  ],
  [
    "border-b-zinc-800",
    ".border-b-zinc-800{border-bottom-color:rgba(39,39,42,1);}",
  ],
  [
    "border-b-zinc-900",
    ".border-b-zinc-900{border-bottom-color:rgba(24,24,27,1);}",
  ],
  [
    "border-b-neutral-50",
    ".border-b-neutral-50{border-bottom-color:rgba(250,250,250,1);}",
  ],
  [
    "border-b-neutral-100",
    ".border-b-neutral-100{border-bottom-color:rgba(245,245,245,1);}",
  ],
  [
    "border-b-neutral-200",
    ".border-b-neutral-200{border-bottom-color:rgba(229,229,229,1);}",
  ],
  [
    "border-b-neutral-300",
    ".border-b-neutral-300{border-bottom-color:rgba(212,212,212,1);}",
  ],
  [
    "border-b-neutral-400",
    ".border-b-neutral-400{border-bottom-color:rgba(163,163,163,1);}",
  ],
  [
    "border-b-neutral-500",
    ".border-b-neutral-500{border-bottom-color:rgba(115,115,115,1);}",
  ],
  [
    "border-b-neutral-600",
    ".border-b-neutral-600{border-bottom-color:rgba(82,82,82,1);}",
  ],
  [
    "border-b-neutral-700",
    ".border-b-neutral-700{border-bottom-color:rgba(64,64,64,1);}",
  ],
  [
    "border-b-neutral-800",
    ".border-b-neutral-800{border-bottom-color:rgba(38,38,38,1);}",
  ],
  [
    "border-b-neutral-900",
    ".border-b-neutral-900{border-bottom-color:rgba(23,23,23,1);}",
  ],
  [
    "border-b-stone-50",
    ".border-b-stone-50{border-bottom-color:rgba(250,250,249,1);}",
  ],
  [
    "border-b-stone-100",
    ".border-b-stone-100{border-bottom-color:rgba(245,245,244,1);}",
  ],
  [
    "border-b-stone-200",
    ".border-b-stone-200{border-bottom-color:rgba(231,229,228,1);}",
  ],
  [
    "border-b-stone-300",
    ".border-b-stone-300{border-bottom-color:rgba(214,211,209,1);}",
  ],
  [
    "border-b-stone-400",
    ".border-b-stone-400{border-bottom-color:rgba(168,162,158,1);}",
  ],
  [
    "border-b-stone-500",
    ".border-b-stone-500{border-bottom-color:rgba(120,113,108,1);}",
  ],
  [
    "border-b-stone-600",
    ".border-b-stone-600{border-bottom-color:rgba(87,83,78,1);}",
  ],
  [
    "border-b-stone-700",
    ".border-b-stone-700{border-bottom-color:rgba(68,64,60,1);}",
  ],
  [
    "border-b-stone-800",
    ".border-b-stone-800{border-bottom-color:rgba(41,37,36,1);}",
  ],
  [
    "border-b-stone-900",
    ".border-b-stone-900{border-bottom-color:rgba(28,25,23,1);}",
  ],
  [
    "border-b-red-50",
    ".border-b-red-50{border-bottom-color:rgba(254,242,242,1);}",
  ],
  [
    "border-b-red-100",
    ".border-b-red-100{border-bottom-color:rgba(254,226,226,1);}",
  ],
  [
    "border-b-red-200",
    ".border-b-red-200{border-bottom-color:rgba(254,202,202,1);}",
  ],
  [
    "border-b-red-300",
    ".border-b-red-300{border-bottom-color:rgba(252,165,165,1);}",
  ],
  [
    "border-b-red-400",
    ".border-b-red-400{border-bottom-color:rgba(248,113,113,1);}",
  ],
  [
    "border-b-red-500",
    ".border-b-red-500{border-bottom-color:rgba(239,68,68,1);}",
  ],
  [
    "border-b-red-600",
    ".border-b-red-600{border-bottom-color:rgba(220,38,38,1);}",
  ],
  [
    "border-b-red-700",
    ".border-b-red-700{border-bottom-color:rgba(185,28,28,1);}",
  ],
  [
    "border-b-red-800",
    ".border-b-red-800{border-bottom-color:rgba(153,27,27,1);}",
  ],
  [
    "border-b-red-900",
    ".border-b-red-900{border-bottom-color:rgba(127,29,29,1);}",
  ],
  [
    "border-b-orange-50",
    ".border-b-orange-50{border-bottom-color:rgba(255,247,237,1);}",
  ],
  [
    "border-b-orange-100",
    ".border-b-orange-100{border-bottom-color:rgba(255,237,213,1);}",
  ],
  [
    "border-b-orange-200",
    ".border-b-orange-200{border-bottom-color:rgba(254,215,170,1);}",
  ],
  [
    "border-b-orange-300",
    ".border-b-orange-300{border-bottom-color:rgba(253,186,116,1);}",
  ],
  [
    "border-b-orange-400",
    ".border-b-orange-400{border-bottom-color:rgba(251,146,60,1);}",
  ],
  [
    "border-b-orange-500",
    ".border-b-orange-500{border-bottom-color:rgba(249,115,22,1);}",
  ],
  [
    "border-b-orange-600",
    ".border-b-orange-600{border-bottom-color:rgba(234,88,12,1);}",
  ],
  [
    "border-b-orange-700",
    ".border-b-orange-700{border-bottom-color:rgba(194,65,12,1);}",
  ],
  [
    "border-b-orange-800",
    ".border-b-orange-800{border-bottom-color:rgba(154,52,18,1);}",
  ],
  [
    "border-b-orange-900",
    ".border-b-orange-900{border-bottom-color:rgba(124,45,18,1);}",
  ],
  [
    "border-b-amber-50",
    ".border-b-amber-50{border-bottom-color:rgba(255,251,235,1);}",
  ],
  [
    "border-b-amber-100",
    ".border-b-amber-100{border-bottom-color:rgba(254,243,199,1);}",
  ],
  [
    "border-b-amber-200",
    ".border-b-amber-200{border-bottom-color:rgba(253,230,138,1);}",
  ],
  [
    "border-b-amber-300",
    ".border-b-amber-300{border-bottom-color:rgba(252,211,77,1);}",
  ],
  [
    "border-b-amber-400",
    ".border-b-amber-400{border-bottom-color:rgba(251,191,36,1);}",
  ],
  [
    "border-b-amber-500",
    ".border-b-amber-500{border-bottom-color:rgba(245,158,11,1);}",
  ],
  [
    "border-b-amber-600",
    ".border-b-amber-600{border-bottom-color:rgba(217,119,6,1);}",
  ],
  [
    "border-b-amber-700",
    ".border-b-amber-700{border-bottom-color:rgba(180,83,9,1);}",
  ],
  [
    "border-b-amber-800",
    ".border-b-amber-800{border-bottom-color:rgba(146,64,14,1);}",
  ],
  [
    "border-b-amber-900",
    ".border-b-amber-900{border-bottom-color:rgba(120,53,15,1);}",
  ],
  [
    "border-b-yellow-50",
    ".border-b-yellow-50{border-bottom-color:rgba(254,252,232,1);}",
  ],
  [
    "border-b-yellow-100",
    ".border-b-yellow-100{border-bottom-color:rgba(254,249,195,1);}",
  ],
  [
    "border-b-yellow-200",
    ".border-b-yellow-200{border-bottom-color:rgba(254,240,138,1);}",
  ],
  [
    "border-b-yellow-300",
    ".border-b-yellow-300{border-bottom-color:rgba(253,224,71,1);}",
  ],
  [
    "border-b-yellow-400",
    ".border-b-yellow-400{border-bottom-color:rgba(250,204,21,1);}",
  ],
  [
    "border-b-yellow-500",
    ".border-b-yellow-500{border-bottom-color:rgba(234,179,8,1);}",
  ],
  [
    "border-b-yellow-600",
    ".border-b-yellow-600{border-bottom-color:rgba(202,138,4,1);}",
  ],
  [
    "border-b-yellow-700",
    ".border-b-yellow-700{border-bottom-color:rgba(161,98,7,1);}",
  ],
  [
    "border-b-yellow-800",
    ".border-b-yellow-800{border-bottom-color:rgba(133,77,14,1);}",
  ],
  [
    "border-b-yellow-900",
    ".border-b-yellow-900{border-bottom-color:rgba(113,63,18,1);}",
  ],
  [
    "border-b-lime-50",
    ".border-b-lime-50{border-bottom-color:rgba(247,254,231,1);}",
  ],
  [
    "border-b-lime-100",
    ".border-b-lime-100{border-bottom-color:rgba(236,252,203,1);}",
  ],
  [
    "border-b-lime-200",
    ".border-b-lime-200{border-bottom-color:rgba(217,249,157,1);}",
  ],
  [
    "border-b-lime-300",
    ".border-b-lime-300{border-bottom-color:rgba(190,242,100,1);}",
  ],
  [
    "border-b-lime-400",
    ".border-b-lime-400{border-bottom-color:rgba(163,230,53,1);}",
  ],
  [
    "border-b-lime-500",
    ".border-b-lime-500{border-bottom-color:rgba(132,204,22,1);}",
  ],
  [
    "border-b-lime-600",
    ".border-b-lime-600{border-bottom-color:rgba(101,163,13,1);}",
  ],
  [
    "border-b-lime-700",
    ".border-b-lime-700{border-bottom-color:rgba(77,124,15,1);}",
  ],
  [
    "border-b-lime-800",
    ".border-b-lime-800{border-bottom-color:rgba(63,98,18,1);}",
  ],
  [
    "border-b-lime-900",
    ".border-b-lime-900{border-bottom-color:rgba(54,83,20,1);}",
  ],
  [
    "border-b-green-50",
    ".border-b-green-50{border-bottom-color:rgba(240,253,244,1);}",
  ],
  [
    "border-b-green-100",
    ".border-b-green-100{border-bottom-color:rgba(220,252,231,1);}",
  ],
  [
    "border-b-green-200",
    ".border-b-green-200{border-bottom-color:rgba(187,247,208,1);}",
  ],
  [
    "border-b-green-300",
    ".border-b-green-300{border-bottom-color:rgba(134,239,172,1);}",
  ],
  [
    "border-b-green-400",
    ".border-b-green-400{border-bottom-color:rgba(74,222,128,1);}",
  ],
  [
    "border-b-green-500",
    ".border-b-green-500{border-bottom-color:rgba(34,197,94,1);}",
  ],
  [
    "border-b-green-600",
    ".border-b-green-600{border-bottom-color:rgba(22,163,74,1);}",
  ],
  [
    "border-b-green-700",
    ".border-b-green-700{border-bottom-color:rgba(21,128,61,1);}",
  ],
  [
    "border-b-green-800",
    ".border-b-green-800{border-bottom-color:rgba(22,101,52,1);}",
  ],
  [
    "border-b-green-900",
    ".border-b-green-900{border-bottom-color:rgba(20,83,45,1);}",
  ],
  [
    "border-b-emerald-50",
    ".border-b-emerald-50{border-bottom-color:rgba(236,253,245,1);}",
  ],
  [
    "border-b-emerald-100",
    ".border-b-emerald-100{border-bottom-color:rgba(209,250,229,1);}",
  ],
  [
    "border-b-emerald-200",
    ".border-b-emerald-200{border-bottom-color:rgba(167,243,208,1);}",
  ],
  [
    "border-b-emerald-300",
    ".border-b-emerald-300{border-bottom-color:rgba(110,231,183,1);}",
  ],
  [
    "border-b-emerald-400",
    ".border-b-emerald-400{border-bottom-color:rgba(52,211,153,1);}",
  ],
  [
    "border-b-emerald-500",
    ".border-b-emerald-500{border-bottom-color:rgba(16,185,129,1);}",
  ],
  [
    "border-b-emerald-600",
    ".border-b-emerald-600{border-bottom-color:rgba(5,150,105,1);}",
  ],
  [
    "border-b-emerald-700",
    ".border-b-emerald-700{border-bottom-color:rgba(4,120,87,1);}",
  ],
  [
    "border-b-emerald-800",
    ".border-b-emerald-800{border-bottom-color:rgba(6,95,70,1);}",
  ],
  [
    "border-b-emerald-900",
    ".border-b-emerald-900{border-bottom-color:rgba(6,78,59,1);}",
  ],
  [
    "border-b-teal-50",
    ".border-b-teal-50{border-bottom-color:rgba(240,253,250,1);}",
  ],
  [
    "border-b-teal-100",
    ".border-b-teal-100{border-bottom-color:rgba(204,251,241,1);}",
  ],
  [
    "border-b-teal-200",
    ".border-b-teal-200{border-bottom-color:rgba(153,246,228,1);}",
  ],
  [
    "border-b-teal-300",
    ".border-b-teal-300{border-bottom-color:rgba(94,234,212,1);}",
  ],
  [
    "border-b-teal-400",
    ".border-b-teal-400{border-bottom-color:rgba(45,212,191,1);}",
  ],
  [
    "border-b-teal-500",
    ".border-b-teal-500{border-bottom-color:rgba(20,184,166,1);}",
  ],
  [
    "border-b-teal-600",
    ".border-b-teal-600{border-bottom-color:rgba(13,148,136,1);}",
  ],
  [
    "border-b-teal-700",
    ".border-b-teal-700{border-bottom-color:rgba(15,118,110,1);}",
  ],
  [
    "border-b-teal-800",
    ".border-b-teal-800{border-bottom-color:rgba(17,94,89,1);}",
  ],
  [
    "border-b-teal-900",
    ".border-b-teal-900{border-bottom-color:rgba(19,78,74,1);}",
  ],
  [
    "border-b-cyan-50",
    ".border-b-cyan-50{border-bottom-color:rgba(236,254,255,1);}",
  ],
  [
    "border-b-cyan-100",
    ".border-b-cyan-100{border-bottom-color:rgba(207,250,254,1);}",
  ],
  [
    "border-b-cyan-200",
    ".border-b-cyan-200{border-bottom-color:rgba(165,243,252,1);}",
  ],
  [
    "border-b-cyan-300",
    ".border-b-cyan-300{border-bottom-color:rgba(103,232,249,1);}",
  ],
  [
    "border-b-cyan-400",
    ".border-b-cyan-400{border-bottom-color:rgba(34,211,238,1);}",
  ],
  [
    "border-b-cyan-500",
    ".border-b-cyan-500{border-bottom-color:rgba(6,182,212,1);}",
  ],
  [
    "border-b-cyan-600",
    ".border-b-cyan-600{border-bottom-color:rgba(8,145,178,1);}",
  ],
  [
    "border-b-cyan-700",
    ".border-b-cyan-700{border-bottom-color:rgba(14,116,144,1);}",
  ],
  [
    "border-b-cyan-800",
    ".border-b-cyan-800{border-bottom-color:rgba(21,94,117,1);}",
  ],
  [
    "border-b-cyan-900",
    ".border-b-cyan-900{border-bottom-color:rgba(22,78,99,1);}",
  ],
  [
    "border-b-sky-50",
    ".border-b-sky-50{border-bottom-color:rgba(240,249,255,1);}",
  ],
  [
    "border-b-sky-100",
    ".border-b-sky-100{border-bottom-color:rgba(224,242,254,1);}",
  ],
  [
    "border-b-sky-200",
    ".border-b-sky-200{border-bottom-color:rgba(186,230,253,1);}",
  ],
  [
    "border-b-sky-300",
    ".border-b-sky-300{border-bottom-color:rgba(125,211,252,1);}",
  ],
  [
    "border-b-sky-400",
    ".border-b-sky-400{border-bottom-color:rgba(56,189,248,1);}",
  ],
  [
    "border-b-sky-500",
    ".border-b-sky-500{border-bottom-color:rgba(14,165,233,1);}",
  ],
  [
    "border-b-sky-600",
    ".border-b-sky-600{border-bottom-color:rgba(2,132,199,1);}",
  ],
  [
    "border-b-sky-700",
    ".border-b-sky-700{border-bottom-color:rgba(3,105,161,1);}",
  ],
  [
    "border-b-sky-800",
    ".border-b-sky-800{border-bottom-color:rgba(7,89,133,1);}",
  ],
  [
    "border-b-sky-900",
    ".border-b-sky-900{border-bottom-color:rgba(12,74,110,1);}",
  ],
  [
    "border-b-blue-50",
    ".border-b-blue-50{border-bottom-color:rgba(239,246,255,1);}",
  ],
  [
    "border-b-blue-100",
    ".border-b-blue-100{border-bottom-color:rgba(219,234,254,1);}",
  ],
  [
    "border-b-blue-200",
    ".border-b-blue-200{border-bottom-color:rgba(191,219,254,1);}",
  ],
  [
    "border-b-blue-300",
    ".border-b-blue-300{border-bottom-color:rgba(147,197,253,1);}",
  ],
  [
    "border-b-blue-400",
    ".border-b-blue-400{border-bottom-color:rgba(96,165,250,1);}",
  ],
  [
    "border-b-blue-500",
    ".border-b-blue-500{border-bottom-color:rgba(59,130,246,1);}",
  ],
  [
    "border-b-blue-600",
    ".border-b-blue-600{border-bottom-color:rgba(37,99,235,1);}",
  ],
  [
    "border-b-blue-700",
    ".border-b-blue-700{border-bottom-color:rgba(29,78,216,1);}",
  ],
  [
    "border-b-blue-800",
    ".border-b-blue-800{border-bottom-color:rgba(30,64,175,1);}",
  ],
  [
    "border-b-blue-900",
    ".border-b-blue-900{border-bottom-color:rgba(30,58,138,1);}",
  ],
  [
    "border-b-indigo-50",
    ".border-b-indigo-50{border-bottom-color:rgba(238,242,255,1);}",
  ],
  [
    "border-b-indigo-100",
    ".border-b-indigo-100{border-bottom-color:rgba(224,231,255,1);}",
  ],
  [
    "border-b-indigo-200",
    ".border-b-indigo-200{border-bottom-color:rgba(199,210,254,1);}",
  ],
  [
    "border-b-indigo-300",
    ".border-b-indigo-300{border-bottom-color:rgba(165,180,252,1);}",
  ],
  [
    "border-b-indigo-400",
    ".border-b-indigo-400{border-bottom-color:rgba(129,140,248,1);}",
  ],
  [
    "border-b-indigo-500",
    ".border-b-indigo-500{border-bottom-color:rgba(99,102,241,1);}",
  ],
  [
    "border-b-indigo-600",
    ".border-b-indigo-600{border-bottom-color:rgba(79,70,229,1);}",
  ],
  [
    "border-b-indigo-700",
    ".border-b-indigo-700{border-bottom-color:rgba(67,56,202,1);}",
  ],
  [
    "border-b-indigo-800",
    ".border-b-indigo-800{border-bottom-color:rgba(55,48,163,1);}",
  ],
  [
    "border-b-indigo-900",
    ".border-b-indigo-900{border-bottom-color:rgba(49,46,129,1);}",
  ],
  [
    "border-b-violet-50",
    ".border-b-violet-50{border-bottom-color:rgba(245,243,255,1);}",
  ],
  [
    "border-b-violet-100",
    ".border-b-violet-100{border-bottom-color:rgba(237,233,254,1);}",
  ],
  [
    "border-b-violet-200",
    ".border-b-violet-200{border-bottom-color:rgba(221,214,254,1);}",
  ],
  [
    "border-b-violet-300",
    ".border-b-violet-300{border-bottom-color:rgba(196,181,253,1);}",
  ],
  [
    "border-b-violet-400",
    ".border-b-violet-400{border-bottom-color:rgba(167,139,250,1);}",
  ],
  [
    "border-b-violet-500",
    ".border-b-violet-500{border-bottom-color:rgba(139,92,246,1);}",
  ],
  [
    "border-b-violet-600",
    ".border-b-violet-600{border-bottom-color:rgba(124,58,237,1);}",
  ],
  [
    "border-b-violet-700",
    ".border-b-violet-700{border-bottom-color:rgba(109,40,217,1);}",
  ],
  [
    "border-b-violet-800",
    ".border-b-violet-800{border-bottom-color:rgba(91,33,182,1);}",
  ],
  [
    "border-b-violet-900",
    ".border-b-violet-900{border-bottom-color:rgba(76,29,149,1);}",
  ],
  [
    "border-b-purple-50",
    ".border-b-purple-50{border-bottom-color:rgba(250,245,255,1);}",
  ],
  [
    "border-b-purple-100",
    ".border-b-purple-100{border-bottom-color:rgba(243,232,255,1);}",
  ],
  [
    "border-b-purple-200",
    ".border-b-purple-200{border-bottom-color:rgba(233,213,255,1);}",
  ],
  [
    "border-b-purple-300",
    ".border-b-purple-300{border-bottom-color:rgba(216,180,254,1);}",
  ],
  [
    "border-b-purple-400",
    ".border-b-purple-400{border-bottom-color:rgba(192,132,252,1);}",
  ],
  [
    "border-b-purple-500",
    ".border-b-purple-500{border-bottom-color:rgba(168,85,247,1);}",
  ],
  [
    "border-b-purple-600",
    ".border-b-purple-600{border-bottom-color:rgba(147,51,234,1);}",
  ],
  [
    "border-b-purple-700",
    ".border-b-purple-700{border-bottom-color:rgba(126,34,206,1);}",
  ],
  [
    "border-b-purple-800",
    ".border-b-purple-800{border-bottom-color:rgba(107,33,168,1);}",
  ],
  [
    "border-b-purple-900",
    ".border-b-purple-900{border-bottom-color:rgba(88,28,135,1);}",
  ],
  [
    "border-b-fuchsia-50",
    ".border-b-fuchsia-50{border-bottom-color:rgba(253,244,255,1);}",
  ],
  [
    "border-b-fuchsia-100",
    ".border-b-fuchsia-100{border-bottom-color:rgba(250,232,255,1);}",
  ],
  [
    "border-b-fuchsia-200",
    ".border-b-fuchsia-200{border-bottom-color:rgba(245,208,254,1);}",
  ],
  [
    "border-b-fuchsia-300",
    ".border-b-fuchsia-300{border-bottom-color:rgba(240,171,252,1);}",
  ],
  [
    "border-b-fuchsia-400",
    ".border-b-fuchsia-400{border-bottom-color:rgba(232,121,249,1);}",
  ],
  [
    "border-b-fuchsia-500",
    ".border-b-fuchsia-500{border-bottom-color:rgba(217,70,239,1);}",
  ],
  [
    "border-b-fuchsia-600",
    ".border-b-fuchsia-600{border-bottom-color:rgba(192,38,211,1);}",
  ],
  [
    "border-b-fuchsia-700",
    ".border-b-fuchsia-700{border-bottom-color:rgba(162,28,175,1);}",
  ],
  [
    "border-b-fuchsia-800",
    ".border-b-fuchsia-800{border-bottom-color:rgba(134,25,143,1);}",
  ],
  [
    "border-b-fuchsia-900",
    ".border-b-fuchsia-900{border-bottom-color:rgba(112,26,117,1);}",
  ],
  [
    "border-b-pink-50",
    ".border-b-pink-50{border-bottom-color:rgba(253,242,248,1);}",
  ],
  [
    "border-b-pink-100",
    ".border-b-pink-100{border-bottom-color:rgba(252,231,243,1);}",
  ],
  [
    "border-b-pink-200",
    ".border-b-pink-200{border-bottom-color:rgba(251,207,232,1);}",
  ],
  [
    "border-b-pink-300",
    ".border-b-pink-300{border-bottom-color:rgba(249,168,212,1);}",
  ],
  [
    "border-b-pink-400",
    ".border-b-pink-400{border-bottom-color:rgba(244,114,182,1);}",
  ],
  [
    "border-b-pink-500",
    ".border-b-pink-500{border-bottom-color:rgba(236,72,153,1);}",
  ],
  [
    "border-b-pink-600",
    ".border-b-pink-600{border-bottom-color:rgba(219,39,119,1);}",
  ],
  [
    "border-b-pink-700",
    ".border-b-pink-700{border-bottom-color:rgba(190,24,93,1);}",
  ],
  [
    "border-b-pink-800",
    ".border-b-pink-800{border-bottom-color:rgba(157,23,77,1);}",
  ],
  [
    "border-b-pink-900",
    ".border-b-pink-900{border-bottom-color:rgba(131,24,67,1);}",
  ],
  [
    "border-b-rose-50",
    ".border-b-rose-50{border-bottom-color:rgba(255,241,242,1);}",
  ],
  [
    "border-b-rose-100",
    ".border-b-rose-100{border-bottom-color:rgba(255,228,230,1);}",
  ],
  [
    "border-b-rose-200",
    ".border-b-rose-200{border-bottom-color:rgba(254,205,211,1);}",
  ],
  [
    "border-b-rose-300",
    ".border-b-rose-300{border-bottom-color:rgba(253,164,175,1);}",
  ],
  [
    "border-b-rose-400",
    ".border-b-rose-400{border-bottom-color:rgba(251,113,133,1);}",
  ],
  [
    "border-b-rose-500",
    ".border-b-rose-500{border-bottom-color:rgba(244,63,94,1);}",
  ],
  [
    "border-b-rose-600",
    ".border-b-rose-600{border-bottom-color:rgba(225,29,72,1);}",
  ],
  [
    "border-b-rose-700",
    ".border-b-rose-700{border-bottom-color:rgba(190,18,60,1);}",
  ],
  [
    "border-b-rose-800",
    ".border-b-rose-800{border-bottom-color:rgba(159,18,57,1);}",
  ],
  [
    "border-b-rose-900",
    ".border-b-rose-900{border-bottom-color:rgba(136,19,55,1);}",
  ],
  [
    "border-l-slate-50",
    ".border-l-slate-50{border-left-color:rgba(248,250,252,1);}",
  ],
  [
    "border-l-slate-100",
    ".border-l-slate-100{border-left-color:rgba(241,245,249,1);}",
  ],
  [
    "border-l-slate-200",
    ".border-l-slate-200{border-left-color:rgba(226,232,240,1);}",
  ],
  [
    "border-l-slate-300",
    ".border-l-slate-300{border-left-color:rgba(203,213,225,1);}",
  ],
  [
    "border-l-slate-400",
    ".border-l-slate-400{border-left-color:rgba(148,163,184,1);}",
  ],
  [
    "border-l-slate-500",
    ".border-l-slate-500{border-left-color:rgba(100,116,139,1);}",
  ],
  [
    "border-l-slate-600",
    ".border-l-slate-600{border-left-color:rgba(71,85,105,1);}",
  ],
  [
    "border-l-slate-700",
    ".border-l-slate-700{border-left-color:rgba(51,65,85,1);}",
  ],
  [
    "border-l-slate-800",
    ".border-l-slate-800{border-left-color:rgba(30,41,59,1);}",
  ],
  [
    "border-l-slate-900",
    ".border-l-slate-900{border-left-color:rgba(15,23,42,1);}",
  ],
  [
    "border-l-gray-50",
    ".border-l-gray-50{border-left-color:rgba(249,250,251,1);}",
  ],
  [
    "border-l-gray-100",
    ".border-l-gray-100{border-left-color:rgba(243,244,246,1);}",
  ],
  [
    "border-l-gray-200",
    ".border-l-gray-200{border-left-color:rgba(229,231,235,1);}",
  ],
  [
    "border-l-gray-300",
    ".border-l-gray-300{border-left-color:rgba(209,213,219,1);}",
  ],
  [
    "border-l-gray-400",
    ".border-l-gray-400{border-left-color:rgba(156,163,175,1);}",
  ],
  [
    "border-l-gray-500",
    ".border-l-gray-500{border-left-color:rgba(107,114,128,1);}",
  ],
  [
    "border-l-gray-600",
    ".border-l-gray-600{border-left-color:rgba(75,85,99,1);}",
  ],
  [
    "border-l-gray-700",
    ".border-l-gray-700{border-left-color:rgba(55,65,81,1);}",
  ],
  [
    "border-l-gray-800",
    ".border-l-gray-800{border-left-color:rgba(31,41,55,1);}",
  ],
  [
    "border-l-gray-900",
    ".border-l-gray-900{border-left-color:rgba(17,24,39,1);}",
  ],
  [
    "border-l-zinc-50",
    ".border-l-zinc-50{border-left-color:rgba(250,250,250,1);}",
  ],
  [
    "border-l-zinc-100",
    ".border-l-zinc-100{border-left-color:rgba(244,244,245,1);}",
  ],
  [
    "border-l-zinc-200",
    ".border-l-zinc-200{border-left-color:rgba(228,228,231,1);}",
  ],
  [
    "border-l-zinc-300",
    ".border-l-zinc-300{border-left-color:rgba(212,212,216,1);}",
  ],
  [
    "border-l-zinc-400",
    ".border-l-zinc-400{border-left-color:rgba(161,161,170,1);}",
  ],
  [
    "border-l-zinc-500",
    ".border-l-zinc-500{border-left-color:rgba(113,113,122,1);}",
  ],
  [
    "border-l-zinc-600",
    ".border-l-zinc-600{border-left-color:rgba(82,82,91,1);}",
  ],
  [
    "border-l-zinc-700",
    ".border-l-zinc-700{border-left-color:rgba(63,63,70,1);}",
  ],
  [
    "border-l-zinc-800",
    ".border-l-zinc-800{border-left-color:rgba(39,39,42,1);}",
  ],
  [
    "border-l-zinc-900",
    ".border-l-zinc-900{border-left-color:rgba(24,24,27,1);}",
  ],
  [
    "border-l-neutral-50",
    ".border-l-neutral-50{border-left-color:rgba(250,250,250,1);}",
  ],
  [
    "border-l-neutral-100",
    ".border-l-neutral-100{border-left-color:rgba(245,245,245,1);}",
  ],
  [
    "border-l-neutral-200",
    ".border-l-neutral-200{border-left-color:rgba(229,229,229,1);}",
  ],
  [
    "border-l-neutral-300",
    ".border-l-neutral-300{border-left-color:rgba(212,212,212,1);}",
  ],
  [
    "border-l-neutral-400",
    ".border-l-neutral-400{border-left-color:rgba(163,163,163,1);}",
  ],
  [
    "border-l-neutral-500",
    ".border-l-neutral-500{border-left-color:rgba(115,115,115,1);}",
  ],
  [
    "border-l-neutral-600",
    ".border-l-neutral-600{border-left-color:rgba(82,82,82,1);}",
  ],
  [
    "border-l-neutral-700",
    ".border-l-neutral-700{border-left-color:rgba(64,64,64,1);}",
  ],
  [
    "border-l-neutral-800",
    ".border-l-neutral-800{border-left-color:rgba(38,38,38,1);}",
  ],
  [
    "border-l-neutral-900",
    ".border-l-neutral-900{border-left-color:rgba(23,23,23,1);}",
  ],
  [
    "border-l-stone-50",
    ".border-l-stone-50{border-left-color:rgba(250,250,249,1);}",
  ],
  [
    "border-l-stone-100",
    ".border-l-stone-100{border-left-color:rgba(245,245,244,1);}",
  ],
  [
    "border-l-stone-200",
    ".border-l-stone-200{border-left-color:rgba(231,229,228,1);}",
  ],
  [
    "border-l-stone-300",
    ".border-l-stone-300{border-left-color:rgba(214,211,209,1);}",
  ],
  [
    "border-l-stone-400",
    ".border-l-stone-400{border-left-color:rgba(168,162,158,1);}",
  ],
  [
    "border-l-stone-500",
    ".border-l-stone-500{border-left-color:rgba(120,113,108,1);}",
  ],
  [
    "border-l-stone-600",
    ".border-l-stone-600{border-left-color:rgba(87,83,78,1);}",
  ],
  [
    "border-l-stone-700",
    ".border-l-stone-700{border-left-color:rgba(68,64,60,1);}",
  ],
  [
    "border-l-stone-800",
    ".border-l-stone-800{border-left-color:rgba(41,37,36,1);}",
  ],
  [
    "border-l-stone-900",
    ".border-l-stone-900{border-left-color:rgba(28,25,23,1);}",
  ],
  [
    "border-l-red-50",
    ".border-l-red-50{border-left-color:rgba(254,242,242,1);}",
  ],
  [
    "border-l-red-100",
    ".border-l-red-100{border-left-color:rgba(254,226,226,1);}",
  ],
  [
    "border-l-red-200",
    ".border-l-red-200{border-left-color:rgba(254,202,202,1);}",
  ],
  [
    "border-l-red-300",
    ".border-l-red-300{border-left-color:rgba(252,165,165,1);}",
  ],
  [
    "border-l-red-400",
    ".border-l-red-400{border-left-color:rgba(248,113,113,1);}",
  ],
  [
    "border-l-red-500",
    ".border-l-red-500{border-left-color:rgba(239,68,68,1);}",
  ],
  [
    "border-l-red-600",
    ".border-l-red-600{border-left-color:rgba(220,38,38,1);}",
  ],
  [
    "border-l-red-700",
    ".border-l-red-700{border-left-color:rgba(185,28,28,1);}",
  ],
  [
    "border-l-red-800",
    ".border-l-red-800{border-left-color:rgba(153,27,27,1);}",
  ],
  [
    "border-l-red-900",
    ".border-l-red-900{border-left-color:rgba(127,29,29,1);}",
  ],
  [
    "border-l-orange-50",
    ".border-l-orange-50{border-left-color:rgba(255,247,237,1);}",
  ],
  [
    "border-l-orange-100",
    ".border-l-orange-100{border-left-color:rgba(255,237,213,1);}",
  ],
  [
    "border-l-orange-200",
    ".border-l-orange-200{border-left-color:rgba(254,215,170,1);}",
  ],
  [
    "border-l-orange-300",
    ".border-l-orange-300{border-left-color:rgba(253,186,116,1);}",
  ],
  [
    "border-l-orange-400",
    ".border-l-orange-400{border-left-color:rgba(251,146,60,1);}",
  ],
  [
    "border-l-orange-500",
    ".border-l-orange-500{border-left-color:rgba(249,115,22,1);}",
  ],
  [
    "border-l-orange-600",
    ".border-l-orange-600{border-left-color:rgba(234,88,12,1);}",
  ],
  [
    "border-l-orange-700",
    ".border-l-orange-700{border-left-color:rgba(194,65,12,1);}",
  ],
  [
    "border-l-orange-800",
    ".border-l-orange-800{border-left-color:rgba(154,52,18,1);}",
  ],
  [
    "border-l-orange-900",
    ".border-l-orange-900{border-left-color:rgba(124,45,18,1);}",
  ],
  [
    "border-l-amber-50",
    ".border-l-amber-50{border-left-color:rgba(255,251,235,1);}",
  ],
  [
    "border-l-amber-100",
    ".border-l-amber-100{border-left-color:rgba(254,243,199,1);}",
  ],
  [
    "border-l-amber-200",
    ".border-l-amber-200{border-left-color:rgba(253,230,138,1);}",
  ],
  [
    "border-l-amber-300",
    ".border-l-amber-300{border-left-color:rgba(252,211,77,1);}",
  ],
  [
    "border-l-amber-400",
    ".border-l-amber-400{border-left-color:rgba(251,191,36,1);}",
  ],
  [
    "border-l-amber-500",
    ".border-l-amber-500{border-left-color:rgba(245,158,11,1);}",
  ],
  [
    "border-l-amber-600",
    ".border-l-amber-600{border-left-color:rgba(217,119,6,1);}",
  ],
  [
    "border-l-amber-700",
    ".border-l-amber-700{border-left-color:rgba(180,83,9,1);}",
  ],
  [
    "border-l-amber-800",
    ".border-l-amber-800{border-left-color:rgba(146,64,14,1);}",
  ],
  [
    "border-l-amber-900",
    ".border-l-amber-900{border-left-color:rgba(120,53,15,1);}",
  ],
  [
    "border-l-yellow-50",
    ".border-l-yellow-50{border-left-color:rgba(254,252,232,1);}",
  ],
  [
    "border-l-yellow-100",
    ".border-l-yellow-100{border-left-color:rgba(254,249,195,1);}",
  ],
  [
    "border-l-yellow-200",
    ".border-l-yellow-200{border-left-color:rgba(254,240,138,1);}",
  ],
  [
    "border-l-yellow-300",
    ".border-l-yellow-300{border-left-color:rgba(253,224,71,1);}",
  ],
  [
    "border-l-yellow-400",
    ".border-l-yellow-400{border-left-color:rgba(250,204,21,1);}",
  ],
  [
    "border-l-yellow-500",
    ".border-l-yellow-500{border-left-color:rgba(234,179,8,1);}",
  ],
  [
    "border-l-yellow-600",
    ".border-l-yellow-600{border-left-color:rgba(202,138,4,1);}",
  ],
  [
    "border-l-yellow-700",
    ".border-l-yellow-700{border-left-color:rgba(161,98,7,1);}",
  ],
  [
    "border-l-yellow-800",
    ".border-l-yellow-800{border-left-color:rgba(133,77,14,1);}",
  ],
  [
    "border-l-yellow-900",
    ".border-l-yellow-900{border-left-color:rgba(113,63,18,1);}",
  ],
  [
    "border-l-lime-50",
    ".border-l-lime-50{border-left-color:rgba(247,254,231,1);}",
  ],
  [
    "border-l-lime-100",
    ".border-l-lime-100{border-left-color:rgba(236,252,203,1);}",
  ],
  [
    "border-l-lime-200",
    ".border-l-lime-200{border-left-color:rgba(217,249,157,1);}",
  ],
  [
    "border-l-lime-300",
    ".border-l-lime-300{border-left-color:rgba(190,242,100,1);}",
  ],
  [
    "border-l-lime-400",
    ".border-l-lime-400{border-left-color:rgba(163,230,53,1);}",
  ],
  [
    "border-l-lime-500",
    ".border-l-lime-500{border-left-color:rgba(132,204,22,1);}",
  ],
  [
    "border-l-lime-600",
    ".border-l-lime-600{border-left-color:rgba(101,163,13,1);}",
  ],
  [
    "border-l-lime-700",
    ".border-l-lime-700{border-left-color:rgba(77,124,15,1);}",
  ],
  [
    "border-l-lime-800",
    ".border-l-lime-800{border-left-color:rgba(63,98,18,1);}",
  ],
  [
    "border-l-lime-900",
    ".border-l-lime-900{border-left-color:rgba(54,83,20,1);}",
  ],
  [
    "border-l-green-50",
    ".border-l-green-50{border-left-color:rgba(240,253,244,1);}",
  ],
  [
    "border-l-green-100",
    ".border-l-green-100{border-left-color:rgba(220,252,231,1);}",
  ],
  [
    "border-l-green-200",
    ".border-l-green-200{border-left-color:rgba(187,247,208,1);}",
  ],
  [
    "border-l-green-300",
    ".border-l-green-300{border-left-color:rgba(134,239,172,1);}",
  ],
  [
    "border-l-green-400",
    ".border-l-green-400{border-left-color:rgba(74,222,128,1);}",
  ],
  [
    "border-l-green-500",
    ".border-l-green-500{border-left-color:rgba(34,197,94,1);}",
  ],
  [
    "border-l-green-600",
    ".border-l-green-600{border-left-color:rgba(22,163,74,1);}",
  ],
  [
    "border-l-green-700",
    ".border-l-green-700{border-left-color:rgba(21,128,61,1);}",
  ],
  [
    "border-l-green-800",
    ".border-l-green-800{border-left-color:rgba(22,101,52,1);}",
  ],
  [
    "border-l-green-900",
    ".border-l-green-900{border-left-color:rgba(20,83,45,1);}",
  ],
  [
    "border-l-emerald-50",
    ".border-l-emerald-50{border-left-color:rgba(236,253,245,1);}",
  ],
  [
    "border-l-emerald-100",
    ".border-l-emerald-100{border-left-color:rgba(209,250,229,1);}",
  ],
  [
    "border-l-emerald-200",
    ".border-l-emerald-200{border-left-color:rgba(167,243,208,1);}",
  ],
  [
    "border-l-emerald-300",
    ".border-l-emerald-300{border-left-color:rgba(110,231,183,1);}",
  ],
  [
    "border-l-emerald-400",
    ".border-l-emerald-400{border-left-color:rgba(52,211,153,1);}",
  ],
  [
    "border-l-emerald-500",
    ".border-l-emerald-500{border-left-color:rgba(16,185,129,1);}",
  ],
  [
    "border-l-emerald-600",
    ".border-l-emerald-600{border-left-color:rgba(5,150,105,1);}",
  ],
  [
    "border-l-emerald-700",
    ".border-l-emerald-700{border-left-color:rgba(4,120,87,1);}",
  ],
  [
    "border-l-emerald-800",
    ".border-l-emerald-800{border-left-color:rgba(6,95,70,1);}",
  ],
  [
    "border-l-emerald-900",
    ".border-l-emerald-900{border-left-color:rgba(6,78,59,1);}",
  ],
  [
    "border-l-teal-50",
    ".border-l-teal-50{border-left-color:rgba(240,253,250,1);}",
  ],
  [
    "border-l-teal-100",
    ".border-l-teal-100{border-left-color:rgba(204,251,241,1);}",
  ],
  [
    "border-l-teal-200",
    ".border-l-teal-200{border-left-color:rgba(153,246,228,1);}",
  ],
  [
    "border-l-teal-300",
    ".border-l-teal-300{border-left-color:rgba(94,234,212,1);}",
  ],
  [
    "border-l-teal-400",
    ".border-l-teal-400{border-left-color:rgba(45,212,191,1);}",
  ],
  [
    "border-l-teal-500",
    ".border-l-teal-500{border-left-color:rgba(20,184,166,1);}",
  ],
  [
    "border-l-teal-600",
    ".border-l-teal-600{border-left-color:rgba(13,148,136,1);}",
  ],
  [
    "border-l-teal-700",
    ".border-l-teal-700{border-left-color:rgba(15,118,110,1);}",
  ],
  [
    "border-l-teal-800",
    ".border-l-teal-800{border-left-color:rgba(17,94,89,1);}",
  ],
  [
    "border-l-teal-900",
    ".border-l-teal-900{border-left-color:rgba(19,78,74,1);}",
  ],
  [
    "border-l-cyan-50",
    ".border-l-cyan-50{border-left-color:rgba(236,254,255,1);}",
  ],
  [
    "border-l-cyan-100",
    ".border-l-cyan-100{border-left-color:rgba(207,250,254,1);}",
  ],
  [
    "border-l-cyan-200",
    ".border-l-cyan-200{border-left-color:rgba(165,243,252,1);}",
  ],
  [
    "border-l-cyan-300",
    ".border-l-cyan-300{border-left-color:rgba(103,232,249,1);}",
  ],
  [
    "border-l-cyan-400",
    ".border-l-cyan-400{border-left-color:rgba(34,211,238,1);}",
  ],
  [
    "border-l-cyan-500",
    ".border-l-cyan-500{border-left-color:rgba(6,182,212,1);}",
  ],
  [
    "border-l-cyan-600",
    ".border-l-cyan-600{border-left-color:rgba(8,145,178,1);}",
  ],
  [
    "border-l-cyan-700",
    ".border-l-cyan-700{border-left-color:rgba(14,116,144,1);}",
  ],
  [
    "border-l-cyan-800",
    ".border-l-cyan-800{border-left-color:rgba(21,94,117,1);}",
  ],
  [
    "border-l-cyan-900",
    ".border-l-cyan-900{border-left-color:rgba(22,78,99,1);}",
  ],
  [
    "border-l-sky-50",
    ".border-l-sky-50{border-left-color:rgba(240,249,255,1);}",
  ],
  [
    "border-l-sky-100",
    ".border-l-sky-100{border-left-color:rgba(224,242,254,1);}",
  ],
  [
    "border-l-sky-200",
    ".border-l-sky-200{border-left-color:rgba(186,230,253,1);}",
  ],
  [
    "border-l-sky-300",
    ".border-l-sky-300{border-left-color:rgba(125,211,252,1);}",
  ],
  [
    "border-l-sky-400",
    ".border-l-sky-400{border-left-color:rgba(56,189,248,1);}",
  ],
  [
    "border-l-sky-500",
    ".border-l-sky-500{border-left-color:rgba(14,165,233,1);}",
  ],
  [
    "border-l-sky-600",
    ".border-l-sky-600{border-left-color:rgba(2,132,199,1);}",
  ],
  [
    "border-l-sky-700",
    ".border-l-sky-700{border-left-color:rgba(3,105,161,1);}",
  ],
  [
    "border-l-sky-800",
    ".border-l-sky-800{border-left-color:rgba(7,89,133,1);}",
  ],
  [
    "border-l-sky-900",
    ".border-l-sky-900{border-left-color:rgba(12,74,110,1);}",
  ],
  [
    "border-l-blue-50",
    ".border-l-blue-50{border-left-color:rgba(239,246,255,1);}",
  ],
  [
    "border-l-blue-100",
    ".border-l-blue-100{border-left-color:rgba(219,234,254,1);}",
  ],
  [
    "border-l-blue-200",
    ".border-l-blue-200{border-left-color:rgba(191,219,254,1);}",
  ],
  [
    "border-l-blue-300",
    ".border-l-blue-300{border-left-color:rgba(147,197,253,1);}",
  ],
  [
    "border-l-blue-400",
    ".border-l-blue-400{border-left-color:rgba(96,165,250,1);}",
  ],
  [
    "border-l-blue-500",
    ".border-l-blue-500{border-left-color:rgba(59,130,246,1);}",
  ],
  [
    "border-l-blue-600",
    ".border-l-blue-600{border-left-color:rgba(37,99,235,1);}",
  ],
  [
    "border-l-blue-700",
    ".border-l-blue-700{border-left-color:rgba(29,78,216,1);}",
  ],
  [
    "border-l-blue-800",
    ".border-l-blue-800{border-left-color:rgba(30,64,175,1);}",
  ],
  [
    "border-l-blue-900",
    ".border-l-blue-900{border-left-color:rgba(30,58,138,1);}",
  ],
  [
    "border-l-indigo-50",
    ".border-l-indigo-50{border-left-color:rgba(238,242,255,1);}",
  ],
  [
    "border-l-indigo-100",
    ".border-l-indigo-100{border-left-color:rgba(224,231,255,1);}",
  ],
  [
    "border-l-indigo-200",
    ".border-l-indigo-200{border-left-color:rgba(199,210,254,1);}",
  ],
  [
    "border-l-indigo-300",
    ".border-l-indigo-300{border-left-color:rgba(165,180,252,1);}",
  ],
  [
    "border-l-indigo-400",
    ".border-l-indigo-400{border-left-color:rgba(129,140,248,1);}",
  ],
  [
    "border-l-indigo-500",
    ".border-l-indigo-500{border-left-color:rgba(99,102,241,1);}",
  ],
  [
    "border-l-indigo-600",
    ".border-l-indigo-600{border-left-color:rgba(79,70,229,1);}",
  ],
  [
    "border-l-indigo-700",
    ".border-l-indigo-700{border-left-color:rgba(67,56,202,1);}",
  ],
  [
    "border-l-indigo-800",
    ".border-l-indigo-800{border-left-color:rgba(55,48,163,1);}",
  ],
  [
    "border-l-indigo-900",
    ".border-l-indigo-900{border-left-color:rgba(49,46,129,1);}",
  ],
  [
    "border-l-violet-50",
    ".border-l-violet-50{border-left-color:rgba(245,243,255,1);}",
  ],
  [
    "border-l-violet-100",
    ".border-l-violet-100{border-left-color:rgba(237,233,254,1);}",
  ],
  [
    "border-l-violet-200",
    ".border-l-violet-200{border-left-color:rgba(221,214,254,1);}",
  ],
  [
    "border-l-violet-300",
    ".border-l-violet-300{border-left-color:rgba(196,181,253,1);}",
  ],
  [
    "border-l-violet-400",
    ".border-l-violet-400{border-left-color:rgba(167,139,250,1);}",
  ],
  [
    "border-l-violet-500",
    ".border-l-violet-500{border-left-color:rgba(139,92,246,1);}",
  ],
  [
    "border-l-violet-600",
    ".border-l-violet-600{border-left-color:rgba(124,58,237,1);}",
  ],
  [
    "border-l-violet-700",
    ".border-l-violet-700{border-left-color:rgba(109,40,217,1);}",
  ],
  [
    "border-l-violet-800",
    ".border-l-violet-800{border-left-color:rgba(91,33,182,1);}",
  ],
  [
    "border-l-violet-900",
    ".border-l-violet-900{border-left-color:rgba(76,29,149,1);}",
  ],
  [
    "border-l-purple-50",
    ".border-l-purple-50{border-left-color:rgba(250,245,255,1);}",
  ],
  [
    "border-l-purple-100",
    ".border-l-purple-100{border-left-color:rgba(243,232,255,1);}",
  ],
  [
    "border-l-purple-200",
    ".border-l-purple-200{border-left-color:rgba(233,213,255,1);}",
  ],
  [
    "border-l-purple-300",
    ".border-l-purple-300{border-left-color:rgba(216,180,254,1);}",
  ],
  [
    "border-l-purple-400",
    ".border-l-purple-400{border-left-color:rgba(192,132,252,1);}",
  ],
  [
    "border-l-purple-500",
    ".border-l-purple-500{border-left-color:rgba(168,85,247,1);}",
  ],
  [
    "border-l-purple-600",
    ".border-l-purple-600{border-left-color:rgba(147,51,234,1);}",
  ],
  [
    "border-l-purple-700",
    ".border-l-purple-700{border-left-color:rgba(126,34,206,1);}",
  ],
  [
    "border-l-purple-800",
    ".border-l-purple-800{border-left-color:rgba(107,33,168,1);}",
  ],
  [
    "border-l-purple-900",
    ".border-l-purple-900{border-left-color:rgba(88,28,135,1);}",
  ],
  [
    "border-l-fuchsia-50",
    ".border-l-fuchsia-50{border-left-color:rgba(253,244,255,1);}",
  ],
  [
    "border-l-fuchsia-100",
    ".border-l-fuchsia-100{border-left-color:rgba(250,232,255,1);}",
  ],
  [
    "border-l-fuchsia-200",
    ".border-l-fuchsia-200{border-left-color:rgba(245,208,254,1);}",
  ],
  [
    "border-l-fuchsia-300",
    ".border-l-fuchsia-300{border-left-color:rgba(240,171,252,1);}",
  ],
  [
    "border-l-fuchsia-400",
    ".border-l-fuchsia-400{border-left-color:rgba(232,121,249,1);}",
  ],
  [
    "border-l-fuchsia-500",
    ".border-l-fuchsia-500{border-left-color:rgba(217,70,239,1);}",
  ],
  [
    "border-l-fuchsia-600",
    ".border-l-fuchsia-600{border-left-color:rgba(192,38,211,1);}",
  ],
  [
    "border-l-fuchsia-700",
    ".border-l-fuchsia-700{border-left-color:rgba(162,28,175,1);}",
  ],
  [
    "border-l-fuchsia-800",
    ".border-l-fuchsia-800{border-left-color:rgba(134,25,143,1);}",
  ],
  [
    "border-l-fuchsia-900",
    ".border-l-fuchsia-900{border-left-color:rgba(112,26,117,1);}",
  ],
  [
    "border-l-pink-50",
    ".border-l-pink-50{border-left-color:rgba(253,242,248,1);}",
  ],
  [
    "border-l-pink-100",
    ".border-l-pink-100{border-left-color:rgba(252,231,243,1);}",
  ],
  [
    "border-l-pink-200",
    ".border-l-pink-200{border-left-color:rgba(251,207,232,1);}",
  ],
  [
    "border-l-pink-300",
    ".border-l-pink-300{border-left-color:rgba(249,168,212,1);}",
  ],
  [
    "border-l-pink-400",
    ".border-l-pink-400{border-left-color:rgba(244,114,182,1);}",
  ],
  [
    "border-l-pink-500",
    ".border-l-pink-500{border-left-color:rgba(236,72,153,1);}",
  ],
  [
    "border-l-pink-600",
    ".border-l-pink-600{border-left-color:rgba(219,39,119,1);}",
  ],
  [
    "border-l-pink-700",
    ".border-l-pink-700{border-left-color:rgba(190,24,93,1);}",
  ],
  [
    "border-l-pink-800",
    ".border-l-pink-800{border-left-color:rgba(157,23,77,1);}",
  ],
  [
    "border-l-pink-900",
    ".border-l-pink-900{border-left-color:rgba(131,24,67,1);}",
  ],
  [
    "border-l-rose-50",
    ".border-l-rose-50{border-left-color:rgba(255,241,242,1);}",
  ],
  [
    "border-l-rose-100",
    ".border-l-rose-100{border-left-color:rgba(255,228,230,1);}",
  ],
  [
    "border-l-rose-200",
    ".border-l-rose-200{border-left-color:rgba(254,205,211,1);}",
  ],
  [
    "border-l-rose-300",
    ".border-l-rose-300{border-left-color:rgba(253,164,175,1);}",
  ],
  [
    "border-l-rose-400",
    ".border-l-rose-400{border-left-color:rgba(251,113,133,1);}",
  ],
  [
    "border-l-rose-500",
    ".border-l-rose-500{border-left-color:rgba(244,63,94,1);}",
  ],
  [
    "border-l-rose-600",
    ".border-l-rose-600{border-left-color:rgba(225,29,72,1);}",
  ],
  [
    "border-l-rose-700",
    ".border-l-rose-700{border-left-color:rgba(190,18,60,1);}",
  ],
  [
    "border-l-rose-800",
    ".border-l-rose-800{border-left-color:rgba(159,18,57,1);}",
  ],
  [
    "border-l-rose-900",
    ".border-l-rose-900{border-left-color:rgba(136,19,55,1);}",
  ],
  [
    "border-red-100/10",
    ".border-red-100\\/10{border-color:rgba(254,226,226,0.1);}",
  ],
  [
    "border-t-red-100/10",
    ".border-t-red-100\\/10{border-top-color:rgba(254,226,226,0.1);}",
  ],
  [
    "border-l-red-100/10",
    ".border-l-red-100\\/10{border-left-color:rgba(254,226,226,0.1);}",
  ],
  [
    "border-b-red-100/10",
    ".border-b-red-100\\/10{border-bottom-color:rgba(254,226,226,0.1);}",
  ],
  [
    "border-r-red-100/10",
    ".border-r-red-100\\/10{border-right-color:rgba(254,226,226,0.1);}",
  ],
  [
    "border-x-red-100/10",
    ".border-x-red-100\\/10{border-left-color:rgba(254,226,226,0.1);border-right-color:rgba(254,226,226,0.1);}",
  ],
  [
    "border-y-red-100/10",
    ".border-y-red-100\\/10{border-bottom-color:rgba(254,226,226,0.1);border-top-color:rgba(254,226,226,0.1);}",
  ],
  [
    "ring",
    ".ring{--map-ring-offset-shadow:var(--map-ring-inset) 0 0 0 var(--map-ring-offset-width) var(--map-ring-offset-color);--map-ring-shadow:var(--map-ring-inset) 0 0 0 calc(3px + var(--map-ring-offset-width)) var(--map-ring-color);box-shadow:var(--map-ring-offset-shadow), var(--map-ring-shadow), var(--map-shadow, 0 0 #0000);}",
  ],
  [
    "ring-0",
    ".ring-0{--map-ring-offset-shadow:var(--map-ring-inset) 0 0 0 var(--map-ring-offset-width) var(--map-ring-offset-color);--map-ring-shadow:var(--map-ring-inset) 0 0 0 calc(0px + var(--map-ring-offset-width)) var(--map-ring-color);box-shadow:var(--map-ring-offset-shadow), var(--map-ring-shadow), var(--map-shadow, 0 0 #0000);}",
  ],
  [
    "ring-1",
    ".ring-1{--map-ring-offset-shadow:var(--map-ring-inset) 0 0 0 var(--map-ring-offset-width) var(--map-ring-offset-color);--map-ring-shadow:var(--map-ring-inset) 0 0 0 calc(1px + var(--map-ring-offset-width)) var(--map-ring-color);box-shadow:var(--map-ring-offset-shadow), var(--map-ring-shadow), var(--map-shadow, 0 0 #0000);}",
  ],
  [
    "ring-2",
    ".ring-2{--map-ring-offset-shadow:var(--map-ring-inset) 0 0 0 var(--map-ring-offset-width) var(--map-ring-offset-color);--map-ring-shadow:var(--map-ring-inset) 0 0 0 calc(2px + var(--map-ring-offset-width)) var(--map-ring-color);box-shadow:var(--map-ring-offset-shadow), var(--map-ring-shadow), var(--map-shadow, 0 0 #0000);}",
  ],
  [
    "ring-4",
    ".ring-4{--map-ring-offset-shadow:var(--map-ring-inset) 0 0 0 var(--map-ring-offset-width) var(--map-ring-offset-color);--map-ring-shadow:var(--map-ring-inset) 0 0 0 calc(4px + var(--map-ring-offset-width)) var(--map-ring-color);box-shadow:var(--map-ring-offset-shadow), var(--map-ring-shadow), var(--map-shadow, 0 0 #0000);}",
  ],
  [
    "ring-8",
    ".ring-8{--map-ring-offset-shadow:var(--map-ring-inset) 0 0 0 var(--map-ring-offset-width) var(--map-ring-offset-color);--map-ring-shadow:var(--map-ring-inset) 0 0 0 calc(8px + var(--map-ring-offset-width)) var(--map-ring-color);box-shadow:var(--map-ring-offset-shadow), var(--map-ring-shadow), var(--map-shadow, 0 0 #0000);}",
  ],
  ["ring-inset", ".ring-inset{--map-ring-inset:inset;}"],
  ["ring-offset-0", ".ring-offset-0{--map-ring-offset-width:0px;}"],
  ["ring-offset-1", ".ring-offset-1{--map-ring-offset-width:1px;}"],
  ["ring-offset-2", ".ring-offset-2{--map-ring-offset-width:2px;}"],
  ["ring-offset-4", ".ring-offset-4{--map-ring-offset-width:4px;}"],
  ["ring-offset-8", ".ring-offset-8{--map-ring-offset-width:8px;}"],
  ["opacity-0", ".opacity-0{opacity:0;}"],
  ["opacity-5", ".opacity-5{opacity:0.05;}"],
  ["opacity-10", ".opacity-10{opacity:0.1;}"],
  ["opacity-20", ".opacity-20{opacity:0.2;}"],
  ["opacity-25", ".opacity-25{opacity:0.25;}"],
  ["opacity-30", ".opacity-30{opacity:0.3;}"],
  ["opacity-40", ".opacity-40{opacity:0.4;}"],
  ["opacity-50", ".opacity-50{opacity:0.5;}"],
  ["opacity-60", ".opacity-60{opacity:0.6;}"],
  ["opacity-70", ".opacity-70{opacity:0.7;}"],
  ["opacity-75", ".opacity-75{opacity:0.75;}"],
  ["opacity-80", ".opacity-80{opacity:0.8;}"],
  ["opacity-90", ".opacity-90{opacity:0.9;}"],
  ["opacity-95", ".opacity-95{opacity:0.95;}"],
  ["opacity-100", ".opacity-100{opacity:1;}"],
  ["mix-blend-normal", ".mix-blend-normal{mix-blend-mode:normal;}"],
  ["mix-blend-multiply", ".mix-blend-multiply{mix-blend-mode:multiply;}"],
  ["mix-blend-screen", ".mix-blend-screen{mix-blend-mode:screen;}"],
  ["mix-blend-overlay", ".mix-blend-overlay{mix-blend-mode:overlay;}"],
  ["mix-blend-darken", ".mix-blend-darken{mix-blend-mode:darken;}"],
  ["mix-blend-lighten", ".mix-blend-lighten{mix-blend-mode:lighten;}"],
  ["mix-blend-difference", ".mix-blend-difference{mix-blend-mode:difference;}"],
  ["mix-blend-exclusion", ".mix-blend-exclusion{mix-blend-mode:exclusion;}"],
  ["mix-blend-hue", ".mix-blend-hue{mix-blend-mode:hue;}"],
  ["mix-blend-saturation", ".mix-blend-saturation{mix-blend-mode:saturation;}"],
  ["mix-blend-color", ".mix-blend-color{mix-blend-mode:color;}"],
  ["mix-blend-luminosity", ".mix-blend-luminosity{mix-blend-mode:luminosity;}"],
  [
    "mix-blend-color-dodge",
    ".mix-blend-color-dodge{mix-blend-mode:color-dodge;}",
  ],
  ["mix-blend-color-burn", ".mix-blend-color-burn{mix-blend-mode:color-burn;}"],
  ["mix-blend-hard-light", ".mix-blend-hard-light{mix-blend-mode:hard-light;}"],
  ["mix-blend-soft-light", ".mix-blend-soft-light{mix-blend-mode:soft-light;}"],
  ["bg-blend-normal", ".bg-blend-normal{background-blend-mode:normal;}"],
  ["bg-blend-multiply", ".bg-blend-multiply{background-blend-mode:multiply;}"],
  ["bg-blend-screen", ".bg-blend-screen{background-blend-mode:screen;}"],
  ["bg-blend-overlay", ".bg-blend-overlay{background-blend-mode:overlay;}"],
  ["bg-blend-darken", ".bg-blend-darken{background-blend-mode:darken;}"],
  [
    "bg-blend-difference",
    ".bg-blend-difference{background-blend-mode:difference;}",
  ],
  [
    "bg-blend-exclusion",
    ".bg-blend-exclusion{background-blend-mode:exclusion;}",
  ],
  ["bg-blend-hue", ".bg-blend-hue{background-blend-mode:hue;}"],
  [
    "bg-blend-saturation",
    ".bg-blend-saturation{background-blend-mode:saturation;}",
  ],
  ["bg-blend-color", ".bg-blend-color{background-blend-mode:color;}"],
  [
    "bg-blend-luminosity",
    ".bg-blend-luminosity{background-blend-mode:luminosity;}",
  ],
  ["bg-blend-lighten", ".bg-blend-lighten{background-blend-mode:lighten;}"],
  [
    "bg-blend-color-dodge",
    ".bg-blend-color-dodge{background-blend-mode:color-dodge;}",
  ],
  [
    "bg-blend-color-burn",
    ".bg-blend-color-burn{background-blend-mode:color-burn;}",
  ],
  [
    "bg-blend-hard-light",
    ".bg-blend-hard-light{background-blend-mode:hard-light;}",
  ],
  [
    "bg-blend-soft-light",
    ".bg-blend-soft-light{background-blend-mode:soft-light;}",
  ],
  ["basis-0", ".basis-0{flex-basis:0px;}"],
  ["basis-1", ".basis-1{flex-basis:0.25rem;}"],
  ["basis-2", ".basis-2{flex-basis:0.5rem;}"],
  ["basis-3", ".basis-3{flex-basis:0.75rem;}"],
  ["basis-4", ".basis-4{flex-basis:1rem;}"],
  ["basis-5", ".basis-5{flex-basis:1.25rem;}"],
  ["basis-6", ".basis-6{flex-basis:1.5rem;}"],
  ["basis-7", ".basis-7{flex-basis:1.75rem;}"],
  ["basis-8", ".basis-8{flex-basis:2rem;}"],
  ["basis-9", ".basis-9{flex-basis:2.25rem;}"],
  ["basis-10", ".basis-10{flex-basis:2.5rem;}"],
  ["basis-11", ".basis-11{flex-basis:2.75rem;}"],
  ["basis-12", ".basis-12{flex-basis:3rem;}"],
  ["basis-14", ".basis-14{flex-basis:3.5rem;}"],
  ["basis-16", ".basis-16{flex-basis:4rem;}"],
  ["basis-20", ".basis-20{flex-basis:5rem;}"],
  ["basis-24", ".basis-24{flex-basis:6rem;}"],
  ["basis-28", ".basis-28{flex-basis:7rem;}"],
  ["basis-32", ".basis-32{flex-basis:8rem;}"],
  ["basis-36", ".basis-36{flex-basis:9rem;}"],
  ["basis-40", ".basis-40{flex-basis:10rem;}"],
  ["basis-44", ".basis-44{flex-basis:11rem;}"],
  ["basis-48", ".basis-48{flex-basis:12rem;}"],
  ["basis-52", ".basis-52{flex-basis:13rem;}"],
  ["basis-56", ".basis-56{flex-basis:14rem;}"],
  ["basis-60", ".basis-60{flex-basis:15rem;}"],
  ["basis-64", ".basis-64{flex-basis:16rem;}"],
  ["basis-72", ".basis-72{flex-basis:18rem;}"],
  ["basis-80", ".basis-80{flex-basis:20rem;}"],
  ["basis-96", ".basis-96{flex-basis:24rem;}"],
  ["basis-auto", ".basis-auto{flex-basis:auto;}"],
  ["basis-px", ".basis-px{flex-basis:1px;}"],
  ["basis-full", ".basis-full{flex-basis:100%;}"],
  ["basis-0.5", ".basis-0\\.5{flex-basis:0.125rem;}"],
  ["basis-1.5", ".basis-1\\.5{flex-basis:0.375rem;}"],
  ["basis-2.5", ".basis-2\\.5{flex-basis:0.625rem;}"],
  ["basis-3.5", ".basis-3\\.5{flex-basis:0.875rem;}"],
  ["basis-1/2", ".basis-1\\/2{flex-basis:50%;}"],
  ["basis-1/3", ".basis-1\\/3{flex-basis:33.333333%;}"],
  ["basis-2/3", ".basis-2\\/3{flex-basis:66.666667%;}"],
  ["basis-1/4", ".basis-1\\/4{flex-basis:25%;}"],
  ["basis-2/4", ".basis-2\\/4{flex-basis:50%;}"],
  ["basis-3/4", ".basis-3\\/4{flex-basis:75%;}"],
  ["basis-1/5", ".basis-1\\/5{flex-basis:20%;}"],
  ["basis-2/5", ".basis-2\\/5{flex-basis:40%;}"],
  ["basis-3/5", ".basis-3\\/5{flex-basis:60%;}"],
  ["basis-4/5", ".basis-4\\/5{flex-basis:80%;}"],
  ["basis-1/6", ".basis-1\\/6{flex-basis:16.666667%;}"],
  ["basis-2/6", ".basis-2\\/6{flex-basis:33.333333%;}"],
  ["basis-3/6", ".basis-3\\/6{flex-basis:50%;}"],
  ["basis-4/6", ".basis-4\\/6{flex-basis:66.666667%;}"],
  ["basis-5/6", ".basis-5\\/6{flex-basis:83.333333%;}"],
  ["basis-1/12", ".basis-1\\/12{flex-basis:8.333333%;}"],
  ["basis-2/12", ".basis-2\\/12{flex-basis:16.666667%;}"],
  ["basis-3/12", ".basis-3\\/12{flex-basis:25%;}"],
  ["basis-4/12", ".basis-4\\/12{flex-basis:33.333333%;}"],
  ["basis-5/12", ".basis-5\\/12{flex-basis:41.666667%;}"],
  ["basis-6/12", ".basis-6\\/12{flex-basis:50%;}"],
  ["basis-7/12", ".basis-7\\/12{flex-basis:58.333333%;}"],
  ["basis-8/12", ".basis-8\\/12{flex-basis:66.666667%;}"],
  ["basis-9/12", ".basis-9\\/12{flex-basis:75%;}"],
  ["basis-10/12", ".basis-10\\/12{flex-basis:83.333333%;}"],
  ["basis-11/12", ".basis-11\\/12{flex-basis:91.666667%;}"],
  [
    "basis-[14.2857143%]",
    ".basis-\\[14\\.2857143\\%\\]{flex-basis:14.2857143%;}",
  ],
  ["flex-row", ".flex-row{flex-direction:row;}"],
  ["flex-col", ".flex-col{flex-direction:column;}"],
  ["flex-row-reverse", ".flex-row-reverse{flex-direction:row-reverse;}"],
  ["flex-col-reverse", ".flex-col-reverse{flex-direction:column-reverse;}"],
  ["flex-wrap", ".flex-wrap{flex-wrap:wrap;}"],
  ["flex-nowrap", ".flex-nowrap{flex-wrap:nowrap;}"],
  ["flex-wrap-reverse", ".flex-wrap-reverse{flex-wrap:wrap-reverse;}"],
  ["grow", ".grow{flex-grow:1;}"],
  ["grow-0", ".grow-0{flex-grow:0;}"],
  ["grow-2", ".grow-2{flex-grow:2;}"],
  ["shrink", ".shrink{flex-shrink:1;}"],
  ["shrink-0", ".shrink-0{flex-shrink:0;}"],
  ["shrink-2", ".shrink-2{flex-shrink:2;}"],
  ["order-1", ".order-1{order:1;}"],
  ["order-2", ".order-2{order:2;}"],
  ["order-3", ".order-3{order:3;}"],
  ["order-4", ".order-4{order:4;}"],
  ["order-5", ".order-5{order:5;}"],
  ["order-6", ".order-6{order:6;}"],
  ["order-7", ".order-7{order:7;}"],
  ["order-8", ".order-8{order:8;}"],
  ["order-9", ".order-9{order:9;}"],
  ["order-10", ".order-10{order:10;}"],
  ["order-11", ".order-11{order:11;}"],
  ["order-12", ".order-12{order:12;}"],
  ["order-first", ".order-first{order:-9999;}"],
  ["order-last", ".order-last{order:9999;}"],
  ["order-none", ".order-none{order:0;}"],
  [
    "grid-cols-1",
    ".grid-cols-1{grid-template-columns:repeat(1, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-2",
    ".grid-cols-2{grid-template-columns:repeat(2, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-3",
    ".grid-cols-3{grid-template-columns:repeat(3, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-4",
    ".grid-cols-4{grid-template-columns:repeat(4, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-5",
    ".grid-cols-5{grid-template-columns:repeat(5, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-6",
    ".grid-cols-6{grid-template-columns:repeat(6, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-7",
    ".grid-cols-7{grid-template-columns:repeat(7, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-8",
    ".grid-cols-8{grid-template-columns:repeat(8, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-9",
    ".grid-cols-9{grid-template-columns:repeat(9, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-10",
    ".grid-cols-10{grid-template-columns:repeat(10, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-11",
    ".grid-cols-11{grid-template-columns:repeat(11, minmax(0, 1fr));}",
  ],
  [
    "grid-cols-12",
    ".grid-cols-12{grid-template-columns:repeat(12, minmax(0, 1fr));}",
  ],
  ["grid-cols-none", ".grid-cols-none{grid-template-columns:none;}"],
  [
    "grid-rows-1",
    ".grid-rows-1{grid-template-rows:repeat(1, minmax(0, 1fr));}",
  ],
  [
    "grid-rows-2",
    ".grid-rows-2{grid-template-rows:repeat(2, minmax(0, 1fr));}",
  ],
  [
    "grid-rows-3",
    ".grid-rows-3{grid-template-rows:repeat(3, minmax(0, 1fr));}",
  ],
  [
    "grid-rows-4",
    ".grid-rows-4{grid-template-rows:repeat(4, minmax(0, 1fr));}",
  ],
  [
    "grid-rows-5",
    ".grid-rows-5{grid-template-rows:repeat(5, minmax(0, 1fr));}",
  ],
  [
    "grid-rows-6",
    ".grid-rows-6{grid-template-rows:repeat(6, minmax(0, 1fr));}",
  ],
  ["grid-rows-none", ".grid-rows-none{grid-template-rows:none;}"],
  ["col-auto", ".col-auto{grid-column:auto;}"],
  ["col-span-1", ".col-span-1{grid-column:span 1/span 1;}"],
  ["col-span-2", ".col-span-2{grid-column:span 2/span 2;}"],
  ["col-span-3", ".col-span-3{grid-column:span 3/span 3;}"],
  ["col-span-4", ".col-span-4{grid-column:span 4/span 4;}"],
  ["col-span-5", ".col-span-5{grid-column:span 5/span 5;}"],
  ["col-span-6", ".col-span-6{grid-column:span 6/span 6;}"],
  ["col-span-7", ".col-span-7{grid-column:span 7/span 7;}"],
  ["col-span-8", ".col-span-8{grid-column:span 8/span 8;}"],
  ["col-span-9", ".col-span-9{grid-column:span 9/span 9;}"],
  ["col-span-10", ".col-span-10{grid-column:span 10/span 10;}"],
  ["col-span-11", ".col-span-11{grid-column:span 11/span 11;}"],
  ["col-span-12", ".col-span-12{grid-column:span 12/span 12;}"],
  ["col-span-full", ".col-span-full{grid-column:1/-1;}"],
  ["col-start-1", ".col-start-1{grid-column-start:1;}"],
  ["col-start-2", ".col-start-2{grid-column-start:2;}"],
  ["col-start-3", ".col-start-3{grid-column-start:3;}"],
  ["col-start-4", ".col-start-4{grid-column-start:4;}"],
  ["col-start-5", ".col-start-5{grid-column-start:5;}"],
  ["col-start-6", ".col-start-6{grid-column-start:6;}"],
  ["col-start-7", ".col-start-7{grid-column-start:7;}"],
  ["col-start-8", ".col-start-8{grid-column-start:8;}"],
  ["col-start-9", ".col-start-9{grid-column-start:9;}"],
  ["col-start-10", ".col-start-10{grid-column-start:10;}"],
  ["col-start-11", ".col-start-11{grid-column-start:11;}"],
  ["col-start-12", ".col-start-12{grid-column-start:12;}"],
  ["col-start-13", ".col-start-13{grid-column-start:13;}"],
  ["col-start-auto", ".col-start-auto{grid-column-start:auto;}"],
  ["col-end-1", ".col-end-1{grid-column-end:1;}"],
  ["col-end-2", ".col-end-2{grid-column-end:2;}"],
  ["col-end-3", ".col-end-3{grid-column-end:3;}"],
  ["col-end-4", ".col-end-4{grid-column-end:4;}"],
  ["col-end-5", ".col-end-5{grid-column-end:5;}"],
  ["col-end-6", ".col-end-6{grid-column-end:6;}"],
  ["col-end-7", ".col-end-7{grid-column-end:7;}"],
  ["col-end-8", ".col-end-8{grid-column-end:8;}"],
  ["col-end-9", ".col-end-9{grid-column-end:9;}"],
  ["col-end-10", ".col-end-10{grid-column-end:10;}"],
  ["col-end-11", ".col-end-11{grid-column-end:11;}"],
  ["col-end-12", ".col-end-12{grid-column-end:12;}"],
  ["col-end-13", ".col-end-13{grid-column-end:13;}"],
  ["col-end-auto", ".col-end-auto{grid-column-end:auto;}"],
  ["gap-0", ".gap-0{gap:0px;}"],
  ["gap-px", ".gap-px{gap:1px;}"],
  ["gap-1", ".gap-1{gap:0.25rem;}"],
  ["gap-2", ".gap-2{gap:0.5rem;}"],
  ["gap-3", ".gap-3{gap:0.75rem;}"],
  ["gap-4", ".gap-4{gap:1rem;}"],
  ["gap-5", ".gap-5{gap:1.25rem;}"],
  ["gap-6", ".gap-6{gap:1.5rem;}"],
  ["gap-7", ".gap-7{gap:1.75rem;}"],
  ["gap-8", ".gap-8{gap:2rem;}"],
  ["gap-9", ".gap-9{gap:2.25rem;}"],
  ["gap-10", ".gap-10{gap:2.5rem;}"],
  ["gap-11", ".gap-11{gap:2.75rem;}"],
  ["gap-12", ".gap-12{gap:3rem;}"],
  ["gap-14", ".gap-14{gap:3.5rem;}"],
  ["gap-16", ".gap-16{gap:4rem;}"],
  ["gap-20", ".gap-20{gap:5rem;}"],
  ["gap-24", ".gap-24{gap:6rem;}"],
  ["gap-28", ".gap-28{gap:7rem;}"],
  ["gap-32", ".gap-32{gap:8rem;}"],
  ["gap-36", ".gap-36{gap:9rem;}"],
  ["gap-40", ".gap-40{gap:10rem;}"],
  ["gap-44", ".gap-44{gap:11rem;}"],
  ["gap-48", ".gap-48{gap:12rem;}"],
  ["gap-52", ".gap-52{gap:13rem;}"],
  ["gap-56", ".gap-56{gap:14rem;}"],
  ["gap-60", ".gap-60{gap:15rem;}"],
  ["gap-64", ".gap-64{gap:16rem;}"],
  ["gap-72", ".gap-72{gap:18rem;}"],
  ["gap-80", ".gap-80{gap:20rem;}"],
  ["gap-96", ".gap-96{gap:24rem;}"],
  ["gap-0.5", ".gap-0\\.5{gap:0.125rem;}"],
  ["gap-1.5", ".gap-1\\.5{gap:0.375rem;}"],
  ["gap-2.5", ".gap-2\\.5{gap:0.625rem;}"],
  ["gap-3.5", ".gap-3\\.5{gap:0.875rem;}"],
  ["gap-x-0.5", ".gap-x-0\\.5{column-gap:0.125rem;}"],
  ["gap-y-0.5", ".gap-y-0\\.5{row-gap:0.125rem;}"],
  ["gap-x-1.5", ".gap-x-1\\.5{column-gap:0.375rem;}"],
  ["gap-y-1.5", ".gap-y-1\\.5{row-gap:0.375rem;}"],
  ["gap-x-2.5", ".gap-x-2\\.5{column-gap:0.625rem;}"],
  ["gap-y-2.5", ".gap-y-2\\.5{row-gap:0.625rem;}"],
  ["gap-x-3.5", ".gap-x-3\\.5{column-gap:0.875rem;}"],
  ["gap-y-3.5", ".gap-y-3\\.5{row-gap:0.875rem;}"],
  ["gap-x-0", ".gap-x-0{column-gap:0px;}"],
  ["gap-y-0", ".gap-y-0{row-gap:0px;}"],
  ["gap-x-px", ".gap-x-px{column-gap:1px;}"],
  ["gap-y-px", ".gap-y-px{row-gap:1px;}"],
  ["gap-x-1", ".gap-x-1{column-gap:0.25rem;}"],
  ["gap-y-1", ".gap-y-1{row-gap:0.25rem;}"],
  ["gap-x-2", ".gap-x-2{column-gap:0.5rem;}"],
  ["gap-y-2", ".gap-y-2{row-gap:0.5rem;}"],
  ["gap-x-3", ".gap-x-3{column-gap:0.75rem;}"],
  ["gap-y-3", ".gap-y-3{row-gap:0.75rem;}"],
  ["gap-x-4", ".gap-x-4{column-gap:1rem;}"],
  ["gap-y-4", ".gap-y-4{row-gap:1rem;}"],
  ["gap-x-5", ".gap-x-5{column-gap:1.25rem;}"],
  ["gap-y-5", ".gap-y-5{row-gap:1.25rem;}"],
  ["gap-x-6", ".gap-x-6{column-gap:1.5rem;}"],
  ["gap-y-6", ".gap-y-6{row-gap:1.5rem;}"],
  ["gap-x-7", ".gap-x-7{column-gap:1.75rem;}"],
  ["gap-y-7", ".gap-y-7{row-gap:1.75rem;}"],
  ["gap-x-8", ".gap-x-8{column-gap:2rem;}"],
  ["gap-y-8", ".gap-y-8{row-gap:2rem;}"],
  ["gap-x-9", ".gap-x-9{column-gap:2.25rem;}"],
  ["gap-y-9", ".gap-y-9{row-gap:2.25rem;}"],
  ["gap-x-10", ".gap-x-10{column-gap:2.5rem;}"],
  ["gap-y-10", ".gap-y-10{row-gap:2.5rem;}"],
  ["gap-x-11", ".gap-x-11{column-gap:2.75rem;}"],
  ["gap-y-11", ".gap-y-11{row-gap:2.75rem;}"],
  ["gap-x-12", ".gap-x-12{column-gap:3rem;}"],
  ["gap-y-12", ".gap-y-12{row-gap:3rem;}"],
  ["gap-x-14", ".gap-x-14{column-gap:3.5rem;}"],
  ["gap-y-14", ".gap-y-14{row-gap:3.5rem;}"],
  ["gap-x-16", ".gap-x-16{column-gap:4rem;}"],
  ["gap-y-16", ".gap-y-16{row-gap:4rem;}"],
  ["gap-x-20", ".gap-x-20{column-gap:5rem;}"],
  ["gap-y-20", ".gap-y-20{row-gap:5rem;}"],
  ["gap-x-24", ".gap-x-24{column-gap:6rem;}"],
  ["gap-y-24", ".gap-y-24{row-gap:6rem;}"],
  ["gap-x-28", ".gap-x-28{column-gap:7rem;}"],
  ["gap-y-28", ".gap-y-28{row-gap:7rem;}"],
  ["gap-x-32", ".gap-x-32{column-gap:8rem;}"],
  ["gap-y-32", ".gap-y-32{row-gap:8rem;}"],
  ["gap-x-36", ".gap-x-36{column-gap:9rem;}"],
  ["gap-y-36", ".gap-y-36{row-gap:9rem;}"],
  ["gap-x-40", ".gap-x-40{column-gap:10rem;}"],
  ["gap-y-40", ".gap-y-40{row-gap:10rem;}"],
  ["gap-x-44", ".gap-x-44{column-gap:11rem;}"],
  ["gap-y-44", ".gap-y-44{row-gap:11rem;}"],
  ["gap-x-48", ".gap-x-48{column-gap:12rem;}"],
  ["gap-y-48", ".gap-y-48{row-gap:12rem;}"],
  ["gap-x-52", ".gap-x-52{column-gap:13rem;}"],
  ["gap-y-52", ".gap-y-52{row-gap:13rem;}"],
  ["gap-x-56", ".gap-x-56{column-gap:14rem;}"],
  ["gap-y-56", ".gap-y-56{row-gap:14rem;}"],
  ["gap-x-60", ".gap-x-60{column-gap:15rem;}"],
  ["gap-y-60", ".gap-y-60{row-gap:15rem;}"],
  ["gap-x-64", ".gap-x-64{column-gap:16rem;}"],
  ["gap-y-64", ".gap-y-64{row-gap:16rem;}"],
  ["gap-x-72", ".gap-x-72{column-gap:18rem;}"],
  ["gap-y-72", ".gap-y-72{row-gap:18rem;}"],
  ["gap-x-80", ".gap-x-80{column-gap:20rem;}"],
  ["gap-y-80", ".gap-y-80{row-gap:20rem;}"],
  ["gap-x-96", ".gap-x-96{column-gap:24rem;}"],
  ["gap-y-96", ".gap-y-96{row-gap:24rem;}"],
  ["grid-flow-row", ".grid-flow-row{grid-auto-flow:row;}"],
  ["grid-flow-col", ".grid-flow-col{grid-auto-flow:column;}"],
  ["grid-flow-row-dense", ".grid-flow-row-dense{grid-auto-flow:row dense;}"],
  ["grid-flow-col-dense", ".grid-flow-col-dense{grid-auto-flow:column dense;}"],
  ["auto-cols-auto", ".auto-cols-auto{grid-auto-columns:auto;}"],
  ["auto-cols-min", ".auto-cols-min{grid-auto-columns:min-content;}"],
  ["auto-cols-max", ".auto-cols-max{grid-auto-columns:max-content;}"],
  ["auto-cols-fr", ".auto-cols-fr{grid-auto-columns:minmax(0, 1fr);}"],
  ["auto-rows-auto", ".auto-rows-auto{grid-auto-rows:auto;}"],
  ["auto-rows-min", ".auto-rows-min{grid-auto-rows:min-content;}"],
  ["auto-rows-max", ".auto-rows-max{grid-auto-rows:max-content;}"],
  ["auto-rows-fr", ".auto-rows-fr{grid-auto-rows:minmax(0, 1fr);}"],
  ["row-auto", ".row-auto{grid-row:auto;}"],
  ["row-span-1", ".row-span-1{grid-row:span 1/span 1;}"],
  ["row-span-2", ".row-span-2{grid-row:span 2/span 2;}"],
  ["row-span-3", ".row-span-3{grid-row:span 3/span 3;}"],
  ["row-span-4", ".row-span-4{grid-row:span 4/span 4;}"],
  ["row-span-5", ".row-span-5{grid-row:span 5/span 5;}"],
  ["row-span-6", ".row-span-6{grid-row:span 6/span 6;}"],
  ["row-span-full", ".row-span-full{grid-row:1/-1;}"],
  ["row-start-1", ".row-start-1{grid-row-start:1;}"],
  ["row-start-2", ".row-start-2{grid-row-start:2;}"],
  ["row-start-3", ".row-start-3{grid-row-start:3;}"],
  ["row-start-4", ".row-start-4{grid-row-start:4;}"],
  ["row-start-5", ".row-start-5{grid-row-start:5;}"],
  ["row-start-6", ".row-start-6{grid-row-start:6;}"],
  ["row-start-7", ".row-start-7{grid-row-start:7;}"],
  ["row-start-auto", ".row-start-auto{grid-row-start:auto;}"],
  ["row-end-1", ".row-end-1{grid-row-end:1;}"],
  ["row-end-2", ".row-end-2{grid-row-end:2;}"],
  ["row-end-3", ".row-end-3{grid-row-end:3;}"],
  ["row-end-4", ".row-end-4{grid-row-end:4;}"],
  ["row-end-5", ".row-end-5{grid-row-end:5;}"],
  ["row-end-6", ".row-end-6{grid-row-end:6;}"],
  ["row-end-7", ".row-end-7{grid-row-end:7;}"],
  ["row-end-auto", ".row-end-auto{grid-row-end:auto;}"],
  [
    "divide-solid",
    ".divide-solid>:not([hidden])~:not([hidden]){border-style:solid;}",
  ],
  [
    "divide-dashed",
    ".divide-dashed>:not([hidden])~:not([hidden]){border-style:dashed;}",
  ],
  [
    "divide-dotted",
    ".divide-dotted>:not([hidden])~:not([hidden]){border-style:dotted;}",
  ],
  [
    "divide-double",
    ".divide-double>:not([hidden])~:not([hidden]){border-style:double;}",
  ],
  [
    "divide-none",
    ".divide-none>:not([hidden])~:not([hidden]){border-style:none;}",
  ],
  [
    "divide-x",
    ".divide-x>:not([hidden])~:not([hidden]){--map-divide-x-reverse:0;border-left-width:calc(1px * calc(1 - var(--map-divide-x-reverse)));border-right-width:calc(1px * var(--map-divide-x-reverse));}",
  ],
  [
    "divide-x-0",
    ".divide-x-0>:not([hidden])~:not([hidden]){--map-divide-x-reverse:0;border-left-width:calc(0px * calc(1 - var(--map-divide-x-reverse)));border-right-width:calc(0px * var(--map-divide-x-reverse));}",
  ],
  [
    "divide-x-2",
    ".divide-x-2>:not([hidden])~:not([hidden]){--map-divide-x-reverse:0;border-left-width:calc(2px * calc(1 - var(--map-divide-x-reverse)));border-right-width:calc(2px * var(--map-divide-x-reverse));}",
  ],
  [
    "divide-x-4",
    ".divide-x-4>:not([hidden])~:not([hidden]){--map-divide-x-reverse:0;border-left-width:calc(4px * calc(1 - var(--map-divide-x-reverse)));border-right-width:calc(4px * var(--map-divide-x-reverse));}",
  ],
  [
    "divide-x-8",
    ".divide-x-8>:not([hidden])~:not([hidden]){--map-divide-x-reverse:0;border-left-width:calc(8px * calc(1 - var(--map-divide-x-reverse)));border-right-width:calc(8px * var(--map-divide-x-reverse));}",
  ],
  [
    "divide-x-reverse",
    ".divide-x-reverse>:not([hidden])~:not([hidden]){--map-divide-x-reverse:1;}",
  ],
  [
    "divide-y",
    ".divide-y>:not([hidden])~:not([hidden]){--map-divide-y-reverse:0;border-bottom-width:calc(1px * var(--map-divide-y-reverse));border-top-width:calc(1px * calc(1 - var(--map-divide-y-reverse)));}",
  ],
  [
    "divide-y-0",
    ".divide-y-0>:not([hidden])~:not([hidden]){--map-divide-y-reverse:0;border-bottom-width:calc(0px * var(--map-divide-y-reverse));border-top-width:calc(0px * calc(1 - var(--map-divide-y-reverse)));}",
  ],
  [
    "divide-y-2",
    ".divide-y-2>:not([hidden])~:not([hidden]){--map-divide-y-reverse:0;border-bottom-width:calc(2px * var(--map-divide-y-reverse));border-top-width:calc(2px * calc(1 - var(--map-divide-y-reverse)));}",
  ],
  [
    "divide-y-4",
    ".divide-y-4>:not([hidden])~:not([hidden]){--map-divide-y-reverse:0;border-bottom-width:calc(4px * var(--map-divide-y-reverse));border-top-width:calc(4px * calc(1 - var(--map-divide-y-reverse)));}",
  ],
  [
    "divide-y-8",
    ".divide-y-8>:not([hidden])~:not([hidden]){--map-divide-y-reverse:0;border-bottom-width:calc(8px * var(--map-divide-y-reverse));border-top-width:calc(8px * calc(1 - var(--map-divide-y-reverse)));}",
  ],
  [
    "divide-y-reverse",
    ".divide-y-reverse>:not([hidden])~:not([hidden]){--map-divide-y-reverse:1;}",
  ],
  [
    "divide-inherit",
    ".divide-inherit>:not([hidden])~:not([hidden]){border-color:inherit;}",
  ],
  [
    "divide-red-50",
    ".divide-red-50>:not([hidden])~:not([hidden]){border-color:rgba(254,242,242,1);}",
  ],
  ["normal-nums", ".normal-nums{font-variant-numeric:normal;}"],
  ["slashed-zero", ".slashed-zero{font-variant-numeric:slashed-zero;}"],
  ["lining-nums", ".lining-nums{font-variant-numeric:lining-nums;}"],
  ["oldstyle-nums", ".oldstyle-nums{font-variant-numeric:oldstyle-nums;}"],
  [
    "proportional-nums",
    ".proportional-nums{font-variant-numeric:proportional-nums;}",
  ],
  ["tabular-nums", ".tabular-nums{font-variant-numeric:tabular-nums;}"],
  [
    "diagonal-fractions",
    ".diagonal-fractions{font-variant-numeric:diagonal-fractions;}",
  ],
  [
    "stacked-fractions",
    ".stacked-fractions{font-variant-numeric:stacked-fractions;}",
  ],
  ["ordinal", ".ordinal{font-variant-numeric:ordinal;}"],
  ["list-none", ".list-none{list-style-type:none;}"],
  ["list-disc", ".list-disc{list-style-type:disc;}"],
  ["list-decimal", ".list-decimal{list-style-type:decimal;}"],
  ["list-inside", ".list-inside{list-style-position:inside;}"],
  ["list-outside", ".list-outside{list-style-position:outside;}"],
  ["decoration-solid", ".decoration-solid{text-decoration-style:solid;}"],
  ["decoration-double", ".decoration-double{text-decoration-style:double;}"],
  ["decoration-dotted", ".decoration-dotted{text-decoration-style:dotted;}"],
  ["decoration-dashed", ".decoration-dashed{text-decoration-style:dashed;}"],
  ["decoration-wavy", ".decoration-wavy{text-decoration-style:wavy;}"],
  [
    "decoration-from-font",
    ".decoration-from-font{text-decoration-thickness:from-font;}",
  ],
  ["decoration-auto", ".decoration-auto{text-decoration-thickness:auto;}"],
  ["decoration-0", ".decoration-0{text-decoration-thickness:0px;}"],
  ["decoration-1", ".decoration-1{text-decoration-thickness:1px;}"],
  ["decoration-2", ".decoration-2{text-decoration-thickness:2px;}"],
  ["decoration-4", ".decoration-4{text-decoration-thickness:4px;}"],
  ["decoration-8", ".decoration-8{text-decoration-thickness:8px;}"],
  [
    "underline-offset-auto",
    ".underline-offset-auto{text-underline-offset:auto;}",
  ],
  ["underline-offset-0", ".underline-offset-0{text-underline-offset:0px;}"],
  ["underline-offset-1", ".underline-offset-1{text-underline-offset:1px;}"],
  ["underline-offset-2", ".underline-offset-2{text-underline-offset:2px;}"],
  ["underline-offset-4", ".underline-offset-4{text-underline-offset:4px;}"],
  ["underline-offset-8", ".underline-offset-8{text-underline-offset:8px;}"],
  ["uppercase", ".uppercase{text-transform:uppercase;}"],
  ["lowercase", ".lowercase{text-transform:lowercase;}"],
  ["capitalize", ".capitalize{text-transform:capitalize;}"],
  ["normal-case", ".normal-case{text-transform:none;}"],
  [
    "truncate",
    ".truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
  ],
  ["text-ellipsis", ".text-ellipsis{text-overflow:ellipsis;}"],
  ["text-clip", ".text-clip{text-overflow:clip;}"],
  ["indent-0", ".indent-0{text-indent:0px;}"],
  ["indent-px", ".indent-px{text-indent:1px;}"],
  ["indent-1", ".indent-1{text-indent:0.25rem;}"],
  ["indent-2", ".indent-2{text-indent:0.5rem;}"],
  ["indent-3", ".indent-3{text-indent:0.75rem;}"],
  ["indent-4", ".indent-4{text-indent:1rem;}"],
  ["indent-5", ".indent-5{text-indent:1.25rem;}"],
  ["indent-6", ".indent-6{text-indent:1.5rem;}"],
  ["indent-7", ".indent-7{text-indent:1.75rem;}"],
  ["indent-8", ".indent-8{text-indent:2rem;}"],
  ["indent-9", ".indent-9{text-indent:2.25rem;}"],
  ["indent-10", ".indent-10{text-indent:2.5rem;}"],
  ["indent-11", ".indent-11{text-indent:2.75rem;}"],
  ["indent-12", ".indent-12{text-indent:3rem;}"],
  ["indent-14", ".indent-14{text-indent:3.5rem;}"],
  ["indent-16", ".indent-16{text-indent:4rem;}"],
  ["indent-20", ".indent-20{text-indent:5rem;}"],
  ["indent-24", ".indent-24{text-indent:6rem;}"],
  ["indent-28", ".indent-28{text-indent:7rem;}"],
  ["indent-32", ".indent-32{text-indent:8rem;}"],
  ["indent-36", ".indent-36{text-indent:9rem;}"],
  ["indent-40", ".indent-40{text-indent:10rem;}"],
  ["indent-44", ".indent-44{text-indent:11rem;}"],
  ["indent-48", ".indent-48{text-indent:12rem;}"],
  ["indent-52", ".indent-52{text-indent:13rem;}"],
  ["indent-56", ".indent-56{text-indent:14rem;}"],
  ["indent-60", ".indent-60{text-indent:15rem;}"],
  ["indent-64", ".indent-64{text-indent:16rem;}"],
  ["indent-72", ".indent-72{text-indent:18rem;}"],
  ["indent-80", ".indent-80{text-indent:20rem;}"],
  ["indent-96", ".indent-96{text-indent:24rem;}"],
  ["indent-0.5", ".indent-0\\.5{text-indent:0.125rem;}"],
  ["indent-1.5", ".indent-1\\.5{text-indent:0.375rem;}"],
  ["indent-2.5", ".indent-2\\.5{text-indent:0.625rem;}"],
  ["indent-3.5", ".indent-3\\.5{text-indent:0.875rem;}"],
  ["bg-fixed", ".bg-fixed{background-attachment:fixed;}"],
  ["bg-local", ".bg-local{background-attachment:local;}"],
  ["bg-scroll", ".bg-scroll{background-attachment:scroll;}"],
  ["bg-clip-border", ".bg-clip-border{background-clip:border-box;}"],
  ["bg-clip-padding", ".bg-clip-padding{background-clip:padding-box;}"],
  ["bg-clip-content", ".bg-clip-content{background-clip:content-box;}"],
  ["bg-clip-text", ".bg-clip-text{background-clip:text;}"],
  ["bg-origin-border", ".bg-origin-border{background-origin:border-box;}"],
  ["bg-origin-padding", ".bg-origin-padding{background-origin:padding-box;}"],
  ["bg-origin-content", ".bg-origin-content{background-origin:content-box;}"],
  ["bg-bottom", ".bg-bottom{background-position:bottom;}"],
  ["bg-center", ".bg-center{background-position:center;}"],
  ["bg-left", ".bg-left{background-position:left;}"],
  ["bg-right", ".bg-right{background-position:right;}"],
  ["bg-top", ".bg-top{background-position:top;}"],
  ["bg-left-bottom", ".bg-left-bottom{background-position:left bottom;}"],
  ["bg-left-top", ".bg-left-top{background-position:left top;}"],
  ["bg-right-bottom", ".bg-right-bottom{background-position:right bottom;}"],
  ["bg-right-top", ".bg-right-top{background-position:right top;}"],
  ["bg-repeat", ".bg-repeat{background-repeat:repeat;}"],
  ["bg-no-repeat", ".bg-no-repeat{background-repeat:no-repeat;}"],
  ["bg-repeat-x", ".bg-repeat-x{background-repeat:repeat-x;}"],
  ["bg-repeat-y", ".bg-repeat-y{background-repeat:repeat-y;}"],
  ["bg-repeat-round", ".bg-repeat-round{background-repeat:round;}"],
  ["bg-repeat-space", ".bg-repeat-space{background-repeat:space;}"],
  ["bg-auto", ".bg-auto{background-size:auto;}"],
  ["bg-cover", ".bg-cover{background-size:cover;}"],
  ["bg-contain", ".bg-contain{background-size:contain;}"],
  ["bg-none", ".bg-none{background-image:none;}"],
  [
    "bg-gradient-to-t",
    ".bg-gradient-to-t{background-image:linear-gradient(to top, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-tr",
    ".bg-gradient-to-tr{background-image:linear-gradient(to top right, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-r",
    ".bg-gradient-to-r{background-image:linear-gradient(to right, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-br",
    ".bg-gradient-to-br{background-image:linear-gradient(to bottom right, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-b",
    ".bg-gradient-to-b{background-image:linear-gradient(to bottom, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-bl",
    ".bg-gradient-to-bl{background-image:linear-gradient(to bottom left, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-l",
    ".bg-gradient-to-l{background-image:linear-gradient(to left, var(--map-gradient-stops));}",
  ],
  [
    "bg-gradient-to-tl",
    ".bg-gradient-to-tl{background-image:linear-gradient(to top left, var(--map-gradient-stops));}",
  ],
  [
    "shadow",
    ".shadow{--map-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--map-shadow-colored:0 1px 3px 0 var(--map-shadow-color), 0 1px 2px -1px var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow, 0 0 #0000), var(--map-ring-shadow, 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-sm",
    ".shadow-sm{--map-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05);--map-shadow-colored:0 1px 2px 0 var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-md",
    ".shadow-md{--map-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--map-shadow-colored:0 4px 6px -1px var(--map-shadow-color), 0 2px 4px -2px var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-lg",
    ".shadow-lg{--map-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--map-shadow-colored:0 10px 15px -3px var(--map-shadow-color), 0 4px 6px -4px var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-xl",
    ".shadow-xl{--map-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--map-shadow-colored:0 20px 25px -5px var(--map-shadow-color), 0 8px 10px -6px var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-2xl",
    ".shadow-2xl{--map-shadow:0 25px 50px -12px rgb(0 0 0 / 0.25);--map-shadow-colored:0 25px 50px -12px var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-inner",
    ".shadow-inner{--map-shadow:inset 0 2px 4px 0 rgb(0 0 0 / 0.05);--map-shadow-colored:inset 0 2px 4px 0 var(--map-shadow-color);box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "shadow-none",
    ".shadow-none{--map-shadow:0 0 #0000;--map-shadow-colored:0 0 #0000;box-shadow:var(--map-ring-offset-shadow , 0 0 #0000), var(--map-ring-shadow , 0 0 #0000), var(--map-shadow);}",
  ],
  [
    "blur",
    ".blur{--map-blur:blur(8px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-none",
    ".blur-none{--map-blur:blur(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-sm",
    ".blur-sm{--map-blur:blur(4px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-md",
    ".blur-md{--map-blur:blur(12px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-lg",
    ".blur-lg{--map-blur:blur(16px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-xl",
    ".blur-xl{--map-blur:blur(24px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-2xl",
    ".blur-2xl{--map-blur:blur(40px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "blur-3xl",
    ".blur-3xl{--map-blur:blur(64px);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-0",
    ".brightness-0{--map-brightness:brightness(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-50",
    ".brightness-50{--map-brightness:brightness(.5);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-75",
    ".brightness-75{--map-brightness:brightness(.75);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-90",
    ".brightness-90{--map-brightness:brightness(.9);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-100",
    ".brightness-100{--map-brightness:brightness(1);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-105",
    ".brightness-105{--map-brightness:brightness(1.05);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-105",
    ".brightness-105{--map-brightness:brightness(1.05);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-110",
    ".brightness-110{--map-brightness:brightness(1.1);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-125",
    ".brightness-125{--map-brightness:brightness(1.25);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-150",
    ".brightness-150{--map-brightness:brightness(1.5);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "brightness-200",
    ".brightness-200{--map-brightness:brightness(2);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-0",
    ".contrast-0{--map-contrast:contrast(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-50",
    ".contrast-50{--map-contrast:contrast(.5);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-75",
    ".contrast-75{--map-contrast:contrast(.75);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-100",
    ".contrast-100{--map-contrast:contrast(1);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-125",
    ".contrast-125{--map-contrast:contrast(1.25);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-150",
    ".contrast-150{--map-contrast:contrast(1.5);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "contrast-200",
    ".contrast-200{--map-contrast:contrast(2);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow",
    ".drop-shadow{--map-drop-shadow:drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow-sm",
    ".drop-shadow-sm{--map-drop-shadow:drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow-md",
    ".drop-shadow-md{--map-drop-shadow:drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow-lg",
    ".drop-shadow-lg{--map-drop-shadow:drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow-xl",
    ".drop-shadow-xl{--map-drop-shadow:drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow-2xl",
    ".drop-shadow-2xl{--map-drop-shadow:drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "drop-shadow-none",
    ".drop-shadow-none{--map-drop-shadow:drop-shadow(0 0 #0000);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "grayscale",
    ".grayscale{--map-grayscale:grayscale(100%);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "grayscale-0",
    ".grayscale-0{--map-grayscale:grayscale(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "hue-rotate-0",
    ".hue-rotate-0{--map-hue-rotate:hue-rotate(0deg);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "hue-rotate-15",
    ".hue-rotate-15{--map-hue-rotate:hue-rotate(15deg);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "hue-rotate-30",
    ".hue-rotate-30{--map-hue-rotate:hue-rotate(30deg);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "hue-rotate-60",
    ".hue-rotate-60{--map-hue-rotate:hue-rotate(60deg);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "hue-rotate-90",
    ".hue-rotate-90{--map-hue-rotate:hue-rotate(90deg);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "hue-rotate-180",
    ".hue-rotate-180{--map-hue-rotate:hue-rotate(180deg);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "invert-0",
    ".invert-0{--map-invert:invert(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "invert",
    ".invert{--map-invert:invert(100%);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "saturate-0",
    ".saturate-0{--map-saturate:saturate(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "saturate-50",
    ".saturate-50{--map-saturate:saturate(.5);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "saturate-100",
    ".saturate-100{--map-saturate:saturate(1);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "saturate-150",
    ".saturate-150{--map-saturate:saturate(1.5);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "saturate-200",
    ".saturate-200{--map-saturate:saturate(2);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "sepia",
    ".sepia{--map-sepia:sepia(100%);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "sepia-0",
    ".sepia-0{--map-sepia:sepia(0);filter:var(--map-blur) var(--map-brightness) var(--map-contrast) var(--map-grayscale) var(--map-hue-rotate) var(--map-invert) var(--map-saturate) var(--map-sepia) var(--map-drop-shadow);}",
  ],
  [
    "backdrop-blur-none",
    ".backdrop-blur-none{--map-backdrop-blur:blur(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur",
    ".backdrop-blur{--map-backdrop-blur:blur(8px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur-sm",
    ".backdrop-blur-sm{--map-backdrop-blur:blur(4px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur-md",
    ".backdrop-blur-md{--map-backdrop-blur:blur(12px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur-lg",
    ".backdrop-blur-lg{--map-backdrop-blur:blur(16px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur-xl",
    ".backdrop-blur-xl{--map-backdrop-blur:blur(24px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur-2xl",
    ".backdrop-blur-2xl{--map-backdrop-blur:blur(40px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-blur-3xl",
    ".backdrop-blur-3xl{--map-backdrop-blur:blur(64px);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-0",
    ".backdrop-brightness-0{--map-backdrop-brightness:brightness(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-50",
    ".backdrop-brightness-50{--map-backdrop-brightness:brightness(.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-75",
    ".backdrop-brightness-75{--map-backdrop-brightness:brightness(.75);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-90",
    ".backdrop-brightness-90{--map-backdrop-brightness:brightness(.9);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-95",
    ".backdrop-brightness-95{--map-backdrop-brightness:brightness(.95);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-100",
    ".backdrop-brightness-100{--map-backdrop-brightness:brightness(1);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-105",
    ".backdrop-brightness-105{--map-backdrop-brightness:brightness(1.05);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-110",
    ".backdrop-brightness-110{--map-backdrop-brightness:brightness(1.1);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-125",
    ".backdrop-brightness-125{--map-backdrop-brightness:brightness(1.25);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-150",
    ".backdrop-brightness-150{--map-backdrop-brightness:brightness(1.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-brightness-200",
    ".backdrop-brightness-200{--map-backdrop-brightness:brightness(2);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-0",
    ".backdrop-contrast-0{--map-backdrop-contrast:contrast(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-50",
    ".backdrop-contrast-50{--map-backdrop-contrast:contrast(.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-75",
    ".backdrop-contrast-75{--map-backdrop-contrast:contrast(.75);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-100",
    ".backdrop-contrast-100{--map-backdrop-contrast:contrast(1);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-125",
    ".backdrop-contrast-125{--map-backdrop-contrast:contrast(1.25);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-150",
    ".backdrop-contrast-150{--map-backdrop-contrast:contrast(1.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-contrast-200",
    ".backdrop-contrast-200{--map-backdrop-contrast:contrast(2);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-grayscale",
    ".backdrop-grayscale{--map-backdrop-grayscale:grayscale(100%);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-grayscale-0",
    ".backdrop-grayscale-0{--map-backdrop-grayscale:grayscale(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-hue-rotate-15",
    ".backdrop-hue-rotate-15{--map-backdrop-hue-rotate:hue-rotate(15deg);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-hue-rotate-30",
    ".backdrop-hue-rotate-30{--map-backdrop-hue-rotate:hue-rotate(30deg);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-hue-rotate-60",
    ".backdrop-hue-rotate-60{--map-backdrop-hue-rotate:hue-rotate(60deg);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-hue-rotate-90",
    ".backdrop-hue-rotate-90{--map-backdrop-hue-rotate:hue-rotate(90deg);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-hue-rotate-180",
    ".backdrop-hue-rotate-180{--map-backdrop-hue-rotate:hue-rotate(180deg);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-invert",
    ".backdrop-invert{--map-backdrop-invert:invert(100%);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-invert-0",
    ".backdrop-invert-0{--map-backdrop-invert:invert(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-0",
    ".backdrop-opacity-0{--map-backdrop-opacity:opacity(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-5",
    ".backdrop-opacity-5{--map-backdrop-opacity:opacity(.05);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-10",
    ".backdrop-opacity-10{--map-backdrop-opacity:opacity(.1);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-20",
    ".backdrop-opacity-20{--map-backdrop-opacity:opacity(.2);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-25",
    ".backdrop-opacity-25{--map-backdrop-opacity:opacity(.25);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-30",
    ".backdrop-opacity-30{--map-backdrop-opacity:opacity(.3);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-40",
    ".backdrop-opacity-40{--map-backdrop-opacity:opacity(.4);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-50",
    ".backdrop-opacity-50{--map-backdrop-opacity:opacity(.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-60",
    ".backdrop-opacity-60{--map-backdrop-opacity:opacity(.6);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-70",
    ".backdrop-opacity-70{--map-backdrop-opacity:opacity(.7);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-80",
    ".backdrop-opacity-80{--map-backdrop-opacity:opacity(.8);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-90",
    ".backdrop-opacity-90{--map-backdrop-opacity:opacity(.9);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-opacity-100",
    ".backdrop-opacity-100{--map-backdrop-opacity:opacity(1);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-saturate-0",
    ".backdrop-saturate-0{--map-backdrop-saturate:saturate(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-saturate-50",
    ".backdrop-saturate-50{--map-backdrop-saturate:saturate(.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-saturate-100",
    ".backdrop-saturate-100{--map-backdrop-saturate:saturate(1);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-saturate-150",
    ".backdrop-saturate-150{--map-backdrop-saturate:saturate(1.5);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-saturate-200",
    ".backdrop-saturate-200{--map-backdrop-saturate:saturate(2);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-sepia",
    ".backdrop-sepia{--map-backdrop-sepia:sepia(100%);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "backdrop-sepia-0",
    ".backdrop-sepia-0{--map-backdrop-sepia:sepia(0);backdrop-filter:var(--map-backdrop-blur) var(--map-backdrop-brightness) var(--map-backdrop-contrast) var(--map-backdrop-grayscale) var(--map-backdrop-hue-rotate) var(--map-backdrop-invert) var(--map-backdrop-opacity) var(--map-backdrop-saturate) var(--map-backdrop-sepia);}",
  ],
  [
    "transition",
    ".transition{transition-duration:150ms;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],
  ["transition-none", ".transition-none{transition-property:none;}"],
  [
    "transition-shadow",
    ".transition-shadow{transition-duration:150ms;transition-property:box-shadow;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],
  [
    "transition-all",
    ".transition-all{transition-duration:150ms;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],
  [
    "transition-colors",
    ".transition-colors{transition-duration:150ms;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],
  [
    "transition-opacity",
    ".transition-opacity{transition-duration:150ms;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],

  [
    "transition-transform",
    ".transition-transform{transition-duration:150ms;transition-property:transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],
  ["duration-75", ".duration-75{transition-duration:75ms;}"],
  ["duration-100", ".duration-100{transition-duration:100ms;}"],
  ["duration-150", ".duration-150{transition-duration:150ms;}"],
  ["duration-200", ".duration-200{transition-duration:200ms;}"],
  ["duration-300", ".duration-300{transition-duration:300ms;}"],
  ["duration-500", ".duration-500{transition-duration:500ms;}"],
  ["duration-700", ".duration-700{transition-duration:700ms;}"],
  ["duration-1000", ".duration-1000{transition-duration:1000ms;}"],
  ["ease-linear", ".ease-linear{transition-timing-function:linear;}"],
  [
    "ease-in",
    ".ease-in{transition-timing-function:cubic-bezier(0.4, 0, 1, 1);}",
  ],
  [
    "ease-out",
    ".ease-out{transition-timing-function:cubic-bezier(0, 0, 0.2, 1);}",
  ],
  [
    "ease-in-out",
    ".ease-in-out{transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}",
  ],
  ["delay-75", ".delay-75{transition-delay:75ms;}"],
  ["delay-100", ".delay-100{transition-delay:100ms;}"],
  ["delay-150", ".delay-150{transition-delay:150ms;}"],
  ["delay-200", ".delay-200{transition-delay:200ms;}"],
  ["delay-300", ".delay-300{transition-delay:300ms;}"],
  ["delay-500", ".delay-500{transition-delay:500ms;}"],
  ["delay-700", ".delay-700{transition-delay:700ms;}"],
  ["delay-1000", ".delay-1000{transition-delay:1000ms;}"],
  [
    "scale-0",
    ".scale-0{--map-scale-x:0;--map-scale-y:0;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-50",
    ".scale-50{--map-scale-x:.5;--map-scale-y:.5;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-75",
    ".scale-75{--map-scale-x:.75;--map-scale-y:.75;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-90",
    ".scale-90{--map-scale-x:.9;--map-scale-y:.9;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-95",
    ".scale-95{--map-scale-x:.95;--map-scale-y:.95;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-100",
    ".scale-100{--map-scale-x:1;--map-scale-y:1;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-105",
    ".scale-105{--map-scale-x:1.05;--map-scale-y:1.05;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-110",
    ".scale-110{--map-scale-x:1.1;--map-scale-y:1.1;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-125",
    ".scale-125{--map-scale-x:1.25;--map-scale-y:1.25;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-150",
    ".scale-150{--map-scale-x:1.5;--map-scale-y:1.5;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-0",
    ".scale-x-0{--map-scale-x:0;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-50",
    ".scale-x-50{--map-scale-x:.5;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-75",
    ".scale-x-75{--map-scale-x:.75;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-90",
    ".scale-x-90{--map-scale-x:.9;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-95",
    ".scale-x-95{--map-scale-x:.95;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-100",
    ".scale-x-100{--map-scale-x:1;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-105",
    ".scale-x-105{--map-scale-x:1.05;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-110",
    ".scale-x-110{--map-scale-x:1.1;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-125",
    ".scale-x-125{--map-scale-x:1.25;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-x-150",
    ".scale-x-150{--map-scale-x:1.5;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-0",
    ".scale-y-0{--map-scale-y:0;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-50",
    ".scale-y-50{--map-scale-y:.5;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-75",
    ".scale-y-75{--map-scale-y:.75;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-90",
    ".scale-y-90{--map-scale-y:.9;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-95",
    ".scale-y-95{--map-scale-y:.95;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-100",
    ".scale-y-100{--map-scale-y:1;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-105",
    ".scale-y-105{--map-scale-y:1.05;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-110",
    ".scale-y-110{--map-scale-y:1.1;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-125",
    ".scale-y-125{--map-scale-y:1.25;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "scale-y-150",
    ".scale-y-150{--map-scale-y:1.5;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-0",
    ".rotate-0{--map-rotate:0deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-1",
    ".rotate-1{--map-rotate:1deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-2",
    ".rotate-2{--map-rotate:2deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-6",
    ".rotate-6{--map-rotate:6deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-12",
    ".rotate-12{--map-rotate:12deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-45",
    ".rotate-45{--map-rotate:45deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-90",
    ".rotate-90{--map-rotate:90deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "rotate-180",
    ".rotate-180{--map-rotate:180deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-0",
    ".translate-x-0{--map-translate-x:0px;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-px",
    ".translate-x-px{--map-translate-x:1px;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-full",
    ".translate-x-full{--map-translate-x:100%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-0.5",
    ".translate-x-0\\.5{--map-translate-x:.125rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-1.5",
    ".translate-x-1\\.5{--map-translate-x:.375rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-2.5",
    ".translate-x-2\\.5{--map-translate-x:.625rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-3.5",
    ".translate-x-3\\.5{--map-translate-x:.875rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-0",
    ".translate-y-0{--map-translate-y:0px;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-px",
    ".translate-y-px{--map-translate-y:1px;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-full",
    ".translate-y-full{--map-translate-y:100%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-0.5",
    ".translate-y-0\\.5{--map-translate-y:.125rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-1.5",
    ".translate-y-1\\.5{--map-translate-y:.375rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-2.5",
    ".translate-y-2\\.5{--map-translate-y:.625rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-3.5",
    ".translate-y-3\\.5{--map-translate-y:.875rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-1",
    ".translate-x-1{--map-translate-x:.25rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-1",
    ".translate-y-1{--map-translate-y:.25rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-2",
    ".translate-x-2{--map-translate-x:.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-2",
    ".translate-y-2{--map-translate-y:.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-3",
    ".translate-x-3{--map-translate-x:.75rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-3",
    ".translate-y-3{--map-translate-y:.75rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-4",
    ".translate-x-4{--map-translate-x:1rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-4",
    ".translate-y-4{--map-translate-y:1rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-5",
    ".translate-x-5{--map-translate-x:1.25rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-5",
    ".translate-y-5{--map-translate-y:1.25rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-6",
    ".translate-x-6{--map-translate-x:1.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-6",
    ".translate-y-6{--map-translate-y:1.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-7",
    ".translate-x-7{--map-translate-x:1.75rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-7",
    ".translate-y-7{--map-translate-y:1.75rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-8",
    ".translate-x-8{--map-translate-x:2rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-8",
    ".translate-y-8{--map-translate-y:2rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-9",
    ".translate-x-9{--map-translate-x:2.25rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-9",
    ".translate-y-9{--map-translate-y:2.25rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-10",
    ".translate-x-10{--map-translate-x:2.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-10",
    ".translate-y-10{--map-translate-y:2.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-11",
    ".translate-x-11{--map-translate-x:2.75rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-11",
    ".translate-y-11{--map-translate-y:2.75rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-12",
    ".translate-x-12{--map-translate-x:3rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-12",
    ".translate-y-12{--map-translate-y:3rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-14",
    ".translate-x-14{--map-translate-x:3.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-14",
    ".translate-y-14{--map-translate-y:3.5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-16",
    ".translate-x-16{--map-translate-x:4rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-16",
    ".translate-y-16{--map-translate-y:4rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-20",
    ".translate-x-20{--map-translate-x:5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-20",
    ".translate-y-20{--map-translate-y:5rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-24",
    ".translate-x-24{--map-translate-x:6rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-24",
    ".translate-y-24{--map-translate-y:6rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-28",
    ".translate-x-28{--map-translate-x:7rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-28",
    ".translate-y-28{--map-translate-y:7rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-32",
    ".translate-x-32{--map-translate-x:8rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-32",
    ".translate-y-32{--map-translate-y:8rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-36",
    ".translate-x-36{--map-translate-x:9rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-36",
    ".translate-y-36{--map-translate-y:9rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-40",
    ".translate-x-40{--map-translate-x:10rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-40",
    ".translate-y-40{--map-translate-y:10rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-44",
    ".translate-x-44{--map-translate-x:11rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-44",
    ".translate-y-44{--map-translate-y:11rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-48",
    ".translate-x-48{--map-translate-x:12rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-48",
    ".translate-y-48{--map-translate-y:12rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-52",
    ".translate-x-52{--map-translate-x:13rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-52",
    ".translate-y-52{--map-translate-y:13rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-56",
    ".translate-x-56{--map-translate-x:14rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-56",
    ".translate-y-56{--map-translate-y:14rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-60",
    ".translate-x-60{--map-translate-x:15rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-60",
    ".translate-y-60{--map-translate-y:15rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-64",
    ".translate-x-64{--map-translate-x:16rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-64",
    ".translate-y-64{--map-translate-y:16rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-72",
    ".translate-x-72{--map-translate-x:18rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-72",
    ".translate-y-72{--map-translate-y:18rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-80",
    ".translate-x-80{--map-translate-x:20rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-80",
    ".translate-y-80{--map-translate-y:20rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-96",
    ".translate-x-96{--map-translate-x:24rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-96",
    ".translate-y-96{--map-translate-y:24rem;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-1/2",
    ".translate-x-1\\/2{--map-translate-x:50%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-1/3",
    ".translate-x-1\\/3{--map-translate-x:33.333333%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-2/3",
    ".translate-x-2\\/3{--map-translate-x:66.666667%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-1/4",
    ".translate-x-1\\/4{--map-translate-x:25%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-2/4",
    ".translate-x-2\\/4{--map-translate-x:50%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-x-3/4",
    ".translate-x-3\\/4{--map-translate-x:75%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-1/2",
    ".translate-y-1\\/2{--map-translate-y:50%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-1/3",
    ".translate-y-1\\/3{--map-translate-y:33.333333%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-2/3",
    ".translate-y-2\\/3{--map-translate-y:66.666667%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-1/4",
    ".translate-y-1\\/4{--map-translate-y:25%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-2/4",
    ".translate-y-2\\/4{--map-translate-y:50%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "translate-y-3/4",
    ".translate-y-3\\/4{--map-translate-y:75%;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-0",
    ".skew-x-0{--map-skew-x:0deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-1",
    ".skew-x-1{--map-skew-x:1deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-2",
    ".skew-x-2{--map-skew-x:2deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-3",
    ".skew-x-3{--map-skew-x:3deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-6",
    ".skew-x-6{--map-skew-x:6deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-6",
    ".skew-x-6{--map-skew-x:6deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-x-12",
    ".skew-x-12{--map-skew-x:12deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-0",
    ".skew-y-0{--map-skew-y:0deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-1",
    ".skew-y-1{--map-skew-y:1deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-2",
    ".skew-y-2{--map-skew-y:2deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-3",
    ".skew-y-3{--map-skew-y:3deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-6",
    ".skew-y-6{--map-skew-y:6deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-6",
    ".skew-y-6{--map-skew-y:6deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  [
    "skew-y-12",
    ".skew-y-12{--map-skew-y:12deg;transform:translate(var(--map-translate-x), var(--map-translate-y)) rotate(var(--map-rotate)) skewX(var(--map-skew-x)) skewY(var(--map-skew-y)) scaleX(var(--map-scale-x)) scaleY(var(--map-scale-y));}",
  ],
  ["origin-center", ".origin-center{transform-origin:center;}"],
  ["origin-top", ".origin-top{transform-origin:top;}"],
  ["origin-right", ".origin-right{transform-origin:right;}"],
  ["origin-bottom", ".origin-bottom{transform-origin:bottom;}"],
  ["origin-left", ".origin-left{transform-origin:left;}"],
  ["origin-top-right", ".origin-top-right{transform-origin:top right;}"],
  [
    "origin-bottom-right",
    ".origin-bottom-right{transform-origin:bottom right;}",
  ],
  ["origin-bottom-left", ".origin-bottom-left{transform-origin:bottom left;}"],
  ["origin-top-left", ".origin-top-left{transform-origin:top left;}"],
  ["appearance-none", ".appearance-none{appearance:none;}"],
  ["cursor-auto", ".cursor-auto{cursor:auto;}"],
  ["cursor-default", ".cursor-default{cursor:default;}"],
  ["cursor-pointer", ".cursor-pointer{cursor:pointer;}"],
  ["cursor-wait", ".cursor-wait{cursor:wait;}"],
  ["cursor-text", ".cursor-text{cursor:text;}"],
  ["cursor-move", ".cursor-move{cursor:move;}"],
  ["cursor-help", ".cursor-help{cursor:help;}"],
  ["cursor-none", ".cursor-none{cursor:none;}"],
  ["cursor-progress", ".cursor-progress{cursor:progress;}"],
  ["cursor-cell", ".cursor-cell{cursor:cell;}"],
  ["cursor-crosshair", ".cursor-crosshair{cursor:crosshair;}"],
  ["cursor-alias", ".cursor-alias{cursor:alias;}"],
  ["cursor-copy", ".cursor-copy{cursor:copy;}"],
  ["cursor-grab", ".cursor-grab{cursor:grab;}"],
  ["cursor-grabbing", ".cursor-grabbing{cursor:grabbing;}"],
  ["cursor-not-allowed", ".cursor-not-allowed{cursor:not-allowed;}"],
  ["cursor-context-menu", ".cursor-context-menu{cursor:context-menu;}"],
  ["cursor-vertical-text", ".cursor-vertical-text{cursor:vertical-text;}"],
  ["cursor-no-drop", ".cursor-no-drop{cursor:no-drop;}"],
  ["cursor-all-scroll", ".cursor-all-scroll{cursor:all-scroll;}"],
  ["cursor-col-resize", ".cursor-col-resize{cursor:col-resize;}"],
  ["cursor-row-resize", ".cursor-row-resize{cursor:row-resize;}"],
  ["cursor-n-resize", ".cursor-n-resize{cursor:n-resize;}"],
  ["cursor-e-resize", ".cursor-e-resize{cursor:e-resize;}"],
  ["cursor-s-resize", ".cursor-s-resize{cursor:s-resize;}"],
  ["cursor-w-resize", ".cursor-w-resize{cursor:w-resize;}"],
  ["cursor-ne-resize", ".cursor-ne-resize{cursor:ne-resize;}"],
  ["cursor-nw-resize", ".cursor-nw-resize{cursor:nw-resize;}"],
  ["cursor-se-resize", ".cursor-se-resize{cursor:se-resize;}"],
  ["cursor-sw-resize", ".cursor-sw-resize{cursor:sw-resize;}"],
  ["cursor-ew-resize", ".cursor-ew-resize{cursor:ew-resize;}"],
  ["cursor-ns-resize", ".cursor-ns-resize{cursor:ns-resize;}"],
  ["cursor-nesw-resize", ".cursor-nesw-resize{cursor:nesw-resize;}"],
  ["cursor-nwse-resize", ".cursor-nwse-resize{cursor:nwse-resize;}"],
  ["cursor-zoom-in", ".cursor-zoom-in{cursor:zoom-in;}"],
  ["cursor-zoom-out", ".cursor-zoom-out{cursor:zoom-out;}"],
  ["pointer-events-none", ".pointer-events-none{pointer-events:none;}"],
  ["pointer-events-auto", ".pointer-events-auto{pointer-events:auto;}"],
  ["resize-none", ".resize-none{resize:none;}"],
  ["resize-y", ".resize-y{resize:vertical;}"],
  ["resize-x", ".resize-x{resize:horizontal;}"],
  ["resize", ".resize{resize:both;}"],
  ["scroll-auto", ".scroll-auto{scroll-behavior:auto;}"],
  ["scroll-smooth", ".scroll-smooth{scroll-behavior:smooth;}"],
  ["scroll-m-0", ".scroll-m-0{scroll-margin:0px;}"],
  [
    "scroll-mx-0",
    ".scroll-mx-0{scroll-margin-left:0px;scroll-margin-right:0px;}",
  ],
  [
    "scroll-my-0",
    ".scroll-my-0{scroll-margin-bottom:0px;scroll-margin-top:0px;}",
  ],
  ["scroll-mt-0", ".scroll-mt-0{scroll-margin-top:0px;}"],
  ["scroll-mr-0", ".scroll-mr-0{scroll-margin-right:0px;}"],
  ["scroll-mb-0", ".scroll-mb-0{scroll-margin-bottom:0px;}"],
  ["scroll-ml-0", ".scroll-ml-0{scroll-margin-left:0px;}"],
  ["scroll-m-px", ".scroll-m-px{scroll-margin:1px;}"],
  [
    "scroll-mx-px",
    ".scroll-mx-px{scroll-margin-left:1px;scroll-margin-right:1px;}",
  ],
  [
    "scroll-my-px",
    ".scroll-my-px{scroll-margin-bottom:1px;scroll-margin-top:1px;}",
  ],
  ["scroll-mt-px", ".scroll-mt-px{scroll-margin-top:1px;}"],
  ["scroll-mr-px", ".scroll-mr-px{scroll-margin-right:1px;}"],
  ["scroll-mb-px", ".scroll-mb-px{scroll-margin-bottom:1px;}"],
  ["scroll-ml-px", ".scroll-ml-px{scroll-margin-left:1px;}"],
  ["scroll-m-1", ".scroll-m-1{scroll-margin:0.25rem;}"],
  [
    "scroll-mx-1",
    ".scroll-mx-1{scroll-margin-left:0.25rem;scroll-margin-right:0.25rem;}",
  ],
  [
    "scroll-my-1",
    ".scroll-my-1{scroll-margin-bottom:0.25rem;scroll-margin-top:0.25rem;}",
  ],
  ["scroll-mt-1", ".scroll-mt-1{scroll-margin-top:0.25rem;}"],
  ["scroll-mr-1", ".scroll-mr-1{scroll-margin-right:0.25rem;}"],
  ["scroll-mb-1", ".scroll-mb-1{scroll-margin-bottom:0.25rem;}"],
  ["scroll-ml-1", ".scroll-ml-1{scroll-margin-left:0.25rem;}"],
  ["scroll-m-2", ".scroll-m-2{scroll-margin:0.5rem;}"],
  [
    "scroll-mx-2",
    ".scroll-mx-2{scroll-margin-left:0.5rem;scroll-margin-right:0.5rem;}",
  ],
  [
    "scroll-my-2",
    ".scroll-my-2{scroll-margin-bottom:0.5rem;scroll-margin-top:0.5rem;}",
  ],
  ["scroll-mt-2", ".scroll-mt-2{scroll-margin-top:0.5rem;}"],
  ["scroll-mr-2", ".scroll-mr-2{scroll-margin-right:0.5rem;}"],
  ["scroll-mb-2", ".scroll-mb-2{scroll-margin-bottom:0.5rem;}"],
  ["scroll-ml-2", ".scroll-ml-2{scroll-margin-left:0.5rem;}"],
  ["scroll-m-3", ".scroll-m-3{scroll-margin:0.75rem;}"],
  [
    "scroll-mx-3",
    ".scroll-mx-3{scroll-margin-left:0.75rem;scroll-margin-right:0.75rem;}",
  ],
  [
    "scroll-my-3",
    ".scroll-my-3{scroll-margin-bottom:0.75rem;scroll-margin-top:0.75rem;}",
  ],
  ["scroll-mt-3", ".scroll-mt-3{scroll-margin-top:0.75rem;}"],
  ["scroll-mr-3", ".scroll-mr-3{scroll-margin-right:0.75rem;}"],
  ["scroll-mb-3", ".scroll-mb-3{scroll-margin-bottom:0.75rem;}"],
  ["scroll-ml-3", ".scroll-ml-3{scroll-margin-left:0.75rem;}"],
  ["scroll-m-4", ".scroll-m-4{scroll-margin:1rem;}"],
  [
    "scroll-mx-4",
    ".scroll-mx-4{scroll-margin-left:1rem;scroll-margin-right:1rem;}",
  ],
  [
    "scroll-my-4",
    ".scroll-my-4{scroll-margin-bottom:1rem;scroll-margin-top:1rem;}",
  ],
  ["scroll-mt-4", ".scroll-mt-4{scroll-margin-top:1rem;}"],
  ["scroll-mr-4", ".scroll-mr-4{scroll-margin-right:1rem;}"],
  ["scroll-mb-4", ".scroll-mb-4{scroll-margin-bottom:1rem;}"],
  ["scroll-ml-4", ".scroll-ml-4{scroll-margin-left:1rem;}"],
  ["scroll-m-5", ".scroll-m-5{scroll-margin:1.25rem;}"],
  [
    "scroll-mx-5",
    ".scroll-mx-5{scroll-margin-left:1.25rem;scroll-margin-right:1.25rem;}",
  ],
  [
    "scroll-my-5",
    ".scroll-my-5{scroll-margin-bottom:1.25rem;scroll-margin-top:1.25rem;}",
  ],
  ["scroll-mt-5", ".scroll-mt-5{scroll-margin-top:1.25rem;}"],
  ["scroll-mr-5", ".scroll-mr-5{scroll-margin-right:1.25rem;}"],
  ["scroll-mb-5", ".scroll-mb-5{scroll-margin-bottom:1.25rem;}"],
  ["scroll-ml-5", ".scroll-ml-5{scroll-margin-left:1.25rem;}"],
  ["scroll-m-6", ".scroll-m-6{scroll-margin:1.5rem;}"],
  [
    "scroll-mx-6",
    ".scroll-mx-6{scroll-margin-left:1.5rem;scroll-margin-right:1.5rem;}",
  ],
  [
    "scroll-my-6",
    ".scroll-my-6{scroll-margin-bottom:1.5rem;scroll-margin-top:1.5rem;}",
  ],
  ["scroll-mt-6", ".scroll-mt-6{scroll-margin-top:1.5rem;}"],
  ["scroll-mr-6", ".scroll-mr-6{scroll-margin-right:1.5rem;}"],
  ["scroll-mb-6", ".scroll-mb-6{scroll-margin-bottom:1.5rem;}"],
  ["scroll-ml-6", ".scroll-ml-6{scroll-margin-left:1.5rem;}"],
  ["scroll-m-7", ".scroll-m-7{scroll-margin:1.75rem;}"],
  [
    "scroll-mx-7",
    ".scroll-mx-7{scroll-margin-left:1.75rem;scroll-margin-right:1.75rem;}",
  ],
  [
    "scroll-my-7",
    ".scroll-my-7{scroll-margin-bottom:1.75rem;scroll-margin-top:1.75rem;}",
  ],
  ["scroll-mt-7", ".scroll-mt-7{scroll-margin-top:1.75rem;}"],
  ["scroll-mr-7", ".scroll-mr-7{scroll-margin-right:1.75rem;}"],
  ["scroll-mb-7", ".scroll-mb-7{scroll-margin-bottom:1.75rem;}"],
  ["scroll-ml-7", ".scroll-ml-7{scroll-margin-left:1.75rem;}"],
  ["scroll-m-8", ".scroll-m-8{scroll-margin:2rem;}"],
  [
    "scroll-mx-8",
    ".scroll-mx-8{scroll-margin-left:2rem;scroll-margin-right:2rem;}",
  ],
  [
    "scroll-my-8",
    ".scroll-my-8{scroll-margin-bottom:2rem;scroll-margin-top:2rem;}",
  ],
  ["scroll-mt-8", ".scroll-mt-8{scroll-margin-top:2rem;}"],
  ["scroll-mr-8", ".scroll-mr-8{scroll-margin-right:2rem;}"],
  ["scroll-mb-8", ".scroll-mb-8{scroll-margin-bottom:2rem;}"],
  ["scroll-ml-8", ".scroll-ml-8{scroll-margin-left:2rem;}"],
  ["scroll-m-9", ".scroll-m-9{scroll-margin:2.25rem;}"],
  [
    "scroll-mx-9",
    ".scroll-mx-9{scroll-margin-left:2.25rem;scroll-margin-right:2.25rem;}",
  ],
  [
    "scroll-my-9",
    ".scroll-my-9{scroll-margin-bottom:2.25rem;scroll-margin-top:2.25rem;}",
  ],
  ["scroll-mt-9", ".scroll-mt-9{scroll-margin-top:2.25rem;}"],
  ["scroll-mr-9", ".scroll-mr-9{scroll-margin-right:2.25rem;}"],
  ["scroll-mb-9", ".scroll-mb-9{scroll-margin-bottom:2.25rem;}"],
  ["scroll-ml-9", ".scroll-ml-9{scroll-margin-left:2.25rem;}"],
  ["scroll-m-10", ".scroll-m-10{scroll-margin:2.5rem;}"],
  [
    "scroll-mx-10",
    ".scroll-mx-10{scroll-margin-left:2.5rem;scroll-margin-right:2.5rem;}",
  ],
  [
    "scroll-my-10",
    ".scroll-my-10{scroll-margin-bottom:2.5rem;scroll-margin-top:2.5rem;}",
  ],
  ["scroll-mt-10", ".scroll-mt-10{scroll-margin-top:2.5rem;}"],
  ["scroll-mr-10", ".scroll-mr-10{scroll-margin-right:2.5rem;}"],
  ["scroll-mb-10", ".scroll-mb-10{scroll-margin-bottom:2.5rem;}"],
  ["scroll-ml-10", ".scroll-ml-10{scroll-margin-left:2.5rem;}"],
  ["scroll-m-11", ".scroll-m-11{scroll-margin:2.75rem;}"],
  [
    "scroll-mx-11",
    ".scroll-mx-11{scroll-margin-left:2.75rem;scroll-margin-right:2.75rem;}",
  ],
  [
    "scroll-my-11",
    ".scroll-my-11{scroll-margin-bottom:2.75rem;scroll-margin-top:2.75rem;}",
  ],
  ["scroll-mt-11", ".scroll-mt-11{scroll-margin-top:2.75rem;}"],
  ["scroll-mr-11", ".scroll-mr-11{scroll-margin-right:2.75rem;}"],
  ["scroll-mb-11", ".scroll-mb-11{scroll-margin-bottom:2.75rem;}"],
  ["scroll-ml-11", ".scroll-ml-11{scroll-margin-left:2.75rem;}"],
  ["scroll-m-12", ".scroll-m-12{scroll-margin:3rem;}"],
  [
    "scroll-mx-12",
    ".scroll-mx-12{scroll-margin-left:3rem;scroll-margin-right:3rem;}",
  ],
  [
    "scroll-my-12",
    ".scroll-my-12{scroll-margin-bottom:3rem;scroll-margin-top:3rem;}",
  ],
  ["scroll-mt-12", ".scroll-mt-12{scroll-margin-top:3rem;}"],
  ["scroll-mr-12", ".scroll-mr-12{scroll-margin-right:3rem;}"],
  ["scroll-mb-12", ".scroll-mb-12{scroll-margin-bottom:3rem;}"],
  ["scroll-ml-12", ".scroll-ml-12{scroll-margin-left:3rem;}"],
  ["scroll-m-14", ".scroll-m-14{scroll-margin:3.5rem;}"],
  [
    "scroll-mx-14",
    ".scroll-mx-14{scroll-margin-left:3.5rem;scroll-margin-right:3.5rem;}",
  ],
  [
    "scroll-my-14",
    ".scroll-my-14{scroll-margin-bottom:3.5rem;scroll-margin-top:3.5rem;}",
  ],
  ["scroll-mt-14", ".scroll-mt-14{scroll-margin-top:3.5rem;}"],
  ["scroll-mr-14", ".scroll-mr-14{scroll-margin-right:3.5rem;}"],
  ["scroll-mb-14", ".scroll-mb-14{scroll-margin-bottom:3.5rem;}"],
  ["scroll-ml-14", ".scroll-ml-14{scroll-margin-left:3.5rem;}"],
  ["scroll-m-16", ".scroll-m-16{scroll-margin:4rem;}"],
  [
    "scroll-mx-16",
    ".scroll-mx-16{scroll-margin-left:4rem;scroll-margin-right:4rem;}",
  ],
  [
    "scroll-my-16",
    ".scroll-my-16{scroll-margin-bottom:4rem;scroll-margin-top:4rem;}",
  ],
  ["scroll-mt-16", ".scroll-mt-16{scroll-margin-top:4rem;}"],
  ["scroll-mr-16", ".scroll-mr-16{scroll-margin-right:4rem;}"],
  ["scroll-mb-16", ".scroll-mb-16{scroll-margin-bottom:4rem;}"],
  ["scroll-ml-16", ".scroll-ml-16{scroll-margin-left:4rem;}"],
  ["scroll-m-20", ".scroll-m-20{scroll-margin:5rem;}"],
  [
    "scroll-mx-20",
    ".scroll-mx-20{scroll-margin-left:5rem;scroll-margin-right:5rem;}",
  ],
  [
    "scroll-my-20",
    ".scroll-my-20{scroll-margin-bottom:5rem;scroll-margin-top:5rem;}",
  ],
  ["scroll-mt-20", ".scroll-mt-20{scroll-margin-top:5rem;}"],
  ["scroll-mr-20", ".scroll-mr-20{scroll-margin-right:5rem;}"],
  ["scroll-mb-20", ".scroll-mb-20{scroll-margin-bottom:5rem;}"],
  ["scroll-ml-20", ".scroll-ml-20{scroll-margin-left:5rem;}"],
  ["scroll-m-24", ".scroll-m-24{scroll-margin:6rem;}"],
  [
    "scroll-mx-24",
    ".scroll-mx-24{scroll-margin-left:6rem;scroll-margin-right:6rem;}",
  ],
  [
    "scroll-my-24",
    ".scroll-my-24{scroll-margin-bottom:6rem;scroll-margin-top:6rem;}",
  ],
  ["scroll-mt-24", ".scroll-mt-24{scroll-margin-top:6rem;}"],
  ["scroll-mr-24", ".scroll-mr-24{scroll-margin-right:6rem;}"],
  ["scroll-mb-24", ".scroll-mb-24{scroll-margin-bottom:6rem;}"],
  ["scroll-ml-24", ".scroll-ml-24{scroll-margin-left:6rem;}"],
  ["scroll-m-28", ".scroll-m-28{scroll-margin:7rem;}"],
  [
    "scroll-mx-28",
    ".scroll-mx-28{scroll-margin-left:7rem;scroll-margin-right:7rem;}",
  ],
  [
    "scroll-my-28",
    ".scroll-my-28{scroll-margin-bottom:7rem;scroll-margin-top:7rem;}",
  ],
  ["scroll-mt-28", ".scroll-mt-28{scroll-margin-top:7rem;}"],
  ["scroll-mr-28", ".scroll-mr-28{scroll-margin-right:7rem;}"],
  ["scroll-mb-28", ".scroll-mb-28{scroll-margin-bottom:7rem;}"],
  ["scroll-ml-28", ".scroll-ml-28{scroll-margin-left:7rem;}"],
  ["scroll-m-32", ".scroll-m-32{scroll-margin:8rem;}"],
  [
    "scroll-mx-32",
    ".scroll-mx-32{scroll-margin-left:8rem;scroll-margin-right:8rem;}",
  ],
  [
    "scroll-my-32",
    ".scroll-my-32{scroll-margin-bottom:8rem;scroll-margin-top:8rem;}",
  ],
  ["scroll-mt-32", ".scroll-mt-32{scroll-margin-top:8rem;}"],
  ["scroll-mr-32", ".scroll-mr-32{scroll-margin-right:8rem;}"],
  ["scroll-mb-32", ".scroll-mb-32{scroll-margin-bottom:8rem;}"],
  ["scroll-ml-32", ".scroll-ml-32{scroll-margin-left:8rem;}"],
  ["scroll-m-36", ".scroll-m-36{scroll-margin:9rem;}"],
  [
    "scroll-mx-36",
    ".scroll-mx-36{scroll-margin-left:9rem;scroll-margin-right:9rem;}",
  ],
  [
    "scroll-my-36",
    ".scroll-my-36{scroll-margin-bottom:9rem;scroll-margin-top:9rem;}",
  ],
  ["scroll-mt-36", ".scroll-mt-36{scroll-margin-top:9rem;}"],
  ["scroll-mr-36", ".scroll-mr-36{scroll-margin-right:9rem;}"],
  ["scroll-mb-36", ".scroll-mb-36{scroll-margin-bottom:9rem;}"],
  ["scroll-ml-36", ".scroll-ml-36{scroll-margin-left:9rem;}"],
  ["scroll-m-40", ".scroll-m-40{scroll-margin:10rem;}"],
  [
    "scroll-mx-40",
    ".scroll-mx-40{scroll-margin-left:10rem;scroll-margin-right:10rem;}",
  ],
  [
    "scroll-my-40",
    ".scroll-my-40{scroll-margin-bottom:10rem;scroll-margin-top:10rem;}",
  ],
  ["scroll-mt-40", ".scroll-mt-40{scroll-margin-top:10rem;}"],
  ["scroll-mr-40", ".scroll-mr-40{scroll-margin-right:10rem;}"],
  ["scroll-mb-40", ".scroll-mb-40{scroll-margin-bottom:10rem;}"],
  ["scroll-ml-40", ".scroll-ml-40{scroll-margin-left:10rem;}"],
  ["scroll-m-44", ".scroll-m-44{scroll-margin:11rem;}"],
  [
    "scroll-mx-44",
    ".scroll-mx-44{scroll-margin-left:11rem;scroll-margin-right:11rem;}",
  ],
  [
    "scroll-my-44",
    ".scroll-my-44{scroll-margin-bottom:11rem;scroll-margin-top:11rem;}",
  ],
  ["scroll-mt-44", ".scroll-mt-44{scroll-margin-top:11rem;}"],
  ["scroll-mr-44", ".scroll-mr-44{scroll-margin-right:11rem;}"],
  ["scroll-mb-44", ".scroll-mb-44{scroll-margin-bottom:11rem;}"],
  ["scroll-ml-44", ".scroll-ml-44{scroll-margin-left:11rem;}"],
  ["scroll-m-48", ".scroll-m-48{scroll-margin:12rem;}"],
  [
    "scroll-mx-48",
    ".scroll-mx-48{scroll-margin-left:12rem;scroll-margin-right:12rem;}",
  ],
  [
    "scroll-my-48",
    ".scroll-my-48{scroll-margin-bottom:12rem;scroll-margin-top:12rem;}",
  ],
  ["scroll-mt-48", ".scroll-mt-48{scroll-margin-top:12rem;}"],
  ["scroll-mr-48", ".scroll-mr-48{scroll-margin-right:12rem;}"],
  ["scroll-mb-48", ".scroll-mb-48{scroll-margin-bottom:12rem;}"],
  ["scroll-ml-48", ".scroll-ml-48{scroll-margin-left:12rem;}"],
  ["scroll-m-52", ".scroll-m-52{scroll-margin:13rem;}"],
  [
    "scroll-mx-52",
    ".scroll-mx-52{scroll-margin-left:13rem;scroll-margin-right:13rem;}",
  ],
  [
    "scroll-my-52",
    ".scroll-my-52{scroll-margin-bottom:13rem;scroll-margin-top:13rem;}",
  ],
  ["scroll-mt-52", ".scroll-mt-52{scroll-margin-top:13rem;}"],
  ["scroll-mr-52", ".scroll-mr-52{scroll-margin-right:13rem;}"],
  ["scroll-mb-52", ".scroll-mb-52{scroll-margin-bottom:13rem;}"],
  ["scroll-ml-52", ".scroll-ml-52{scroll-margin-left:13rem;}"],
  ["scroll-m-56", ".scroll-m-56{scroll-margin:14rem;}"],
  [
    "scroll-mx-56",
    ".scroll-mx-56{scroll-margin-left:14rem;scroll-margin-right:14rem;}",
  ],
  [
    "scroll-my-56",
    ".scroll-my-56{scroll-margin-bottom:14rem;scroll-margin-top:14rem;}",
  ],
  ["scroll-mt-56", ".scroll-mt-56{scroll-margin-top:14rem;}"],
  ["scroll-mr-56", ".scroll-mr-56{scroll-margin-right:14rem;}"],
  ["scroll-mb-56", ".scroll-mb-56{scroll-margin-bottom:14rem;}"],
  ["scroll-ml-56", ".scroll-ml-56{scroll-margin-left:14rem;}"],
  ["scroll-m-60", ".scroll-m-60{scroll-margin:15rem;}"],
  [
    "scroll-mx-60",
    ".scroll-mx-60{scroll-margin-left:15rem;scroll-margin-right:15rem;}",
  ],
  [
    "scroll-my-60",
    ".scroll-my-60{scroll-margin-bottom:15rem;scroll-margin-top:15rem;}",
  ],
  ["scroll-mt-60", ".scroll-mt-60{scroll-margin-top:15rem;}"],
  ["scroll-mr-60", ".scroll-mr-60{scroll-margin-right:15rem;}"],
  ["scroll-mb-60", ".scroll-mb-60{scroll-margin-bottom:15rem;}"],
  ["scroll-ml-60", ".scroll-ml-60{scroll-margin-left:15rem;}"],
  ["scroll-m-64", ".scroll-m-64{scroll-margin:16rem;}"],
  [
    "scroll-mx-64",
    ".scroll-mx-64{scroll-margin-left:16rem;scroll-margin-right:16rem;}",
  ],
  [
    "scroll-my-64",
    ".scroll-my-64{scroll-margin-bottom:16rem;scroll-margin-top:16rem;}",
  ],
  ["scroll-mt-64", ".scroll-mt-64{scroll-margin-top:16rem;}"],
  ["scroll-mr-64", ".scroll-mr-64{scroll-margin-right:16rem;}"],
  ["scroll-mb-64", ".scroll-mb-64{scroll-margin-bottom:16rem;}"],
  ["scroll-ml-64", ".scroll-ml-64{scroll-margin-left:16rem;}"],
  ["scroll-m-72", ".scroll-m-72{scroll-margin:18rem;}"],
  [
    "scroll-mx-72",
    ".scroll-mx-72{scroll-margin-left:18rem;scroll-margin-right:18rem;}",
  ],
  [
    "scroll-my-72",
    ".scroll-my-72{scroll-margin-bottom:18rem;scroll-margin-top:18rem;}",
  ],
  ["scroll-mt-72", ".scroll-mt-72{scroll-margin-top:18rem;}"],
  ["scroll-mr-72", ".scroll-mr-72{scroll-margin-right:18rem;}"],
  ["scroll-mb-72", ".scroll-mb-72{scroll-margin-bottom:18rem;}"],
  ["scroll-ml-72", ".scroll-ml-72{scroll-margin-left:18rem;}"],
  ["scroll-m-80", ".scroll-m-80{scroll-margin:20rem;}"],
  [
    "scroll-mx-80",
    ".scroll-mx-80{scroll-margin-left:20rem;scroll-margin-right:20rem;}",
  ],
  [
    "scroll-my-80",
    ".scroll-my-80{scroll-margin-bottom:20rem;scroll-margin-top:20rem;}",
  ],
  ["scroll-mt-80", ".scroll-mt-80{scroll-margin-top:20rem;}"],
  ["scroll-mr-80", ".scroll-mr-80{scroll-margin-right:20rem;}"],
  ["scroll-mb-80", ".scroll-mb-80{scroll-margin-bottom:20rem;}"],
  ["scroll-ml-80", ".scroll-ml-80{scroll-margin-left:20rem;}"],
  ["scroll-m-96", ".scroll-m-96{scroll-margin:24rem;}"],
  [
    "scroll-mx-96",
    ".scroll-mx-96{scroll-margin-left:24rem;scroll-margin-right:24rem;}",
  ],
  [
    "scroll-my-96",
    ".scroll-my-96{scroll-margin-bottom:24rem;scroll-margin-top:24rem;}",
  ],
  ["scroll-mt-96", ".scroll-mt-96{scroll-margin-top:24rem;}"],
  ["scroll-mr-96", ".scroll-mr-96{scroll-margin-right:24rem;}"],
  ["scroll-mb-96", ".scroll-mb-96{scroll-margin-bottom:24rem;}"],
  ["scroll-ml-96", ".scroll-ml-96{scroll-margin-left:24rem;}"],
  ["scroll-m-0.5", ".scroll-m-0\\.5{scroll-margin:0.125rem;}"],
  [
    "scroll-mx-0.5",
    ".scroll-mx-0\\.5{scroll-margin-left:0.125rem;scroll-margin-right:0.125rem;}",
  ],
  [
    "scroll-my-0.5",
    ".scroll-my-0\\.5{scroll-margin-bottom:0.125rem;scroll-margin-top:0.125rem;}",
  ],
  ["scroll-mt-0.5", ".scroll-mt-0\\.5{scroll-margin-top:0.125rem;}"],
  ["scroll-mr-0.5", ".scroll-mr-0\\.5{scroll-margin-right:0.125rem;}"],
  ["scroll-mb-0.5", ".scroll-mb-0\\.5{scroll-margin-bottom:0.125rem;}"],
  ["scroll-ml-0.5", ".scroll-ml-0\\.5{scroll-margin-left:0.125rem;}"],
  ["scroll-m-1.5", ".scroll-m-1\\.5{scroll-margin:0.375rem;}"],
  [
    "scroll-mx-1.5",
    ".scroll-mx-1\\.5{scroll-margin-left:0.375rem;scroll-margin-right:0.375rem;}",
  ],
  [
    "scroll-my-1.5",
    ".scroll-my-1\\.5{scroll-margin-bottom:0.375rem;scroll-margin-top:0.375rem;}",
  ],
  ["scroll-mt-1.5", ".scroll-mt-1\\.5{scroll-margin-top:0.375rem;}"],
  ["scroll-mr-1.5", ".scroll-mr-1\\.5{scroll-margin-right:0.375rem;}"],
  ["scroll-mb-1.5", ".scroll-mb-1\\.5{scroll-margin-bottom:0.375rem;}"],
  ["scroll-ml-1.5", ".scroll-ml-1\\.5{scroll-margin-left:0.375rem;}"],
  ["scroll-m-2.5", ".scroll-m-2\\.5{scroll-margin:0.625rem;}"],
  [
    "scroll-mx-2.5",
    ".scroll-mx-2\\.5{scroll-margin-left:0.625rem;scroll-margin-right:0.625rem;}",
  ],
  [
    "scroll-my-2.5",
    ".scroll-my-2\\.5{scroll-margin-bottom:0.625rem;scroll-margin-top:0.625rem;}",
  ],
  ["scroll-mt-2.5", ".scroll-mt-2\\.5{scroll-margin-top:0.625rem;}"],
  ["scroll-mr-2.5", ".scroll-mr-2\\.5{scroll-margin-right:0.625rem;}"],
  ["scroll-mb-2.5", ".scroll-mb-2\\.5{scroll-margin-bottom:0.625rem;}"],
  ["scroll-ml-2.5", ".scroll-ml-2\\.5{scroll-margin-left:0.625rem;}"],
  ["scroll-m-3.5", ".scroll-m-3\\.5{scroll-margin:0.875rem;}"],
  [
    "scroll-mx-3.5",
    ".scroll-mx-3\\.5{scroll-margin-left:0.875rem;scroll-margin-right:0.875rem;}",
  ],
  [
    "scroll-my-3.5",
    ".scroll-my-3\\.5{scroll-margin-bottom:0.875rem;scroll-margin-top:0.875rem;}",
  ],
  ["scroll-mt-3.5", ".scroll-mt-3\\.5{scroll-margin-top:0.875rem;}"],
  ["scroll-mr-3.5", ".scroll-mr-3\\.5{scroll-margin-right:0.875rem;}"],
  ["scroll-mb-3.5", ".scroll-mb-3\\.5{scroll-margin-bottom:0.875rem;}"],
  ["scroll-ml-3.5", ".scroll-ml-3\\.5{scroll-margin-left:0.875rem;}"],
  ["scroll-p-0", ".scroll-p-0{scroll-padding:0px;}"],
  [
    "scroll-px-0",
    ".scroll-px-0{scroll-padding-left:0px;scroll-padding-right:0px;}",
  ],
  [
    "scroll-py-0",
    ".scroll-py-0{scroll-padding-bottom:0px;scroll-padding-top:0px;}",
  ],
  ["scroll-pt-0", ".scroll-pt-0{scroll-padding-top:0px;}"],
  ["scroll-pr-0", ".scroll-pr-0{scroll-padding-right:0px;}"],
  ["scroll-pb-0", ".scroll-pb-0{scroll-padding-bottom:0px;}"],
  ["scroll-pl-0", ".scroll-pl-0{scroll-padding-left:0px;}"],
  ["scroll-p-px", ".scroll-p-px{scroll-padding:1px;}"],
  [
    "scroll-px-px",
    ".scroll-px-px{scroll-padding-left:1px;scroll-padding-right:1px;}",
  ],
  [
    "scroll-py-px",
    ".scroll-py-px{scroll-padding-bottom:1px;scroll-padding-top:1px;}",
  ],
  ["scroll-pt-px", ".scroll-pt-px{scroll-padding-top:1px;}"],
  ["scroll-pr-px", ".scroll-pr-px{scroll-padding-right:1px;}"],
  ["scroll-pb-px", ".scroll-pb-px{scroll-padding-bottom:1px;}"],
  ["scroll-pl-px", ".scroll-pl-px{scroll-padding-left:1px;}"],
  ["scroll-p-1", ".scroll-p-1{scroll-padding:0.25rem;}"],
  [
    "scroll-px-1",
    ".scroll-px-1{scroll-padding-left:0.25rem;scroll-padding-right:0.25rem;}",
  ],
  [
    "scroll-py-1",
    ".scroll-py-1{scroll-padding-bottom:0.25rem;scroll-padding-top:0.25rem;}",
  ],
  ["scroll-pt-1", ".scroll-pt-1{scroll-padding-top:0.25rem;}"],
  ["scroll-pr-1", ".scroll-pr-1{scroll-padding-right:0.25rem;}"],
  ["scroll-pb-1", ".scroll-pb-1{scroll-padding-bottom:0.25rem;}"],
  ["scroll-pl-1", ".scroll-pl-1{scroll-padding-left:0.25rem;}"],
  ["scroll-p-2", ".scroll-p-2{scroll-padding:0.5rem;}"],
  [
    "scroll-px-2",
    ".scroll-px-2{scroll-padding-left:0.5rem;scroll-padding-right:0.5rem;}",
  ],
  [
    "scroll-py-2",
    ".scroll-py-2{scroll-padding-bottom:0.5rem;scroll-padding-top:0.5rem;}",
  ],
  ["scroll-pt-2", ".scroll-pt-2{scroll-padding-top:0.5rem;}"],
  ["scroll-pr-2", ".scroll-pr-2{scroll-padding-right:0.5rem;}"],
  ["scroll-pb-2", ".scroll-pb-2{scroll-padding-bottom:0.5rem;}"],
  ["scroll-pl-2", ".scroll-pl-2{scroll-padding-left:0.5rem;}"],
  ["scroll-p-3", ".scroll-p-3{scroll-padding:0.75rem;}"],
  [
    "scroll-px-3",
    ".scroll-px-3{scroll-padding-left:0.75rem;scroll-padding-right:0.75rem;}",
  ],
  [
    "scroll-py-3",
    ".scroll-py-3{scroll-padding-bottom:0.75rem;scroll-padding-top:0.75rem;}",
  ],
  ["scroll-pt-3", ".scroll-pt-3{scroll-padding-top:0.75rem;}"],
  ["scroll-pr-3", ".scroll-pr-3{scroll-padding-right:0.75rem;}"],
  ["scroll-pb-3", ".scroll-pb-3{scroll-padding-bottom:0.75rem;}"],
  ["scroll-pl-3", ".scroll-pl-3{scroll-padding-left:0.75rem;}"],
  ["scroll-p-4", ".scroll-p-4{scroll-padding:1rem;}"],
  [
    "scroll-px-4",
    ".scroll-px-4{scroll-padding-left:1rem;scroll-padding-right:1rem;}",
  ],
  [
    "scroll-py-4",
    ".scroll-py-4{scroll-padding-bottom:1rem;scroll-padding-top:1rem;}",
  ],
  ["scroll-pt-4", ".scroll-pt-4{scroll-padding-top:1rem;}"],
  ["scroll-pr-4", ".scroll-pr-4{scroll-padding-right:1rem;}"],
  ["scroll-pb-4", ".scroll-pb-4{scroll-padding-bottom:1rem;}"],
  ["scroll-pl-4", ".scroll-pl-4{scroll-padding-left:1rem;}"],
  ["scroll-p-5", ".scroll-p-5{scroll-padding:1.25rem;}"],
  [
    "scroll-px-5",
    ".scroll-px-5{scroll-padding-left:1.25rem;scroll-padding-right:1.25rem;}",
  ],
  [
    "scroll-py-5",
    ".scroll-py-5{scroll-padding-bottom:1.25rem;scroll-padding-top:1.25rem;}",
  ],
  ["scroll-pt-5", ".scroll-pt-5{scroll-padding-top:1.25rem;}"],
  ["scroll-pr-5", ".scroll-pr-5{scroll-padding-right:1.25rem;}"],
  ["scroll-pb-5", ".scroll-pb-5{scroll-padding-bottom:1.25rem;}"],
  ["scroll-pl-5", ".scroll-pl-5{scroll-padding-left:1.25rem;}"],
  ["scroll-p-6", ".scroll-p-6{scroll-padding:1.5rem;}"],
  [
    "scroll-px-6",
    ".scroll-px-6{scroll-padding-left:1.5rem;scroll-padding-right:1.5rem;}",
  ],
  [
    "scroll-py-6",
    ".scroll-py-6{scroll-padding-bottom:1.5rem;scroll-padding-top:1.5rem;}",
  ],
  ["scroll-pt-6", ".scroll-pt-6{scroll-padding-top:1.5rem;}"],
  ["scroll-pr-6", ".scroll-pr-6{scroll-padding-right:1.5rem;}"],
  ["scroll-pb-6", ".scroll-pb-6{scroll-padding-bottom:1.5rem;}"],
  ["scroll-pl-6", ".scroll-pl-6{scroll-padding-left:1.5rem;}"],
  ["scroll-p-7", ".scroll-p-7{scroll-padding:1.75rem;}"],
  [
    "scroll-px-7",
    ".scroll-px-7{scroll-padding-left:1.75rem;scroll-padding-right:1.75rem;}",
  ],
  [
    "scroll-py-7",
    ".scroll-py-7{scroll-padding-bottom:1.75rem;scroll-padding-top:1.75rem;}",
  ],
  ["scroll-pt-7", ".scroll-pt-7{scroll-padding-top:1.75rem;}"],
  ["scroll-pr-7", ".scroll-pr-7{scroll-padding-right:1.75rem;}"],
  ["scroll-pb-7", ".scroll-pb-7{scroll-padding-bottom:1.75rem;}"],
  ["scroll-pl-7", ".scroll-pl-7{scroll-padding-left:1.75rem;}"],
  ["scroll-p-8", ".scroll-p-8{scroll-padding:2rem;}"],
  [
    "scroll-px-8",
    ".scroll-px-8{scroll-padding-left:2rem;scroll-padding-right:2rem;}",
  ],
  [
    "scroll-py-8",
    ".scroll-py-8{scroll-padding-bottom:2rem;scroll-padding-top:2rem;}",
  ],
  ["scroll-pt-8", ".scroll-pt-8{scroll-padding-top:2rem;}"],
  ["scroll-pr-8", ".scroll-pr-8{scroll-padding-right:2rem;}"],
  ["scroll-pb-8", ".scroll-pb-8{scroll-padding-bottom:2rem;}"],
  ["scroll-pl-8", ".scroll-pl-8{scroll-padding-left:2rem;}"],
  ["scroll-p-9", ".scroll-p-9{scroll-padding:2.25rem;}"],
  [
    "scroll-px-9",
    ".scroll-px-9{scroll-padding-left:2.25rem;scroll-padding-right:2.25rem;}",
  ],
  [
    "scroll-py-9",
    ".scroll-py-9{scroll-padding-bottom:2.25rem;scroll-padding-top:2.25rem;}",
  ],
  ["scroll-pt-9", ".scroll-pt-9{scroll-padding-top:2.25rem;}"],
  ["scroll-pr-9", ".scroll-pr-9{scroll-padding-right:2.25rem;}"],
  ["scroll-pb-9", ".scroll-pb-9{scroll-padding-bottom:2.25rem;}"],
  ["scroll-pl-9", ".scroll-pl-9{scroll-padding-left:2.25rem;}"],
  ["scroll-p-10", ".scroll-p-10{scroll-padding:2.5rem;}"],
  [
    "scroll-px-10",
    ".scroll-px-10{scroll-padding-left:2.5rem;scroll-padding-right:2.5rem;}",
  ],
  [
    "scroll-py-10",
    ".scroll-py-10{scroll-padding-bottom:2.5rem;scroll-padding-top:2.5rem;}",
  ],
  ["scroll-pt-10", ".scroll-pt-10{scroll-padding-top:2.5rem;}"],
  ["scroll-pr-10", ".scroll-pr-10{scroll-padding-right:2.5rem;}"],
  ["scroll-pb-10", ".scroll-pb-10{scroll-padding-bottom:2.5rem;}"],
  ["scroll-pl-10", ".scroll-pl-10{scroll-padding-left:2.5rem;}"],
  ["scroll-p-11", ".scroll-p-11{scroll-padding:2.75rem;}"],
  [
    "scroll-px-11",
    ".scroll-px-11{scroll-padding-left:2.75rem;scroll-padding-right:2.75rem;}",
  ],
  [
    "scroll-py-11",
    ".scroll-py-11{scroll-padding-bottom:2.75rem;scroll-padding-top:2.75rem;}",
  ],
  ["scroll-pt-11", ".scroll-pt-11{scroll-padding-top:2.75rem;}"],
  ["scroll-pr-11", ".scroll-pr-11{scroll-padding-right:2.75rem;}"],
  ["scroll-pb-11", ".scroll-pb-11{scroll-padding-bottom:2.75rem;}"],
  ["scroll-pl-11", ".scroll-pl-11{scroll-padding-left:2.75rem;}"],
  ["scroll-p-12", ".scroll-p-12{scroll-padding:3rem;}"],
  [
    "scroll-px-12",
    ".scroll-px-12{scroll-padding-left:3rem;scroll-padding-right:3rem;}",
  ],
  [
    "scroll-py-12",
    ".scroll-py-12{scroll-padding-bottom:3rem;scroll-padding-top:3rem;}",
  ],
  ["scroll-pt-12", ".scroll-pt-12{scroll-padding-top:3rem;}"],
  ["scroll-pr-12", ".scroll-pr-12{scroll-padding-right:3rem;}"],
  ["scroll-pb-12", ".scroll-pb-12{scroll-padding-bottom:3rem;}"],
  ["scroll-pl-12", ".scroll-pl-12{scroll-padding-left:3rem;}"],
  ["scroll-p-14", ".scroll-p-14{scroll-padding:3.5rem;}"],
  [
    "scroll-px-14",
    ".scroll-px-14{scroll-padding-left:3.5rem;scroll-padding-right:3.5rem;}",
  ],
  [
    "scroll-py-14",
    ".scroll-py-14{scroll-padding-bottom:3.5rem;scroll-padding-top:3.5rem;}",
  ],
  ["scroll-pt-14", ".scroll-pt-14{scroll-padding-top:3.5rem;}"],
  ["scroll-pr-14", ".scroll-pr-14{scroll-padding-right:3.5rem;}"],
  ["scroll-pb-14", ".scroll-pb-14{scroll-padding-bottom:3.5rem;}"],
  ["scroll-pl-14", ".scroll-pl-14{scroll-padding-left:3.5rem;}"],
  ["scroll-p-16", ".scroll-p-16{scroll-padding:4rem;}"],
  [
    "scroll-px-16",
    ".scroll-px-16{scroll-padding-left:4rem;scroll-padding-right:4rem;}",
  ],
  [
    "scroll-py-16",
    ".scroll-py-16{scroll-padding-bottom:4rem;scroll-padding-top:4rem;}",
  ],
  ["scroll-pt-16", ".scroll-pt-16{scroll-padding-top:4rem;}"],
  ["scroll-pr-16", ".scroll-pr-16{scroll-padding-right:4rem;}"],
  ["scroll-pb-16", ".scroll-pb-16{scroll-padding-bottom:4rem;}"],
  ["scroll-pl-16", ".scroll-pl-16{scroll-padding-left:4rem;}"],
  ["scroll-p-20", ".scroll-p-20{scroll-padding:5rem;}"],
  [
    "scroll-px-20",
    ".scroll-px-20{scroll-padding-left:5rem;scroll-padding-right:5rem;}",
  ],
  [
    "scroll-py-20",
    ".scroll-py-20{scroll-padding-bottom:5rem;scroll-padding-top:5rem;}",
  ],
  ["scroll-pt-20", ".scroll-pt-20{scroll-padding-top:5rem;}"],
  ["scroll-pr-20", ".scroll-pr-20{scroll-padding-right:5rem;}"],
  ["scroll-pb-20", ".scroll-pb-20{scroll-padding-bottom:5rem;}"],
  ["scroll-pl-20", ".scroll-pl-20{scroll-padding-left:5rem;}"],
  ["scroll-p-24", ".scroll-p-24{scroll-padding:6rem;}"],
  [
    "scroll-px-24",
    ".scroll-px-24{scroll-padding-left:6rem;scroll-padding-right:6rem;}",
  ],
  [
    "scroll-py-24",
    ".scroll-py-24{scroll-padding-bottom:6rem;scroll-padding-top:6rem;}",
  ],
  ["scroll-pt-24", ".scroll-pt-24{scroll-padding-top:6rem;}"],
  ["scroll-pr-24", ".scroll-pr-24{scroll-padding-right:6rem;}"],
  ["scroll-pb-24", ".scroll-pb-24{scroll-padding-bottom:6rem;}"],
  ["scroll-pl-24", ".scroll-pl-24{scroll-padding-left:6rem;}"],
  ["scroll-p-28", ".scroll-p-28{scroll-padding:7rem;}"],
  [
    "scroll-px-28",
    ".scroll-px-28{scroll-padding-left:7rem;scroll-padding-right:7rem;}",
  ],
  [
    "scroll-py-28",
    ".scroll-py-28{scroll-padding-bottom:7rem;scroll-padding-top:7rem;}",
  ],
  ["scroll-pt-28", ".scroll-pt-28{scroll-padding-top:7rem;}"],
  ["scroll-pr-28", ".scroll-pr-28{scroll-padding-right:7rem;}"],
  ["scroll-pb-28", ".scroll-pb-28{scroll-padding-bottom:7rem;}"],
  ["scroll-pl-28", ".scroll-pl-28{scroll-padding-left:7rem;}"],
  ["scroll-p-32", ".scroll-p-32{scroll-padding:8rem;}"],
  [
    "scroll-px-32",
    ".scroll-px-32{scroll-padding-left:8rem;scroll-padding-right:8rem;}",
  ],
  [
    "scroll-py-32",
    ".scroll-py-32{scroll-padding-bottom:8rem;scroll-padding-top:8rem;}",
  ],
  ["scroll-pt-32", ".scroll-pt-32{scroll-padding-top:8rem;}"],
  ["scroll-pr-32", ".scroll-pr-32{scroll-padding-right:8rem;}"],
  ["scroll-pb-32", ".scroll-pb-32{scroll-padding-bottom:8rem;}"],
  ["scroll-pl-32", ".scroll-pl-32{scroll-padding-left:8rem;}"],
  ["scroll-p-36", ".scroll-p-36{scroll-padding:9rem;}"],
  [
    "scroll-px-36",
    ".scroll-px-36{scroll-padding-left:9rem;scroll-padding-right:9rem;}",
  ],
  [
    "scroll-py-36",
    ".scroll-py-36{scroll-padding-bottom:9rem;scroll-padding-top:9rem;}",
  ],
  ["scroll-pt-36", ".scroll-pt-36{scroll-padding-top:9rem;}"],
  ["scroll-pr-36", ".scroll-pr-36{scroll-padding-right:9rem;}"],
  ["scroll-pb-36", ".scroll-pb-36{scroll-padding-bottom:9rem;}"],
  ["scroll-pl-36", ".scroll-pl-36{scroll-padding-left:9rem;}"],
  ["scroll-p-40", ".scroll-p-40{scroll-padding:10rem;}"],
  [
    "scroll-px-40",
    ".scroll-px-40{scroll-padding-left:10rem;scroll-padding-right:10rem;}",
  ],
  [
    "scroll-py-40",
    ".scroll-py-40{scroll-padding-bottom:10rem;scroll-padding-top:10rem;}",
  ],
  ["scroll-pt-40", ".scroll-pt-40{scroll-padding-top:10rem;}"],
  ["scroll-pr-40", ".scroll-pr-40{scroll-padding-right:10rem;}"],
  ["scroll-pb-40", ".scroll-pb-40{scroll-padding-bottom:10rem;}"],
  ["scroll-pl-40", ".scroll-pl-40{scroll-padding-left:10rem;}"],
  ["scroll-p-44", ".scroll-p-44{scroll-padding:11rem;}"],
  [
    "scroll-px-44",
    ".scroll-px-44{scroll-padding-left:11rem;scroll-padding-right:11rem;}",
  ],
  [
    "scroll-py-44",
    ".scroll-py-44{scroll-padding-bottom:11rem;scroll-padding-top:11rem;}",
  ],
  ["scroll-pt-44", ".scroll-pt-44{scroll-padding-top:11rem;}"],
  ["scroll-pr-44", ".scroll-pr-44{scroll-padding-right:11rem;}"],
  ["scroll-pb-44", ".scroll-pb-44{scroll-padding-bottom:11rem;}"],
  ["scroll-pl-44", ".scroll-pl-44{scroll-padding-left:11rem;}"],
  ["scroll-p-48", ".scroll-p-48{scroll-padding:12rem;}"],
  [
    "scroll-px-48",
    ".scroll-px-48{scroll-padding-left:12rem;scroll-padding-right:12rem;}",
  ],
  [
    "scroll-py-48",
    ".scroll-py-48{scroll-padding-bottom:12rem;scroll-padding-top:12rem;}",
  ],
  ["scroll-pt-48", ".scroll-pt-48{scroll-padding-top:12rem;}"],
  ["scroll-pr-48", ".scroll-pr-48{scroll-padding-right:12rem;}"],
  ["scroll-pb-48", ".scroll-pb-48{scroll-padding-bottom:12rem;}"],
  ["scroll-pl-48", ".scroll-pl-48{scroll-padding-left:12rem;}"],
  ["scroll-p-52", ".scroll-p-52{scroll-padding:13rem;}"],
  [
    "scroll-px-52",
    ".scroll-px-52{scroll-padding-left:13rem;scroll-padding-right:13rem;}",
  ],
  [
    "scroll-py-52",
    ".scroll-py-52{scroll-padding-bottom:13rem;scroll-padding-top:13rem;}",
  ],
  ["scroll-pt-52", ".scroll-pt-52{scroll-padding-top:13rem;}"],
  ["scroll-pr-52", ".scroll-pr-52{scroll-padding-right:13rem;}"],
  ["scroll-pb-52", ".scroll-pb-52{scroll-padding-bottom:13rem;}"],
  ["scroll-pl-52", ".scroll-pl-52{scroll-padding-left:13rem;}"],
  ["scroll-p-56", ".scroll-p-56{scroll-padding:14rem;}"],
  [
    "scroll-px-56",
    ".scroll-px-56{scroll-padding-left:14rem;scroll-padding-right:14rem;}",
  ],
  [
    "scroll-py-56",
    ".scroll-py-56{scroll-padding-bottom:14rem;scroll-padding-top:14rem;}",
  ],
  ["scroll-pt-56", ".scroll-pt-56{scroll-padding-top:14rem;}"],
  ["scroll-pr-56", ".scroll-pr-56{scroll-padding-right:14rem;}"],
  ["scroll-pb-56", ".scroll-pb-56{scroll-padding-bottom:14rem;}"],
  ["scroll-pl-56", ".scroll-pl-56{scroll-padding-left:14rem;}"],
  ["scroll-p-60", ".scroll-p-60{scroll-padding:15rem;}"],
  [
    "scroll-px-60",
    ".scroll-px-60{scroll-padding-left:15rem;scroll-padding-right:15rem;}",
  ],
  [
    "scroll-py-60",
    ".scroll-py-60{scroll-padding-bottom:15rem;scroll-padding-top:15rem;}",
  ],
  ["scroll-pt-60", ".scroll-pt-60{scroll-padding-top:15rem;}"],
  ["scroll-pr-60", ".scroll-pr-60{scroll-padding-right:15rem;}"],
  ["scroll-pb-60", ".scroll-pb-60{scroll-padding-bottom:15rem;}"],
  ["scroll-pl-60", ".scroll-pl-60{scroll-padding-left:15rem;}"],
  ["scroll-p-64", ".scroll-p-64{scroll-padding:16rem;}"],
  [
    "scroll-px-64",
    ".scroll-px-64{scroll-padding-left:16rem;scroll-padding-right:16rem;}",
  ],
  [
    "scroll-py-64",
    ".scroll-py-64{scroll-padding-bottom:16rem;scroll-padding-top:16rem;}",
  ],
  ["scroll-pt-64", ".scroll-pt-64{scroll-padding-top:16rem;}"],
  ["scroll-pr-64", ".scroll-pr-64{scroll-padding-right:16rem;}"],
  ["scroll-pb-64", ".scroll-pb-64{scroll-padding-bottom:16rem;}"],
  ["scroll-pl-64", ".scroll-pl-64{scroll-padding-left:16rem;}"],
  ["scroll-p-72", ".scroll-p-72{scroll-padding:18rem;}"],
  [
    "scroll-px-72",
    ".scroll-px-72{scroll-padding-left:18rem;scroll-padding-right:18rem;}",
  ],
  [
    "scroll-py-72",
    ".scroll-py-72{scroll-padding-bottom:18rem;scroll-padding-top:18rem;}",
  ],
  ["scroll-pt-72", ".scroll-pt-72{scroll-padding-top:18rem;}"],
  ["scroll-pr-72", ".scroll-pr-72{scroll-padding-right:18rem;}"],
  ["scroll-pb-72", ".scroll-pb-72{scroll-padding-bottom:18rem;}"],
  ["scroll-pl-72", ".scroll-pl-72{scroll-padding-left:18rem;}"],
  ["scroll-p-80", ".scroll-p-80{scroll-padding:20rem;}"],
  [
    "scroll-px-80",
    ".scroll-px-80{scroll-padding-left:20rem;scroll-padding-right:20rem;}",
  ],
  [
    "scroll-py-80",
    ".scroll-py-80{scroll-padding-bottom:20rem;scroll-padding-top:20rem;}",
  ],
  ["scroll-pt-80", ".scroll-pt-80{scroll-padding-top:20rem;}"],
  ["scroll-pr-80", ".scroll-pr-80{scroll-padding-right:20rem;}"],
  ["scroll-pb-80", ".scroll-pb-80{scroll-padding-bottom:20rem;}"],
  ["scroll-pl-80", ".scroll-pl-80{scroll-padding-left:20rem;}"],
  ["scroll-p-96", ".scroll-p-96{scroll-padding:24rem;}"],
  [
    "scroll-px-96",
    ".scroll-px-96{scroll-padding-left:24rem;scroll-padding-right:24rem;}",
  ],
  [
    "scroll-py-96",
    ".scroll-py-96{scroll-padding-bottom:24rem;scroll-padding-top:24rem;}",
  ],
  ["scroll-pt-96", ".scroll-pt-96{scroll-padding-top:24rem;}"],
  ["scroll-pr-96", ".scroll-pr-96{scroll-padding-right:24rem;}"],
  ["scroll-pb-96", ".scroll-pb-96{scroll-padding-bottom:24rem;}"],
  ["scroll-pl-96", ".scroll-pl-96{scroll-padding-left:24rem;}"],
  ["scroll-p-0.5", ".scroll-p-0\\.5{scroll-padding:0.125rem;}"],
  [
    "scroll-px-0.5",
    ".scroll-px-0\\.5{scroll-padding-left:0.125rem;scroll-padding-right:0.125rem;}",
  ],
  [
    "scroll-py-0.5",
    ".scroll-py-0\\.5{scroll-padding-bottom:0.125rem;scroll-padding-top:0.125rem;}",
  ],
  ["scroll-pt-0.5", ".scroll-pt-0\\.5{scroll-padding-top:0.125rem;}"],
  ["scroll-pr-0.5", ".scroll-pr-0\\.5{scroll-padding-right:0.125rem;}"],
  ["scroll-pb-0.5", ".scroll-pb-0\\.5{scroll-padding-bottom:0.125rem;}"],
  ["scroll-pl-0.5", ".scroll-pl-0\\.5{scroll-padding-left:0.125rem;}"],
  ["scroll-p-1.5", ".scroll-p-1\\.5{scroll-padding:0.375rem;}"],
  [
    "scroll-px-1.5",
    ".scroll-px-1\\.5{scroll-padding-left:0.375rem;scroll-padding-right:0.375rem;}",
  ],
  [
    "scroll-py-1.5",
    ".scroll-py-1\\.5{scroll-padding-bottom:0.375rem;scroll-padding-top:0.375rem;}",
  ],
  ["scroll-pt-1.5", ".scroll-pt-1\\.5{scroll-padding-top:0.375rem;}"],
  ["scroll-pr-1.5", ".scroll-pr-1\\.5{scroll-padding-right:0.375rem;}"],
  ["scroll-pb-1.5", ".scroll-pb-1\\.5{scroll-padding-bottom:0.375rem;}"],
  ["scroll-pl-1.5", ".scroll-pl-1\\.5{scroll-padding-left:0.375rem;}"],
  ["scroll-p-2.5", ".scroll-p-2\\.5{scroll-padding:0.625rem;}"],
  [
    "scroll-px-2.5",
    ".scroll-px-2\\.5{scroll-padding-left:0.625rem;scroll-padding-right:0.625rem;}",
  ],
  [
    "scroll-py-2.5",
    ".scroll-py-2\\.5{scroll-padding-bottom:0.625rem;scroll-padding-top:0.625rem;}",
  ],
  ["scroll-pt-2.5", ".scroll-pt-2\\.5{scroll-padding-top:0.625rem;}"],
  ["scroll-pr-2.5", ".scroll-pr-2\\.5{scroll-padding-right:0.625rem;}"],
  ["scroll-pb-2.5", ".scroll-pb-2\\.5{scroll-padding-bottom:0.625rem;}"],
  ["scroll-pl-2.5", ".scroll-pl-2\\.5{scroll-padding-left:0.625rem;}"],
  ["scroll-p-3.5", ".scroll-p-3\\.5{scroll-padding:0.875rem;}"],
  [
    "scroll-px-3.5",
    ".scroll-px-3\\.5{scroll-padding-left:0.875rem;scroll-padding-right:0.875rem;}",
  ],
  [
    "scroll-py-3.5",
    ".scroll-py-3\\.5{scroll-padding-bottom:0.875rem;scroll-padding-top:0.875rem;}",
  ],
  ["scroll-pt-3.5", ".scroll-pt-3\\.5{scroll-padding-top:0.875rem;}"],
  ["scroll-pr-3.5", ".scroll-pr-3\\.5{scroll-padding-right:0.875rem;}"],
  ["scroll-pb-3.5", ".scroll-pb-3\\.5{scroll-padding-bottom:0.875rem;}"],
  ["scroll-pl-3.5", ".scroll-pl-3\\.5{scroll-padding-left:0.875rem;}"],
  ["snap-start", ".snap-start{scroll-snap-align:start;}"],
  ["snap-end", ".snap-end{scroll-snap-align:end;}"],
  ["snap-center", ".snap-center{scroll-snap-align:center;}"],
  ["snap-align-none", ".snap-align-none{scroll-snap-align:none;}"],
  ["snap-normal", ".snap-normal{scroll-snap-stop:normal;}"],
  ["snap-always", ".snap-always{scroll-snap-stop:always;}"],
  ["snap-none", ".snap-none{scroll-snap-type:none;}"],
  ["snap-x", ".snap-x{scroll-snap-type:x var(--map-scroll-snap-strictness);}"],
  ["snap-y", ".snap-y{scroll-snap-type:y var(--map-scroll-snap-strictness);}"],
  [
    "snap-both",
    ".snap-both{scroll-snap-type:both var(--map-scroll-snap-strictness);}",
  ],
  [
    "snap-mandatory",
    ".snap-mandatory{--map-scroll-snap-strictness:mandatory;}",
  ],
  [
    "snap-proximity",
    ".snap-proximity{--map-scroll-snap-strictness:proximity;}",
  ],
  ["touch-auto", ".touch-auto{touch-action:auto;}"],
  ["touch-none", ".touch-none{touch-action:none;}"],
  ["touch-manipulation", ".touch-manipulation{touch-action:manipulation;}"],
  ["touch-pan-x", ".touch-pan-x{touch-action:pan-x;}"],
  ["touch-pan-left", ".touch-pan-left{touch-action:pan-left;}"],
  ["touch-pan-right", ".touch-pan-right{touch-action:pan-right;}"],
  ["touch-pan-y", ".touch-pan-y{touch-action:pan-y;}"],
  ["touch-pan-up", ".touch-pan-up{touch-action:pan-up;}"],
  ["touch-pan-down", ".touch-pan-down{touch-action:pan-down;}"],
  ["touch-pinch-zoom", ".touch-pinch-zoom{touch-action:pinch-zoom;}"],
  ["select-none", ".select-none{user-select:none;}"],
  ["select-text", ".select-text{user-select:text;}"],
  ["select-all", ".select-all{user-select:all;}"],
  ["select-auto", ".select-auto{user-select:auto;}"],
  ["will-change-auto", ".will-change-auto{will-change:auto;}"],
  ["will-change-scroll", ".will-change-scroll{will-change:scroll-position;}"],
  ["will-change-contents", ".will-change-contents{will-change:contents;}"],
  ["will-change-transform", ".will-change-transform{will-change:transform;}"],
  ["stroke-0", ".stroke-0{stroke-width:0;}"],
  ["stroke-1", ".stroke-1{stroke-width:1;}"],
  ["stroke-2", ".stroke-2{stroke-width:2;}"],
  [
    "sr-only",
    ".sr-only{border-width:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px;}",
  ],
  [
    "not-sr-only",
    ".not-sr-only{clip:auto;height:auto;margin:0;overflow:visible;padding:0;position:static;white-space:normal;width:auto;}",
  ],
  ["dark:block", ".dark .dark\\:block{display:block;}"],
  ["hover:block", ".hover\\:block:hover{display:block;}"],
  ["focus:block", ".focus\\:block:focus{display:block;}"],
  ["!w-1", ".\\!w-1{width:0.25rem !important;}"],
  ["-w-1", ".-w-1{width:-0.25rem;}"],
  ["scrollbar:w-1", ".scrollbar\\:w-1::-webkit-scrollbar{width:0.25rem;}"],
  [
    "scrollbar:!w-1",
    ".scrollbar\\:\\!w-1::-webkit-scrollbar{width:0.25rem !important;}",
  ],
  [
    "scrollbar-track:rounded",
    ".scrollbar-track\\:rounded::-webkit-scrollbar-track{border-radius:0.25rem;}",
  ],
  [
    "scrollbar-thumb:rounded",
    ".scrollbar-thumb\\:rounded::-webkit-scrollbar-thumb{border-radius:0.25rem;}",
  ],
];

const config = { presets: [presetTw()] };

test("presetTw", () => {
  expects.forEach(([className, result]) => {
    expect(generate(config, new Set([className])).css).toBe(
      result,
    );
  });
});
