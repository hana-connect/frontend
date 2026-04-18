import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/common/components/button/Button";
import type { ParentData, WalletData } from "../page";

type ChildMainProps = {
  wallet: WalletData;
  parents: ParentData[];
};

const ChildMainView = ({ wallet, parents }: ChildMainProps) => {
  return (
    <main className="pb-10">
      <h1 className="sr-only">아이부자 아이 메인 홈</h1>

      {/* 상단 메인 배너 */}
      <section aria-label="메인 이벤트 배너">
        {parents.length > 0 ? (
          <Image
            src="/svg/main/ic_main_kids_banner.svg"
            alt="아이부자 메인 배너"
            width={400}
            height={200}
            priority
            className="w-full h-auto"
          />
        ) : (
          <Image
            src="/svg/main/ic_main_kids_sub_banner.svg"
            alt="가족 추가 홍보 배너"
            width={400}
            height={200}
            className="w-full h-auto"
            priority
          />
        )}
      </section>

      <div className="flex flex-col gap-4 p-4">
        {/* 퀴즈 및 광고 배너 */}
        <section className="flex flex-col gap-4" aria-label="진행 중인 이벤트">
          <Image
            src="/svg/main/ic_main_kids_quiz_banner.svg"
            alt="오늘의 퀴즈를 오픈했어요!"
            width={335}
            height={57}
            priority
            className="w-full h-auto"
          />
          <Image
            src="/svg/main/ic_main_kids_ad.svg"
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
                {wallet.name}님의 지갑
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[33px] font-bold text-black leading-tight">
                  {wallet.walletMoney.toLocaleString()}원
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
          src="/svg/main/ic_main_common_ad.svg"
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
                src="/svg/main/ic_main_kids_card.svg"
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

          {parents.length > 0 ? (
            <ul className="flex flex-col">
              {parents.map((parent, _index) => {
                const isOdd = parent.connectMemberId % 2 !== 0;
                const profileImage = isOdd
                  ? "/svg/ic_mom1.svg"
                  : "/svg/ic_mom2.svg";
                const displayName =
                  parent.connectMemberPhoneName || parent.connectMemberName;

                return (
                  <li
                    key={parent.connectMemberId}
                    className={"flex py-2 items-center justify-between"}
                  >
                    <div className="flex items-center">
                      <Image
                        src={profileImage}
                        alt={`${displayName} 프로필`}
                        width={50}
                        height={50}
                      />
                      <div className="flex flex-col ml-4">
                        <p className="text-grey-1 text-[16px] font-semibold">
                          {displayName}
                        </p>
                        <p className="text-[14px] font-semibold text-grey-2">
                          정기용돈 미등록
                        </p>
                      </div>
                    </div>
                    {/* '내역 공유중' */}
                    <p className="text-body-16-m text-brand-purple-1">
                      내역 공유중
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-body-14-m text-grey-6">
              아직 연결된 가족이 없어요.
            </div>
          )}
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
                src="/svg/main/ic_main_kids_menu.svg"
                alt="활동 메뉴"
                width={90.67}
                height={40}
                className="w-auto h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/svg/main/ic_main_kids_medal.svg"
              alt="새로운 미션 도전하기"
              width={335}
              height={350}
              className="w-full h-auto"
            />
            <Image
              src="/svg/main/ic_main_kids_pig.svg"
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
