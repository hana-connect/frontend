import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
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

export async function getAccounts() {
  const res =
    await serverSpringFetch<ApiResponse<AccountItem[]>>("/api/accounts/me");
  return res.data;
}

export async function getRewardAccount() {
  try {
    const res = await serverSpringFetch<ApiResponse<RewardAccount>>(
      "/api/accounts/reward",
    );
    return res.data;
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
