import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import type { AccountType } from "../(main)/_types";
import RewardAccountPageClient from "./_components/RewardAccountPageClient";

type AccountListResponse = ApiResponse<
  Array<{
    accountId: number;
    name: string;
    accountNumber: string;
    balance: number;
    accountType: AccountType;
    createdAt: string;
  }>
>;

type RewardAccountResponse = ApiResponse<{
  accountId: number;
  name: string;
  accountNumber: string;
}>;

export default async function Page() {
  const [accountsRes, rewardRes] = await Promise.all([
    serverSpringFetch<AccountListResponse>("/api/accounts/me"),
    serverSpringFetch<RewardAccountResponse>("/api/accounts/reward"),
  ]);

  return (
    <RewardAccountPageClient
      accounts={accountsRes.data}
      rewardAccount={rewardRes.data}
    />
  );
}
