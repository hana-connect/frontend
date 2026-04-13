import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/common/components/header/Header";

function ParentMainView() {
  return (
    <main>
      <Header type="main" />
      <Image
        src="svg/ic_main_parents_banner.svg"
        alt="Parents Banner"
        width={400}
        height={200}
        priority
      />
      <div className="flex flex-col gap-4 p-4">
        <div
          className="bg-white rounded-[20px] p-5 flex flex-col gap-1 
  shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
  relative"
        >
          <span className="text-heading-20-b text-grey-2">000님의 지갑</span>
          <div className="flex items-center gap-2 mb-2 cursor-pointer">
            <span className="text-[32px] font-bold text-black leading-tight">
              268원
            </span>
            <div className="bg-[#676D86] rounded-full w-6 h-6 flex items-center justify-center">
              <ArrowRight className="text-white w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <button
            type="button"
            className="text-body-16-m text-[#4A5565] font-medium flex flex-row items-center gap-0.5 mt-1"
          >
            충전 계좌 연결하기 <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="flex-1 bg-[#EFF1F3] text-title-20-sb font-bold text-[#585858] py-4 rounded-xl text-center"
            >
              충전
            </button>
            <button
              type="button"
              className="flex-1 bg-[#EFF1F3] text-title-20-sb font-bold text-[#585858] py-4 rounded-xl text-center"
            >
              용돈지급
            </button>
          </div>
        </div>
        <Image
          src="svg/ic_main_parents_ad.svg"
          alt="Parents Ad"
          width={400}
          height={200}
          priority
        />
        {/* 청약 척척박사 / ai 이동 */}
        {/* 아이 목록 */}

        <Image
          src="svg/ic_main_common_ad.svg"
          alt="Common Ad"
          width={400}
          height={200}
        />

        {/* 아이 잔액 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
            <p className="text-grey-1 text-body-16-m">000님의 활동 0개</p>
            <Image
              src="svg/ic_main_kids_menu.svg"
              alt="Kids Menu"
              width={49}
              height={22}
              className="w-auto h-auto"
              priority
            />
          </div>
          <Link href="/house" className="w-full">
            <button
              type="button"
              className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full
    shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
    relative"
            >
              <p className="text-body-16-m text-black text-left leading-snug">
                아이를 위한 집이 <br />
                어떻게 만들어지고 있을까요?
              </p>
              <Image
                src="svg/ic_house.svg"
                alt="Parents House"
                width={59}
                height={52}
                priority
              />
            </button>
          </Link>
          <Link href="/house" className="w-full">
            <button
              type="button"
              className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full
    shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
    relative"
            >
              <p className="text-body-16-m text-black text-left leading-snug">
                아이 퀴즈를 풀고 더 친해져 봐요!
              </p>
              <Image
                src="svg/ic_main_parents_quiz.svg"
                alt="Parents Quiz"
                width={59}
                height={52}
                priority
              />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ParentMainView;
