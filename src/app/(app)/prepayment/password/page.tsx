"use client";

import { useRouter } from "next/navigation";
import Password from "@/common/components/keypad/Password";

export default function PrepaymentPassword() {
  const router = useRouter();

  const handlePasswordComplete = async (password: string) => {
    // TODO API 경로에 맞춰서 로직 수정
    // 지금은 임시 비밀번호
    const isValid = password === "123456";

    if (!isValid) {
      return false;
    }

    router.push("/prepayment/result");
    return true;
  };

  return (
    <Password
      title="아이부자 앱 간편 비밀번호를 입력해 주세요"
      length={6}
      onComplete={handlePasswordComplete}
    />
  );
}
