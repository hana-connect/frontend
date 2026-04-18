"use client";

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
      <Password
        title="아이부자 앱 간편비밀번호를 입력해 주세요"
        length={6}
        onComplete={onComplete}
      />
    </div>
  );
}
