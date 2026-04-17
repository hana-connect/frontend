"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { TransferExecuteResponse } from "@/app/api/transfer/type";
import Button from "@/common/components/button/Button";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export default function TransferResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const transferId = searchParams.get("transferId");

  const [data, setData] = useState<TransferExecuteResponse | null>(null);

  useEffect(() => {
    if (!transferId) {
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await apiClient.get<ApiResponse<TransferExecuteResponse>>(
          `/api/transfer/${transferId}`,
        );

        setData(res.data);
      } catch (error) {
        console.error("송금 결과 조회 실패", error);
      }
    };

    fetchResult();
  }, [transferId]);

  const formatAmount = (value: number | undefined) => {
    if (!value) return "0원";
    return `${value.toLocaleString()}원`;
  };

  const formatAccountNumber = (value: string | null | undefined) => {
    if (!value) return "-";
    return value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "-";
    return date.slice(0, 10).replace(/-/g, ".");
  };

  const handleSubmit = () => {
    router.push("/");
  };

  if (!data) return null;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1 flex-col items-center px-6 pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />

        <h1 className="mt-6 text-sm font-medium text-brand-black">
          송금이 완료되었어요!
        </h1>

        <div className="mt-12 h-[0.8px] w-full bg-grey-5" />

        <div className="mt-6 flex w-full justify-between pb-4 text-body-16-m text-grey-6">
          <span>입금 계좌번호</span>
          <span className="text-brand-black">
            {formatAccountNumber(data.toAccountNumber)}
          </span>
        </div>

        <div className="flex w-full justify-between pb-4 text-body-16-m text-grey-6">
          <span>송금 금액</span>
          <span className="text-brand-black">{formatAmount(data.amount)}</span>
        </div>

        <div className="flex w-full justify-between text-body-16-m text-grey-6">
          <span>송금일</span>
          <span className="text-brand-black">
            {formatDate(data.transferredAt)}
          </span>
        </div>
      </div>

      <div className="w-full px-6 pb-9">
        <Button size="L" variant="active" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </main>
  );
}
