"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Password from "@/common/components/keypad/Password";

export default function TransferPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");

  const handlePasswordComplete = async (password: string) => {
    // TODO: 실제 API 연동
    const isValid = password === "123456";

    if (!isValid) {
      return false;
    }

    router.push(`/transfer/result?amount=${amount}`);
    return true;
  };

  return (
    <Password
      title="아이부자 앱 간편비밀번호를 입력해 주세요"
      length={6}
      onComplete={handlePasswordComplete}
    />
  );
}
