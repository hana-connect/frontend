"use client";

import { useState } from "react";

const steps = [
  "register-intro",
  "register-account",
  "account-password",
  "register-complete",
] as const;

export const useFunnel = () => {
  const [currentStep, setCurrentStep] =
    useState<(typeof steps)[number]>("register-intro");

  const currentIndex = steps.indexOf(currentStep);

  const nextStep = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
  };
};
