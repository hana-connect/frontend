"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TransferExecuteResponse } from "@/app/api/transfer/type";
import Password from "@/common/components/keypad/Password";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export default function TransferPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amountParam = searchParams.get("amount");
  const accountIdParam = searchParams.get("accountId");

  const amount = amountParam ? Number(amountParam) : null;
  const accountId = accountIdParam ? Number(accountIdParam) : null;

  const handlePasswordComplete = async (password: string) => {
    if (
      !amount ||
      !accountId ||
      Number.isNaN(amount) ||
      Number.isNaN(accountId)
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
