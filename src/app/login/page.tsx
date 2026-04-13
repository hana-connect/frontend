"use client";

import { useRouter } from "next/navigation";
import Password from "@/common/components/keypad/Password";

function Page() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/doctor"); // TODO 경로 수정
  };

  return (
    <Password
      title="아이부자 앱 간편비밀번호를 입력해 주세요"
      onSuccess={handleLoginSuccess}
      length={6}
    />
  );
}

export default Page;
