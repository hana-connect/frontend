"use client";

import Button from "@/common/components/button/Button";
import AmountHeader from "@/common/components/keypad/AmountHeader";
import NumericInputLayout from "@/common/components/keypad/NumericInputLayout";
import NumericKeypad from "@/common/components/keypad/NumericKeypad";
import { useAmountInput } from "@/common/hooks/useAmountInput";

export default function TransferAmountPage() {
  const {
    formattedValue,
    keypadItems,
    handleDigitPress,
    handleBackspacePress,
    handleQuickAdd,
    numericValue,
  } = useAmountInput({
    maxAmount: 800000,
  });

  const isEnabled = numericValue > 0;

  return (
    <NumericInputLayout
      top={
        <AmountHeader
          accountHolder="김채현(김채*)"
          accountNickname="채현이 입출금 (용돈)"
          balance={800000}
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
          onClick={() => {
            if (isEnabled) {
              console.log("다음 단계로 이동:", numericValue);
            }
          }}
        >
          다음
        </Button>
      }
    />
  );
}
