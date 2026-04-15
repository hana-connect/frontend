import AccountList from "./_components/AccountList";
import KidSection from "./_components/KidSection";
import WalletBalance from "./_components/WalletBalance";

function Page() {
  const accounts = [
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

  return (
    <main className="px-6 py-4 space-y-6">
      <WalletBalance />
      <AccountList userRole="CHILD" accounts={accounts} />
      <AccountList
        userRole="PARENT"
        mainAccountInfo={{
          bankName: "하나은행",
          accountNumber: "589-910061-78107",
        }}
        accounts={accounts}
      />
      <KidSection />
    </main>
  );
}

export default Page;
