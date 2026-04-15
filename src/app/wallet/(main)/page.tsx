import AccountList from "./_components/AccountList";
import MyKidSection from "./_components/MyKidSection";
import SavingMailboxSection from "./_components/SavingMailboxSection";
import SharedWalletSection from "./_components/SharedWalletSection";
import WalletBalance from "./_components/WalletBalance";
import type { Account, MainAccountInfo, UserRole } from "./_types";

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 1,
    name: "주택청약종합저축",
    number: "1102-111-055957",
    balance: 6900000,
  },
  {
    id: 2,
    name: "3·6·9 정기예금",
    number: "8811-122-234512",
    balance: 10000000,
  },
  {
    id: 3,
    name: "자유적금",
    number: "123-456-789012",
    balance: 3000000,
  },
];

const walletPageData: Record<
  UserRole,
  {
    accounts: Account[];
    mainAccountInfo?: MainAccountInfo;
    extraSections: React.ReactNode[];
  }
> = {
  KID: {
    accounts: MOCK_ACCOUNTS,
    extraSections: [
      <SharedWalletSection key="shared-wallet" />,
      <SavingMailboxSection key="saving-mailbox" />,
    ],
  },
  PARENT: {
    accounts: MOCK_ACCOUNTS,
    mainAccountInfo: {
      bankName: "하나은행",
      accountNumber: "589-910061-78107",
    },
    extraSections: [<MyKidSection key="my-kid" />],
  },
};

function Page() {
  const userRole: UserRole = "KID";
  const pageData = walletPageData[userRole];

  return (
    <main className="space-y-6 px-6 py-4">
      <WalletBalance role={userRole} />
      <AccountList
        userRole={userRole}
        accounts={pageData.accounts}
        mainAccountInfo={pageData.mainAccountInfo}
      />
      {pageData.extraSections}
    </main>
  );
}

export default Page;
