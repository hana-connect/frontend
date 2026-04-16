"use client";

import { useRouter } from "next/navigation";
import type { TransferExecuteResponse } from "@/app/api/transfer/type";
import Password from "@/common/components/keypad/Password";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export default function TransferPasswordPage() {
  const router = useRouter();

  const handlePasswordComplete = async (password: string) => {
    const raw = sessionStorage.getItem("transferDraft");

    if (!raw) {
      console.error("송금 데이터가 없습니다.");
      return false;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error("송금 데이터 파싱 실패");
      return false;
    }

    if (!parsed || typeof parsed !== "object") {
      console.error("송금 데이터 형식이 올바르지 않습니다.");
      return false;
    }

    const { accountId, amount } = parsed as {
      accountId: unknown;
      amount: unknown;
    };

    if (
      typeof accountId !== "number" ||
      Number.isNaN(accountId) ||
      accountId <= 0 ||
      typeof amount !== "number" ||
      Number.isNaN(amount) ||
      amount <= 0
    ) {
      console.error("송금 요청에 필요한 값이 올바르지 않습니다.");
      return false;
    }

    try {
      const result = await apiClient.post<ApiResponse<TransferExecuteResponse>>(
        "/api/transfer",
        {
          accountId,
          amount,
          password,
        },
      );

      sessionStorage.removeItem("transferDraft");

      router.push(`/transfer/result?transferId=${result.data.transferId}`);
      return true;
    } catch (error) {
      console.error("송금 실패", error);
      return false;
    }
  };

  return (
    <Password
      title="아이부자 앱 간편비밀번호를 입력해 주세요"
      length={6}
      onComplete={handlePasswordComplete}
    />
  );
}
