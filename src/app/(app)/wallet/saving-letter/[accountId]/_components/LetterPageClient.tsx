"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/common/components/header/Header";
import PassbookLayout from "@/common/components/passbook-layout/PassbookLayout";
import PassbookPaper from "@/common/components/passbook-layout/PassbookPaper";
import type { TerminatedDetailData } from "../_types";

const ITEMS_PER_PAGE = 12;

const LetterTabs = dynamic(() => import("./LetterTabs"), {
  ssr: false,
  loading: () => <div className="h-13.25" />,
});

const LetterPageClient = ({
  accountId,
  initialData,
}: {
  accountId: string;
  initialData: TerminatedDetailData;
}) => {
  const [data, setData] = useState(initialData);
  const [activeSenderId, setActiveSenderId] = useState<number | "all">("all");
  const [currentPage, setCurrentPage] = useState(0);
  const latestRequestId = useRef(0);

  const handleTabChange = (val: string) => {
    const senderId = val === "all" ? "all" : Number(val);
    setActiveSenderId(senderId);
    setCurrentPage(0);
  };

  const fetchData = useCallback(async () => {
    const requestId = ++latestRequestId.current;

    if (currentPage === 0 && activeSenderId === "all") {
      setData(initialData);
      return;
    }

    try {
      const query = new URLSearchParams({ page: currentPage.toString() });
      if (activeSenderId !== "all")
        query.append("senderId", activeSenderId.toString());

      const res = await fetch(
        `/api/terminated-savings/${accountId}?${query.toString()}`,
      );
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) return;

      const result = await res.json();

      if (requestId !== latestRequestId.current) return;

      if (result.data) {
        if (currentPage > 0 && result.data.transactions.length === 0) {
          setCurrentPage((p) => Math.max(0, p - 1));
          return;
        }
        setData(result.data);
      }
    } catch (e) {
      console.error("Fetch 에러:", e);
    }
  }, [accountId, currentPage, activeSenderId, initialData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-white">
      <Header type="sub" title={"적금 편지"} />

      <PassbookLayout
        title={data.productName}
        subTitle={data.accountNumber}
        onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
        onNext={() => setCurrentPage((p) => p + 1)}
        isFirstPage={currentPage === 0}
        isLastPage={data.transactions.length < ITEMS_PER_PAGE}
        tabs={
          <LetterTabs
            activeSenderId={activeSenderId.toString()}
            onTabChange={handleTabChange}
            senders={initialData.senders}
          />
        }
      >
        <div className="w-full">
          <div className="flex justify-between border-y border-grey-5 py-1 text-black text-[15px] font-semibold text-left">
            <span className="w-6"></span>
            <span className="w-17">거래일</span>
            <span className="flex-1">메시지</span>
            <span className="w-16">입금액</span>
            <span className="w-18">잔액</span>
          </div>

          <PassbookPaper
            currentCount={data.transactions.length}
            highlightRangeClass="left-[25%] w-[38%]"
          >
            {data.transactions.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 z-50 pointer-events-none">
                <p className="text-black text-body-14-m px-2">
                  남겨진 적금 편지가 없습니다.
                </p>
              </div>
            ) : (
              data.transactions.map((item, index) => (
                <div key={item.transactionId} className="relative z-10">
                  {index !== 0 && index % 6 === 0 && (
                    <div className="h-px w-full bg-grey-5 my-0" />
                  )}
                  <div className="flex justify-between items-center py-2 text-[13px] font-medium text-brand-black">
                    <span className="w-6 text-center text-grey-6">
                      {String(
                        currentPage * ITEMS_PER_PAGE + index + 1,
                      ).padStart(2, "0")}
                    </span>
                    <span className="w-17 text-center">{item.date}</span>
                    <div className="flex-1 px-1 text-right truncate">
                      {item.message}
                    </div>
                    <span className="w-16 text-right">
                      {item.amount.toLocaleString()}
                    </span>
                    <span className="w-18 text-right">
                      {item.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </PassbookPaper>
        </div>
      </PassbookLayout>
    </div>
  );
};

export default LetterPageClient;
