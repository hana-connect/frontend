"use client";

import TransferAmount from "@/common/components/keypad/TransferAmount";

export default function Page() {
  const handleNextStep = (_amount: number) => {};

  return (
    <TransferAmount
      accountHolder="김채현(김채*)"
      accountNickname="채현이 입출금 (용돈)"
      balance={500000}
      onNext={handleNextStep}
    />
  );
}
