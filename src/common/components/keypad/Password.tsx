"use client";

import NumericInputLayout from "@/common/components/keypad/NumericInputLayout";
import NumericKeypad from "@/common/components/keypad/NumericKeypad";
import PasswordHeader from "@/common/components/keypad/PasswordHeader";
import { usePasswordInput } from "@/common/hooks/usePasswordInput";

type PasswordProps = {
  title: string;
  length: number;
  onSuccess: () => void;
};

export default function Password({ title, length, onSuccess }: PasswordProps) {
  const {
    value,
    errorMessage,
    keypadItems,
    isReady,
    handleDigitPress,
    handleBackspacePress,
  } = usePasswordInput({
    maxLength: length,
    onComplete: async (password) => {
      // TODO: 실제 검증 로직으로 교체 필요
      if (password === "1234") {
        onSuccess();
        return true;
      }
      return false;
    },
  });

  return (
    <NumericInputLayout
      top={
        <PasswordHeader
          title={title}
          enteredLength={value.length}
          maxLength={length}
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
