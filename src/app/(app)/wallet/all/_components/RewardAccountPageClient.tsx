"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Button from "@/common/components/button/Button";
import ItemCard from "@/common/components/item-card/ItemCard";
import { RadioGroup } from "@/common/components/radio-group/RadioGroup";
import { updateRewardAccount } from "@/common/lib/api/accounts/api-client";
import { formatMoney } from "@/common/lib/utils";
import { useAlert } from "@/common/providers/alert-provider";
import type { AccountType } from "../../(main)/_types";

type AccountItem = {
  accountId: number;
  name: string;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  createdAt: string;
};

type RewardAccount = {
  accountId: number;
  name: string;
  accountNumber: string;
};

type RewardAccountPageClientProps = {
  accounts: AccountItem[];
  rewardAccount: RewardAccount | null;
};

function RewardAccountPageClient({
  accounts,
  rewardAccount,
}: RewardAccountPageClientProps) {
  const router = useRouter();
  const { alert } = useAlert();

  const depositAccounts = useMemo(() => {
    return accounts.filter((account) => account.accountType === "DEPOSIT");
  }, [accounts]);

  const savingAccounts = useMemo(() => {
    return accounts.filter(
      (account) =>
        account.accountType === "SUBSCRIPTION" ||
        account.accountType === "SAVINGS",
    );
  }, [accounts]);

  const rewardCandidateAccounts = useMemo(() => {
    return accounts.filter((account) => account.accountType === "PENSION");
  }, [accounts]);

  const rewardIdFromProp = rewardAccount ? String(rewardAccount.accountId) : "";
  const [initialRewardId, setInitialRewardId] = useState(rewardIdFromProp);
  const [selectedRewardId, setSelectedRewardId] = useState(rewardIdFromProp);

  useEffect(() => {
    setInitialRewardId(rewardIdFromProp);
    setSelectedRewardId(rewardIdFromProp);
  }, [rewardIdFromProp]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRewardAccount = useMemo(() => {
    return rewardCandidateAccounts.find(
      (account) => String(account.accountId) === selectedRewardId,
    );
  }, [rewardCandidateAccounts, selectedRewardId]);

  const isRewardAccountChanged = selectedRewardId !== initialRewardId;

  const handleRewardChange = (value: string) => {
    setSelectedRewardId(value);
  };

  const handleSubmit = async () => {
    if (!isRewardAccountChanged || !selectedRewardAccount || isSubmitting) {
      return;
    }

    if (!selectedRewardAccount.accountId) {
      alert({
        title: "오류",
        description: "계좌 정보를 다시 확인해 주세요.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await updateRewardAccount(selectedRewardAccount.accountId);

      setInitialRewardId(selectedRewardId);

      alert({
        title: "완료",
        description: "리워드 계좌가 변경되었습니다.",
      });

      router.refresh();
    } catch (error) {
      const err = error as Error & { status?: number; data?: unknown };

      alert({
        title: "실패",
        description: err.message ?? "리워드 계좌 변경에 실패했습니다.",
      });

      console.error("리워드 계좌 변경 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 pb-9">
      <section className="mt-8">
        <h2 className="text-heading-24-b text-black">내 계좌</h2>

        <div className="mt-10 space-y-10">
          <AccountSection title="입출금" accounts={depositAccounts} />
          <AccountSection title="예적금" accounts={savingAccounts} />

          <section>
            <h3 className="mb-4 text-title-24-sb text-black">
              연금/리워드 계좌
            </h3>

            {rewardCandidateAccounts.length > 0 ? (
              <RadioGroup
                value={selectedRewardId}
                onValueChange={handleRewardChange}
              >
                <div className="mb-12 space-y-4">
                  {rewardCandidateAccounts.map((account) => (
                    <AccountCard
                      key={account.accountId}
                      account={account}
                      hasRadio
                      value={String(account.accountId)}
                      onClickCard={() =>
                        handleRewardChange(String(account.accountId))
                      }
                    />
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <p className="my-9 text-center text-body-16-m text-[#555]">
                연결된 연금 계좌가 없어요.
              </p>
            )}

            <Button
              size="L"
              variant={isRewardAccountChanged ? "active" : "disabled"}
              onClick={handleSubmit}
              disabled={
                !isRewardAccountChanged ||
                isSubmitting ||
                rewardCandidateAccounts.length === 0
              }
            >
              {isSubmitting ? "변경 중..." : "리워드 계좌 변경하기"}
            </Button>
          </section>
        </div>
      </section>
    </main>
  );
}

type AccountSectionProps = {
  title: string;
  accounts: AccountItem[];
};

function AccountSection({ title, accounts }: AccountSectionProps) {
  return (
    <section>
      <h3 className="mb-4 text-title-24-sb text-black">{title}</h3>

      {accounts.length > 0 ? (
        <div className="space-y-4">
          {accounts.map((account) => (
            <AccountCard key={account.accountId} account={account} />
          ))}
        </div>
      ) : (
        <p className="my-9 text-center text-body-16-m text-[#555]">
          연결된 계좌가 없어요.
        </p>
      )}
    </section>
  );
}

type AccountCardProps = {
  account: AccountItem;
  hasRadio?: boolean;
  value?: string;
  onClickCard?: () => void;
};

function AccountCard({
  account,
  hasRadio = false,
  value,
  onClickCard,
}: AccountCardProps) {
  return (
    <ItemCard
      title={account.name}
      subTitle={account.accountNumber}
      isPurple={false}
      hasRadio={hasRadio}
      value={value}
      onClickCard={onClickCard}
      rightContent={
        <span className="text-body-16-m text-black">
          {formatMoney(account.balance)}
        </span>
      }
    />
  );
}

export default RewardAccountPageClient;
