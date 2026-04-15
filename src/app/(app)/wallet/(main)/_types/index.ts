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
  id: number;
  name: string;
  number: string;
};
