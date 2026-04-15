// 금액에 쉼표 추가 (1000000 -> 1,000,000)
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("ko-KR");
};

// 억 단위 포맷팅 (132500000 -> 1억 3,250만원)
export const formatAssetUnit = (amount: number): string => {
  const eok = Math.floor(amount / 100000000);
  const man = Math.floor((amount % 100000000) / 10000);
  if (eok > 0) return `${eok}억 ${man.toLocaleString()}만원`;
  return `${man.toLocaleString()}만원`;
};
