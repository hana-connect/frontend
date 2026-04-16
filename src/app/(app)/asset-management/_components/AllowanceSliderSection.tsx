"use client";
import Button from "@/common/components/button/Button";
import { formatCurrency } from "../_utils/formatters";

type AllowanceSliderSectionProps = {
  ratio: number;
  allowanceAmount: number;
  handleRatioChange: (value: number) => void;
  aiRecommendation: {
    aiComment?: string;
    recommendRatio?: string;
    kidAllowance?: number;
  } | null;
};

export default function AllowanceSliderSection({
  ratio,
  handleRatioChange,
  aiRecommendation,
}: AllowanceSliderSectionProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      handleRatioChange(0);
      return;
    }
    let val = Number(value);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    handleRatioChange(val);
  };

  const getSecondaryComment = () => {
    if (!aiRecommendation?.aiComment) return "";
    const sentences = aiRecommendation.aiComment.split(".");
    return `${sentences.slice(1).filter(Boolean).join(".").trim()}.`;
  };

  const secondaryComment = getSecondaryComment();
  const lifeExpense = aiRecommendation?.kidAllowance || 0;

  // 현재 슬라이더 비율(ratio)에 맞춰 실시간 용돈 계산 (올림 처리!)
  const currentAllowance = Math.ceil(lifeExpense * (ratio / 100));

  return (
    <section className="mt-10 mb-10 w-full overflow-hidden">
      <h2 className="text-lg font-bold text-black mb-4">
        아이 용돈 비율 설정하기
      </h2>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="text-center mb-10 text-gray-600 text-[14px] font-medium leading-relaxed">
          {secondaryComment.split(/(이고,|\s*직접)/).map((part) => {
            // 1. 생활비 안내 부분
            if (part.includes("생활비는")) {
              return (
                <span key="section-expense">
                  이번 달 생활비는{" "}
                  <span className="text-gray-800">
                    {formatCurrency(lifeExpense)}원
                  </span>
                </span>
              );
            }

            // 2. 구분자 "이고," 처리
            if (part === "이고,") {
              return (
                <span key="sep-and">
                  이고,
                  <br />
                </span>
              );
            }

            // 3. "직접" 부분 줄바꿈 처리
            if (part.trim() === "직접") {
              return (
                <span key="sep-direct">
                  <br />
                  직접
                </span>
              );
            }

            // 4. 나머지 문장 및 강조 로직
            const ratio = aiRecommendation?.recommendRatio || "";
            return (
              <span key={`content-${part.slice(0, 15)}`}>
                {part.includes(ratio)
                  ? part.split(ratio).map((text, i, arr) => (
                      <span key={`ratio-text-${text.length}-${i}`}>
                        {text}
                        {i < arr.length - 1 && (
                          <span className="text-[#9C6FFE]">{ratio}</span>
                        )}
                      </span>
                    ))
                  : part}
              </span>
            );
          })}
        </div>

        <div className="w-full flex items-center justify-between gap-2 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center text-3xl shrink-0">
              👧
            </div>
            <span className="text-[11px] font-bold text-gray-500">아이</span>
            <input
              type="number"
              value={ratio === 0 ? "" : ratio}
              onChange={handleInputChange}
              placeholder="0"
              className="w-14 h-6 text-center  text-sm font-semibold text-gray-800 border border-gray-200 rounded outline-none appearance-none bg-white"
              style={{ MozAppearance: "textfield" }}
            />
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <input
              type="range"
              min="0"
              max="100"
              value={ratio}
              onChange={(e) => handleRatioChange(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#9C6FFE] touch-none"
            />
            <span className="mt-4 text-gray-300 text-lg font-light">:</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-3xl shrink-0">
              👨
            </div>
            <span className="text-[11px] font-bold text-gray-500">나</span>
            <div className="w-14 h-6 flex items-center justify-center text-sm font-semibold opacity-60">
              {100 - ratio}
            </div>
          </div>
        </div>

        <div className="text-center mb-10 text-gray-700 text-base font-medium h-12 flex items-center justify-center">
          <p>
            현재 비율에 맞는 추천 용돈은 <br />
            <span className="text-[#9C6FFE] font-semibold">
              {formatCurrency(currentAllowance)}원
            </span>
            입니다.
          </p>
        </div>

        <Button size="M" variant="active">
          지금 바로 추천된 용돈 주기
        </Button>
      </div>
    </section>
  );
}
