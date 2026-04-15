import { ASSET_COLORS } from "../_constants/assetCategories";

export default function AIAssetAllocation() {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold mb-4 text-black">AI 자산분배</h2>
      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
        <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-gray-200">
          <div style={{ width: "50%", backgroundColor: ASSET_COLORS.예적금 }} />
          <div style={{ width: "10%", backgroundColor: ASSET_COLORS.입출금 }} />
          <div style={{ width: "15%", backgroundColor: ASSET_COLORS.투자 }} />
          <div style={{ width: "25%", backgroundColor: ASSET_COLORS.연금 }} />
        </div>
        <div className="space-y-3 text-sm">
          {[
            {
              label: "예·적금",
              color: ASSET_COLORS.예적금,
              value: "101,000,000원",
            },
            {
              label: "입출금",
              color: ASSET_COLORS.입출금,
              value: "1,500,000원",
            },
            {
              label: "투자",
              color: ASSET_COLORS.투자,
              value: "10,000,000원",
            },
            {
              label: "연금",
              color: ASSET_COLORS.연금,
              value: "20,000,000원",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between text-gray-700"
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.label}
              </span>
              <span className="font-medium text-black">{item.value}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-3 border-t text-black">
            <span>총 자산</span>
            <span>132,500,000원</span>
          </div>
        </div>
      </div>
    </section>
  );
}
