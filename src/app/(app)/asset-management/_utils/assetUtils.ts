export function getAssetTendency(investmentRatio: number): string {
  if (investmentRatio >= 50) return "공격적인 투자형";
  if (investmentRatio >= 20) return "균형 잡힌 자산가";
  return "안정적인 저축형";
}

export const getRateColor = (rate: number): string => {
  return rate > 0 ? "text-red-500" : "text-blue-500";
};
