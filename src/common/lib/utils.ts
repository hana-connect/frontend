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

export function formatMoney(value: number) {
  return `${value.toLocaleString()}원`;
}
