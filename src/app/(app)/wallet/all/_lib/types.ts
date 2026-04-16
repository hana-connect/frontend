import type { ApiResponse } from "@/common/lib/api/types";
import type { AccountType } from "../../(main)/_types";

export type AccountItem = {
  accountId: number;
  name: string;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  createdAt: string;
};

export type RewardAccount = {
  accountId: number;
  name: string;
  accountNumber: string;
};

export type PatchRewardAccountResponse = ApiResponse<{
  accountId: number;
  name: string;
  accountNumber: string;
}>;
