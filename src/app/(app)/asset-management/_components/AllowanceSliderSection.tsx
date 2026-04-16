"use client";

import Image from "next/image";
import type React from "react";
import Button from "@/common/components/button/Button";
import { formatMoney } from "@/common/lib/utils";
import { SLIDER_MESSAGES } from "../_constants/messages";

type AiRecommendation = {
  aiComment?: string;
  recommendRatio?: string;
  kidAllowance?: number;
} | null;

type AllowanceSliderSectionProps = {
  ratio: number;
  handleRatioChange: (value: number) => void;
  aiRecommendation: AiRecommendation;
};

const MIN_RATIO = 0;
const MAX_RATIO = 100;

function clampRatio(value: number) {
  if (!Number.isFinite(value)) return MIN_RATIO;
  return Math.min(MAX_RATIO, Math.max(MIN_RATIO, value));
}

export default function AllowanceSliderSection({
  ratio,
  handleRatioChange,
  aiRecommendation,
}: AllowanceSliderSectionProps) {
  const recommendRatio = aiRecommendation?.recommendRatio ?? "";
  const lifeExpense = aiRecommendation?.kidAllowance ?? 0;
  const currentAllowance = Math.ceil(lifeExpense * (ratio / 100));
  const myRatio = MAX_RATIO - ratio;

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === "") {
      handleRatioChange(0);
      return;
    }
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return;
    handleRatioChange(clampRatio(numeric));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = Number(e.target.value);
    if (!Number.isFinite(numeric)) return;
    handleRatioChange(clampRatio(numeric));
  };

  return (
    <section className="mt-10 mb-10 w-full overflow-hidden">
      <h2 className="mb-4 text-lg font-bold text-black">
        아이 용돈 비율 설정하기
      </h2>

      <div className="flex flex-col items-center rounded-3xl border border-grey-7 shadow-2xs bg-white p-8">
        <div className="mb-10 text-center text-body-16-m-2 text-gray-700">
          {SLIDER_MESSAGES.DESCRIPTION(lifeExpense, recommendRatio)}
        </div>

        <div className="mb-8 flex w-full items-center justify-between gap-2">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/svg/ic_child.svg"
              alt="아이 프로필"
              width={56}
              height={56}
            />
            <span className="text-[11px] font-bold text-gray-500">아이</span>
            <input
              type="number"
              value={ratio === 0 ? "" : ratio}
              onChange={handleNumberInputChange}
              aria-label="아이 용돈 비율"
              placeholder="0"
              className="h-6 w-14 appearance-none rounded border border-gray-200 bg-white text-center text-sm font-semibold text-gray-800 outline-none"
              style={{ MozAppearance: "textfield" }}
            />
          </div>

          <div className="flex flex-1 flex-col items-center px-4">
            <div className="relative flex w-full items-center h-3">
              <div className="absolute inset-x-0 h-3 rounded-full bg-[#E7E3F0]" />

              <div
                className="absolute left-0 h-3 rounded-full pointer-events-none bg-brand-gradient-1"
                style={{
                  width: `${ratio}%`,
                }}
              />

              <div
                className="absolute pointer-events-none rounded-full bg-white border-3 border-[#E1D3F3] z-10"
                style={{
                  left: `${ratio}%`,
                  transform: "translateX(-50%)",
                  width: 24,
                  height: 24,
                  top: "50%",
                  marginTop: -12,
                }}
              />

              <input
                type="range"
                min={MIN_RATIO}
                max={MAX_RATIO}
                step={1}
                value={ratio}
                onChange={handleRangeChange}
                aria-label="아이 용돈 비율 슬라이더"
                className="absolute inset-0 w-full cursor-pointer opacity-0 touch-none z-10"
              />
            </div>
            <span className="mt-4 text-lg font-light text-black">:</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              src="/svg/ic_mom2.svg"
              alt="부모 프로필"
              width={56}
              height={56}
            />
            <span className="text-[11px] font-bold text-gray-500">나</span>
            <div className="flex h-6 w-14 items-center justify-center text-sm font-semibold opacity-60">
              {myRatio}
            </div>
          </div>
        </div>

        <div className="mb-10 flex h-12 items-center justify-center text-center text-base font-medium text-gray-700">
          <p>
            현재 비율에 맞는 추천 용돈은 <br />
            <span className="font-semibold text-brand-purple-1">
              {formatMoney(currentAllowance)}
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
