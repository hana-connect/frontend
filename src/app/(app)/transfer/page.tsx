"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { TransferPrepareResponse } from "@/app/api/transfer/type";
import Header from "@/common/components/header/Header";
import TransferAmount from "@/common/components/keypad/TransferAmount";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

type TransferDraft = {
  accountId: number;
  amount: number;
};

export default function TransferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accountId = searchParams.get("accountId");

  const [data, setData] = useState<TransferPrepareResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accountId) {
      setLoading(false);
      return;
    }

    const fetchTransferPrepare = async () => {
      try {
        const result = await apiClient.get<
          ApiResponse<TransferPrepareResponse>
        >(`/api/transfer/prepare?accountId=${accountId}`);

        setData(result.data);
      } catch (error) {
        console.error("송금 준비 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransferPrepare();
  }, [accountId]);

  const handleNext = (amount: number) => {
    if (!accountId) return;

    const accountIdNumber = Number(accountId);

    if (!Number.isInteger(accountIdNumber) || accountIdNumber <= 0) return;

    const draft: TransferDraft = {
      accountId: accountIdNumber,
      amount,
    };

    sessionStorage.setItem("transferDraft", JSON.stringify(draft));
    router.push("/transfer/password");
  };

  if (loading) return <div />;
  if (!data) return <div>송금 정보를 불러올 수 없습니다.</div>;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-white">
        <Header type="sub" title="송금하기" />

        <TransferAmount
          accountHolder={data.displayName}
          accountNickname={data.accountAlias}
          balance={data.balance}
          maxAmount={data.balance}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}
