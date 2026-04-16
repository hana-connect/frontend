import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";
import type { AccountType } from "@/common/types/account";

type AddKidAccountRequest = {
  nickname: string;
  accountNumber: string;
};

type AddKidAccountData = {
  kidName: string;
  accountNumber: string;
  accountType: AccountType;
  requestDate: string;
};

export async function addKidAccount(kidId: string, body: AddKidAccountRequest) {
  return apiClient.post<ApiResponse<AddKidAccountData>>(
    `/api/kids/${kidId}/accounts`,
    body,
  );
}
