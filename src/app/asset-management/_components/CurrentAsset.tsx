import { ASSET_COLORS } from "../_constants/assetCategories";
import { formatCurrency } from "../_utils/formatters";

interface Props {
  assetData: any;
}

export default function CurrentAsset({ assetData }: Props) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-4 text-black">현재 자산</h2>
      <div className="h-4 w-full flex rounded-full overflow-hidden mb-4 bg-gray-200">
        {/* 비중은 예시 데이터 비율에 맞춰 조정 */}
        <div style={{ width: "65%", backgroundColor: ASSET_COLORS.예적금 }} />
        <div style={{ width: "10%", backgroundColor: ASSET_COLORS.입출금 }} />
        <div style={{ width: "10%", backgroundColor: ASSET_COLORS.투자 }} />
        <div style={{ width: "15%", backgroundColor: ASSET_COLORS.연금 }} />
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>예·적금</span>
          <span>{formatCurrency(assetData?.savings || 0)}원</span>
        </div>
        <div className="flex justify-between">
          <span>입출금</span>
          <span>{formatCurrency(assetData?.checking || 0)}원</span>
        </div>
        <div className="flex justify-between">
          <span>투자</span>
          <span>{formatCurrency(assetData?.investment || 0)}원</span>
        </div>
        <div className="flex justify-between">
          <span>연금</span>
          <span>{formatCurrency(assetData?.pension || 0)}원</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t text-black">
          <span>총 자산</span>
          <span>{formatCurrency(assetData?.total || 0)}원</span>
        </div>
      </div>
    </section>
  );
}
