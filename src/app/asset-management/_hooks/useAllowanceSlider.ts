import { useMemo, useState } from "react";

export const useAllowanceSlider = (
  initialRatio: number = 10,
  totalAmount: number = 1000000,
) => {
  const [ratio, setRatio] = useState(initialRatio); // 아이 비율 (0~100)

  // 메모이제이션을 통해 비율이 바뀔 때만 금액을 다시 계산합니다.
  const allowanceAmount = useMemo(() => {
    return Math.floor(totalAmount * (ratio / 100));
  }, [ratio, totalAmount]);

  const myAmount = useMemo(() => {
    return totalAmount - allowanceAmount;
  }, [totalAmount, allowanceAmount]);

  const handleRatioChange = (value: number) => {
    setRatio(value);
  };

  return {
    ratio,
    allowanceAmount,
    myAmount,
    handleRatioChange,
  };
};
