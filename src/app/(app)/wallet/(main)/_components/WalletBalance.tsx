import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Button from "@/common/components/button/Button";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import { formatMoney } from "@/common/lib/utils";
import TransferButton from "./TransferButton";

type WalletData = {
  name: string;
  walletMoney: number;
};

async function WalletBalance({ role }: { role: "PARENT" | "KID" }) {
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
    <>
      <div className="flex items-center justify-between rounded-2xl pt-5 pb-7 m-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-heading-24-b">
            <span className="text-brand-black">내 지갑 잔액</span>
            <CircleQuestionMark size={18} className="text-[#333]" />
          </div>
          <span className="text-[32px] text-heading-24-b text-brand-black">
            {formatMoney(walletData.walletMoney)}
          </span>
        </div>

        <Image
          src="/svg/wallet/ic_wallet.svg"
          alt="wallet"
          width={90}
          height={90}
          className="object-contain"
        />
      </div>
      {role === "PARENT" && (
        <section className="flex items-center gap-2">
          <TransferButton />
          <Button variant="smallGray" size="M" className="flex-1">
            용돈 지급
          </Button>
        </section>
      )}
      <div className="border-b-[1px] border-grey-5" />
    </>
  );
}

export default WalletBalance;
