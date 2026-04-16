import { apiClient } from "../api-client";
import type { ApiResponse } from "../types";
import type {
  LinkAccountData,
  LinkAccountRequest,
  PatchRewardAccountResponse,
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
