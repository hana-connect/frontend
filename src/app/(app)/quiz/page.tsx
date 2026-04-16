import { Suspense } from "react";
import { getRewardAccount } from "@/common/lib/api/accounts/api-server";
import QuizStartPageClient from "./QuizStartPageClient";

export default async function QuizPage() {
  const rewardAccount = await getRewardAccount().catch((error) => {
    console.error("리워드 계좌 조회 실패:", error);
    return null;
  });

  return (
    <Suspense>
      <QuizStartPageClient rewardAccount={rewardAccount} />
    </Suspense>
  );
}
