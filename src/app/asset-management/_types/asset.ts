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
  savings: number;
  checking: number;
  investment: number;
  pension: number;
  total: number;
  changeRate: number;
};
