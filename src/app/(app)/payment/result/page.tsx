"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";

export default function PrepaymentResult() {
  // API 로직에 맞춰서 수정해주세요
  const [accountNumber, _setAccountNumber] = useState("");
  const router = useRouter();

  // 여기도 경로 수정
  const handleSubmit = () => {
    router.push("/payment");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />

        <h1 className="text-sm font-medium text-brand-black mt-6">
          납입이 완료되었어요!
        </h1>

        <div className="w-full h-[0.8px] bg-grey-5 mt-12" aria-hidden="true" />

        <div className="mt-6 w-full flex justify-between text-body-16-m text-grey-6 pb-4">
          <span>입금 계좌번호</span>
          <span className="text-brand-black">
            {accountNumber || "111-2222-3333"}
          </span>
        </div>

        <div className="w-full flex justify-between text-body-16-m text-grey-6 pb-4">
          <span>납입 금액</span>
          <span className="text-brand-black">250,000원</span>
        </div>

        <div className="w-full flex justify-between text-body-16-m text-grey-6">
          <span>납입일</span>
          <span className="text-brand-black">2026.04.07</span>
        </div>
      </div>

      <div className="w-full px-6 pb-9">
        <Button size="L" variant="active" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </main>
  );
}
