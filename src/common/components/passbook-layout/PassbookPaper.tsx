import type { ReactNode } from "react";

type PassbookPaperProps = {
  children: ReactNode;
  currentCount: number;
  highlightRangeClass?: string;
};

const PassbookPaper = ({
  children,
  currentCount,
  highlightRangeClass,
}: PassbookPaperProps) => {
  const itemsPerPage = 12;
  const emptyRowsCount = itemsPerPage - currentCount;
  const emptyRows = Array.from({ length: emptyRowsCount });

  return (
    <div className="flex flex-col relative">
      {highlightRangeClass && (
        <div
          className={`absolute top-0 bottom-0 bg-grey-3 z-0 ${highlightRangeClass}`}
          aria-hidden="true"
        />
      )}

      {children}

      {emptyRows.map((_, i) => {
        const rowIndex = currentCount + i;
        const rowKey = `empty-row-${currentCount}-${i}`;

        return (
          <div key={rowKey} className="relative z-10">
            {rowIndex !== 0 && rowIndex % 6 === 0 && (
              <div className="h-px w-full bg-grey-5 my-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
            )}
            <div className="flex py-2 text-[14px] invisible">
              <span className="w-6">&nbsp;</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PassbookPaper;
