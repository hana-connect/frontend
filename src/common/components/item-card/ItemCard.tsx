"use client";

import type React from "react";
import { cn } from "@/common/lib/utils";
import { RadioGroupItem } from "../radio-group/RadioGroup";

type ItemCardProps = {
  title: string;
  subTitle: string;
  isPurple?: boolean;
  className?: string;
  hasRadio?: boolean;
  value?: string;
  rightContent?: React.ReactNode;
  onClickCard?: () => void;
};

const ItemCard = ({
  title,
  subTitle,
  isPurple = false,
  className = "",
  hasRadio = false,
  value,
  rightContent,
  onClickCard,
}: ItemCardProps) => {
  return (
    <div
      className={cn(
        "flex w-full h-19 items-center justify-between",
        "py-3 px-6 border border-grey-5 rounded-3xl text-left text-body-16-m",
        isPurple ? "bg-[#F5F1FB]" : "bg-grey-9",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClickCard}
        className="flex flex-1 flex-col gap-1 text-left"
      >
        <span className="text-black leading-none">{title}</span>
        <span className="text-grey-6 leading-none">{subTitle}</span>
      </button>

      <div className="flex items-center gap-2 text-black ml-2">
        {rightContent}
        {hasRadio && value && <RadioGroupItem value={value} id={value} />}
      </div>
    </div>
  );
};

export default ItemCard;
