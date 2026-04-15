"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/common/components/button/Button";

type PrepaymentResultData = {
  subscriptionAccountNumber: string;
  irpAccountNumber: string;
  subscriptionAmount: number;
  irpAmount: number;
  date: string;
};

export default function PaymentResult() {
  const router = useRouter();
  const [result, setResult] = useState<PrepaymentResultData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("paymentResult");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as PrepaymentResultData;
      setResult(parsed);
    } catch (error) {
      console.error("paymentResult 파싱 실패", error);
    }
  }, []);

  const handleSubmit = () => {
    router.push("/payment");
  };

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-6 pt-25 pb-10 flex flex-col items-center text-center">
          <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />

          <h1 className="mt-6 text-xl font-medium text-brand-black">
            납입이 완료되었어요!
          </h1>

          <div
            className="mt-12 h-[0.8px] w-full bg-grey-5"
            aria-hidden="true"
          />

          {/* 청약 */}
          <section className="w-full pt-6 text-left">
            <h2 className="mb-4 text-base text-brand-black">청약</h2>

            <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
              <span>입금 계좌번호</span>
              <span className="text-brand-black">
                {result?.subscriptionAccountNumber || "111-2222-3333"}
              </span>
            </div>

            <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
              <span>납입 금액</span>
              <span className="text-brand-black">
                {(result?.subscriptionAmount ?? 250000).toLocaleString()}원
              </span>
            </div>

            <div className="flex w-full justify-between text-body-16-m text-grey-6">
              <span>납입일</span>
              <span className="text-brand-black">
                {result?.date || "2026.04.07"}
              </span>
            </div>
          </section>

          {/* IRP */}
          {(result?.irpAmount ?? 0) > 0 && (
            <>
              <div
                className="mt-8 h-[0.8px] w-full bg-grey-5"
                aria-hidden="true"
              />

              <section className="w-full pt-6 text-left">
                <h2 className="mb-4 text-body-14-b text-brand-black">IRP</h2>

                <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
                  <span>입금 계좌번호</span>
                  <span className="text-brand-black">
                    {result?.irpAccountNumber || "111-2222-3333"}
                  </span>
                </div>

                <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
                  <span>송금 금액</span>
                  <span className="text-brand-black">
                    {(result?.irpAmount ?? 0).toLocaleString()}원
                  </span>
                </div>

                <div className="flex w-full justify-between text-body-16-m text-grey-6">
                  <span>송금일</span>
                  <span className="text-brand-black">
                    {result?.date || "2026.04.07"}
                  </span>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 bg-white px-6 pb-9 pt-3">
        <Button size="L" variant="active" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </main>
  );
}
