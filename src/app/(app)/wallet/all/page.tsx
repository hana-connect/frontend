"use client";

import { useMemo, useState } from "react";
import Button from "@/common/components/button/Button";
import ItemCard from "@/common/components/item-card/ItemCard";
import { RadioGroup } from "@/common/components/radio-group/RadioGroup";
import { formatMoney } from "@/common/lib/utils";

type AccountItem = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
};

const DEPOSIT_ACCOUNTS: AccountItem[] = [
  {
    id: 1,
    name: "자유입출금",
    accountNumber: "1102-111-055957",
    balance: 6900000,
  },
];

const SAVING_ACCOUNTS: AccountItem[] = [
  {
    id: 2,
    name: "주택청약종합저축",
    accountNumber: "1102-111-055957",
    balance: 6900000,
  },
  {
    id: 3,
    name: "3·6·9 정기예금",
    accountNumber: "8811-122-234512",
    balance: 10000000,
  },
  {
    id: 4,
    name: "하나 주니어 적금",
    accountNumber: "1234-567-891011",
    balance: 3200000,
  },
];

const REWARD_ACCOUNTS: AccountItem[] = [
  {
    id: 5,
    name: "개인형IRP",
    accountNumber: "1102-111-055957",
    balance: 6900000,
  },
  {
    id: 6,
    name: "행복knowhow 연금예금",
    accountNumber: "1102-111-055957",
    balance: 6900000,
  },
  {
    id: 7,
    name: "하나더넥스트 연금 통장",
    accountNumber: "1102-111-055957",
    balance: 6900000,
  },
];

const INITIAL_REWARD_ID = "5";

function page() {
  const [selectedRewardId, setSelectedRewardId] = useState(INITIAL_REWARD_ID);

  const isRewardAccountChanged = selectedRewardId !== INITIAL_REWARD_ID;

  const selectedRewardAccount = useMemo(() => {
    return REWARD_ACCOUNTS.find(
      (account) => String(account.id) === selectedRewardId,
    );
  }, [selectedRewardId]);

  const handleRewardChange = (value: string) => {
    setSelectedRewardId(value);
  };

  const handleSubmit = () => {
    if (!isRewardAccountChanged || !selectedRewardAccount) {
      return;
    }

    console.log("변경할 리워드 계좌:", selectedRewardAccount);
  };

  return (
    <main className="min-h-screen bg-white px-6 pb-9 pt-4">
      <section className="mt-8">
        <h2 className="text-heading-24-b text-black">내 계좌</h2>

        <div className="mt-10 space-y-10">
          <AccountSection title="입출금" accounts={DEPOSIT_ACCOUNTS} />

          <AccountSection title="예적금" accounts={SAVING_ACCOUNTS} />

          <section>
            <h3 className="mb-4 text-title-24-sb text-black">
              연금/리워드 계좌
            </h3>

            <RadioGroup
              value={selectedRewardId}
              onValueChange={handleRewardChange}
            >
              <div className="mb-12 space-y-4">
                {REWARD_ACCOUNTS.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    hasRadio
                    value={String(account.id)}
                    onClickCard={() => handleRewardChange(String(account.id))}
                  />
                ))}
              </div>
            </RadioGroup>

            <Button
              size="L"
              variant={isRewardAccountChanged ? "active" : "disabled"}
              onClick={handleSubmit}
              disabled={!isRewardAccountChanged}
            >
              리워드 계좌 변경하기
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

      <div className="space-y-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
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

export default page;
