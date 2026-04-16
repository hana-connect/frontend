"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { SubscriptionPaymentExecuteResponse } from "@/app/api/subscriptions/type";
import Button from "@/common/components/button/Button";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export default function PrepaymentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionIdParam = searchParams.get("subscriptionId");
  const subscriptionId = subscriptionIdParam
    ? Number(subscriptionIdParam)
    : null;

  const [result, setResult] =
    useState<SubscriptionPaymentExecuteResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      subscriptionId === null ||
      Number.isNaN(subscriptionId) ||
      subscriptionId <= 0
    ) {
      setLoading(false);
      return;
    }

    const fetchPaymentResult = async () => {
      try {
        const response = await apiClient.get<
          ApiResponse<SubscriptionPaymentExecuteResponse>
        >(`/api/subscriptions/${subscriptionId}/payments/result`);

        setResult(response.data);
      } catch (error) {
        console.error("청약 선납 결과 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentResult();
  }, [subscriptionId]);

  const formatDate = (value: string | null | undefined) => {
    if (!value) return "-";
    return value.slice(0, 10).replace(/-/g, ".");
  };

  const handleSubmit = () => {
    router.push("/wallet");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        로딩 중...
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        납입 결과를 불러올 수 없습니다.
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />

        <h1 className="mt-6 text-xl font-medium text-brand-black">
          납입이 완료되었어요!
        </h1>

        <div className="mt-12 h-[0.8px] w-full bg-grey-5" aria-hidden="true" />

        <section className="w-full pt-6 text-left">
          <h2 className="mb-4 text-base text-brand-black">청약</h2>

          <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
            <span>입금 계좌번호</span>
            <span className="text-brand-black">
              {result.subscriptionAccountNumber}
            </span>
          </div>

          <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
            <span>납입 금액</span>
            <span className="text-brand-black">
              {result.subscriptionAmount.toLocaleString()}원
            </span>
          </div>

          {result.prepaymentCount !== null && (
            <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
              <span>선납 회차</span>
              <span className="text-brand-black">
                {result.prepaymentCount}회
              </span>
            </div>
          )}

          <div className="flex w-full justify-between text-body-16-m text-grey-6">
            <span>납입일</span>
            <span className="text-brand-black">
              {formatDate(result.paidAt)}
            </span>
          </div>
        </section>

        {result.rewardAmount > 0 && (
          <>
            <div
              className="mt-8 h-[0.8px] w-full bg-grey-5"
              aria-hidden="true"
            />

            <section className="w-full pt-6 text-left">
              <h2 className="mb-4 text-body-14-b text-brand-black">리워드</h2>

              <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
                <span>입금 계좌번호</span>
                <span className="text-brand-black">
                  {result.rewardAccountNumber || "-"}
                </span>
              </div>

              <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
                <span>입금 금액</span>
                <span className="text-brand-black">
                  {result.rewardAmount.toLocaleString()}원
                </span>
              </div>

              <div className="flex w-full justify-between text-body-16-m text-grey-6">
                <span>입금일</span>
                <span className="text-brand-black">
                  {formatDate(result.paidAt)}
                </span>
              </div>
            </section>
          </>
        )}
      </div>

      <div className="w-full px-6 pb-9">
        <Button size="L" variant="active" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </main>
  );
}
