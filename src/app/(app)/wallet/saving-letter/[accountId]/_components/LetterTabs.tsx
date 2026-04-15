"use client";

import { Tabs, TabsList, TabsTrigger } from "@/common/components/tabs/Tabs";

type LetterTabsProps = {
  activeSenderId: string;
  onTabChange: (val: string) => void;
  senders: { senderId: number; senderName: string }[];
};

const LetterTabs = ({
  activeSenderId,
  onTabChange,
  senders,
}: LetterTabsProps) => {
  return (
    <Tabs value={activeSenderId} onValueChange={onTabChange}>
      <TabsList className="flex w-max max-w-full justify-start overflow-x-auto rounded-none scrollbar-hide px-1">
        <TabsTrigger
          value="all"
          className="px-6 pb-3 shrink-0 whitespace-nowrap"
        >
          전체
        </TabsTrigger>

        {senders.map((s) => (
          <TabsTrigger
            key={s.senderId}
            value={s.senderId.toString()}
            className="px-6 pb-3 shrink-0 whitespace-nowrap"
          >
            {s.senderName}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default LetterTabs;
