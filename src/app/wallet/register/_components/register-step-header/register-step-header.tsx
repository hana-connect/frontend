"use client";

import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  onBack: () => void;
}

const RegisterStepHeader = ({ title, onBack }: Props) => {
  return (
    <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-center bg-white px-4 text-black">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={onBack}
        className="absolute left-4 p-1"
      >
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-[18px] font-semibold leading-none">{title}</h1>
    </header>
  );
};

export default RegisterStepHeader;
