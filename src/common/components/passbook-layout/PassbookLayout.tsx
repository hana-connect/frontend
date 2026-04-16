import Image from "next/image";
import type { ReactNode } from "react";
import Button from "../button/Button";

type PassbookLayoutProps = {
  title: string;
  subTitle: string;
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  tabs?: ReactNode;
};

const PassbookLayout = ({
  title,
  subTitle,
  children,
  onPrev,
  onNext,
  isFirstPage = false,
  isLastPage = false,
  tabs,
}: PassbookLayoutProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-5 pt-5">
        <div>
          <h2 className="text-heading-20-b text-[#2E2E36]">{title}</h2>
          <p className="text-[#8E8E93] text-[16px] font-semibold">{subTitle}</p>
        </div>
        <Image
          src="/svg/ic_hana_bank_logo.svg"
          alt="하나은행 로고"
          width={86}
          height={23}
        />
      </div>

      {tabs && <div className="px-1">{tabs}</div>}

      <div
        className={`bg-[#FAFAFA] px-1 mb-32 ${
          tabs ? "min-h-[459.5px]" : "mt-5 min-h-119.75"
        }`}
      >
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-93.75 mx-auto flex gap-3 px-4 pb-9 pointer-events-auto">
          <div className="flex-1">
            <Button
              size="M"
              variant={isFirstPage ? "disabled" : "lightPurple"}
              onClick={onPrev}
              className="w-full"
              disabled={isFirstPage}
            >
              이전
            </Button>
          </div>
          <div className="flex-1">
            <Button
              size="M"
              variant={isLastPage ? "disabled" : "lightPurple"}
              onClick={onNext}
              className="w-full"
              disabled={isLastPage}
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassbookLayout;
