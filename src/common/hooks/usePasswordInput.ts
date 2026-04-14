"use client";

import { useEffect, useState } from "react";
import { createPasswordKeypadLayout } from "@/common/lib/keypad/createPasswordKeypadLayout";
import type { KeypadItem } from "@/common/types/keypad.types";

type UsePasswordInputParams = {
  maxLength?: number;
  maxFailedCount?: number;
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
  maxFailedCount = 5,
  onComplete,
}: UsePasswordInputParams = {}): UsePasswordInputReturn {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [failedCount, setFailedCount] = useState(0);
  const [keypadItems, setKeypadItems] = useState<KeypadItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setKeypadItems(createPasswordKeypadLayout());
    setIsReady(true);
  }, []);

  const reset = () => {
    setValue("");
    setErrorMessage("");
    setFailedCount(0);
  };

  const handleBackspacePress = () => {
    setErrorMessage("");
    setValue((prev) => prev.slice(0, -1));
  };

  const handleDigitPress = async (digit: string) => {
    if (!/^\d$/.test(digit)) return;
    if (value.length >= maxLength) return;

    const nextValue = `${value}${digit}`;
    setErrorMessage("");
    setValue(nextValue);

    if (nextValue.length === maxLength && onComplete) {
      let isValid = false;
      try {
        isValid = await onComplete(nextValue);
      } catch {
        setValue("");
        setErrorMessage(
          "비밀번호 확인 중 오류가 발생했습니다. 다시 시도해주세요.",
        );
        return;
      }

      if (!isValid) {
        const nextFailedCount = failedCount + 1;
        setFailedCount(nextFailedCount);

        setTimeout(() => {
          setValue("");
          setErrorMessage(
            `비밀번호를 잘못 입력했습니다. (${nextFailedCount}/${maxFailedCount})`,
          );
        }, 120);

        if (nextFailedCount >= maxFailedCount) {
          // TODO: 최대 허용 횟수 초과 시 추가 조치 (예: 계정 잠금, 관리자 알림 등)
        }
      } else {
        setFailedCount(0);
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
