"use client";

import NumericInputLayout from "@/common/components/keypad/NumericInputLayout";
import NumericKeypad from "@/common/components/keypad/NumericKeypad";
import PasswordHeader from "@/common/components/keypad/PasswordHeader";
import { usePasswordInput } from "@/common/hooks/usePasswordInput";

export default function PasswordPage() {
  const {
    value,
    errorMessage,
    keypadItems,
    isReady,
    handleDigitPress,
    handleBackspacePress,
  } = usePasswordInput({
    maxLength: 4,
    onComplete: async (password) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return password === "1234";
    },
  });

  return (
    <NumericInputLayout
      top={
        <PasswordHeader
          pageTitle="계좌 비밀번호 입력"
          title="계좌 비밀번호를 입력해 주세요"
          enteredLength={value.length}
          maxLength={4}
          errorMessage={errorMessage}
        />
      }
      keypad={
        isReady ? (
          <NumericKeypad
            items={keypadItems}
            columns={4}
            onDigitPress={handleDigitPress}
            onBackspacePress={handleBackspacePress}
          />
        ) : (
          <div className="grid grid-cols-4 justify-items-center gap-x-6 gap-y-7">
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={`keypad-skeleton-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: 길이, 순서 고정된 배열이므로 index 사용해도 문제 없음
                  index
                }`}
                className="h-14 w-14"
              />
            ))}
          </div>
        )
      }
    />
  );
}
