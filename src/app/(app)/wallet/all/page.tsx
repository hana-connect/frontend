import RewardAccountPageClient from "./_components/RewardAccountPageClient";
import { getAccounts, getRewardAccount } from "./_lib/api";

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
