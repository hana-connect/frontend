"use client";

import { useMemo, useState } from "react";
import { createAmountKeypadLayout } from "@/common/lib/keypad/createAmountKeypadLayout";
import type { KeypadItem } from "@/common/types/keypad.types";

type UseAmountInputParams = {
  maxAmount?: number;
};

type UseAmountInputReturn = {
  rawValue: string;
  formattedValue: string;
  keypadItems: KeypadItem[];
  handleDigitPress: (digit: string) => void;
  handleBackspacePress: () => void;
  handleQuickAdd: (amount: number) => void;
  numericValue: number;
};

function formatCurrency(value: number) {
  return value.toLocaleString("ko-KR");
}

export function useAmountInput({
  maxAmount = 999999999,
}: UseAmountInputParams = {}): UseAmountInputReturn {
  const [rawValue, setRawValue] = useState("");

  const keypadItems = useMemo(() => createAmountKeypadLayout(), []);

  const handleDigitPress = (digit: string) => {
    const nextRaw = `${rawValue}${digit}`;
    const numericValue = Number(nextRaw);

    if (numericValue > maxAmount) {
      return;
    }

    setRawValue(nextRaw.replace(/^0+(?=\d)/, ""));
  };

  const handleBackspacePress = () => {
    setRawValue((prev) => prev.slice(0, -1));
  };

  const handleQuickAdd = (amount: number) => {
    const current = Number(rawValue || "0");
    const next = current + amount;

    if (next > maxAmount) {
      return;
    }

    setRawValue(String(next));
  };

  const numericValue = Number(rawValue || "0");
  const formattedValue = formatCurrency(numericValue);

  return {
    rawValue,
    formattedValue,
    keypadItems,
    handleDigitPress,
    handleBackspacePress,
    handleQuickAdd,
    numericValue,
  };
}
