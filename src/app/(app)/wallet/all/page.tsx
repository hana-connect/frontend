import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
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
async function getAccounts() {
  const response =
    await serverSpringFetch<AccountListResponse>("/api/accounts/me");
  return response.data;
}

async function getRewardAccount() {
  try {
    const response = await serverSpringFetch<RewardAccountResponse>(
      "/api/accounts/reward",
    );
    return response.data;
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

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
