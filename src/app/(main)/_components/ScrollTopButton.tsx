"use client";

import { ArrowUp } from "lucide-react";

export default function ScrollTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex flex-col items-center w-full pb-28"
    >
      <div className="bg-[#CCD0D9] rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <ArrowUp className="text-white" width={30} height={30} />
      </div>
      <p className="text-[#CCD0D9] text-[18px] font-semibold">
        맨위로 올라가기
      </p>
    </button>
  );
}
