"use client";

import Button from "@/common/components/button/Button";

export default function HanatheNextBanner() {
  return (
    <div className="bg-brand-gradient-3 p-6 rounded-2xl text-center text-black">
      <p className="text-body-16-m-2 mb-3 text-brand-black">
        더 자세한 자산관리가 필요하신가요?
        <br />
        하나더넥스트에서 자산관리를 도와드려요!
      </p>
      <Button
        type="button"
        variant="active"
        size="M"
        onClick={() =>
          window.open(
            "https://m.kebhana.com/m/oqs/livingCounselSenior.do",
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        하나더넥스트 예약하기
      </Button>
    </div>
  );
}
