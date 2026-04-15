"use client";

import { useState } from "react";
import { useFunnel } from "../../_hooks/use-funnel";
import AccountPassword from "../steps/account-password/account-password";
import RegisterAccount from "../steps/register-account/register-account";
import RegisterComplete from "../steps/register-complete/register-complete";
import RegisterIntro from "../steps/register-intro/register-intro";

const RegisterFunnel = () => {
  const { currentStep, nextStep, prevStep } = useFunnel();
  const [accountNumber, setAccountNumber] = useState("");
  const [verifiedAccountNumber, setVerifiedAccountNumber] = useState("");
  const [linkedAccountNumber, setLinkedAccountNumber] = useState("");
  const [linkedAt, setLinkedAt] = useState("");
  const isAccountVerified =
    accountNumber.length > 0 && accountNumber === verifiedAccountNumber;

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    setVerifiedAccountNumber("");
  };

  const handleVerifySuccess = (value: string) => {
    setVerifiedAccountNumber(value);
  };

  const handleLinkSuccess = (data: {
    accountNumber: string;
    linkedAt: string;
  }) => {
    setLinkedAccountNumber(data.accountNumber);
    setLinkedAt(data.linkedAt);
    nextStep();
  };

  return (
    <>
      {currentStep === "register-intro" && <RegisterIntro onNext={nextStep} />}
      {currentStep === "register-account" && (
        <RegisterAccount
          accountNumber={accountNumber}
          isAccountVerified={isAccountVerified}
          onAccountNumberChange={handleAccountNumberChange}
          onVerifySuccess={handleVerifySuccess}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === "account-password" && (
        <AccountPassword
          accountNumber={accountNumber}
          onLinkSuccess={handleLinkSuccess}
        />
      )}
      {currentStep === "register-complete" && (
        <RegisterComplete
          accountNumber={linkedAccountNumber}
          linkedAt={linkedAt}
        />
      )}
    </>
  );
};

export default RegisterFunnel;
