import AccountList from "./_components/AccountList";
import KidSection from "./_components/KidSection";
import WalletBalance from "./_components/WalletBalance";

function Page() {
  return (
    <main className="px-6 py-4 space-y-6">
      <WalletBalance />

      <AccountList />

      <KidSection />
    </main>
  );
}

export default Page;
