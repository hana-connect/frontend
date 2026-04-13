import { useMemo, useState } from "react";

export const useAllowanceSlider = (
  initialRatio: number = 10,
  totalAmount: number = 1000000,
) => {
  const [ratio, setRatio] = useState(initialRatio);

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
