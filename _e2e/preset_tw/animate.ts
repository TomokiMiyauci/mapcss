export const animate: [string, string][] = [
  ["animate-none", ".animate-none{animation:none}"],
  [
    "animate-spin",
    ".animate-spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}",
  ],
  [
    "animate-ping",
    ".animate-ping{animation:ping 1s cubic-bezier(0,0,0.2,1) infinite}@keyframes ping{75%,100%{opacity:0;transform:scale(2)}}",
  ],
  [
    "animate-pulse",
    ".animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}@keyframes pulse{50%{opacity:0.5}}",
  ],
  [
    "animate-bounce",
    ".animate-bounce{animation:bounce 1s infinite}@keyframes bounce{0%,100%{animation-timing-function:cubic-bezier(0.8,0,1,1);transform:translateY(-25%)}50%{animation-timing-function:cubic-bezier(0,0,0.2,1);transform:none}}",
  ],
  [
    "animate-[wiggle_1s_ease-in-out_infinite]",
    ".animate-\\[wiggle_1s_ease-in-out_infinite\\]{animation:wiggle 1s ease-in-out infinite}",
  ],
];
