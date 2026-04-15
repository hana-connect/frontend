"use client";

import { useMemo, useState } from "react";
import Header from "@/common/components/header/Header";
import PassbookLayout from "@/common/components/passbook-layout/PassbookLayout";
import PassbookPaper from "@/common/components/passbook-layout/PassbookPaper";
import { Tabs, TabsList, TabsTrigger } from "@/common/components/tabs/Tabs";
import { MOCK_ACCOUNT_DATA } from "./_mock/data";

const ITEMS_PER_PAGE = 12;

const LetterPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const accountInfo = MOCK_ACCOUNT_DATA;

  const senders = useMemo(() => {
    const uniqueSenders = Array.from(
      new Set(accountInfo.history.map((item) => item.sender)),
    );
    return ["all", ...uniqueSenders];
  }, [accountInfo.history]);

  const filteredData = useMemo(() => {
    const data =
      activeTab === "all"
        ? accountInfo.history
        : accountInfo.history.filter((item) => item.sender === activeTab);
    return data;
  }, [activeTab, accountInfo.history]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const tabSection = (
    <Tabs
      defaultValue="all"
      onValueChange={(val) => {
        setActiveTab(val);
        setCurrentPage(1);
      }}
    >
      <TabsList className="flex w-full justify-start overflow-x-auto rounded-none scrollbar-hide">
        {senders.map((sender) => (
          <TabsTrigger key={sender} value={sender} className="px-6 pb-3">
            {sender === "all" ? "전체" : sender}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header type="sub" title={"적금 편지"} />

      <PassbookLayout
        title={accountInfo.productName}
        subTitle={accountInfo.accountNumber}
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstPage={currentPage === 1}
        isLastPage={currentPage === totalPages || totalPages === 0}
        tabs={tabSection}
      >
        <div className="w-full">
          {/* 테이블 헤더 생략 (동일) */}
          <div className="flex justify-between border-y border-grey-5 py-1 text-black text-[15px] font-semibold text-left">
            <span className="w-6"></span>
            <span className="w-17">거래일</span>
            <span className="flex-1">메시지</span>
            <span className="w-16">입금액</span>
            <span className="w-18">잔액</span>
          </div>

          <PassbookPaper
            currentCount={currentData.length}
            highlightRangeClass="left-[25%] w-[38%]"
          >
            {currentData.map((item, index) => (
              <div key={item.id} className="relative z-10">
                {index !== 0 && index % 6 === 0 && (
                  <div className="h-px w-full bg-grey-5 my-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
                )}
                <div className="flex justify-between items-center py-2 text-[13px] font-medium text-brand-black">
                  <span className="w-6 text-center text-grey-6">
                    {String(
                      (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
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
            ))}
          </PassbookPaper>
        </div>
      </PassbookLayout>
    </div>
  );
};

export default LetterPage;
