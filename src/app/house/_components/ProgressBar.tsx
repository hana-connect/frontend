type ProgressBarProps = {
  level: number;
  month: number;
};

function ProgressBar({ level, month }: ProgressBarProps) {
  const percentage = Math.min(Math.max((month / 12) * 100, 0), 100);

  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="bg-brand-purple-1 w-[55px] h-[55px] flex items-center justify-center rounded-full text-white text-title-20-sb">
        lv.{String(level).padStart(2, "0")}
      </div>
      <div className="flex-1 h-4 rounded-full bg-grey-4 relative">
        <div
          className="h-full rounded-full bg-brand-gradient-1"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
