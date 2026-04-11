"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AIAssetAllocation from "./_components/AIAssetAllocation";
import AllowanceSliderSection from "./_components/AllowanceSliderSection";
import CurrentAsset from "./_components/CurrentAsset";
import HanaNextBanner from "./_components/HanatheNextBanner";
import RecentAssetChange from "./_components/RecentAssetChange";
import { useAllowanceSlider } from "./_hooks/useAllowanceSlider";
import { useAssetAnalysis } from "./_hooks/useAssetAnalysis";
import type { Account } from "./_types/asset";

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
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 font-sans flex flex-col">
      <header className="flex items-center mb-8">
        <button type="button" className="text-xl mr-4 text-gray-800">
          {"<"}
        </button>
        <h1 className="text-lg font-bold text-black">AI 자산 도우미</h1>
      </header>

      {/* 📍 메인 콘텐츠 영역: flex-1을 사용하여 남은 세로 공간을 다 차지함 */}
      <div className="flex-1">
        {!isLinked ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-600 mb-6 text-sm">
              불러올 자산이 없어요.
              <br />
              지금 바로 불러와서 분석을 시작하세요!
            </p>
            <button
              type="button"
              onClick={handleLinkAssets}
              className="w-full bg-violet-500 text-white py-4 rounded-2xl font-bold shadow-lg"
            >
              {isLoading ? "AI 분석 중..." : "자산 불러오기"}
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
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
      </div>

      {/* 📍 위치 수정: 조건문 밖으로 빼서 어느 상태에서든 항상 하단에 노출됨 */}
      <div className="mt-10">
        <HanaNextBanner />
      </div>
    </div>
  );
}
