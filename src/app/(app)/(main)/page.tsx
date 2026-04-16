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

export type WalletData = {
  name: string;
  walletMoney: number;
};

export type ParentData = {
  connectMemberId: number;
  connectMemberName: string;
  connectMemberPhoneName: string;
  connectMemberRole: string;
};

function handleApiError(error: unknown, context: string): never {
  if (error instanceof SpringApiError) {
    if (error.status === 401) {
      redirect("/login");
    }
    if (error.status === 403) {
      console.error(`${context} 접근 권한 없음:`, error.message);
    }
  }
  throw error;
}

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
      handleApiError(error, "지갑");
    }
  };

  const getParents = async () => {
    try {
      const result = await serverSpringFetch<ApiResponse<ParentData[]>>(
        "/api/parents",
        {
          method: "GET",
          next: { revalidate: 0 },
        },
      );
      return result.data || [];
    } catch (error) {
      handleApiError(error, "부모 조회");
    }
  };

  const [walletData, parents] = await Promise.all([
    getWalletData(),
    getParents(),
  ]);

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <Header type="main" />

      <div className="pt-15">
        <MainRoleView wallet={walletData} parents={parents} />
      </div>

      <ScrollTopButton />

      <BottomMenu />
    </div>
  );
}
