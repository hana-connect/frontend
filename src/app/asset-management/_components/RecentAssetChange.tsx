"use client";

import { motion } from "framer-motion";

export default function RecentAssetChange() {
  const chartData = [
    { month: "1월", height: "40%", isCurrent: false },
    { month: "2월", height: "50%", isCurrent: false },
    { month: "3월", height: "60%", isCurrent: false },
    { month: "4월", height: "100%", isCurrent: true },
  ];

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
      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
        <div className="flex items-end justify-between h-32 px-2 mb-2">
          {chartData.map((item, index) => (
            <div
              key={item.month}
              className="flex flex-col items-center gap-2 h-full justify-end"
            >
              <motion.div
                initial={{ height: "0%", opacity: 0 }}
                animate={{ height: item.height, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className={`w-8 rounded-t-lg ${
                  item.isCurrent ? "bg-violet-400 shadow-sm" : "bg-gray-200"
                }`}
              />
              <span
                className={`text-xs ${
                  item.isCurrent ? "font-bold text-black" : "text-gray-500"
                }`}
              >
                {item.month}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-black mt-4">
          자산이 지난 달보다{" "}
          <span className="text-violet-600 font-bold">8%</span> 늘었어요
        </p>
      </div>
    </section>
  );
}
