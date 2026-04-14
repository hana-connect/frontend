"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";
import { useAlert } from "@/common/providers/alertProvider";

type MockResult = "not-found" | "housing" | "normal";

const AddChildAccountPage = () => {
  const { alert } = useAlert();
  const [nickname, setNickname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [mockResult] = useState<MockResult>("housing");

  // UI 확인용 임시 케이스: "not-found" | "housing" | "normal"
  const childName = "김채현";

  const openCase2 = () => {
    alert({
      title: `${childName}님의 ${accountNumber || "000-112-234234"} 계좌가 존재하지 않아요.`,
      actionLabel: "확인",
    });
  };

  const openCase3 = () => {
    alert({
      title: `${childName}님의 청약 통장이 맞으신가요?`,
      description:
        "청약 통장은 납입 횟수와 금액이 중요해요. 계좌 정보를 다시 한번 확인해 주세요.",
      actionLabel: "예",
      cancelLabel: "아니오",
      onAction: () => {
        setIsCompleted(true);
      },
    });
  };

  const handleSubmit = () => {
    if (mockResult === "not-found") {
      openCase2();
      return;
    }

    if (mockResult === "housing") {
      openCase3();
      return;
    }

    setIsCompleted(true);
  };

  return (
    <>
      {!isCompleted && <Header type="sub" title="아이 계좌 추가하기" />}
      {!isCompleted ? (
        <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white">
          <div className="pt-7 pb-7 pl-6">
            <h1 className="text-heading-24-b text-brand-black">
              {childName}님의 계좌를 추가합니다.
            </h1>
            <p className="text-body-20-m mt-4 text-grey-6">
              앞으로 아이의 계좌를
              <br />
              간편하게 확인할 수 있어요.
            </p>
          </div>

          <main className="flex flex-1 flex-col px-6">
            <Input
              placeholder="계좌 별명"
              maxLength={12}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <div className="mt-9">
              <Input
                placeholder="계좌번호"
                maxLength={11}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="mt-auto pb-9">
              <Button size="L" variant="active" onClick={handleSubmit}>
                추가하기
              </Button>
            </div>
          </main>
        </div>
      ) : (
        <main className="min-h-screen bg-white flex flex-col">
          <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
            <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />
            <h1 className="text-body-20-m text-brand-black mt-6">
              {childName}님의
              <br />
              계좌 추가가 완료되었어요!
            </h1>
            <div
              className="w-full h-[0.8px] bg-grey-5 mt-12"
              aria-hidden="true"
            />
            <div className="mt-6 w-full flex justify-between text-body-16-m text-grey-6 pb-4">
              <span>계좌번호</span>
              <span className="text-brand-black">
                {accountNumber || "111-2222-3333"}
              </span>
            </div>
            <div className="w-full flex justify-between text-body-16-m text-grey-6">
              <span>요청일</span>
              <span className="text-brand-black">2026.04.07</span>
            </div>
          </div>

          <div className="w-full px-6 pb-9">
            <Button size="L" variant="active">
              확인
            </Button>
          </div>
        </main>
      )}
    </>
  );
};

export default AddChildAccountPage;
