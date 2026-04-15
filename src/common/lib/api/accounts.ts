import { apiClient } from "@/common/lib/api/api-client";

type VerifyAccountRequest = {
  accountNumber: string;
};

type VerifyAccountResponse = {
  status: number;
  data: {
    accountNumber: string;
  };
  message: string;
};

type LinkAccountRequest = {
  accountNumber: string;
  accountPassword: string;
};

type LinkAccountResponse = {
  status: number;
  data: {
    accountNumber: string;
    linkedAt: string;
  };
  message: string;
};

export async function verifyAccount(body: VerifyAccountRequest) {
  return apiClient.post<VerifyAccountResponse>("/api/accounts/verify", body);
}

export async function linkAccount(body: LinkAccountRequest) {
  return apiClient.post<LinkAccountResponse>("/api/accounts/link", body);
}
