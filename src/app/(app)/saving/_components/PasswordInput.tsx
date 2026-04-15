"use client";

import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import Password from "@/common/components/keypad/Password";

type PasswordInputProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export default function PasswordInput({
  onBack,
  onSuccess,
}: PasswordInputProps) {
  return (
    <div className="flex flex-col h-full bg-white z-50">
      <div className="flex-none border-b border-gray-100">
        <RegisterStepHeader title="비밀번호 입력" onBack={onBack} />
      </div>
      <div className="flex-1 overflow-y-auto pt-10">
        <Password title="결제 비밀번호 입력" length={6} onSuccess={onSuccess} />
      </div>
    </div>
  );
}
