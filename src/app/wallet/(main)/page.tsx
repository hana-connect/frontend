import AccountList from "./_components/AccountList";
import KidSection from "./_components/KidSection";
import SavingMailboxSection from "./_components/SavingMailboxSection";
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
    bottomSection: React.ReactNode;
  }
> = {
  KID: {
    accounts: MOCK_ACCOUNTS,
    bottomSection: <SavingMailboxSection />,
  },
  PARENT: {
    accounts: MOCK_ACCOUNTS,
    mainAccountInfo: {
      bankName: "하나은행",
      accountNumber: "589-910061-78107",
    },
    bottomSection: <KidSection />,
  },
};

function Page() {
  const userRole: UserRole = "KID";
  const pageData = walletPageData[userRole];

  return (
    <main className="space-y-6 px-6 py-4">
      <WalletBalance />
      <AccountList
        userRole={userRole}
        accounts={pageData.accounts}
        mainAccountInfo={pageData.mainAccountInfo}
      />
      {pageData.bottomSection}
    </main>
  );
}

export default Page;
