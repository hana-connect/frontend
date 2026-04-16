import { redirect } from "next/navigation";
import type { SubscriptionPaymentInfoResponse } from "@/app/api/subscriptions/type";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";

type SubscriptionPageProps = {
  searchParams: Promise<{
    subscriptionId?: string;
  }>;
};

export default async function SubscriptionPage({
  searchParams,
}: SubscriptionPageProps) {
  const { subscriptionId } = await searchParams;
  const subscriptionIdNumber = Number(subscriptionId);

  if (
    !subscriptionId ||
    !Number.isInteger(subscriptionIdNumber) ||
    subscriptionIdNumber <= 0
  ) {
    return <div>잘못된 접근입니다.</div>;
  }

  let paymentInfo: SubscriptionPaymentInfoResponse;

  try {
    const response = await serverSpringFetch<
      ApiResponse<SubscriptionPaymentInfoResponse>
    >(`/api/subscriptions/${subscriptionIdNumber}/payments/info`, {
      method: "GET",
      cache: "no-store",
    });

    paymentInfo = response.data;
  } catch (error) {
    if (error instanceof SpringApiError) {
      if (error.status === 401) {
        redirect("/login");
      }

      return <div>{error.message}</div>;
    }

    return <div>청약 정보를 불러올 수 없습니다.</div>;
  }

  if (paymentInfo.hasPaidThisMonth) {
    redirect(`/subscription/prepayment?subscriptionId=${subscriptionIdNumber}`);
  }

  redirect(`/subscription/payment?subscriptionId=${subscriptionIdNumber}`);
}
