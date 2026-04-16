import { redirect } from "next/navigation";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import { getUserRole } from "@/common/lib/auth/get-user-role";
import AccountList from "./_components/AccountList";
import MyKidSection from "./_components/MyKidSection";
import SavingMailboxSection from "./_components/SavingMailboxSection";
import SharedWalletSection from "./_components/SharedWalletSection";
import WalletBalance from "./_components/WalletBalance";
import type { Account, MainAccountInfo, UserRole } from "./_types";

type GetMyAccountsResponse = ApiResponse<Account[]>;

const walletPageData: Record<
  UserRole,
  {
    extraSections: React.ReactNode[];
  }
> = {
  KID: {
    extraSections: [
      <SharedWalletSection key="shared-wallet" />,
      <SavingMailboxSection key="saving-mailbox" />,
    ],
  },
  PARENT: {
    extraSections: [<MyKidSection key="my-kid" />],
  },
};

function getMainAccountInfo(accounts: Account[]): MainAccountInfo | undefined {
  const freeAccount = accounts.find(
    (account) => account.accountType === "FREE",
  );

  if (!freeAccount) return undefined;

  return {
    bankName: freeAccount.name,
    accountNumber: freeAccount.accountNumber,
  };
}

async function Page() {
  const userRole = await getUserRole();
  let accounts: Account[] = [];

  try {
    const result = await serverSpringFetch<GetMyAccountsResponse>(
      "/api/accounts/me",
      {
        method: "GET",
        cache: "no-store",
      },
    );

    accounts = result.data;
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }

  const pageData = walletPageData[userRole];
  const mainAccountInfo =
    userRole === "PARENT" ? getMainAccountInfo(accounts) : undefined;

  return (
    <main className="space-y-6 px-6 py-4">
      <WalletBalance role={userRole} />
      <AccountList
        userRole={userRole}
        accounts={accounts}
        mainAccountInfo={mainAccountInfo}
      />
      {pageData.extraSections}
    </main>
  );
}

export default Page;
