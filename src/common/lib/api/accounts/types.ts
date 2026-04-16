import type { AccountType } from "@/common/types/account";
import type { ApiResponse } from "../types";

export type VerifyAccountRequest = {
  accountNumber: string;
};

export type VerifyAccountData = {
  accountNumber: string;
  accountType: AccountType;
};

export type LinkAccountRequest = {
  accountNumber: string;
  accountPassword: string;
};

export type LinkAccountData = {
  accountNumber: string;
  linkedAt: string;
};

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

export type RelayData = {
  productNickname: string;
  accountNumber: string;
  history: {
    letterId: number;
    date: string;
    amount: number;
    message: string;
  }[];
  isLast: boolean;
};
