export type AccountType = "입출금" | "예금" | "적금" | "청약" | "연금" | "투자";

export type Account = {
  id: number;
  name: string;
  account_number: string;
  account_type: AccountType;
  balance: number;
  nickname: string | null;
  is_reward: boolean | null;
  is_end: boolean | null;
  member_id: number;
};

export type AssetData = {
  savings: number; // 예적금 합계
  checking: number; // 입출금 합계
  investment: number; // 투자/청약 합계 (투자 항목 추가 반영)
  pension: number; // 연금 합계 (추가됨!)
  total: number; // 전체 자산 합계
  changeRate: number; // 자산 변화율 (%)
};
