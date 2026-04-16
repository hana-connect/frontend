"use client";

import Image from "next/image";
import type React from "react";
import Button from "@/common/components/button/Button";
import { formatMoney } from "@/common/lib/utils";

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
  return Math.min(MAX_RATIO, Math.max(MIN_RATIO, value));
}

function getSecondaryComment(aiComment?: string) {
  if (!aiComment) {
    return "";
  }

  const sentences = aiComment.split(".");
  const rest = sentences.slice(1).filter(Boolean).join(".").trim();

  return rest ? `${rest}.` : "";
}

function renderCommentParts(
  comment: string,
  lifeExpense: number,
  recommendRatio: string,
) {
  if (!comment) return null;

  const ratioPattern = recommendRatio ? `|${recommendRatio}` : "";
  const tokenizerRegex = new RegExp(
    `(생활비는.*?원|이고,|직접${ratioPattern})`,
    "g",
  );

  const tokens = comment.split(tokenizerRegex);

  return tokens.map((token, index) => {
    if (!token) return null;

    const key = `token-${index}`;

    if (token.startsWith("생활비는") && token.endsWith("원")) {
      return (
        <span key={key}>
          이번 달 생활비는{" "}
          <span className="text-gray-800">{formatMoney(lifeExpense)}원</span>
        </span>
      );
    }

    if (token === "이고,") {
      return (
        <span key={key}>
          {token}
          <br />
        </span>
      );
    }

    if (token === "직접") {
      return (
        <span key={key}>
          <br />
          {token}
        </span>
      );
    }

    if (recommendRatio && token === recommendRatio) {
      return (
        <span key={key} className="text-brand-purple-1">
          {token}
        </span>
      );
    }

    return <span key={key}>{token}</span>;
  });
}

export default function AllowanceSliderSection({
  ratio,
  handleRatioChange,
  aiRecommendation,
}: AllowanceSliderSectionProps) {
  const recommendRatio = aiRecommendation?.recommendRatio ?? "";
  const lifeExpense = aiRecommendation?.kidAllowance ?? 0;
  const secondaryComment = getSecondaryComment(aiRecommendation?.aiComment);
  const currentAllowance = Math.ceil(lifeExpense * (ratio / 100));
  const myRatio = MAX_RATIO - ratio;

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === "") {
      handleRatioChange(0);
      return;
    }

    handleRatioChange(clampRatio(Number(value)));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRatioChange(clampRatio(Number(e.target.value)));
  };

  return (
    <section className="mt-10 mb-10 w-full overflow-hidden">
      <h2 className="mb-4 text-lg font-bold text-black">
        아이 용돈 비율 설정하기
      </h2>

      <div className="flex flex-col items-center rounded-3xl border border-grey-7 shadow-2xs bg-white p-8">
        <div className="mb-10 text-center text-[14px] font-medium leading-relaxed text-gray-600">
          {renderCommentParts(secondaryComment, lifeExpense, recommendRatio)}
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
