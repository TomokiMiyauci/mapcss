import { expect, test } from "../dev_deps.ts";
import {
  generate,
  mapperMap,
  modifierMap,
  theme,
  twBasicSyntax,
} from "../mod.ts";

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
  ["top-1/3", ".top-1\\/3{top:33.33333333333333%;}"],
  ["top-2/3", ".top-2\\/3{top:66.66666666666666%;}"],
  ["top-1/4", ".top-1\\/4{top:25%;}"],
  ["top-2/4", ".top-2\\/4{top:50%;}"],
  ["top-3/4", ".top-3\\/4{top:75%;}"],
  ["right-1/2", ".right-1\\/2{right:50%;}"],
  ["right-1/3", ".right-1\\/3{right:33.33333333333333%;}"],
  ["right-2/3", ".right-2\\/3{right:66.66666666666666%;}"],
  ["right-1/4", ".right-1\\/4{right:25%;}"],
  ["right-2/4", ".right-2\\/4{right:50%;}"],
  ["right-3/4", ".right-3\\/4{right:75%;}"],
  ["bottom-1/2", ".bottom-1\\/2{bottom:50%;}"],
  ["bottom-1/3", ".bottom-1\\/3{bottom:33.33333333333333%;}"],
  ["bottom-2/3", ".bottom-2\\/3{bottom:66.66666666666666%;}"],
  ["bottom-1/4", ".bottom-1\\/4{bottom:25%;}"],
  ["bottom-2/4", ".bottom-2\\/4{bottom:50%;}"],
  ["bottom-3/4", ".bottom-3\\/4{bottom:75%;}"],
  ["left-1/2", ".left-1\\/2{left:50%;}"],
  ["left-1/3", ".left-1\\/3{left:33.33333333333333%;}"],
  ["left-2/3", ".left-2\\/3{left:66.66666666666666%;}"],
  ["left-1/4", ".left-1\\/4{left:25%;}"],
  ["left-2/4", ".left-2\\/4{left:50%;}"],
  ["left-3/4", ".left-3\\/4{left:75%;}"],
  ["inset-1/2", ".inset-1\\/2{bottom:50%;left:50%;right:50%;top:50%;}"],
  [
    "inset-1/3",
    ".inset-1\\/3{bottom:33.33333333333333%;left:33.33333333333333%;right:33.33333333333333%;top:33.33333333333333%;}",
  ],
  [
    "inset-2/3",
    ".inset-2\\/3{bottom:66.66666666666666%;left:66.66666666666666%;right:66.66666666666666%;top:66.66666666666666%;}",
  ],
  ["inset-1/4", ".inset-1\\/4{bottom:25%;left:25%;right:25%;top:25%;}"],
  ["inset-2/4", ".inset-2\\/4{bottom:50%;left:50%;right:50%;top:50%;}"],
  ["inset-3/4", ".inset-3\\/4{bottom:75%;left:75%;right:75%;top:75%;}"],
  ["inset-x-1/2", ".inset-x-1\\/2{left:50%;right:50%;}"],
  [
    "inset-x-1/3",
    ".inset-x-1\\/3{left:33.33333333333333%;right:33.33333333333333%;}",
  ],
  [
    "inset-x-2/3",
    ".inset-x-2\\/3{left:66.66666666666666%;right:66.66666666666666%;}",
  ],
  ["inset-x-1/4", ".inset-x-1\\/4{left:25%;right:25%;}"],
  ["inset-x-2/4", ".inset-x-2\\/4{left:50%;right:50%;}"],
  ["inset-x-3/4", ".inset-x-3\\/4{left:75%;right:75%;}"],
  ["inset-y-1/2", ".inset-y-1\\/2{bottom:50%;top:50%;}"],
  [
    "inset-y-1/3",
    ".inset-y-1\\/3{bottom:33.33333333333333%;top:33.33333333333333%;}",
  ],
  [
    "inset-y-2/3",
    ".inset-y-2\\/3{bottom:66.66666666666666%;top:66.66666666666666%;}",
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
];

const config = { theme, mapperMap, modifierMap, syntaxes: [twBasicSyntax] };

test("presetTw", () => {
  expects.forEach(([className, result]) => {
    expect(generate(config, new Set([className])).css).toBe(
      result,
    );
  });
});
