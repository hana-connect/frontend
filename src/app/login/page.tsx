"use client";

import { useRouter } from "next/navigation";
import Password from "@/common/components/keypad/Password";

function Page() {
  const router = useRouter();

  const handleLogin = async (password: string): Promise<boolean> => {
    const rawMemberId = localStorage.getItem("memberId");
    const memberId = Number(rawMemberId);

    if (!Number.isInteger(memberId) || memberId <= 0) {
      throw new Error("유효한 memberId가 없습니다.");
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId,
          password,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          return false;
        }

        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "로그인 요청에 실패했습니다.",
        );
      }

      router.push("/");
      return true;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
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
