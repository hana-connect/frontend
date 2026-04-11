import { motion } from "framer-motion";

export default function RecentAssetChange() {
  return (
    <section className="mt-8 mb-10">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-black">최근 자산 변화</h2>
        <p className="text-[11px] text-gray-400 mt-1">
          자산 추이 정확도에 영향을 주는
          <br />
          대출, 투자, 현금은 포함되지 않아요
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
        <div className="flex items-end justify-between h-32 px-2 mb-2">
          {[
            { month: "1월", height: "40%" },
            { month: "2월", height: "55%" },
            { month: "3월", height: "70%" },
          ].map((item) => (
            <div key={item.month} className="flex flex-col items-center gap-2">
              <div
                className="w-8 bg-gray-200 rounded-t-lg"
                style={{ height: item.height }}
              ></div>
              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-8 bg-violet-400 rounded-t-lg shadow-sm"
            ></motion.div>
            <span className="text-xs font-bold text-black">4월</span>
          </div>
        </div>
        <p className="text-center text-sm text-black mt-4">
          자산이 지난 달보다{" "}
          <span className="text-violet-600 font-bold">8%</span> 늘었어요
        </p>
      </div>
    </section>
  );
}
