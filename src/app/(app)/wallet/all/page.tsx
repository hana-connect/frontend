import {
  getAccounts,
  getRewardAccount,
} from "@/common/lib/api/accounts/api-server";
import RewardAccountPageClient from "./_components/RewardAccountPageClient";

export default async function Page() {
  const [accounts, rewardAccount] = await Promise.all([
    getAccounts(),
    getRewardAccount(),
  ]);

  return (
    <RewardAccountPageClient
      accounts={accounts}
      rewardAccount={rewardAccount}
    />
  );
}
