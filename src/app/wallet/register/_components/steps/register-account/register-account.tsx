"use client";

import { useState } from "react";
import Button from "@/common/components/button/Button";
import AccountNumberInput from "@/common/components/input/AccountNumberInput";
import RegisterStepHeader from "../../register-step-header/register-step-header";

type RegisterAccountProps = {
  onNext: () => void;
  onBack: () => void;
};

const RegisterAccount = ({ onNext, onBack }: RegisterAccountProps) => {
  const [accountNumber, setAccountNumber] = useState("");

  const handleVerifyAccount = () => {
    return;
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
            onChange={setAccountNumber}
            onVerify={handleVerifyAccount}
          />
        </div>
        <div className="mt-auto px-6 pt-9">
          <Button size="L" variant="active" onClick={onNext}>
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterAccount;
