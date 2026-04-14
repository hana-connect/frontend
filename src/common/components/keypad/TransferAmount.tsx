"use client";

import Button from "@/common/components/button/Button";
import AmountHeader from "@/common/components/keypad/AmountHeader";
import NumericInputLayout from "@/common/components/keypad/NumericInputLayout";
import NumericKeypad from "@/common/components/keypad/NumericKeypad";
import { useAmountInput } from "@/common/hooks/useAmountInput";

type TransferAmountProps = {
  accountHolder: string;
  accountNickname: string;
  balance: number;
  maxAmount?: number;
  onNext: (amount: number) => void;
};

export default function TransferAmount({
  accountHolder,
  accountNickname,
  balance,
  maxAmount = 800000,
  onNext,
}: TransferAmountProps) {
  const {
    formattedValue,
    keypadItems,
    handleDigitPress,
    handleBackspacePress,
    handleQuickAdd,
    numericValue,
  } = useAmountInput({
    maxAmount,
  });

  const isEnabled = numericValue > 0;

  return (
    <NumericInputLayout
      top={
        <AmountHeader
          accountHolder={accountHolder}
          accountNickname={accountNickname}
          balance={balance}
          amount={formattedValue}
          onQuickAdd={handleQuickAdd}
        />
      }
      keypad={
        <NumericKeypad
          items={keypadItems}
          columns={3}
          onDigitPress={handleDigitPress}
          onBackspacePress={handleBackspacePress}
        />
      }
      bottom={
        <Button
          size="L"
          variant={isEnabled ? "active" : "disabled"}
          disabled={!isEnabled}
          onClick={() => isEnabled && onNext(numericValue)}
        >
          다음
        </Button>
      }
    />
  );
}
