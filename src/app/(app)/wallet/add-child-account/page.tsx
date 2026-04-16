"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";
import { addKidAccount } from "@/common/lib/api/kids";
import { useAlert } from "@/common/providers/alertProvider";

type ApiError = Error & { status?: number };

type AddedKidAccount = {
  kidName: string;
  accountNumber: string;
  accountType: string;
  requestDate: string;
};

const AddChildAccountPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { alert } = useAlert();
  const [nickname, setNickname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addedAccount, setAddedAccount] = useState<AddedKidAccount | null>(
    null,
  );

  const childName = searchParams.get("childName") ?? "아이";
  const kidId = searchParams.get("kidId") ?? "";
  const normalizedAccountNumber = accountNumber.replace(/\D/g, "");

  const isFormValid =
    nickname.trim().length > 0 && normalizedAccountNumber.length === 11;

  const openNotFoundAlert = () => {
    alert({
      title: `${childName}님의 ${accountNumber} 계좌가 존재하지 않아요.`,
      actionLabel: "확인",
    });
  };

  const handleAddKidAccount = async (verifiedAccountNumber?: string) => {
    if (!kidId || !/^\d+$/.test(kidId)) {
      alert({
        title: "아이 정보를 다시 확인해주세요.",
        actionLabel: "확인",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await addKidAccount(kidId, {
        nickname: nickname.trim(),
        accountNumber: verifiedAccountNumber ?? normalizedAccountNumber,
      });

      setAddedAccount(response.data);
      setIsCompleted(true);
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.status === 409) {
        alert({
          title: "이미 등록된 계좌입니다.",
          actionLabel: "확인",
        });
        return;
      }

      if (apiError.status === 404) {
        openNotFoundAlert();
        return;
      }

      alert({
        title: apiError.message || "계좌 정보를 다시 확인해주세요.",
        actionLabel: "확인",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || !isFormValid) {
      return;
    }

    await handleAddKidAccount();
  };

  const handleComplete = () => {
    router.push("/wallet");
    router.refresh();
  };

  const formatRequestDate = (date: string | undefined) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
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
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 11),
                  )
                }
              />
            </div>

            <div className="mt-auto pb-9">
              <Button
                size="L"
                variant={isFormValid ? "active" : "disabled"}
                onClick={() => {
                  void handleSubmit();
                }}
                disabled={!isFormValid || isSubmitting}
              >
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
              {addedAccount?.kidName ?? childName}님의
              <br />
              계좌 추가가 완료되었어요!
            </h1>
            {addedAccount?.accountType === "SUBSCRIPTION" && (
              <p className="mt-4 text-body-14-m text-grey-6 whitespace-pre-line">
                청약은 납입 횟수가 중요한 만큼, <br></br>중복 납입이 발생하지
                않도록 확인해 주세요.
              </p>
            )}
            <div
              className="w-full h-[0.8px] bg-grey-5 mt-12"
              aria-hidden="true"
            />
            <div className="mt-6 w-full flex justify-between text-body-16-m text-grey-6 pb-4">
              <span>계좌번호</span>
              <span className="text-brand-black">
                {addedAccount?.accountNumber || accountNumber}
              </span>
            </div>
            <div className="w-full flex justify-between text-body-16-m text-grey-6">
              <span>요청일</span>
              <span className="text-brand-black">
                {formatRequestDate(addedAccount?.requestDate)}
              </span>
            </div>
          </div>
          <div className="w-full px-6 pb-9">
            <Button size="L" variant="active" onClick={handleComplete}>
              확인
            </Button>
          </div>
        </main>
      )}
    </>
  );
};

export default AddChildAccountPage;
