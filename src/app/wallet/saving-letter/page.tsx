"use client";

import { useMemo, useState } from "react";
import Header from "@/common/components/header/Header";
import PassbookLayout from "@/common/components/passbook-layout/PassbookLayout";
import { Tabs, TabsList, TabsTrigger } from "@/common/components/tabs/Tabs";

type LetterItem = {
  id: number;
  date: string;
  amount: number;
  message: string;
  sender: string;
  balance: number;
};

const MOCK_LETTER: LetterItem[] = [
  {
    id: 1,
    date: "20260414",
    amount: 50000,
    message: "우리 별돌이 사랑해",
    sender: "김도이",
    balance: 600000,
  },
  {
    id: 2,
    date: "20260410",
    amount: 50000,
    message: "말해주면 좋겠어",
    sender: "김채현",
    balance: 550000,
  },
  {
    id: 3,
    date: "20260405",
    amount: 5000000,
    message: "무엇보다 건강이",
    sender: "김도이",
    balance: 50000000,
  },
  {
    id: 4,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 5,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 6,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 7,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 8,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 9,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 10,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 11,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 12,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
  {
    id: 13,
    date: "20260401",
    amount: 50000,
    message: "가장 중요하니까 가나다",
    sender: "이하나",
    balance: 450000,
  },
];

const ITEMS_PER_PAGE = 12;

const LetterPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const senders = useMemo(() => {
    const uniqueSenders = Array.from(
      new Set(MOCK_LETTER.map((item) => item.sender)),
    );
    return ["all", ...uniqueSenders];
  }, []);

  const filteredData = useMemo(() => {
    const data =
      activeTab === "all"
        ? MOCK_LETTER
        : MOCK_LETTER.filter((item) => item.sender === activeTab);
    return data;
  }, [activeTab]);

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

  const emptyRowsCount = ITEMS_PER_PAGE - currentData.length;
  const emptyRows = Array.from({ length: emptyRowsCount });
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
      <Header type="sub" title={"지난 작성 내역"} />

      <PassbookLayout
        title="오늘부터, 하나 적금"
        subTitle="100-2223-444"
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstPage={currentPage === 1}
        isLastPage={currentPage === totalPages || totalPages === 0}
        tabs={tabSection}
      >
        <div className="w-full">
          <div className="flex justify-between border-y border-[#ECECEC] py-1 text-black text-[15px] font-semibold text-left">
            <span className="w-6"></span>
            <span className="w-17">거래일</span>
            <span className="flex-1">메시지</span>
            <span className="w-16">입금액</span>
            <span className="w-18">잔액</span>
          </div>
          <div className="flex flex-col relative">
            <div
              className="absolute top-0 bottom-0 left-[25%] w-[38%] bg-grey-3 z-0"
              aria-hidden="true"
            />

            {currentData.map((item, index) => (
              <div key={item.id} className="relative z-10">
                {index !== 0 && index % 6 === 0 && (
                  <div className="h-px w-full bg-grey-5 my-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
                )}
                <div className="flex justify-between items-center py-2 text-[13px] font-medium text-[#2E2E36]">
                  <span className="w-6 text-center ">
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
                  <span className="w-18 text-right ">
                    {item.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            {emptyRows.map((_, i) => {
              const rowIndex = currentData.length + i;
              const rowKey = `empty-row-p${currentPage}-${i}`;

              return (
                <div key={rowKey} className="relative z-10">
                  {rowIndex !== 0 && rowIndex % 6 === 0 && (
                    <div className="h-px w-full bg-grey-5 my-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
                  )}
                  <div className="flex py-2 text-[13px] invisible">
                    <span className="w-6">&nbsp;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PassbookLayout>
    </div>
  );
};

export default LetterPage;
