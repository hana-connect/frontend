"use client";

import { useFunnel } from "../../_hooks/use-funnel";
import AccountPassword from "../steps/account-password/account-password";
import RegisterAccount from "../steps/register-account/register-account";
import RegisterComplete from "../steps/register-complete/register-complete";
import RegisterIntro from "../steps/register-intro/register-intro";

const RegisterFunnel = () => {
  const { currentStep, nextStep, prevStep } = useFunnel();

  return (
    <>
      {currentStep === "register-intro" && <RegisterIntro onNext={nextStep} />}
      {currentStep === "register-account" && (
        <RegisterAccount onNext={nextStep} onBack={prevStep} />
      )}
      {currentStep === "account-password" && (
        <AccountPassword onNext={nextStep} />
      )}
      {currentStep === "register-complete" && <RegisterComplete />}
    </>
  );
};

export default RegisterFunnel;
