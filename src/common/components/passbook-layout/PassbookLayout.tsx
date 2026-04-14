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
        className={`bg-[#FAFAFA] px-1 ${
          tabs ? "min-h-[459.5px]" : "min-h-119.75"
        }`}
      >
        {children}
      </div>
      <div className="flex gap-3 mt-6 px-4 pb-9">
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
  );
};

export default PassbookLayout;
