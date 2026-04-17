"use client";

import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import Password from "@/common/components/keypad/Password";

type PasswordInputProps = {
  onBack: () => void;
  onComplete: (password: string) => Promise<boolean>;
};

export default function PasswordInput({
  onBack,
  onComplete,
}: PasswordInputProps) {
  return (
    <div className="flex flex-col h-full bg-white z-50">
      <div className="flex-none">
        <RegisterStepHeader title="비밀번호 입력" onBack={onBack} />
      </div>
      <div className="flex-1 overflow-y-auto pt-10">
        <Password
          title="아이부자 앱 간편비밀번호를 입력해 주세요"
          length={6}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
