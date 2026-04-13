export const SLIDER_MESSAGES = {
  TITLE: "아이 비율 설정하기",
  DESCRIPTION: (amount: number, ratio: number) =>
    `이번 달 생활비는 ${amount.toLocaleString()}원이고,\n자산 분배 결과 ${ratio}:${100 - ratio}를 추천드려요.\n직접 입력하거나 슬라이더를 옮겨서 비율을 조정해보세요!`,
  RESULT_PREFIX: "현재 비율에 맞는 추천 용돈은 ",
  RESULT_SUFFIX: "입니다.",
  BUTTON_TEXT: "지금 바로 추천된 용돈 주기",
};
