import type {
  AddKidAccountData,
  AddKidAccountRequest,
} from "@/common/lib/api/accounts/types";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export async function addKidAccount(kidId: string, body: AddKidAccountRequest) {
  return apiClient.post<ApiResponse<AddKidAccountData>>(
    `/api/kids/${kidId}/accounts`,
    body,
  );
}
