export type { AccountType } from "@/common/types/account";
export type { UserRole } from "@/common/types/user";

import type { AccountType } from "@/common/types/account";

export type Account = {
  accountId: number;
  name: string;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
};

export type MainAccountInfo = {
  bankName: string;
  accountNumber: string;
};

export type SavingMailbox = {
  accountId: number;
  name: string;
  number: string;
};

export type KidLinkedAccount = {
  accountId: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  linkedAccountId: number;
  name: string;
  nickname: string | null;
};

export type KidInfo = {
  id: number;
  name: string;
  imageSrc: string;
  monthlyAllowance: number;
  walletBalanceText: string;
  regularAllowanceText: string;
  allowancePlanText: string;
  accounts: KidLinkedAccount[];
};
