"use client";

import { useState } from "react";
import Header from "@/common/components/header/Header";
import AccountNumberInput from "@/common/components/input/AccountNumberInput";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const RegisterAccount = ({ onNext, onBack }: Props) => {
  const [accountNumber, setAccountNumber] = useState("");

  const handleVerifyAccount = () => {
    return;
  };

  return (
    <>
      <Header type="sub" title="계좌 등록하기" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AccountNumberInput
          label="계좌번호"
          placeholder="계좌번호"
          value={accountNumber}
          onChange={setAccountNumber}
          onVerify={handleVerifyAccount}
        />
        <button type="button" onClick={onBack}>
          뒤로가기
        </button>
        <button type="button" onClick={onNext}>
          다음
        </button>
      </div>
    </>
  );
};

export default RegisterAccount;
