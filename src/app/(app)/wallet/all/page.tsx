import Header from "@/common/components/header/Header";
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
    <>
      <Header type="sub" title="내 지갑" rightActionText="거래내역" />
      <RewardAccountPageClient
        accounts={accounts}
        rewardAccount={rewardAccount}
      />
    </>
  );
}
