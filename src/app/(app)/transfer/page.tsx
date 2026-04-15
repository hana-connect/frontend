"use client";

import { useRouter } from "next/navigation";
import Header from "@/common/components/header/Header";
import TransferAmount from "@/common/components/keypad/TransferAmount";

export default function TransferPage() {
  const router = useRouter();

  const handleNext = (amount: number) => {
    console.log("선택한 송금 금액:", amount);

    // 다음 페이지로 amount 넘기기 예시
    router.push(`/transfer/password?amount=${amount}`);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-white">
        <Header type="sub" title="송금하기" />

        <TransferAmount
          accountHolder="김채현(김*현)"
          accountNickname="채원이 입출금 통장"
          balance={800000}
          maxAmount={800000}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}
