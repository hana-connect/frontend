"use client";

import { useRouter } from "next/navigation";
import Password from "@/common/components/keypad/Password";

function page() {
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push("/transfer/complete");
  };

  return (
    <Password
      title="계좌 비밀번호를 입력해주세요."
      onSuccess={handleAuthSuccess}
      length={4}
    />
  );
}

export default page;
