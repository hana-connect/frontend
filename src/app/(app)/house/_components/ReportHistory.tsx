import Link from "next/link";

export interface HistoryItem {
  year: number;
  level: number;
  totalCount: number;
  paidAt: string;
  isFirst: boolean;
  reward: string;
}

type ReportHistoryProps = {
  histories: HistoryItem[];
  kidId?: string;
};

function ReportHistory({ histories, kidId }: ReportHistoryProps) {
  if (histories.length === 0) {
    return null;
  }

  return (
    <section className="pb-11">
      <h2 className="text-heading-20-b mb-6">납입 히스토리</h2>
      <div className="flex flex-col gap-6">
        {histories.map((item) => {
          const displayDate = item.paidAt.replaceAll("-", ".");
          const displayTitle = item.isFirst
            ? "첫 납입 완료"
            : `${item.level - 1}년 연속 납입 완료`;

          const params = new URLSearchParams();
          if (kidId) params.set("kidId", kidId);
          params.set("paidAt", item.paidAt);

          return (
            <Link
              key={item.paidAt}
              href={`?${params.toString()}`}
              className="flex items-center justify-between py-1"
            >
              <p className="flex-1 whitespace-nowrap text-body-16-m text-brand-purple-1">
                {displayTitle}
              </p>

              <div className="flex items-center">
                <p className="whitespace-nowrap text-body-16-m text-grey-2">
                  {displayDate}
                </p>
                <p className="ml-2 w-23 whitespace-nowrap text-right text-body-16-m text-grey-1">
                  {item.reward}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ReportHistory;
