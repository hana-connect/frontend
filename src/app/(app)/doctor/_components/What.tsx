import Image from "next/image";

const What = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-brand-purple-3 rounded-full scale-110 opacity-40 blur-md" />
        <div className="relative w-35 h-35">
          <Image
            src="/svg/doctor/ic_doctor_house.svg"
            alt="Main Icon"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-body-16-m text-black leading-snug mb-6">
          민영주택은{" "}
          <span className="font-bold underline decoration-brand-purple-3 decoration-4 -underline-offset-2">
            브랜드 건설사
          </span>
          가 짓는 아파트, <br />
          국민주택은{" "}
          <span className="font-bold underline decoration-brand-purple-3 decoration-4 -underline-offset-2">
            나라·공공기관
          </span>
          이 짓는 아파트예요.
        </p>
        <p className="text-body-16-m text-black leading-snug">
          민영주택은{" "}
          <span className="text-brand-purple-1 font-bold">
            통장에 얼마나 모였는지,
          </span>{" "}
          <br />
          국민주택은{" "}
          <span className="text-brand-purple-1 font-bold">
            얼마나 오래 꾸준히 넣었는지
          </span>
          가 <br />
          중요해요!
        </p>
      </div>

      <div className="flex gap-3 w-full max-w-90">
        <div className="flex-1 bg-white rounded-3xl pt-5 pb-4 px-4 flex flex-col items-center border border-brand-purple-2 shadow-[0_2px_8px_rgba(170,178,255,0.2)]">
          <p className="text-brand-black font-bold mb-4 text-[17px]">
            민영주택
          </p>

          <div className="flex flex-wrap gap-1.5 justify-center mb-5 min-h-22.5 content-start -mx-2">
            {[
              "래미안",
              "푸르지오",
              "자이",
              "롯데캐슬",
              "힐스테이트",
              "e편한세상",
            ].map((brand) => (
              <span
                key={brand}
                className="bg-brand-purple-3 text-[13px] text-brand-purple-1 px-2 py-1 rounded-lg border border-brand-purple-2/30 whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>

          <div className="bg-brand-purple-1 px-3 py-2.5 rounded-xl w-full text-center mt-auto">
            <p className="text-[14px] font-bold text-white">통장 총 잔액</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-3xl pt-5 pb-4 px-4 flex flex-col items-center border border-brand-purple-2 shadow-[0_2px_8px_rgba(170,178,255,0.2)]">
          <p className="text-brand-black font-bold mb-4 text-[17px]">
            국민주택
          </p>

          <div className="flex flex-wrap gap-1.5 justify-center mb-5 min-h-22.5 content-start -mx-2">
            {[
              "LH 공공분양",
              "SH 서울분양",
              "LH 행복주택",
              "GH 경기분양",
              "LH 뉴홈",
              "공공임대",
            ].map((org) => (
              <span
                key={org}
                className="bg-brand-purple-3 text-[13px] text-brand-purple-1 px-2 py-1 rounded-lg border border-brand-purple-2/30 whitespace-nowrap"
              >
                {org}
              </span>
            ))}
          </div>

          <div className="bg-brand-purple-1 px-3 py-2.5 rounded-xl w-full text-center mt-auto">
            <p className="text-[14px] font-bold text-white">납입횟수 및 금액</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default What;
