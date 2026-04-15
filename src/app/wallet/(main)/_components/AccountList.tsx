"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TopRegisterSection from "@/app/saving/_components/TopRegisterSection";
import ItemCard from "@/common/components/item-card/ItemCard";
import { formatMoney } from "@/common/lib/utils";
import type { Account, MainAccountInfo, UserRole } from "../_types";

type AccountListProps = {
  userRole: UserRole;
  accounts: Account[];
  mainAccountInfo?: MainAccountInfo;
};

function AccountList({
  userRole,
  accounts,
  mainAccountInfo,
}: AccountListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isChild = userRole === "KID";
  const hasAccounts = accounts.length > 0;
  const hasMoreThanTwo = accounts.length > 2;

  const visibleAccounts = useMemo(() => {
    if (!hasAccounts) {
      return [];
    }

    if (isChild) {
      return isExpanded ? accounts : accounts.slice(0, 2);
    }

    return accounts.slice(0, 2);
  }, [accounts, hasAccounts, isChild, isExpanded]);

  return (
    <section className="pb-8">
      <TopRegisterSection role={userRole} mainAccountInfo={mainAccountInfo} />

      <div className="mt-12">
        <h2 className="text-heading-24-b">내 계좌 모아보기</h2>

        {!hasAccounts ? (
          <p className="mt-9 text-center text-body-16-m text-[#555]">
            연결된 계좌가 없어요.
          </p>
        ) : (
          <div className="mt-8">
            <div id="wallet-account-list" className="space-y-4">
              {visibleAccounts.map((account) => {
                return (
                  <ItemCard
                    key={account.id}
                    title={account.name}
                    subTitle={account.number}
                    isPurple={false}
                    rightContent={
                      <span className="text-body-16-m font-bold">
                        {formatMoney(account.balance)}
                      </span>
                    }
                  />
                );
              })}
            </div>

            {hasMoreThanTwo &&
              (isChild ? (
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-expanded={isExpanded}
                  aria-controls="wallet-account-list"
                  className="mt-3 flex h-[50px] w-full items-center justify-center rounded-[18px] border border-grey-5 bg-grey-9 text-body-16-m text-grey-6"
                >
                  {isExpanded ? "접기" : "더보기"}
                </button>
              ) : (
                <Link
                  href="/wallet/all"
                  className="mt-3 flex h-[50px] w-full items-center justify-center rounded-[18px] border border-grey-5 bg-grey-9 text-body-16-m text-grey-6"
                >
                  전체 계좌 보러가기
                </Link>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AccountList;
