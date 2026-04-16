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
  const [requestedPage, setRequestedPage] = useState(0);
  const [displayData, setDisplayData] = useState<{
    content: TerminatedDetailData;
    page: number;
  }>({
    content: initialData,
    page: 0,
  });

  const [activeSenderId, setActiveSenderId] = useState<number | "all">("all");
  const [isFetching, setIsFetching] = useState(false);
  const latestRequestId = useRef(0);
  const isLastPage = displayData.content.isLast;

  const handleTabChange = (val: string) => {
    const senderId = val === "all" ? "all" : Number(val);
    setActiveSenderId(senderId);
    setRequestedPage(0);
  };

  const fetchData = useCallback(
    async (page: number) => {
      const requestId = ++latestRequestId.current;

      if (page === 0 && activeSenderId === "all") {
        setIsFetching(false);
        setDisplayData({ content: initialData, page: 0 });
        return;
      }

      setIsFetching(true);
      try {
        const query = new URLSearchParams({ page: page.toString() });
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
          setDisplayData({ content: result.data, page });
        }
      } catch (e) {
        console.error("Fetch 에러:", e);
      } finally {
        if (requestId === latestRequestId.current) {
          setIsFetching(false);
        }
      }
    },
    [accountId, activeSenderId, initialData],
  );

  useEffect(() => {
    fetchData(requestedPage);
  }, [requestedPage, fetchData]);

  return (
    <div className="min-h-screen bg-white">
      <Header type="sub" title={"적금 편지"} />

      <PassbookLayout
        title={displayData.content.productName}
        subTitle={displayData.content.accountNumber}
        onPrev={() => {
          if (!isFetching) setRequestedPage((p) => Math.max(0, p - 1));
        }}
        onNext={() => {
          if (!isFetching && !isLastPage) setRequestedPage((p) => p + 1);
        }}
        isFirstPage={requestedPage === 0}
        isLastPage={isLastPage}
        tabs={
          <LetterTabs
            activeSenderId={activeSenderId.toString()}
            onTabChange={handleTabChange}
            senders={initialData.senders}
          />
        }
      >
        <div className="w-full">
          <div className="flex justify-between border-y border-grey-5 py-1 text-black text-[15px] font-semibold text-center">
            <span className="w-6"></span>
            <span className="w-17">거래일</span>
            <span className="flex-1">메시지</span>
            <span className="w-16">입금액</span>
            <span className="w-18">잔액</span>
          </div>

          <div
            className={`transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}
          >
            <PassbookPaper
              currentCount={displayData.content.transactions.length}
              highlightRangeClass="left-[25%] w-[38%]"
            >
              {displayData.content.transactions.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 z-50 pointer-events-none">
                  <p className="text-brand-black text-body-14-m px-2">
                    작성된 편지 없이 조용히 마무리된 적금이에요.
                  </p>
                </div>
              ) : (
                displayData.content.transactions.map((item, index) => (
                  <div key={item.transactionId} className="relative z-10">
                    {index !== 0 && index % 6 === 0 && (
                      <div className="h-px w-full bg-grey-5 my-0" />
                    )}
                    <div className="flex justify-between items-center py-2 text-[14px] font-medium text-brand-black">
                      <span className="w-6 text-center text-grey-6">
                        {String(
                          displayData.page * ITEMS_PER_PAGE + index + 1,
                        ).padStart(2, "0")}
                      </span>
                      <span className="w-17 text-center">{item.date}</span>
                      <div className="flex-1 px-1 text-left truncate">
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
        </div>
      </PassbookLayout>
    </div>
  );
};

export default LetterPageClient;
