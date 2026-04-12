"use client";

import { useState } from "react";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import AccountNumberInput from "@/common/components/input/AccountNumberInput";

interface Props {
  onNext: () => void;
}

const RegisterAccount = ({ onNext }: Props) => {
  const [accountNumber, setAccountNumber] = useState("");

  const handleVerifyAccount = () => {
    return;
  };

  return (
    <>
      <Header type="sub" title="계좌 등록하기" />
      <div className="flex flex-1 flex-col px-6 pt-7 pb-9">
        <h1 className="text-left text-[24px] leading-7.5 font-bold tracking-[-1.2px] text-black">
          하나은행 계좌번호를
          <br />
          입력해 주세요.
        </h1>
        <div className="mt-7">
          <AccountNumberInput
            label="계좌번호"
            placeholder="계좌번호"
            value={accountNumber}
            onChange={setAccountNumber}
            onVerify={handleVerifyAccount}
          />
        </div>
        <div className="mt-auto pt-9">
          <Button size="L" variant="active" onClick={onNext}>
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterAccount;
