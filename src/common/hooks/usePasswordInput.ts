"use client";

import { useEffect, useState } from "react";
import { createPasswordKeypadLayout } from "@/common/lib/keypad/createPasswordKeypadLayout";
import type { KeypadItem } from "@/common/types/keypad.types";

type UsePasswordInputParams = {
  maxLength?: number;
  onComplete?: (value: string) => Promise<boolean> | boolean;
};

type UsePasswordInputReturn = {
  value: string;
  errorMessage: string;
  keypadItems: KeypadItem[];
  isReady: boolean;
  handleDigitPress: (digit: string) => void;
  handleBackspacePress: () => void;
  reset: () => void;
};

export function usePasswordInput({
  maxLength = 4,
  onComplete,
}: UsePasswordInputParams = {}): UsePasswordInputReturn {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [keypadItems, setKeypadItems] = useState<KeypadItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setKeypadItems(createPasswordKeypadLayout());
    setIsReady(true);
  }, []);

  const reset = () => {
    setValue("");
    setErrorMessage("");
  };

  const handleBackspacePress = () => {
    setErrorMessage("");
    setValue((prev) => prev.slice(0, -1));
  };

  const handleDigitPress = async (digit: string) => {
    if (value.length >= maxLength) {
      return;
    }

    const nextValue = `${value}${digit}`;
    setErrorMessage("");
    setValue(nextValue);

    if (nextValue.length === maxLength && onComplete) {
      const isValid = await onComplete(nextValue);

      if (!isValid) {
        setTimeout(() => {
          setValue("");
          setErrorMessage("비밀번호를 잘못 입력했습니다. (n/5)");
        }, 120);
      }
    }
  };

  return {
    value,
    errorMessage,
    keypadItems,
    isReady,
    handleDigitPress,
    handleBackspacePress,
    reset,
  };
}
