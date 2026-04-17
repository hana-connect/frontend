import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { HouseHistoryResponse, HouseStatusResponse } from "./types";

export async function getHouseStatus(kidId?: string, paidAt?: string) {
  try {
    const params = new URLSearchParams();
    if (kidId) params.set("kidId", kidId);
    if (paidAt) params.set("paidAt", paidAt);

    const query = params.toString();
    const endpoint = query ? `/api/house/status?${query}` : "/api/house/status";

    const res = await serverSpringFetch<HouseStatusResponse>(endpoint, {
      method: "GET",
      next: { tags: ["house-status"], revalidate: 3600 },
    });
    return res.data;
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getHouseHistory(kidId?: string, paidAt?: string) {
  try {
    const params = new URLSearchParams();
    if (kidId) params.set("kidId", kidId);
    if (paidAt) params.set("paidAt", paidAt);

    const query = params.toString();
    const endpoint = query
      ? `/api/house/history?${query}`
      : "/api/house/history";

    const res = await serverSpringFetch<HouseHistoryResponse>(endpoint, {
      method: "GET",
      next: { tags: ["house-history"], revalidate: 3600 },
    });
    return res.data;
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 404) {
      return { histories: [] };
    }
    throw error;
  }
}
