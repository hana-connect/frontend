export type UserRole = "KID" | "PARENT";

export type AccountType =
  | "FREE"
  | "DEPOSIT"
  | "SAVINGS"
  | "SUBSCRIPTION"
  | "PENSION";

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
