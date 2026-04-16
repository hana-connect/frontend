import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";
import type { AccountType } from "@/common/types/account";

type VerifyAccountRequest = {
  accountNumber: string;
};

type VerifyAccountData = {
  accountNumber: string;
  accountType: AccountType;
};

type LinkAccountRequest = {
  accountNumber: string;
  accountPassword: string;
};

type LinkAccountData = {
  accountNumber: string;
  linkedAt: string;
};

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
