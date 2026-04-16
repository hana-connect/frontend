import { redirect } from "next/navigation";
import Header from "@/common/components/header/Header";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import { getUserRole } from "@/common/lib/auth/get-user-role";
import { formatMoney } from "@/common/lib/utils";
import AccountList from "./_components/AccountList";
import MyKidSection from "./_components/MyKidSection";
import SavingMailboxSection from "./_components/SavingMailboxSection";
import SharedWalletSection from "./_components/SharedWalletSection";
import WalletBalance from "./_components/WalletBalance";
import type {
  Account,
  KidInfo,
  KidLinkedAccount,
  MainAccountInfo,
  UserRole,
} from "./_types";

type GetMyAccountsResponse = ApiResponse<Account[]>;

type KidListItem = {
  connectMemberId: number;
  connectMemberName: string;
  connectMemberPhoneName: string;
  connectMemberRole: "KID";
};

type GetMyKidsResponse = ApiResponse<KidListItem[]>;

type KidDetailResponse = ApiResponse<{
  accounts: KidLinkedAccount[];
  kidId: number;
  kidName: string;
  walletMoney: number;
}>;

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
    extraSections: [],
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

async function getMyKids(): Promise<KidInfo[]> {
  const kidListResult = await serverSpringFetch<GetMyKidsResponse>(
    "/api/kids",
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const kidList = kidListResult.data ?? [];

  const kidDetails = await Promise.all(
    kidList.map(async (kid) => {
      try {
        const detailResult = await serverSpringFetch<KidDetailResponse>(
          `/api/kids/${kid.connectMemberId}/linked-accounts`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const detail = detailResult.data;

        if (!detail) {
          return {
            id: kid.connectMemberId,
            name: kid.connectMemberName,
            imageSrc: "/images/kid-avatar.png",
            monthlyAllowance: 0,
            walletBalanceText: formatMoney(0),
            regularAllowanceText:
              "매일, 매주 원하는 날짜에\n용돈을 보낼 수 있어요.",
            allowancePlanText: "공유한 용돈 계획이 없어요.",
            accounts: [],
          };
        }

        // 청약 맨 위 정렬
        const sortedAccounts = [...detail.accounts].sort((a, b) => {
          if (
            a.accountType === "SUBSCRIPTION" &&
            b.accountType !== "SUBSCRIPTION"
          ) {
            return -1;
          }
          if (
            a.accountType !== "SUBSCRIPTION" &&
            b.accountType === "SUBSCRIPTION"
          ) {
            return 1;
          }
          return 0;
        });

        return {
          id: kid.connectMemberId,
          name: detail.kidName,
          imageSrc: "/images/kid-avatar.png",
          monthlyAllowance: 0,
          walletBalanceText: formatMoney(detail.walletMoney),
          regularAllowanceText:
            "매일, 매주 원하는 날짜에\n용돈을 보낼 수 있어요.",
          allowancePlanText: "공유한 용돈 계획이 없어요.",
          accounts: sortedAccounts,
        };
      } catch (error) {
        console.error(`자녀(${kid.connectMemberId}) 조회 실패`, error);

        // 실패한 kid만 fallback
        return {
          id: kid.connectMemberId,
          name: kid.connectMemberName,
          imageSrc: "/images/kid-avatar.png",
          monthlyAllowance: 0,
          walletBalanceText: formatMoney(0),
          regularAllowanceText:
            "매일, 매주 원하는 날짜에\n용돈을 보낼 수 있어요.",
          allowancePlanText: "공유한 용돈 계획이 없어요.",
          accounts: [],
        };
      }
    }),
  );

  return kidDetails;
}

async function Page() {
  const userRole = await getUserRole();
  let accounts: Account[] = [];
  let kids: KidInfo[] = [];

  try {
    const result = await serverSpringFetch<GetMyAccountsResponse>(
      "/api/accounts/me",
      {
        method: "GET",
        cache: "no-store",
      },
    );

    accounts = (result.data ?? []).sort((a, b) => {
      if (
        a.accountType === "SUBSCRIPTION" &&
        b.accountType !== "SUBSCRIPTION"
      ) {
        return -1;
      }
      if (
        a.accountType !== "SUBSCRIPTION" &&
        b.accountType === "SUBSCRIPTION"
      ) {
        return 1;
      }
      return 0;
    });

    kids = await getMyKids();
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
    <>
      <Header type="sub" title="내 지갑" rightActionText="거래내역" />
      <main className="space-y-6 px-6 py-4">
        <WalletBalance role={userRole} />
        <AccountList
          userRole={userRole}
          accounts={accounts}
          mainAccountInfo={mainAccountInfo}
        />
        {/* 아이도 아이 리스트 볼 수 있음 */}
        <MyKidSection kids={kids} />
        {pageData.extraSections}
      </main>
    </>
  );
}

export default Page;
