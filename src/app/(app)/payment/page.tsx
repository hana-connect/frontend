"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/alert-dialog/AlertDialog";
import Button from "@/common/components/button/Button";
import GuideSection from "@/common/components/GuideSection";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";
import TransferAmount from "@/common/components/keypad/TransferAmount";

const LIMIT_AMOUNT = 250000;

export default function PaymentDeposit() {
  const [amount, setAmount] = useState<number | null>(null);
  const [showAmountPad, setShowAmountPad] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [moveExtraToIrp, setMoveExtraToIrp] = useState(false);

  const isDisabled = !amount;
  const router = useRouter();

  const handleNextStep = (nextAmount: number) => {
    if (nextAmount > LIMIT_AMOUNT) {
      setPendingAmount(nextAmount);
      setShowLimitModal(true);
      return;
    }

    setAmount(nextAmount);
    setMoveExtraToIrp(false);
    setShowAmountPad(false);
  };

  const handleLimitConfirm = () => {
    if (pendingAmount === null) return;

    setAmount(pendingAmount);
    setMoveExtraToIrp(true);
    setPendingAmount(null);
    setShowLimitModal(false);
    setShowAmountPad(false);
  };

  const handleLimitCancel = () => {
    if (pendingAmount === null) return;

    setAmount(pendingAmount);
    setMoveExtraToIrp(false);
    setPendingAmount(null);
    setShowLimitModal(false);
    setShowAmountPad(false);
  };

  const handleSubmit = () => {
    if (!amount) return;

    const overAmount = Math.max(0, amount - LIMIT_AMOUNT);
    const subscriptionAmount = moveExtraToIrp ? amount - overAmount : amount;
    const irpAmount = moveExtraToIrp ? overAmount : 0;

    localStorage.setItem(
      "paymentResult",
      JSON.stringify({
        subscriptionAccountNumber: "111-2222-3333",
        irpAccountNumber: "111-2222-3333",
        subscriptionAmount,
        irpAmount,
        date: "2026.04.07",
      }),
    );

    router.push("/payment/password");
  };

  if (showAmountPad) {
    return (
      <>
        <TransferAmount
          accountHolder="김채현(김채*)"
          accountNickname="채현이 입출금 (용돈)"
          balance={500000}
          onNext={handleNextStep}
        />

        <AlertDialog open={showLimitModal} onOpenChange={setShowLimitModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                납입액이 25만원을 넘었어요.
                <br />
                초과분은 가점에 반영되지 않아요.
                <br />
                <br />
                {(pendingAmount ? pendingAmount - 250000 : 0).toLocaleString()}
                원, 연금 계좌로 옮길까요?
              </AlertDialogTitle>

              <AlertDialogDescription>
                현재 설정된 계좌: IRP
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleLimitCancel}>
                아니요
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleLimitConfirm}>
                예
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <main className="flex h-dvh flex-col bg-white">
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="bg-white px-5 pt-6 pb-12">
          <Header type="sub" title="청약 납입하기" />

          <section className="mt-10">
            <p className="mb-6 text-xl font-bold text-brand-black">납입금액</p>

            <Input
              placeholder="금액 입력"
              value={amount ? amount.toLocaleString() : ""}
              readOnly
              onClick={() => setShowAmountPad(true)}
              className="cursor-pointer font-bold text-brand-black placeholder:text-[#CCCCCC]"
            />
          </section>
        </div>

        <div className="h-60 bg-white" />

        <section className="bg-[#F6F7F8] px-5 pt-4 pb-10">
          <GuideSection />
        </section>
      </div>

      <div className="shrink-0 bg-[#F6F7F8] px-5 pb-6 pt-3">
        <Button
          size="L"
          variant={isDisabled ? "disabled" : "active"}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </main>
  );
}
