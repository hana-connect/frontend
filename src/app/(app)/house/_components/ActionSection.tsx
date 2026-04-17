"use client";

import { useRouter } from "next/navigation";
import Button from "@/common/components/button/Button";
import { useUserRole } from "@/common/providers/user-role-provider";

type ActionSectionProps = {
  isLevelZero?: boolean;
};

export default function ActionSection({ isLevelZero }: ActionSectionProps) {
  const role = useUserRole();
  const router = useRouter();

  const isParent = role === "PARENT";

  const getMessage = () => {
    if (isParent) {
      return isLevelZero
        ? "아이의 든든한 미래를 위해 청약 계좌를 등록해볼까요?"
        : "이번 달도 든든하게 집을 지켰어요!\n구체적인 솔루션을 확인해볼까요?";
    }
    return isLevelZero
      ? "미리미리 집을 준비하기 위한 퀴즈에 도전해볼까요?"
      : "이번 달도 소중한 집을 지켰어요!\n진정한 내 집 마련 박사가 되기 위한 퀴즈에 도전해볼까요?";
  };

  const getButtonInfo = () => {
    if (isParent) {
      return isLevelZero
        ? { text: "청약 계좌 등록하기", href: "/wallet/add-child-account" }
        : { text: "청약 솔루션 보러가기", href: "/solution" };
    }
    return { text: "금융 퀴즈 풀러가기", href: "/quiz" };
  };

  return (
    <section>
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
