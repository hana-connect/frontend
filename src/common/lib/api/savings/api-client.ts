import type { RelayData } from "../accounts/types";
import { apiClient } from "../api-client";
import type { ApiResponse } from "../types";

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

export async function getRecentRelayMessages(
  targetAccountId: number,
): Promise<RelayData> {
  const query = new URLSearchParams({
    targetAccountId: targetAccountId.toString(),
  });

  const res = await apiClient.get<ApiResponse<RelayData>>(
    `/api/transfer/savings/relay/recent?${query.toString()}`,
  );

  return res.data;
}
