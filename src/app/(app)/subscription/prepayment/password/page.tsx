"use client";

import { useRouter } from "next/navigation";
import type { SubscriptionPaymentExecuteResponse } from "@/app/api/subscriptions/type";
import Password from "@/common/components/keypad/Password";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export default function PrepaymentPassword() {
  const router = useRouter();

  const handlePasswordComplete = async (password: string) => {
    const raw = sessionStorage.getItem("prepayment");

    if (!raw) {
      console.error("선납 데이터 없음");
      return false;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error("선납 데이터 파싱 실패");
      return false;
    }

    const { subscriptionId, amount, prepaymentCount } = parsed as {
      subscriptionId: unknown;
      amount: unknown;
      prepaymentCount: unknown;
    };

    if (
      typeof subscriptionId !== "number" ||
      Number.isNaN(subscriptionId) ||
      subscriptionId <= 0 ||
      typeof amount !== "number" ||
      Number.isNaN(amount) ||
      amount <= 0 ||
      typeof prepaymentCount !== "number" ||
      Number.isNaN(prepaymentCount) ||
      prepaymentCount <= 0
    ) {
      console.error("선납 데이터가 올바르지 않습니다.");
      return false;
    }

    try {
      await apiClient.post<ApiResponse<SubscriptionPaymentExecuteResponse>>(
        `/api/subscriptions/${subscriptionId}/payments`,
        {
          amount,
          prepaymentCount,
          password,
          transferExcessToReward: null,
        },
      );

      // 성공하면 데이터 제거
      sessionStorage.removeItem("prepayment");

      router.push(
        `/subscription/prepayment/result?subscriptionId=${subscriptionId}`,
      );

      return true;
    } catch (error) {
      console.error("선납 실패:", error);
      return false;
    }
  };

  return (
    <Password
      title="아이부자 앱 간편 비밀번호를 입력해 주세요"
      length={6}
      onComplete={handlePasswordComplete}
    />
  );
}
