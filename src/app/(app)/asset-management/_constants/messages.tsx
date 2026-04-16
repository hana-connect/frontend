import { formatMoney } from "@/common/lib/utils";

export const SLIDER_MESSAGES = {
  TITLE: "아이 용돈 비율 설정하기",
  DESCRIPTION: (amount: number, recommendRatio: string) => (
    <>
      이번 달 생활비는 <span className="text-black">{formatMoney(amount)}</span>
      이고,
      <br />
      자산 분배 결과{" "}
      <span className="text-brand-purple-1 tracking-wide">
        {recommendRatio}
      </span>
      를 추천드려요.
      <br />
      직접 입력하거나 슬라이더를 옮겨서 비율을 조정해보세요!
    </>
  ),
  RESULT_PREFIX: "현재 비율에 맞는 추천 용돈은",
  RESULT_SUFFIX: "입니다.",
  BUTTON_TEXT: "지금 바로 추천된 용돈 주기",
};
