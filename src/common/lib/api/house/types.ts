import type { HistoryItem } from "@/app/(app)/house/_components/ReportHistory";
import type { ApiResponse } from "../types";

export type HouseStatusResponse = ApiResponse<{
  memberId: number;
  kidName: string;
  level: number;
  gauge: number;
  totalCount: number | null;
  monthlyPayment: number | null;
  startDate: string | null;
  message: string | null;
}>;

export type HouseHistoryResponse = ApiResponse<{ histories: HistoryItem[] }>;
