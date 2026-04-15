import { ASSET_COLORS } from "../_constants/assetCategories";
import { formatCurrency } from "../_utils/formatters";

type CurrentAssetProps = {
  assetData: {
    savings?: number;
    checking?: number;
    investment?: number;
    pension?: number;
    total?: number;
  } | null;
};

export default function CurrentAsset({ assetData }: CurrentAssetProps) {
  const assetList = [
    { label: "예·적금", color: ASSET_COLORS.예적금, value: assetData?.savings },
    { label: "입출금", color: ASSET_COLORS.입출금, value: assetData?.checking },
    { label: "투자", color: ASSET_COLORS.투자, value: assetData?.investment },
    { label: "연금", color: ASSET_COLORS.연금, value: assetData?.pension },
  ];

  return (
    <section className="mt-2">
      <h2 className="text-lg font-bold mb-4 text-black">현재 자산</h2>

      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
        <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-gray-200">
          <div style={{ width: "65%", backgroundColor: ASSET_COLORS.예적금 }} />
          <div style={{ width: "10%", backgroundColor: ASSET_COLORS.입출금 }} />
          <div style={{ width: "10%", backgroundColor: ASSET_COLORS.투자 }} />
          <div style={{ width: "15%", backgroundColor: ASSET_COLORS.연금 }} />
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
                ></span>
                {item.label}
              </span>
              <span className="font-medium text-black">
                {formatCurrency(item.value || 0)}원
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold pt-3 border-t text-black">
            <span>총 자산</span>
            <span>{formatCurrency(assetData?.total || 0)}원</span>
          </div>
        </div>
      </div>
    </section>
  );
}
