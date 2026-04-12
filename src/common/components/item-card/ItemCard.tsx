"use client";

import type React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";

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
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) {
      return;
    }
    onClickCard?.();
  };

  const Component = "div";

  return (
    <Component
      onClick={handleCardClick}
      className={`
        w-full h-19 flex items-center justify-between
        py-3 px-6 border border-[#ECECEC] rounded-3xl text-left
        ${isPurple ? "bg-[#F5F1FB]" : "bg-[#F9F9F9]"}
        ${hasRadio || onClickCard ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      <div className="flex flex-col gap-1 pointer-events-none">
        <span className="text-[16px] text-[#000000] font-medium leading-none">
          {title}
        </span>
        <span className="text-[16px] text-[#777777] leading-none">
          {subTitle}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[16px] text-[#000000] font-medium">
        {rightContent}

        {hasRadio && value && <RadioGroupItem value={value} id={value} />}
      </div>
    </Component>
  );
};

export default ItemCard;
