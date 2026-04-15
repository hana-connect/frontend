import Image from "next/image";

const HowMuch = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-brand-purple-3 rounded-full scale-110 opacity-40 blur-md" />
        <div className="relative w-35 h-35">
          <Image
            src="/svg/doctor/ic_doctor_money.svg"
            alt="Money Growth Icon"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-body-16-m text-black leading-snug">
          예전엔 납입 인정 금액이 10만 원까지만 인정됐지만, <br />
          <span className="font-bold">2024년 11월부터는 </span>
          <span className="text-brand-purple-1 font-bold text-lg">
            25만 원까지
          </span>{" "}
          확대됐어요.
        </p>
      </div>

      <div className="w-full max-w-90 bg-brand-purple-3 rounded-4xl p-7 flex flex-col items-center shadow-sm border border-brand-purple-2">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-bold text-brand-purple-1 bg-white px-4 py-1.5 rounded-full shadow-sm mb-5 border border-brand-purple-2">
            척척박사's TIP 💡
          </span>
          <p className="text-body-16-m text-black leading-relaxed mb-6">
            청약 기회를 더 넓히려는 변화로, <br />
            <span className="text-brand-purple-1 font-bold">
              25만 원씩 채워주시는 게
            </span>{" "}
            <br />
            당첨으로 가는{" "}
            <span className="inline-block font-bold">일등 비결이에요! 🏆</span>
          </p>
        </div>

        <div className="bg-brand-purple-1 w-full py-4 rounded-2xl text-center shadow-md">
          <p className="text-white text-[15px] font-bold flex items-center justify-center gap-2">
            월 납입 인정액{" "}
            <span className="line-through opacity-70 decoration-white decoration-2">
              10만 원
            </span>{" "}
            → 25만 원
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowMuch;
