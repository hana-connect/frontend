import type { HistoryItem } from "../_components/ReportHistory";

export const DUMMY_HISTORIES: HistoryItem[] = [
  {
    year: 2028,
    level: 3,
    totalCount: 24,
    paidAt: "2028-03-12",
    isFirst: false,
    reward: "벽 1개, 문 추가",
  },
  {
    year: 2027,
    level: 2,
    totalCount: 12,
    paidAt: "2027-03-12",
    isFirst: false,
    reward: "벽돌 4개 추가",
  },
  {
    year: 2026,
    level: 1,
    totalCount: 1,
    paidAt: "2026-03-01",
    isFirst: true,
    reward: "나무 심기",
  },
];
