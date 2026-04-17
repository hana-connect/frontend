"use client";

import Button from "@/common/components/button/Button";
import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import AccountNumberInput from "@/common/components/input/AccountNumberInput";
import { verifyAccount } from "@/common/lib/api/accounts/api-client";
import { useAlert } from "@/common/providers/alert-provider";

type RegisterAccountProps = {
  accountNumber: string;
  isAccountVerified: boolean;
  onAccountNumberChange: (value: string) => void;
  onVerifySuccess: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const RegisterAccount = ({
  accountNumber,
  isAccountVerified,
  onAccountNumberChange,
  onVerifySuccess,
  onNext,
  onBack,
}: RegisterAccountProps) => {
  const { alert } = useAlert();

  const handleVerifyAccount = async () => {
    const requestedAccountNumber = accountNumber;

    try {
      await verifyAccount({ accountNumber: requestedAccountNumber });
      onVerifySuccess(requestedAccountNumber);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "계좌 정보를 다시 확인해주세요.";

      alert({
        title: message,
        actionLabel: "확인",
      });
    }
  };

  return (
    <>
      <RegisterStepHeader title="계좌 등록하기" onBack={onBack} />
      <div className="flex flex-1 flex-col pb-9">
        <div className="px-6 py-7">
          <h1 className="text-left text-[24px] leading-7.5 font-bold tracking-[-1.2px] text-brand-black">
            하나은행 계좌번호를
            <br />
            입력해 주세요.
          </h1>
        </div>
        <div className="mt-9 px-6">
          <AccountNumberInput
            label="계좌번호"
            placeholder="계좌번호"
            value={accountNumber}
            onChange={onAccountNumberChange}
            onVerify={() => {
              void handleVerifyAccount();
            }}
            verifyDisabled={accountNumber.length !== 11}
          />
        </div>
        <div className="mt-auto px-6 pt-9">
          <Button
            size="L"
            variant={isAccountVerified ? "active" : "disabled"}
            onClick={onNext}
            disabled={!isAccountVerified}
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterAccount;
