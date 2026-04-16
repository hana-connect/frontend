"use client";

import { useRouter } from "next/navigation";
import type { SubscriptionPaymentExecuteResponse } from "@/app/api/subscriptions/type";
import Password from "@/common/components/keypad/Password";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

type SubscriptionPaymentDraft = {
  subscriptionId: number;
  amount: number;
  transferExcessToReward: boolean | null;
};

export default function PaymentPassword() {
  const router = useRouter();

  const handlePasswordComplete = async (password: string) => {
    const raw = sessionStorage.getItem("subscriptionPayment");

    if (!raw) {
      console.error("청약 납입 데이터 없음");
      return false;
    }

    try {
      const draft: SubscriptionPaymentDraft = JSON.parse(raw);

      if (
        typeof draft.subscriptionId !== "number" ||
        Number.isNaN(draft.subscriptionId) ||
        draft.subscriptionId <= 0 ||
        typeof draft.amount !== "number" ||
        Number.isNaN(draft.amount) ||
        draft.amount <= 0 ||
        (typeof draft.transferExcessToReward !== "boolean" &&
          draft.transferExcessToReward !== null)
      ) {
        console.error("청약 납입 데이터가 올바르지 않습니다.");
        return false;
      }

      await apiClient.post<ApiResponse<SubscriptionPaymentExecuteResponse>>(
        `/api/subscriptions/${draft.subscriptionId}/payments`,
        {
          amount: draft.amount,
          prepaymentCount: null,
          password,
          transferExcessToReward: draft.transferExcessToReward,
        },
      );

      sessionStorage.removeItem("subscriptionPayment");

      router.push(
        `/subscription/payment/result?subscriptionId=${draft.subscriptionId}`,
      );
      return true;
    } catch (error) {
      console.error("청약 납입 실패:", error);
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
