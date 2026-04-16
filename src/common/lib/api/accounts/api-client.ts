import { apiClient } from "../api-client";
import type { ApiResponse } from "../types";
import type {
  LinkAccountData,
  LinkAccountRequest,
  PatchRewardAccountResponse,
  RelayData,
  VerifyAccountData,
  VerifyAccountRequest,
} from "./types";

export async function verifyAccount(body: VerifyAccountRequest) {
  return apiClient.post<ApiResponse<VerifyAccountData>>(
    "/api/accounts/verify",
    body,
  );
}

export async function linkAccount(body: LinkAccountRequest) {
  return apiClient.post<ApiResponse<LinkAccountData>>(
    "/api/accounts/link",
    body,
  );
}

export async function updateRewardAccount(accountId: number) {
  return apiClient.patch<PatchRewardAccountResponse>(
    `/api/accounts/reward/${accountId}`,
  );
}

export async function getRelayHistory(
  targetAccountId: number,
  page: number,
): Promise<RelayData> {
  const query = new URLSearchParams({
    targetAccountId: targetAccountId.toString(),
    page: page.toString(),
  });

  const res = await apiClient.get<ApiResponse<RelayData>>(
    `/api/transfer/savings/relay?${query.toString()}`,
  );

  return res.data;
}
