import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/common/components/header/Header";

const ChildMainView = () => {
  return (
    <main>
      <Header type="main" />
      <Image
        src="svg/ic_main_kids_banner.svg"
        alt="Kids Banner"
        width={400}
        height={200}
        priority
      />
      <div className="flex flex-col gap-4 p-4">
        <Image
          src="svg/ic_main_kids_quiz_banner.svg"
          alt="Kids Quiz Banner"
          width={400}
          height={200}
          priority
        />
        <Image
          src="svg/ic_main_kids_ad.svg"
          alt="Kids Ad"
          width={400}
          height={200}
          priority
        />
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
              송금
            </button>
            <button
              type="button"
              className="flex-1 bg-[#EFF1F3] text-title-20-sb font-bold text-[#585858] py-4 rounded-xl text-center"
            >
              용돈요청
            </button>
          </div>
        </div>
        <Image
          src="svg/ic_main_common_ad.svg"
          alt="Common Ad"
          width={400}
          height={200}
          priority
        />
        <Link href="/house" className="w-full">
          <button
            type="button"
            className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full
    shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
    relative"
          >
            <p className="text-body-16-m text-black text-left leading-snug">
              청약 통장으로 짓고 있는 <br />
              우리 집, 얼마나 완성됐을까?
            </p>
            <Image
              src="svg/ic_house.svg"
              alt="Kids House"
              width={59}
              height={52}
              priority
            />
          </button>
        </Link>
        <div
          className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full
  shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
  relative"
        >
          <p className="text-body-16-m text-grey-2">용돈 사용</p>
        </div>
        <div
          className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full
  shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
  relative"
        >
          <p className="text-body-16-m text-grey-2">용돈 관리</p>
        </div>
        <div className="flex flex-col">
          <p className="text-grey-1 text-body-16-m ml-1">
            2개의 활동이 진행되고 있어요
          </p>
          <div className="flex justify-between items-center w-full ml-1">
            <p className="text-heading-28-b text-black">내 활동</p>
            <Image
              src="svg/ic_main_kids_menu.svg"
              alt="Kids Menu"
              width={50}
              height={23}
              className="w-auto h-auto"
              priority
            />
          </div>
        </div>
        <Image
          src="svg/ic_main_kids_medal.svg"
          alt="Kids Medal"
          width={400}
          height={200}
          priority
        />
        <Image
          src="svg/ic_main_kids_pig.svg"
          alt="Kids Pig"
          width={400}
          height={200}
          priority
        />
      </div>
    </main>
  );
};
export default ChildMainView;
