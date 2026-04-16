import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTodayDateKST = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  })
    .format(now)
    .replace(/\s/g, "")
    .replace(/\.$/, "");
};

export function formatMoney(value: number | string) {
  const num =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d]/g, ""));

  return `${num.toLocaleString("ko-KR")}원`;
}

export const formatAssetUnit = (amount: number): string => {
  const eok = Math.floor(amount / 100000000);
  const man = Math.floor((amount % 100000000) / 10000);
  if (eok > 0) return `${eok}억 ${man.toLocaleString("ko-KR")}만원`;
  return `${man.toLocaleString("ko-KR")}만원`;
};

function hasJongseong(word: string) {
  const trimmedWord = word.trim();

  if (!trimmedWord) {
    return false;
  }

  const lastChar = trimmedWord[trimmedWord.length - 1];
  const code = lastChar.charCodeAt(0);

  const HANGUL_BASE = 0xac00;
  const HANGUL_LAST = 0xd7a3;

  if (code < HANGUL_BASE || code > HANGUL_LAST) {
    return false;
  }

  return (code - HANGUL_BASE) % 28 !== 0;
}

export function getSubjectParticle(word: string) {
  return hasJongseong(word) ? "이" : "가";
}
