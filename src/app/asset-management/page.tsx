"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ScanLine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import AIAssetAllocation from "./_components/AIAssetAllocation";
import AllowanceSliderSection from "./_components/AllowanceSliderSection";
import CurrentAsset from "./_components/CurrentAsset";
import HanaNextBanner from "./_components/HanatheNextBanner";
import RecentAssetChange from "./_components/RecentAssetChange";
import { useAllowanceSlider } from "./_hooks/useAllowanceSlider";
import { useAssetAnalysis } from "./_hooks/useAssetAnalysis";
import type { Account } from "./_types/asset";

type HeaderProps = {
  type?: "main" | "sub";
  title?: string;
  rightActionText?: string;
  onAction?: () => void;
};

const Header = ({
  type = "main",
  title,
  rightActionText,
  onAction,
}: HeaderProps) => {
  const router = useRouter();

  if (type === "main") {
    return (
      <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-between bg-white px-4">
        <div className="flex items-center">
          <div className="relative h-10 w-10">
            <Image
              src="/svg/ic_logo_grey.svg"
              alt="하나 커넥트 로고"
              fill
              sizes="40px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
        <div className="flex items-center gap-7 text-[#949AAD] pr-2">
          <button type="button" aria-label="스캔" className="relative h-6 w-6">
            <ScanLine size={24} />
          </button>
          <button type="button" aria-label="알림" className="relative h-6 w-6">
            <Image
              src="/svg/ic_bell.svg"
              alt="알림"
              fill
              sizes="24px"
              style={{ objectFit: "contain" }}
            />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-center bg-white px-4 text-black border-b border-gray-100">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => router.back()}
        className="absolute left-4 p-1"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-[18px] font-semibold leading-none">{title}</h1>
      {rightActionText && (
        <button
          type="button"
          onClick={onAction}
          className="absolute right-4 text-sm font-medium"
        >
          {rightActionText}
        </button>
      )}
    </header>
  );
};

export default function AssetManagementPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLinked, setIsLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { assetData } = useAssetAnalysis(accounts);
  const { ratio, allowanceAmount, handleRatioChange } = useAllowanceSlider(
    10,
    1000000,
  );

  const handleLinkAssets = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockAccounts: Account[] = [
        {
          id: 1,
          name: "하나 주거래 통장",
          account_number: "123-456",
          account_type: "입출금",
          balance: 2500000,
          nickname: "생활비",
          is_reward: null,
          is_end: null,
          member_id: 101,
        },
        {
          id: 2,
          name: "행복한 예금",
          account_number: "987-654",
          account_type: "예금",
          balance: 100000000,
          nickname: "노후자금",
          is_reward: null,
          is_end: false,
          member_id: 101,
        },
        {
          id: 3,
          name: "청약저축",
          account_number: "333-333",
          account_type: "청약",
          balance: 10000000,
          nickname: "내집마련",
          is_reward: null,
          is_end: false,
          member_id: 101,
        },
        {
          id: 4,
          name: "개인연금",
          account_number: "444-444",
          account_type: "연금",
          balance: 20000000,
          nickname: "노후대비",
          is_reward: true,
          is_end: null,
          member_id: 101,
        },
      ];
      setAccounts(mockAccounts);
      setIsLinked(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-93.75 mx-auto min-h-screen bg-white font-sans flex flex-col shadow-xl overflow-hidden">
      <Header type="sub" title="AI 자산 도우미" />

      <main className="flex-1 px-6 flex flex-col items-stretch overflow-x-hidden">
        {!isLinked ? (
          <div className="flex-1 flex flex-col justify-center items-center py-10 text-center">
            <div className="mb-12">
              <p className="text-gray-800 text-[20px] font-bold mb-3">
                불러올 자산이 없어요.
              </p>
              <p className="text-gray-500 text-[17px] leading-relaxed">
                지금 바로 불러와서 <br />
                아이에게 줄 용돈 추천까지 받아보세요!
              </p>
            </div>

            <div className="w-full px-2">
              <Button
                size="L"
                variant="active"
                onClick={handleLinkAssets}
                className="w-full active:scale-[0.95] transition-all"
              >
                {isLoading ? "AI 분석 중..." : "자산 불러오기"}
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10 py-6"
          >
            <CurrentAsset assetData={assetData} />
            <RecentAssetChange />
            <AIAssetAllocation />
            <AllowanceSliderSection
              ratio={ratio}
              allowanceAmount={allowanceAmount}
              handleRatioChange={handleRatioChange}
            />
          </motion.div>
        )}

        <div className="mt-auto pb-10">
          <HanaNextBanner />
        </div>
      </main>
    </div>
  );
}
