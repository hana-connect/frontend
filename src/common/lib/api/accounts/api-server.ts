import { SpringApiError, serverSpringFetch } from "../server-spring-fetch";
import type { ApiResponse } from "../types";
import type { AccountItem, RewardAccount } from "./types";

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
