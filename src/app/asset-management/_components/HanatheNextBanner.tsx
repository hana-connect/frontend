"use client";

export default function HanatheNextBanner() {
  return (
    <div className="bg-violet-50 p-6 rounded-2xl text-center mt-10 border border-violet-100 text-black">
      <p className="text-xs mb-3 text-gray-600">
        더 자세한 자산관리가 필요하신가요?
      </p>
      <button
        type="button"
        onClick={() =>
          window.open(
            "https://www.hana1qm.com/web/sub/tlist.do?topyn=Y&pcatid=46",
            "_blank",
          )
        }
        className="text-violet-600 font-bold text-sm border border-violet-200 px-6 py-2 rounded-full bg-white"
      >
        하나더넥스트 예약하기
      </button>
    </div>
  );
}
