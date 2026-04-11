import type { AccountType } from "../_types/asset";

export const ASSET_COLORS = {
  예적금: "#F06565", // 빨강
  입출금: "#FFC145", // 노랑
  투자: "#81D4FA", // 하늘색
  연금: "#7E8EF1", // 보라색
};

// AccountType의 모든 항목("입출금" | "예금" | "적금" | "청약" | "연금" | "투자")을 다 적어줘야 에러가 안 나요!
export const ASSET_NAMES: Record<AccountType, string> = {
  예금: "예·적금",
  적금: "예·적금", // 적금도 예적금 라벨로 표시
  입출금: "입출금",
  투자: "투자",
  청약: "투자", // 청약도 투자 라벨로 표시
  연금: "연금",
};
