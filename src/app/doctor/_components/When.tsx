import Image from "next/image";

const When = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-brand-purple-3 rounded-full scale-110 opacity-40 blur-md" />
        <div className="relative w-35 h-35">
          <Image
            src="/svg/doctor/ic_doctor_graduation_cap.svg"
            alt="Education Planning Icon"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-body-16-m text-black leading-snug">
          일찍 넣는다고 다 좋은 건 아니에요. <br />
          우리 아이가{" "}
          <span className="text-brand-purple-1 font-bold underline decoration-2 underline-offset-4">
            중학교 2학년, 만 14세
          </span>
          가 <br />
          되면 그때부터 본격적으로 채워주세요!
        </p>
      </div>

      <div className="w-full max-w-90 bg-brand-purple-3 rounded-4xl p-7 flex flex-col items-center shadow-sm border border-brand-purple-2">
        <span className="text-sm font-bold text-brand-purple-1 bg-white px-4 py-1.5 rounded-full shadow-sm mb-5 border border-brand-purple-2">
          척척박사's TIP 💡
        </span>

        <p className="text-body-16-m text-black text-center leading-relaxed mb-6">
          미성년자 납입 인정 기간은 <span className="font-bold">최대 5년</span>
          이에요. <br />그 전에는 청약 통장 대신 <br />
          <span className="text-brand-purple-1 font-bold underline decoration-2 underline-offset-4">
            아이를 위한 적금
          </span>
          부터 시작하는 게 <br />
          훨씬 현명한 방법이에요!
        </p>

        <div className="bg-brand-purple-1 w-full py-4 rounded-2xl text-center shadow-md">
          <p className="text-white text-[15px] font-bold">
            가장 효율적인 가입 시기: 만 14세
          </p>
        </div>
      </div>
    </div>
  );
};

export default When;
