import { Suspense } from "react";
import { getRewardAccount } from "@/common/lib/api/accounts/api-server";
import QuizStartPageClient from "./QuizStartPageClient";

export default async function QuizPage() {
  const rewardAccount = await getRewardAccount();

  return (
    <Suspense>
      <QuizStartPageClient rewardAccount={rewardAccount} />
    </Suspense>
  );
}
