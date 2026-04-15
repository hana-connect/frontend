import { ASSET_COLORS } from "../_constants/assetCategories";
import { formatCurrency } from "../_utils/formatters";

type AIAssetAllocationProps = {
  assetData: {
    depositSavings?: number;
    depositWithdrawal?: number;
    investment?: number;
    pension?: number;
    totalAssets?: number;
  } | null;
};

export default function AIAssetAllocation({
  assetData,
}: AIAssetAllocationProps) {
  // 2. 그래프 막대기 너비 계산용 (0으로 나누기 방지!)
  const total = assetData?.totalAssets || 1;
  const getWidth = (value?: number) => `${((value || 0) / total) * 100}%`;

  const assetList = [
    {
      label: "예·적금",
      color: ASSET_COLORS.예적금,
      value: assetData?.depositSavings,
    },
    {
      label: "입출금",
      color: ASSET_COLORS.입출금,
      value: assetData?.depositWithdrawal,
    },
    { label: "투자", color: ASSET_COLORS.투자, value: assetData?.investment },
    { label: "연금", color: ASSET_COLORS.연금, value: assetData?.pension },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold mb-4 text-black">AI 자산분배</h2>
      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
        {/* 3. 이제 막대기가 실제 자산 비율에 맞춰서 춤을 춰요! */}
        <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-gray-200">
          <div
            style={{
              width: getWidth(assetData?.depositSavings),
              backgroundColor: ASSET_COLORS.예적금,
            }}
          />
          <div
            style={{
              width: getWidth(assetData?.depositWithdrawal),
              backgroundColor: ASSET_COLORS.입출금,
            }}
          />
          <div
            style={{
              width: getWidth(assetData?.investment),
              backgroundColor: ASSET_COLORS.투자,
            }}
          />
          <div
            style={{
              width: getWidth(assetData?.pension),
              backgroundColor: ASSET_COLORS.연금,
            }}
          />
        </div>

        <div className="space-y-3 text-sm">
          {assetList.map((item) => (
            <div
              key={item.label}
              className="flex justify-between text-gray-700"
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              {/* 4. 하드코딩된 글자 대신 실제 데이터를 넣어요! */}
              <span className="font-medium text-black">
                {formatCurrency(item.value || 0)}원
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold pt-3 border-t text-black">
            <span>총 자산</span>
            <span>{formatCurrency(assetData?.totalAssets || 0)}원</span>
          </div>
        </div>
      </div>
    </section>
  );
}
