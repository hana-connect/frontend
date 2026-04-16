"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import ItemCard from "@/common/components/item-card/ItemCard";
import type { SavingMailbox } from "../_types";

type SavingMailboxListProps = {
  mailboxes: SavingMailbox[];
};

const DEFAULT_VISIBLE_COUNT = 2;

function SavingMailboxList({ mailboxes }: SavingMailboxListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreThanDefault = mailboxes.length > DEFAULT_VISIBLE_COUNT;

  const visibleMailboxes = useMemo(() => {
    if (isExpanded) {
      return mailboxes;
    }

    return mailboxes.slice(0, DEFAULT_VISIBLE_COUNT);
  }, [isExpanded, mailboxes]);

  return (
    <div>
      <div className="space-y-4">
        {visibleMailboxes.map((mailbox) => {
          return (
            <Link
              key={mailbox.accountId}
              href={`/wallet/saving-letter/${mailbox.accountId}`}
              className="block"
            >
              <ItemCard
                key={mailbox.accountId}
                title={mailbox.name}
                subTitle={mailbox.number}
                className="h-18 rounded-[22px] px-5 py-4"
                rightContent={
                  <Image
                    src="/svg/ic_mailbox.svg"
                    alt={`${mailbox.name} 우체통`}
                    width={48}
                    height={48}
                  />
                }
              />
            </Link>
          );
        })}
      </div>

      {hasMoreThanDefault && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-4 flex h-14 w-full items-center justify-center rounded-3xl border border-grey-5 bg-grey-9 text-body-16-m text-grey-6"
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
}

export default SavingMailboxList;
