"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function GuideSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        <span className="text-base font-semibold text-brand-black">
          이용안내
        </span>

        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-grey-2 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      {isOpen && (
        <div className="mt-2 text-base font-semibold leading-6 text-[#777777]">
          <p>추가입금 안내</p>

          <ul className="mt-2 space-y-2 text-sm font-medium">
            <li>
              · 정액적립식 상품은 매월 약정한 날짜에 약정한 금액을 입금하였을
              경우 계약금액을 지급하며, 선납분에 대한 기간별 이자는 별도로
              지급되지 않습니다.
            </li>
            <li>
              · 일부 적립식 상품은 계약기간의 2/3를 경과시부터 만기직전까지
              적립할 수 있는 적립금의 합계는 그 이전에 적립한 금액의 1/2를
              초과할 수 없으므로 납입가능 금액을 확인하시기 바랍니다. (상세
              내용은 상품설명서 확인)
            </li>
          </ul>

          <p className="mt-4">다른은행 출금 안내(오픈뱅킹)</p>

          <ul className="mt-2 space-y-2 text-sm font-medium">
            <li>
              · 시스템 점검 시간(23:30~24:30, 은행별 적용)에는 이용 불가합니다.
            </li>
            <li>
              · 오픈뱅킹 잔여 송금한도(전 금융기관 합산 1일 1천만원) 이내에서
              거래 가능합니다.
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
