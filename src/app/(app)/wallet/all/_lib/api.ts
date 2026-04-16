import { apiClient } from "@/common/lib/api/api-client";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import type {
  AccountItem,
  PatchRewardAccountResponse,
  RewardAccount,
} from "./types";

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

export async function updateRewardAccount(accountId: number) {
  return apiClient.patch<PatchRewardAccountResponse>(
    `/api/accounts/reward/${accountId}`,
  );
}
