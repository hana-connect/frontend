import { useEffect, useState } from "react";
import type { Account } from "../_types/asset";

export const useAssetAnalysis = (accounts: Account[]) => {
  const [assetData, setAssetData] = useState<any>(null); // UI 표시를 위해 타입을 확장합니다.

  useEffect(() => {
    if (accounts.length === 0) return;

    const summary = accounts.reduce(
      (acc, cur) => {
        if (cur.account_type === "입출금") acc.checking += cur.balance;
        else if (cur.account_type === "예금" || cur.account_type === "적금")
          acc.savings += cur.balance;
        else if (cur.account_type === "청약")
          acc.investment += cur.balance; // 청약 추가
        else if (cur.account_type === "연금") acc.pension += cur.balance; // 연금 추가

        acc.total += cur.balance;
        return acc;
      },
      { savings: 0, checking: 0, investment: 0, pension: 0, total: 0 }, // 초기값 세분화
    );

    setAssetData({ ...summary, changeRate: 8 });
  }, [accounts]);

  return { assetData };
};
