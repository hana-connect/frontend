"use client";

import { useCallback, useEffect, useState } from "react";
import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import PassbookLayout from "@/common/components/passbook-layout/PassbookLayout";
import PassbookPaper from "@/common/components/passbook-layout/PassbookPaper";
import type { RelayData } from "../_types";

type RelayHistoryProps = {
  targetAccountId: number;
  onBack: () => void;
};

const ITEMS_PER_PAGE = 12;

export default function RelayHistory({
  targetAccountId,
  onBack,
}: RelayHistoryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<RelayData | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (page: number) => {
      setIsFetching(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          targetAccountId: targetAccountId.toString(),
          page: page.toString(),
        });

        const res = await fetch(
          `/api/transfer/savings/relay?${query.toString()}`,
        );

        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          setError("데이터를 불러오지 못했습니다.");
          return;
        }

        const result = await res.json();
        if (result.data) setData(result.data);
      } catch (e) {
        console.error("릴레이 내역 조회 에러:", e);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setIsFetching(false);
        setIsInitialLoading(false);
      }
    },
    [targetAccountId],
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-white">
        <RegisterStepHeader title="지난 작성 내역" onBack={onBack} />
        <div className="flex items-center justify-center pt-40">
          <p className="text-body-14-m text-grey-6">...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white">
        <RegisterStepHeader title="지난 작성 내역" onBack={onBack} />
        <div className="flex items-center justify-center pt-40">
          <p className="text-body-14-m text-grey-6">
            {error || "데이터를 불러오지 못했습니다."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <RegisterStepHeader title={"지난 작성 내역"} onBack={onBack} />
      <PassbookLayout
        title={data.productNickname}
        subTitle={data.accountNumber}
        onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
        onNext={() => setCurrentPage((p) => p + 1)}
        isFirstPage={currentPage === 0}
        isLastPage={data.history.length < ITEMS_PER_PAGE}
      >
        <div className="w-full">
          <div className="flex justify-between border-y border-grey-5 py-1 text-black text-[16px] font-semibold text-center">
            <span className="w-6"></span>
            <span className="w-20">거래일</span>
            <span className="flex-1">메시지</span>
            <span className="w-20">입금액</span>
          </div>

          <div
            className={`transition-opacity duration-200 ${isFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}
          >
            <PassbookPaper
              currentCount={data.history.length}
              highlightRangeClass="left-[28%] w-[50%]"
            >
              {data.history.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 z-50 pointer-events-none">
                  <p className="text-brand-black text-body-14-m px-2">
                    작성 내역이 없습니다.
                  </p>
                </div>
              ) : (
                data.history.map((item, index) => (
                  <div key={item.letterId} className="relative z-10">
                    {index !== 0 && index % 6 === 0 && (
                      <div className="h-px w-full bg-grey-5 my-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
                    )}
                    <div className="flex justify-between items-center py-2 text-[14px] font-medium text-[#2E2E36]">
                      <span className="w-6 text-center text-grey-6">
                        {String(
                          currentPage * ITEMS_PER_PAGE + index + 1,
                        ).padStart(2, "0")}
                      </span>
                      <span className="w-20 text-center">{item.date}</span>
                      <div className="flex-1 px-1 text-left truncate">
                        {item.message}
                      </div>
                      <span className="w-20 text-right">
                        {item.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </PassbookPaper>
          </div>
        </div>
      </PassbookLayout>
    </div>
  );
}
