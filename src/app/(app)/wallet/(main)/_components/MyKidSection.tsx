import { ChevronRight, CircleHelp, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/common/components/button/Button";
import { formatMoney } from "@/common/lib/utils";

type KidInfo = {
  id: number;
  name: string;
  imageSrc: string;
  monthlyAllowance: number;
  walletBalanceText: string;
  regularAllowanceText: string;
  allowancePlanText: string;
};

type MyKidSectionProps = {
  kids?: KidInfo[];
};

function MyKidSection({ kids }: MyKidSectionProps) {
  const mockKids: KidInfo[] = kids ?? [
    {
      id: 1,
      name: "김채현",
      imageSrc: "/images/kid-avatar.png",
      monthlyAllowance: 100000,
      walletBalanceText: "잔액/내역 비공개",
      regularAllowanceText: "매일, 매주 원하는 날짜에\n용돈을 보낼 수 있어요.",
      allowancePlanText: "공유한 용돈 계획이 없어요.",
    },
    {
      id: 2,
      name: "김도윤",
      imageSrc: "/images/kid-avatar.png",
      monthlyAllowance: 50000,
      walletBalanceText: "잔액/내역 비공개",
      regularAllowanceText: "매일, 매주 원하는 날짜에\n용돈을 보낼 수 있어요.",
      allowancePlanText: "공유한 용돈 계획이 없어요.",
    },
  ];

  return (
    <section className="pb-8">
      <h2 className="text-heading-24-b">아이관리</h2>

      <div className="mt-6 space-y-3">
        {mockKids.map((kid) => {
          return <KidCard key={kid.id} kid={kid} />;
        })}
      </div>

      <Link
        href="/"
        className="mt-3 flex h-[60px] w-full items-center justify-center rounded-[18px] border border-grey-5 text-body-16-m text-grey-6"
      >
        <Plus size={20} className="mr-5 text-brand-purple-1" />내 아이 추가하기
      </Link>
    </section>
  );
}

type KidCardProps = {
  kid: KidInfo;
};

function KidCard({ kid }: KidCardProps) {
  return (
    <div className="rounded-[20px] border border-grey-5 bg-white px-5 py-5">
      <div className="flex items-center gap-5">
        <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full bg-grey-4">
          <Image
            src="/svg/ic_child.svg"
            alt={`${kid.name} 프로필`}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-body-16-m">{kid.name}</p>
      </div>

      <div className="my-5 border-t border-grey-5" />

      <div className="space-y-8">
        <InfoRow
          title="이번 달 보낸 용돈"
          description={formatMoney(kid.monthlyAllowance)}
          actionLabel="용돈지급"
          href={`/kid/${kid.id}/allowance`}
        />

        <InfoRow
          title={
            <span className="inline-flex items-center gap-2">
              지갑 잔액
              <CircleHelp size={20} className="text-grey-7" />
            </span>
          }
          description={kid.walletBalanceText}
        />

        <InfoRow
          title="정기용돈"
          description={kid.regularAllowanceText}
          actionLabel="등록하기"
          href={`/kid/${kid.id}/regular-allowance`}
        />
      </div>

      <div className="my-8 border-t border-grey-5" />

      <InfoRow
        title="용돈 계획"
        description={kid.allowancePlanText}
        actionLabel="내역보기"
        href={`/kid/${kid.id}/allowance-plan`}
      />

      <div className="my-8 border-t border-grey-5" />

      <div className="space-y-6">
        <ArrowLinkRow
          label="아이 계좌 추가하기"
          href={`/wallet/add-child-account?kidId=${kid.id}&childName=${encodeURIComponent(kid.name)}`}
        />
        <ArrowLinkRow
          label="아이 계좌번호 요청하기"
          href={`/kid/${kid.id}/account/request`}
        />
      </div>
    </div>
  );
}

type InfoRowProps = {
  title: React.ReactNode;
  description: string;
  actionLabel?: string;
  href?: string;
};

function InfoRow({ title, description, actionLabel, href }: InfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-body-16-m text-black">{title}</p>
        <p className="mt-1 whitespace-pre-line text-body-16-m text-grey-6">
          {description}
        </p>
      </div>

      {actionLabel && href && (
        <Link href={href} className="shrink-0">
          <Button size="S" variant="smallGray">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}

type ArrowLinkRowProps = {
  label: string;
  href: string;
};

function ArrowLinkRow({ label, href }: ArrowLinkRowProps) {
  return (
    <Link href={href} className="flex items-center justify-between">
      <span className="text-body-16-m text-black">{label}</span>
      <ChevronRight size={32} />
    </Link>
  );
}

export default MyKidSection;
