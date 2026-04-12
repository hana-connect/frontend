type QuickAddButtonsProps = {
  onQuickAdd: (amount: number) => void;
};

const QUICK_AMOUNTS = [
  { label: "+ 1만", value: 10000 },
  { label: "+ 3만", value: 30000 },
  { label: "+ 5만", value: 50000 },
];

export function QuickAddButtons({ onQuickAdd }: QuickAddButtonsProps) {
  return (
    <div className="mt-6 flex justify-center gap-3 px-11">
      {QUICK_AMOUNTS.map((btn) => (
        <button
          key={btn.label}
          type="button"
          className="flex-1 whitespace-nowrap rounded-xl border border-grey-4 py-1 text-[#555] text-grey-1 transition-colors"
          onClick={() => onQuickAdd(btn.value)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
