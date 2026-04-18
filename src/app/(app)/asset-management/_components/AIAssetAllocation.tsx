import { formatMoney } from "@/common/lib/utils";
import { ASSET_COLORS } from "../_constants/assetCategories";
import type { AssetAIRecommendation } from "../AssetManagementClientPage";

type AIAssetAllocationProps = {
  assetData: AssetAIRecommendation | null;
};

export default function AIAssetAllocation({
  assetData,
}: AIAssetAllocationProps) {
  const total = assetData?.totalAssets || 0;
  const getWidth = (value?: number) => {
    if (total === 0) return "0%";
    return `${((value || 0) / total) * 100}%`;
  };

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

      <div className="bg-white p-6 rounded-3xl border border-grey-7 shadow-2xs">
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
            className="flex-1"
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
              <span className="font-medium text-black">
                {formatMoney(item.value ?? 0)}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold pt-3 border-t text-black">
            <span>총 자산</span>
            <span>
              <span>{formatMoney(assetData?.totalAssets ?? 0)}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
