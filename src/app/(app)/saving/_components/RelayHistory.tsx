"use client";

import { useMemo, useState } from "react";
import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import PassbookLayout from "@/common/components/passbook-layout/PassbookLayout";
import PassbookPaper from "@/common/components/passbook-layout/PassbookPaper";
import { MOCK_RELAY_DATA } from "../_mock/data";

type RelayHistoryProps = {
  onBack: () => void;
};

const ITEMS_PER_PAGE = 12;

export default function RelayHistory({ onBack }: RelayHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const relayData = MOCK_RELAY_DATA;

  const totalPages = Math.ceil(relayData.history.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    return relayData.history.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [currentPage, relayData.history]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <RegisterStepHeader title={"지난 작성 내역"} onBack={onBack} />
      <PassbookLayout
        title={relayData.productName}
        subTitle={relayData.accountNumber}
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstPage={currentPage === 1}
        isLastPage={currentPage === totalPages || totalPages === 0}
      >
        <div className="w-full mt-5">
          <div className="flex justify-between border-y border-grey-5 py-1 text-black text-[16px] font-semibold text-left">
            <span className="w-6"></span>
            <span className="w-20">거래일</span>
            <span className="flex-1">메시지</span>
            <span className="w-20">입금액</span>
          </div>

          <PassbookPaper
            currentCount={currentData.length}
            highlightRangeClass="left-[28%] w-[50%]"
          >
            {currentData.map((item, index) => (
              <div key={item.id} className="relative z-10">
                {index !== 0 && index % 6 === 0 && (
                  <div className="h-px w-full bg-grey-5 my-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
                )}
                <div className="flex justify-between items-center py-2 text-[14px] font-medium text-[#2E2E36]">
                  <span className="w-6 text-center text-grey-6">
                    {String(
                      (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
                    ).padStart(2, "0")}
                  </span>
                  <span className="w-20 text-center">{item.date}</span>
                  <div className="flex-1 px-1 text-right truncate">
                    {item.message}
                  </div>
                  <span className="w-20 text-right">
                    {item.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </PassbookPaper>
        </div>
      </PassbookLayout>
    </div>
  );
}
