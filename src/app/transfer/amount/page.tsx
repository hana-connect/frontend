"use client";

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

  return (
    <NumericInputLayout
      top={
        <AmountHeader
          accountName="김채현(김채*)"
          accountNumber="채현이 입금금 (용돈)"
          balance={800000}
          amount={formattedValue}
          onQuickAdd={handleQuickAdd}
        />
      }
      bottom={
        <button
          type="button"
          disabled={numericValue <= 0}
          className="w-full rounded-xl bg-violet-500 py-4 text-[14px] font-semibold text-white disabled:bg-violet-200"
        >
          다음
        </button>
      }
      keypad={
        <NumericKeypad
          items={keypadItems}
          columns={3}
          onDigitPress={handleDigitPress}
          onBackspacePress={handleBackspacePress}
        />
      }
    />
  );
}
