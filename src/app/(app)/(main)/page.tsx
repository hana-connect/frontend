import Header from "@/common/components/header/Header";
import BottomMenu from "./_components/BottomMenu";
import MainRoleView from "./_components/MainRoleView";
import ScrollTopButton from "./_components/ScrollTopButton";

export default async function Page() {
  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <Header type="main" />

      <div className="pt-15">
        <MainRoleView />
      </div>

      <ScrollTopButton />

      <BottomMenu />
    </div>
  );
}
