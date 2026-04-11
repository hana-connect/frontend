"use client";

import { ChevronLeft, ScanLine } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";

type HeaderProps = {
  type?: "main" | "sub";
  title?: string;
  rightActionText?: string;
  onAction?: () => void;
};

const Header = ({
  type = "main",
  title,
  rightActionText,
  onAction,
}: HeaderProps) => {
  const router = useRouter();

  if (type === "main") {
    return (
      <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-between bg-[#F5F5F5] px-4">
        <div className="flex items-center">
          <div className="relative h-10 w-10">
            <Image
              src="/svg/ic_logo_grey.svg"
              alt="하나 커넥트 로고"
              fill
              sizes="40px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-7 text-[#949AAD] pr-2">
          <button type="button" aria-label="스캔" className="relative h-6 w-6">
            <ScanLine size={24} />
          </button>

          <button type="button" aria-label="알림" className="relative h-6 w-6">
            <Image
              src="/svg/ic_bell.svg"
              alt="알림"
              fill
              sizes="24px"
              style={{ objectFit: "contain" }}
            />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-center bg-white px-4 text-black">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => router.back()}
        className="absolute left-4 p-1"
      >
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-[18px] font-semibold leading-none">{title}</h1>

      {rightActionText && (
        <button
          type="button"
          onClick={onAction}
          className="absolute right-4 text-sm font-medium"
        >
          {rightActionText}
        </button>
      )}
    </header>
  );
};

export default Header;
