"use client";

import { ChevronRight, CircleHelp, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/common/components/button/Button";
import { formatMoney } from "@/common/lib/utils";
import type { KidInfo } from "../_types";

type MyKidSectionProps = {
  kids?: KidInfo[];
};

function getAccountActionLabel(accountType: string) {
  return accountType === "SUBSCRIPTION" ? "청약넣기" : "송금하기";
}

function MyKidSection({ kids = [] }: MyKidSectionProps) {
  return (
    <section className="pb-8">
      <h2 className="text-heading-24-b text-brand-black">아이관리</h2>

      <div className="mt-6 space-y-3">
        {kids.map((kid) => {
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
        <p className="text-body-16-m text-brand-black">{kid.name}</p>
      </div>

      <div className="my-5 border-t border-grey-5" />

      <div className="space-y-8">
        <InfoRow
          title="이번 달 보낸 용돈"
          description={formatMoney(kid.monthlyAllowance)}
          actionLabel="용돈지급"
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
        />
      </div>

      <div className="my-8 border-t border-grey-5" />

      <InfoRow
        title="용돈 계획"
        description={kid.allowancePlanText}
        actionLabel="내역보기"
      />

      {kid.accounts.length > 0 && (
        <>
          <div className="my-8 border-t border-grey-5" />

          <div className="space-y-6">
            {kid.accounts.map((account) => (
              <AccountRow
                key={account.accountId}
                kidId={kid.id}
                account={account}
              />
            ))}
          </div>
        </>
      )}

      <div className="my-8 border-t border-grey-5" />

      <div className="space-y-6">
        <ArrowLinkRow
          label="아이 계좌 추가하기"
          href={`/wallet/add-child-account?kidId=${kid.id}&childName=${encodeURIComponent(kid.name)}`}
        />
        <ArrowLinkRow
          label="아이 계좌번호 요청하기"
          href={`/wallet/${kid.id}/request`}
        />
      </div>
    </div>
  );
}

type AccountRowProps = {
  kidId: number;
  account: KidInfo["accounts"][number];
};

function AccountRow({ kidId, account }: AccountRowProps) {
  const router = useRouter();

  const handleClick = async () => {
    // TODO 송금하기 api 연동되면 그때 다시 수정
    if (account.accountType !== "SUBSCRIPTION") {
      router.push(`/transfer?accountId=${account.accountId}`);
      return;
    }

    // 청약, 선납 모두
    router.push(`/subscription?subscriptionId=${account.accountId}`);
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-body-16-m text-brand-black">
          {account.nickname || account.name}
        </p>
        <p className="mt-1 whitespace-pre-line text-body-16-m text-grey-6">
          {account.accountNumber}
        </p>
      </div>

      <Button size="S" variant="smallGray" onClick={handleClick}>
        {getAccountActionLabel(account.accountType)}
      </Button>
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
        <p className="text-body-16-m text-brand-black">{title}</p>
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
      <span className="text-body-16-m text-brand-black">{label}</span>
      <ChevronRight size={32} />
    </Link>
  );
}

export default MyKidSection;
