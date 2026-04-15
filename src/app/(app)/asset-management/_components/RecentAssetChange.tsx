"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type RecentAssetChangeProps = {
  aiRecommendation: {
    assetHistory?: number[];
    increaseRate?: number;
  } | null;
};

export default function RecentAssetChange({
  aiRecommendation,
}: RecentAssetChangeProps) {
  const history = aiRecommendation?.assetHistory || [0, 0, 0, 0];
  const increaseRate = aiRecommendation?.increaseRate || 0;
  const months = ["1월", "2월", "3월", "4월"];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 그래프 높이 계산 로직
  const minAsset = Math.min(...history);
  const maxAsset = Math.max(...history);
  const range = maxAsset - minAsset || 1;

  return (
    <section className="mt-8 mb-10">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-black">최근 자산 변화</h2>
        <p className="text-base text-gray-400 mt-1">
          자산 추이 정확도에 영향을 주는
          <br />
          대출, 투자, 현금은 포함되지 않아요
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-end justify-between h-32 px-2 mb-2">
          {history.map((value, index) => {
            const isCurrent = index === history.length - 1;

            const enhancedHeight = isMounted
              ? ((value - minAsset) / range) * 70 + 30
              : 0;

            return (
              <div
                key={months[index]}
                className="flex flex-col items-center gap-2 h-full justify-end"
              >
                <motion.div
                  initial={{ height: "0%", opacity: 0 }}
                  animate={{ height: `${enhancedHeight}%`, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className={`w-8 rounded-t-lg ${isCurrent ? "bg-violet-400 shadow-sm" : "bg-gray-200"}`}
                />
                <span
                  className={`text-xs ${isCurrent ? "font-bold text-black" : "text-gray-500"}`}
                >
                  {months[index]}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-black mt-4">
          자산이 지난 달보다{" "}
          <span className="text-violet-600 font-bold">
            {isMounted ? `${increaseRate}%` : "--%"}
          </span>{" "}
          늘었어요
        </p>
      </div>
    </section>
  );
}
