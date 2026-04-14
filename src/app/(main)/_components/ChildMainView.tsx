import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/common/components/button/Button";

type ParentData = {
  id: number;
  name: string;
  imageUrl: string;
};

type ChildMainProps = {
  userName?: string;
  balance?: number;
  parents?: ParentData[];
};

const ChildMainView = ({
  userName = "홍길동",
  balance = 200068,
  parents = [
    { id: 1, name: "디지털하나로유지현", imageUrl: "svg/ic_mom1.svg" },
    { id: 2, name: "하나로아빠", imageUrl: "svg/ic_mom2.svg" },
  ],
}: ChildMainProps) => {
  return (
    <main className="pb-10">
      <h1 className="sr-only">아이부자 아이 메인 홈</h1>

      {/* 상단 메인 배너 */}
      <section aria-label="메인 이벤트 배너">
        <Image
          src="svg/ic_main_kids_banner.svg"
          alt="아이부자 메인 배너"
          width={400}
          height={200}
          priority
          className="w-full h-auto"
        />
      </section>

      <div className="flex flex-col gap-4 p-4">
        {/* 퀴즈 및 광고 배너 */}
        <section className="flex flex-col gap-4" aria-label="진행 중인 이벤트">
          <Image
            src="svg/ic_main_kids_quiz_banner.svg"
            alt="오늘의 퀴즈를 오픈했어요!"
            width={335}
            height={57}
            priority
            className="w-full h-auto"
          />
          <Image
            src="svg/ic_main_kids_ad.svg"
            alt="추천 서비스 광고"
            width={335}
            height={90}
            priority
            className="w-full h-auto"
          />
        </section>

        {/* 내 지갑 */}
        <section aria-labelledby="wallet-section-title">
          <Link
            href="/wallet"
            className="w-full block"
            aria-label="내 지갑 페이지로 이동"
          >
            <div className="bg-white rounded-[20px] p-5 flex flex-col gap-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] relative">
              <h2
                id="wallet-section-title"
                className="text-[18px] font-semibold text-[#757783]"
              >
                {userName}님의 지갑
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[33px] font-bold text-black leading-tight">
                  {balance.toLocaleString()}원
                </span>
                <div className="bg-[#676D86] rounded-full w-6 h-6 flex items-center justify-center">
                  <ArrowRight
                    className="text-white w-4 h-4"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <div className="text-body-16-m text-[#4A5565] flex flex-row items-center gap-0.5 mt-1">
                충전 계좌 연결하기 <ChevronRight className="w-3.5 h-3.5" />
              </div>
              <div className="flex gap-3 mt-6">
                <div className="flex-1 bg-[#EFF1F3] text-title-20-sb font-bold text-[#585858] py-3 rounded-xl text-center">
                  송금
                </div>
                <div className="flex-1 bg-[#EFF1F3] text-title-20-sb font-bold text-[#585858] py-3 rounded-xl text-center">
                  용돈요청
                </div>
              </div>
            </div>
          </Link>
        </section>

        <Image
          src="svg/ic_main_common_ad.svg"
          alt="공통 서비스 광고"
          width={400}
          height={200}
          priority
          className="w-full h-auto"
        />

        {/* 청약 연결 */}
        <section>
          <Link
            href="/house"
            className="w-full block"
            aria-label="청약 리포트 페이지로 이동"
          >
            <div className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <p className="text-body-16-m text-[#111] text-left leading-snug font-medium">
                청약 통장으로 짓고 있는 <br />
                우리 집, 얼마나 완성됐을까?
              </p>
              <Image
                src="svg/ic_house.svg"
                alt="집 아이콘"
                width={59}
                height={52}
                priority
              />
            </div>
          </Link>
        </section>

        {/* 용돈 사용 */}
        <section
          className="bg-white rounded-[20px] p-5 flex flex-col shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
          aria-labelledby="card-section-title"
        >
          <h2
            id="card-section-title"
            className="text-[15px] text-[#7D859C] font-medium mb-2"
          >
            용돈 사용
          </h2>
          <div className="flex py-2 items-center justify-between">
            <div className="flex items-center">
              <Image
                src="svg/ic_main_kids_card.svg"
                alt="아이부자 카드"
                width={40}
                height={54}
                priority
              />
              <div className="flex flex-col ml-4">
                <p className="text-grey-1 text-[16px] font-semibold">
                  아이부자카드
                </p>
                <p className="text-[14px] font-semibold text-grey-2">
                  보유 중인 카드가 없어요
                </p>
              </div>
            </div>
            <Button size="S" variant="smallGray">
              카드신청
            </Button>
          </div>
        </section>

        {/* 용돈 관리 */}
        <section
          className="bg-white rounded-[20px] p-5 flex flex-col shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] mb-6"
          aria-labelledby="manage-section-title"
        >
          <div className="flex items-center justify-between mb-2">
            <h2
              id="manage-section-title"
              className="text-[15px] text-[#7D859C] font-medium"
            >
              용돈 관리
            </h2>
            <p className="text-[15px] text-[#757783] font-medium flex flex-row items-center gap-0.5">
              멤버관리 <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <ul className="flex flex-col">
            {parents.map((parent, index) => (
              <li
                key={parent.id}
                className={`flex py-2 items-center justify-between ${index > 0 ? "border-t border-gray-50" : ""}`}
              >
                <div className="flex items-center">
                  <Image
                    src={parent.imageUrl}
                    alt={`${parent.name} 프로필`}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col ml-4">
                    <p className="text-grey-1 text-[16px] font-semibold">
                      {parent.name}
                    </p>
                    <p className="text-[14px] font-semibold text-grey-2">
                      정기용돈 미등록
                    </p>
                  </div>
                </div>
                {/* 첫 번째 부모 '내역 공유중', 나머지는 '지갑공유' 버튼 */}
                {index === 0 ? (
                  <p className="text-body-16-m text-brand-purple-1">
                    내역 공유중
                  </p>
                ) : (
                  <Button size="S" variant="smallGray">
                    지갑공유
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* 내 활동 섹션 */}
        <section aria-labelledby="activity-section-title">
          <div className="flex flex-col mb-2">
            <p className="text-[15px] text-[#7D859C] font-medium ml-1">
              2개의 활동이 진행되고 있어요
            </p>
            <div className="flex justify-between items-center w-full ml-1">
              <h2
                id="activity-section-title"
                className="text-heading-28-b text-black font-bold"
              >
                내 활동
              </h2>
              <Image
                src="svg/ic_main_kids_menu.svg"
                alt="활동 메뉴"
                width={90.67}
                height={40}
                className="w-auto h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="svg/ic_main_kids_medal.svg"
              alt="새로운 미션 도전하기"
              width={335}
              height={350}
              className="w-full h-auto"
            />
            <Image
              src="svg/ic_main_kids_pig.svg"
              alt="저금 시작하기"
              width={335}
              height={350}
              className="w-full h-auto"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ChildMainView;
