"use client";

import { useRouter } from "next/navigation";
import type { TransferExecuteResponse } from "@/app/api/transfer/type";
import Password from "@/common/components/keypad/Password";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

type TransferDraft = {
  accountId: number;
  amount: number;
};

export default function TransferPasswordPage() {
  const router = useRouter();

  const handlePasswordComplete = async (password: string) => {
    const raw = sessionStorage.getItem("transferDraft");

    if (!raw) {
      console.error("송금 데이터가 없습니다.");
      return false;
    }

    try {
      const draft: TransferDraft = JSON.parse(raw);

      if (
        typeof draft.accountId !== "number" ||
        Number.isNaN(draft.accountId) ||
        draft.accountId <= 0 ||
        typeof draft.amount !== "number" ||
        Number.isNaN(draft.amount) ||
        draft.amount <= 0
      ) {
        console.error("송금 요청에 필요한 값이 올바르지 않습니다.");
        return false;
      }

      const result = await apiClient.post<ApiResponse<TransferExecuteResponse>>(
        "/api/transfer",
        {
          accountId: draft.accountId,
          amount: draft.amount,
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
