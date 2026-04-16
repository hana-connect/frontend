import { ASSET_COLORS } from "../_constants/assetCategories";
import { formatCurrency } from "../_utils/formatters";

type AIAssetAllocationProps = {
  assetData: {
    recommendedDepositSavings?: number;
    recommendedDepositWithdrawal?: number;
    recommendedInvestment?: number;
    recommendedPension?: number;
    totalAssets?: number;
    aiComment?: string;
  } | null;
};

export default function AIAssetAllocation({
  assetData,
}: AIAssetAllocationProps) {
  const total = assetData?.totalAssets || 1;
  const getWidth = (value?: number) => `${((value || 0) / total) * 100}%`;

  const aiDescription = assetData?.aiComment
    ? `${assetData.aiComment.split(".")[0]}.`
    : "자산을 분석하여 최적의 분배율을 계산했습니다.";

  const assetList = [
    {
      label: "예·적금",
      color: ASSET_COLORS.예적금,
      value: assetData?.recommendedDepositSavings,
    },
    {
      label: "입출금",
      color: ASSET_COLORS.입출금,
      value: assetData?.recommendedDepositWithdrawal,
    },
    {
      label: "투자",
      color: ASSET_COLORS.투자,
      value: assetData?.recommendedInvestment,
    },
    {
      label: "연금",
      color: ASSET_COLORS.연금,
      value: assetData?.recommendedPension,
    },
  ];

  return (
    <section className="mt-10">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-black">AI 자산분배</h2>
        <p className="text-base text-gray-400 mt-1">{aiDescription}</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
        <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-gray-200">
          <div
            style={{
              width: getWidth(assetData?.recommendedDepositSavings),
              backgroundColor: ASSET_COLORS.예적금,
            }}
          />
          <div
            style={{
              width: getWidth(assetData?.recommendedDepositWithdrawal),
              backgroundColor: ASSET_COLORS.입출금,
            }}
          />
          <div
            style={{
              width: getWidth(assetData?.recommendedInvestment),
              backgroundColor: ASSET_COLORS.투자,
            }}
          />
          <div
            style={{
              width: getWidth(assetData?.recommendedPension),
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
