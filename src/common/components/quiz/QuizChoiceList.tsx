import { cn } from "@/common/lib/utils";

type QuizChoiceListProps = {
  choices: string[];
  selectedIndex: number | null;
  disabled?: boolean;
  muted?: boolean;
  onSelect?: (index: number) => void;
  questionOrder?: number;
};

export default function QuizChoiceList({
  choices,
  selectedIndex,
  disabled = false,
  muted = false,
  onSelect,
  questionOrder = 0,
}: QuizChoiceListProps) {
  return (
    <div className="mt-5 flex flex-col gap-[14px]">
      {choices.map((choice, index) => {
        const isSelected = selectedIndex === index;

        if (disabled) {
          return (
            <div
              key={`${questionOrder}-${index}-${choice}`}
              className="flex h-20 w-full items-center justify-between rounded-2xl border border-grey-5 bg-[#FFFFFF] px-6 text-left"
            >
              <span
                className={cn(
                  "text-[18px] font-medium leading-6",
                  muted ? "text-[#B1A8BF]" : "text-[#101828]",
                )}
              >
                {choice}
              </span>

              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D1D5DC]">
                {isSelected && (
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      muted ? "bg-[#D1D5DC]" : "bg-brand-purple-1",
                    )}
                  />
                )}
              </div>
            </div>
          );
        }

        return (
          <label
            key={`${questionOrder}-${index}-${choice}`}
            className={cn(
              "flex h-20 w-full cursor-pointer items-center justify-between rounded-2xl bg-[#FFFFFF] px-6 text-left transition",
              isSelected
                ? "border-2 border-brand-purple-1"
                : "border border-grey-5",
            )}
          >
            <input
              type="radio"
              name="quiz-choice"
              value={choice}
              checked={isSelected}
              onChange={() => onSelect?.(index)}
              className="sr-only"
            />

            <span className="text-[18px] font-medium leading-6 text-[#101828]">
              {choice}
            </span>

            <div
              aria-hidden="true"
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2",
                isSelected ? "border-brand-purple-1" : "border-[#D1D5DC]",
              )}
            >
              {isSelected && (
                <div className="h-2.5 w-2.5 rounded-full bg-brand-purple-1" />
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
