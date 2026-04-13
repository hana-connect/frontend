import { cn } from "@/common/lib/utils";

type QuizQuestionCardProps = {
  quizBadgeText: string;
  questionText: string;
  progressText?: string;
  muted?: boolean;
};

export default function QuizQuestionCard({
  quizBadgeText,
  questionText,
  progressText,
  muted = false,
}: QuizQuestionCardProps) {
  return (
    <div className="relative mt-6">
      <div className="absolute -top-5 left-6 z-10">
        <div className="relative flex items-center justify-center drop-shadow-[0_6px_0_rgba(0,0,0,0.08)]">
          <div className="flex">
            <div
              className={cn(
                "h-[51px] w-[51px] rounded-full",
                muted ? "bg-[#B8B8B8]" : "bg-brand-secondary",
              )}
            />
            <div
              className={cn(
                "-ml-4 h-[51px] w-[51px] rounded-full",
                muted ? "bg-[#B8B8B8]" : "bg-brand-secondary",
              )}
            />
            <div
              className={cn(
                "-ml-4 h-[51px] w-[51px] rounded-full",
                muted ? "bg-[#B8B8B8]" : "bg-brand-secondary",
              )}
            />
          </div>

          <span className="absolute whitespace-nowrap text-[20px] font-bold leading-7 text-white">
            {quizBadgeText}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-grey-5 bg-[#FFFFFF] px-6 pt-10 pb-6">
        {progressText && (
          <>
            <div className="text-right text-[20px] font-semibold leading-8 text-brand-black">
              {progressText}
            </div>
            <div className="my-3 border-t border-grey-5" />
          </>
        )}

        <p
          className={cn(
            "text-[20px] font-bold leading-8",
            muted ? "text-[#9C91B0]" : "text-brand-black",
          )}
        >
          {questionText}
        </p>
      </div>
    </div>
  );
}
