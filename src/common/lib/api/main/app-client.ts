import { apiClient } from "../api-client";
import type { ApiResponse } from "../types";

export type KidAccount = {
  accountId: number;
  accountNumber: string;
  accountType:
    | "DEPOSIT"
    | "FREE"
    | "INVESTMENT"
    | "PENSION"
    | "SAVINGS"
    | "SUBSCRIPTION";
  balance: number;
  linkedAccountId: number;
  name: string;
  nickname: string;
};

export type KidDetail = {
  kidId: number;
  kidName: string;
  walletMoney: number;
  accounts: KidAccount[];
};

export async function getKidLinkedAccounts(kidId: number): Promise<KidDetail> {
  const res = await apiClient.get<ApiResponse<KidDetail>>(
    `/api/kids/${kidId}/linked-accounts`,
  );
  return res.data;
}
