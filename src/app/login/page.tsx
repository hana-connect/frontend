"use client";

import { useRouter } from "next/navigation";
import Password from "@/common/components/keypad/Password";

function Page() {
  const router = useRouter();

  const handleLogin = async (password: string): Promise<boolean> => {
    try {
      const memberId = localStorage.getItem("memberId");

      if (!memberId) {
        console.error("memberId가 없습니다.");
        return false;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: Number(memberId),
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result.message);
        return false;
      }

      router.push("/house"); // TODO 경로 수정
      return true;
    } catch (error) {
      console.error("로그인 실패:", error);
      return false;
    }
  };

  return (
    <Password
      title="아이부자 앱 간편비밀번호를 입력해 주세요"
      length={6}
      onComplete={handleLogin}
    />
  );
}

export default Page;
