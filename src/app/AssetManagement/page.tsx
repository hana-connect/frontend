"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AssetData {
  savings: number;
  checking: number;
  investment: number;
  total: number;
  changeRate: number;
}

export default function AssetManagementPage() {
  const [isLinked, setIsLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allowanceRatio, setAllowanceRatio] = useState(10);
  const [assetData, setAssetData] = useState<AssetData | null>(null);

  const chartData = [
    { month: "1월", height: 40 },
    { month: "2월", height: 50 },
    { month: "3월", height: 70 },
    { month: "4월", height: 90 },
  ];

  const handleLinkAssets = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAssetData({
        savings: 100000000,
        checking: 2500000,
        investment: 30000000,
        total: 132500000,
        changeRate: 8,
      });
      setIsLinked(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    // flex-col과 min-h-screen을 주어 배너를 바닥에 고정할 준비를 합니다.
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 font-sans flex flex-col">
      <header className="flex items-center mb-8">
        <button type="button" className="text-xl mr-4">
          {"<"}
        </button>
        <h1 className="text-lg font-bold">AI 자산 도우미</h1>
      </header>

      {/* flex-1 영역: 이 안의 내용이 적더라도 배너를 아래로 밀어냅니다. */}
      <div className="flex-1">
        {!isLinked ? (
          /* CASE: 자산 연결 전 */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-600 mb-6">
              불러올 자산이 없어요.
              <br />
              지금 바로 불러와서
              <br />
              아이에게 줄 용돈 추천까지 받아보세요!
            </p>
            <button
              type="button"
              onClick={handleLinkAssets}
              className="w-full bg-violet-500 text-white py-4 rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
            >
              {isLoading ? "AI 분석 중..." : "자산 불러오기"}
            </button>
          </div>
        ) : (
          /* CASE: 자산 연결 완료 */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <section>
              <h2 className="text-lg font-bold mb-4">현재 자산</h2>
              <div className="h-4 w-full flex rounded-full overflow-hidden mb-4">
                <div className="bg-red-400" style={{ width: "70%" }} />
                <div className="bg-yellow-400" style={{ width: "5%" }} />
                <div className="bg-blue-500" style={{ width: "25%" }} />
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>예·적금</span>
                  <span>{assetData?.savings.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>입출금</span>
                  <span>{assetData?.checking.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>연금/투자</span>
                  <span>{assetData?.investment.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t text-black">
                  <span>총 자산</span>
                  <span>{assetData?.total.toLocaleString()}원</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2">최근 자산 변화</h2>
              <div className="flex items-end justify-around h-32 bg-white rounded-2xl p-4 shadow-sm">
                {chartData.map((data) => (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${data.height}%` }}
                    transition={{
                      delay: chartData.indexOf(data) * 0.1,
                      type: "spring",
                    }}
                    className={`w-8 rounded-t-md ${data.month === "4월" ? "bg-violet-400" : "bg-gray-200"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-sm">
                자산이 지난 달보다{" "}
                <span className="text-violet-500 font-bold">
                  {assetData?.changeRate}%
                </span>{" "}
                늘었어요
              </p>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-2 text-black">
                아이 비율 설정하기
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                AI 추천 결과 10:90을 추천드려요. 직접 조절해보세요!
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="text-center w-12 text-xs text-gray-600">
                  아이
                  <br />
                  {allowanceRatio}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allowanceRatio}
                  onChange={(e) => setAllowanceRatio(Number(e.target.value))}
                  className="flex-1 h-2 bg-violet-100 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
                <div className="text-center w-12 text-xs text-gray-600">
                  나<br />
                  {100 - allowanceRatio}
                </div>
              </div>
              <p className="text-center font-medium mb-6 text-gray-800">
                추천 용돈은{" "}
                <span className="text-violet-600 font-bold">
                  {(1000000 * (allowanceRatio / 100)).toLocaleString()}원
                </span>
                입니다.
              </p>
              <button
                type="button"
                className="w-full bg-violet-500 text-white py-4 rounded-2xl font-bold"
              >
                지금 바로 추천된 용돈 주기
              </button>
            </section>
          </motion.div>
        )}
      </div>

      {/* 하단 배너: {} 중괄호 밖으로 빼서 항상 노출되게 합니다. */}
      <div className="bg-violet-50 p-6 rounded-2xl text-center mt-10">
        <p className="text-xs mb-3 text-gray-600">
          더 자세한 자산관리가 필요하신가요?
        </p>
        <button
          type="button"
          onClick={() =>
            window.open(
              "https://www.hana1qm.com/web/sub/tlist.do?topyn=Y&pcatid=46",
              "_blank",
            )
          }
          className="text-violet-600 font-bold text-sm border border-violet-200 px-6 py-2 rounded-full bg-white transition-colors hover:bg-violet-100"
        >
          하나더넥스트 예약하기
        </button>
      </div>
    </div>
  );
}
