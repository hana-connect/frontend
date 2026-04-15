export type UserRole = "KID" | "PARENT";

export type Account = {
  id: number;
  name: string;
  number: string;
  balance: number;
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
