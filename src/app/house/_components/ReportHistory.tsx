"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DUMMY_HISTORIES } from "../_mocks";

export interface HistoryItem {
  year: number;
  level: number;
  totalCount: number;
  paidAt: string;
  isFirst: boolean;
  reward: string;
}

function ReportHistory() {
  const router = useRouter();
  const [histories, _setHistories] = useState<HistoryItem[]>(DUMMY_HISTORIES);
  const [isLoading, _setIsLoading] = useState(false);

  /*
  useEffect(() => {
    // fetch logic...
  }, []);
  */

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <section className="pb-11">
      <h2 className="text-heading-20-b mb-6">납입 히스토리</h2>
      <div className="flex flex-col gap-6">
        {histories.map((item) => {
          const displayDate = item.paidAt.replaceAll("-", ".");
          const displayTitle = item.isFirst
            ? "첫 납입 완료"
            : `${item.level - 1}년 연속 납입 완료`;

          return (
            // biome-ignore lint/a11y/noStaticElementInteractions: '
            // biome-ignore lint/a11y/useKeyWithClickEvents:''
            <div
              key={item.paidAt}
              className="flex items-center justify-between cursor-pointer py-1"
              onClick={() => router.push(`/report/${item.year}`)}
            >
              <p className="flex-1 text-body-16-m text-brand-purple-1 whitespace-nowrap">
                {displayTitle}
              </p>

              <div className="flex items-center">
                <p className="text-body-16-m text-grey-2 whitespace-nowrap">
                  {displayDate}
                </p>
                <p className="w-23 text-body-16-m text-grey-1 text-right ml-2 whitespace-nowrap">
                  {item.reward}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ReportHistory;
