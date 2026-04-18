"use client";

import { useRouter } from "next/navigation";
import Button from "@/common/components/button/Button";
import { useUserRole } from "@/common/providers/user-role-provider";

type ActionSectionProps = {
  isLevelZero?: boolean;
  hasAccount?: boolean;
  kid?: string;
};

export default function ActionSection({
  isLevelZero,
  hasAccount = true,
  kid,
}: ActionSectionProps) {
  const role = useUserRole();
  const router = useRouter();

  const isParent = role === "PARENT";

  const getMessage = () =>
    isParent
      ? !hasAccount
        ? "아직 아이의 청약 계좌가 등록되지 않았어요.\n아이의 든든한 미래를 위해 청약 계좌를 등록해볼까요?"
        : isLevelZero
          ? "계좌 준비 완료! 첫 납입을 시작해서\n아이의 집 짓기를 도와주세요!"
          : "이번 달도 든든하게 집을 지켰어요!\n우리 아이 맞춤 청약 솔루션을 확인해볼까요?"
      : !hasAccount
        ? "내 집 마련의 첫걸음!\n미리미리 금융 퀴즈에 도전해볼까요?"
        : isLevelZero
          ? "청약 통장이 준비되었어요!\n진정한 내 집 마련 박사 퀴즈에 도전해볼까요?"
          : "이번 달도 소중한 집을 지켰어요!\n내 집 마련 박사가 되기 위한 퀴즈를 풀어볼까요?";

  const getButtonInfo = () =>
    isParent
      ? !hasAccount
        ? {
            text: "청약 계좌 등록하기",
            href: `/wallet/add-child-account?kidId=${kid}`,
          }
        : { text: "청약 솔루션 보러가기", href: "/solution" }
      : { text: "금융 퀴즈 풀러가기", href: "/quiz" };

  return (
    <section className="w-full">
      <p className="mb-5 text-center text-body-16-m-2 whitespace-pre-line">
        {getMessage()}
      </p>

      <Button
        size="L"
        variant="active"
        onClick={() => router.push(getButtonInfo().href)}
      >
        {getButtonInfo().text}
      </Button>
    </section>
  );
}
