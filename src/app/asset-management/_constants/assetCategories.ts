import type { AccountType } from "../_types/asset";

export const ASSET_COLORS = {
  예적금: "#F06565",
  입출금: "#FFC145",
  투자: "#81D4FA",
  연금: "#7E8EF1",
};

export const ASSET_NAMES: Record<AccountType, string> = {
  예금: "예·적금",
  적금: "예·적금",
  입출금: "입출금",
  투자: "투자",
  청약: "투자",
  연금: "연금",
};
