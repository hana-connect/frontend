"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import GuideSection from "@/common/components/GuideSection";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";
import TransferAmount from "@/common/components/keypad/TransferAmount";

export default function prepaymentDraft() {
  const [amount, setAmount] = useState<number | null>(null);
  const [showAmountPad, setShowAmountPad] = useState(false);

  const isDisabled = !amount;
  const router = useRouter();

  const handleNextStep = (nextAmount: number) => {
    setAmount(nextAmount);
    setShowAmountPad(false);
  };

  const handleSubmit = () => {
    if (!amount) return;

    localStorage.setItem(
      "prepaymentDraft",
      JSON.stringify({
        amount,
      }),
    );

    router.push("/payment/password");
  };

  if (showAmountPad) {
    return (
      <TransferAmount
        accountHolder="김채현(김채*)"
        accountNickname="채현이 입출금 (용돈)"
        balance={500000}
        onNext={handleNextStep}
      />
    );
  }

  return (
    <main className="flex h-dvh flex-col bg-white">
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="bg-white px-5 pt-6 pb-12">
          <Header type="sub" title="청약 납입하기" />

          <section className="mt-10">
            <p className="mb-6 text-xl font-bold text-brand-black">납입금액</p>

            <Input
              placeholder="금액 입력"
              value={amount ? amount.toLocaleString() : ""}
              readOnly
              onClick={() => setShowAmountPad(true)}
              className="cursor-pointer font-bold text-brand-black placeholder:text-[#CCCCCC]"
            />
          </section>
        </div>

        <div className="h-60 bg-white" />

        <section className="bg-[#F6F7F8] px-5 pt-4 pb-10">
          <GuideSection />
        </section>
      </div>

      <div className="shrink-0 bg-[#F6F7F8] px-5 pb-6 pt-3">
        <Button
          size="L"
          variant={isDisabled ? "disabled" : "active"}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </main>
  );
}
