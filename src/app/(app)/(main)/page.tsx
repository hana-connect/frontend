import { redirect } from "next/navigation";
import Header from "@/common/components/header/Header";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import { getUserRole } from "@/common/lib/auth/get-user-role";
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

export type KidData = {
  connectMemberId: number;
  connectMemberName: string;
};

async function getWalletData(): Promise<WalletData> {
  try {
    const res = await serverSpringFetch<ApiResponse<WalletData>>(
      "/api/wallet",
      { cache: "no-store" },
    );

    if (!res.data) throw new Error("지갑 데이터를 찾을 수 없습니다.");

    return res.data;
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 401) {
      redirect("/login");
    }
    throw error;
  }
}

async function getParents(): Promise<ParentData[]> {
  try {
    const res = await serverSpringFetch<ApiResponse<ParentData[]>>(
      "/api/parents",
      { cache: "no-store" },
    );

    return res.data ?? [];
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 401) {
      redirect("/login");
    }
    return [];
  }
}

async function getKids(): Promise<KidData[]> {
  try {
    const res = await serverSpringFetch<ApiResponse<KidData[]>>(
      "/api/kids",

      { cache: "no-store" },
    );

    return res.data ?? [];
  } catch (error) {
    if (error instanceof SpringApiError && error.status === 401) {
      redirect("/login");
    }

    return [];
  }
}

export default async function Page() {
  const memberRole = await getUserRole();

  const [wallet, parents, kids] = await Promise.all([
    getWalletData(),

    memberRole === "KID" ? getParents() : Promise.resolve([]),
    memberRole === "PARENT" ? getKids() : Promise.resolve([]),
  ]);

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <Header type="main" />

      <div className="pt-15">
        <MainRoleView wallet={wallet} parents={parents} kids={kids} />
      </div>

      <ScrollTopButton />

      <BottomMenu />
    </div>
  );
}
