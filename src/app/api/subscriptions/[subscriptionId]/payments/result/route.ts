import { NextResponse } from "next/server";
import type { SubscriptionPaymentExecuteResponse } from "@/app/api/subscriptions/type";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";

type RouteContext = {
  params: Promise<{
    subscriptionId: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { subscriptionId } = await params;
    const subscriptionIdNumber = Number(subscriptionId);

    if (
      !subscriptionId ||
      !Number.isInteger(subscriptionIdNumber) ||
      subscriptionIdNumber <= 0
    ) {
      return NextResponse.json(
        { message: "유효한 subscriptionId가 필요합니다." },
        { status: 400 },
      );
    }

    const data = await serverSpringFetch<
      ApiResponse<SubscriptionPaymentExecuteResponse>
    >(`/api/subscriptions/${subscriptionIdNumber}/payments/result`, {
      method: "GET",
      cache: "no-store",
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof SpringApiError) {
      return NextResponse.json(
        { message: error.message, data: error.data ?? null },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
