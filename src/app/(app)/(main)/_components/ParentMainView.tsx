"use client";

import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Button from "@/common/components/button/Button";
import ItemCard from "@/common/components/item-card/ItemCard";
import {
  getKidLinkedAccounts,
  type KidDetail,
} from "@/common/lib/api/main/app-client";
import type { KidData, WalletData } from "../page";

type ParentMainViewProps = {
  wallet: WalletData;
  kids: KidData[];
};

const ParentMainView = ({ wallet, kids }: ParentMainViewProps) => {
  const [selectedKidId, setSelectedKidId] = useState<number | null>(
    kids.length > 0 ? kids[0].connectMemberId : null,
  );

  const [kidDetailMap, setKidDetailMap] = useState<Map<number, KidDetail>>(
    new Map(),
  );

  const [isLoading, setIsLoading] = useState(false);

  // 화면에 실제로 보여줄 아이 ID
  const [displayKidId, setDisplayKidId] = useState<number | null>(
    selectedKidId,
  );

  // 이전 아이 데이터 유지용
  const displayKid = kids.find((k) => k.connectMemberId === displayKidId);
  const displayDetail = displayKidId
    ? (kidDetailMap.get(displayKidId) ?? null)
    : null;

  const fetchKidDetail = useCallback(
    async (kidId: number) => {
      // 이미 캐시에 있으면 바로 화면 전환
      if (kidDetailMap.has(kidId)) {
        setDisplayKidId(kidId);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getKidLinkedAccounts(kidId);

        setKidDetailMap((prev) => {
          const next = new Map(prev);
          next.set(kidId, data);
          return next;
        });

        // 데이터 도착 후에만 화면 전환
        setDisplayKidId(kidId);
      } catch (e) {
        console.error("아이 상세 조회 실패:", e);
        // 실패해도 일단 전환
        setDisplayKidId(kidId);
      } finally {
        setIsLoading(false);
      }
    },

    [kidDetailMap],
  );

  useEffect(() => {
    if (selectedKidId !== null) {
      fetchKidDetail(selectedKidId);
    }
  }, [selectedKidId, fetchKidDetail]);

  return (
    <main className="pb-10">
      <h1 className="sr-only">부모 홈화면</h1>

      <Image
        src="/svg/main/ic_main_parents_banner.svg"
        alt="가족 생일 안내"
        width={400}
        height={200}
        className="w-full h-auto"
        priority
      />

      <div className="flex flex-col gap-4 p-4">
        {/* 지갑 정보 */}
        <section aria-label="내 지갑">
          <Link
            href="/wallet"
            className="w-full block"
            aria-label="지갑 상세 및 송금하기"
          >
            <div className="bg-white rounded-[20px] p-5 flex flex-col gap-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] relative">
              <h2 className="text-[18px] font-semibold text-[#757783]">
                {wallet.name}님의 지갑
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[33px] font-bold text-black leading-tight">
                  {wallet.walletMoney.toLocaleString()}원
                </span>
              </div>
              <div className="text-body-16-m text-[#676D86] flex flex-row items-center gap-0.5 justify-end font-medium">
                내지갑/송금
                <div className="bg-[#676D86] rounded-full w-5 h-5 flex items-center justify-center ml-2">
                  <ArrowRight
                    className="text-white w-4 h-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-1 justify-end">
                <span className="bg-[#EFF1F3] text-[14px] font-medium text-[#585858] px-5 py-2 rounded-2xl">
                  충전
                </span>
                <span className="bg-[#EFF1F3] text-[14px] font-medium text-[#585858] px-5 py-2 rounded-2xl">
                  용돈지급
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* 상단 광고 */}
        <Image
          src="/svg/main/ic_main_parents_ad.svg"
          alt="원픽 통장 만들기 광고"
          width={400}
          height={200}
          className="w-full h-auto"
          priority
        />

        {/* 메뉴 네비 */}
        <nav
          className="flex gap-3 w-full h-35 items-center"
          aria-label="금융 도우미 메뉴"
        >
          <Link
            href="/doctor"
            className="flex-1 h-full rounded-[20px] bg-[#AABFDC] flex flex-col items-center justify-center gap-1"
            aria-label="청약 척척박사 이동"
          >
            <Image
              src="/svg/main/ic_main_parents_doctor.svg"
              alt="청약 척척박사 아이콘"
              width={113}
              height={98}
              priority
            />
            <span className="text-white text-[18px] font-bold">
              청약 척척박사
            </span>
          </Link>
          <Link
            href="/asset-management"
            className="flex-1 h-full rounded-[20px] bg-[#C9BDE6] flex flex-col items-center justify-center gap-1"
            aria-label="AI 자산 도우미 이동"
          >
            <Image
              src="/svg/main/ic_main_parents_ai.svg"
              alt="AI 자산 도우미 아이콘"
              width={104}
              height={98}
              priority
            />
            <span className="text-white text-[18px] font-bold">
              AI 자산 도우미
            </span>
          </Link>
        </nav>
      </div>

      {/* 아이 선택 */}
      <section
        aria-label="자녀 선택"
        className="flex overflow-x-auto no-scrollbar scroll-smooth"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="flex gap-6 px-4 pt-4 min-w-max" role="tablist">
          {kids.map((kid) => (
            <button
              key={kid.connectMemberId}
              type="button"
              role="tab"
              aria-selected={selectedKidId === kid.connectMemberId}
              onClick={() => setSelectedKidId(kid.connectMemberId)}
              className={`flex flex-col items-center shrink-0 outline-none ${
                selectedKidId === kid.connectMemberId
                  ? "text-[#7746DD]"
                  : "text-[#99A1AF]"
              }`}
            >
              <Image
                src="/svg/ic_child.svg"
                alt={`${kid.connectMemberName} 프로필`}
                width={74}
                height={74}
                className={`rounded-full border transition-colors ${
                  selectedKidId === kid.connectMemberId
                    ? "border-[#7746DD]"
                    : "border-grey-4"
                }`}
                priority
              />
              <span className="text-body-16-m mt-2 font-medium">
                {kid.connectMemberName}
              </span>
              <div className="h-6" aria-hidden="true">
                {selectedKidId === kid.connectMemberId && (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 아이 상세 */}
      {displayKid ? (
        <div className="flex flex-col gap-4 p-4">
          <Image
            src="/svg/main/ic_main_common_ad.svg"
            alt="원픽 통장 광고"
            width={400}
            height={200}
            className="w-full h-auto"
            priority
          />
          <section
            aria-label={`${displayKid.connectMemberName} 정보 상세`}
            className={`bg-white rounded-[20px] p-4 flex flex-col w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] gap-3 mb-2 transition-opacity duration-200 ${
              isLoading ? "opacity-60" : "opacity-100"
            }`}
          >
            <div className="flex items-center justify-between w-full px-3 py-1">
              <div className="flex flex-col">
                <div className="flex text-title-20-sb gap-1 items-center">
                  <span className="text-grey-1">잔액 </span>
                  <span className="text-[#7746DD]">
                    {(displayDetail?.walletMoney ?? 0).toLocaleString()}원
                  </span>
                  <ChevronRight
                    className="w-5 text-[#7746DD]"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-body-16-m text-[#676E86]">지갑 공유중</p>
              </div>
              <button
                type="button"
                className="bg-[#676D86] text-white rounded-2xl py-2 px-3 h-auto text-body-16-m-2"
                aria-label={`${displayKid.connectMemberName}에게 용돈 지급`}
              >
                용돈지급
              </button>
            </div>
            <div className="flex items-center justify-between w-full px-3 py-1 border-t border-gray-50 pt-3">
              <div className="flex text-title-20-sb gap-1 items-center font-bold">
                <span className="text-grey-1">정기용돈</span>
                <span className="text-[#99A1AF]">미등록</span>
              </div>
              <button
                type="button"
                className="bg-[#F6F6F6] text-grey-6 rounded-2xl py-2 px-3 h-auto text-body-16-m-2"
                aria-label={`${displayKid.connectMemberName} 정기용돈 등록하기`}
              >
                등록하기
              </button>
            </div>

            {/* 계좌 목록 */}
            <ul className="flex flex-col gap-2 w-full mt-2">
              {(displayDetail?.accounts?.length ?? 0) > 0
                ? displayDetail?.accounts.map((acc) => (
                    <li key={acc.accountId}>
                      <ItemCard
                        title={acc.nickname || acc.name}
                        subTitle={acc.accountNumber}
                        // 연결
                        rightContent={
                          <Button size={"S"} variant={"smallPurple"}>
                            {acc.accountType === "SUBSCRIPTION"
                              ? "청약넣기"
                              : "송금하기"}
                          </Button>
                        }
                        isPurple
                      />
                    </li>
                  ))
                : displayDetail !== null && (
                    <li className="flex flex-col items-center justify-center pb-8 pt-5 text-center text-grey-1 text-body-16-m">
                      등록된 계좌가 없습니다.
                    </li>
                  )}
            </ul>
          </section>

          {/* 아이 활동 */}
          <section
            aria-labelledby="activity-title"
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between items-center w-full">
              <h2
                id="activity-title"
                className="text-[15px] text-[#7D859C] font-bold ml-1"
              >
                {displayKid.connectMemberName}님의 활동 0개
              </h2>
              <Image
                src="/svg/main/ic_main_parents_menu.svg"
                alt="활동 메뉴 상세"
                width={50}
                height={22}
                className="w-auto h-auto"
                priority
              />
            </div>
            <div className="bg-white rounded-[20px] p-11 flex flex-col items-center w-full shadow-sm mb-2 text-center">
              <p className="text-title-20-sb text-black leading-snug mb-4 font-semibold">
                아이와 다양한 활동을
                <br />
                시작해보세요!
              </p>
              <Image
                src="svg/ic_kids_hi.svg"
                alt="아이 캐릭터"
                width={157}
                height={137}
                priority
              />
            </div>
            <Link
              href={`/house?kidId=${displayKidId}`}
              className="w-full block"
              aria-label="청약 리포트 페이지로 이동"
            >
              <div className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full shadow-sm mb-2">
                <p className="text-body-16-m text-black text-left font-medium">
                  아이를 위한 집이 <br />
                  어떻게 만들어지고 있을까요?
                </p>
                <Image src="svg/ic_house.svg" alt="" width={59} height={52} />
              </div>
            </Link>
            <Link
              href={`/quiz?kidId=${displayKidId}`}
              className="w-full block"
              aria-label="아이 퀴즈 페이지로 이동"
            >
              <div className="bg-white rounded-[20px] p-5 flex justify-between items-center w-full shadow-sm">
                <p className="text-body-16-m text-black text-left font-medium">
                  아이 퀴즈를 풀고 더 친해져 봐요!
                </p>
                <Image
                  src="/svg/main/ic_main_parents_quiz.svg"
                  alt=""
                  width={68}
                  height={66}
                  className="w-auto h-auto"
                  priority
                />
              </div>
            </Link>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-20 pb-10">
          <p className="text-grey-6 text-body-16-m">연결된 아이가 없습니다.</p>
        </div>
      )}
    </main>
  );
};

export default ParentMainView;
