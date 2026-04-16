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

export type AssetSummary = {
  depositSavings: number;
  depositWithdrawal: number;
  investment: number;
  pension: number;
  totalAssets: number;
};

export type AssetAIRecommendation = {
  recommendRatio: string;
  kidAllowance: number;
  aiComment: string;
  assetHistory: number[];
  increaseRate: number;
  recommendedDepositSavings?: number;
  recommendedDepositWithdrawal?: number;
  recommendedInvestment?: number;
  recommendedPension?: number;
  totalAssets?: number;
};

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

export default function AssetManagementClientPage({
  initialData,
  initialAiData,
}: {
  initialData: AssetSummary | null;
  initialAiData: AssetAIRecommendation | null;
}) {
  const [assetSummary, setAssetSummary] = useState(initialData);
  const [aiRecommendation, setAiRecommendation] = useState(initialAiData);
  const [isLinked, setIsLinked] = useState(!!initialData);
  const [isLoading, setIsLoading] = useState(false);

  const initialRatio = initialAiData?.recommendRatio
    ? Number(initialAiData.recommendRatio.split(":")[0])
    : 10;

  const { ratio, handleRatioChange } = useAllowanceSlider(
    initialRatio,
    1000000,
  );

  const handleLinkAssets = async () => {
    try {
      setIsLoading(true);
      // [첫 번째 택배] 자산 요약 정보 가져오기
      const response = await fetch("/api/assets/summary");
      const assetResult = await response.json();

      // [두 번째 택배] AI 추천 정보 가져오기
      const aiRes = await fetch("/api/assets/recommendation");
      const aiResult = await aiRes.json();

      if (assetResult.data && aiResult.data) {
        setAssetSummary(assetResult.data);
        setAiRecommendation(aiResult.data);

        // AI가 추천해준 비율("20:80")을 받아서 슬라이더 위치를 옮겨줌.
        const newRatio = Number(aiResult.data.recommendRatio.split(":")[0]);
        handleRatioChange(newRatio);

        setIsLinked(true);
      }
    } catch (error) {
      console.error("연동 에러:", error);
      alert("자산을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
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
            <CurrentAsset assetData={assetSummary} />
            <RecentAssetChange aiRecommendation={aiRecommendation} />
            <AIAssetAllocation assetData={aiRecommendation} />
            <AllowanceSliderSection
              ratio={ratio}
              handleRatioChange={handleRatioChange}
              aiRecommendation={aiRecommendation}
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
