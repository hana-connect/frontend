import { redirect } from "next/navigation";
import Header from "@/common/components/header/Header";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import BottomMenu from "./_components/BottomMenu";
import MainRoleView from "./_components/MainRoleView";
import ScrollTopButton from "./_components/ScrollTopButton";

type WalletData = {
  name: string;
  walletMoney: number;
};

export default async function Page() {
  const getWalletData = async () => {
    try {
      const result = await serverSpringFetch<ApiResponse<WalletData>>(
        "/api/wallet",
        {
          method: "GET",
          next: { revalidate: 0 },
        },
      );

      if (!result.data) throw new Error("지갑 데이터를 찾을 수 없습니다.");

      return result.data;
    } catch (error) {
      if (error instanceof SpringApiError) {
        if (error.status === 401) {
          redirect("/login");
        }
        if (error.status === 403) {
          console.error("지갑 접근 권한 없음:", error.message);
        }
      }
      throw error;
    }
  };

  const walletData = await getWalletData();

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <Header type="main" />

      <div className="pt-15">
        <MainRoleView
          userName={walletData.name}
          balance={walletData.walletMoney}
        />
      </div>

      <ScrollTopButton />

      <BottomMenu />
    </div>
  );
}
