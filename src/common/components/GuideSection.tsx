"use client";

import Image from "next/image";
import { useState } from "react";

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

        <Image
          src="/svg/ic_down_vector.svg"
          alt="이용안내 펼치기"
          width={12}
          height={12}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 text-base font-semibold leading-6 text-[#777777]">
          <p>추가입금 안내</p>

          <ul className="mt-2 space-y-2 text-sm font-medium">
            <li>
              · 청약적립식 상품은 매월 약정한 날짜에 약정한 금액을 입금하였을
              경우 계약약정액을 지급하며, 선납분에 대한 기간별 이자는 별도로
              지급되지 않습니다.
            </li>
            <li>
              · 일부 적립식 상품은 계약기간의 2/3를 경과시부터 만기전일까지
              적립할 수 있는 적립금의 한계는 그 이전에 적립한 금액의 1/2를
              초과할 수 없습니다.
            </li>
          </ul>

          <p className="mt-4">다른은행 출금 안내(오픈뱅킹)</p>

          <ul className="mt-2 space-y-2 text-sm font-medium">
            <li>
              · 시스템 점검 시간(23:30~24:30, 은행별 적용)은 이용 불가합니다.
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
